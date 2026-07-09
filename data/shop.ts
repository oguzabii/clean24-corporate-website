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
 * ---------------------------------------------------------------------------
 */

/** Availability of a product or a single variant. */
export type Availability = "available" | "coming-soon" | "out-of-stock";

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
