import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Qualität",
  description:
    "Qualität bei Clean24 entsteht durch klare Planung, definierte Zuständigkeiten, strukturierte Einsätze, direkte Kommunikation und saubere Ausführung.",
};

const process = [
  {
    title: "Planen",
    text: "Umfang, Objekt und Zuständigkeiten werden vor dem Einsatz geklärt.",
  },
  {
    title: "Ausführen",
    text: "Die Reinigung folgt einem strukturierten Einsatz und einer klaren Erwartung.",
  },
  {
    title: "Abstimmen",
    text: "Rückfragen und Beobachtungen werden direkt kommuniziert.",
  },
  {
    title: "Nachvollziehen",
    text: "Abläufe bleiben verständlich, damit Qualität wiederholbar wird.",
  },
];

export default function QualitaetPage() {
  return (
    <>
      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-44">
        <Container className="max-w-[88rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
            Qualität
          </p>
          <h1 className="mt-7 max-w-6xl text-[clamp(3.2rem,11vw,7rem)] font-semibold leading-[0.92] tracking-tight">
            Qualität entsteht nicht im Versprechen.
            <span className="block text-navy-400">Sie entsteht im Ablauf.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-navy-200 sm:text-2xl sm:leading-9">
            Clean24 setzt auf klare Planung, definierte Zuständigkeiten,
            strukturierte Einsätze und direkte Kommunikation.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <Container className="max-w-[90rem]">
          <div className="relative min-h-[360px] overflow-hidden bg-navy-100 sm:min-h-[620px] lg:min-h-[720px]">
            <Image
              src="/media/clean24/generated/qualitaet-hero-clean24-1.png"
              alt="Clean24 Qualitätsarbeit mit strukturiertem Reinigungsprozess vor Ort."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Ablauf
              </p>
              <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight text-navy-950">
                Saubere Ausführung braucht klare Reihenfolge.
              </h2>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {process.map((item) => (
                <section
                  key={item.title}
                  className="grid gap-4 py-7 sm:grid-cols-[0.8fr_1.2fr] sm:items-start sm:gap-8"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-navy-950">
                    {item.title}
                  </h3>
                  <p className="text-base leading-7 text-navy-600 sm:text-lg sm:leading-8">
                    {item.text}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
            Qualität mit System.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-600">
            Sagen Sie uns, welches Objekt gereinigt werden soll. Wir klären den
            passenden Ablauf.
          </p>
          <div className="mt-9">
            <Button href={cta.primary.href} variant="primary" size="lg">
              Offerte anfordern
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
