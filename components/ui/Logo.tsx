import { cn } from "@/lib/cn";

/**
 * Clean24 wordmark with a minimal mark.
 * `tone` switches the wordmark color for light vs. dark backgrounds.
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const wordmark = tone === "light" ? "text-white" : "text-navy-900";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-700 to-navy-900 ring-1 ring-inset ring-white/10"
        aria-hidden
      >
        <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
      </span>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          wordmark,
        )}
      >
        Clean<span className="text-teal-500">24</span>
      </span>
    </span>
  );
}
