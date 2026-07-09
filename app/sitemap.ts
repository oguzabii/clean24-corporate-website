import type { MetadataRoute } from "next";

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

  return entries.map((entry) => ({
    url: `${siteUrl}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
