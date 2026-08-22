import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Nachhaltigkeit",
  description:
    "Nachhaltigkeit bei Clean24 bedeutet Verantwortung im täglichen Betrieb: bewusster Materialeinsatz, effiziente Planung und sorgfältiger Ressourceneinsatz.",
};

const practices = [
  {
    title: "Material bewusst einsetzen",
    text: "Mittel und Material werden passend zur Aufgabe und zum Objekt verwendet.",
  },
  {
    title: "Wege sinnvoll planen",
    text: "Gute Einsatzplanung vermeidet unnötige Umwege und reduziert Aufwand.",
  },
  {
    title: "Oberflächen sorgfältig behandeln",
    text: "Sorgfältige Reinigung trägt dazu bei, Werte und Materialien länger zu erhalten.",
  },
];

export default function NachhaltigkeitPage() {
  return (
    <>
      <section className="bg-mist py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Nachhaltigkeit
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.1rem,10vw,6.8rem)] font-semibold leading-[0.92] tracking-tight">
                Verantwortung beginnt im täglichen Einsatz.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
                Für Clean24 bedeutet Nachhaltigkeit: bewusst mit Material,
                Wegen, Oberflächen und Ressourcen umgehen.
              </p>
            </div>
            <div className="relative min-h-[380px] overflow-hidden bg-navy-100 sm:min-h-[620px]">
              <Image
                src="/media/clean24/generated/nachhaltigkeit-hero-clean24.png"
                alt="Clean24 Mitarbeitende mit sorgfältigem Materialeinsatz im täglichen Betrieb."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Praxis
              </p>
              <h2 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Keine grossen Umweltversprechen. Sorgfalt im Alltag.
              </h2>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {practices.map((item) => (
                <section
                  key={item.title}
                  className="grid gap-4 py-7 sm:grid-cols-[0.9fr_1.1fr] sm:items-start sm:gap-8"
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

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-[78rem]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Haltung
              </p>
              <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight">
                Glaubwürdig bleibt, was belegbar ist.
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-200">
              Wir behaupten keine Klimaneutralität, keine Zertifizierungen und
              keine Einsparungen, die nicht dokumentiert sind. Unser Anspruch
              ist ein sorgfältiger Ressourceneinsatz im konkreten Auftrag.
            </p>
          </div>
          <div className="mt-12">
            <Button href={cta.secondary.href} variant="accent" size="lg">
              Kontakt aufnehmen
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
