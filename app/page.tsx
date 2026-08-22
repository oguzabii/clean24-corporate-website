import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { founders } from "@/data/founders";
import { industries } from "@/data/industries";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

const serviceStories = [
  {
    title: "Unternehmen & Büros",
    text: "Arbeitsräume, Empfangsbereiche und Geschäftsumgebungen, die täglich repräsentativ funktionieren müssen.",
    image: "/media/clean24/generated/home-story-office-cleaning.png",
    alt: "Clean24 Unterhaltsreinigung in einer modernen Arbeitsumgebung.",
    href: "/leistungen/bueroreinigung",
  },
  {
    title: "Immobilien & Verwaltungen",
    text: "Treppenhäuser, Eingänge, Nebenräume und Liegenschaften mit klarer Planung und festen Ansprechpartnern.",
    image: "/media/clean24/generated/home-story-stairwell-care.png",
    alt: "Sorgfältige Treppenhauspflege in einer gepflegten Liegenschaft.",
    href: "/verwaltungen",
    imageClassName: "object-[center_42%]",
  },
  {
    title: "Spezial- & Objektpflege",
    text: "Glas, Garagen, Bau- und Sonderreinigungen, abgestimmt auf Objekt, Timing und Anspruch.",
    image: "/media/clean24/generated/home-story-glass-cleaning.png",
    alt: "Präzise Glasreinigung als Teil professioneller Objektpflege.",
    href: "/leistungen/spezialreinigung",
  },
];

const administrationProof = [
  "Fester Ansprechpartner",
  "Dokumentierte Einsätze",
  "Klare Planung",
];

