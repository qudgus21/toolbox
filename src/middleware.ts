import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function detectLocale(acceptLanguage: string): string {
  const parts = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of parts) {
    // Try exact match first (e.g., "ko")
    const exact = locales.find((l) => l === lang);
    if (exact) return exact;
    // Try prefix match (e.g., "ko-KR" -> "ko")
    const prefix = lang.split("-")[0];
    const prefixMatch = locales.find((l) => l === prefix);
    if (prefixMatch) return prefixMatch;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /pdf paths
  if (!pathname.startsWith("/pdf")) return NextResponse.next();

  // Get the path after /pdf
  const afterPdf = pathname.slice("/pdf".length); // e.g., "/ko/merge" or "" or "/merge"

  // Skip static files and internal paths
  if (afterPdf.includes(".") || afterPdf.startsWith("/_next") || afterPdf.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale
  const pathnameLocale = locales.find(
    (locale) => afterPdf.startsWith(`/${locale}/`) || afterPdf === `/${locale}`,
  );
  if (pathnameLocale) return NextResponse.next();

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const detectedLocale = detectLocale(acceptLanguage);

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/pdf/${detectedLocale}${afterPdf}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/pdf/((?!_next|api|.*\\..*).*)"],
};
