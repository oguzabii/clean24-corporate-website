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
  group: ServiceGroupId;
  image: string;
  imageAlt: string;
  lead: string;
  covered: string[];
  suitableFor: string[];
  approach: string[];
  /** Featured services are surfaced in the homepage preview grid. */
  featured?: boolean;
}

export type ServiceGroupId =
  | "unterhalt-arbeitswelten"
  | "liegenschaften-objekte"
  | "spezial-einzelreinigung"
  | "umzug-uebergabe";

export const serviceGroups: {
  id: ServiceGroupId;
  title: string;
  description: string;
}[] = [
  {
    id: "unterhalt-arbeitswelten",
    title: "Unterhalt & Arbeitswelten",
    description:
      "Regelmässige Reinigung für Räume, in denen Menschen arbeiten, lernen und empfangen.",
  },
  {
    id: "liegenschaften-objekte",
    title: "Liegenschaften & Objekte",
    description:
      "Strukturierte Objektpflege für Verwaltungen, Eigentümer und grössere Flächen.",
  },
  {
    id: "spezial-einzelreinigung",
    title: "Spezial- & Einzelreinigung",
    description:
      "Gezielte Einsätze für Glas, Teppiche, Bauphasen und besondere Anforderungen.",
  },
  {
    id: "umzug-uebergabe",
    title: "Umzug & Übergabe",
    description:
      "Saubere Übergaben mit klarer Vorbereitung und verständlicher Kommunikation.",
  },
];

