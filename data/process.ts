/** The Clean24 engagement process, from first contact to quality check. */
export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Anfrage senden",
    description:
      "Sie melden sich per Formular, E-Mail oder Telefon — unkompliziert und unverbindlich.",
  },
  {
    title: "Bedarf klären",
    description:
      "Wir besprechen Objekt, Umfang und Anforderungen. Bei Bedarf besichtigen wir vor Ort.",
  },
  {
    title: "Offerte erhalten",
    description:
      "Sie erhalten eine transparente Offerte mit klar ausgewiesenen Leistungen.",
  },
  {
    title: "Einsatz planen",
    description:
      "Termine, Intervalle und Zuständigkeiten werden verbindlich festgelegt.",
  },
  {
    title: "Reinigung durchführen",
    description:
      "Unser Team führt die Arbeiten fachgerecht und termingerecht aus.",
  },
  {
    title: "Qualität prüfen",
    description:
      "Wir kontrollieren das Ergebnis und stellen sicher, dass es Ihren Erwartungen entspricht.",
  },
];