const qualitySteps = ["Planen.", "Ausführen.", "Kontrollieren."];

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[86vh] overflow-hidden bg-navy-950 text-white">
        <Image
          src="/media/clean24/generated/home-hero-clean24.png"
          alt="Professionelle Clean24 Reinigung in einer modernen Arbeitsumgebung."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[61%_center] md:object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,23,37,0.38)_0%,rgba(6,23,37,0.22)_34%,rgba(6,23,37,0.86)_100%)] md:bg-[linear-gradient(90deg,rgba(6,23,37,0.94)_0%,rgba(6,23,37,0.72)_42%,rgba(6,23,37,0.16)_100%)]"
          aria-hidden
        />

        <Container className="relative flex min-h-[86vh] items-end pb-16 pt-32 sm:pb-20 lg:pb-24">
          <StaggerContainer
            trigger="mount"
            stagger={0.1}
            delayChildren={0.08}
            className="max-w-[58rem]"
          >
            <StaggerItem>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200">
                Reinigung & Facility Services
              </p>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <h1 className="text-[clamp(4rem,18vw,7.6rem)] font-semibold leading-[0.86] tracking-tight">
                Sauberkeit
                <span className="block">mit System.</span>
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-7">
              <p className="max-w-2xl text-xl leading-8 text-navy-100 sm:text-2xl sm:leading-9">
                Professionelle Reinigung für Unternehmen, Verwaltungen und
                private Kunden in Zürich und Umgebung.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.primary.href} variant="accent" size="lg">
                Offerte anfordern
              </Button>
              <Link
                href="#leistungen"
                className="inline-flex min-h-12 items-center text-sm font-semibold text-white underline-offset-8 transition-colors hover:text-teal-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              >
                Leistungen ansehen
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-44">
        <Container className="max-w-6xl">
          <SectionReveal>
            <p className="max-w-5xl text-[clamp(2.4rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-tight">
              Professionelle Reinigung beginnt nicht beim Putzen.
              <span className="block text-navy-400">
                Sondern bei Planung, Verantwortung und klaren Abläufen.
              </span>
            </p>
          </SectionReveal>
        </Container>
      </section>

      <section id="leistungen" className="bg-mist py-24 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Leistungen
              </p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.9rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight text-navy-950">
                Drei Aufgaben. Ein sauberer Ablauf.
              </h2>
            </SectionReveal>
            <SectionReveal y={18}>
              <p className="max-w-xl text-xl leading-8 text-navy-600">
                Die Startseite zeigt nicht jedes Detail. Sie zeigt, wie Clean24
                Arbeit denkt: nach Objekt, Rhythmus und Verantwortung.
              </p>
            </SectionReveal>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {serviceStories.map((story, index) => (
              <SectionReveal
                key={story.title}
                delay={index * 0.06}
                className={index === 1 ? "lg:mt-24" : index === 2 ? "lg:mt-10" : ""}
              >
                <Link
                  href={story.href}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy-900 sm:aspect-[16/11] lg:aspect-[4/5]">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-[1.035] ${story.imageClassName ?? "object-center"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/78 via-navy-950/12 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-md text-base leading-7 text-navy-600">
                    {story.text}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-navy-950 transition-colors group-hover:text-teal-700">
                    Mehr erfahren
                    <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="branchen" className="bg-white py-24 sm:py-32 lg:py-40">
        <Container className="max-w-[76rem]">
          <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Branchen
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-tight text-navy-950">
                Andere Orte. Andere Regeln.
              </h2>
            </SectionReveal>
            <StaggerContainer
              stagger={0.04}
              amount={0.18}
              className="border-y border-navy-200"
            >
              {industries.map((industry) => (
                <StaggerItem key={industry.slug}>
                  <Link
                    href={`/branchen/${industry.slug}`}
                    className="group grid min-h-20 gap-3 border-b border-navy-100 py-6 transition-colors last:border-b-0 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[1fr_1.05fr_auto] sm:items-center sm:gap-10"
                  >
                    <h3 className="text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
                      {industry.name}
                    </h3>
                    <p className="text-base leading-7 text-navy-600">
                      {industry.description}
                    </p>
                    <span
                      className="text-sm font-semibold text-navy-400 transition-transform group-hover:translate-x-1 group-hover:text-teal-700"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      <section
        id="verwaltungen"
        className="overflow-hidden bg-navy-950 py-24 text-white sm:py-32 lg:py-40"
      >
        <Container className="max-w-[90rem]">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200">
                Für Immobilienverwaltungen
              </p>
              <h2 className="mt-5 max-w-3xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.92] tracking-tight">
                Ein Partner.
                <span className="block">Klare Abläufe.</span>
                <span className="block text-navy-400">Weniger Aufwand.</span>
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-8 text-navy-200">
                Clean24 betreut Liegenschaften mit direkter Kommunikation,
                planbaren Einsätzen und nachvollziehbarer Ausführung.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {administrationProof.map((item) => (
                  <div key={item} className="border-t border-white/15 pt-4">
                    <p className="text-sm font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button href="/verwaltungen" variant="accent" size="lg">
                  Mehr für Verwaltungen
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal x={28} y={0}>
              <div className="relative min-h-[520px] overflow-hidden bg-navy-900 sm:min-h-[650px] lg:min-h-[740px]">
                <Image
                  src="/media/clean24/property-building.jpg"
                  alt="Moderne Schweizer Wohnliegenschaft in der Abenddämmerung mit beleuchtetem Eingang."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32 lg:py-44">
        <Container className="max-w-[86rem]">
          <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-20">
            <SectionReveal>
              <div className="relative aspect-[5/4] overflow-hidden bg-navy-100 lg:aspect-[4/5]">
                <Image
                  src="/media/clean24/garage-cleaning.jpg"
                  alt="Maschinelle Reinigung einer Tiefgarage."
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center"
                />
              </div>
            </SectionReveal>
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Qualität
              </p>
              <h2 className="mt-5 max-w-2xl text-[clamp(3rem,7vw,5.8rem)] font-semibold leading-[0.92] tracking-tight text-navy-950">
                Qualität ist kein Versprechen.
                <span className="block text-navy-400">Sie ist ein Ablauf.</span>
              </h2>
              <div className="mt-10 space-y-3">
                {qualitySteps.map((step) => (
                  <p
                    key={step}
                    className="border-t border-navy-200 pt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-tight text-navy-950"
                  >
                    {step}
                  </p>
                ))}
              </div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-24 sm:py-32 lg:py-40">
        <Container className="max-w-[84rem]">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Unternehmen
              </p>
              <h2 className="mt-5 max-w-3xl text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-[0.92] tracking-tight text-navy-950">
                Zwei Brüder.
                <span className="block">Ein gemeinsamer Anspruch.</span>
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-8 text-navy-600">
                Im Jahr 2022 gründeten die Brüder Oguzhan und Yavuz Memis Clean24.
                Persönlich, erreichbar und mit Verantwortung für saubere Abläufe.
              </p>
              <div className="mt-9">
                <Link
                  href="/unternehmen"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-navy-950 underline-offset-8 transition-colors hover:text-teal-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  Unsere Geschichte
                  <span className="ml-2" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </SectionReveal>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
              {founders.map((founder, index) => (
                <SectionReveal
                  key={founder.slug}
                  delay={index * 0.08}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy-200">
                    <Image
                      src={founder.image}
                      alt={founder.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 28vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-navy-950">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-navy-500">
                    {founder.role}
                  </p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-44">
        <Container className="max-w-5xl text-center">
          <SectionReveal>
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.94] tracking-tight">
              Was dürfen wir für Sie sauber halten?
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-xl leading-8 text-navy-200">
              Erzählen Sie uns kurz vom Objekt. Wir melden uns mit dem passenden
              nächsten Schritt.
            </p>
            <div className="mt-10">
              <Button href={cta.primary.href} variant="accent" size="lg">
                Offerte anfordern
              </Button>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </>
  );
}
