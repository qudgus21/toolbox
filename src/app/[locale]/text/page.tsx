import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n";
import { getTextDictionary } from "@/lib/i18n/get-text-dictionary";
import type { TextDictionary } from "@/lib/i18n/text-config";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { tools, categories } from "@/lib/text/tools";
import { Container } from "@/lib/ui";
import { HomeContent } from "./home-content";
import { SiteFooter } from "./site-footer";

function HeroTitle({ title, titleAccent }: { title: string; titleAccent: string }) {
  // Find titleAccent in title and wrap it
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
  const dict = await getTextDictionary(locale as Locale);

  return {
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
    alternates: generateAlternates("", locales, locale, "en", "text"),
    openGraph: {
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      url: `/${locale}/text`,
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

export default async function TextHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getTextDictionary(locale as Locale);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop Text", url: `https://toolpop.org/${locale}/text` },
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
            url: `https://toolpop.org/${locale}/text`,
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
      <SiteFooter locale={locale} dict={dict} categories={categories} tools={tools} />
    </>
  );
}
