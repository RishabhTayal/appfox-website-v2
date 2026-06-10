import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { competitors } from "@/data/competitors";

/**
 * Bump when marketing content meaningfully changes. A perpetually-fresh
 * build-time date would teach crawlers to ignore lastModified entirely.
 */
const CONTENT_UPDATED = new Date("2026-06-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/features`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/vs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const comparisonRoutes: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${site.url}/vs/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...comparisonRoutes];
}
