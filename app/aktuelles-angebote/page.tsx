import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Aktuelles & Angebote",
  description:
    "Aktuelles & Angebote von Clean24: Hier erscheinen künftig Updates, Checklisten und hilfreiche Informationen rund um Reinigung, Objektpflege und Wohnungsabgaben.",
};

const upcoming = [
  {
    title: "Checklisten zur Wohnungsabgabe",
    text: "Praktische Hilfestellungen für eine reibungslose Übergabe – in Vorbereitung.",
  },
  {
    title: "Saisonale Angebote",
    text: "Gelegentliche Aktionen für Unterhalts- und Spezialreinigungen – in Vorbereitung.",
  },
  {
    title: "Tipps zur Objektpflege",
    text: "Hinweise für Verwaltungen und private Kunden zur langfristigen Werterhaltung – in Vorbereitung.",
  },
];

export default function AktuellesAngebotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Aktuelles"
        title="Aktuelles & Angebote."
        lead="Hier erscheinen künftig Updates, Checklisten und Angebote rund um Reinigung, Objektpflege und Wohnungsabgaben."
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="In Vorbereitung"
          title="Was hier bald zu finden ist."
          lead="Wir bauen diesen Bereich sorgfältig auf. Statt Platzhalter zeigen wir nur, was tatsächlich kommt."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-500">
                Bald verfügbar
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-navy-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Sie haben bereits eine konkrete Anfrage?
          </h2>
          <p className="mt-3 text-[0.95rem] leading-7 text-navy-600">
            Für Offerten und Reinigungsanfragen nutzen Sie direkt unser
            Online-Formular – wir bearbeiten Ihre Anfrage strukturiert.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={cta.primary.href} variant="accent" size="lg">
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="outline" size="lg">
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
