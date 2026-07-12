import "server-only";

/**
 * Server-only environment reader for the shop checkout backbone.
 *
 * Rules:
 *  - Secret VALUES never appear in errors, logs or responses — only the
 *    names of missing variables.
 *  - Checkout code must FAIL CLOSED: when a required variable is missing,
 *    callers receive a configuration status and must abort, never fall back
 *    to a permissive default.
 */

/** Server-only Stripe secret key (sk_test_… in development). Null = unset. */
export function getStripeSecretKey(): string | null {
  const value = process.env.STRIPE_SECRET_KEY;
  return value && value.trim().length > 0 ? value : null;
}

/** Server-only Stripe webhook signing secret (whsec_…). Null = unset. */
export function getStripeWebhookSecret(): string | null {
  const value = process.env.STRIPE_WEBHOOK_SECRET;
  return value && value.trim().length > 0 ? value : null;
}

/**
 * Public base URL for Stripe success/cancel redirects. Falls back to
 * localhost for local development; must be set in real deployments.
 */
export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  return value && value.trim().length > 0
    ? value.replace(/\/+$/, "")
    : "http://localhost:3000";
}

export interface CheckoutEnvStatus {
  configured: boolean;
  /** Names (never values) of missing required variables. */
  missing: string[];
}

/** Configuration status for creating checkout sessions. */
export function getCheckoutEnvStatus(): CheckoutEnvStatus {
  const missing: string[] = [];
  if (!getStripeSecretKey()) missing.push("STRIPE_SECRET_KEY");
  // Must be EXPLICITLY set for session creation: the localhost fallback of
  // getSiteUrl() would otherwise send paying customers to localhost
  // redirect URLs on a misconfigured deployment.
  if (!process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    missing.push("NEXT_PUBLIC_SITE_URL");
  }
  return { configured: missing.length === 0, missing };
}

/** Configuration status for verifying incoming Stripe webhooks. */
export function getWebhookEnvStatus(): CheckoutEnvStatus {
  const missing: string[] = [];
  if (!getStripeSecretKey()) missing.push("STRIPE_SECRET_KEY");
  if (!getStripeWebhookSecret()) missing.push("STRIPE_WEBHOOK_SECRET");
  return { configured: missing.length === 0, missing };
}
