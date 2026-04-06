import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales } from "@/lib/i18n";
import { getCalculatorDictionary } from "@/lib/i18n/get-calculator-dictionary";
import { generateAlternates, generateBreadcrumbJsonLd, generateHowToJsonLd, generateFAQPageJsonLd, getToolContent } from "@/lib/seo";
import { ToolContentSection } from "@/lib/ui";
import { tools, getToolBySlug } from "@/lib/calculator/tools";
import { CalculatorToolPageClient } from "../_components/tool-page-client";

// Only pre-generate key locales to stay within Vercel's 80MB body limit.
// Other locales are generated on-demand (ISR).
const KEY_LOCALES = ["en", "ko", "ja", "zh", "es"] as const;

export async function generateStaticParams() {
  return KEY_LOCALES.flatMap((locale) =>
    tools.map((tool) => ({ locale, slug: tool.slug })),
  );
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getCalculatorDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) return {};

  return {
    title: t.title,
    description: t.description,
    alternates: generateAlternates(slug, locales, locale, "en", "calculator"),
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${locale}/calculator/${slug}`,
      type: "website",
      locale,
      siteName: "ToolPop",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const dict = await getCalculatorDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop Calculator", url: `https://toolpop.org/${locale}/calculator` },
    { name: t.title, url: `https://toolpop.org/${locale}/calculator/${slug}` },
  ]);

  const toolContent = getToolContent("calculator", slug);
  const howToJsonLd = toolContent ? generateHowToJsonLd(toolContent, t.title, `https://toolpop.org/${locale}/calculator/${slug}`) : null;
  const faqJsonLd = toolContent ? generateFAQPageJsonLd(toolContent, t.title) : null;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: t.title,
          description: t.description,
          url: `https://toolpop.org/${locale}/calculator/${slug}`,
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
      {howToJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(howToJsonLd)}
        </script>
      )}
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}
      <CalculatorToolPageClient
        slug={slug}
        locale={locale}
        title={t.title}
        description={t.description}
        backHref={`/${locale}/calculator`}
        labels={dict.common}
        fieldLabels={dict.fieldLabels}
        fieldOptions={dict.fieldOptions}
        statsLabels={dict.statsLabels}
        toolNames={dict.tools}
        processorMessages={dict.processorMessages}
        inputType={tool.inputType}
        fields={tool.fields}
        previewData={tool.previewData}
      >
        <ToolContentSection content={toolContent} />
      </CalculatorToolPageClient>
    </>
  );
}
