import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Clean24 logo (transparent PNG). Two brand variants keep the mark
 * readable on any surface without a white plate:
 *  - `tone="dark"`  → full-colour wordmark for light backgrounds (header)
 *  - `tone="light"` → light wordmark with preserved leaf/drop accents for
 *                     dark backgrounds (footer), derived from the colour logo
 */
export function Logo({
  tone = "dark",
  className,
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const src =
    tone === "light"
      ? "/brand/clean24-logo-footer.png"
      : "/brand/clean24-logo.png";

  return (
    <Image
      src={src}
      alt="Clean24 — Ihr Reinigungsprofi"
      width={1380}
      height={671}
      priority={priority}
      className={cn("h-10 w-auto", className)}
    />
  );
}
