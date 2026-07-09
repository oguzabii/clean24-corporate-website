import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Innovation",
  description:
    "Clean24 verbindet solide Reinigungsarbeit mit digitalen Abläufen: Online-Offerten, bessere Planung und ein strukturierter Anfrage- und Offertprozess.",
};

const items = [
  {
    title: "Digitale Abläufe",
    text: "Wir digitalisieren Schritt für Schritt, was den Alltag klarer macht – von der Anfrage bis zur Einsatzplanung.",
  },
  {
    title: "Online-Offerten",
    text: "Über unser Online-Formular erfassen Kunden ihre Anfrage strukturiert. Das beschleunigt die Bearbeitung und reduziert Rückfragen.",
  },
  {
    title: "Bessere Planung",
    text: "Klare Daten führen zu besserer Planung: passende Intervalle, realistische Termine und nachvollziehbare Zuständigkeiten.",
  },
  {
    title: "Strukturierter Anfrageprozess",
    text: "Anfragen und Offerten folgen einem klaren Ablauf – damit nichts verloren geht und jede Anfrage sauber bearbeitet wird.",
  },
];

export default function InnovationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Innovation"
        title="Digitale Abläufe, klare Prozesse."
        lead="Innovation heisst für Clean24 nicht Selbstzweck, sondern bessere Organisation: klarere Abläufe, einfachere Anfragen und verlässlichere Planung."
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="Wie wir arbeiten"
          title="Technik im Dienst der Zuverlässigkeit."
          lead="Wir setzen digitale Werkzeuge dort ein, wo sie Kunden und Team konkret entlasten – bodenständig und nachvollziehbar."
        />
        <div className="mt-12">
          <FeatureGrid items={items} columns={2} />
        </div>

        <div className="mt-12">
          <Button href={cta.primary.href} variant="primary" size="lg">
            Zum Online-Formular
          </Button>
        </div>
      </Section>
    </>
  );
}
