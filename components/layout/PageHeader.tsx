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
    <section className="bg-navy-950 text-white">
      <Container className="py-24 sm:py-32 lg:py-40">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">
          {eyebrow}
        </p>
        <h1 className="mt-7 max-w-5xl break-words text-[clamp(3.4rem,9vw,6.8rem)] font-semibold leading-[0.9] tracking-tight">
          {title}
        </h1>
        {lead ? (
          <p className="mt-8 max-w-2xl text-xl leading-8 text-navy-200 sm:text-2xl sm:leading-9">
            {lead}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
