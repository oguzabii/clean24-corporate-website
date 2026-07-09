import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { FounderCard } from "@/components/ui/FounderCard";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { founders } from "@/data/founders";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Clean24 Memis GmbH in Dietikon. Offerten über das Online-Formular, Verwaltungen und Objektbetreuung per E-Mail oder telefonische Rückfrage – persönlich betreut von den Gründern.",
};

const mailtoGeneral = contact.emailHref;
const mailtoJobs = `${contact.emailHref}?subject=Jobs%20/%20Zusammenarbeit`;

/** Vertical inquiry rows (left column). */
const inquiryRows = [
  {
    title: "Offerte anfordern",
    text: "Für konkrete Reinigungsanfragen und verbindliche Offerten.",
    href: cta.primary.href,
  },
  {
    title: "Verwaltungen & Liegenschaften",
    text: "Für Treppenhäuser, Allgemeinflächen, Tiefgaragen und regelmässige Objektpflege.",
    href: cta.verwaltungen.href,
  },
  {
    title: "Unterhaltsreinigung",
    text: "Für regelmässige Reinigung von Büros, Praxen und Objekten.",
    href: cta.primary.href,
  },
  {
    title: "Umzugsreinigung",
    text: "Für Wohnungsabgaben und Reinigung mit Abgabegarantie.",
    href: cta.primary.href,
  },
  {
    title: "Allgemeine Anfrage",
    text: "Für Fragen zu Clean24, Verfügbarkeit oder Abläufen.",
    href: mailtoGeneral,
  },
  {
    title: "Jobs / Zusammenarbeit",
    text: "Für Bewerbungen, Partner und Zusammenarbeit.",
    href: mailtoJobs,
  },
];

/** 4 premium routing cards ("Worum geht es bei Ihrer Anfrage?"). */
const routingCards = [
  {
    title: "Online-Offerte",
    text: "Für konkrete Reinigungsanfragen, Wohnungsabgaben und verbindliche Offerten.",
    action: "Zum Online-Formular",
    href: cta.primary.href,
    highlight: true,
  },
  {
    title: "Verwaltungen & Objektbetreuung",
    text: "Für Liegenschaften, Treppenhäuser, Allgemeinflächen, Tiefgaragen und regelmässige Objektpflege.",
    action: "Anfrage per E-Mail",
    href: cta.verwaltungen.href,
    highlight: false,
  },
  {
    title: "Allgemeine Fragen",
    text: "Für direkte Fragen zu Clean24, Leistungen oder Verfügbarkeit.",
    action: "E-Mail schreiben",
    href: mailtoGeneral,
    highlight: false,
  },
  {
    title: "Direkt anrufen",
    text: "Für schnelle Rückfragen oder dringende Abklärungen.",
    action: contact.phone,
    href: contact.phoneHref,
    highlight: false,
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Kontakt aufnehmen."
        lead="Für Offerten nutzen Sie bitte unser Online-Formular. Für Verwaltungen, Objektbetreuung und allgemeine Fragen erreichen Sie Clean24 direkt per Telefon oder E-Mail."
      >
        <div className="mt-8 flex flex-col gap-3 text-sm text-navy-200 sm:flex-row sm:gap-8">
          <a
            href={contact.phoneHref}
            className="font-medium text-white transition-colors hover:text-teal-300"
          >
            {contact.phone}
          </a>
          <a
            href={contact.emailHref}
            className="font-medium text-white transition-colors hover:text-teal-300"
          >
            {contact.email}
          </a>
          <span className="text-navy-300">
            {contact.street}, {contact.zip} {contact.city}
          </span>
        </div>
      </PageHeader>

      {/* Main premium contact section: inquiry rows + founder panel */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: direct contact routing */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
              Ihr direkter Kontakt
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-navy-600">
              Wählen Sie den passenden Weg – wir leiten Ihre Anfrage direkt in
              den richtigen Ablauf.
            </p>

            <div className="mt-8 divide-y divide-navy-100 border-y border-navy-100">
              {inquiryRows.map((row) => (
                <a
                  key={row.title}
                  href={row.href}
                  className="group flex items-center gap-4 py-5 transition-colors hover:bg-mist/60"
                >
                  <span className="flex-1">
                    <span className="block text-base font-semibold text-navy-900 transition-colors group-hover:text-teal-600">
                      {row.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-navy-600">
                      {row.text}
                    </span>
                  </span>
                  <ArrowIcon className="shrink-0 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: founder panel */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {founders.map((founder) => (
                <FounderCard key={founder.slug} founder={founder} />
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-navy-100 bg-mist/60 p-6 text-sm leading-7 text-navy-600">
              Clean24 wird von den Brüdern Oğuzhan und Yavuz Memis geführt. Ihre
              Anfrage wird persönlich geprüft und in den passenden Ablauf
              geleitet – ob Online-Offerte, Verwaltung, Objektbetreuung oder
              direkte Rückfrage.
            </p>
          </div>
        </div>
      </Section>

      {/* Routing cards */}
      <Section tone="mist">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Worum geht es bei Ihrer Anfrage?
          </h2>
          <p className="mt-3 text-[0.95rem] leading-7 text-navy-600">
            Vier Wege, ein Ziel: Ihre Anfrage landet direkt dort, wo sie am
            schnellsten bearbeitet werden kann.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {routingCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className={`group flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                card.highlight
                  ? "border-teal-300 ring-1 ring-teal-200"
                  : "border-navy-100 hover:border-teal-300"
              }`}
            >
              <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-navy-600">
                {card.text}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors group-hover:text-teal-600">
                {card.action}
                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        {/* Direct contact data */}
        <div className="mt-12 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-sm font-medium text-navy-500">Adresse</div>
              <div className="mt-1 text-sm not-italic text-navy-900">
                <div className="font-semibold">{contact.company}</div>
                <div>{contact.street}</div>
                <div>
                  {contact.zip} {contact.city}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-navy-500">E-Mail</div>
              <a
                href={contact.emailHref}
                className="mt-1 block text-sm font-semibold text-navy-900 transition-colors hover:text-teal-600"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <div className="text-sm font-medium text-navy-500">Telefon</div>
              <a
                href={contact.phoneHref}
                className="mt-1 block text-sm font-semibold text-navy-900 transition-colors hover:text-teal-600"
              >
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
