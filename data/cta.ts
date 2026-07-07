import { contact } from "./contact";

/** Reusable call-to-action labels and targets. */
export interface CtaLink {
  label: string;
  href: string;
}

export const cta = {
  /** Primary conversion action — opens the contact page prefilled for an offer. */
  primary: {
    label: "Offerte anfordern",
    href: "/kontakt?anfrage=offerte",
  } satisfies CtaLink,
  /** Softer secondary action — the general contact page. */
  secondary: { label: "Kontakt aufnehmen", href: "/kontakt" } satisfies CtaLink,
  /** Discover the service range on the homepage. */
  services: {
    label: "Leistungen entdecken",
    href: "/#leistungen",
  } satisfies CtaLink,
  /** Direct phone call. */
  call: { label: "Jetzt anrufen", href: contact.phoneHref } satisfies CtaLink,
  /** B2B action — contact page prefilled for administrations. */
  verwaltungen: {
    label: "Anfrage für Verwaltungen senden",
    href: "/kontakt?anfrage=verwaltung",
  } satisfies CtaLink,
} as const;
