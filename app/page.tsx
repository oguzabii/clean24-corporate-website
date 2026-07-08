import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { competences } from "@/data/competences";
import { qualityPromise } from "@/data/quality";
import { processSteps } from "@/data/process";
import { trustPoints } from "@/data/trust";
import { verwaltungenLeistungen } from "@/data/verwaltungen";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { AmbientGlow } from "@/components/motion/AmbientGlow";

export default function Home() {
  return (
    <>
      {/* 1 — Hero: full-bleed evening facility scene, serious operational feel. */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <SectionReveal
          as="div"
          trigger="mount"
          y={0}
          scale={1.06}
          duration={1.2}
          className="absolute inset-0"
        >
          <Image
            src="/media/clean24/hero-facility-cleaning.jpg"
            alt="Reinigungsprofi reinigt am Abend die Glasfront einer modernen Bürolobby."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </SectionReveal>
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/40"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/80 to-transparent"
          aria-hidden
        />

        <Container className="relative py-24 sm:py-32 lg:py-40">
          <StaggerContainer
            trigger="mount"
            stagger={0.12}
            delayChildren={0.15}
            className="max-w-2xl"
          >
            <StaggerItem>
              <Eyebrow dark>Schweizer Reinigungs- & Facility-Services</Eyebrow>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Sauberkeit mit System.
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                Professionelle Reinigung. Klare Abläufe. Verlässliche
                Ergebnisse.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-5">
              <p className="max-w-xl text-base leading-7 text-navy-200 sm:text-lg sm:leading-8">
                Clean24 betreut Unternehmen, Verwaltungen und private Kunden in
                Zürich und Umgebung — vom regelmässigen Unterhalt bis zur
                Spezialreinigung.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={cta.primary.href} variant="accent" size="lg">
                  {cta.primary.label}
                </Button>
                <Button
                  href={cta.services.href}
                  variant="outlineLight"
                  size="lg"
                >
                  {cta.services.label}
                </Button>
                <a
                  href={cta.call.href}
                  className="inline-flex h-14 items-center justify-center gap-2 px-4 text-base font-medium text-white transition-colors hover:text-teal-300"
                >
                  <PhoneIcon />
                  {cta.call.label}
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* Trust strip */}
      <div className="border-b border-navy-100 bg-white">
        <Container>
          <StaggerContainer
            stagger={0.07}
            amount={0.4}
            className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:py-7"
          >
            {trustPoints.map((point) => (
              <StaggerItem
                key={point}
                y={10}
                className="flex items-center gap-2.5 text-sm font-medium text-navy-800"
              >
                <CheckIcon className="shrink-0 text-teal-500" />
                {point}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </div>

      {/* 2 — Kompetenzbereiche */}
      <Section id="kompetenzen" tone="white">
        <SectionReveal>
          <SectionHeader
            eyebrow="Kompetenzbereiche"
            title="Vier Bereiche. Ein Anspruch."
            lead="Clean24 bündelt Reinigungs- und Facility-Leistungen in klaren Kompetenzbereichen — vom regelmässigen Unterhalt bis zur Betreuung ganzer Liegenschaften."
          />
        </SectionReveal>

        <StaggerContainer
          stagger={0.1}
          amount={0.15}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {competences.map((area, index) => (
            <StaggerItem
              as="article"
              key={area.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-navy-950/5"
                  aria-hidden
                />
                <span className="absolute left-6 top-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="absolute bottom-5 left-6 right-6 text-2xl font-semibold tracking-tight text-white">
                  {area.name}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="flex-1 text-[0.95rem] leading-7 text-navy-600">
                  {area.description}
                </p>
                <Link
                  href={area.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors group-hover:text-teal-600"
                >
                  Bereich entdecken
                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 3 — Leistungen */}
      <Section id="leistungen" tone="mist">
        <SectionReveal>
          <SectionHeader
            eyebrow="Leistungen"
            title="Reinigung für jeden Objekttyp"
            lead="Zwölf Leistungen, ein System: Jede Reinigung wird strukturiert geplant, fachgerecht ausgeführt und verlässlich kontrolliert."
          />
        </SectionReveal>

        <StaggerContainer
          stagger={0.05}
          amount={0.1}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <StaggerItem
              key={service.slug}
              className="group rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-navy-900">
                  {service.name}
                </h3>
                <ArrowIcon className="mt-1 shrink-0 text-navy-200 transition-colors group-hover:text-teal-500" />
              </div>
              <p className="mt-2 text-sm leading-6 text-navy-600">
                {service.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href={cta.primary.href} size="lg">
            Passende Leistung anfragen
          </Button>
          <p className="text-sm text-navy-500">
            Unsicher, welche Leistung passt? Wir beraten Sie unverbindlich.
          </p>
        </div>
      </Section>

      {/* 4 — Branchen: editorial index list, institutional weight. */}
      <Section id="branchen" tone="white">
        <SectionReveal>
          <SectionHeader
            eyebrow="Branchen"
            title="Spezialisiert auf Ihren Bereich"
            lead="Jedes Objekt stellt eigene Anforderungen an Hygiene, Zeiten und Abläufe. Clean24 richtet Einsatzplanung und Ausführung konsequent nach Ihrem Betrieb."
          />
        </SectionReveal>

        <StaggerContainer stagger={0.06} amount={0.1} className="mt-14 border-t border-navy-100">
          {industries.map((industry, index) => (
            <StaggerItem key={industry.slug} x={-18} y={0}>
              <Link
                href="/kontakt"
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-navy-100 px-2 py-6 transition-colors hover:bg-mist sm:grid-cols-[4rem_16rem_1fr_auto] sm:gap-6 sm:py-7"
              >
                <span className="text-sm font-semibold tabular-nums text-teal-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold tracking-tight text-navy-900 sm:text-xl">
                  {industry.name}
                </span>
                <span className="hidden text-[0.95rem] text-navy-600 sm:block">
                  {industry.description}
                </span>
                <ArrowIcon className="shrink-0 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-500" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 5 — Qualitätsversprechen */}
      <Section tone="navyDeep">
        <SectionReveal>
          <SectionHeader
            dark
            eyebrow="Qualitätsversprechen"
            title="Worauf Sie sich verlassen können"
            lead="Keine Versprechen auf Papier, sondern Abläufe, die im Alltag funktionieren — bei jedem Einsatz, in jedem Objekt."
          />
        </SectionReveal>

        <StaggerContainer
          stagger={0.09}
          amount={0.15}
          className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {qualityPromise.map((block) => (
            <StaggerItem key={block.title} className="border-t border-white/15 pt-6">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal-400/40 text-teal-300"
                  aria-hidden
                >
                  <CheckIcon />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {block.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-navy-200">
                {block.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 6 — Verwaltungen highlight: the commercial B2B offer. */}
      <Section id="verwaltungen" tone="mist">
        <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <SectionReveal x={-24} y={0} className="p-8 sm:p-12 lg:p-14">
              <Eyebrow>Für Immobilienverwaltungen</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-navy-900 sm:text-4xl">
                Reinigungspartner für Immobilienverwaltungen und
                Liegenschaften.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-navy-600">
                Von der wiederkehrenden Objektpflege bis zur Wohnungsabgabe:
                Clean24 entlastet Verwaltungen mit festen Ansprechpartnern,
                planbaren Einsätzen und sauber koordinierten Abläufen — über
                das ganze Portfolio.
              </p>

              <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {verwaltungenLeistungen.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-navy-800"
                  >
                    <CheckIcon className="shrink-0 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={cta.verwaltungen.href} size="lg">
                  {cta.verwaltungen.label}
                </Button>
                <a
                  href={contact.phoneHref}
                  className="inline-flex h-14 items-center gap-2 px-4 text-base font-medium text-navy-800 transition-colors hover:text-teal-600"
                >
                  <PhoneIcon />
                  {contact.phone}
                </a>
              </div>
            </SectionReveal>

            <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full">
              <SectionReveal x={28} y={0} duration={0.8} className="absolute inset-0">
                <Image
                  src="/media/clean24/property-building.jpg"
                  alt="Moderne Schweizer Wohnliegenschaft in der Abenddämmerung mit beleuchtetem Eingang."
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </SectionReveal>
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-navy-950/10"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 7 — Ablauf */}
      <Section id="ablauf" tone="white">
        <SectionReveal>
          <SectionHeader
            eyebrow="Ablauf"
            title="In sechs Schritten zur zuverlässigen Reinigung"
            lead="Klar strukturiert von der ersten Anfrage bis zur Qualitätskontrolle — ohne Umwege und ohne Überraschungen."
          />
        </SectionReveal>

        <StaggerContainer
          as="ol"
          stagger={0.08}
          amount={0.15}
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {processSteps.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="border-t border-navy-100 pt-6"
            >
              <span className="text-sm font-semibold tabular-nums text-teal-600">
                Schritt {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-7 text-navy-600">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 8 — Final CTA */}
      <Section tone="navyDeep" className="relative overflow-hidden">
        <AmbientGlow className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
        <SectionReveal className="relative mx-auto max-w-3xl text-center">
          <Eyebrow dark className="justify-center">
            Kontakt
          </Eyebrow>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Bereit für eine Reinigungslösung, die zuverlässig funktioniert?
          </h2>
          <p className="mt-6 text-lg leading-8 text-navy-200">
            Fordern Sie eine unverbindliche Offerte an — wir melden uns
            zeitnah, klären den Bedarf und unterbreiten Ihnen ein
            transparentes Angebot.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={cta.primary.href} variant="accent" size="lg">
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="outlineLight" size="lg">
              {cta.secondary.label}
            </Button>
            <Button href={contact.phoneHref} variant="outlineLight" size="lg">
              <PhoneIcon />
              {cta.call.label}
            </Button>
          </div>
          <p className="mt-12 text-sm leading-7 text-navy-300">
            {contact.company} · {contact.street}, {contact.zip} {contact.city}
            <br />
            <a
              href={contact.phoneHref}
              className="font-medium text-navy-100 transition-colors hover:text-teal-300"
            >
              {contact.phone}
            </a>
            {" · "}
            <a
              href={contact.emailHref}
              className="font-medium text-navy-100 transition-colors hover:text-teal-300"
            >
              {contact.email}
            </a>
          </p>
        </SectionReveal>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------- */

function Eyebrow({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-teal-300" : "text-teal-600"
      } ${className}`}
    >
      <span
        className={`h-px w-8 ${dark ? "bg-teal-300/60" : "bg-teal-500/60"}`}
        aria-hidden
      />
      {children}
    </p>
  );
}

function SectionHeader({
  eyebrow,
  title,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-lg leading-8 ${
          dark ? "text-navy-200" : "text-navy-600"
        }`}
      >
        {lead}
      </p>
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
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
      <path d="M2.5 8.5 6 12l7.5-8" />
    </svg>
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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3.2 1.8h2.6l1.2 3-1.6 1.2a9.5 9.5 0 0 0 4.6 4.6l1.2-1.6 3 1.2v2.6a1.2 1.2 0 0 1-1.3 1.2A12.5 12.5 0 0 1 2 3.1a1.2 1.2 0 0 1 1.2-1.3Z" />
    </svg>
  );
}
