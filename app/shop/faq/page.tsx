import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { ShopInfoLinks } from "@/components/shop/ShopInfoLinks";

export const metadata: Metadata = {
  title: "Shop FAQ",
  description:
    "Häufige Fragen zum Clean24 Shop: Verfügbarkeit, Produkte, Checkout, Preise sowie Versand und Rückgabe.",
};

/** Honest prelaunch FAQ — no launch dates, no fake promises. */
const faqItems: { question: string; answer: string }[] = [
  {
    question: "Wann ist der Online-Shop verfügbar?",
    answer:
      "Der Shop befindet sich im Aufbau. Produkte, Preise und der Online-Checkout werden derzeit vorbereitet; ein verbindliches Startdatum kommunizieren wir, sobald alle Grundlagen finalisiert sind.",
  },
  {
    question: "Welche Produkte wird Clean24 anbieten?",
    answer:
      "Geplant sind ausgewählte Produkte rund um Reinigung, Pflege und Wohnungsabgaben — von Reinigungssets über Zubehör wie Mikrofasertücher bis zu Checklisten für die Wohnungsabgabe. Das Sortiment im Shop zeigt den aktuellen Planungsstand.",
  },
  {
    question: "Gibt es bereits einen Online-Checkout?",
    answer:
      "Noch nicht. Der Online-Checkout wird aktuell vorbereitet. Sie können Produkte bereits in den Warenkorb legen, eine Bestellung mit Zahlung ist aber noch nicht möglich.",
  },
  {
    question: "Wie werden Produktdaten und Preise finalisiert?",
    answer:
      "Produktdaten, Verfügbarkeit und Preise werden vor dem Live-Verkauf geprüft und finalisiert. Solange ein Preis nicht verbindlich ist, zeigen wir «Preis folgt».",
  },
  {
    question: "Wo finde ich Informationen zu Versand und Rückgabe?",
    answer:
      "Auf den Seiten «Versand & Zahlung» und «Retoure & Rückgabe». Beide Bereiche werden vor dem Live-Verkauf mit den verbindlichen Bedingungen ergänzt.",
  },
];

export default function ShopFaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Shop FAQ"
        lead="Antworten auf häufige Fragen zum Clean24 Shop — ehrlich zum aktuellen Stand, ohne Versprechen, die noch nicht final sind."
      />

      <Section tone="mist">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-7"
            >
              <h2 className="text-base font-semibold tracking-tight text-navy-900">
                {item.question}
              </h2>
              <p className="mt-3 text-sm leading-6 text-navy-600">
                {item.answer}
              </p>
            </div>
          ))}

          <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-6 sm:p-7">
            <p className="text-sm leading-6 text-navy-700">
              Ihre Frage ist nicht dabei? Wir helfen gerne direkt weiter.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakt" variant="primary" size="md">
                Kontakt aufnehmen
              </Button>
              <Button href="/shop" variant="outline" size="md">
                Zum Shop
              </Button>
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-500">
              Weitere Shop-Informationen
            </h2>
            <ShopInfoLinks exclude="/shop/faq" className="mt-3" />
          </div>
        </div>
      </Section>
    </>
  );
}
