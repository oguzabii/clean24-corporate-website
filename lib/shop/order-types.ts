/**
 * Order-persistence domain types (Phase 13B1).
 *
 * Types only — safe to import anywhere. Runtime persistence logic lives in
 * server-only modules (order-repository.ts). Raw database errors must never
 * cross this boundary: repositories map them to OrderPersistenceErrorCode.
 */

import type { CheckoutResolvedLine } from "./checkout-types";

/** Full lifecycle of a shop order (mirrors the shop_orders CHECK constraint). */
export type ShopOrderStatus =
  | "pending_checkout"
  | "checkout_created"
  | "payment_pending"
  | "paid"
  | "payment_failed"
  | "expired"
  | "cancelled"
  | "refunded"
  | "checkout_failed";

/** Processing state of a webhook event (mirrors shop_stripe_events). */
export type StripeEventProcessingStatus =
  | "received"
  | "processing"
  | "processed"
  | "ignored"
  | "failed";

/** Narrow persistence error codes — never raw database errors. */
export type OrderPersistenceErrorCode =
  | "ORDER_DATABASE_NOT_CONFIGURED"
  | "ORDER_CREATE_FAILED"
  | "ORDER_NOT_FOUND"
  | "ORDER_UPDATE_FAILED"
  | "ORDER_EVENT_ALREADY_PROCESSED"
  | "ORDER_EVENT_PROCESSING_FAILED"
  | "ORDER_SESSION_LINK_FAILED"
  | "ORDER_INVALID_STATE_TRANSITION";

export interface CreatePendingOrderInput {
  /** Server-resolved (catalog-priced) lines — NEVER client-priced. */
  lines: CheckoutResolvedLine[];
  currency: string;
  /** Internal metadata stored on the order row (no customer data). */
  metadata?: Record<string, string | number | boolean>;
}

/** Result of a successful atomic pending-order creation. */
export interface PendingOrder {
  orderId: string;
  orderNumber: string;
  subtotalCents: number;
  totalCents: number;
}

/** Immutable persisted order line (as stored in shop_order_items). */
export interface PersistedOrderItem {
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  sku: string | null;
  quantity: number;
  unitAmountCents: number;
  lineAmountCents: number;
  vatIncluded: boolean;
  requiresShipping: boolean;
}

/** The subset of a shop_orders row the server works with. */
export interface PersistedOrder {
  id: string;
  orderNumber: string;
  status: ShopOrderStatus;
  currency: string;
  subtotalCents: number;
  totalCents: number;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  stripePaymentStatus: string | null;
  customerEmail: string | null;
}

/** Stripe-derived fields applied to an order by the webhook processor. */
export interface StripeOrderUpdate {
  targetStatus: ShopOrderStatus;
  customerEmail?: string | null;
  stripeCustomerId?: string | null;
  stripePaymentIntentId?: string | null;
  stripePaymentStatus?: string | null;
}

/** Typed result envelope for repository operations. */
export type OrderResult<T> =
  | { ok: true; value: T }
  | { ok: false; code: OrderPersistenceErrorCode };

/** Decision when claiming a Stripe event for processing. */
export type EventClaim =
  | { kind: "new" }
  | { kind: "duplicate"; status: Extract<StripeEventProcessingStatus, "processed" | "ignored"> }
  | { kind: "in-flight" };

/** Public-safe order status shown on /checkout/success. Never internal ids. */
export type PublicOrderStatus =
  | { kind: "no-reference" }
  | { kind: "unavailable" }
  | { kind: "unknown" }
  | { kind: "paid"; orderNumber: string }
  | { kind: "processing" }
  | { kind: "not-confirmed" };
