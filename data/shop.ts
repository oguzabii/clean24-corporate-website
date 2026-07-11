/**
 * Clean24 product catalog.
 *
 * ⚠️ EDITABLE CATALOG DATA — NOT FINAL PRODUCT FACTS ⚠️
 * ---------------------------------------------------------------------------
 * The categories, products, variants, prices and availability below are the
 * editable catalog skeleton for the Clean24 shop. They are structured so real
 * physical products can be sold later WITHOUT restructuring the page again.
 *
 * Editing rules (see docs/shop-catalog.md for the full guide):
 *  - Prices are stored in Rappen (CHF cents). `2490` → CHF 24.90.
 *  - Do NOT mark a product/variant `available` until real stock, price and
 *    fulfilment exist. Default new entries to `"coming-soon"`.
 *  - Do NOT invent stock numbers or final product claims here.
 *  - When a price is not final, leave `priceCents` undefined → the UI shows
 *    "Preis folgt".
 *  - Real product photos go in `public/shop/products/` and are referenced via
 *    the `image` field. Until then the branded CSS placeholder (`visual`) is
 *    used — see components/shop/ProductVisual.tsx.
 *  - Run `npm run validate:shop` after editing to catch catalog mistakes.
 *
 * NOTE: This module is intentionally import-free so tooling
 * (scripts/validate-shop-catalog.mjs) can load it standalone.
 * ---------------------------------------------------------------------------
 */

/** Availability of a product or a single variant. */
export type Availability = "available" | "coming-soon" | "out-of-stock";

/* ---------------------------------------------------------------------------
 * Internal catalog-readiness states (NOT shown publicly — used by docs and
 * scripts/validate-shop-catalog.mjs to track how launch-ready each entry is).
 * ------------------------------------------------------------------------- */

/** Editorial state of the product entry as a whole. */
export type ProductDataStatus = "draft" | "needs-review" | "ready";

/** State of the product imagery. */
export type ProductImageStatus = "placeholder" | "provided" | "final";

/** State of the pricing data. */
export type ProductPricingStatus = "missing" | "placeholder" | "final";

/**
 * Internal stock knowledge. Independent of `availability`: `availability`
 * controls what the SHOP does (purchasable / coming-soon / out-of-stock),
 * `stockStatus` records what we actually KNOW about physical stock.
 */
export type ProductStockStatus =
  | "unknown"
  | "limited"
  | "in-stock"
  | "out-of-stock";

/** Whether legal/compliance wording for this product has been reviewed. */
export type ProductLegalStatus = "needs-review" | "reviewed";

/**
 * Visual style key for the branded CSS product placeholder, used until a real
 * photo exists. See components/shop/ProductVisual.tsx.
 */
export type ProductVisual =
  | "set"
  | "spray"
  | "glass"
  | "kitchen"
  | "bath"
  | "tools"
  | "box"
  | "cloth"
  | "checklist";

export interface ProductCategory {
  id: string;
  label: string;
  description?: string;
}

export interface ProductVariant {
  id: string;
  /** Display label, e.g. "Standard Set", "Nachfüllung", "10 Stück". */
  label: string;
  /** Unit hint, e.g. "Set", "Karton", "Stück", "Lizenz". */
  unit: string;
  /** Stock-keeping unit — added once real fulfilment exists. */
  sku?: string;
  /**
   * Price in Rappen (CHF cents). Leave undefined while the price is not final
   * → the UI shows "Preis folgt". Never guess a final price here.
   */
  priceCents?: number;
  /** Optional strike-through reference price (Rappen), for later promotions. */
  compareAtPriceCents?: number;
  /** Whether the price is VAT (MwSt) inclusive. Swiss B2C prices usually are. */
  vatIncluded: boolean;
  /** Availability for this specific variant. */
  availability: Availability;
  /** Optional shipping class hint for future shipping-rate logic. */
  shippingClass?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Optional compact name for tight UI (badges, cart lines). */
  shortName?: string;
  categoryId: string;
  description: string;
  /** Optional longer copy for a future product detail view. */
  longDescription?: string;
  /** Real photo path (from public/shop/products). Falls back to `visual`. */
  image?: string;
  /** Optional additional real photos for a future gallery. */
  gallery?: string[];
  /** Branded CSS placeholder style used until `image` exists. */
  visual: ProductVisual;
  /** Optional marketing badge, e.g. "Neu", "Beliebt". Keep truthful. */
  badge?: string;
  /** Free-form search / filter tags. */
  tags?: string[];
  /** "Geeignet für …" bullet hints. */
  suitableFor?: string[];
  /** Short application guidance. */
  usageNotes?: string;
  /** Short safety / handling note. */
  safetyNote?: string;
  /** Product-level availability. Gates the whole card's purchase state. */
  availability: Availability;
  variants: ProductVariant[];
  /** Highlight in future "featured" rails. */
  featured?: boolean;
  /** Lower numbers sort first in the grid. */
  sortOrder?: number;

