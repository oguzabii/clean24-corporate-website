import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "light" | "dark";

const tones: Record<BadgeTone, string> = {
  light: "border-navy-100 bg-white/70 text-navy-700",
  dark: "border-white/15 bg-white/10 text-white/90",
};

/** Small pill label with a teal accent dot — used for eyebrows / brand tags. */
export function BrandBadge({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur",
        tones[tone],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />
      {children}
    </span>
  );
}
