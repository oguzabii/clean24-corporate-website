import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Database integration tests — run ONLY against a configured TEST Supabase
 * project (never production, never the Lead Autopilot project) with the
 * shop-orders migration applied.
 *
 * Without SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY these tests are SKIPPED
 * honestly: a skip is not a pass, and no result here claims that persistence
 * worked against a real database.
 */

const configured = Boolean(
  process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
);

describe("order persistence — database integration", { skip: !configured ? "no test Supabase configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY unset) — integration NOT executed" : false }, () => {
  it("creates a pending order atomically and reads it back", async () => {
    const { createPendingOrder, getOrderById } = await import(
      "@/lib/shop/order-repository"
    );
    const created = await createPendingOrder({
      lines: [
        {
          productId: "integration-test-product",
          variantId: "std",
          productName: "Integration Test Product",
          variantLabel: "Standard",
          quantity: 2,
          unitAmountCents: 1000,
          lineAmountCents: 2000,
          currency: "CHF",
          vatIncluded: true,
          requiresShipping: true,
        },
      ],
      currency: "CHF",
      metadata: { source: "db-integration-test" },
    });
    assert.equal(created.ok, true, "order creation should succeed");
    if (!created.ok) return;
    assert.equal(created.value.totalCents, 2000);

    const fetched = await getOrderById(created.value.orderId);
    assert.equal(fetched.ok, true);
    if (fetched.ok) {
      assert.equal(fetched.value.status, "pending_checkout");
      assert.equal(fetched.value.orderNumber, created.value.orderNumber);
    }
  });

  it("claims a stripe event exactly once (duplicate → idempotent)", async () => {
    const { beginStripeEventProcessing, completeStripeEventProcessing } =
      await import("@/lib/shop/order-repository");
    const eventId = `evt_test_integration_${Date.now()}`;
    const first = await beginStripeEventProcessing({ id: eventId, type: "checkout.session.completed" });
    assert.equal(first.ok && first.value.kind === "new", true);
    await completeStripeEventProcessing(eventId, { status: "processed" });
    const second = await beginStripeEventProcessing({ id: eventId, type: "checkout.session.completed" });
    assert.equal(second.ok && second.value.kind === "duplicate", true);
  });
});
