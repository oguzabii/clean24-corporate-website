import "server-only";

import { getDbPool } from "@/lib/db/server";
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
 * Server-only order repository (Neon PostgreSQL via node-postgres).
 *
 *  - Every function returns a typed OrderResult; raw database errors are
 *    mapped to narrow OrderPersistenceErrorCode values and NEVER leave this
 *    module (log sanitized codes only, no customer data, no SQL).
 *  - All statements are parameterized — nothing user-influenced is ever
 *    interpolated into SQL text.
 *  - Order + items are created atomically via the create_shop_pending_order
 *    function (single transaction) — items are immutable sales snapshots.
 *  - Stripe event idempotency is DURABLE via shop_stripe_events keyed on
 *    event.id. There is deliberately no in-memory dedup.
 *  - All state changes go through lib/shop/order-state-machine.ts.
 */

const UNIQUE_VIOLATION = "23505";
const ORDER_NUMBER_ATTEMPTS = 3;

/* eslint-disable @typescript-eslint/no-explicit-any -- driver rows are
   untyped; mapping happens immediately below. */

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

function pgErrorCode(error: unknown): string | undefined {
  return typeof error === "object" && error !== null
    ? (error as { code?: string }).code
    : undefined;
}

/** Atomically create a pending order with immutable item snapshots. */
export async function createPendingOrder(
  input: CreatePendingOrderInput,
): Promise<OrderResult<PendingOrder>> {
  const db = getDbPool();
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
    try {
      const { rows } = await db.query(
        "select create_shop_pending_order($1, $2, $3::jsonb, $4::jsonb) as result",
        [
          orderNumber,
          input.currency,
          JSON.stringify(items),
          JSON.stringify(input.metadata ?? {}),
        ],
      );
      const result = rows[0]?.result;
      if (!result) return fail("ORDER_CREATE_FAILED", "createPendingOrder(no-result)");
      return {
        ok: true,
        value: {
          orderId: result.order_id,
          orderNumber: result.order_number,
          subtotalCents: result.subtotal_cents,
          totalCents: result.total_cents,
        },
      };
    } catch (error) {
      if (pgErrorCode(error) === UNIQUE_VIOLATION) continue;
      return fail("ORDER_CREATE_FAILED", "createPendingOrder");
    }
  }
  return fail("ORDER_CREATE_FAILED", "createPendingOrder(collisions)");
}

/** Link the Stripe session and move pending_checkout → checkout_created. */
export async function attachStripeCheckoutSession(
  orderId: string,
  sessionId: string,
): Promise<OrderResult<PersistedOrder>> {
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  try {
    const { rows } = await db.query(
      `update shop_orders
         set stripe_checkout_session_id = $2, status = 'checkout_created'
       where id = $1 and status = 'pending_checkout'
       returning *`,
      [orderId, sessionId],
    );
    if (rows.length === 0) return fail("ORDER_SESSION_LINK_FAILED", "attachStripeCheckoutSession");
    return { ok: true, value: mapOrderRow(rows[0]) };
  } catch {
    return fail("ORDER_SESSION_LINK_FAILED", "attachStripeCheckoutSession(query)");
  }
}

/** Terminal bookkeeping when Stripe session creation fails. */
export async function markOrderCheckoutFailed(
  orderId: string,
  safeErrorCode: string,
): Promise<OrderResult<null>> {
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  try {
    await db.query(
      `update shop_orders
         set status = 'checkout_failed', checkout_error_code = $2
       where id = $1 and status = 'pending_checkout'`,
      [orderId, safeErrorCode],
    );
    return { ok: true, value: null };
  } catch {
    return fail("ORDER_UPDATE_FAILED", "markOrderCheckoutFailed");
  }
}

export async function getOrderById(
  orderId: string,
): Promise<OrderResult<PersistedOrder>> {
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  try {
    const { rows } = await db.query("select * from shop_orders where id = $1", [
      orderId,
    ]);
    if (rows.length === 0) return { ok: false, code: "ORDER_NOT_FOUND" };
    return { ok: true, value: mapOrderRow(rows[0]) };
  } catch {
    return fail("ORDER_UPDATE_FAILED", "getOrderById");
  }
}

