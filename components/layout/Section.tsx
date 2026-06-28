import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionTone = "white" | "mist" | "navy";

const tones: Record<SectionTone, string> = {
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  navy: "bg-navy-900 text-white",
};

/**
 * Vertical-rhythm section wrapper. Provides consistent spacing and a tone,
 * and wraps content in a Container by default (`bare` opts out for custom
 * full-bleed layouts).
 */
export function Section({
  children,
  id,
  tone = "white",
  bare = false,
  className,
  containerClassName,
}: {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  bare?: boolean;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24", tones[tone], className)}
    >
      {bare ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}
