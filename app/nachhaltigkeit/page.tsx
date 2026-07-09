import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Nachhaltigkeit",
  description:
    "Nachhaltigkeit bei Clean24: bewusster Einsatz von Reinigungsmitteln, passende Dosierung, langlebige Objektpflege und effiziente Planung.",
};

const items = [
  {
    title: "Bewusster Mitteleinsatz",
    text: "Wir wählen Reinigungsmittel bewusst und setzen sie gezielt ein – passend zum Objekt und zur Aufgabe.",
  },
  {
    title: "Passende Dosierung",
    text: "Die richtige Dosierung schont Oberflächen und Umwelt und vermeidet unnötigen Verbrauch.",
  },
  {
    title: "Langlebige Objektpflege",
    text: "Regelmässige, sorgfältige Pflege erhält den Wert von Oberflächen und verlängert deren Lebensdauer.",
  },
  {
    title: "Effiziente Planung",
    text: "Gut geplante Einsätze reduzieren Wege, Aufwand und Verbrauch – Nachhaltigkeit beginnt bei der Organisation.",
  },
];

export default function NachhaltigkeitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nachhaltigkeit"
        title="Bewusst reinigen."
        lead="Nachhaltigkeit bedeutet für Clean24 vor allem sorgfältigen, bewussten Umgang mit Mitteln, Oberflächen und Ressourcen im täglichen Einsatz."
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="Unser Ansatz"
          title="Verantwortung im Alltag."
        />
        <div className="mt-12">
          <FeatureGrid items={items} columns={2} />
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-7 text-navy-500">
          Wir verzichten bewusst auf ungeprüfte Umweltversprechen und Zertifikate,
          die wir nicht belegen können. Was wir tun, tun wir im täglichen Einsatz –
          konkret und nachvollziehbar.
        </p>

        <div className="mt-8">
          <Button href={cta.secondary.href} variant="primary" size="lg">
            {cta.secondary.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
