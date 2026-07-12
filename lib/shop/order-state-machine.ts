/**
 * Pure order-state machine — no database, no Stripe SDK, no side effects.
 * The single source of truth for which order-status transitions are legal.
 * Repositories and the webhook processor MUST route every status change
 * through these helpers.
 */

import type { ShopOrderStatus } from "./order-types";

/**
 * Allowed transitions. Anything not listed is forbidden — most importantly:
 *  - paid may never regress (paid → payment_pending / payment_failed / …).
 *  - expired → paid is forbidden until an explicitly reviewed late-payment
 *    rule exists (Stripe can complete async payments late; handling that
 *    needs a deliberate business decision, not an accidental transition).
 *  - terminal failure states stay terminal.
 */
const ALLOWED_TRANSITIONS: Record<ShopOrderStatus, readonly ShopOrderStatus[]> = {
  pending_checkout: ["checkout_created", "checkout_failed", "expired", "cancelled"],
  checkout_created: ["payment_pending", "paid", "payment_failed", "expired", "cancelled"],
  payment_pending: ["paid", "payment_failed", "expired", "cancelled"],
  paid: ["refunded"],
  payment_failed: ["expired", "cancelled"],
  expired: [],
  cancelled: [],
  refunded: [],
  checkout_failed: [],
};

export function canTransition(
  from: ShopOrderStatus,
  to: ShopOrderStatus,
): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Statuses that must never be overwritten by later, weaker events. */
export function isSettledStatus(status: ShopOrderStatus): boolean {
  return status === "paid" || status === "refunded";
}

/** Terminal statuses — no outgoing transitions exist. */
export function isTerminalStatus(status: ShopOrderStatus): boolean {
  return ALLOWED_TRANSITIONS[status].length === 0;
}

/** Decision produced by applying a verified Stripe event to an order. */
export type StripeEventDecision =
  | { action: "transition"; to: ShopOrderStatus }
  | { action: "none"; reason: "already-in-target" | "settled" | "unsupported-event" }
  | { action: "invalid"; from: ShopOrderStatus; to: ShopOrderStatus };

/**
 * Map a verified Stripe checkout event onto the order-state machine.
 * Pure and exhaustively testable. `paymentStatus` is the session's
 * payment_status and is only relevant for checkout.session.completed.
 */
export function decideStripeEventTransition(
  eventType: string,
  currentStatus: ShopOrderStatus,
  paymentStatus?: string | null,
): StripeEventDecision {
  let target: ShopOrderStatus;
  switch (eventType) {
    case "checkout.session.completed":
      target = paymentStatus === "paid" ? "paid" : "payment_pending";
      break;
    case "checkout.session.async_payment_succeeded":
      target = "paid";
      break;
    case "checkout.session.async_payment_failed":
      target = "payment_failed";
      break;
    case "checkout.session.expired":
      target = "expired";
      break;
    default:
      return { action: "none", reason: "unsupported-event" };
  }

  if (currentStatus === target) {
    // Duplicate delivery of the same effect — idempotent no-op.
    return { action: "none", reason: "already-in-target" };
  }
  if (isSettledStatus(currentStatus)) {
    // e.g. expired/failed events arriving after paid: never regress.
    return { action: "none", reason: "settled" };
  }
  if (!canTransition(currentStatus, target)) {
    return { action: "invalid", from: currentStatus, to: target };
  }
  return { action: "transition", to: target };
}

/**
 * Pure classification for claiming a webhook event given the existing ledger
 * row (if any). Encodes the idempotency contract of shop_stripe_events:
 *  - no row            → new (claim it)
 *  - processed/ignored → duplicate (acknowledge, do nothing)
 *  - failed            → retryable (claim again, attempt_count + 1)
 *  - processing        → in-flight, UNLESS the claim is stale (crashed
 *    worker) — stale claims may be taken over after STALE_CLAIM_MS.
 */
export const STALE_CLAIM_MS = 5 * 60 * 1000;

export type ExistingEventClaim = {
  processingStatus: "received" | "processing" | "processed" | "ignored" | "failed";
  updatedAtMs: number;
};

export type EventClaimDecision = "new" | "duplicate" | "in-flight" | "retryable";

export function classifyEventClaim(
  existing: ExistingEventClaim | null,
  nowMs: number,
): EventClaimDecision {
  if (!existing) return "new";
  switch (existing.processingStatus) {
    case "processed":
    case "ignored":
      return "duplicate";
    case "failed":
    case "received":
      return "retryable";
    case "processing":
      return nowMs - existing.updatedAtMs > STALE_CLAIM_MS ? "retryable" : "in-flight";
  }
}
