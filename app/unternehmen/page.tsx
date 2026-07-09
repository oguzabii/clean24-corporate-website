import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FounderCard } from "@/components/ui/FounderCard";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { founders } from "@/data/founders";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Clean24 wurde 2022 von den Brüdern Oğuzhan und Yavuz Memis gegründet. Lernen Sie die Geschichte, Werte und Vision hinter Clean24 kennen.",
};

const story = [
  "Clean24 Memis GmbH steht für professionelle Reinigung mit klaren Abläufen, direkter Kommunikation und Verantwortung vor Ort.",
  "Gegründet wurde Clean24 im Jahr 2022 von den Brüdern Oğuzhan und Yavuz Memis. Aus der täglichen Arbeit mit Wohnungen, Liegenschaften, Unternehmen und Verwaltungen entstand die Überzeugung, dass gute Reinigung mehr braucht als nur Arbeitskraft. Sie braucht Planung, Verlässlichkeit, klare Zuständigkeiten und Menschen, die Verantwortung übernehmen.",
  "Was als praktischer Reinigungsbetrieb begann, entwickelte sich Schritt für Schritt zu einem breiter aufgestellten Reinigungs- und Facility-Service-Unternehmen. Heute unterstützt Clean24 private Kunden, Unternehmen, Immobilienverwaltungen und gewerbliche Objekte in Zürich und Umgebung – von der Unterhaltsreinigung über Treppenhäuser, Büros, Praxen und Parkhäuser bis hin zu Spezial- und Umzugsreinigungen.",
  "Unser Anspruch ist einfach: Kunden sollen wissen, was vereinbart wurde, wann gereinigt wird, wer zuständig ist und was sie erwarten können. Deshalb arbeiten wir mit klaren Abläufen, transparenten Offerten und persönlicher Betreuung.",
  "Als Brüder führen wir Clean24 mit einem gemeinsamen Verständnis: Qualität entsteht nicht durch grosse Versprechen, sondern durch saubere Arbeit, gute Organisation und ehrliche Kommunikation. Jeder Auftrag soll so geplant und ausgeführt werden, dass Kunden sich darauf verlassen können – vor, während und nach dem Einsatz.",
  "Clean24 ist kein anonymer Dienstleister. Hinter dem Unternehmen stehen Menschen, die erreichbar sind, mitdenken und Verantwortung übernehmen. Genau daraus entstand unser Leitgedanke:",
];

const warum = [
  "Viele Reinigungsaufträge scheitern nicht an der Reinigung selbst, sondern an fehlender Organisation: unklare Absprachen, wechselnde Zuständigkeiten, unvollständige Informationen oder fehlende Kontrolle.",
  "Clean24 setzt genau dort an. Wir verbinden praktische Reinigungserfahrung mit klaren Prozessen. Für Kunden bedeutet das: weniger Aufwand, bessere Planbarkeit und ein Ansprechpartner, der Verantwortung übernimmt.",
  "Ob regelmässige Unterhaltsreinigung, Liegenschaftsbetreuung, Büroreinigung, Praxisreinigung, Parkhausreinigung oder Umzugsreinigung – jedes Objekt braucht einen passenden Ablauf. Unser Ziel ist es, für jeden Auftrag die richtige Struktur zu schaffen.",
];

const values = [
  {
    title: "Verlässlichkeit",
    text: "Wir halten uns an Abmachungen, Termine und vereinbarte Leistungen. Kunden sollen sich darauf verlassen können, dass ein Auftrag nicht nur angenommen, sondern sauber umgesetzt wird.",
  },
  {
    title: "Klare Kommunikation",
    text: "Gute Reinigung beginnt vor dem Einsatz. Deshalb legen wir Wert auf verständliche Offerten, klare Rückfragen und direkte Kommunikation.",
  },
  {
    title: "Verantwortung vor Ort",
    text: "Jedes Objekt ist anders. Deshalb übernehmen wir Verantwortung nicht nur im Büro, sondern auch dort, wo die Arbeit ausgeführt wird.",
  },
  {
    title: "Qualität mit System",
    text: "Qualität entsteht durch Wiederholung, Kontrolle und klare Abläufe. Wir arbeiten daran, Reinigung planbarer und nachvollziehbarer zu machen.",
  },
  {
    title: "Weiterentwicklung",
    text: "Clean24 entwickelt sich laufend weiter – mit besseren Prozessen, digitalen Abläufen und einem breiteren Serviceverständnis für private und gewerbliche Kunden.",
  },
];

const vision = [
  "Clean24 soll in Zürich und Umgebung als moderner Reinigungs- und Facility-Service-Partner wahrgenommen werden – für Kunden, die nicht einfach irgendeine Reinigung suchen, sondern einen Betrieb, der mitdenkt, sauber plant und Verantwortung übernimmt.",
  "Wir möchten Reinigung einfacher, klarer und zuverlässiger machen: für private Kunden, für Unternehmen und besonders für Immobilienverwaltungen, die regelmässig auf saubere Objekte, funktionierende Abläufe und verlässliche Ansprechpartner angewiesen sind.",
  "Unser Ziel ist nicht, der lauteste Anbieter zu sein. Unser Ziel ist, dass Kunden nach einem Auftrag sagen können: Es war klar, es war zuverlässig, es war sauber.",
];

export default function UnternehmenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Zwei Brüder. Ein Anspruch: Sauberkeit mit System."
        lead="Clean24 wurde 2022 von den Brüdern Oğuzhan und Yavuz Memis aufgebaut – mit dem Ziel, Reinigung verlässlicher, klarer und professioneller zu organisieren."
      />

      {/* Unsere Geschichte */}
      <Section tone="white">
        <SectionHeading eyebrow="Unsere Geschichte" title="Wie Clean24 entstanden ist." />
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-navy-600">
          {story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p className="pt-2 text-2xl font-semibold tracking-tight text-navy-900">
            Sauberkeit mit System.
          </p>
        </div>
      </Section>

      {/* Gründer */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Gründer"
          title="Die Menschen hinter Clean24."
          lead="Oğuzhan und Yavuz Memis führen Clean24 gemeinsam – mit klaren Zuständigkeiten und persönlicher Betreuung."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-4xl">
          {founders.map((founder) => (
            <FounderCard key={founder.slug} founder={founder} showBio />
          ))}
        </div>
      </Section>

      {/* Warum Clean24 */}
      <Section tone="white">
        <SectionHeading eyebrow="Warum Clean24" title="Struktur schlägt Zufall." />
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-navy-600">
          {warum.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Unsere Werte */}
      <Section tone="mist">
        <SectionHeading eyebrow="Unsere Werte" title="Woran wir uns messen lassen." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-semibold tabular-nums text-teal-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-navy-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-navy-600">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Unsere Vision */}
      <Section tone="navyDeep">
        <SectionHeading dark eyebrow="Unsere Vision" title="Reinigung, auf die man sich verlässt." />
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-navy-200">
          {vision.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            Lernen Sie Clean24 kennen.
          </h2>
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
