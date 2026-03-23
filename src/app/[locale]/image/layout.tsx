import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n";
import { getImageDictionary } from "@/lib/i18n/get-image-dictionary";
import "./image-theme.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getImageDictionary(locale as Locale);

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | ToolPop Image`,
    },
    description: dict.metadata.siteDescription,
    icons: {
      icon: [
        { url: "/image/favicon.ico", sizes: "48x48" },
        { url: "/image/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/image/icon-192.png",
    },
    manifest: "/image/manifest.json",
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "theme-color": "#6366f1",
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/image`])),
        "x-default": "/en/image",
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

export default function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-app="image">{children}</div>;
}
