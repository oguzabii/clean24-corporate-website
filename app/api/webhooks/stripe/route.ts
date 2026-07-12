import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { shopConfig } from "@/data/shop-config";
import { getStripeWebhookSecret } from "@/lib/shop/env";
import { getStripe } from "@/lib/stripe/server";

/**
 * POST /api/webhooks/stripe — verified Stripe webhook receiver (Phase 13A).
 *
 * SECURITY MODEL
 *  - The RAW request body (request.text()) is verified against the
 *    Stripe-Signature header with STRIPE_WEBHOOK_SECRET BEFORE any JSON
 *    parsing. Unsigned/invalid requests are rejected.
 *  - Missing configuration fails closed (503) — nothing is processed.
 *  - Logs contain at most the event id and type — never payloads, customer
 *    data or secrets.
 *  - THE WEBHOOK IS THE ONLY SOURCE OF PAYMENT CONFIRMATION. The success
 *    page redirect proves nothing.
 *
 * FULFILMENT BOUNDARY (Phase 13B)
 *  - While shopConfig.webhookFulfilmentEnabled / orderPersistenceEnabled are
 *    false, handleVerifiedCheckoutEvent refuses fulfilment: no order is
 *    stored, no email sent, no stock updated. We still acknowledge with 200
 *    (a controlled non-fulfilment): while checkout is disabled no legitimate
 *    session from this shop can exist, so there is nothing to retry.
 *  - Idempotency: Stripe's event.id is the FUTURE durable idempotency key.
 *    Do NOT add in-memory dedup here — it would falsely look durable across
 *    restarts/instances. Phase 13B must dedup on event.id in the order store.
 */

/** Only these event types are relevant to the checkout flow. */
const SUPPORTED_EVENTS = new Set<string>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
]);

interface FulfilmentDecision {
  fulfilled: false;
  reason: "fulfilment-disabled" | "persistence-not-implemented";
}

/**
 * Phase 13B boundary: the single entry point that may ever trigger
 * fulfilment for a signature-verified event. It must refuse while the
 * safety flags are off — and refuses even after they flip until durable
 * order persistence actually exists.
 */
function handleVerifiedCheckoutEvent(event: Stripe.Event): FulfilmentDecision {
  if (!shopConfig.webhookFulfilmentEnabled || !shopConfig.orderPersistenceEnabled) {
    return { fulfilled: false, reason: "fulfilment-disabled" };
  }
  // Phase 13B: load-or-create order keyed on event.id (idempotent), persist
  // durably, then fulfil. Until that exists, refuse — never pretend an
  // order was stored.
  void event;
  return { fulfilled: false, reason: "persistence-not-implemented" };
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Fail closed when the webhook secret or Stripe client is not configured.
  const webhookSecret = getStripeWebhookSecret();
  const stripe = getStripe();
  if (!webhookSecret || !stripe) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  // Raw body FIRST — signature verification happens before any JSON.parse.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    // Invalid signature — reject without echoing any request details.
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // Acknowledge (but ignore) event types we do not handle, so Stripe does
  // not retry them against us.
  if (!SUPPORTED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true, handled: false });
  }

  const decision = handleVerifiedCheckoutEvent(event);

  // Sanitized development-only trace: id + type, nothing else.
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[stripe-webhook] verified ${event.type} (${event.id}) — fulfilled=${decision.fulfilled} (${decision.reason})`,
    );
  }

  return NextResponse.json({ received: true, fulfilled: decision.fulfilled });
}
