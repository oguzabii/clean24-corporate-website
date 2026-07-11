import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { footerNav } from "@/data/navigation";
import { shopConfig } from "@/data/shop-config";

/** Small footer link groups placed in the compact fourth column. */
const compactGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Verwaltungen",
    links: [
      { label: "Verwaltungen & Liegenschaften", href: "/#verwaltungen" },
      { label: "Anfrage für Verwaltungen", href: cta.verwaltungen.href },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Zum Shop", href: "/shop" },
      // Shop info pages come from shopConfig (single source of truth).
      ...shopConfig.shopInfoLinks,
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Offerte anfordern", href: cta.primary.href },
      { label: "Jetzt anrufen", href: contact.phoneHref },
      { label: "E-Mail schreiben", href: contact.emailHref },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
];

/** Rich Swiss facility-company footer. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-200">
      <Container className="py-16">
        {/* Brand + newsletter-style CTA block */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-4">
            <Logo tone="light" className="h-11" />
            <p className="max-w-xs text-sm leading-6 text-navy-300">
              {site.slogan} {site.secondary}
            </p>
            <address className="space-y-1 text-sm not-italic text-navy-300">
              <div className="font-medium text-white">{contact.company}</div>
              <div>{contact.street}</div>
              <div>
                {contact.zip} {contact.city}
              </div>
              <div className="pt-2">
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-teal-300"
                >
                  {contact.phone}
                </a>
              </div>
              <div>
                <a
                  href={contact.emailHref}
                  className="transition-colors hover:text-teal-300"
                >
                  {contact.email}
                </a>
              </div>
            </address>

            {/* Google Bewertung — only rendered when a real URL exists. */}
            {site.googleReviewUrl ? (
              <a
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-navy-100 transition-colors hover:text-teal-300"
              >
                {site.googleRating && site.googleReviewCount
                  ? `${site.googleRating} von 5 · ${site.googleReviewCount} Google-Bewertungen`
                  : "Auf Google bewerten"}
              </a>
            ) : null}
          </div>

          {/* Bleiben Sie informiert */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="text-lg font-semibold tracking-tight text-white">
              Bleiben Sie informiert
            </h3>
            <p className="mt-3 text-sm leading-6 text-navy-300">
              Erfahren Sie mehr über Clean24, Angebote, Checklisten und
              hilfreiche Informationen rund um Reinigung, Objektpflege und
              Wohnungsabgaben.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/aktuelles-angebote" variant="accent" size="md">
                Aktuelles & Angebote
              </Button>
              <Button href={cta.primary.href} variant="outlineLight" size="md">
                Offerte anfordern
              </Button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <FooterColumn key={group.title} title={group.title}>
              {group.links.map((link, i) => (
                <FooterLink key={`${link.label}-${i}`} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          ))}

          <div className="space-y-8">
            {compactGroups.map((group) => (
              <FooterColumn key={group.title} title={group.title}>
                {group.links.map((link, i) => (
                  <FooterLink key={`${link.label}-${i}`} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterColumn>
            ))}
          </div>
        </div>

        {/* Partner — only rendered when real partners exist (no fake logos). */}
        {site.partners.length > 0 ? (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Partner
            </h3>
            <ul className="mt-4 flex flex-wrap items-center gap-8">
              {site.partners.map((partner) => (
                <li key={partner.name} className="text-sm text-navy-300">
                  {partner.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contact.company}. Alle Rechte vorbehalten.
          </p>
          <p>{site.badge}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-navy-300 transition-colors hover:text-teal-300"
      >
        {children}
      </Link>
    </li>
  );
}
