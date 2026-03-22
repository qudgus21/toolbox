import type { AlternatesConfig } from "./types";

/**
 * Generate alternates config with x-default for Next.js generateMetadata.
 * @param path - Path after locale (e.g., "" for home, "merge" for tool page)
 * @param locales - All supported locales
 * @param currentLocale - Current page locale
 * @param defaultLocale - Locale to use for x-default (defaults to "en")
 * @param basePath - Base path prefix (e.g., "pdf" for /pdf/[locale]/...)
 */
export function generateAlternates(
  path: string,
  locales: readonly string[],
  currentLocale: string,
  defaultLocale = "en",
  basePath = "",
): AlternatesConfig {
  const prefix = basePath ? `/${basePath}` : "";
  const suffix = path ? `/${path}` : "";

  return {
    canonical: `${prefix}/${currentLocale}${suffix}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${prefix}/${l}${suffix}`])),
      "x-default": `${prefix}/${defaultLocale}${suffix}`,
    },
  };
}
