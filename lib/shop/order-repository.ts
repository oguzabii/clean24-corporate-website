import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { generateOrderNumber } from "./order-number";
import {
  canTransition,
  classifyEventClaim,
  STALE_CLAIM_MS,
} from "./order-state-machine";
import type {
  CreatePendingOrderInput,
  EventClaim,
  OrderPersistenceErrorCode,
  OrderResult,
  PendingOrder,
  PersistedOrder,
  PublicOrderStatus,
  StripeOrderUpdate,
} from "./order-types";

/**
 * Server-only order repository (Phase 13B1).
 *
 *  - Every function returns a typed OrderResult; raw database errors are
 *    mapped to narrow OrderPersistenceErrorCode values and NEVER leave this
 *    module (log sanitized codes only, no customer data, no SQL).
 *  - Order + items are created atomically via the create_shop_pending_order
 *    RPC (single transaction) — items are immutable sales snapshots.
 *  - Stripe event idempotency is DURABLE via shop_stripe_events keyed on
 *    event.id. There is deliberately no in-memory dedup.
 *  - All state changes go through lib/shop/order-state-machine.ts.
 */

const UNIQUE_VIOLATION = "23505";
const ORDER_NUMBER_ATTEMPTS = 3;

/* eslint-disable @typescript-eslint/no-explicit-any -- supabase rows are
   untyped without generated types; mapping happens immediately below. */

function mapOrderRow(row: any): PersistedOrder {
  return {
    id: row.id,
    orderNumber: row.order_number,
    status: row.status,
    currency: row.currency,
    subtotalCents: row.subtotal_cents,
    totalCents: row.total_cents,
    stripeCheckoutSessionId: row.stripe_checkout_session_id ?? null,
    stripePaymentIntentId: row.stripe_payment_intent_id ?? null,
    stripePaymentStatus: row.stripe_payment_status ?? null,
    customerEmail: row.customer_email ?? null,
  };
}

function fail<T>(code: OrderPersistenceErrorCode, context: string): OrderResult<T> {
  // Sanitized log: code + context only. Never SQL, rows or customer data.
  console.error(`[order-repository] ${context}: ${code}`);
  return { ok: false, code };
}

/** Atomically create a pending order with immutable item snapshots. */
export async function createPendingOrder(
  input: CreatePendingOrderInput,
): Promise<OrderResult<PendingOrder>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  if (input.lines.length === 0) return fail("ORDER_CREATE_FAILED", "createPendingOrder(empty)");

  const items = input.lines.map((line) => ({
    productId: line.productId,
    variantId: line.variantId,
    productName: line.productName,
    variantLabel: line.variantLabel,
    quantity: line.quantity,
    unitAmountCents: line.unitAmountCents,
    lineAmountCents: line.lineAmountCents,
    vatIncluded: line.vatIncluded,
    requiresShipping: line.requiresShipping,
    snapshot: { currency: line.currency },
  }));

  // Retry only on order-number collisions — the unique constraint is the
  // final authority on uniqueness.
  for (let attempt = 0; attempt < ORDER_NUMBER_ATTEMPTS; attempt++) {
    const orderNumber = generateOrderNumber();
    const { data, error } = await db.rpc("create_shop_pending_order", {
      p_order_number: orderNumber,
      p_currency: input.currency,
      p_items: items,
      p_metadata: input.metadata ?? {},
    });
    if (!error && data) {
      return {
        ok: true,
        value: {
          orderId: data.order_id,
          orderNumber: data.order_number,
          subtotalCents: data.subtotal_cents,
          totalCents: data.total_cents,
        },
      };
    }
    if (error && error.code === UNIQUE_VIOLATION) continue;
    return fail("ORDER_CREATE_FAILED", "createPendingOrder");
  }
  return fail("ORDER_CREATE_FAILED", "createPendingOrder(collisions)");
}

/** Link the Stripe session and move pending_checkout → checkout_created. */
export async function attachStripeCheckoutSession(
  orderId: string,
  sessionId: string,
): Promise<OrderResult<PersistedOrder>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };

  const { data, error } = await db
    .from("shop_orders")
    .update({ stripe_checkout_session_id: sessionId, status: "checkout_created" })
    .eq("id", orderId)
    .eq("status", "pending_checkout") // guarded transition
    .select()
    .maybeSingle();

  if (error || !data) return fail("ORDER_SESSION_LINK_FAILED", "attachStripeCheckoutSession");
  return { ok: true, value: mapOrderRow(data) };
}

