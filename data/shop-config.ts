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
};
