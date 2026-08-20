import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FounderCard } from "@/components/ui/FounderCard";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { competences } from "@/data/competences";
import { qualityPromise } from "@/data/quality";
import { founders } from "@/data/founders";
import { verwaltungenLeistungen } from "@/data/verwaltungen";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

const featuredServices = services.slice(0, 7);
const serviceRemainder = Math.max(0, services.length - featuredServices.length);

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[720px] overflow-hidden bg-navy-950 sm:min-h-[820px]">
        <SectionReveal
          as="div"
          trigger="mount"
          y={0}
          scale={1.025}
          duration={1}
          className="absolute inset-0"
        >
          <Image
            src="/media/clean24/hero-facility-cleaning.jpg"
            alt="Reinigungsprofi reinigt am Abend die Glasfront einer modernen Bürolobby."
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-center"
          />
        </SectionReveal>
        <div
          className="absolute inset-0 bg-navy-950/72 sm:bg-gradient-to-r sm:from-navy-950/94 sm:via-navy-950/76 sm:to-navy-950/22"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent"
          aria-hidden
        />

        <Container className="relative flex min-h-[720px] items-end pb-20 pt-28 sm:min-h-[820px] sm:pb-32 lg:pb-36">
          <StaggerContainer
            trigger="mount"
            stagger={0.1}
            delayChildren={0.1}
            className="max-w-3xl"
          >
            <StaggerItem>
              <Eyebrow dark>
                <span className="sm:hidden">Reinigungsservices</span>
                <span className="hidden sm:inline">
                  Schweizer Reinigungs- & Facility-Services
                </span>
              </Eyebrow>
            </StaggerItem>
            <StaggerItem className="mt-7">
              <h1 className="text-[clamp(2.85rem,12vw,5.2rem)] font-semibold leading-[0.96] tracking-tight text-white lg:text-[6.6rem]">
                <span className="block sm:inline">Sauberkeit</span>
                <span className="hidden sm:inline"> mit</span>
                <span className="block sm:hidden">mit System.</span>
                <span className="hidden sm:block">System.</span>
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-7">
              <p className="max-w-2xl text-xl leading-8 text-navy-100 sm:text-2xl sm:leading-9">
                Professionelle Reinigung für Unternehmen, Verwaltungen und
                private Kunden in Zürich und Umgebung.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={cta.primary.href} variant="accent" size="lg">
                  {cta.primary.label}
                </Button>
                <Button href="#leistungen" variant="outlineLight" size="lg">
                  Leistungen ansehen
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <Section tone="white" className="py-12 sm:py-16">
        <StaggerContainer
          stagger={0.06}
          amount={0.35}
          className="grid gap-5 border-y border-navy-100 py-7 sm:grid-cols-3 lg:grid-cols-5"
        >
          {[
            "Klare Offerten",
            "Feste Ansprechpartner",
            "Strukturierte Planung",
            "Dokumentierte Abläufe",
            "Persönliche Betreuung",
          ].map((point) => (
            <StaggerItem key={point} className="text-sm font-medium text-navy-800">
              {point}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section id="kompetenzen" tone="white" className="pt-10">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <SectionReveal>
            <SectionHeader
              eyebrow="Kompetenz"
              title="Vier Bereiche. Ein sauberer Ablauf."
              lead="Clean24 bündelt Reinigung und Facility Services so, dass jedes Objekt mit der richtigen Struktur betreut wird."
            />
          </SectionReveal>

          <StaggerContainer
            stagger={0.08}
            amount={0.2}
            className="divide-y divide-navy-100 border-y border-navy-100"
          >
            {competences.map((area, index) => (
              <StaggerItem key={area.slug}>
                <Link
                  href={area.href}
                  className="group grid gap-6 py-7 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
                >
                  <span className="text-sm font-semibold tabular-nums text-teal-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-2xl font-semibold tracking-tight text-navy-900">
                      {area.name}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-7 text-navy-600">
                      {area.description}
                    </span>
                  </span>
                  <ArrowIcon className="hidden text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-500 sm:block" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      <Section id="leistungen" tone="mist">
        <SectionReveal>
          <SectionHeader
            eyebrow="Leistungen"
            title="Reinigung, passend zum Objekt."
            lead="Nicht jede Leistung braucht dieselbe Bühne. Wichtig ist der passende Ablauf: klar erfasst, sauber geplant, zuverlässig ausgeführt."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-navy-950">
            <Image
              src="/media/clean24/office-cleaning.jpg"
              alt="Professionelle Reinigung in einem modernen Büro."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/82 via-navy-950/20 to-transparent" />
            <div className="absolute bottom-0 max-w-xl p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
                Unterhalt, Spezialreinigung, Objektpflege
              </p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Für Räume, die täglich funktionieren müssen.
              </h3>
            </div>
          </div>

          <StaggerContainer
            stagger={0.04}
            amount={0.2}
            className="divide-y divide-navy-200/70 border-y border-navy-200/70"
          >
            {featuredServices.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href="/kontakt"
                  className="group flex gap-6 py-5 transition-colors hover:text-teal-700"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-400" />
                  <span>
                    <span className="block text-lg font-semibold tracking-tight text-navy-900">
                      {service.name}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-navy-600">
                      {service.description}
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
            {serviceRemainder > 0 ? (
              <StaggerItem className="py-5 text-sm font-medium text-navy-500">
                + {serviceRemainder} weitere Leistungen je nach Objekt und
                Bedarf.
              </StaggerItem>
            ) : null}
          </StaggerContainer>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href={cta.primary.href} size="lg">
            Passende Leistung anfragen
          </Button>
          <Link
            href="/kontakt"
            className="text-sm font-medium text-navy-700 underline-offset-4 hover:text-teal-700 hover:underline"
          >
            Beratung und Rückfrage
          </Link>
        </div>
      </Section>

      <Section id="branchen" tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionReveal>
            <SectionHeader
              eyebrow="Branchen"
              title="Jedes Umfeld hat seinen eigenen Rhythmus."
              lead="Clean24 richtet Zeiten, Hygieneanforderungen und Kommunikation am jeweiligen Objekt aus."
            />
          </SectionReveal>

          <StaggerContainer
            stagger={0.05}
            amount={0.15}
            className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
          >
            {industries.map((industry) => (
              <StaggerItem key={industry.slug} className="border-t border-navy-100 pt-5">
                <h3 className="text-xl font-semibold tracking-tight text-navy-900">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-navy-600">
                  {industry.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      <Section id="verwaltungen" tone="navyDeep" className="overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <SectionReveal>
            <Eyebrow dark>Für Immobilienverwaltungen</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Ein Reinigungspartner, der Liegenschaften strukturiert betreut.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-200">
              Von Treppenhäusern bis Tiefgaragen: Clean24 entlastet
              Verwaltungen mit festen Ansprechpartnern, klarer Planung und
              nachvollziehbaren Einsätzen.
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {verwaltungenLeistungen.slice(0, 8).map((item) => (
                <li key={item} className="flex gap-3 text-sm font-medium text-navy-100">
                  <CheckIcon className="mt-0.5 shrink-0 text-teal-300" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={cta.verwaltungen.href} variant="accent" size="lg">
                {cta.verwaltungen.label}
              </Button>
            </div>
          </SectionReveal>

          <SectionReveal x={24} y={0} className="relative min-h-[440px] overflow-hidden rounded-xl lg:min-h-[620px]">
            <Image
              src="/media/clean24/property-building.jpg"
              alt="Moderne Schweizer Wohnliegenschaft in der Abenddämmerung mit beleuchtetem Eingang."
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
          </SectionReveal>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
          <SectionReveal className="relative min-h-[420px] overflow-hidden rounded-xl">
            <Image
              src="/media/clean24/glass-cleaning.jpg"
              alt="Sorgfältige Glasreinigung mit klarem Blick auf die Fläche."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </SectionReveal>
          <SectionReveal>
            <SectionHeader
              eyebrow="Qualität"
              title="Qualität mit System."
              lead="Gute Reinigung ist planbar. Sie entsteht durch klare Zuständigkeiten, wiederholbare Abläufe und offene Rückmeldung."
            />
            <div className="mt-10 space-y-7">
              {qualityPromise.slice(0, 3).map((block) => (
                <div key={block.title} className="border-t border-navy-100 pt-5">
                  <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-navy-600">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <SectionReveal>
            <SectionHeader
              eyebrow="Unternehmen"
              title="Zwei Brüder. Ein gemeinsamer Anspruch."
              lead="Oğuzhan und Yavuz Memis haben Clean24 2022 aufgebaut. Persönlich, erreichbar und mit Verantwortung für saubere Abläufe."
            />
            <div className="mt-8">
              <Button href="/unternehmen" variant="outline" size="lg">
                Unternehmen kennenlernen
              </Button>
            </div>
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {founders.map((founder) => (
              <FounderCard key={founder.slug} founder={founder} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="navyDeep" className="text-center">
        <SectionReveal className="mx-auto max-w-3xl">
          <Eyebrow dark className="justify-center">
            Kontakt
          </Eyebrow>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Bereit für eine Reinigungslösung, die zuverlässig funktioniert?
          </h2>
          <p className="mt-6 text-lg leading-8 text-navy-200">
            Fordern Sie eine unverbindliche Offerte an. Wir klären den Bedarf
            und melden uns mit einem transparenten nächsten Schritt.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={cta.primary.href} variant="accent" size="lg">
              {cta.primary.label}
            </Button>
            <Button href={contact.phoneHref} variant="outlineLight" size="lg">
              <PhoneIcon />
              {cta.call.label}
            </Button>
          </div>
        </SectionReveal>
      </Section>
    </>
  );
}

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
      className={`flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-teal-300" : "text-teal-600"
      } ${className}`}
    >
      <span
        className={`h-px w-8 ${dark ? "bg-teal-300/60" : "bg-teal-500/60"}`}
        aria-hidden
      />
      <span className="min-w-0 break-words">{children}</span>
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
    <div className="max-w-3xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 max-w-2xl text-lg leading-8 ${
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
