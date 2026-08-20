import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Qualität",
  description:
    "Qualität mit System: Clean24 arbeitet mit klarer Einsatzplanung, Checklisten, Kontrolle und transparenter Kommunikation – Dokumentation auf Wunsch.",
};

const items = [
  {
    title: "Einsatzplanung",
    text: "Umfang, Intervalle und Zuständigkeiten werden vor dem ersten Einsatz festgelegt – damit klar ist, was wann gereinigt wird.",
  },
  {
    title: "Checklisten",
    text: "Objektbezogene Checklisten sorgen dafür, dass keine Arbeiten vergessen gehen und die Qualität wiederholbar bleibt.",
  },
  {
    title: "Kontrolle",
    text: "Ergebnisse werden systematisch geprüft. Abweichungen sprechen wir offen an und beheben sie direkt.",
  },
  {
    title: "Kommunikation",
    text: "Feste Ansprechpartner und klare Rückmeldungen – vor, während und nach dem Einsatz.",
  },
  {
    title: "Dokumentation auf Wunsch",
    text: "Auf Wunsch halten wir Einsätze und Kontrollen nachvollziehbar fest – für Ihre Unterlagen und Abnahmen.",
  },
];

export default function QualitaetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Qualität"
        title="Qualität mit System."
        lead="Qualität entsteht nicht zufällig, sondern durch klare Abläufe, Kontrolle und Kommunikation. So stellen wir bei Clean24 konstante Ergebnisse sicher."
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Unser Qualitätsverständnis"
              title="Fünf Bausteine für verlässliche Ergebnisse."
            />
            <div className="mt-10 overflow-hidden rounded-xl">
              <Image
                src="/media/clean24/stairwell-cleaning.jpg"
                alt="Gepflegtes Treppenhaus als Beispiel für strukturierte Objektpflege"
                width={900}
                height={680}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:pt-3">
            <FeatureGrid items={items} columns={1} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-navy-100 pt-8 sm:flex-row sm:items-center">
          <Button href={cta.primary.href} variant="primary" size="lg">
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} variant="outline" size="lg">
            {cta.secondary.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
