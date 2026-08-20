import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { shopConfig } from "@/data/shop-config";

const siteUrl = "https://clean-24.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/leistungen", changeFrequency: "monthly", priority: 0.8 },
    { path: "/branchen", changeFrequency: "monthly", priority: 0.8 },
    { path: "/verwaltungen", changeFrequency: "monthly", priority: 0.8 },
    { path: "/unternehmen", changeFrequency: "monthly", priority: 0.7 },
    { path: "/kontakt", changeFrequency: "yearly", priority: 0.7 },
    { path: "/qualitaet", changeFrequency: "yearly", priority: 0.5 },
    { path: "/innovation", changeFrequency: "yearly", priority: 0.5 },
    { path: "/nachhaltigkeit", changeFrequency: "yearly", priority: 0.5 },
    { path: "/arbeiten-bei-clean24", changeFrequency: "yearly", priority: 0.4 },
    { path: "/jobs", changeFrequency: "monthly", priority: 0.4 },
    { path: "/aktuelles-angebote", changeFrequency: "monthly", priority: 0.4 },
    { path: "/impressum", changeFrequency: "yearly", priority: 0.3 },
    { path: "/datenschutz", changeFrequency: "yearly", priority: 0.3 },
  ];
  // Shop info pages + checkout scaffold, from shopConfig (single source).
  // Deliberately NOT listed: /checkout/success and /checkout/cancel
  // (transaction-state pages, noindex), /checkout (prelaunch noindex),
  // /agb (draft noindex), product detail pages (prelaunch noindex) and
  // all /api/* routes.
  if (shopConfig.shopPublicEnabled) {
    entries.push({ path: "/shop", changeFrequency: "monthly", priority: 0.6 });
    for (const link of shopConfig.shopInfoLinks) {
      entries.push({ path: link.href, changeFrequency: "monthly", priority: 0.4 });
    }
  }
  void shopConfig.checkoutPath;

  for (const service of services) {
    entries.push({
      path: `/leistungen/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const industry of industries) {
    entries.push({
      path: `/branchen/${industry.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries.map((entry) => ({
    url: `${siteUrl}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
