import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Clean24 Memis GmbH in Dietikon. Offerten über das Online-Formular, Anfragen für Verwaltungen per E-Mail oder telefonische Rückfrage.",
};

const contactRoutes = [
  {
    title: "Offerte anfordern",
    text: "Für Reinigungsanfragen, Wohnungsabgaben und konkrete Offerten.",
    buttonLabel: "Zum Online-Formular",
    href: cta.primary.href,
    variant: "primary" as const,
    highlight: true,
  },
  {
    title: "Verwaltungen & Objektbetreuung",
    text: "Für Liegenschaften, Treppenhäuser, Allgemeinflächen, Tiefgaragen und regelmässige Objektpflege.",
    buttonLabel: "Anfrage per E-Mail senden",
    href: cta.verwaltungen.href,
    variant: "outline" as const,
    highlight: false,
  },
  {
    title: "Telefonische Rückfrage",
    text: "Für schnelle Abklärungen oder dringende Fragen.",
    buttonLabel: "Jetzt anrufen",
    href: contact.phoneHref,
    variant: "outline" as const,
    highlight: false,
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Kontakt aufnehmen."
        lead="Für Offerten nutzen Sie bitte unser Online-Formular. Für allgemeine Fragen erreichen Sie Clean24 direkt per Telefon oder E-Mail."
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

      {/* Contact routing cards */}
      <Section tone="white">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            So erreichen Sie uns
          </h2>
          <p className="mt-3 text-[0.95rem] leading-7 text-navy-600">
            Wählen Sie den passenden Weg für Ihr Anliegen. Offerten werden über
            unser Online-Formular erfasst, damit wir Ihre Anfrage strukturiert
            bearbeiten können.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {contactRoutes.map((route) => (
            <div
              key={route.title}
              className={`flex flex-col rounded-2xl border bg-white p-7 shadow-sm ${
                route.highlight
                  ? "border-teal-300 ring-1 ring-teal-200"
                  : "border-navy-100"
              }`}
            >
              <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                {route.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-navy-600">
                {route.text}
              </p>
              <div className="mt-6">
                <Button
                  href={route.href}
                  variant={route.variant}
                  size="md"
                  className="w-full"
                >
                  {route.buttonLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Direct contact + service overview */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Direct contact card */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900">
              Direkter Kontakt
            </h2>
            <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
              <div className="text-base font-semibold text-navy-900">
                {contact.company}
              </div>
              <address className="mt-2 space-y-1 text-sm not-italic leading-6 text-navy-600">
                <div>{contact.street}</div>
                <div>
                  {contact.zip} {contact.city}
                </div>
                <div>{contact.country}</div>
              </address>
              <dl className="mt-5 space-y-4 border-t border-navy-100 pt-5 text-sm">
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
              </dl>
            </div>
          </div>

          {/* Service overview — supports discovery */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900">
              Unsere Leistungen im Überblick
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-navy-600">
              Nennen Sie uns bei Ihrer Anfrage die gewünschte Leistung – so
              können wir Ihr Anliegen gezielt bearbeiten.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <li
                  key={service.slug}
                  className="rounded-xl border border-navy-100 bg-white px-4 py-3"
                >
                  <span className="text-sm font-semibold text-navy-900">
                    {service.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-navy-500">
                    {service.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
