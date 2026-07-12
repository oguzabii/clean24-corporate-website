import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { shopConfig } from "@/data/shop-config";
import { getStripeWebhookSecret } from "@/lib/shop/env";
import { processVerifiedStripeEvent } from "@/lib/shop/stripe-webhook-processor";
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
 * PROCESSING BOUNDARY (Phase 13B1)
 *  - While shopConfig.webhookFulfilmentEnabled / orderPersistenceEnabled are
 *    false, this route refuses processing: no order is stored or updated, no
 *    email sent, no stock changed. It acknowledges with 200 (controlled
 *    non-fulfilment): while checkout is disabled no legitimate session from
 *    this shop can exist, so there is nothing to retry.
 *  - Once both flags are true, verified events are processed DURABLY and
 *    idempotently via lib/shop/stripe-webhook-processor.ts, keyed on
 *    Stripe's event.id in shop_stripe_events. No in-memory dedup exists.
 */

/** Only these event types are relevant to the checkout flow. */
const SUPPORTED_EVENTS = new Set<string>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
]);

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

  // Processing boundary: while the safety flags are off, verified events are
  // acknowledged but nothing is stored, updated or fulfilled.
  if (!shopConfig.webhookFulfilmentEnabled || !shopConfig.orderPersistenceEnabled) {
    // Acknowledge (but ignore) unsupported event types either way.
    if (!SUPPORTED_EVENTS.has(event.type)) {
      return NextResponse.json({ received: true, handled: false });
    }
    // Sanitized development-only trace: id + type, nothing else.
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[stripe-webhook] verified ${event.type} (${event.id}) — fulfilled=false (fulfilment-disabled)`,
      );
    }
    return NextResponse.json({ received: true, fulfilled: false });
  }

  // Durable, idempotent processing (shop_stripe_events keyed on event.id).
  // Unsupported events are recorded as ignored inside the processor.
  const result = await processVerifiedStripeEvent(event);
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[stripe-webhook] verified ${event.type} (${event.id}) — status=${result.status}`,
    );
  }
  return NextResponse.json(result.body, { status: result.status });
}
