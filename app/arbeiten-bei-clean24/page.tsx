import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Arbeiten bei Clean24",
  description:
    "Arbeiten bei Clean24 bedeutet klare Einsätze, zuverlässige Planung und respektvollen Umgang. Erfahren Sie, wie wir zusammenarbeiten.",
};

const mailtoApply = `${contact.emailHref}?subject=Bewerbung%20Clean24`;

const points = [
  {
    title: "Klare Einsätze",
    text: "Jeder Einsatz wird vorbereitet: Objekt, Umfang und Zuständigkeit sind vor dem Start klar. So weiss jedes Teammitglied, was zu tun ist.",
  },
  {
    title: "Zuverlässige Planung",
    text: "Wir planen Einsätze vorausschauend und fair. Verlässliche Abläufe geben Sicherheit – für unsere Kunden und für unser Team.",
  },
  {
    title: "Respektvoller Umgang",
    text: "Ehrliche Kommunikation, faire Zusammenarbeit und gegenseitiger Respekt sind für uns die Grundlage guter Arbeit.",
  },
  {
    title: "Verantwortung vor Ort",
    text: "Wir vertrauen darauf, dass unsere Mitarbeitenden mitdenken und Verantwortung übernehmen – dort, wo die Arbeit geschieht.",
  },
];

export default function ArbeitenBeiClean24Page() {
  return (
    <>
      <PageHeader
        eyebrow="Karriere"
        title="Arbeiten bei Clean24."
        lead="Clean24 lebt von Menschen, die zuverlässig arbeiten und Verantwortung übernehmen. Was das für die Zusammenarbeit bedeutet, lesen Sie hier."
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="Zusammenarbeit"
          title="Wie wir bei Clean24 arbeiten."
          lead="Gute Reinigung entsteht durch gute Organisation und ein Team, das sich aufeinander verlassen kann."
        />
        <div className="mt-12">
          <FeatureGrid items={points} columns={2} />
        </div>
      </Section>

      <Section tone="mist">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Interesse an einer Mitarbeit?
          </h2>
          <p className="mt-3 text-[0.95rem] leading-7 text-navy-600">
            Wir freuen uns über Menschen, die zuverlässig arbeiten und sorgfältig
            mit Objekten umgehen. Schreiben Sie uns – auch eine Initiativbewerbung
            ist willkommen.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={mailtoApply} variant="primary" size="lg">
              Initiativbewerbung senden
            </Button>
            <Button href="/jobs" variant="outline" size="lg">
              Offene Bereiche ansehen
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
