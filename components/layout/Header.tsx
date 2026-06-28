import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { cta } from "@/data/cta";

/**
 * Site header foundation: sticky, translucent, with a wordmark, desktop
 * navigation and a primary CTA. The mobile navigation menu is intentionally
 * deferred to a later phase — the mobile sticky CTA covers conversion.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/70 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Clean24 Startseite">
          <Logo tone="dark" />
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
  );
}
