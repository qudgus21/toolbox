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
    const exact = locales.find((l) => l === lang);
    if (exact) return exact;
    const prefix = lang.split("-")[0];
    const prefixMatch = locales.find((l) => l === prefix);
    if (prefixMatch) return prefixMatch;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and internal paths
  if (pathname.includes(".") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Root "/" — handled by page.tsx redirect
  if (pathname === "/") return NextResponse.next();

  // 301 redirect: old URLs /pdf/{locale}/... → /{locale}/pdf/...
  const oldUrlMatch = pathname.match(/^\/(pdf|image)\/([^/]+)(\/.*)?$/);
  if (oldUrlMatch) {
    const [, app, segment2, rest = ""] = oldUrlMatch;
    if (locales.find((l) => l === segment2)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${segment2}/${app}${rest}`;
      return NextResponse.redirect(url, 301);
    }
    // /pdf/merge (no locale) → /{detected}/pdf/merge
    const detected = detectLocale(request.headers.get("accept-language") ?? "");
    const url = request.nextUrl.clone();
    url.pathname = `/${detected}/${app}/${segment2}${rest}`;
    return NextResponse.redirect(url, 301);
  }

  // /pdf or /image (app root without locale)
  if (pathname === "/pdf" || pathname === "/image") {
    const detected = detectLocale(request.headers.get("accept-language") ?? "");
    const url = request.nextUrl.clone();
    url.pathname = `/${detected}${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Check if first segment is a valid locale
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.find((l) => l === segments[0])) {
    const response = NextResponse.next();
    response.headers.set("x-locale", segments[0]);
    response.headers.set("x-dir", segments[0] === "ar" || segments[0] === "he" ? "rtl" : "ltr");
    return response;
  }

  // No locale found — detect and redirect
  const detected = detectLocale(request.headers.get("accept-language") ?? "");
  const url = request.nextUrl.clone();
  url.pathname = `/${detected}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)" ],
};
