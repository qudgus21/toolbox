import type { AlternatesConfig } from "./types";
import { indexedLocales } from "@/lib/i18n";

/**
 * Generate alternates config with x-default for Next.js generateMetadata.
 * Only indexed locales are included in hreflang alternates.
 * @param path - Path after locale (e.g., "" for home, "merge" for tool page)
 * @param _locales - Ignored (kept for API compat); indexed locales are used internally
 * @param currentLocale - Current page locale
 * @param defaultLocale - Locale to use for x-default (defaults to "en")
 * @param basePath - Base path prefix (e.g., "pdf" for /pdf/[locale]/...)
 */
export function generateAlternates(
  path: string,
  _locales: readonly string[],
  currentLocale: string,
  defaultLocale = "en",
  basePath = "",
): AlternatesConfig {
  const appPath = basePath ? `/${basePath}` : "";
  const suffix = path ? `/${path}` : "";

  return {
    canonical: `/${currentLocale}${appPath}${suffix}`,
    languages: {
      ...Object.fromEntries(indexedLocales.map((l) => [l, `/${l}${appPath}${suffix}`])),
      "x-default": `/${defaultLocale}${appPath}${suffix}`,
    },
  };
}
