/**
 * Clean24 shop products.
 *
 * ⚠️ EDITABLE PLACEHOLDERS ⚠️
 * The products, prices, variants and availability below are example entries
 * to build out the shop UI. They do NOT represent final, purchasable products.
 * Prices are in Rappen (CHF cents), incl. MwSt. Replace names, prices, images
 * and `availability` with real data before going live. Keep `availability`
 * at "coming-soon" until real stock/fulfilment exists.
 */

export type Availability = "available" | "coming-soon";

/** Visual style key for the CSS product placeholder (until real photos exist). */
export type ProductVisual =
  | "set"
  | "spray"
  | "glass"
  | "kitchen"
  | "bath"
  | "tools";

export interface ProductVariant {
  id: string;
  /** Display label, e.g. "1 Liter", "5 Liter", "Set". */
  label: string;
  /** Optional unit hint, e.g. "Flasche", "Karton". */
  unit?: string;
  /** Price in Rappen (CHF cents), incl. MwSt. */
  priceCents: number;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  /** Real photo path when available; otherwise the CSS placeholder is used. */
  image?: string;
  visual: ProductVisual;
  availability: Availability;
  variants: ProductVariant[];
}

export const products: Product[] = [
  {
    slug: "clean24-reinigungsset",
    name: "Clean24 Reinigungsset",
    category: "Sets",
    description:
      "Grundausstattung für die regelmässige Reinigung – abgestimmte Mittel für den Alltag.",
    visual: "set",
    availability: "coming-soon",
    variants: [
      { id: "1l", label: "1 Liter", unit: "Flasche", priceCents: 2490 },
      { id: "5l", label: "5 Liter", unit: "Kanister", priceCents: 7900 },
      { id: "set", label: "Set", unit: "Komplett", priceCents: 4990 },
    ],
  },
  {
    slug: "wohnungsabgabe-starter-set",
    name: "Wohnungsabgabe Starter-Set",
    category: "Sets",
    description:
      "Zusammenstellung für die Reinigung vor der Wohnungsabgabe – für ein sauberes Übergabeergebnis.",
    visual: "spray",
    availability: "coming-soon",
    variants: [
      { id: "set", label: "Set", unit: "Standard", priceCents: 6900 },
      { id: "gross", label: "Gross-Set", unit: "Erweitert", priceCents: 12900 },
    ],
  },
  {
    slug: "glas-fensterpflege-set",
    name: "Glas- & Fensterpflege Set",
    category: "Reinigungsmittel",
    description:
      "Für streifenfreie Fenster, Glasflächen und Spiegel – mit passendem Zubehör.",
    visual: "glass",
    availability: "coming-soon",
    variants: [
      { id: "1l", label: "1 Liter", unit: "Flasche", priceCents: 1990 },
      { id: "5l", label: "5 Liter", unit: "Kanister", priceCents: 6900 },
      { id: "set", label: "Set", unit: "Mit Zubehör", priceCents: 3490 },
    ],
  },
  {
    slug: "kuechenreinigung-set",
    name: "Küchenreinigung Set",
    category: "Reinigungsmittel",
    description:
      "Für Fett, Kalk und hartnäckige Verschmutzungen in Küche und Arbeitsflächen.",
    visual: "kitchen",
    availability: "coming-soon",
    variants: [
      { id: "1l", label: "1 Liter", unit: "Flasche", priceCents: 2290 },
      { id: "set", label: "Set", unit: "Mit Zubehör", priceCents: 3990 },
    ],
  },
  {
    slug: "bad-sanitaerpflege-set",
    name: "Bad- & Sanitärpflege Set",
    category: "Reinigungsmittel",
    description:
      "Für Bad, WC und Sanitärbereiche – hygienische Sauberkeit mit passender Dosierung.",
    visual: "bath",
    availability: "coming-soon",
    variants: [
      { id: "1l", label: "1 Liter", unit: "Flasche", priceCents: 2190 },
      { id: "5l", label: "5 Liter", unit: "Kanister", priceCents: 6500 },
      { id: "set", label: "Set", unit: "Mit Zubehör", priceCents: 3790 },
    ],
  },
  {
    slug: "objektpflege-zubehoer",
    name: "Objektpflege Zubehör",
    category: "Zubehör",
    description:
      "Tücher, Halter und Zubehör für die tägliche Objektpflege – langlebig und praktisch.",
    visual: "tools",
    availability: "coming-soon",
    variants: [
      { id: "set", label: "Set", unit: "Standard", priceCents: 4500 },
      { id: "gross", label: "Grosspack", unit: "Vorratspack", priceCents: 8900 },
    ],
  },
];

/** Format Rappen (CHF cents) as a Swiss price string, e.g. "CHF 24.90". */
export function formatChf(cents: number): string {
  return `CHF ${(cents / 100).toFixed(2)}`;
}
