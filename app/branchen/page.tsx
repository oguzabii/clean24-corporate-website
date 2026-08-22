import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Branchen",
  description:
    "Clean24 arbeitet für Unternehmen, Immobilienverwaltungen, Gesundheitswesen, Bildung, Gewerbe, Parkhäuser und Privatkunden in Zürich und Umgebung.",
};

export default function BranchenPage() {
  return (
    <>
      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-40">
        <Container className="max-w-[84rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
            Branchen
          </p>
          <h1 className="mt-7 max-w-5xl text-[clamp(2.9rem,12vw,7rem)] font-semibold leading-[0.92] tracking-tight">
            Jeder Ort hat seinen eigenen Rhythmus.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-navy-200 sm:text-2xl sm:leading-9">
            Branchen beschreiben nicht, was wir tun. Sie beschreiben, welche
            Umgebung wir verstehen müssen, bevor Reinigung zuverlässig wird.
          </p>
          <div className="relative mt-14 min-h-[320px] overflow-hidden bg-navy-900 sm:min-h-[520px] lg:min-h-[620px]">
            <Image
              src="/media/clean24/generated/branchen-hero-clean24.png"
              alt="Clean24 Reinigungsarbeit in einer betreuten professionellen Umgebung."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[80rem]">
          <div className="divide-y divide-navy-200 border-y border-navy-200">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/branchen/${industry.slug}`}
                className="group grid gap-5 py-8 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8"
              >
                <span className="min-w-0">
                  <span className="relative block aspect-[4/3] w-full overflow-hidden bg-navy-100">
                    <Image
                      src={industry.overviewImage}
                      alt={industry.imageAlt}
                      fill
                      loading="eager"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) calc(100vw - 8rem), 58rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      style={{ objectPosition: industry.objectPositionDesktop ?? "center center" }}
                    />
                  </span>
                  <span className="mt-6 block text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-tight text-navy-950">
                    {industry.name}
                  </span>
                  <span className="mt-3 block max-w-2xl text-base leading-7 text-navy-600">
                    {industry.lead}
                  </span>
                </span>
                <span
                  className="pt-1 text-sm font-semibold text-navy-500 transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-32">
        <Container className="max-w-5xl text-center">
          <h2 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
            Welche Umgebung sollen wir betreuen?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-600">
            Für Offerten zählt der konkrete Ort: Nutzung, Fläche, Zeiten und
            gewünschter Ablauf.
          </p>
          <div className="mt-9">
            <Button href={cta.primary.href} size="lg">
              Offerte anfordern
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
