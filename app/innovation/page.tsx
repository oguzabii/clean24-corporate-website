import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Innovation",
  description:
    "Innovation bei Clean24 bedeutet bessere Prozesse: digitale Abläufe, klare Kommunikation, strukturierte Planung und kontinuierliche Verbesserung.",
};

const improvements = [
  "Anfragen strukturiert aufnehmen",
  "Informationen sauber weitergeben",
  "Einsätze klarer planen",
  "Abläufe laufend verbessern",
];

export default function InnovationPage() {
  return (
    <>
      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Innovation
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.1rem,10vw,6.8rem)] font-semibold leading-[0.92] tracking-tight">
                Bessere Abläufe.
                <span className="block text-navy-400">Weniger Reibung.</span>
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
              Innovation bedeutet bei Clean24 nicht Show. Sie bedeutet:
              Anfragen, Planung und Kommunikation einfacher und zuverlässiger zu
              machen.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-16 text-white sm:py-24 lg:py-32">
        <Container className="max-w-[90rem]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div className="relative min-h-[360px] overflow-hidden bg-navy-900 sm:min-h-[560px] lg:min-h-[680px]">
              <Image
                src="/media/clean24/generated/innovation-hero-clean24.png"
                alt="Clean24 Planung und Organisation für strukturierte Reinigungsabläufe."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Organisation
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.96] tracking-tight">
                Digital dort, wo es den Alltag klärt.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-navy-200">
                Online-Anfragen, klare Angaben und strukturierte interne
                Abläufe helfen, Rückfragen zu reduzieren und Einsätze besser
                vorzubereiten.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[80rem]">
          <div className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Verbesserung
            </p>
            <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight text-navy-950">
              Kleine Prozessschritte machen den Unterschied.
            </h2>
          </div>
          <div className="mt-14 divide-y divide-navy-200 border-y border-navy-200">
            {improvements.map((item) => (
              <div key={item} className="py-7">
                <p className="text-3xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-4xl">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href={cta.primary.href} variant="primary" size="lg">
              Zum Online-Formular
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
