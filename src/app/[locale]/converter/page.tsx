import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n";
import { getConverterDictionary } from "@/lib/i18n/get-converter-dictionary";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { tools, categories } from "@/lib/converter/tools";
import { Container, LandingContentSection } from "@/lib/ui";
import { getLandingContent } from "@/lib/seo/content/landing-content";
import { HomeContent } from "./home-content";
import { SiteFooter } from "./site-footer";

function HeroTitle({ title, titleAccent }: { title: string; titleAccent: string }) {
  const idx = title.indexOf(titleAccent);
  if (idx !== -1) {
    return (
      <>
        {title.slice(0, idx)}
        <span className="text-accent">{titleAccent}</span>
        {title.slice(idx + titleAccent.length)}
      </>
    );
  }
  return <>{title}</>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getConverterDictionary(locale as Locale);

  return {
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
    alternates: generateAlternates("", locales, locale, "en", "converter"),
    openGraph: {
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      url: `/${locale}/converter`,
      type: "website",
      locale,
      siteName: "ToolPop",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
    },
  };
}

export default async function ConverterHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getConverterDictionary(locale as Locale);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop Converter", url: `https://toolpop.org/${locale}/converter` },
  ]);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: dict.metadata.siteTitle,
          url: `https://toolpop.org/${locale}/converter`,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          author: { "@type": "Organization", name: "ToolPop", url: "https://toolpop.org" },
          inLanguage: locale,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      {/* Hero — server-rendered for fast LCP */}
      <section className="pt-8 pb-0">
        <Container size="full" className="max-w-screen-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              <HeroTitle title={dict.home.title} titleAccent={dict.home.titleAccent} />
            </h1>
            <p className="mt-2 text-base text-foreground-muted max-w-2xl mx-auto">
              {dict.home.description}
            </p>
          </div>
        </Container>
      </section>
      <HomeContent dict={dict} locale={locale} />
      <LandingContentSection content={getLandingContent("converter", locale) ?? { title: "", description: "", sections: [] }} />
      <SiteFooter locale={locale} dict={dict} categories={categories} tools={tools} />
    </>
  );
}
