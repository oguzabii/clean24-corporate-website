import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Arbeiten bei Clean24",
  description:
    "Arbeiten bei Clean24 bedeutet klare Einsätze, zuverlässige Planung, respektvolle Zusammenarbeit und Verantwortung vor Ort.",
};

const mailtoApply = `${contact.emailHref}?subject=Bewerbung%20Clean24`;

const principles = [
  {
    title: "Klare Einsätze",
    text: "Objekt, Umfang und Zuständigkeit werden vor dem Einsatz geklärt. Gute Arbeit beginnt mit Orientierung.",
  },
  {
    title: "Zuverlässige Planung",
    text: "Einsätze brauchen Struktur. Wir planen so, dass Kundinnen, Kunden und Team wissen, worauf sie sich verlassen können.",
  },
  {
    title: "Respektvoller Umgang",
    text: "Direkte Kommunikation und fairer Umgang gehören für uns zur täglichen Zusammenarbeit.",
  },
  {
    title: "Verantwortung vor Ort",
    text: "Wer bei Clean24 arbeitet, übernimmt Verantwortung dort, wo Qualität sichtbar wird: im Objekt.",
  },
];

const applicationSteps = [
  "Bewerbung senden",
  "Persönliches Kennenlernen",
  "Passender Einsatz, wenn Bedarf und Profil zusammenpassen",
];

const roleAreas = [
  "Reinigungskraft",
  "Teamleitung",
  "Objektbetreuung",
];

export default function ArbeitenBeiClean24Page() {
  return (
    <>
      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[90rem]">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Karriere
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3rem,10vw,6.6rem)] font-semibold leading-[0.92] tracking-tight">
                Saubere Arbeit.
                <span className="block">Klare Einsätze.</span>
                <span className="block text-navy-400">
                  Ein Team, das zählt.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
                Clean24 arbeitet organisiert, direkt und mit Respekt. Für
                Menschen, die zuverlässig arbeiten und Verantwortung übernehmen
                wollen.
              </p>
              <div className="mt-10">
                <Button href="/jobs" variant="primary" size="lg">
                  Aktuelle Möglichkeiten ansehen
                </Button>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-navy-100 sm:min-h-[620px] lg:min-h-[720px]">
              <Image
                src="/media/clean24/generated/arbeiten-hero-clean24.png"
                alt="Clean24 Mitarbeitender bei professioneller Reinigungsarbeit in einer modernen Arbeitsumgebung."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-44">
        <Container className="max-w-[80rem]">
          <div className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
              Zusammenarbeit
            </p>
            <h2 className="mt-6 text-[clamp(2.7rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-tight">
              Gute Reinigung braucht Menschen, die wissen, was zu tun ist.
            </h2>
          </div>
          <div className="mt-16 divide-y divide-white/15 border-y border-white/15">
            {principles.map((item) => (
              <section
                key={item.title}
                className="grid gap-5 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12"
              >
                <h3 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {item.title}
                </h3>
                <p className="max-w-2xl text-lg leading-8 text-navy-200">
                  {item.text}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[86rem]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            <div className="relative min-h-[360px] overflow-hidden bg-navy-100 sm:min-h-[560px]">
              <Image
                src="/media/clean24/generated/arbeiten-team-in-action-clean24.png"
                alt="Clean24 Team in einer Arbeitsumgebung mit vorbereiteten Reinigungsaufgaben."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Einsatzbereiche
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Rollen mit Verantwortung.
              </h2>
              <p className="mt-6 max-w-xl text-xl leading-8 text-navy-600">
                Je nach Bedarf arbeitet Clean24 mit Menschen in Reinigung,
                Teamleitung und Objektbetreuung. Partnerbetriebe werden separat
                betrachtet.
              </p>
              <div className="mt-10 divide-y divide-navy-200 border-y border-navy-200">
                {roleAreas.map((role) => (
                  <Link
                    key={role}
                    href="/jobs"
                    className="group flex min-h-20 items-center justify-between gap-6 py-5 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <span className="text-2xl font-semibold tracking-tight text-navy-950">
                      {role}
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
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[76rem]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Bewerbung
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Einfach anfangen.
              </h2>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {applicationSteps.map((step) => (
                <div key={step} className="py-6">
                  <p className="text-2xl font-semibold leading-tight tracking-tight text-navy-950">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 border-t border-navy-200 pt-8">
            <p className="max-w-3xl text-lg leading-8 text-navy-600">
              Eine Bewerbung führt nicht automatisch zu einem Einsatz. Wir
              prüfen gemeinsam, ob aktueller Bedarf und Profil zusammenpassen.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.96] tracking-tight">
            Bereit für klare Einsätze?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-200">
            Senden Sie uns Ihre Initiativbewerbung. Wir melden uns, wenn eine
            passende Möglichkeit entsteht.
          </p>
          <div className="mt-9">
            <Button href={mailtoApply} variant="accent" size="lg">
              Initiativbewerbung senden
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
