import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { founders } from "@/data/founders";

const description =
  "Kontaktieren Sie Clean24 Memis GmbH in Dietikon. Offerten über das Formular, Verwaltungsanfragen per E-Mail sowie Telefon und allgemeine Fragen.";

export const metadata: Metadata = {
  title: "Kontakt",
  description,
  alternates: { canonical: "/kontakt" },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Clean24",
    url: "/kontakt",
    title: "Kontakt | Clean24",
    description,
  },
};

const contactPaths = [
  {
    title: "Ich brauche eine Offerte",
    text: "Für konkrete Reinigungsanfragen, Objektangaben und verbindliche Offerten.",
    href: cta.primary.href,
    action: "Offerte anfordern",
    primary: true,
  },
  {
    title: "Ich vertrete eine Verwaltung",
    text: "Für Liegenschaften, Treppenhäuser, Parkhäuser und wiederkehrende Objektpflege.",
    href: cta.verwaltungen.href,
    action: "Verwaltungsanfrage senden",
    primary: false,
  },
  {
    title: "Ich habe eine allgemeine Frage",
    text: "Für Rückfragen zu Clean24, unseren Leistungen, Erreichbarkeit oder Zusammenarbeit.",
    href: contact.emailHref,
    action: "E-Mail schreiben",
    primary: false,
  },
];

export default function KontaktPage() {
  return (
    <>
      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[90rem]">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Kontakt
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3rem,10vw,6.6rem)] font-semibold leading-[0.92] tracking-tight">
                Der richtige Weg zu Clean24.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
              Offerte, Verwaltung oder allgemeine Frage: Wählen Sie den
              passenden Kontaktweg. So erreicht Ihr Anliegen direkt die
              richtige Ansprechperson.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-24 lg:py-32">
        <Container className="max-w-[84rem]">
          <div className="divide-y divide-navy-200 border-y border-navy-200">
            {contactPaths.map((path) => (
              <a
                key={path.title}
                href={path.href}
                className="group grid gap-5 py-7 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10"
              >
                <span>
                  <span className="block text-3xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-4xl">
                    {path.title}
                  </span>
                  <span className="mt-3 block max-w-2xl text-base leading-7 text-navy-600 sm:text-lg sm:leading-8">
                    {path.text}
                  </span>
                </span>
                <span
                  className={
                    path.primary
                      ? "inline-flex h-12 items-center justify-center rounded-md bg-navy-800 px-5 text-sm font-medium text-white transition-colors group-hover:bg-navy-700"
                      : "inline-flex text-sm font-semibold text-navy-700 underline underline-offset-8 transition-colors group-hover:text-teal-700"
                  }
                >
                  {path.action}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Persönlich
              </p>
              <h2 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.96] tracking-tight">
                Zwei Gründer.
                <span className="block text-navy-400">Direkte Wege.</span>
              </h2>
              <p className="mt-6 max-w-xl text-xl leading-8 text-navy-200">
                Clean24 wird von Oguzhan und Yavuz Memis geführt. Anfragen
                werden persönlich geprüft und direkt koordiniert.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {founders.map((founder) => (
                <figure key={founder.slug}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
                    <Image
                      src={founder.image}
                      alt={founder.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="pt-5">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-teal-300">
                      {founder.role}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-navy-200">
                      {founder.focus}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[76rem]">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Direkter Kontakt
              </p>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-tight text-navy-950 [text-wrap:balance]">
                So erreichen Sie Clean24.
              </h2>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              <ContactRow label="Telefon">
                <a
                  href={contact.phoneHref}
                  className="font-semibold text-navy-950 transition-colors hover:text-teal-700"
                >
                  {contact.phone}
                </a>
              </ContactRow>
              <ContactRow label="E-Mail">
                <a
                  href={contact.emailHref}
                  className="font-semibold text-navy-950 transition-colors hover:text-teal-700"
                >
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow label="Adresse">
                <address className="not-italic">
                  <span className="block font-semibold text-navy-950">
                    {contact.company}
                  </span>
                  <span className="block">{contact.street}</span>
                  <span className="block">
                    {contact.zip} {contact.city}
                  </span>
                </address>
              </ContactRow>
            </div>
          </div>
          <div className="mt-14">
            <Button href={cta.primary.href} variant="primary" size="lg">
              Offerte anfordern
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr] sm:items-start">
      <div className="text-sm font-semibold text-navy-500">{label}</div>
      <div className="text-lg leading-8 text-navy-700">{children}</div>
    </div>
  );
}
