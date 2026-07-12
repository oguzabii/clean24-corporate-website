/**
 * Checkout request/response contract shared by the API route and the client.
 *
 * SECURITY MODEL: the browser sends ONLY identifiers and quantities. Names,
 * prices, currency, availability and VAT status are resolved exclusively on
 * the server from the catalog (lib/shop/catalog-server.ts) — client-sent
 * values for those are never read.
 *
 * Types only — safe to import from client components.
 */

/** What the client is allowed to send per cart line. */
export interface CheckoutRequestItem {
  productId: string;
  variantId: string;
  quantity: number;
}

/** POST /api/checkout request body. */
export interface CreateCheckoutRequest {
  items: CheckoutRequestItem[];
}

/** A fully server-resolved, server-priced checkout line. */
export interface CheckoutResolvedLine {
  productId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitAmountCents: number;
  lineAmountCents: number;
  currency: string;
  vatIncluded: boolean;
  requiresShipping: boolean;
}

/** Narrow, explicit error codes — no stack traces, no secrets. */
export type CheckoutErrorCode =
  | "CHECKOUT_DISABLED"
  | "SHOP_PRELAUNCH"
  | "EMPTY_CART"
  | "INVALID_PAYLOAD"
  | "PRODUCT_NOT_FOUND"
  | "VARIANT_NOT_FOUND"
  | "PRODUCT_UNAVAILABLE"
  | "VARIANT_UNAVAILABLE"
  | "PRICE_NOT_FINAL"
  | "CHECKOUT_NOT_CONFIGURED"
  | "ORDER_PERSISTENCE_DISABLED"
  | "ORDER_CREATE_FAILED"
  | "PROVIDER_ERROR";

export interface CheckoutErrorResponse {
  code: CheckoutErrorCode;
  message: string;
}

/** Success response: the Stripe-hosted checkout URL and nothing else. */
export interface CheckoutSuccessResponse {
  url: string;
}

/** Quantity guardrails (enforced server-side in catalog-server.ts). */
export const MIN_QUANTITY_PER_LINE = 1;
export const MAX_QUANTITY_PER_LINE = 20;
