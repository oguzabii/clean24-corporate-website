import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import {
  aktuellesItems,
  angeboteItems,
  getPublishedItems,
  wissenItems,
} from "@/data/aktuelles";
import { cta } from "@/data/cta";

export const metadata: Metadata = {
  title: "Aktuelles & Angebote",
  description:
    "Aktuelles von Clean24: Hinweise, saisonale Themen, praktische Informationen rund um Reinigung und Objektpflege sowie bestätigte Angebote.",
};

const publishedNews = getPublishedItems(aktuellesItems);
const publishedKnowledge = getPublishedItems(wissenItems);
const publishedOffers = getPublishedItems(angeboteItems);

export default function AktuellesAngebotePage() {
  return (
    <>
      <section className="bg-white py-24 text-navy-950 sm:py-32 lg:py-40">
        <Container className="max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Aktuelles
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.1rem,10vw,6.8rem)] font-semibold leading-[0.92] tracking-tight">
                Aktuelles von Clean24.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-600 sm:text-2xl sm:leading-9">
              News, Hinweise, saisonale Themen und praktische Informationen rund
              um Reinigung und Objektpflege.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Aktuell
              </p>
              <h2 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Mitteilungen, wenn es wirklich etwas zu sagen gibt.
              </h2>
            </div>
            {publishedNews.length > 0 ? (
              <div className="divide-y divide-navy-200 border-y border-navy-200">
                {publishedNews.map((item) => (
                  <EditorialRow key={item.slug} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Zurzeit gibt es keine aktuellen Mitteilungen."
                text="Clean24 veröffentlicht hier nur bestätigte Neuigkeiten und relevante Hinweise."
              />
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[90rem]">
          <div className="mb-12 max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Wissen & Hinweise
            </p>
            <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight text-navy-950">
              Praktische Themen, die bei Reinigung und Objektpflege helfen.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {publishedKnowledge.map((item) => (
              <Link
                key={item.slug}
                href={item.href ?? "/aktuelles-angebote"}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {item.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : null}
                <div className="pt-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                    Hinweis
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-navy-600">
                    {item.excerpt}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-navy-600 underline underline-offset-8 transition-colors group-hover:text-teal-700">
                    Mehr erfahren
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Angebote
              </p>
              <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight">
                Aktionen nur, wenn sie bestätigt sind.
              </h2>
            </div>
            {publishedOffers.length > 0 ? (
              <div className="divide-y divide-white/15 border-y border-white/15">
                {publishedOffers.map((item) => (
                  <EditorialRow key={item.slug} item={item} dark />
                ))}
              </div>
            ) : (
              <EmptyState
                dark
                title="Derzeit sind keine öffentlichen Aktionen verfügbar."
                text="Offerten werden individuell nach Objekt, Umfang und gewünschtem Ablauf erstellt."
              />
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
            Reinigung geplant?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-600">
            Beschreiben Sie Objekt, Umfang und Zeitpunkt. Clean24 führt Ihre
            Anfrage in den passenden Ablauf.
          </p>
          <div className="mt-9">
            <Button href={cta.primary.href} variant="primary" size="lg">
              Offerte anfordern
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function EditorialRow({
  item,
  dark = false,
}: {
  item: (typeof aktuellesItems)[number];
  dark?: boolean;
}) {
  return (
    <article className="grid gap-4 py-7 sm:grid-cols-[0.4fr_1fr]">
      <div
        className={
          dark
            ? "text-xs font-semibold uppercase tracking-[0.18em] text-teal-300"
            : "text-xs font-semibold uppercase tracking-[0.18em] text-teal-700"
        }
      >
        {item.publishedAt ?? item.category}
      </div>
      <div>
        <h3
          className={
            dark
              ? "text-2xl font-semibold tracking-tight text-white"
              : "text-2xl font-semibold tracking-tight text-navy-950"
          }
        >
          {item.title}
        </h3>
        <p className={dark ? "mt-3 text-base leading-7 text-navy-200" : "mt-3 text-base leading-7 text-navy-600"}>
          {item.excerpt}
        </p>
      </div>
    </article>
  );
}

function EmptyState({
  title,
  text,
  dark = false,
}: {
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "border-y border-white/15 py-8"
          : "border-y border-navy-200 py-8"
      }
    >
      <h3
        className={
          dark
            ? "text-3xl font-semibold leading-tight tracking-tight text-white"
            : "text-3xl font-semibold leading-tight tracking-tight text-navy-950"
        }
      >
        {title}
      </h3>
      <p className={dark ? "mt-4 max-w-2xl text-lg leading-8 text-navy-200" : "mt-4 max-w-2xl text-lg leading-8 text-navy-600"}>
        {text}
      </p>
    </div>
  );
}
