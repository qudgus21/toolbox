import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { locales, defaultLocale, type Locale } from "@toolbox/i18n";

function detectLocale(acceptLanguage: string): Locale {
  const parts = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of parts) {
    const exact = locales.find((l) => l === lang);
    if (exact) return exact;
    const prefix = lang.split("-")[0];
    const prefixMatch = locales.find((l) => l === prefix);
    if (prefixMatch) return prefixMatch;
  }

  return defaultLocale;
}

export default async function RootPage() {
  const headerList = await headers();
  const acceptLanguage = headerList.get("accept-language") ?? "";
  const locale = detectLocale(acceptLanguage);
  redirect(`/${locale}`);
}
