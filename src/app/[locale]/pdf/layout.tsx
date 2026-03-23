import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import "./pdf-theme.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
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
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/pdf`])),
        "x-default": "/en/pdf",
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

export default function PdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-app="pdf">{children}</div>;
}
