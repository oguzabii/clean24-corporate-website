import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import {
  getServicesByGroup,
  serviceGroups,
} from "@/data/services";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Leistungen von Clean24: Unterhaltsreinigung, Büroreinigung, Treppenhausreinigung, Praxisreinigung, Parkhausreinigung, Spezialreinigung und Umzugsreinigung.",
};

export default function LeistungenPage() {
  return (
    <>
      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Leistungen
              </p>
              <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,12vw,7rem)] font-semibold leading-[0.92] tracking-tight">
                Reinigung für Räume, die funktionieren müssen.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
              Clean24 organisiert Reinigung nach Objekt, Nutzung und Rhythmus.
              Jede Leistung hat eine klare Aufgabe und eine eigene Route.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[88rem]">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
            <div className="relative min-h-[420px] overflow-hidden bg-navy-900 sm:min-h-[560px] lg:sticky lg:top-28">
              <Image
                src="/media/clean24/generated/leistungen-hero-clean24.png"
                alt="Clean24 Reinigungsleistung in einer professionellen Arbeitsumgebung."
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="space-y-14">
              {serviceGroups.map((group) => (
                <section key={group.id} aria-labelledby={group.id}>
                  <div className="border-t border-navy-200 pt-7">
                    <h2
                      id={group.id}
                      className="max-w-2xl text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1] tracking-tight text-navy-950"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-navy-600">
                      {group.description}
                    </p>
                  </div>
                  <div className="mt-7 divide-y divide-navy-100 border-y border-navy-100">
                    {getServicesByGroup(group.id).map((service) => (
                      <Link
                        key={service.slug}
                        href={`/leistungen/${service.slug}`}
                        className="group grid min-h-20 gap-3 py-5 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <span>
                          <span className="block text-2xl font-semibold tracking-tight text-navy-950">
                            {service.name}
                          </span>
                          <span className="mt-2 block max-w-2xl text-sm leading-6 text-navy-600">
                            {service.description}
                          </span>
                        </span>
                        <span
                          className="text-sm font-semibold text-navy-500 transition-all group-hover:translate-x-1 group-hover:text-teal-700"
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-5xl text-center">
          <h2 className="text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[0.95] tracking-tight">
            Welche Reinigung passt zu Ihrem Objekt?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-200">
            Beschreiben Sie kurz Objekt, Fläche und gewünschten Rhythmus. Clean24
            meldet sich mit dem passenden nächsten Schritt.
          </p>
          <div className="mt-9">
            <Button href={cta.primary.href} variant="accent" size="lg">
              Offerte anfordern
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
