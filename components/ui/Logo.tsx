import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The real Clean24 logo (public/brand/clean24-logo.png, 900×428).
 * The asset has a solid white background, so on dark surfaces (`tone="light"`)
 * it is presented on a small white plate to keep the mark clean and premium.
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
  return (
    <span
      className={cn(
        "inline-flex items-center",
        tone === "light" && "rounded-lg bg-white px-3 py-2",
        className,
      )}
    >
      <Image
        src="/brand/clean24-logo.png"
        alt="Clean24 — Ihr Reinigungsprofi"
        width={900}
        height={428}
        priority={priority}
        className="h-10 w-auto"
      />
    </span>
  );
}
