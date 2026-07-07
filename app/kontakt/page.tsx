import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { KontaktForm } from "@/components/kontakt/KontaktForm";
import { contact } from "@/data/contact";
import { resolveAnfrage } from "@/data/anfrage";

export const metadata: Metadata = {
  title: "Kontakt | Clean24",
  description:
    "Kontaktieren Sie Clean24 Memis GmbH in Dietikon — Offerte anfragen, Objektbetreuung für Verwaltungen oder allgemeine Fragen zur professionellen Reinigung in Zürich und Umgebung.",
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawAnfrage = Array.isArray(params.anfrage)
    ? params.anfrage[0]
    : params.anfrage;
  const defaultAnfrage = resolveAnfrage(rawAnfrage);

  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Kontakt aufnehmen."
        lead="Senden Sie uns Ihre Anfrage – wir klären den Bedarf, prüfen den Einsatz und melden uns mit den nächsten Schritten."
      >
        <div className="mt-8 flex flex-col gap-3 text-sm text-navy-200 sm:flex-row sm:gap-8">
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-teal-300"
          >
            {contact.phone}
          </a>
          <a
            href={contact.emailHref}
            className="inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-teal-300"
          >
            {contact.email}
          </a>
          <span className="text-navy-300">
            {contact.street}, {contact.zip} {contact.city}
          </span>
        </div>
      </PageHeader>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Form */}
          <div id="formular">
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900">
              Ihre Anfrage
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-navy-600">
              Wählen Sie Ihr Anliegen, ergänzen Sie Ihre Angaben und die
              gewünschte Leistung. Wir melden uns mit den nächsten Schritten.
            </p>
            <div className="mt-8">
              <KontaktForm defaultAnfrage={defaultAnfrage} />
            </div>
          </div>

          {/* Direct contact aside */}
          <aside className="lg:pt-1">
            <div className="rounded-2xl border border-navy-100 bg-mist/60 p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-navy-900">
                Direkter Kontakt
              </h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="font-medium text-navy-500">E-Mail</dt>
                  <dd className="mt-1">
                    <a
                      href={contact.emailHref}
                      className="font-medium text-navy-900 transition-colors hover:text-teal-600"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-navy-500">Telefon</dt>
                  <dd className="mt-1">
                    <a
                      href={contact.phoneHref}
                      className="font-medium text-navy-900 transition-colors hover:text-teal-600"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-navy-500">Adresse</dt>
                  <dd className="mt-1 not-italic text-navy-900">
                    <div className="font-medium">{contact.company}</div>
                    <div>{contact.street}</div>
                    <div>
                      {contact.zip} {contact.city}
                    </div>
                    <div>{contact.country}</div>
                  </dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-navy-100 pt-5 text-sm leading-6 text-navy-600">
                Clean24 – Sauberkeit mit System. Wir betreuen Unternehmen,
                Verwaltungen und private Kunden in Zürich und Umgebung.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
