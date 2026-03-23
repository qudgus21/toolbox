import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      "https://toolpop.org/sitemap.xml",
      "https://toolpop.org/pdf/sitemap.xml",
      "https://toolpop.org/image/sitemap.xml",
    ],
  };
}
