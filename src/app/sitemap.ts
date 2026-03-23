import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { tools as pdfTools } from "@/lib/pdf/tools";
import { tools as imageTools } from "@/lib/image/tools";
import { articles } from "@/lib/blog/articles";

const BASE_URL = "https://toolpop.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Landing pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // PDF home pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/pdf`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Image home pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/image`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // PDF tool pages for each locale x tool combination
  const pdfSlugs = pdfTools.map((t) => t.slug);
  for (const locale of locales) {
    for (const slug of pdfSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/pdf/${slug}`,
        lastModified: new Date("2026-03-23"),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Image tool pages for each locale x tool combination
  const imageSlugs = imageTools.map((t) => t.slug);
  for (const locale of locales) {
    for (const slug of imageSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/image/${slug}`,
        lastModified: new Date("2026-03-23"),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Blog listing page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Blog article pages for each locale x article combination
  for (const locale of locales) {
    for (const article of articles) {
      if (article.content[locale]) {
        entries.push({
          url: `${BASE_URL}/${locale}/blog/${article.slug}`,
          lastModified: new Date(article.publishedAt),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  // Info pages for each locale
  for (const locale of locales) {
    for (const page of ["about", "contact", "faq"] as const) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date("2026-03-23"),
        changeFrequency: "monthly",
        priority: 0.4,
      });
    }
  }

  // Legal pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    });
    entries.push({
      url: `${BASE_URL}/${locale}/terms`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
