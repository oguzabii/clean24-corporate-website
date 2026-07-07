/** Primary site navigation. Anchors map to homepage sections for now. */
export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Kompetenzen", href: "#kompetenzen" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Branchen", href: "#branchen" },
  { label: "Verwaltungen", href: "#verwaltungen" },
  { label: "Kontakt", href: "#kontakt" },
];
