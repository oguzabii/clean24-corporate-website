import type { MetadataRoute } from "next";
import { products } from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

const siteUrl = "https://clean-24.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/unternehmen", changeFrequency: "monthly", priority: 0.7 },
    { path: "/kontakt", changeFrequency: "yearly", priority: 0.7 },
    { path: "/shop", changeFrequency: "monthly", priority: 0.6 },
    { path: "/qualitaet", changeFrequency: "yearly", priority: 0.5 },
    { path: "/innovation", changeFrequency: "yearly", priority: 0.5 },
    { path: "/nachhaltigkeit", changeFrequency: "yearly", priority: 0.5 },
    { path: "/arbeiten-bei-clean24", changeFrequency: "yearly", priority: 0.4 },
    { path: "/jobs", changeFrequency: "monthly", priority: 0.4 },
    { path: "/aktuelles-angebote", changeFrequency: "monthly", priority: 0.4 },
    { path: "/impressum", changeFrequency: "yearly", priority: 0.3 },
    { path: "/datenschutz", changeFrequency: "yearly", priority: 0.3 },
    { path: "/agb", changeFrequency: "yearly", priority: 0.3 },
  ];

  // Product detail pages, generated from the catalog (data/shop.ts).
  for (const product of products) {
    entries.push({
      path: `/shop/${product.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Shop info pages + checkout scaffold, from shopConfig (single source).
  // Deliberately NOT listed: /checkout/success and /checkout/cancel
  // (transaction-state pages, noindex) and all /api/* routes.
  for (const link of shopConfig.shopInfoLinks) {
    entries.push({ path: link.href, changeFrequency: "monthly", priority: 0.4 });
  }
  entries.push({
    path: shopConfig.checkoutPath,
    changeFrequency: "monthly",
    priority: 0.3,
  });

  return entries.map((entry) => ({
    url: `${siteUrl}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
