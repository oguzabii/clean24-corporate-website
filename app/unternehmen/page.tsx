import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { founders } from "@/data/founders";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Clean24 wurde 2022 von den Brüdern Oguzhan und Yavuz Memis gegründet. Professionelle Reinigung mit Planung, Verantwortung und direkter Kommunikation.",
};

const processPoints = [
  {
    title: "Planung",
    text: "Objekt, Umfang und Zuständigkeiten werden vor dem Einsatz geklärt.",
  },
  {
    title: "Ausführung",
    text: "Die Arbeit vor Ort folgt einem klaren Auftrag und einem passenden Ablauf.",
  },
  {
    title: "Kommunikation",
    text: "Rückfragen, Erwartungen und nächste Schritte werden direkt besprochen.",
  },
];

export default function UnternehmenPage() {
  return (
    <>
      <section className="bg-navy-950 py-24 text-white sm:py-32 lg:py-40">
        <Container className="max-w-[90rem]">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Unternehmen
              </p>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,11vw,7rem)] font-semibold leading-[0.92] tracking-tight">
                Zwei Brüder.
                <span className="block">Ein gemeinsamer</span>
                <span className="block text-navy-400">Anspruch.</span>
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-navy-200 sm:text-2xl sm:leading-9">
              Clean24 wurde 2022 von Oguzhan Memis und Yavuz Memis gegründet.
              Ihr Anspruch: professionelle Reinigung mit klarer Planung,
              Verantwortung und direkter Kommunikation.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <Container className="max-w-[88rem]">
          <div className="grid gap-6 sm:grid-cols-2">
            {founders.map((founder) => (
              <figure key={founder.slug}>
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-100 sm:aspect-[5/6]">
                  <Image
                    src={founder.image}
                    alt={founder.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="pt-6">
                  <h2 className="text-3xl font-semibold tracking-tight text-navy-950">
                    {founder.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-teal-700">
                    {founder.role}
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-navy-600">
                    {founder.bio}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28 lg:py-40">
        <Container className="max-w-[82rem]">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Geschichte
              </p>
              <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight text-navy-950">
                Aus praktischer Arbeit entstand ein System.
              </h2>
            </div>
            <div className="max-w-3xl space-y-7 text-xl leading-8 text-navy-600">
              <p>
                Clean24 begann als Reinigungsbetrieb mit direktem Bezug zur
                Arbeit vor Ort. Wohnungen, Liegenschaften, Unternehmen und
                Verwaltungen zeigten früh, dass gute Reinigung mehr braucht als
                Arbeitskraft.
              </p>
              <p>
                Sie braucht saubere Absprachen, verlässliche Planung, klare
                Zuständigkeiten und Menschen, die Verantwortung übernehmen.
                Daraus entstand der Leitgedanke von Clean24:
              </p>
              <p className="pt-2 text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[0.98] tracking-tight text-navy-950">
                Sauberkeit mit System.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-[84rem]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                Arbeitsweise
              </p>
              <h2 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
                Qualität entsteht im Ablauf.
              </h2>
            </div>
            <div className="divide-y divide-navy-200 border-y border-navy-200">
              {processPoints.map((point, index) => (
                <section
                  key={point.title}
                  className="grid gap-4 py-7 sm:grid-cols-[5rem_0.8fr_1.2fr] sm:items-start"
                >
                  <span className="text-sm font-semibold tabular-nums text-teal-700">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-navy-950">
                    {point.title}
                  </h3>
                  <p className="text-base leading-7 text-navy-600 sm:text-lg sm:leading-8">
                    {point.text}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28 lg:py-36">
        <Container className="max-w-[80rem]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
                Heute
              </p>
              <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-tight">
                Reinigung und Facility Services mit Verantwortung.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-navy-200">
                Clean24 unterstützt private Kunden, Unternehmen,
                Immobilienverwaltungen und gewerbliche Objekte in Zürich und
                Umgebung. Nicht mit lauten Versprechen, sondern mit klaren
                Abläufen und direkter Erreichbarkeit.
              </p>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {[
                { label: "Gegründet", value: "2022" },
                { label: "Gründer", value: "Oguzhan & Yavuz Memis" },
                { label: "Leitgedanke", value: "Sauberkeit mit System." },
              ].map((item) => (
                <div key={item.label} className="py-6">
                  <div className="text-sm font-semibold text-teal-300">
                    {item.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="max-w-4xl text-center">
          <h2 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.96] tracking-tight text-navy-950">
            Lernen Sie Clean24 kennen.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-navy-600">
            Ob Offerte, Verwaltung oder allgemeine Frage: Wir führen Ihre
            Anfrage in den passenden Ablauf.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={cta.primary.href} variant="primary" size="lg">
              Offerte anfordern
            </Button>
            <Button href="/kontakt" variant="outline" size="lg">
              Kontakt aufnehmen
            </Button>
          </div>
          <Link
            href="/leistungen"
            className="mt-8 inline-flex text-sm font-semibold text-navy-600 underline underline-offset-8 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Leistungen ansehen
          </Link>
        </Container>
      </section>
    </>
  );
}
