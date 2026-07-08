import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { cta } from "@/data/cta";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

/** Site footer foundation: brand, contact details, services and industries. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-200">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="space-y-4">
            {/* Full-colour logo on an elegant floating card so the brand
                colours read on the dark footer — a soft, lifted surface, not
                a flat pasted plate. */}
            <span className="inline-flex rounded-2xl bg-gradient-to-br from-white to-navy-50 px-5 py-3.5 shadow-lg shadow-navy-950/60 ring-1 ring-white/10">
              <Logo tone="dark" />
            </span>
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
          </div>

          {/* Services */}
          <FooterColumn title="Leistungen">
            {services.slice(0, 8).map((service) => (
              <FooterLink key={service.slug} href="/#leistungen">
                {service.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Industries */}
          <FooterColumn title="Branchen">
            {industries.map((industry) => (
              <FooterLink key={industry.slug} href="/#branchen">
                {industry.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Kontakt">
            <FooterLink href="/kontakt">Kontakt</FooterLink>
            <FooterLink href={cta.primary.href}>Offerte anfordern</FooterLink>
            <FooterLink href={contact.phoneHref}>Jetzt anrufen</FooterLink>
            <FooterLink href={contact.emailHref}>E-Mail schreiben</FooterLink>
          </FooterColumn>

          {/* Legal — pages follow in a later phase. */}
          <FooterColumn title="Rechtliches">
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
            <FooterLink href="/agb">AGB</FooterLink>
          </FooterColumn>
        </div>

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
