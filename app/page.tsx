import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassCard } from "@/components/ui/GlassCard";
import { BrandBadge } from "@/components/ui/BrandBadge";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { featuredServices } from "@/data/services";
import { industries } from "@/data/industries";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section
        bare
        tone="navy"
        className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950"
      >
        {/* Subtle premium glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl"
          aria-hidden
        />

        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <BrandBadge tone="dark">{site.badge}</BrandBadge>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              {site.slogan}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-navy-200">
              {site.secondary} Clean24 betreut Unternehmen, Verwaltungen und
              Institutionen mit zuverlässiger Gebäude- und Facility-Reinigung in
              der ganzen Region.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={cta.primary.href} variant="accent" size="lg">
                {cta.primary.label}
              </Button>
              <Button href={cta.services.href} variant="outlineLight" size="lg">
                {cta.services.label}
              </Button>
            </div>
          </div>

          {/* Brand pillars in a glass surface */}
          <GlassCard className="space-y-5">
            {site.pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-4">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-400"
                  aria-hidden
                />
                <div>
                  <h2 className="font-semibold text-white">{pillar.title}</h2>
                  <p className="text-sm leading-6 text-navy-200">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </GlassCard>
        </Container>
      </Section>

      {/* Services preview */}
      <Section id="leistungen" tone="white">
        <div className="max-w-2xl">
          <BrandBadge>Leistungen</BrandBadge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            Reinigung für jeden Objekttyp
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            Vom regelmässigen Unterhalt bis zur Spezialreinigung — strukturiert
            geplant und verlässlich umgesetzt.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <Card key={service.slug}>
              <h3 className="text-lg font-semibold text-navy-900">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-navy-600">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button href={cta.services.href} variant="outline" size="md">
            Alle Leistungen ansehen
          </Button>
        </div>
      </Section>

      {/* Industries */}
      <Section id="branchen" tone="mist">
        <div className="max-w-2xl">
          <BrandBadge>Branchen</BrandBadge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            Partner für anspruchsvolle Objekte
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            Clean24 versteht die Anforderungen unterschiedlicher Branchen und
            passt Abläufe entsprechend an.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Card key={industry.slug} className="bg-white/70">
              <h3 className="font-semibold text-navy-900">{industry.name}</h3>
              <p className="mt-1 text-sm leading-6 text-navy-600">
                {industry.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section id="kontakt" tone="navy">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <BrandBadge tone="dark">Kontakt</BrandBadge>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Bereit für Sauberkeit mit System?
            </h2>
            <p className="max-w-lg text-lg leading-8 text-navy-200">
              Fordern Sie eine unverbindliche Offerte an oder kontaktieren Sie
              uns direkt — wir beraten Sie gerne.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={cta.primary.href} variant="accent" size="lg">
                {cta.primary.label}
              </Button>
              <Button href={contact.phoneHref} variant="outlineLight" size="lg">
                {contact.phone}
              </Button>
            </div>
          </div>

          <GlassCard className="space-y-3 text-navy-100">
            <div className="text-lg font-semibold text-white">
              {contact.company}
            </div>
            <div className="text-sm leading-6">
              {contact.street}
              <br />
              {contact.zip} {contact.city}
            </div>
            <div className="pt-2 text-sm">
              <a
                href={contact.phoneHref}
                className="transition-colors hover:text-teal-300"
              >
                {contact.phone}
              </a>
              <br />
              <a
                href={contact.emailHref}
                className="transition-colors hover:text-teal-300"
              >
                {contact.email}
              </a>
            </div>
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