  /* --- Public-safe optional detail fields (shown on /shop/[slug]) --------- */

  /** Product-specific shipping note, shown under "Lieferung & Verfügbarkeit". */
  shippingNotes?: string;
  /** Care instructions — shown as "Pflegehinweise". */
  careInstructions?: string;
  /** Materials / contents — shown as "Material / Inhalt". */
  ingredientsOrMaterials?: string;
  /** Important warnings — shown as "Wichtige Hinweise". */
  warningNotes?: string;

  /* --- Internal readiness fields (NEVER rendered publicly) ---------------- */

  /** Editorial state of this catalog entry. Only "ready" counts as final. */
  dataStatus?: ProductDataStatus;
  /** Free-form internal note on what is still missing/unverified. */
  productDataNote?: string;
  /** Imagery state: placeholder visual vs. provided vs. final photos. */
  imageStatus?: ProductImageStatus;
  /** Pricing state: missing vs. editable placeholder vs. final. */
  pricingStatus?: ProductPricingStatus;
  /** Internal stock knowledge — see ProductStockStatus. */
  stockStatus?: ProductStockStatus;
  /** Legal/compliance review state of the product wording. */
  legalStatus?: ProductLegalStatus;
}

/**
 * Product categories. Order here is the order of the shop filter tabs
 * (an "Alle" tab is prepended in the UI).
 */
export const categories: ProductCategory[] = [
  {
    id: "reinigungsprodukte",
    label: "Reinigungsprodukte",
    description: "Reinigungsmittel für Glas, Küche, Bad und Oberflächen.",
  },
  {
    id: "zubehoer",
    label: "Zubehör",
    description: "Tücher, Werkzeuge und Zubehör für die Reinigung.",
  },
  {
    id: "wohnungsabgabe",
    label: "Wohnungsabgabe",
    description: "Produkte und Hilfen für die Vorbereitung einer Wohnungsabgabe.",
  },
  {
    id: "objektpflege",
    label: "Objektpflege",
    description: "Für die regelmässige Pflege von Objekten und Allgemeinflächen.",
  },
  {
    id: "sets",
    label: "Sets",
    description: "Zusammengestellte Produkt-Sets für den Alltag.",
  },
];

/**
 * Editable product catalog.
 *
 * NOTE ON AVAILABILITY: most products are intentionally set to "coming-soon".
 * They are NOT purchasable and cannot be added to the cart. Exactly one product
 * (Mikrofasertücher Set) is set to "available" with clearly-marked editable
 * placeholder prices, so the add-to-cart flow can be exercised before real
 * catalog data lands. Replace / re-flag everything before the live sale.
 */
