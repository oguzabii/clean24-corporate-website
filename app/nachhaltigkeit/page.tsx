import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/media/clean24/property-building.jpg"
              alt="Gepflegte Liegenschaft als Ergebnis bewusster Objektpflege"
              width={900}
              height={700}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Unser Ansatz"
              title="Verantwortung im Alltag."
            />
            <div className="mt-12">
              <FeatureGrid items={items} columns={2} />
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-2xl border-t border-navy-100 pt-6 text-sm leading-7 text-navy-500">
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
