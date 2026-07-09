/**
 * Primary site navigation with mega-menu structure.
 *
 * Service and industry dropdown items point at the homepage anchors
 * (`/#leistungen`, `/#branchen`) so no link is ever broken; "Über uns" items
 * point at dedicated routes created in this phase.
 */
import { services } from "./services";
import { industries } from "./industries";

export interface NavLink {
  label: string;
  href: string;
  /** Optional supporting line for wide mega panels. */
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Dropdown items; when present the header renders a mega panel. */
  items?: NavLink[];
}

export const mainNav: NavItem[] = [
  {
    label: "Leistungen",
    href: "/#leistungen",
    items: services.map((service) => ({
      label: service.name,
      href: "/#leistungen",
    })),
  },
  {
    label: "Branchen",
    href: "/#branchen",
    items: industries.map((industry) => ({
      label: industry.name,
      href: "/#branchen",
      description: industry.description,
    })),
  },
  { label: "Verwaltungen", href: "/#verwaltungen" },
  {
    label: "Über uns",
    href: "/unternehmen",
    items: [
      { label: "Unternehmen", href: "/unternehmen" },
      { label: "Arbeiten bei Clean24", href: "/arbeiten-bei-clean24" },
      { label: "Jobs", href: "/jobs" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Qualität", href: "/qualitaet" },
      { label: "Innovation", href: "/innovation" },
      { label: "Nachhaltigkeit", href: "/nachhaltigkeit" },
      { label: "Shop", href: "/shop" },
    ],
  },
  { label: "Jobs", href: "/jobs" },
  { label: "Shop", href: "/shop" },
  { label: "Kontakt", href: "/kontakt" },
];

/** Footer link groups. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Leistungen",
    links: services.map((service) => ({
      label: service.name,
      href: "/#leistungen",
    })),
  },
  {
    title: "Branchen",
    links: industries.map((industry) => ({
      label: industry.name,
      href: "/#branchen",
    })),
  },
  {
    title: "Über uns",
    links: [
      { label: "Unternehmen", href: "/unternehmen" },
      { label: "Arbeiten bei Clean24", href: "/arbeiten-bei-clean24" },
      { label: "Jobs", href: "/jobs" },
      { label: "Qualität", href: "/qualitaet" },
      { label: "Innovation", href: "/innovation" },
      { label: "Nachhaltigkeit", href: "/nachhaltigkeit" },
      { label: "Aktuelles & Angebote", href: "/aktuelles-angebote" },
      { label: "Shop", href: "/shop" },
    ],
  },
];
