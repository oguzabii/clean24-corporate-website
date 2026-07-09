import { cn } from "@/lib/cn";

/**
 * Consistent section heading: teal eyebrow rule, title and optional lead.
 * `dark` inverts colours for navy sections. Shared across interior pages.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
            dark ? "text-teal-300" : "text-teal-600",
          )}
        >
          <span
            className={cn("h-px w-8", dark ? "bg-teal-300/60" : "bg-teal-500/60")}
            aria-hidden
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
          eyebrow ? "mt-5" : "",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-lg leading-8",
            dark ? "text-navy-200" : "text-navy-600",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
