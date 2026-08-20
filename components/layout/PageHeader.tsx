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
      <Container className="py-20 sm:py-24 lg:py-32">
        <p className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
          <span className="h-px w-8 bg-teal-300/60" aria-hidden />
          {eyebrow}
        </p>
          <h1 className="mt-6 max-w-4xl break-words text-[clamp(2.9rem,8vw,5.8rem)] font-semibold leading-[0.98] tracking-tight text-white">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-200 sm:text-xl sm:leading-9">
            {lead}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
