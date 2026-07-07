/**
 * The four Clean24 competence areas shown on the homepage.
 * These group the service catalogue into facility-company categories.
 */
export interface Competence {
  slug: string;
  name: string;
  description: string;
  href: string;
  /** Photo asset (public/…). Temporary AI-generated placeholder for now. */
  image: string;
  /** Accessible description of the photo. */
  imageAlt: string;
}

export const competences: Competence[] = [
  {
    slug: "reinigung-hygiene",
    name: "Reinigung & Hygiene",
    description:
      "Regelmässige Unterhalts- und Hygienereinigung für Büros, Praxen und öffentlich genutzte Bereiche — nach festem Plan, mit klaren Zuständigkeiten und konstanter Qualität.",
    href: "#leistungen",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt:
      "Reinigungskraft wischt eine Arbeitsfläche in einem hellen, modernen Büro.",
  },
  {
    slug: "gebaeudereinigung",
    name: "Gebäudereinigung",
    description:
      "Werterhalt für Ihr Gebäude: Fenster- und Glasflächen, Eingangsbereiche, Allgemeinflächen und Bodenbeläge — gepflegt vom Erdgeschoss bis unters Dach.",
    href: "#leistungen",
    image: "/media/clean24/glass-cleaning.jpg",
    imageAlt:
      "Fachperson reinigt die grosse Glasfassade eines modernen Geschäftsgebäudes.",
  },
  {
    slug: "spezialreinigung",
    name: "Spezialreinigung",
    description:
      "Lösungen für besondere Anforderungen: Bauend- und Grundreinigung, Teppiche und textile Beläge sowie maschinelle Reinigung von Parkhäusern und Tiefgaragen.",
    href: "#leistungen",
    image: "/media/clean24/garage-cleaning.jpg",
    imageAlt:
      "Reinigungsmaschine reinigt den Boden einer sauberen Tiefgarage.",
  },
  {
    slug: "verwaltungen-liegenschaften",
    name: "Verwaltungen & Liegenschaften",
    description:
      "Zuverlässige Objektbetreuung für Immobilienverwaltungen: Treppenhäuser, Umgebung und wiederkehrende Einsätze — koordiniert aus einer Hand.",
    href: "#verwaltungen",
    image: "/media/clean24/stairwell-cleaning.jpg",
    imageAlt:
      "Reinigungskraft reinigt das Treppenhaus einer modernen Wohnliegenschaft.",
  },
];