/** Terminal bookkeeping when Stripe session creation fails. */
export async function markOrderCheckoutFailed(
  orderId: string,
  safeErrorCode: string,
): Promise<OrderResult<null>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  const { error } = await db
    .from("shop_orders")
    .update({ status: "checkout_failed", checkout_error_code: safeErrorCode })
    .eq("id", orderId)
    .eq("status", "pending_checkout");
  if (error) return fail("ORDER_UPDATE_FAILED", "markOrderCheckoutFailed");
  return { ok: true, value: null };
}

export async function getOrderById(
  orderId: string,
): Promise<OrderResult<PersistedOrder>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  const { data, error } = await db
    .from("shop_orders")
    .select()
    .eq("id", orderId)
    .maybeSingle();
  if (error) return fail("ORDER_UPDATE_FAILED", "getOrderById");
  if (!data) return { ok: false, code: "ORDER_NOT_FOUND" };
  return { ok: true, value: mapOrderRow(data) };
}

export async function getOrderByCheckoutSessionId(
  sessionId: string,
): Promise<OrderResult<PersistedOrder>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  const { data, error } = await db
    .from("shop_orders")
    .select()
    .eq("stripe_checkout_session_id", sessionId)
    .maybeSingle();
  if (error) return fail("ORDER_UPDATE_FAILED", "getOrderByCheckoutSessionId");
  if (!data) return { ok: false, code: "ORDER_NOT_FOUND" };
  return { ok: true, value: mapOrderRow(data) };
}

/**
 * Apply a verified-webhook update with an explicit, guarded state
 * transition. Concurrency-safe: the UPDATE is conditioned on the expected
 * current status; losing a race re-checks whether the target state was
 * already reached (idempotent success) or a real conflict occurred.
 */
export async function updateOrderFromVerifiedStripeEvent(
  order: PersistedOrder,
  update: StripeOrderUpdate,
): Promise<OrderResult<PersistedOrder>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };

  if (!canTransition(order.status, update.targetStatus)) {
    return { ok: false, code: "ORDER_INVALID_STATE_TRANSITION" };
  }

  const payload: Record<string, unknown> = { status: update.targetStatus };
  if (update.customerEmail !== undefined) payload.customer_email = update.customerEmail;
  if (update.stripeCustomerId !== undefined) payload.stripe_customer_id = update.stripeCustomerId;
  if (update.stripePaymentIntentId !== undefined) payload.stripe_payment_intent_id = update.stripePaymentIntentId;
  if (update.stripePaymentStatus !== undefined) payload.stripe_payment_status = update.stripePaymentStatus;
  if (update.targetStatus === "paid") payload.paid_at = new Date().toISOString();
  if (update.targetStatus === "expired") payload.expired_at = new Date().toISOString();
  if (update.targetStatus === "cancelled") payload.cancelled_at = new Date().toISOString();

  const { data, error } = await db
    .from("shop_orders")
    .update(payload)
    .eq("id", order.id)
    .eq("status", order.status) // optimistic guard
    .select()
    .maybeSingle();

  if (error) return fail("ORDER_UPDATE_FAILED", "updateOrderFromVerifiedStripeEvent");
  if (data) return { ok: true, value: mapOrderRow(data) };

  // Lost a race — idempotent if the target state was reached by another
  // delivery of the same effect.
  const current = await getOrderById(order.id);
  if (current.ok && current.value.status === update.targetStatus) {
    return current;
  }
  return fail("ORDER_UPDATE_FAILED", "updateOrderFromVerifiedStripeEvent(race)");
}

/**
 * Claim a Stripe event for processing — THE durable idempotency gate.
 * Insert-first (unique primary key on stripe_event_id); on conflict the
 * existing row decides: duplicate / in-flight / retryable takeover.
 */
