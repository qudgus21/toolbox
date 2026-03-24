import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n";
import { getTextDictionary } from "@/lib/i18n/get-text-dictionary";
import "./text-theme.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getTextDictionary(locale as Locale);

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | ToolPop Text`,
    },
    description: dict.metadata.siteDescription,
    icons: {
      icon: [
        { url: "/text/favicon.ico", sizes: "48x48" },
        { url: "/text/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/text/icon-192.png",
    },
    manifest: "/text/manifest.json",
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "theme-color": "#f59e0b",
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/text`])),
        "x-default": "/en/text",
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

export default function TextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-app="text">{children}</div>;
}
