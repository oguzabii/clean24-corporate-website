import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { footerNav } from "@/data/navigation";

/** Small footer link groups placed in the compact fourth column. */
const compactGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Verwaltungen",
    links: [
      { label: "Verwaltungen & Liegenschaften", href: "/verwaltungen" },
      { label: "Anfrage für Verwaltungen", href: cta.verwaltungen.href },
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
    ],
  },
];

const mobileFooterGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Leistungen",
    links: [{ label: "Alle Leistungen", href: "/leistungen" }],
  },
  {
    title: "Branchen",
    links: [{ label: "Alle Branchen", href: "/branchen" }],
  },
  {
    title: "Clean24",
    links: [
      { label: "Unternehmen", href: "/unternehmen" },
      { label: "Arbeiten bei Clean24", href: "/arbeiten-bei-clean24" },
      { label: "Jobs", href: "/jobs" },
      { label: "Qualität", href: "/qualitaet" },
      { label: "Innovation", href: "/innovation" },
      { label: "Nachhaltigkeit", href: "/nachhaltigkeit" },
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
];

/** Rich Swiss facility-company footer. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="py-[4.5rem] sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.35fr] lg:gap-20">
          <div className="space-y-5">
            <Logo tone="light" className="h-11" />
            <p className="max-w-sm text-base leading-7 text-navy-300">
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

          <div className="hidden gap-10 sm:grid-cols-2 lg:grid lg:grid-cols-4">
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
        </div>

        <div className="mt-12 border-y border-white/10 lg:hidden">
          {mobileFooterGroups.map((group) => (
            <details key={group.title} className="group border-b border-white/10 last:border-b-0">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold uppercase tracking-wider text-white marker:content-none">
                {group.title}
                <svg
                  viewBox="0 0 12 12"
                  className="h-3.5 w-3.5 text-navy-400 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M2.5 4.5 6 8l3.5-3.5" />
                </svg>
              </summary>
              <ul className="pb-4">
                {group.links.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </details>
          ))}
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

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p>
            © {year} {contact.company}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 lg:hidden">
            <Link
              href="/impressum"
              className="transition-colors hover:text-teal-300"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="transition-colors hover:text-teal-300"
            >
              Datenschutz
            </Link>
          </div>
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
