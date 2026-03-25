import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n";
import { getConverterDictionary } from "@/lib/i18n/get-converter-dictionary";
import "./converter-theme.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getConverterDictionary(locale as Locale);

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | ToolPop Converter`,
    },
    description: dict.metadata.siteDescription,
    icons: {
      icon: [
        { url: "/converter/favicon.ico", sizes: "48x48" },
        { url: "/converter/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/converter/icon-192.png",
    },
    manifest: "/converter/manifest.json",
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "theme-color": "#10b981",
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/converter`])),
        "x-default": "/en/converter",
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

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-app="converter">{children}</div>;
}
