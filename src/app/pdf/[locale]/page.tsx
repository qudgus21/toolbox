import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { tools, categories } from "@/lib/pdf/tools";
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
    alternates: generateAlternates("", locales, locale, "en", "pdf"),
    openGraph: {
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      url: `/pdf/${locale}`,
      type: "website",
      locale,
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

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop PDF", url: `https://toolpop.org/pdf/${locale}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: dict.metadata.siteTitle,
            url: `https://toolpop.org/pdf/${locale}`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            author: { "@type": "Organization", name: "ToolPop", url: "https://toolpop.org" },
            inLanguage: locale,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HomeContent dict={dict} locale={locale} />
      <SiteFooter locale={locale} dict={dict} categories={categories} tools={tools} />
    </>
  );
}
