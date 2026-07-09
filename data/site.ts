/**
 * Core Clean24 brand identity strings.
 * Single source of truth for name, slogan and messaging.
 */

/** A real business partner. Only add entries with confirmed, real logos. */
export interface Partner {
  name: string;
  logo?: string;
  url?: string;
}

export const site = {
  name: "Clean24",
  legalName: "Clean24 Memis GmbH",
  slogan: "Sauberkeit mit System.",
  secondary:
    "Professionelle Reinigung. Klare Abläufe. Verlässliche Ergebnisse.",
  badge: "Schweizer Reinigungs- & Facility-Services",
  /** Founding year (no exact date). */
  founded: 2022,
  /**
   * Clean24 Sales Engine — the separate lead-intake / offer flow on its own
   * subdomain. Offer requests are routed here; this corporate site does not
   * process form submissions itself.
   */
  salesEngineUrl: "https://formular.clean-24.ch/",
  /**
   * Google Bewertung — leave null until real values exist. Do NOT invent a
   * rating, review count or review text. If only `googleReviewUrl` is set,
   * the footer shows a simple "Auf Google bewerten" link.
   */
  googleRating: null as number | null,
  googleReviewCount: null as number | null,
  googleReviewUrl: null as string | null,
  /** Real partners only — empty until confirmed. No placeholder logos. */
  partners: [] as Partner[],
  /** Short brand pillars derived from the secondary message (not metrics). */
  pillars: [
    {
      title: "Professionelle Reinigung",
      description:
        "Geschultes Personal und geprüfte Verfahren für jeden Objekttyp.",
    },
    {
      title: "Klare Abläufe",
      description:
        "Strukturierte Planung, feste Ansprechpartner und transparente Prozesse.",
    },
    {
      title: "Verlässliche Ergebnisse",
      description:
        "Konstante Qualität durch Kontrollen und dokumentierte Standards.",
    },
  ],
};
