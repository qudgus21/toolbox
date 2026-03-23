import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, AppNavMenu } from "@/lib/ui";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { getImageDictionary } from "@/lib/i18n/get-image-dictionary";
import { buildNavApps } from "@/lib/build-nav-apps";
import "../pdf-theme.css";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { ShareButton } from "@/lib/ui/components/share-button";
import { GoogleAnalytics } from "./google-analytics";
import { GoogleAdSense } from "./google-adsense";
import { LayoutScripts } from "./layout-scripts";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    metadataBase: new URL("https://toolpop.org"),
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | ToolPop PDF`,
    },
    description: dict.metadata.siteDescription,
    icons: {
      icon: [
        { url: "/pdf/favicon.ico", sizes: "48x48" },
        { url: "/pdf/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/pdf/icon-192.png",
    },
    manifest: "/pdf/manifest.json",
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "theme-color": "#ef4444",
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/pdf/${l}`])),
        "x-default": "/pdf/en",
      },
    },
    openGraph: {
      siteName: dict.metadata.siteTitle,
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const [dict, imageDict] = await Promise.all([
    getDictionary(locale as Locale),
    getImageDictionary(locale as Locale),
  ]);
  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  const navApps = buildNavApps({
    locale,
    pdfDict: dict as unknown as Record<string, Record<string, Record<string, string>>>,
    imageDict: imageDict as unknown as Record<string, Record<string, Record<string, string>>>,
    viewAllLabel: dict.nav.allTools,
  });

  return (
    <div data-app="pdf">
      <LayoutScripts
        locale={locale}
        dir={dir}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ToolPop PDF",
          url: "https://toolpop.org/pdf",
          logo: "https://toolpop.org/pdf/favicon.svg",
        }}
      />
      <GoogleAnalytics />
      <GoogleAdSense />
      <Header
        logo={
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444"/>
                  <stop offset="100%" stopColor="#dc2626"/>
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="7" fill="url(#logo-bg)"/>
              <text x="16" y="21.5" fontFamily="system-ui,-apple-system,sans-serif" fontSize="15" fontWeight="800" fill="white" textAnchor="middle" letterSpacing="-0.5">T</text>
              <circle cx="25" cy="8" r="3.5" fill="#fbbf24"/>
              <circle cx="25" cy="8" r="1.5" fill="white"/>
            </svg>
            <span>Tool<span className="text-accent">Pop</span></span>
            <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-400 leading-none">PDF</span>
          </Link>
        }
        nav={<AppNavMenu apps={navApps} />}
      >
        <ThemeToggle />
        <ShareButton
          app="pdf"
          shareTitle={dict.common.shareTitle}
          shareSubtitle={dict.common.shareSubtitle}
          copyLabel={dict.common.shareCopyLink}
          copiedLabel={dict.common.shareCopied}
        />
        <LanguageSwitcher locale={locale} />
      </Header>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
