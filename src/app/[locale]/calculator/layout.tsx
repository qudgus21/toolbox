import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n";
import { getCalculatorDictionary } from "@/lib/i18n/get-calculator-dictionary";
import "./calculator-theme.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getCalculatorDictionary(locale as Locale);

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | ToolPop Calculator`,
    },
    description: dict.metadata.siteDescription,
    icons: {
      icon: [
        { url: "/calculator/favicon.ico", sizes: "48x48" },
        { url: "/calculator/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/calculator/icon-192.png",
    },
    manifest: "/calculator/manifest.json",
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "theme-color": "#7c3aed",
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/calculator`])),
        "x-default": "/en/calculator",
      },
    },
    openGraph: {
      siteName: dict.metadata.siteTitle,
      locale,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-app="calculator">{children}</div>;
}
