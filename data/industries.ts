/** Industries / customer segments Clean24 serves. */
export interface Industry {
  slug: string;
  name: string;
  description: string;
  lead: string;
  image: string;
  imageAlt: string;
  matters: string[];
  serviceSlugs: string[];
  planning: string[];
}

export const industries: Industry[] = [
  {
    slug: "unternehmen-bueros",
    name: "Unternehmen & Büros",
    description: "Repräsentative Arbeitsplätze und Geschäftsräume.",
    lead:
      "Arbeitswelten brauchen Reinigung, die zuverlässig ist und den Betrieb nicht stört.",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Professionell gereinigter moderner Büroraum.",
    matters: ["repräsentative Flächen", "abgestimmte Zeiten", "verlässliche Wiederholung"],
    serviceSlugs: ["bueroreinigung", "unterhaltsreinigung", "fensterreinigung"],
    planning: ["Nutzung klären", "Zeitfenster abstimmen", "feste Abläufe etablieren"],
  },
  {
    slug: "immobilienverwaltungen",
    name: "Immobilienverwaltungen",
    description: "Werterhalt über ganze Liegenschaftsportfolios.",
    lead:
      "Verwaltungen brauchen weniger Rückfragen, klare Zuständigkeiten und sauber dokumentierbare Einsätze.",
    image: "/media/clean24/property-building.jpg",
    imageAlt: "Schweizer Wohnliegenschaft mit beleuchtetem Eingang.",
    matters: ["fester Ansprechpartner", "Objektkenntnis", "planbare Einsätze"],
    serviceSlugs: ["treppenhausreinigung", "objektreinigung", "parkhausreinigung"],
    planning: ["Liegenschaft erfassen", "Intervall definieren", "Kommunikation bündeln"],
  },
  {
    slug: "gesundheitswesen",
    name: "Gesundheitswesen",
    description: "Hygienesensible Praxen und Pflegeeinrichtungen.",
    lead:
      "In gesundheitsnahen Umgebungen zählen Sorgfalt, Abstimmung und klare Grenzen des vereinbarten Leistungsumfangs.",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Sorgfältig gereinigter heller Innenraum.",
    matters: ["ruhige Ausführung", "abgestimmte Anforderungen", "klare Kommunikation"],
    serviceSlugs: ["praxisreinigung", "unterhaltsreinigung", "fensterreinigung"],
    planning: ["Anforderungen aufnehmen", "Abläufe konservativ planen", "Rückfragen direkt klären"],
  },
  {
    slug: "bildung-betreuung",
    name: "Bildung & Betreuung",
    description: "Schulen, Kitas und Betreuungseinrichtungen.",
    lead:
      "Räume für Bildung und Betreuung brauchen wiederkehrende Reinigung, die Nutzung und Tagesrhythmus berücksichtigt.",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Heller gemeinschaftlich genutzter Innenraum.",
    matters: ["Nutzungszeiten", "gemeinschaftliche Flächen", "verlässliche Wiederholung"],
    serviceSlugs: ["schulreinigung", "unterhaltsreinigung", "fensterreinigung"],
    planning: ["Objektrhythmus verstehen", "Flächen priorisieren", "Einsätze abstimmen"],
  },
  {
    slug: "gewerbe-retail",
    name: "Gewerbe & Retail",
    description: "Verkaufsflächen, Gewerbe und Ladenlokale.",
    lead:
      "Publikumsnahe Flächen müssen sauber wirken und gleichzeitig praktikabel im Betrieb gereinigt werden.",
    image: "/media/clean24/glass-cleaning.jpg",
    imageAlt: "Glasreinigung an einer repräsentativen Gebäudefläche.",
    matters: ["erster Eindruck", "Betriebszeiten", "sichtbare Sauberkeit"],
    serviceSlugs: ["unterhaltsreinigung", "fensterreinigung", "spezialreinigung"],
    planning: ["Öffnungszeiten beachten", "sichtbare Flächen priorisieren", "Leistung klar abgrenzen"],
  },
  {
    slug: "parkhaeuser-tiefgaragen",
    name: "Parkhäuser & Tiefgaragen",
    description: "Maschinelle Reinigung grosser Verkehrsflächen.",
    lead:
      "Verkehrsflächen brauchen robuste Reinigung, passende Zeitfenster und eine Methode, die zur Fläche passt.",
    image: "/media/clean24/garage-cleaning.jpg",
    imageAlt: "Maschinelle Reinigung einer Tiefgarage.",
    matters: ["grosse Flächen", "Betrieb und Zugang", "geeignete Ausrüstung"],
    serviceSlugs: ["parkhausreinigung", "objektreinigung", "spezialreinigung"],
    planning: ["Zugang prüfen", "Zeitfenster planen", "Fläche methodisch reinigen"],
  },
  {
    slug: "privatkunden",
    name: "Privatkunden",
    description: "Private Liegenschaften und individuelle Aufträge.",
    lead:
      "Private Aufträge brauchen einfache Kommunikation, klare Offerten und verlässliche Ausführung.",
    image: "/media/clean24/stairwell-cleaning.jpg",
    imageAlt: "Reinigung in einer gepflegten privaten Liegenschaft.",
    matters: ["klare Anfrage", "verständliche Offerte", "saubere Übergabe"],
    serviceSlugs: ["umzugsreinigung", "fensterreinigung", "unterhaltsreinigung"],
    planning: ["Bedarf aufnehmen", "Umfang klar beschreiben", "Termin verbindlich planen"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
