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
  badge: "Schweizer Reinigungs- & Facility-Services",
  /**
   * Clean24 Sales Engine — the separate lead-intake / offer flow on its own
   * subdomain. Offer requests are routed here; this corporate site does not
   * process form submissions itself.
   */
  salesEngineUrl: "https://formular.clean-24.ch/",
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
