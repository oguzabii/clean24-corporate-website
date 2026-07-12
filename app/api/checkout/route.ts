import { NextResponse } from "next/server";
import { shopConfig } from "@/data/shop-config";
import {
  resolveCheckoutLines,
  sanitizeCheckoutItems,
} from "@/lib/shop/catalog-server";
import { getCheckoutEnvStatus, getSiteUrl } from "@/lib/shop/env";
import { getStripe } from "@/lib/stripe/server";
import type {
  CheckoutErrorCode,
  CheckoutErrorResponse,
} from "@/lib/shop/checkout-types";

/**
 * POST /api/checkout — Stripe test-mode checkout backbone (Phase 13A).
 *
 * SECURITY MODEL
 *  - Fails closed on every gate: config flags → payload → catalog →
 *    environment. While shopConfig.checkoutEnabled is false, EVERY request
 *    is rejected with CHECKOUT_DISABLED before anything else runs.
 *  - The browser sends only { items: [{ productId, variantId, quantity }] }.
 *    Names, prices, currency, availability and VAT are resolved exclusively
 *    from the server catalog — client-sent price fields are never read.
 *  - No Stripe objects, stack traces or secret values ever reach the client;
 *    the success response contains the session URL and nothing else.
 *  - A redirect to the success page is NOT payment proof — confirmation is
 *    webhook-only (app/api/webhooks/stripe/route.ts).
 */

function errorResponse(
  status: number,
  code: CheckoutErrorCode,
  message: string,
): NextResponse<CheckoutErrorResponse> {
  return NextResponse.json({ code, message }, { status });
}

export async function POST(request: Request) {
  // Gate 1 — master switch. Keep false until the launch checklist in
  // docs/stripe-checkout-architecture.md is complete.
  if (!shopConfig.checkoutEnabled) {
    return errorResponse(
      503,
      "CHECKOUT_DISABLED",
      "Der Online-Checkout wird aktuell vorbereitet.",
    );
  }

  // Gate 2 — the shop itself must be live (not prelaunch/paused).
  if (shopConfig.shopStatus !== "live") {
    return errorResponse(
      503,
      "SHOP_PRELAUNCH",
      "Der Shop ist noch nicht für den Verkauf freigeschaltet.",
    );
  }

  // Gate 3 — a payment without a durable order record must be impossible.
  // Both flags are Phase 13B deliverables; this deliberately prevents
  // accidental payments before a real order system exists.
  if (!shopConfig.orderPersistenceEnabled || !shopConfig.webhookFulfilmentEnabled) {
    return errorResponse(
      503,
      "ORDER_PERSISTENCE_DISABLED",
      "Bestellungen können noch nicht gespeichert werden.",
    );
  }

  // Gate 4 — payload validation (identifiers + quantities only).
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "INVALID_PAYLOAD", "Ungültige Anfrage.");
  }
  const sanitized = sanitizeCheckoutItems(body);
  if (!sanitized.ok) {
    return errorResponse(400, sanitized.code, sanitized.message);
  }

  // Gate 5 — server-side catalog resolution and repricing.
  const resolved = resolveCheckoutLines(sanitized.items);
  if (!resolved.ok) {
    const status =
      resolved.code === "PRODUCT_NOT_FOUND" || resolved.code === "VARIANT_NOT_FOUND"
        ? 404
        : 409;
    return errorResponse(status, resolved.code, resolved.message);
  }

  // Gate 6 — environment. Missing variables fail closed; only variable
  // NAMES are logged server-side, never values.
  const env = getCheckoutEnvStatus();
  const stripe = getStripe();
  if (!env.configured || !stripe) {
    console.error(
      `[checkout] not configured — missing env: ${env.missing.join(", ") || "unknown"}`,
    );
    return errorResponse(
      503,
      "CHECKOUT_NOT_CONFIGURED",
      "Der Zahlungsanbieter ist nicht konfiguriert.",
    );
  }

  // Create the Stripe Checkout Session from SERVER-resolved lines only.
  // Payment methods (card, TWINT for CHF) are governed by the Stripe
  // dashboard configuration — CHF keeps the session TWINT-compatible.
  const siteUrl = getSiteUrl();
  const anyShipping = resolved.lines.some((l) => l.requiresShipping);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: shopConfig.currency.toLowerCase(),
      line_items: resolved.lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: line.currency.toLowerCase(),
          unit_amount: line.unitAmountCents,
          // Server-resolved name — never the client's.
          product_data: {
            name: `${line.productName} – ${line.variantLabel}`,
            metadata: {
              productId: line.productId,
              variantId: line.variantId,
            },
          },
        },
      })),
      billing_address_collection: "required",
      ...(anyShipping
        ? {
            // Physical products: Switzerland only for now.
            shipping_address_collection: { allowed_countries: ["CH"] },
          }
        : {}),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      // Internal mapping for webhook-side verification (Phase 13B). Values
      // stay well under Stripe's 500-char metadata limit (≤ 50 lines capped
      // in sanitizeCheckoutItems, small catalog ids).
      metadata: {
        source: "clean24-shop",
        lineCount: String(resolved.lines.length),
        totalCents: String(resolved.totalCents),
      },
    });

    if (!session.url) {
      return errorResponse(502, "PROVIDER_ERROR", "Zahlungsanbieter nicht erreichbar.");
    }
    // URL only — no session object, no secrets.
    return NextResponse.json({ url: session.url });
  } catch {
    // Never surface provider error details (may contain request internals).
    console.error("[checkout] provider error while creating session");
    return errorResponse(502, "PROVIDER_ERROR", "Zahlungsanbieter nicht erreichbar.");
  }
}
