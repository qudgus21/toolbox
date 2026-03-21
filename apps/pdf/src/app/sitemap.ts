import type { MetadataRoute } from "next";
import { locales } from "@toolbox/i18n";
import { tools } from "@/lib/tools";

const BASE_URL = "https://toolpop.org/pdf";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date("2026-03-22"),
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
        lastModified: new Date("2026-03-22"),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Legal pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "yearly",
      priority: 0.3,
    });
    entries.push({
      url: `${BASE_URL}/${locale}/terms`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
