import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@toolbox/i18n";
import { tools, categories } from "@/lib/tools";
import { HomeContent } from "./home-content";
import { SiteFooter } from "./site-footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      url: `/${locale}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
    },
  };
}

export default async function PdfHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: dict.metadata.siteTitle,
            url: `https://pdf.toolbox.co.kr/${locale}`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <HomeContent dict={dict} locale={locale} />
      <SiteFooter locale={locale} dict={dict} categories={categories} tools={tools} />
    </>
  );
}
