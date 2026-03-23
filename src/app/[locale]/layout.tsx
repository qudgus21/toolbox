import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, AppNavMenu } from "@/lib/ui";
import { ThemeToggle } from "@/lib/ui/components/theme-toggle/theme-toggle";
import { LanguageSwitcher } from "@/lib/ui/components/language-switcher/language-switcher";
import { ShareButton } from "@/lib/ui/components/share-button";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { getImageDictionary } from "@/lib/i18n/get-image-dictionary";
import { getLandingDictionary } from "@/lib/i18n/get-landing-dictionary";
import { buildNavApps } from "@/lib/build-nav-apps";
import { LayoutScripts } from "./layout-scripts";
import "./landing-theme.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getLandingDictionary(locale as Locale);

  return {
    metadataBase: new URL("https://toolpop.org"),
    title: {
      default: dict.meta.title,
      template: `%s | ToolPop`,
    },
    description: dict.meta.description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/en",
      },
    },
    openGraph: {
      siteName: "ToolPop",
      locale,
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

  const [landingDict, pdfDict, imageDict] = await Promise.all([
    getLandingDictionary(locale as Locale),
    getDictionary(locale as Locale),
    getImageDictionary(locale as Locale),
  ]);
  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  const navApps = buildNavApps({
    locale,
    pdfDict: pdfDict as unknown as Record<string, Record<string, Record<string, string>>>,
    imageDict: imageDict as unknown as Record<string, Record<string, Record<string, string>>>,
    viewAllLabel: landingDict.popularTools.viewAll,
  });

  return (
    <>
      <LayoutScripts locale={locale} dir={dir} />
      <Header
        logo={
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-foreground"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logo-bg-landing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="7" fill="url(#logo-bg-landing)" />
              <text x="16" y="21.5" fontFamily="system-ui,-apple-system,sans-serif" fontSize="15" fontWeight="800" fill="white" textAnchor="middle" letterSpacing="-0.5">T</text>
              <circle cx="25" cy="8" r="3.5" fill="#fbbf24" />
              <circle cx="25" cy="8" r="1.5" fill="white" />
            </svg>
            <span>Tool<span className="text-accent">Pop</span></span>
          </Link>
        }
        nav={<AppNavMenu apps={navApps} />}
      >
        <ThemeToggle app="landing" />
        <ShareButton
          app="landing"
          shareTitle={landingDict.common.shareTitle}
          shareSubtitle={landingDict.common.shareSubtitle}
          copyLabel={landingDict.common.shareCopyLink}
          copiedLabel={landingDict.common.shareCopied}
        />
        <LanguageSwitcher locale={locale} basePath="" app="landing" />
      </Header>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
