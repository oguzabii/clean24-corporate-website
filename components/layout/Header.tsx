import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { cta } from "@/data/cta";
import { contact } from "@/data/contact";
import { site } from "@/data/site";

/**
 * Site header: slim dark contact bar (desktop) above a sticky, translucent
 * main bar with the wordmark, navigation and primary CTA. The mobile
 * navigation menu is intentionally deferred — the mobile sticky CTA covers
 * conversion.
 */
export function Header() {
  return (
    <>
      {/* Top contact bar — quiet, factual, very Swiss. */}
      <div className="hidden bg-navy-950 text-navy-200 sm:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <span className="font-medium tracking-wide">{site.slogan}</span>
          <div className="flex items-center gap-6">
            <a
              href={contact.phoneHref}
              className="font-medium transition-colors hover:text-teal-300"
            >
              {contact.phone}
            </a>
            <a
              href={contact.emailHref}
              className="font-medium transition-colors hover:text-teal-300"
            >
              {contact.email}
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-navy-100/70 bg-white/85 backdrop-blur-md">
        <Container className="flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label="Clean24 Startseite">
            <Logo tone="dark" priority />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Hauptnavigation"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-navy-700 transition-colors hover:text-teal-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            href={cta.primary.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {cta.primary.label}
          </Button>
        </Container>
      </header>
    </>
  );
}
