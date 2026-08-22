"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export function HeaderLogoLink() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      aria-label="Clean24 Startseite"
      className="shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Logo tone="dark" priority />
    </Link>
  );
}
