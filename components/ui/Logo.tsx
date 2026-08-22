import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The official Clean24 logo (transparent PNG).
 * Both surface tones deliberately use the same full-colour brand asset so the
 * blue wordmark and green leaf stay consistent across header and footer.
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
  const src = "/brand/clean24-logo.png";

  return (
    <Image
      src={src}
      alt="Clean24"
      width={1380}
      height={671}
      priority={priority}
      data-tone={tone}
      className={cn("h-10 w-auto", className)}
    />
  );
}
