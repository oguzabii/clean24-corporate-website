import { contact } from "./contact";

/** Reusable call-to-action labels and targets. */
export interface CtaLink {
  label: string;
  href: string;
}

export const cta = {
  /** Primary conversion action across the site. */
  primary: { label: "Offerte anfragen", href: "#kontakt" } satisfies CtaLink,
  /** Softer secondary action. */
  secondary: { label: "Kontakt aufnehmen", href: "#kontakt" } satisfies CtaLink,
  /** Discover the service range. */
  services: { label: "Leistungen entdecken", href: "#leistungen" } satisfies CtaLink,
  /** Direct phone call (used on mobile sticky CTA). */
  call: { label: "Anrufen", href: contact.phoneHref } satisfies CtaLink,
} as const;
