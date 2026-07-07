import { contact } from "./contact";

/** Reusable call-to-action labels and targets. */
export interface CtaLink {
  label: string;
  href: string;
}

export const cta = {
  /** Primary conversion action across the site. */
  primary: { label: "Offerte anfordern", href: "#kontakt" } satisfies CtaLink,
  /** Softer secondary action. */
  secondary: { label: "Kontakt aufnehmen", href: "#kontakt" } satisfies CtaLink,
  /** Discover the service range. */
  services: { label: "Leistungen entdecken", href: "#leistungen" } satisfies CtaLink,
  /** Direct phone call. */
  call: { label: "Jetzt anrufen", href: contact.phoneHref } satisfies CtaLink,
  /** B2B action for real estate administrations. */
  verwaltungen: {
    label: "Anfrage für Verwaltungen senden",
    href: "#kontakt",
  } satisfies CtaLink,
} as const;
