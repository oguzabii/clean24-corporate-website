/**
 * Primary site navigation with mega-menu structure.
 *
 * Service and industry dropdown items point at real overview/detail routes.
 * Named leaf links must never masquerade as unique destinations while routing
 * to a shared homepage anchor.
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
    href: "/leistungen",
    items: [
      {
        label: "Alle Leistungen",
        href: "/leistungen",
        description: "Überblick über Reinigungsleistungen.",
      },
      ...services.map((service) => ({
        label: service.name,
        href: `/leistungen/${service.slug}`,
        description: service.description,
      })),
    ],
  },
  {
    label: "Branchen",
    href: "/branchen",
    items: [
      {
        label: "Alle Branchen",
        href: "/branchen",
        description: "Umgebungen und Kundensegmente.",
      },
      ...industries.map((industry) => ({
        label: industry.name,
        href: `/branchen/${industry.slug}`,
        description: industry.description,
      })),
    ],
  },
  { label: "Verwaltungen", href: "/verwaltungen" },
  {
    label: "Über uns",
    href: "/unternehmen",
    items: [
      { label: "Unternehmen", href: "/unternehmen" },
      { label: "Arbeiten bei Clean24", href: "/arbeiten-bei-clean24" },
      { label: "Jobs", href: "/jobs" },
      { label: "Qualität", href: "/qualitaet" },
      { label: "Innovation", href: "/innovation" },
      { label: "Nachhaltigkeit", href: "/nachhaltigkeit" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
];

/** Footer link groups. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Leistungen",
    links: services.map((service) => ({
      label: service.name,
      href: `/leistungen/${service.slug}`,
    })),
  },
  {
    title: "Branchen",
    links: industries.map((industry) => ({
      label: industry.name,
      href: `/branchen/${industry.slug}`,
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
    ],
  },
];
