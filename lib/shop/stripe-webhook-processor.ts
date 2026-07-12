import "server-only";

import type Stripe from "stripe";
import {
  beginStripeEventProcessing,
  completeStripeEventProcessing,
  failStripeEventProcessing,
  getOrderByCheckoutSessionId,
  getOrderById,
  updateOrderFromVerifiedStripeEvent,
} from "./order-repository";
import {
  decideStripeEventTransition,
  isTerminalStatus,
} from "./order-state-machine";
import type { StripeOrderUpdate } from "./order-types";

/**
 * Durable, idempotent processing of a SIGNATURE-VERIFIED Stripe event
 * (Phase 13B1). Called by the webhook route only after verification and only
 * while orderPersistenceEnabled && webhookFulfilmentEnabled are true.
 *
 * Idempotency: shop_stripe_events keyed on Stripe's event.id — no in-memory
 * tracking. Response-status contract with Stripe:
 *  - 200 → done (processed, duplicate, or permanently unprocessable)
 *  - 409/503 → retry later (another worker owns it / transient failure)
 *
 * Deliberately NOT here yet: no confirmation emails, no stock reduction,
 * no fulfilment side effects — those are a later, separately reviewed phase.
 */

const SUPPORTED_EVENTS = new Set<string>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
]);

export interface WebhookProcessingResult {
  status: number;
  body: Record<string, unknown>;
}

const RETRY_503: WebhookProcessingResult = {
  status: 503,
  body: { received: true, retry: true },
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function processVerifiedStripeEvent(
  event: Stripe.Event,
): Promise<WebhookProcessingResult> {
  // 1. Claim the event durably (idempotency gate).
  const claim = await beginStripeEventProcessing({
    id: event.id,
    type: event.type,
    createdAtMs: typeof event.created === "number" ? event.created * 1000 : undefined,
  });
  if (!claim.ok) {
    // Unconfigured or transient ledger failure → let Stripe retry.
    return RETRY_503;
  }
  if (claim.value.kind === "duplicate") {
    return { status: 200, body: { received: true, idempotent: true } };
  }
  if (claim.value.kind === "in-flight") {
    // Another worker owns this event right now — retry-compatible response.
    return { status: 409, body: { received: true, retry: true } };
  }

  // 2. Unsupported events are recorded as ignored and acknowledged.
  if (!SUPPORTED_EVENTS.has(event.type)) {
    await completeStripeEventProcessing(event.id, { status: "ignored" });
    return { status: 200, body: { received: true, handled: false } };
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // 3. Resolve the order: metadata.order_id → client_reference_id →
  //    stored checkout-session id. Metadata is attacker-influencable in
  //    principle (foreign sessions) — a non-UUID reference must NOT reach
  //    the uuid column query, where it would raise a transient-looking
  //    error and put Stripe into a pointless multi-day retry loop.
  const rawReference =
    session.metadata?.order_id ?? session.client_reference_id ?? null;
  const referencedOrderId =
    rawReference && UUID_PATTERN.test(rawReference) ? rawReference : null;
  let orderResult = referencedOrderId
    ? await getOrderById(referencedOrderId)
    : ({ ok: false, code: "ORDER_NOT_FOUND" } as const);
  if (!orderResult.ok && orderResult.code === "ORDER_NOT_FOUND" && session.id) {
    orderResult = await getOrderByCheckoutSessionId(session.id);
  }
  if (!orderResult.ok) {
    if (orderResult.code === "ORDER_NOT_FOUND") {
      // Permanent: no matching shop order (foreign/test session). Record and
      // acknowledge so Stripe stops retrying.
      await failStripeEventProcessing(event.id, "ORDER_NOT_FOUND");
      return { status: 200, body: { received: true, handled: false } };
    }
    await failStripeEventProcessing(event.id, orderResult.code);
    return RETRY_503;
  }
  const order = orderResult.value;

  // 4. Reject mismatched order/session references: the event's session must
  //    be the session stored on the order.
  if (order.stripeCheckoutSessionId && order.stripeCheckoutSessionId !== session.id) {
    await failStripeEventProcessing(event.id, "SESSION_ORDER_MISMATCH");
    return { status: 200, body: { received: true, handled: false } };
  }

  // 5. Explicit state transition via the pure state machine.
  const decision = decideStripeEventTransition(
    event.type,
    order.status,
    session.payment_status ?? null,
  );

  if (decision.action === "none") {
    // Idempotent no-op (already in target) or protected settled state
    // (e.g. expired event after paid — paid must never regress).
    await completeStripeEventProcessing(event.id, {
      status: "processed",
      orderId: order.id,
    });
    return { status: 200, body: { received: true, idempotent: true } };
  }

  if (decision.action === "invalid") {
    if (isTerminalStatus(order.status)) {
      // Genuinely unreachable transition (e.g. paid event for a
      // checkout_failed order) — record for manual review, stop retries.
      await failStripeEventProcessing(event.id, "ORDER_INVALID_STATE_TRANSITION");
      return { status: 200, body: { received: true, handled: false } };
    }
    // Possibly a race with a slower writer (e.g. payment completed before
    // the session was attached). Retry-compatible: the ledger allows a
    // failed attempt to be re-claimed on Stripe's next delivery.
    await failStripeEventProcessing(event.id, "ORDER_INVALID_STATE_TRANSITION");
    return RETRY_503;
  }

  // 6. Apply the update. Store only the necessary Stripe/customer fields.
  const update: StripeOrderUpdate = { targetStatus: decision.to };
  if (event.type === "checkout.session.completed") {
    update.customerEmail = session.customer_details?.email ?? null;
    update.stripeCustomerId =
      typeof session.customer === "string"
        ? session.customer
        : (session.customer?.id ?? null);
    update.stripePaymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);
    update.stripePaymentStatus = session.payment_status ?? null;
  }

  const updated = await updateOrderFromVerifiedStripeEvent(order, update);
  if (!updated.ok) {
    await failStripeEventProcessing(event.id, updated.code);
    return RETRY_503;
  }

  // 7. Mark the event processed. If THIS write fails, Stripe retries and the
  //    state machine treats the repeat as an idempotent no-op — safe.
  const completed = await completeStripeEventProcessing(event.id, {
    status: "processed",
    orderId: order.id,
  });
  if (!completed.ok) return RETRY_503;

  return { status: 200, body: { received: true, processed: true } };
}
