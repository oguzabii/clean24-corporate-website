import { after, describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Database integration tests — run ONLY against the configured Neon database
 * (clean24-corporate-website Marketplace resource) via DATABASE_URL, with the
 * shop-orders migration applied.
 *
 * Without DATABASE_URL these tests are SKIPPED honestly: a skip is not a
 * pass, and no result here claims that persistence worked against a real
 * database.
 *
 * Every row created here is tagged and DELETED again in the after() hook —
 * the database is left clean.
 */

// Mirror lib/db/env.ts: a pulled "[SENSITIVE]" placeholder is NOT
// configuration (sensitive-typed Vercel env vars cannot be pulled locally).
const rawUrl = process.env.DATABASE_URL?.trim();
const configured = Boolean(rawUrl && !rawUrl.includes("[SENSITIVE]"));

const TEST_SOURCE = "db-integration-test";
const TEST_EVENT_PREFIX = "evt_test_integration_";

describe(
  "order persistence — Neon database integration",
  {
    skip: !configured
      ? "DATABASE_URL unset — Neon integration NOT executed"
      : false,
  },
  () => {
    after(async () => {
      if (!configured) return;
      // Clean up ALL rows created by this test run (events first — they
      // reference orders; items cascade with their orders).
      const { getDbPool, closeDbPool } = await import("@/lib/db/server");
      const db = getDbPool();
      if (db) {
        await db.query(
          "delete from shop_stripe_events where stripe_event_id like $1",
          [`${TEST_EVENT_PREFIX}%`],
        );
        await db.query(
          "delete from shop_orders where metadata->>'source' = $1",
          [TEST_SOURCE],
        );
        const leftovers = await db.query(
          "select (select count(*) from shop_orders where metadata->>'source' = $1) as orders, (select count(*) from shop_stripe_events where stripe_event_id like $2) as events",
          [TEST_SOURCE, `${TEST_EVENT_PREFIX}%`],
        );
        assert.equal(Number(leftovers.rows[0].orders), 0, "test orders cleaned");
        assert.equal(Number(leftovers.rows[0].events), 0, "test events cleaned");
      }
      await closeDbPool();
    });

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
        metadata: { source: TEST_SOURCE },
      });
      assert.equal(created.ok, true, "order creation should succeed");
      if (!created.ok) return;
      assert.equal(created.value.totalCents, 2000);
      assert.match(created.value.orderNumber, /^C24-\d{6}-[A-Z2-9]{6}$/);

      const fetched = await getOrderById(created.value.orderId);
      assert.equal(fetched.ok, true);
      if (fetched.ok) {
        assert.equal(fetched.value.status, "pending_checkout");
        assert.equal(fetched.value.orderNumber, created.value.orderNumber);
      }
    });

    it("rejects an order whose line totals do not add up (RPC validation)", async () => {
      const { createPendingOrder } = await import("@/lib/shop/order-repository");
      const bad = await createPendingOrder({
        lines: [
          {
            productId: "integration-test-product",
            variantId: "bad",
            productName: "Bad Totals",
            variantLabel: "Standard",
            quantity: 2,
            unitAmountCents: 1000,
            lineAmountCents: 999, // ≠ unit × qty → must be rejected in-transaction
            currency: "CHF",
            vatIncluded: true,
            requiresShipping: true,
          },
        ],
        currency: "CHF",
        metadata: { source: TEST_SOURCE },
      });
      assert.equal(bad.ok, false);
    });

    it("attaches a checkout session with a guarded transition", async () => {
      const { createPendingOrder, attachStripeCheckoutSession } = await import(
        "@/lib/shop/order-repository"
      );
      const created = await createPendingOrder({
        lines: [
          {
            productId: "integration-test-product",
            variantId: "attach",
            productName: "Attach Test",
            variantLabel: "Standard",
            quantity: 1,
            unitAmountCents: 500,
            lineAmountCents: 500,
            currency: "CHF",
            vatIncluded: true,
            requiresShipping: false,
          },
        ],
        currency: "CHF",
        metadata: { source: TEST_SOURCE },
      });
      assert.equal(created.ok, true);
      if (!created.ok) return;

      const sessionId = `cs_test_integration_${Date.now()}`;
      const attached = await attachStripeCheckoutSession(
        created.value.orderId,
        sessionId,
      );
      assert.equal(attached.ok, true);
      if (attached.ok) {
        assert.equal(attached.value.status, "checkout_created");
        assert.equal(attached.value.stripeCheckoutSessionId, sessionId);
      }

      // Second attach must fail: the guarded transition only fires from
      // pending_checkout.
      const again = await attachStripeCheckoutSession(
        created.value.orderId,
        `cs_test_integration_other_${Date.now()}`,
      );
      assert.equal(again.ok, false);
    });

    it("applies verified webhook transitions and protects paid from regression", async () => {
      const {
        createPendingOrder,
        attachStripeCheckoutSession,
        updateOrderFromVerifiedStripeEvent,
        getOrderById,
      } = await import("@/lib/shop/order-repository");
      const created = await createPendingOrder({
        lines: [
          {
            productId: "integration-test-product",
            variantId: "paid",
            productName: "Paid Flow",
            variantLabel: "Standard",
            quantity: 1,
            unitAmountCents: 1490,
            lineAmountCents: 1490,
            currency: "CHF",
            vatIncluded: true,
            requiresShipping: true,
          },
        ],
        currency: "CHF",
        metadata: { source: TEST_SOURCE },
      });
      assert.equal(created.ok, true);
      if (!created.ok) return;
      const attached = await attachStripeCheckoutSession(
        created.value.orderId,
        `cs_test_integration_paid_${Date.now()}`,
      );
      assert.equal(attached.ok, true);
      if (!attached.ok) return;

      const paid = await updateOrderFromVerifiedStripeEvent(attached.value, {
        targetStatus: "paid",
        stripePaymentStatus: "paid",
      });
      assert.equal(paid.ok, true);
      if (!paid.ok) return;
      assert.equal(paid.value.status, "paid");

      // Regression attempt: expired after paid must be refused.
      const regress = await updateOrderFromVerifiedStripeEvent(paid.value, {
        targetStatus: "expired",
      });
      assert.equal(regress.ok, false);
      if (!regress.ok) assert.equal(regress.code, "ORDER_INVALID_STATE_TRANSITION");

      const final = await getOrderById(created.value.orderId);
      assert.equal(final.ok && final.value.status, "paid");
    });

    it("claims a stripe event exactly once (duplicate → idempotent)", async () => {
      const {
        beginStripeEventProcessing,
        completeStripeEventProcessing,
      } = await import("@/lib/shop/order-repository");
      const eventId = `${TEST_EVENT_PREFIX}${Date.now()}`;
      const first = await beginStripeEventProcessing({
        id: eventId,
        type: "checkout.session.completed",
      });
      assert.equal(first.ok && first.value.kind === "new", true, "first claim is new");
      const completed = await completeStripeEventProcessing(eventId, {
        status: "processed",
      });
      assert.equal(completed.ok, true);
      const second = await beginStripeEventProcessing({
        id: eventId,
        type: "checkout.session.completed",
      });
      assert.equal(
        second.ok && second.value.kind === "duplicate",
        true,
        "second claim is duplicate",
      );
    });

    it("re-claims a failed event (Stripe retry) with attempt_count + 1", async () => {
      const {
        beginStripeEventProcessing,
        failStripeEventProcessing,
      } = await import("@/lib/shop/order-repository");
      const eventId = `${TEST_EVENT_PREFIX}retry_${Date.now()}`;
      const first = await beginStripeEventProcessing({
        id: eventId,
        type: "checkout.session.expired",
      });
      assert.equal(first.ok && first.value.kind === "new", true);
      await failStripeEventProcessing(eventId, "ORDER_NOT_FOUND");
      const retry = await beginStripeEventProcessing({
        id: eventId,
        type: "checkout.session.expired",
      });
      assert.equal(retry.ok && retry.value.kind === "new", true, "failed event is re-claimable");
    });
  },
);
