import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Vertical container for a stack of legal sections. */
export function LegalDocument({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-12">{children}</div>;
}

/** A titled legal section with body text. Optionally numbered (AGB). */
export function LegalSection({
  title,
  index,
  children,
}: {
  title: string;
  index?: number;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-28">
      <h2 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
        {index ? (
          <span className="mr-2 tabular-nums text-teal-600">{index}.</span>
        ) : null}
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.95rem] leading-7 text-navy-600">
        {children}
      </div>
    </section>
  );
}

/** Bulleted list for legal content. */
export function LegalList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={cn("list-disc space-y-2 pl-5 marker:text-teal-500", className)}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Definition-style key/value rows (e.g. Impressum identification block). */
export function LegalFacts({
  rows,
}: {
  rows: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-mist/60">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4"
        >
          <dt className="text-sm font-medium text-navy-500">{row.label}</dt>
          <dd className="text-sm font-medium text-navy-900">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Neutral callout for review notes ("Entwurf — vor Veröffentlichung prüfen").
 * Kept in-palette (mist + navy) — informative, not alarming.
 */
export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-navy-100 bg-mist px-5 py-4 text-sm leading-6 text-navy-600">
      <span className="font-semibold text-navy-800">Hinweis: </span>
      {children}
    </div>
  );
}
