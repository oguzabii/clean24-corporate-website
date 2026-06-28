/**
 * Clean24 service catalogue.
 *
 * Order matters: general facility cleaning leads. Umzugsreinigung is one
 * service among many and is intentionally listed last — the site must not be
 * Umzugsreinigung-first. It connects to a separate Sales Engine flow later.
 */
export interface Service {
  slug: string;
  name: string;
  description: string;
  /** Featured services are surfaced in the homepage preview grid. */
  featured?: boolean;
}

export const services: Service[] = [
  {
    slug: "unterhaltsreinigung",
    name: "Unterhaltsreinigung",
    description:
      "Regelmässige Werterhaltung von Gebäuden mit festen Reinigungsplänen.",
    featured: true,
  },
  {
    slug: "bueroreinigung",
    name: "Büroreinigung",
    description:
      "Saubere, repräsentative Arbeitsumgebungen für produktive Teams.",
    featured: true,
  },
  {
    slug: "treppenhausreinigung",
    name: "Treppenhausreinigung",
    description:
      "Gepflegte Eingänge und Treppenhäuser für Wohn- und Geschäftshäuser.",
    featured: true,
  },
  {
    slug: "praxisreinigung",
    name: "Praxisreinigung",
    description:
      "Hygienische Reinigung für Praxen und Gesundheitseinrichtungen.",
    featured: true,
  },
  {
    slug: "schulreinigung",
    name: "Schulreinigung",
    description:
      "Sichere und gründliche Reinigung von Schulen und Betreuungsräumen.",
    featured: true,
  },
  {
    slug: "parkhausreinigung",
    name: "Parkhausreinigung",
    description:
      "Maschinelle Reinigung von Parkhäusern und Tiefgaragen.",
    featured: true,
  },
  {
    slug: "baureinigung",
    name: "Baureinigung",
    description:
      "Bauend-, Grob- und Feinreinigung bis zur bezugsbereiten Übergabe.",
  },
  {
    slug: "fensterreinigung",
    name: "Fensterreinigung",
    description:
      "Streifenfreie Fenster, Glasfronten und Rahmen für jede Objektgrösse.",
  },
  {
    slug: "teppichreinigung",
    name: "Teppichreinigung",
    description:
      "Tiefenreinigung von Teppichen und textilen Bodenbelägen.",
  },
  {
    slug: "spezialreinigung",
    name: "Spezialreinigung",
    description:
      "Individuelle Reinigungslösungen für anspruchsvolle Sonderfälle.",
  },
  {
    slug: "objektreinigung",
    name: "Objektreinigung",
    description:
      "Ganzheitliche Betreuung kompletter Objekte aus einer Hand.",
  },
  {
    slug: "umzugsreinigung",
    name: "Umzugsreinigung",
    description:
      "Übergabereinigung mit Abnahmegarantie für Wohnungen und Häuser.",
  },
];

export const featuredServices = services.filter((service) => service.featured);
