import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Consistent premium page header band for interior pages (Kontakt, legal).
 * Deep-navy background with a teal eyebrow, large title and optional lead —
 * aligned with the homepage's dark section style.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Optional slot below the lead (e.g. contact quick facts). */
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy-950">
      <Container className="py-16 sm:py-20 lg:py-24">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
          <span className="h-px w-8 bg-teal-300/60" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-navy-200">
            {lead}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
