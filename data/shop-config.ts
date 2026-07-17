/**
 * Central Clean24 shop configuration.
 *
 * Single source of truth for currency/locale settings, repeated shop copy and
 * the checkout gate. Components read texts from here instead of hardcoding
 * them, so wording changes happen in one place.
 *
 * ⚠️ `checkoutEnabled` MUST stay `false` until a real checkout exists —
 * verified prices, product data, stock, MwSt wording, shipping, returns,
 * legal terms and a Stripe/TWINT integration (future phase). Flipping it to
 * `true` today changes nothing yet (there is no checkout implementation),
 * but it documents intent and will gate the future /api/checkout flow.
 *
 * NOTE: This module is intentionally import-free so tooling
 * (scripts/validate-shop-catalog.mjs) can load it standalone.
 */

export type ShopStatus = "prelaunch" | "live" | "paused";

export interface ShopInfoLink {
  label: string;
  href: string;
}

export interface ShopConfig {
  /** ISO 4217 currency code shown with prices. */
  currency: "CHF";
  /** BCP 47 locale for formatting. */
  locale: string;
  /** VAT suffix shown next to concrete prices. */
  vatDisplayText: string;
  /** Gate for the future online checkout. Keep false until launch-verified. */
  checkoutEnabled: boolean;
  /** Shown when checkout is triggered while disabled. */
  checkoutDisabledMessage: string;
  /** Neutral shipping note shown in the cart. */
  shippingNotice: string;
  /** Free-shipping threshold in Rappen; null = not defined yet. */
  freeShippingThresholdCents: number | null;
  /** Default shipping country (ISO 3166-1 alpha-2). */
  defaultShippingCountry: string;
  /** Overall shop lifecycle state. */
  shopStatus: ShopStatus;
  /**
   * Neutral prelaunch sentence reused on the shop grid, product detail pages
   * and the purchase panel while catalog data is not final.
   */
  prelaunchNotice: string;
  /** Route of the checkout scaffold (future real checkout lives here too). */
  checkoutPath: string;
  /** Shop information pages, linked from /shop, detail pages and the footer. */
  shopInfoLinks: ShopInfoLink[];
  /** Ordered step labels of the (future) checkout flow, shown as a preview. */
  checkoutSteps: string[];
  /** Headline of the disabled-checkout page. */
  checkoutDisabledTitle: string;
  /** Label of the primary CTA on the disabled-checkout page. */
  checkoutDisabledCtaLabel: string;
  /** Target of the primary CTA on the disabled-checkout page. */
  checkoutDisabledCtaHref: string;
  /** Payment provider of the (future) checkout backbone. */
  checkoutProvider: "stripe";
  /** Stripe mode. Keep "test" until the launch checklist is complete. */
  checkoutMode: "test" | "live";
  /**
   * Confirms that paid orders can be stored durably (database/order system).
   * Phase 13B. While false, /api/checkout refuses to create payment sessions
   * — a payment without a durable order record must be impossible.
   */
  orderPersistenceEnabled: boolean;
  /**
   * Confirms that verified webhook events can safely trigger order
   * fulfilment (idempotent, durable). While false, the webhook route only
   * verifies signatures and explicitly refuses fulfilment.
   */
  webhookFulfilmentEnabled: boolean;
  /** Database provider for durable order persistence (Phase 13B1-N). */
  databaseProvider: "neon";
  /**
   * Declared shop-order schema version. Must match the applied migration in
   * migrations/ before checkout may be enabled (validator-gated).
   */
  orderSchemaVersion: number;
}

export const shopConfig: ShopConfig = {
  currency: "CHF",
  locale: "de-CH",
  vatDisplayText: "inkl. MwSt.",
  checkoutEnabled: false,
  checkoutDisabledMessage:
    "Der Online-Checkout wird aktuell vorbereitet. Produktdaten, Versand und Zahlung werden vor dem Live-Verkauf finalisiert.",
  shippingNotice:
    "Versandkosten und Lieferoptionen werden beim Checkout berechnet.",
  freeShippingThresholdCents: null,
  defaultShippingCountry: "CH",
  shopStatus: "prelaunch",
  prelaunchNotice:
    "Produktdaten, Verfügbarkeit und Preise werden vor dem Live-Verkauf finalisiert.",
  checkoutPath: "/checkout",
  shopInfoLinks: [
    { label: "Versand & Zahlung", href: "/shop/versand-zahlung" },
    { label: "Retoure & Rückgabe", href: "/shop/retoure" },
    { label: "Shop FAQ", href: "/shop/faq" },
  ],
  checkoutSteps: ["Warenkorb", "Kundendaten", "Versand", "Zahlung", "Bestätigung"],
  checkoutDisabledTitle: "Online-Checkout in Vorbereitung",
  checkoutDisabledCtaLabel: "Zurück zum Shop",
  checkoutDisabledCtaHref: "/shop",
  checkoutProvider: "stripe",
  checkoutMode: "test",
  // checkoutEnabled (above) allows CREATION of payment sessions.
  // orderPersistenceEnabled confirms paid orders can be stored durably.
  // webhookFulfilmentEnabled confirms verified webhooks may trigger
  // fulfilment. NO checkout may become active while either of these is
  // false — /api/checkout and the validator both enforce this.
  orderPersistenceEnabled: false,
  webhookFulfilmentEnabled: false,
  databaseProvider: "neon",
  // Schema version 1 = migrations/20260711120000_create_shop_orders.sql
  orderSchemaVersion: 1,
};
