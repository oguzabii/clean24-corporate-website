import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { cta } from "@/data/cta";
import { contact } from "@/data/contact";
import { site } from "@/data/site";

/**
 * Site header: slim dark contact bar (desktop) above a sticky, translucent
 * main bar with the wordmark, mega navigation and primary CTA. The desktop
 * mega menu is pure-CSS (hover + keyboard focus); the mobile drawer is a
 * small client component.
 */
export function Header() {
  return (
    <>
      {/* Top contact bar — quiet, factual, very Swiss. */}
      <div className="hidden bg-navy-950 text-navy-300 sm:block">
        <Container className="flex h-8 items-center justify-between text-xs">
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

      <header className="sticky top-0 z-50 border-b border-navy-100/60 bg-white/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Link href="/" aria-label="Clean24 Startseite" className="shrink-0">
            <Logo tone="dark" priority />
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href={cta.primary.href} size="sm">
                {cta.primary.label}
              </Button>
            </div>
            <MobileMenu />
          </div>
        </Container>
      </header>
    </>
  );
}
