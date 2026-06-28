/** Industries / customer segments Clean24 serves. */
export interface Industry {
  slug: string;
  name: string;
  description: string;
}

export const industries: Industry[] = [
  {
    slug: "unternehmen-bueros",
    name: "Unternehmen & Büros",
    description: "Repräsentative Arbeitsplätze und Geschäftsräume.",
  },
  {
    slug: "immobilienverwaltungen",
    name: "Immobilienverwaltungen",
    description: "Werterhalt über ganze Liegenschaftsportfolios.",
  },
  {
    slug: "gesundheitswesen",
    name: "Gesundheitswesen",
    description: "Hygienesensible Praxen und Pflegeeinrichtungen.",
  },
  {
    slug: "bildung-betreuung",
    name: "Bildung & Betreuung",
    description: "Schulen, Kitas und Betreuungseinrichtungen.",
  },
  {
    slug: "gewerbe-retail",
    name: "Gewerbe & Retail",
    description: "Verkaufsflächen, Gewerbe und Ladenlokale.",
  },
  {
    slug: "parkhaeuser-tiefgaragen",
    name: "Parkhäuser & Tiefgaragen",
    description: "Maschinelle Reinigung grosser Verkehrsflächen.",
  },
  {
    slug: "privatkunden",
    name: "Privatkunden",
    description: "Private Liegenschaften und individuelle Aufträge.",
  },
];
