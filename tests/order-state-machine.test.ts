import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  canTransition,
  classifyEventClaim,
  decideStripeEventTransition,
  isSettledStatus,
  isTerminalStatus,
  STALE_CLAIM_MS,
} from "@/lib/shop/order-state-machine";
import type { ShopOrderStatus } from "@/lib/shop/order-types";

describe("order state machine — allowed transitions", () => {
  const allowed: Array<[ShopOrderStatus, ShopOrderStatus]> = [
    ["pending_checkout", "checkout_created"],
    ["pending_checkout", "checkout_failed"],
    ["checkout_created", "payment_pending"],
    ["checkout_created", "paid"],
    ["checkout_created", "payment_failed"],
    ["checkout_created", "expired"],
    ["payment_pending", "paid"],
    ["payment_pending", "payment_failed"],
    ["payment_pending", "expired"],
    ["paid", "refunded"],
  ];
  for (const [from, to] of allowed) {
    it(`${from} → ${to} is allowed`, () => {
      assert.equal(canTransition(from, to), true);
    });
  }
});

describe("order state machine — forbidden transitions", () => {
  const forbidden: Array<[ShopOrderStatus, ShopOrderStatus]> = [
    // paid must never regress
    ["paid", "payment_pending"],
    ["paid", "payment_failed"],
    ["paid", "checkout_failed"],
    ["paid", "expired"],
    ["paid", "pending_checkout"],
    // expired → paid requires an explicitly reviewed late-payment rule
    ["expired", "paid"],
    // terminal states stay terminal
    ["cancelled", "paid"],
    ["refunded", "paid"],
    ["checkout_failed", "paid"],
    // no skipping into checkout_created from later states
    ["payment_pending", "checkout_created"],
    ["pending_checkout", "paid"],
  ];
  for (const [from, to] of forbidden) {
    it(`${from} → ${to} is forbidden`, () => {
      assert.equal(canTransition(from, to), false);
    });
  }

  it("settled + terminal helpers agree with the transition table", () => {
    assert.equal(isSettledStatus("paid"), true);
    assert.equal(isSettledStatus("refunded"), true);
    assert.equal(isSettledStatus("payment_pending"), false);
    assert.equal(isTerminalStatus("expired"), true);
    assert.equal(isTerminalStatus("checkout_failed"), true);
    assert.equal(isTerminalStatus("paid"), false); // refund still possible
  });
});

describe("stripe event → order state mapping", () => {
  it("completed with payment_status=paid transitions to paid", () => {
    const d = decideStripeEventTransition("checkout.session.completed", "checkout_created", "paid");
    assert.deepEqual(d, { action: "transition", to: "paid" });
  });

  it("completed with unpaid payment_status transitions to payment_pending", () => {
    const d = decideStripeEventTransition("checkout.session.completed", "checkout_created", "unpaid");
    assert.deepEqual(d, { action: "transition", to: "payment_pending" });
  });

  it("async_payment_succeeded transitions payment_pending → paid", () => {
    const d = decideStripeEventTransition("checkout.session.async_payment_succeeded", "payment_pending", null);
    assert.deepEqual(d, { action: "transition", to: "paid" });
  });

  it("async_payment_failed transitions payment_pending → payment_failed", () => {
    const d = decideStripeEventTransition("checkout.session.async_payment_failed", "payment_pending", null);
    assert.deepEqual(d, { action: "transition", to: "payment_failed" });
  });

  it("expired event does NOT overwrite paid (settled)", () => {
    const d = decideStripeEventTransition("checkout.session.expired", "paid", null);
    assert.deepEqual(d, { action: "none", reason: "settled" });
  });

  it("paid order cannot regress via async_payment_failed", () => {
    const d = decideStripeEventTransition("checkout.session.async_payment_failed", "paid", null);
    assert.deepEqual(d, { action: "none", reason: "settled" });
  });

  it("duplicate delivery of the same effect is an idempotent no-op", () => {
    const d = decideStripeEventTransition("checkout.session.async_payment_succeeded", "paid", null);
    assert.deepEqual(d, { action: "none", reason: "already-in-target" });
  });

  it("unsupported event types map to none/unsupported", () => {
    const d = decideStripeEventTransition("payment_intent.created", "checkout_created", null);
    assert.deepEqual(d, { action: "none", reason: "unsupported-event" });
  });

  it("completed on a pending_checkout order (attach race) is invalid, not silently applied", () => {
    const d = decideStripeEventTransition("checkout.session.completed", "pending_checkout", "paid");
    assert.deepEqual(d, { action: "invalid", from: "pending_checkout", to: "paid" });
  });
});

describe("webhook event claim — durable idempotency contract", () => {
  const now = 1_000_000_000_000;

  it("no existing ledger row → new claim", () => {
    assert.equal(classifyEventClaim(null, now), "new");
  });

  it("processed row → duplicate (idempotent acknowledgement)", () => {
    assert.equal(
      classifyEventClaim({ processingStatus: "processed", updatedAtMs: now }, now),
      "duplicate",
    );
  });

  it("ignored row → duplicate", () => {
    assert.equal(
      classifyEventClaim({ processingStatus: "ignored", updatedAtMs: now }, now),
      "duplicate",
    );
  });

  it("failed row → retryable (Stripe retry can re-claim)", () => {
    assert.equal(
      classifyEventClaim({ processingStatus: "failed", updatedAtMs: now }, now),
      "retryable",
    );
  });

  it("fresh processing row → in-flight (concurrent worker owns it)", () => {
    assert.equal(
      classifyEventClaim({ processingStatus: "processing", updatedAtMs: now - 1000 }, now),
      "in-flight",
    );
  });

  it("stale processing row (crashed worker) → retryable takeover", () => {
    assert.equal(
      classifyEventClaim(
        { processingStatus: "processing", updatedAtMs: now - STALE_CLAIM_MS - 1 },
        now,
      ),
      "retryable",
    );
  });
});