export async function getOrderByCheckoutSessionId(
  sessionId: string,
): Promise<OrderResult<PersistedOrder>> {
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  try {
    const { rows } = await db.query(
      "select * from shop_orders where stripe_checkout_session_id = $1",
      [sessionId],
    );
    if (rows.length === 0) return { ok: false, code: "ORDER_NOT_FOUND" };
    return { ok: true, value: mapOrderRow(rows[0]) };
  } catch {
    return fail("ORDER_UPDATE_FAILED", "getOrderByCheckoutSessionId");
  }
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
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };

  if (!canTransition(order.status, update.targetStatus)) {
    return { ok: false, code: "ORDER_INVALID_STATE_TRANSITION" };
  }

  // Whitelisted, parameterized SET fragments only.
  const sets: string[] = ["status = $3"];
  const params: unknown[] = [order.id, order.status, update.targetStatus];
  const push = (fragment: string, value: unknown) => {
    params.push(value);
    sets.push(`${fragment} = $${params.length}`);
  };
  if (update.customerEmail !== undefined) push("customer_email", update.customerEmail);
  if (update.stripeCustomerId !== undefined) push("stripe_customer_id", update.stripeCustomerId);
  if (update.stripePaymentIntentId !== undefined) push("stripe_payment_intent_id", update.stripePaymentIntentId);
  if (update.stripePaymentStatus !== undefined) push("stripe_payment_status", update.stripePaymentStatus);
  if (update.targetStatus === "paid") sets.push("paid_at = now()");
  if (update.targetStatus === "expired") sets.push("expired_at = now()");
  if (update.targetStatus === "cancelled") sets.push("cancelled_at = now()");

  try {
    const { rows } = await db.query(
      `update shop_orders set ${sets.join(", ")}
       where id = $1 and status = $2
       returning *`,
      params,
    );
    if (rows.length > 0) return { ok: true, value: mapOrderRow(rows[0]) };

    // Lost a race — idempotent if the target state was reached by another
    // delivery of the same effect.
    const current = await getOrderById(order.id);
    if (current.ok && current.value.status === update.targetStatus) {
      return current;
    }
    return fail("ORDER_UPDATE_FAILED", "updateOrderFromVerifiedStripeEvent(race)");
  } catch {
    return fail("ORDER_UPDATE_FAILED", "updateOrderFromVerifiedStripeEvent");
  }
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
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };

  try {
    const inserted = await db.query(
      `insert into shop_stripe_events (stripe_event_id, event_type, processing_status, stripe_created_at)
       values ($1, $2, 'processing', $3)
       on conflict (stripe_event_id) do nothing
       returning stripe_event_id`,
      [
        event.id,
        event.type,
        event.createdAtMs ? new Date(event.createdAtMs).toISOString() : null,
      ],
    );
    if (inserted.rows.length > 0) return { ok: true, value: { kind: "new" } };

    const { rows: existingRows } = await db.query(
      `select processing_status, attempt_count, updated_at
         from shop_stripe_events where stripe_event_id = $1`,
      [event.id],
    );
    const existing = existingRows[0];
    if (!existing) {
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

    // retryable (failed / received / stale processing): take over, guarded
    // on the status we saw so a concurrent claimer wins at most once.
    const staleGuard =
      existing.processing_status === "processing"
        ? "and updated_at < $4"
        : "";
    const params: unknown[] = [
      event.id,
      existing.processing_status,
      (existing.attempt_count ?? 1) + 1,
    ];
    if (staleGuard) params.push(new Date(Date.now() - STALE_CLAIM_MS).toISOString());
    const takeover = await db.query(
      `update shop_stripe_events
          set processing_status = 'processing', attempt_count = $3, error_code = null
        where stripe_event_id = $1 and processing_status = $2 ${staleGuard}
        returning stripe_event_id`,
      params,
    );
    if (takeover.rows.length === 0) return { ok: true, value: { kind: "in-flight" } };
    return { ok: true, value: { kind: "new" } };
  } catch {
    return fail("ORDER_EVENT_PROCESSING_FAILED", "beginStripeEventProcessing");
  }
}

/** Mark a claimed event processed (or ignored) and link its order. */
export async function completeStripeEventProcessing(
  eventId: string,
  result: { status: "processed" | "ignored"; orderId?: string | null },
): Promise<OrderResult<null>> {
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  try {
    await db.query(
      `update shop_stripe_events
          set processing_status = $2, processed_at = now(), order_id = $3
        where stripe_event_id = $1`,
      [eventId, result.status, result.orderId ?? null],
    );
    return { ok: true, value: null };
  } catch {
    return fail("ORDER_EVENT_PROCESSING_FAILED", "completeStripeEventProcessing");
  }
}

/** Record a failed processing attempt (Stripe may retry → takeover path). */
export async function failStripeEventProcessing(
  eventId: string,
  safeErrorCode: string,
): Promise<OrderResult<null>> {
  const db = getDbPool();
  if (!db) return { ok: false, code: "ORDER_DATABASE_NOT_CONFIGURED" };
  try {
    await db.query(
      `update shop_stripe_events
          set processing_status = 'failed', error_code = $2
        where stripe_event_id = $1`,
      [eventId, safeErrorCode],
    );
    return { ok: true, value: null };
  } catch {
    return fail("ORDER_EVENT_PROCESSING_FAILED", "failStripeEventProcessing");
  }
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
    const db = getDbPool();
    if (!db) return { kind: "unavailable" };
    const { rows } = await db.query(
      "select order_number, status from shop_orders where stripe_checkout_session_id = $1",
      [sessionId],
    );
    const row = rows[0];
    if (!row) return { kind: "unknown" };
    if (row.status === "paid") {
      return { kind: "paid", orderNumber: row.order_number };
    }
    if (row.status === "payment_pending") return { kind: "processing" };
    return { kind: "not-confirmed" };
  } catch {
    return { kind: "unavailable" };
  }
}
