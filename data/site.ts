/**
 * Core Clean24 brand identity strings.
 * Single source of truth for name, slogan and messaging.
 */
export const site = {
  name: "Clean24",
  legalName: "Clean24 Memis GmbH",
  slogan: "Sauberkeit mit System.",
  secondary:
    "Professionelle Reinigung. Klare Abläufe. Verlässliche Ergebnisse.",
  badge: "Premium Swiss Cleaning & Facility Services",
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
} as const;
