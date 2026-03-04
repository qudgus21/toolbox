import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { Header } from "@toolbox/ui";
import { type Locale, locales, getDictionary } from "@toolbox/i18n";
import { tools, categories } from "@/lib/tools";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NavMenu } from "./nav-menu";
import { GoogleAnalytics } from "./google-analytics";
import "../globals.css";

const categoryLabelKeys: Record<string, "categoryOrganize" | "categoryConvert" | "categoryEdit" | "categoryOptimize" | "categorySecurity"> = {
  organize: "categoryOrganize",
  convert: "categoryConvert",
  edit: "categoryEdit",
  optimize: "categoryOptimize",
  security: "categorySecurity",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    metadataBase: new URL("https://pdf.toolbox.co.kr"),
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      siteName: dict.metadata.siteTitle,
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

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ToolBox PDF",
              url: "https://pdf.toolbox.co.kr",
              logo: "https://pdf.toolbox.co.kr/favicon.svg",
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        <GoogleAnalytics />
        <Header
          logo={
            <a href={`/${locale}`} className="text-lg font-bold text-foreground">
              <span className="text-accent">PDF</span> ToolBox
            </a>
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
      </body>
    </html>
  );
}