export const products: Product[] = [
  {
    id: "clean24-reinigungsset",
    slug: "clean24-reinigungsset",
    name: "Clean24 Reinigungsset",
    categoryId: "sets",
    description:
      "Ein praktisches Set für gründliche Reinigungsarbeiten im Alltag.",
    visual: "set",
    availability: "coming-soon",
    sortOrder: 10,
    featured: true,
    // Internal readiness (see docs/shop-catalog.md) — not rendered publicly.
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      // Prices intentionally omitted until final → UI shows "Preis folgt".
      { id: "standard", label: "Standard Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
      { id: "gross", label: "Grosses Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
    ],
  },
  {
    id: "wohnungsabgabe-starter-set",
    slug: "wohnungsabgabe-starter-set",
    name: "Wohnungsabgabe Starter-Set",
    categoryId: "wohnungsabgabe",
    description:
      "Für die Vorbereitung einer Wohnungsabgabe und die wichtigsten Reinigungsbereiche.",
    visual: "box",
    availability: "coming-soon",
    sortOrder: 20,
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      { id: "starter", label: "Starter Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
      { id: "komplett", label: "Komplett Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
    ],
  },
  {
    id: "glas-fensterpflege-set",
    slug: "glas-fensterpflege-set",
    name: "Glas- & Fensterpflege Set",
    categoryId: "reinigungsprodukte",
    description: "Für Glasflächen, Fenster und Rahmen.",
    visual: "glass",
    availability: "coming-soon",
    sortOrder: 30,
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      { id: "set", label: "1 Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
      { id: "nachfuellung", label: "Nachfüllung", unit: "Nachfüllung", vatIncluded: true, availability: "coming-soon" },
    ],
  },
  {
    id: "kuechenreinigung-set",
    slug: "kuechenreinigung-set",
    name: "Küchenreinigung Set",
    categoryId: "reinigungsprodukte",
    description:
      "Für Küche, Oberflächen, Geräte und hartnäckige Rückstände.",
    visual: "kitchen",
    availability: "coming-soon",
    sortOrder: 40,
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      { id: "standard", label: "Standard Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
      { id: "nachfuellung", label: "Nachfüllung", unit: "Nachfüllung", vatIncluded: true, availability: "coming-soon" },
    ],
  },
  {
    id: "bad-sanitaerpflege-set",
    slug: "bad-sanitaerpflege-set",
    name: "Bad- & Sanitärpflege Set",
    categoryId: "reinigungsprodukte",
    description: "Für Bad, WC, Armaturen und Sanitärbereiche.",
    visual: "bath",
    availability: "coming-soon",
    sortOrder: 50,
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      { id: "standard", label: "Standard Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
      { id: "nachfuellung", label: "Nachfüllung", unit: "Nachfüllung", vatIncluded: true, availability: "coming-soon" },
    ],
  },
  {
    id: "objektpflege-zubehoer",
    slug: "objektpflege-zubehoer",
    name: "Objektpflege Zubehör",
    categoryId: "objektpflege",
    description:
      "Zubehör für regelmässige Objektpflege, Treppenhäuser und Allgemeinflächen.",
    visual: "tools",
    availability: "coming-soon",
    sortOrder: 60,
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      { id: "zubehoer", label: "Zubehör Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
      { id: "profi", label: "Profi Set", unit: "Set", vatIncluded: true, availability: "coming-soon" },
    ],
  },
  {
    id: "mikrofasertuecher-set",
    slug: "mikrofasertuecher-set",
    name: "Mikrofasertücher Set",
    categoryId: "zubehoer",
    description:
      "Mehrzwecktücher für Oberflächen, Glas und Pflegebereiche.",
    visual: "cloth",
    // Intentionally available so the cart flow is testable before real data.
    availability: "available",
    featured: true,
    sortOrder: 70,
    // Demo entry: placeholder prices exist, so pricing is "placeholder", not
    // "missing" — still NOT ready and NOT legally reviewed.
    dataStatus: "needs-review",
    productDataNote:
      "Demo-Produkt mit editierbaren Platzhalterpreisen — vor dem Live-Verkauf ersetzen.",
    imageStatus: "placeholder",
    pricingStatus: "placeholder",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      // Editable placeholder price — replace before production checkout.
      { id: "5er", label: "5 Stück", unit: "Packung", priceCents: 1490, vatIncluded: true, availability: "available" },
      // Editable placeholder price — replace before production checkout.
      { id: "10er", label: "10 Stück", unit: "Packung", priceCents: 2490, vatIncluded: true, availability: "available" },
    ],
  },
  {
    id: "reinigungsplan-checklisten-set",
    slug: "reinigungsplan-checklisten-set",
    name: "Reinigungsplan & Checklisten Set",
    categoryId: "wohnungsabgabe",
    description:
      "Digitale und gedruckte Hilfen zur Vorbereitung von Reinigung und Wohnungsabgabe.",
    visual: "checklist",
    availability: "coming-soon",
    sortOrder: 80,
    dataStatus: "draft",
    imageStatus: "placeholder",
    pricingStatus: "missing",
    stockStatus: "unknown",
    legalStatus: "needs-review",
    variants: [
      { id: "digital", label: "Digital", unit: "Download", vatIncluded: true, availability: "coming-soon" },
      { id: "print-digital", label: "Print + Digital", unit: "Set", vatIncluded: true, availability: "coming-soon" },
    ],
  },
];

/** Category lookup by id. */
export function getCategory(id: string): ProductCategory | undefined {
  return categories.find((c) => c.id === id);
}

/** Product lookup by slug — used by the /shop/[slug] detail routes. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** All products of a category, in catalog (`sortOrder`) order. */
export function getProductsByCategory(categoryId: string): Product[] {
  return sortedProducts(products.filter((p) => p.categoryId === categoryId));
}

/** The category record a product belongs to. */
export function getProductCategory(
  product: Product,
): ProductCategory | undefined {
  return getCategory(product.categoryId);
}

/** Human-readable category label (falls back to the raw id). */
export function categoryLabel(id: string): string {
  return getCategory(id)?.label ?? id;
}

/** Products sorted by `sortOrder` (ascending), stable for equal values. */
export function sortedProducts(list: Product[] = products): Product[] {
  return [...list].sort(
    (a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER),
  );
}

/**
 * A variant is purchasable only if BOTH the product and the variant are
 * `available` AND a concrete price exists. This is the single source of truth
 * for "can this be added to the cart?" — the UI and the cart both rely on it,
 * so unavailable / price-less items can never enter the cart.
 */
export function isVariantPurchasable(
  product: Product,
  variant: ProductVariant,
): boolean {
  return (
    product.availability === "available" &&
    variant.availability === "available" &&
    typeof variant.priceCents === "number"
  );
}

/** German display labels for the three availability states. */
export const availabilityLabels: Record<Availability, string> = {
  available: "Verfügbar",
  "coming-soon": "Bald verfügbar",
  "out-of-stock": "Nicht verfügbar",
};

/** Availability label for a product. */
export function getProductAvailabilityLabel(product: Product): string {
  return availabilityLabels[product.availability];
}

/** Availability label for a single variant. */
export function getVariantAvailabilityLabel(variant: ProductVariant): string {
  return availabilityLabels[variant.availability];
}

/** A product is purchasable if at least one of its variants is. */
export function isProductPurchasable(product: Product): boolean {
  return product.variants.some((v) => isVariantPurchasable(product, v));
}

/**
 * Internal readiness gate: true only when the catalog entry has been fully
 * verified (`dataStatus: "ready"`). Non-ready products show a neutral
 * prelaunch notice on their detail page. Not the same as `availability`.
 */
export function isProductReady(product: Product): boolean {
  return product.dataStatus === "ready";
}

/**
 * Badge shown on product visuals: non-available states win over marketing
 * badges; fully available products may show their (truthful) `badge`.
 */
export function getProductBadgeLabel(product: Product): string | null {
  if (product.availability !== "available") {
    return availabilityLabels[product.availability];
  }
  return product.badge ?? null;
}

/**
 * Centralized add-to-cart button state for a selected variant. Shared by the
 * shop grid card and the product detail purchase panel so purchase gating
 * lives in exactly one place (next to isVariantPurchasable).
 */
export function getAddToCartState(
  product: Product,
  variant: ProductVariant,
): { label: string; disabled: boolean } {
  if (isVariantPurchasable(product, variant)) {
    return { label: "In den Warenkorb", disabled: false };
  }
  // Not purchasable — surface the most specific reason.
  const availability =
    product.availability === "available"
      ? variant.availability
      : product.availability;
  if (availability === "out-of-stock") {
    return { label: "Nicht verfügbar", disabled: true };
  }
  // coming-soon, or available-but-not-yet-priced.
  return { label: "Bald verfügbar", disabled: true };
}

/**
 * Up to `limit` related products: same category first (catalog order), then
 * `featured` products as filler. Never includes the product itself.
 */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = getProductsByCategory(product.categoryId).filter(
    (p) => p.id !== product.id,
  );
  const fillers = sortedProducts(products).filter(
    (p) =>
      p.featured &&
      p.id !== product.id &&
      !sameCategory.some((s) => s.id === p.id),
  );
  return [...sameCategory, ...fillers].slice(0, limit);
}

/** Format Rappen (CHF cents) as a Swiss price string, e.g. "CHF 24.90". */
export function formatChf(cents: number): string {
  return `CHF ${(cents / 100).toFixed(2)}`;
}

/** Price label for a variant — "Preis folgt" until a real price is set. */
export function variantPriceLabel(variant: ProductVariant): string {
  return typeof variant.priceCents === "number"
    ? formatChf(variant.priceCents)
    : "Preis folgt";
}
