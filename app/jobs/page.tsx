import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Jobs bei Clean24: Aktuelle Stellen, Initiativbewerbung und mögliche Einsatzbereiche in Reinigung, Teamleitung und Objektbetreuung.",
};

const mailtoApply = `${contact.emailHref}?subject=Bewerbung%20Clean24`;

const roleAreas = [
  {
    title: "Reinigungskraft",
    text: "Sorgfältige Reinigungsarbeit nach klaren Einsatzplänen und Objektanforderungen.",
  },
  {
    title: "Teamleitung",
    text: "Koordination vor Ort, direkte Kommunikation und Blick für die vereinbarte Qualität.",
  },
  {
    title: "Objektbetreuung",
    text: "Begleitung von Liegenschaften, wiederkehrenden Aufgaben und Abstimmung mit Ansprechpersonen.",
  },
];

export default function JobsPage() {
  return (
    <>
      <section className="bg-mist py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Jobs
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3rem,10vw,6.4rem)] font-semibold leading-[0.92] tracking-tight">
                Aktuelle Stellen bei Clean24.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
              Wir schreiben Stellen nur aus, wenn ein konkreter Bedarf besteht.
              Initiativbewerbungen sind willkommen.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Aktuelle Stellen
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.9rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Aktuell ist keine konkrete Stelle ausgeschrieben.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-navy-600">
                Wenn Ihr Profil zu Clean24 passt, können Sie sich trotzdem
                melden. Wir prüfen Bewerbungen im Zusammenhang mit dem aktuellen
                operativen Bedarf.
              </p>
              <div className="mt-10">
                <Button href={mailtoApply} variant="primary" size="lg">
                  Initiativbewerbung senden
                </Button>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden bg-navy-100 sm:min-h-[560px]">
              <Image
                src="/media/clean24/generated/jobs-hero-clean24.png"
                alt="Clean24 Arbeitsumgebung für Bewerbungen und mögliche Einsätze."
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Einsatzbereiche
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-tight">
                Wo Mitarbeit möglich sein kann.
              </h2>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {roleAreas.map((role) => (
                <section key={role.title} className="grid gap-3 py-7 sm:grid-cols-[0.8fr_1.2fr]">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {role.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-7 text-navy-200 sm:text-lg sm:leading-8">
                    {role.text}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[76rem]">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Partnerbetrieb
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.7rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Zusammenarbeit ist nicht dasselbe wie Anstellung.
              </h2>
            </div>
            <div className="max-w-3xl text-xl leading-8 text-navy-600">
              <p>
                Partnerbetriebe oder Subunternehmen werden separat geprüft. Eine
                solche Zusammenarbeit ist kein Mitarbeitendenverhältnis und
                hängt vom konkreten Bedarf ab.
              </p>
              <Link
                href={mailtoApply}
                className="mt-8 inline-flex text-sm font-semibold text-navy-950 underline underline-offset-8 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                Zusammenarbeit anfragen
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
            Initiativbewerbung senden.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-600">
            Senden Sie uns kurz, wer Sie sind, welche Erfahrung Sie mitbringen
            und in welchem Bereich Sie arbeiten möchten.
          </p>
          <div className="mt-9">
            <Button href={mailtoApply} variant="primary" size="lg">
              Jetzt bewerben
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
