import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Basic premium surface card on light backgrounds.
 * Soft border, subtle shadow that lifts on hover.
 */
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
