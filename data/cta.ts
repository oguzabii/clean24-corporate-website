import { contact } from "./contact";
import { site } from "./site";

/** Reusable call-to-action labels and targets. */
export interface CtaLink {
  label: string;
  href: string;
}

/** Prefilled email for administration / object-care inquiries. */
const verwaltungMailto = `${contact.emailHref}?subject=Anfrage%20Verwaltung%20/%20Objektbetreuung`;

export const cta = {
  /** Primary conversion action — routes to the Sales Engine offer flow. */
  primary: {
    label: "Offerte anfordern",
    href: site.salesEngineUrl,
  } satisfies CtaLink,
  /** Softer secondary action — the corporate contact page. */
  secondary: { label: "Kontakt aufnehmen", href: "/kontakt" } satisfies CtaLink,
  /** Discover the service range on the homepage. */
  services: {
    label: "Leistungen entdecken",
    href: "/#leistungen",
  } satisfies CtaLink,
  /** Direct phone call. */
  call: { label: "Jetzt anrufen", href: contact.phoneHref } satisfies CtaLink,
  /** B2B action — email inquiry for real estate administrations. */
  verwaltungen: {
    label: "Anfrage für Verwaltungen senden",
    href: verwaltungMailto,
  } satisfies CtaLink,
} as const;
