/**
 * Clean24 quality promise — qualitative trust blocks only.
 * No invented metrics, certifications, ratings or client logos.
 */
export interface QualityBlock {
  title: string;
  description: string;
}

export const qualityPromise: QualityBlock[] = [
  {
    title: "Klare Einsatzplanung",
    description:
      "Umfang, Intervalle und Zuständigkeiten werden vor dem ersten Einsatz definiert — Sie wissen jederzeit, was wann gereinigt wird.",
  },
  {
    title: "Professionelle Ausführung",
    description:
      "Geschultes Personal, geeignete Maschinen und auf das Objekt abgestimmte Reinigungsmittel — bei jedem Einsatz.",
  },
  {
    title: "Transparente Kommunikation",
    description:
      "Feste Ansprechpartner und klare Rückmeldungen — vor, während und nach dem Einsatz.",
  },
  {
    title: "Qualitätskontrolle",
    description:
      "Ergebnisse werden systematisch geprüft. Abweichungen sprechen wir offen an und beheben sie direkt.",
  },
  {
    title: "Dokumentation auf Wunsch",
    description:
      "Auf Wunsch halten wir Einsätze und Kontrollen nachvollziehbar fest — für Ihre Unterlagen und Abnahmen.",
  },
];
