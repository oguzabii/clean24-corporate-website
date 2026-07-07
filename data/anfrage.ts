/**
 * Contact request types ("Anfrageart"). Shared by the contact-page options,
 * the form select, and the `?anfrage=` query-parameter mapping.
 */
export interface AnfrageOption {
  value: string;
  label: string;
  description: string;
}

export const anfrageOptions: AnfrageOption[] = [
  {
    value: "offerte",
    label: "Offerte anfragen",
    description:
      "Sie benötigen ein Angebot für eine einmalige oder wiederkehrende Reinigung.",
  },
  {
    value: "verwaltung",
    label: "Verwaltung / Objektbetreuung",
    description:
      "Sie betreuen Liegenschaften und suchen einen zuverlässigen Reinigungspartner.",
  },
  {
    value: "allgemein",
    label: "Allgemeine Anfrage",
    description:
      "Sie haben eine Frage zu unseren Leistungen oder zur Zusammenarbeit.",
  },
  {
    value: "rueckruf",
    label: "Telefonische Rückfrage",
    description:
      "Sie möchten, dass wir Sie für die Besprechung zurückrufen.",
  },
];

/** The default request type when none is provided in the URL. */
export const defaultAnfrage = "allgemein";

/** Normalise a raw `?anfrage=` value to a known option value. */
export function resolveAnfrage(raw?: string): string {
  return anfrageOptions.some((option) => option.value === raw)
    ? (raw as string)
    : defaultAnfrage;
}