export const services: Service[] = [
  {
    slug: "unterhaltsreinigung",
    name: "Unterhaltsreinigung",
    description:
      "Regelmässige Werterhaltung von Gebäuden mit festen Reinigungsplänen.",
    group: "unterhalt-arbeitswelten",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Professionelle Unterhaltsreinigung in modernen Arbeitsräumen.",
    lead:
      "Regelmässige Reinigung braucht klare Intervalle, verlässliche Zuständigkeiten und einen Ablauf, der zum Objekt passt.",
    covered: ["Reinigungsplan", "Regelmässige Ausführung", "Objektbezogene Abstimmung"],
    suitableFor: ["Büros", "Praxen", "Gewerbeflächen", "private Liegenschaften"],
    approach: ["Bedarf aufnehmen", "Rhythmus festlegen", "Ausführung kontrollierbar halten"],
    featured: true,
  },
  {
    slug: "bueroreinigung",
    name: "Büroreinigung",
    description:
      "Saubere, repräsentative Arbeitsumgebungen für produktive Teams.",
    group: "unterhalt-arbeitswelten",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Reinigungskraft reinigt einen modernen Büroraum.",
    lead:
      "Büroräume müssen sauber wirken, ohne den Arbeitsalltag zu stören. Clean24 plant die Reinigung passend zu Nutzung und Zeiten.",
    covered: ["Arbeitsplätze", "Empfangsbereiche", "Nebenräume und allgemeine Flächen"],
    suitableFor: ["Unternehmen", "Agenturen", "Praxisähnliche Arbeitswelten", "Gewerbe"],
    approach: ["Nutzung verstehen", "Zeiten abstimmen", "verlässlich ausführen"],
    featured: true,
  },
  {
    slug: "treppenhausreinigung",
    name: "Treppenhausreinigung",
    description:
      "Gepflegte Eingänge und Treppenhäuser für Wohn- und Geschäftshäuser.",
    group: "liegenschaften-objekte",
    image: "/media/clean24/stairwell-cleaning.jpg",
    imageAlt: "Treppenhausreinigung in einer gepflegten Liegenschaft.",
    lead:
      "Treppenhäuser prägen den ersten Eindruck einer Liegenschaft. Entscheidend sind klare Intervalle und nachvollziehbare Ausführung.",
    covered: ["Eingänge", "Treppenhäuser", "allgemeine Flächen"],
    suitableFor: ["Immobilienverwaltungen", "Wohnliegenschaften", "Geschäftshäuser"],
    approach: ["Objekt besichtigen", "Intervall definieren", "Ansprechpartner festlegen"],
    featured: true,
  },
  {
    slug: "praxisreinigung",
    name: "Praxisreinigung",
    description:
      "Hygienische Reinigung für Praxen und Gesundheitseinrichtungen.",
    group: "unterhalt-arbeitswelten",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Sorgfältige Reinigung in hellen Innenräumen.",
    lead:
      "In Praxen zählt eine ruhige, sorgfältige und gut abgestimmte Reinigung. Spezifische Anforderungen werden vor Ort geklärt.",
    covered: ["Empfangsbereiche", "Behandlungsnahe Räume nach Absprache", "Sanitäre Bereiche"],
    suitableFor: ["Praxen", "Gesundheitseinrichtungen", "hygienesensible Umgebungen"],
    approach: ["Anforderungen klären", "Abläufe abstimmen", "konservativ und sauber ausführen"],
    featured: true,
  },
  {
    slug: "schulreinigung",
    name: "Schulreinigung",
    description:
      "Sichere und gründliche Reinigung von Schulen und Betreuungsräumen.",
    group: "unterhalt-arbeitswelten",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Professionell gereinigter heller Aufenthaltsraum.",
    lead:
      "Bildungs- und Betreuungsräume brauchen verlässliche Reinigung, abgestimmt auf Nutzung, Zeiten und klare Zuständigkeiten.",
    covered: ["Klassenzimmer und Aufenthaltsräume", "Gemeinschaftsflächen", "Sanitäre Bereiche"],
    suitableFor: ["Schulen", "Kitas", "Betreuungsräume"],
    approach: ["Nutzungszeiten berücksichtigen", "Reinigungsumfang klären", "regelmässig abstimmen"],
    featured: true,
  },
  {
    slug: "parkhausreinigung",
    name: "Parkhausreinigung",
    description:
      "Maschinelle Reinigung von Parkhäusern und Tiefgaragen.",
    group: "liegenschaften-objekte",
    image: "/media/clean24/garage-cleaning.jpg",
    imageAlt: "Maschinelle Reinigung einer Tiefgarage.",
    lead:
      "Parkhäuser und Tiefgaragen brauchen robuste Planung, passende Ausrüstung und eine Ausführung, die den Betrieb berücksichtigt.",
    covered: ["Tiefgaragen", "Parkhausflächen", "verkehrsnahe Nebenbereiche"],
    suitableFor: ["Immobilienverwaltungen", "Gewerbeobjekte", "private Parkierungsanlagen"],
    approach: ["Fläche einschätzen", "Zeitfenster planen", "geeignete Methode wählen"],
    featured: true,
  },
  {
    slug: "baureinigung",
    name: "Baureinigung",
    description:
      "Bauend-, Grob- und Feinreinigung bis zur bezugsbereiten Übergabe.",
    group: "spezial-einzelreinigung",
    image: "/media/clean24/glass-cleaning.jpg",
    imageAlt: "Sorgfältige Reinigung von Glasflächen nach Objektarbeiten.",
    lead:
      "Baureinigung verlangt Timing und Klarheit: Welche Flächen sind bereit, was muss zuerst passieren, was ist für die Übergabe relevant?",
    covered: ["Grob- und Feinreinigung nach Absprache", "Übergabenahe Reinigung", "Objektbezogene Schlussreinigung"],
    suitableFor: ["Umbauten", "Renovationen", "Objektübergaben"],
    approach: ["Bauzustand klären", "Umfang eingrenzen", "Übergabe vorbereiten"],
  },
  {
    slug: "fensterreinigung",
    name: "Fensterreinigung",
    description:
      "Streifenfreie Fenster, Glasfronten und Rahmen für jede Objektgrösse.",
    group: "spezial-einzelreinigung",
    image: "/media/clean24/glass-cleaning.jpg",
    imageAlt: "Professionelle Glasreinigung an einer Gebäudefassade.",
    lead:
      "Glasflächen brauchen saubere Vorbereitung, passende Mittel und eine ruhige Ausführung für ein klares Ergebnis.",
    covered: ["Fenster", "Glasfronten", "Rahmen nach Absprache"],
    suitableFor: ["Büros", "Liegenschaften", "Gewerbeflächen", "private Kunden"],
    approach: ["Zugang prüfen", "Flächen erfassen", "Ausführung sicher planen"],
  },
  {
    slug: "teppichreinigung",
    name: "Teppichreinigung",
    description:
      "Tiefenreinigung von Teppichen und textilen Bodenbelägen.",
    group: "spezial-einzelreinigung",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Sorgfältig gereinigter moderner Innenraum mit Arbeitsfläche.",
    lead:
      "Textile Beläge werden stark genutzt. Clean24 klärt Material, Fläche und Ziel, bevor die passende Reinigung geplant wird.",
    covered: ["Teppichflächen", "textile Bodenbeläge", "punktuelle Objektpflege nach Absprache"],
    suitableFor: ["Büros", "Gewerbeflächen", "private Innenräume"],
    approach: ["Belag einschätzen", "Methode abstimmen", "Trocknung und Nutzung berücksichtigen"],
  },
  {
    slug: "spezialreinigung",
    name: "Spezialreinigung",
    description:
      "Individuelle Reinigungslösungen für anspruchsvolle Sonderfälle.",
    group: "spezial-einzelreinigung",
    image: "/media/clean24/glass-cleaning.jpg",
    imageAlt: "Gezielte Spezialreinigung an einer Glasfläche.",
    lead:
      "Spezialreinigung beginnt mit genauer Abklärung. Erst wenn Objekt, Oberfläche und Ziel klar sind, wird der Ablauf festgelegt.",
    covered: ["Sonderflächen", "objektbezogene Einzelaufträge", "gezielte Reinigungsaufgaben"],
    suitableFor: ["Unternehmen", "Verwaltungen", "private Kunden"],
    approach: ["Anforderung klären", "Risiken einschätzen", "saubere Umsetzung planen"],
  },
  {
    slug: "objektreinigung",
    name: "Objektreinigung",
    description:
      "Ganzheitliche Betreuung kompletter Objekte aus einer Hand.",
    group: "liegenschaften-objekte",
    image: "/media/clean24/property-building.jpg",
    imageAlt: "Moderne Schweizer Liegenschaft mit beleuchtetem Eingang.",
    lead:
      "Objektreinigung verbindet mehrere Aufgaben zu einem klaren Betreuungsmodell mit Ansprechpartner und abgestimmten Abläufen.",
    covered: ["allgemeine Flächen", "regelmässige Objektpflege", "ergänzende Spezialaufgaben"],
    suitableFor: ["Liegenschaften", "Gewerbeobjekte", "Immobilienverwaltungen"],
    approach: ["Objekt strukturieren", "Leistungen bündeln", "Verantwortung sichtbar machen"],
  },
  {
    slug: "umzugsreinigung",
    name: "Umzugsreinigung",
    description:
      "Übergabereinigung mit Abnahmegarantie für Wohnungen und Häuser.",
    group: "umzug-uebergabe",
    image: "/media/clean24/office-cleaning.jpg",
    imageAlt: "Gründliche Innenreinigung vor einer Übergabe.",
    lead:
      "Bei der Umzugsreinigung zählt ein sauberer Übergabezustand. Clean24 arbeitet mit klarer Vorbereitung und Abnahmegarantie.",
    covered: ["Wohnungsreinigung", "Hausreinigung nach Auszug", "Übergabereinigung"],
    suitableFor: ["Mieterinnen und Mieter", "Eigentümer", "Verwaltungen"],
    approach: ["Umfang aufnehmen", "Termin planen", "Übergabe sauber vorbereiten"],
  },
];

export const featuredServices = services.filter((service) => service.featured);

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceGroup(id: ServiceGroupId) {
  return serviceGroups.find((group) => group.id === id);
}

export function getServicesByGroup(id: ServiceGroupId) {
  return services.filter((service) => service.group === id);
}

export function getRelatedServices(slug: string, limit = 3) {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return services
    .filter((item) => item.slug !== slug && item.group === service.group)
    .concat(services.filter((item) => item.slug !== slug && item.group !== service.group))
    .slice(0, limit);
}
