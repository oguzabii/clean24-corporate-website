-- ===========================================================================
-- Clean24 Shop — durable order persistence (Phase 13B1)
-- ===========================================================================
-- ISOLATED shop tables for the corporate-website shop ONLY. This migration
-- must NOT be applied to, or reference, Lead Autopilot / Sales Engine
-- projects or tables.
--
-- Provider-neutral PostgreSQL, hosted on Neon via the Vercel Marketplace
-- resource connected to the clean24-corporate-website project.
-- Apply deliberately, never automatically:
--   npm run db:migrate      (scripts/apply-shop-migration.mjs, DATABASE_URL)
--   psql "$DATABASE_URL" -f migrations/20260711120000_create_shop_orders.sql
--
-- SECURITY MODEL
--   * The application connects server-side only via DATABASE_URL (owner
--     role). No client-facing database roles exist.
--   * RLS is ENABLED on every table with NO policies as defense-in-depth:
--     any future non-owner/limited role can read or write NOTHING.
--   * Order items are IMMUTABLE sales snapshots: future catalog edits in
--     data/shop.ts must never rewrite historical prices or names.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- updated_at trigger (reusable for the shop tables)
-- ---------------------------------------------------------------------------
create or replace function public.shop_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- shop_orders — one row per checkout attempt / order
-- ---------------------------------------------------------------------------
create table public.shop_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  status text not null default 'pending_checkout'
    check (status in (
      'pending_checkout',
      'checkout_created',
      'payment_pending',
      'paid',
      'payment_failed',
      'expired',
      'cancelled',
      'refunded',
      'checkout_failed'
    )),
  currency text not null default 'CHF' check (char_length(currency) = 3),
  subtotal_cents integer not null check (subtotal_cents > 0),
  shipping_cents integer null check (shipping_cents is null or shipping_cents >= 0),
  discount_cents integer null check (discount_cents is null or discount_cents >= 0),
  total_cents integer not null check (total_cents > 0),
  customer_email text null,
  stripe_checkout_session_id text unique null,
  stripe_payment_intent_id text unique null,
  stripe_customer_id text null,
  stripe_payment_status text null,
  checkout_error_code text null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz null,
  expired_at timestamptz null,
  cancelled_at timestamptz null
);

create index shop_orders_status_idx on public.shop_orders (status);
create index shop_orders_created_at_idx on public.shop_orders (created_at);

create trigger shop_orders_set_updated_at
  before update on public.shop_orders
  for each row execute function public.shop_set_updated_at();

alter table public.shop_orders enable row level security;
-- Deliberately NO policies: non-owner roles get no access at all.

comment on table public.shop_orders is
  'Clean24 shop orders. Server-only access via DATABASE_URL (owner bypasses RLS); no client policies by design.';

-- ---------------------------------------------------------------------------
-- shop_order_items — immutable per-line sales snapshot
-- ---------------------------------------------------------------------------
create table public.shop_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.shop_orders (id) on delete cascade,
  product_id text not null,
  variant_id text not null,
  product_name text not null,
  variant_label text not null,
  sku text null,
  quantity integer not null check (quantity between 1 and 20),
  unit_amount_cents integer not null check (unit_amount_cents > 0),
  line_amount_cents integer not null check (line_amount_cents > 0),
  vat_included boolean not null,
  requires_shipping boolean not null,
  product_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  -- Duplicate lines are merged server-side before persistence.
  unique (order_id, product_id, variant_id)
);

create index shop_order_items_order_id_idx on public.shop_order_items (order_id);

alter table public.shop_order_items enable row level security;
-- Deliberately NO policies (see shop_orders).

comment on table public.shop_order_items is
  'Immutable order-line snapshots. Catalog changes must never rewrite these rows.';

-- ---------------------------------------------------------------------------
-- shop_stripe_events — durable webhook idempotency ledger
-- ---------------------------------------------------------------------------
create table public.shop_stripe_events (
  stripe_event_id text primary key,
  event_type text not null,
  processing_status text not null default 'received'
    check (processing_status in ('received', 'processing', 'processed', 'ignored', 'failed')),
  order_id uuid null references public.shop_orders (id),
  stripe_created_at timestamptz null,
  processed_at timestamptz null,
  error_code text null,
  attempt_count integer not null default 1 check (attempt_count >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index shop_stripe_events_order_id_idx on public.shop_stripe_events (order_id);

create trigger shop_stripe_events_set_updated_at
  before update on public.shop_stripe_events
  for each row execute function public.shop_set_updated_at();

alter table public.shop_stripe_events enable row level security;
-- Deliberately NO policies (see shop_orders).

comment on table public.shop_stripe_events is
  'Stripe webhook events keyed by event id — THE durable idempotency ledger.';

-- ---------------------------------------------------------------------------
-- Atomic pending-order creation (order + immutable item snapshots in ONE
-- transaction). All pricing entering this function must already be resolved
-- by the trusted server catalog layer — never by the client.
-- ---------------------------------------------------------------------------
create or replace function public.create_shop_pending_order(
  p_order_number text,
  p_currency text,
  p_items jsonb,
  p_metadata jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
set search_path = public
as $$
declare
  v_order_id uuid;
  v_item jsonb;
  v_quantity integer;
  v_unit integer;
  v_line integer;
  v_subtotal integer := 0;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'ITEMS_EMPTY';
  end if;

  -- Verify every line and compute the authoritative subtotal.
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_quantity := (v_item->>'quantity')::integer;
    v_unit := (v_item->>'unitAmountCents')::integer;
    v_line := (v_item->>'lineAmountCents')::integer;
    if v_quantity is null or v_quantity < 1 or v_quantity > 20 then
      raise exception 'ITEM_QUANTITY_INVALID';
    end if;
    if v_unit is null or v_unit <= 0 or v_line is null or v_line <= 0 then
      raise exception 'ITEM_AMOUNT_INVALID';
    end if;
    if v_line <> v_unit * v_quantity then
      raise exception 'ITEM_TOTAL_MISMATCH';
    end if;
    v_subtotal := v_subtotal + v_line;
  end loop;

  insert into shop_orders (order_number, status, currency, subtotal_cents, total_cents, metadata)
  values (p_order_number, 'pending_checkout', p_currency, v_subtotal, v_subtotal, coalesce(p_metadata, '{}'::jsonb))
  returning id into v_order_id;

  insert into shop_order_items (
    order_id, product_id, variant_id, product_name, variant_label, sku,
    quantity, unit_amount_cents, line_amount_cents, vat_included,
    requires_shipping, product_snapshot
  )
  select
    v_order_id,
    item->>'productId',
    item->>'variantId',
    item->>'productName',
    item->>'variantLabel',
    nullif(item->>'sku', ''),
    (item->>'quantity')::integer,
    (item->>'unitAmountCents')::integer,
    (item->>'lineAmountCents')::integer,
    coalesce((item->>'vatIncluded')::boolean, true),
    coalesce((item->>'requiresShipping')::boolean, true),
    coalesce(item->'snapshot', '{}'::jsonb)
  from jsonb_array_elements(p_items) as item;

  return jsonb_build_object(
    'order_id', v_order_id,
    'order_number', p_order_number,
    'subtotal_cents', v_subtotal,
    'total_cents', v_subtotal
  );
end;
$$;

-- Owner/server-only execution: no PUBLIC grant survives.
revoke execute on function public.create_shop_pending_order(text, text, jsonb, jsonb) from public;
