import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import {
  getRelatedServices,
  getServiceBySlug,
  getServiceGroup,
  services,
} from "@/data/services";
import { getDetailTitleClassName, isLongSingleWordTitle } from "@/lib/detail-hero";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Leistung nicht gefunden" };

  const description = `${service.name} von Clean24: ${service.description}`;
  const url = `/leistungen/${service.slug}`;

  return {
    title: service.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "de_CH",
      siteName: "Clean24",
      url,
      title: `${service.name} | Clean24`,
      description,
      images: [
        {
          url: service.image,
          alt: service.imageAlt,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const group = getServiceGroup(service.group);
  const related = getRelatedServices(service.slug);
  const titleClassName = getDetailTitleClassName(service.name);
  const longTitleHero = isLongSingleWordTitle(service.name);

  return (
    <>
      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div
            className={
              longTitleHero
                ? "grid gap-10 lg:gap-12"
                : "grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-20"
            }
          >
            <div className="min-w-0 max-w-full">
              <Link
                href="/leistungen"
                className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300 underline-offset-8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              >
                Leistungen
              </Link>
              <h1 className={titleClassName}>
                {service.name}
              </h1>
            </div>
            <p
              className={
                longTitleHero
                  ? "min-w-0 max-w-2xl text-xl leading-8 text-navy-200 sm:ml-auto sm:text-2xl sm:leading-9 lg:mr-[8%]"
                  : "min-w-0 max-w-2xl text-xl leading-8 text-navy-200 sm:text-2xl sm:leading-9"
              }
            >
              {service.lead}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-20">
            <div className="relative min-h-[420px] overflow-hidden bg-navy-100 sm:min-h-[620px]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="space-y-12">
              <DetailBlock title="Was dazugehört" items={service.covered} />
              <DetailBlock
                title="Geeignet für"
                items={service.suitableFor}
              />
              <DetailBlock
                title="Wie Clean24 arbeitet"
                items={service.approach}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-32">
        <Container className="max-w-[78rem]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Einordnung
              </p>
              <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                {group?.title ?? "Passender Ablauf"}
              </h2>
              {group ? (
                <p className="mt-5 text-base leading-7 text-navy-600">
                  {group.description}
                </p>
              ) : null}
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/leistungen/${item.slug}`}
                  className="group grid min-h-20 gap-2 py-5 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span>
                    <span className="block text-2xl font-semibold tracking-tight text-navy-950">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-navy-600">
                      {item.description}
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
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="hyphens-auto break-words text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.98] tracking-tight [text-wrap:balance]">
            {service.name} anfragen.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-200">
            Clean24 klärt Objekt, Umfang und Timing direkt mit Ihnen.
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

function DetailBlock({ title, items }: { title: string; items: string[] }) {
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
