import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Jobs bei Clean24: Initiativbewerbungen sind jederzeit willkommen – für Reinigungskraft, Teamleitung, Objektbetreuung oder als Partnerbetrieb.",
};

const mailtoApply = `${contact.emailHref}?subject=Bewerbung%20Clean24`;

const roles = [
  {
    title: "Reinigungskraft",
    text: "Sorgfältige Ausführung von Unterhalts-, Büro- und Objektreinigungen nach klaren Einsatzplänen.",
  },
  {
    title: "Teamleitung",
    text: "Koordination von Einsätzen, Ansprechperson vor Ort und Sicherstellung der vereinbarten Qualität.",
  },
  {
    title: "Objektbetreuung",
    text: "Betreuung von Liegenschaften und Verwaltungen – von der Planung bis zur Kontrolle.",
  },
  {
    title: "Partnerbetrieb",
    text: "Zusammenarbeit als Subunternehmen oder Partner für zusätzliche Kapazitäten und Regionen.",
  },
];

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Jobs"
        title="Jobs bei Clean24."
        lead="Clean24 wächst Schritt für Schritt. Initiativbewerbungen sind jederzeit willkommen – wir melden uns, sobald ein passender Einsatz möglich ist."
      />

      <Section tone="white">
        <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Aktueller Stand
          </p>
          <p className="mt-2 text-lg font-medium leading-8 text-navy-900">
            Initiativbewerbung willkommen.
          </p>
          <p className="mt-2 max-w-2xl text-[0.95rem] leading-7 text-navy-600">
            Wir schreiben Stellen situativ aus. Wenn Sie zuverlässig arbeiten und
            sorgfältig mit Objekten umgehen, freuen wir uns über Ihre Bewerbung –
            auch ohne konkretes Inserat.
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading
            eyebrow="Mögliche Rollen"
            title="Wo Sie bei Clean24 mitarbeiten können."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-navy-600">
                  {role.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href={mailtoApply} variant="primary" size="lg">
            Jetzt bewerben
          </Button>
          <p className="text-sm text-navy-500">
            Senden Sie uns Ihre Unterlagen an {contact.email}.
          </p>
        </div>
      </Section>
    </>
  );
}
