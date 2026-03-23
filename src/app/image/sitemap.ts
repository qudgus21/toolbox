import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { tools } from "@/lib/image/tools";

const BASE_URL = "https://toolpop.org/image";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Tool pages for each locale x tool combination
  const toolSlugs = tools.map((t) => t.slug);
  for (const locale of locales) {
    for (const slug of toolSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: new Date("2026-03-23"),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
