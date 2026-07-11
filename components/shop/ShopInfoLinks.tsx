import Link from "next/link";
import { shopConfig } from "@/data/shop-config";
import { cn } from "@/lib/cn";

/**
 * Compact pill-link row to the shop information pages
 * (Versand & Zahlung, Retoure & Rückgabe, Shop FAQ) from shopConfig.
 * Server-component friendly. `exclude` hides the current page's link.
 */
export function ShopInfoLinks({
  exclude,
  className,
}: {
  exclude?: string;
  className?: string;
}) {
  const links = shopConfig.shopInfoLinks.filter((l) => l.href !== exclude);
  if (links.length === 0) return null;

  return (
    <nav
      aria-label="Shop-Informationen"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-teal-300 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
