import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/lib/ui";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import "../pdf-theme.css";
import { tools, categories } from "@/lib/pdf/tools";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NavMenu } from "./nav-menu";
import { GoogleAnalytics } from "./google-analytics";
import { GoogleAdSense } from "./google-adsense";

const categoryLabelKeys: Record<string, "categoryOrganize" | "categoryConvert" | "categoryEdit" | "categoryOptimize" | "categorySecurity"> = {
  organize: "categoryOrganize",
  convert: "categoryConvert",
  edit: "categoryEdit",
  optimize: "categoryOptimize",
  security: "categorySecurity",
};

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

  const dict = await getDictionary(locale as Locale);
  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dir)}`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
        }}
      />
      <meta name="theme-color" content="#ef4444" />
      <script
        dangerouslySetInnerHTML={{
          __html: `if("serviceWorker"in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("/pdf/sw.js")})}`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ToolPop PDF",
            url: "https://toolpop.org/pdf",
            logo: "https://toolpop.org/pdf/favicon.svg",
          }),
        }}
      />
      <GoogleAnalytics />
      <GoogleAdSense />
      <Header
        logo={
          <Link href={`/pdf/${locale}`} className="flex items-center gap-2 text-lg font-bold text-foreground">
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
        nav={
          <NavMenu
            locale={locale}
            dict={dict}
            categories={categories}
            tools={tools.map(({ slug, emoji, category }) => ({ slug, emoji, category }))}
            categoryLabelKeys={categoryLabelKeys}
          />
        }
      >
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
      </Header>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
