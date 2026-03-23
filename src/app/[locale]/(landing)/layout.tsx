import type { Metadata } from "next";
import { getLandingDictionary } from "@/lib/i18n/get-landing-dictionary";
import { type Locale, locales } from "@/lib/i18n";
import "./landing-theme.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getLandingDictionary(locale as Locale);

  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
    other: {
      "theme-color": "#a855f7",
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

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-app="landing">{children}</div>;
}
