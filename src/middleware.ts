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

function handleAppLocale(request: NextRequest, appPrefix: string): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(`/${appPrefix}`)) return null;

  const afterApp = pathname.slice(`/${appPrefix}`.length);

  // Skip static files and internal paths
  if (afterApp.includes(".") || afterApp.startsWith("/_next") || afterApp.startsWith("/api")) {
    return null;
  }

  // Check if pathname already has a valid locale
  const pathnameLocale = locales.find(
    (locale) => afterApp.startsWith(`/${locale}/`) || afterApp === `/${locale}`,
  );
  if (pathnameLocale) return null;

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const detectedLocale = detectLocale(acceptLanguage);

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${appPrefix}/${detectedLocale}${afterApp}`;
  return NextResponse.redirect(url);
}

export function middleware(request: NextRequest) {
  return handleAppLocale(request, "pdf")
    ?? handleAppLocale(request, "image")
    ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/pdf/((?!_next|api|.*\\..*).*)",
    "/image/((?!_next|api|.*\\..*).*)",
  ],
};
