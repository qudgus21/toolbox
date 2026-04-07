import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales } from "@/lib/i18n";
import { getTextDictionary } from "@/lib/i18n/get-text-dictionary";
import { generateAlternates, generateBreadcrumbJsonLd, generateHowToJsonLd, generateFAQPageJsonLd, getToolContent } from "@/lib/seo";
import { ToolContentSection } from "@/lib/ui";
import { tools, getToolBySlug } from "@/lib/text/tools";
import { TextToolPageClient } from "../_components/tool-page-client";

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
  const dict = await getTextDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) return {};

  return {
    title: t.title,
    description: t.description,
    alternates: generateAlternates(slug, locales, locale, "en", "text"),
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${locale}/text/${slug}`,
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

  const dict = await getTextDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop Text", url: `https://toolpop.org/${locale}/text` },
    { name: t.title, url: `https://toolpop.org/${locale}/text/${slug}` },
  ]);

  const toolContent = getToolContent("text", slug, locale);
  const howToJsonLd = toolContent ? generateHowToJsonLd(toolContent, t.title, `https://toolpop.org/${locale}/text/${slug}`) : null;
  const faqJsonLd = toolContent ? generateFAQPageJsonLd(toolContent, t.title) : null;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: t.title,
          description: t.description,
          url: `https://toolpop.org/${locale}/text/${slug}`,
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
      <TextToolPageClient
        slug={slug}
        locale={locale}
        title={t.title}
        description={t.description}
        backHref={`/${locale}/text`}
        labels={dict.common}
        toolOptions={dict.toolOptions}
        statsLabels={dict.statsLabels}
        toolNames={dict.tools}
        processorMessages={dict.processorMessages}
        dualInput={tool.dualInput}
        noInput={tool.noInput}
      >
        <ToolContentSection content={toolContent} />
      </TextToolPageClient>
    </>
  );
}
