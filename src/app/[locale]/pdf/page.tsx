import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { tools, categories } from "@/lib/pdf/tools";
import { Container } from "@/lib/ui";
import { HomeContent } from "./home-content";
import { SiteFooter } from "./site-footer";

function HeroTitle({ title, titleAccent }: { title: string; titleAccent: string }) {
  const pdfIdx = title.indexOf("PDF");
  if (pdfIdx !== -1) {
    return (
      <>
        {title.slice(0, pdfIdx)}
        <span className="text-accent">PDF</span>
        {title.slice(pdfIdx + 3)}
      </>
    );
  }
  return <>{title} <span className="text-accent">{titleAccent}</span></>;
}

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
      url: `/${locale}/pdf`,
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
    { name: "ToolPop PDF", url: `https://toolpop.org/${locale}/pdf` },
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
            url: `https://toolpop.org/${locale}/pdf`,
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
