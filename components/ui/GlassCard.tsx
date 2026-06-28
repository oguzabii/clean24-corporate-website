import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Premium glass surface — translucent with a backdrop blur.
 * Designed to sit on the deep-navy / dark sections for a subtle
 * glassmorphism effect.
 */
export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg ring-1 ring-white/5 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
