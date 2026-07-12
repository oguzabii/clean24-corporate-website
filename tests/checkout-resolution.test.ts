import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolveCheckoutLines,
  sanitizeCheckoutItems,
} from "@/lib/shop/catalog-server";
import { products, type Product } from "@/data/shop";

/** Final-priced fixture catalog (production catalog has no final prices yet). */
const FIXTURE_CATALOG: Product[] = [
  {
    id: "fixture-set",
    slug: "fixture-set",
    name: "Fixture Set",
    categoryId: "sets",
    description: "Test fixture",
    visual: "set",
    availability: "available",
    pricingStatus: "final",
    variants: [
      {
        id: "std",
        label: "Standard",
        unit: "Set",
        priceCents: 2500,
        vatIncluded: true,
        availability: "available",
      },
      {
        id: "soon",
        label: "Bald",
        unit: "Set",
        vatIncluded: true,
        availability: "coming-soon",
      },
    ],
  },
];

describe("sanitizeCheckoutItems — payload guardrails", () => {
  it("rejects non-object payloads and missing items", () => {
    assert.equal(sanitizeCheckoutItems(null).ok, false);
    assert.equal(sanitizeCheckoutItems([]).ok, false);
    assert.equal(sanitizeCheckoutItems({}).ok, false);
  });

  it("rejects empty carts with EMPTY_CART", () => {
    const r = sanitizeCheckoutItems({ items: [] });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.code, "EMPTY_CART");
  });

  it("rejects invalid quantities (0, negative, decimal, over max)", () => {
    for (const quantity of [0, -1, 1.5, 21, "2", null]) {
      const r = sanitizeCheckoutItems({
        items: [{ productId: "a", variantId: "b", quantity }],
      });
      assert.equal(r.ok, false, `quantity ${String(quantity)} must be rejected`);
    }
  });

  it("merges duplicate productId+variantId lines", () => {
    const r = sanitizeCheckoutItems({
      items: [
        { productId: "a", variantId: "b", quantity: 2 },
        { productId: "a", variantId: "b", quantity: 3 },
        { productId: "a", variantId: "c", quantity: 1 },
      ],
    });
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.items.length, 2);
      assert.deepEqual(r.items[0], { productId: "a", variantId: "b", quantity: 5 });
    }
  });

  it("rejects merged duplicates exceeding the per-line maximum", () => {
    const r = sanitizeCheckoutItems({
      items: [
        { productId: "a", variantId: "b", quantity: 15 },
        { productId: "a", variantId: "b", quantity: 10 },
      ],
    });
    assert.equal(r.ok, false);
  });
});

describe("resolveCheckoutLines — server-authoritative pricing", () => {
  it("resolves totals from the catalog, ignoring any client-sent price fields", () => {
    // Client-sent price fields are not even part of the sanitized shape —
    // this simulates a hostile payload that already passed sanitization.
    const items = [
      { productId: "fixture-set", variantId: "std", quantity: 3 },
    ] as Array<{ productId: string; variantId: string; quantity: number; priceCents?: number }>;
    items[0].priceCents = 1; // injected — must have no effect
    const r = resolveCheckoutLines(items, FIXTURE_CATALOG);
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.lines[0].unitAmountCents, 2500); // catalog price, not 1
      assert.equal(r.lines[0].lineAmountCents, 7500);
      assert.equal(r.totalCents, 7500);
      assert.equal(r.lines[0].currency, "CHF");
    }
  });

  it("rejects unknown productId", () => {
    const r = resolveCheckoutLines(
      [{ productId: "nope", variantId: "std", quantity: 1 }],
      FIXTURE_CATALOG,
    );
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.code, "PRODUCT_NOT_FOUND");
  });

  it("rejects unknown variantId", () => {
    const r = resolveCheckoutLines(
      [{ productId: "fixture-set", variantId: "nope", quantity: 1 }],
      FIXTURE_CATALOG,
    );
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.code, "VARIANT_NOT_FOUND");
  });

  it("rejects non-available variants", () => {
    const r = resolveCheckoutLines(
      [{ productId: "fixture-set", variantId: "soon", quantity: 1 }],
      FIXTURE_CATALOG,
    );
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.code, "VARIANT_UNAVAILABLE");
  });

  it("REAL catalog: placeholder pricing can never become payable", () => {
    // The only available product in the real catalog has placeholder prices;
    // the resolver must refuse it until pricingStatus is "final".
    const available = products.find((p) => p.availability === "available");
    assert.ok(available, "expected the demo available product");
    const variant = available.variants.find((v) => v.availability === "available");
    assert.ok(variant);
    const r = resolveCheckoutLines([
      { productId: available.id, variantId: variant.id, quantity: 1 },
    ]);
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.code, "PRICE_NOT_FINAL");
  });

  it("REAL catalog: no product is currently payable at all", () => {
    for (const p of products) {
      for (const v of p.variants) {
        const r = resolveCheckoutLines([
          { productId: p.id, variantId: v.id, quantity: 1 },
        ]);
        assert.equal(r.ok, false, `${p.id}/${v.id} must not be payable in prelaunch`);
      }
    }
  });
});
