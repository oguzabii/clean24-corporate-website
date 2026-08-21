import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Verwaltungen",
  description:
    "Clean24 unterstützt Immobilienverwaltungen mit klarer Planung, festen Ansprechpartnern, dokumentierten Einsätzen und Objektpflege für Liegenschaften.",
};

const proof = [
  "Fester Ansprechpartner",
  "Klare Planung",
  "Dokumentierte Einsätze",
];

const objectCare = [
  {
    title: "Treppenhäuser",
    text: "Gepflegte Eingänge und allgemeine Flächen mit klaren Intervallen.",
    href: "/leistungen/treppenhausreinigung",
  },
  {
    title: "Parkhäuser & Tiefgaragen",
    text: "Robuste Reinigung grosser Verkehrsflächen mit passender Planung.",
    href: "/leistungen/parkhausreinigung",
  },
  {
    title: "Objektpflege",
    text: "Gebündelte Betreuung von Liegenschaften und ergänzenden Aufgaben.",
    href: "/leistungen/objektreinigung",
  },
];

export default function VerwaltungenPage() {
  return (
    <>
      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-40">
        <Container className="max-w-[90rem]">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Verwaltungen
              </p>
              <h1 className="mt-7 max-w-4xl text-[clamp(2.9rem,12vw,6.8rem)] font-semibold leading-[0.92] tracking-tight">
                Ein Partner.
                <span className="block">Klare Abläufe.</span>
                <span className="block text-navy-400">Weniger Aufwand.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-8 text-navy-200 sm:text-2xl sm:leading-9">
                Clean24 unterstützt Immobilienverwaltungen bei Liegenschaften,
                Treppenhäusern, Parkhäusern und Objektpflege mit direkter
                Kommunikation.
              </p>
              <div className="mt-10">
                <Button href={cta.verwaltungen.href} variant="accent" size="lg">
                  Für Verwaltungen anfragen
                </Button>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-navy-900 sm:min-h-[640px] lg:min-h-[720px]">
              <Image
                src="/media/clean24/generated/verwaltungen-hero-property-care-1.png"
                alt="Gepflegte Wohnliegenschaft als Beispiel für strukturierte Objektpflege für Verwaltungen."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[78rem]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                System
              </p>
              <h2 className="mt-5 text-[clamp(2.8rem,7vw,5.2rem)] font-semibold leading-[0.94] tracking-tight text-navy-950">
                Weniger Reibung im Alltag.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {proof.map((item, index) => (
                <div key={item} className="border-t border-navy-200 pt-5">
                  <span className="text-sm font-semibold tabular-nums text-teal-700">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-navy-950">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Objektpflege
              </p>
              <h2 className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Liegenschaften brauchen klare Zuständigkeiten.
              </h2>
              <p className="mt-6 max-w-xl text-xl leading-8 text-navy-600">
                Clean24 bündelt wiederkehrende Reinigung und gezielte
                Objektpflege so, dass Verwaltungen einen direkten
                Ansprechpartner haben.
              </p>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {objectCare.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group grid min-h-24 gap-3 py-6 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span>
                    <span className="block text-2xl font-semibold tracking-tight text-navy-950">
                      {item.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-base leading-7 text-navy-600">
                      {item.text}
                    </span>
                  </span>
                  <span
                    className="text-sm font-semibold text-navy-500 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="text-[clamp(2.7rem,7vw,5.2rem)] font-semibold leading-[0.96] tracking-tight">
            Liegenschaft anfragen.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-200">
            Senden Sie uns die wichtigsten Angaben zur Liegenschaft. Clean24
            meldet sich direkt.
          </p>
          <div className="mt-9">
            <Button href={cta.verwaltungen.href} variant="accent" size="lg">
              Anfrage für Verwaltungen senden
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