export async function beginStripeEventProcessing(event: {
  id: string;
  type: string;
  createdAtMs?: number;
}): Promise<OrderResult<EventClaim>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };

  const { error: insertError } = await db.from("shop_stripe_events").insert({
    stripe_event_id: event.id,
    event_type: event.type,
    processing_status: "processing",
    stripe_created_at: event.createdAtMs
      ? new Date(event.createdAtMs).toISOString()
      : null,
  });
  if (!insertError) return { ok: true, value: { kind: "new" } };
  if (insertError.code !== UNIQUE_VIOLATION) {
    return fail("ORDER_EVENT_PROCESSING_FAILED", "beginStripeEventProcessing(insert)");
  }

  const { data: existing, error: selectError } = await db
    .from("shop_stripe_events")
    .select("processing_status, attempt_count, updated_at")
    .eq("stripe_event_id", event.id)
    .maybeSingle();
  if (selectError || !existing) {
    return fail("ORDER_EVENT_PROCESSING_FAILED", "beginStripeEventProcessing(select)");
  }

  const decision = classifyEventClaim(
    {
      processingStatus: existing.processing_status,
      updatedAtMs: new Date(existing.updated_at).getTime(),
    },
    Date.now(),
  );

  if (decision === "duplicate") {
    return {
      ok: true,
      value: { kind: "duplicate", status: existing.processing_status },
    };
  }
  if (decision === "in-flight") {
    return { ok: true, value: { kind: "in-flight" } };
  }

  // retryable (failed / received / stale processing): take over, guarded on
  // the status we saw so a concurrent claimer wins at most once.
  const staleIso = new Date(Date.now() - STALE_CLAIM_MS).toISOString();
  let takeover = db
    .from("shop_stripe_events")
    .update({
      processing_status: "processing",
      attempt_count: (existing.attempt_count ?? 1) + 1,
      error_code: null,
    })
    .eq("stripe_event_id", event.id)
    .eq("processing_status", existing.processing_status);
  if (existing.processing_status === "processing") {
    takeover = takeover.lt("updated_at", staleIso);
  }
  const { data: claimed, error: takeoverError } = await takeover.select().maybeSingle();
  if (takeoverError) {
    return fail("ORDER_EVENT_PROCESSING_FAILED", "beginStripeEventProcessing(takeover)");
  }
  if (!claimed) return { ok: true, value: { kind: "in-flight" } };
  return { ok: true, value: { kind: "new" } };
}

/** Mark a claimed event processed (or ignored) and link its order. */
export async function completeStripeEventProcessing(
  eventId: string,
  result: { status: "processed" | "ignored"; orderId?: string | null },
): Promise<OrderResult<null>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  const { error } = await db
    .from("shop_stripe_events")
    .update({
      processing_status: result.status,
      processed_at: new Date().toISOString(),
      order_id: result.orderId ?? null,
    })
    .eq("stripe_event_id", eventId);
  if (error) return fail("ORDER_EVENT_PROCESSING_FAILED", "completeStripeEventProcessing");
  return { ok: true, value: null };
}

/** Record a failed processing attempt (Stripe may retry → takeover path). */
export async function failStripeEventProcessing(
  eventId: string,
  safeErrorCode: string,
): Promise<OrderResult<null>> {
  const db = getSupabaseAdmin();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  const { error } = await db
    .from("shop_stripe_events")
    .update({ processing_status: "failed", error_code: safeErrorCode })
    .eq("stripe_event_id", eventId);
  if (error) return fail("ORDER_EVENT_PROCESSING_FAILED", "failStripeEventProcessing");
  return { ok: true, value: null };
}

const SESSION_ID_PATTERN = /^cs_[A-Za-z0-9_]+$/;

/**
 * Public-safe order status for /checkout/success. The session id is used
 * ONLY as a lookup key — it is never payment proof; the persisted
 * webhook-driven status is the authority. Never throws, never exposes
 * internal UUIDs or customer data, never fakes a status when the database
 * is unavailable.
 */
export async function getPublicOrderStatusForSession(
  sessionId: string | undefined,
): Promise<PublicOrderStatus> {
  if (!sessionId) return { kind: "no-reference" };
  if (!SESSION_ID_PATTERN.test(sessionId)) return { kind: "unknown" };
  try {
    const db = getSupabaseAdmin();
    if (!db) return { kind: "unavailable" };
    const { data, error } = await db
      .from("shop_orders")
      .select("order_number, status")
      .eq("stripe_checkout_session_id", sessionId)
      .maybeSingle();
    if (error) return { kind: "unavailable" };
    if (!data) return { kind: "unknown" };
    if (data.status === "paid") {
      return { kind: "paid", orderNumber: data.order_number };
    }
    if (data.status === "payment_pending") return { kind: "processing" };
    return { kind: "not-confirmed" };
  } catch {
    return { kind: "unavailable" };
  }
}
