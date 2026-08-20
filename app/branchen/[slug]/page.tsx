import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { getIndustryBySlug, industries } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";
import { getDetailTitleClassName, isLongSingleWordTitle } from "@/lib/detail-hero";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Branche nicht gefunden" };
  return {
    title: industry.name,
    description: `${industry.name}: ${industry.lead}`,
    alternates: { canonical: `/branchen/${industry.slug}` },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedServices = industry.serviceSlugs
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service) => service !== undefined);
  const titleClassName = getDetailTitleClassName(industry.name);
  const longTitleHero = isLongSingleWordTitle(industry.name);

  return (
    <>
      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div
            className={
              longTitleHero
                ? "grid gap-10 lg:gap-12"
                : "grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20"
            }
          >
            <div className="min-w-0 max-w-full">
              <Link
                href="/branchen"
                className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 underline-offset-8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                Branchen
              </Link>
              <h1 className={titleClassName}>
                {industry.name}
              </h1>
            </div>
            <p
              className={
                longTitleHero
                  ? "min-w-0 max-w-2xl text-xl leading-8 text-navy-600 sm:ml-auto sm:text-2xl sm:leading-9 lg:mr-[8%]"
                  : "min-w-0 max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9"
              }
            >
              {industry.lead}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-24 lg:py-32">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className="relative min-h-[420px] overflow-hidden bg-navy-100 sm:min-h-[640px]">
              <Image
                src={industry.image}
                alt={industry.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
              />
            </div>
            <div className="space-y-12">
              <DetailList title="Was in dieser Umgebung zählt" items={industry.matters} />
              <DetailList title="Planung & Kommunikation" items={industry.planning} />
              <section className="border-t border-navy-200 pt-7">
                <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
                  Relevante Leistungen
                </h2>
                <div className="mt-5 divide-y divide-navy-100 border-y border-navy-100">
                  {relatedServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/leistungen/${service.slug}`}
                      className="group grid min-h-16 gap-2 py-4 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <span>
                        <span className="block text-xl font-semibold tracking-tight text-navy-950">
                          {service.name}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-navy-600">
                          {service.description}
                        </span>
                      </span>
                      <span
                        className="text-sm font-semibold text-navy-500 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="hyphens-auto break-words text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.98] tracking-tight [text-wrap:balance]">
            Reinigung für {industry.name} anfragen.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-200">
            Wir klären die Umgebung, den gewünschten Umfang und den passenden
            Ablauf direkt.
          </p>
          <div className="mt-9">
            <Button href={cta.primary.href} variant="accent" size="lg">
              Offerte anfordern
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-navy-200 pt-7">
      <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
        {title}
      </h2>
      <ul className="mt-5 space-y-3 text-base leading-7 text-navy-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-px w-6 shrink-0 bg-teal-500" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
