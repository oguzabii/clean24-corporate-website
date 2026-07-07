/**
 * Primary site navigation. Section links are absolute to the homepage
 * (`/#anchor`) so they resolve correctly from any page; Kontakt is a
 * dedicated route.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Kompetenzen", href: "/#kompetenzen" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Branchen", href: "/#branchen" },
  { label: "Verwaltungen", href: "/#verwaltungen" },
  { label: "Kontakt", href: "/kontakt" },
];
