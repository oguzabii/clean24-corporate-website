import "server-only";

import Stripe from "stripe";
import { getStripeSecretKey } from "@/lib/shop/env";

/**
 * Lazy, server-only Stripe client.
 *
 *  - The client is constructed on first use at REQUEST time, never at module
 *    load, so static builds succeed without any Stripe key present.
 *  - Returns null when STRIPE_SECRET_KEY is unset — callers must fail closed
 *    with a controlled CHECKOUT_NOT_CONFIGURED error.
 *  - Uses the SDK's pinned default API version (no manual override).
 *  - Never log the key or full Stripe objects containing secrets.
 */

let cachedStripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cachedStripe) return cachedStripe;
  const secretKey = getStripeSecretKey();
  if (!secretKey) return null;
  cachedStripe = new Stripe(secretKey);
  return cachedStripe;
}
