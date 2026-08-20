import type { Metadata } from "next";
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
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[80rem]">
          <div className="divide-y divide-navy-200 border-y border-navy-200">
            {industries.map((industry, index) => (
              <Link
                key={industry.slug}
                href={`/branchen/${industry.slug}`}
                className="group grid min-h-28 gap-5 py-7 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[8rem_1fr_auto] sm:items-center"
              >
                <span className="text-sm font-semibold tabular-nums text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-tight text-navy-950">
                    {industry.name}
                  </span>
                  <span className="mt-3 block max-w-2xl text-base leading-7 text-navy-600">
                    {industry.lead}
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
