export type AktuellesCategory = "mitteilung" | "wissen" | "angebot";
export type AktuellesStatus = "published" | "draft";

export interface AktuellesItem {
  slug: string;
  title: string;
  excerpt: string;
  category: AktuellesCategory;
  publishedAt?: string;
  image?: string;
  imageAlt?: string;
  status: AktuellesStatus;
  featured?: boolean;
  href?: string;
}

export const aktuellesItems: AktuellesItem[] = [];

export const wissenItems: AktuellesItem[] = [
  {
    slug: "wohnungsabgabe-vorbereiten",
    title: "Wohnungsabgabe vorbereiten",
    excerpt:
      "Früh klären, welche Räume, Oberflächen und Termine relevant sind. So wird die Reinigung planbarer.",
    category: "wissen",
    image: "/media/clean24/generated/aktuelles-wohnungsabgabe.png",
    imageAlt:
      "Helle Wohnräume als Vorbereitung für eine saubere Wohnungsabgabe.",
    status: "published",
    href: "/leistungen/umzugsreinigung",
  },
  {
    slug: "reinigung-richtig-planen",
    title: "Reinigung richtig planen",
    excerpt:
      "Objekt, Umfang und Intervall sollten vor dem Einsatz klar sein. Gute Planung reduziert Rückfragen.",
    category: "wissen",
    image: "/media/clean24/generated/aktuelles-reinigung-planen.png",
    imageAlt:
      "Geplante professionelle Reinigung in einer modernen Arbeitsumgebung.",
    status: "published",
    href: "/leistungen",
  },
  {
    slug: "objektpflege-im-alltag",
    title: "Objektpflege im Alltag",
    excerpt:
      "Wiederkehrende Pflege hilft, Eingänge, Treppenhäuser und Allgemeinflächen verlässlich sauber zu halten.",
    category: "wissen",
    image: "/media/clean24/generated/aktuelles-objektpflege.png",
    imageAlt:
      "Gepflegter Eingangs- und Treppenhausbereich als Teil regelmässiger Objektpflege.",
    status: "published",
    href: "/verwaltungen",
  },
];

export const angeboteItems: AktuellesItem[] = [];

export function getPublishedItems(items: AktuellesItem[]) {
  return items.filter((item) => item.status === "published");
}
