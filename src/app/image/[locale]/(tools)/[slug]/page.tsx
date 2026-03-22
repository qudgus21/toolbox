import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales } from "@/lib/i18n";
import { getImageDictionary } from "@/lib/i18n/get-image-dictionary";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { tools, getToolBySlug } from "@/lib/image/tools";
import { ToolPageClient } from "../_components/tool-page-client";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    tools.map((tool) => ({ locale, slug: tool.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getImageDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) return {};

  const title = `${t.title} ${dict.metadata.toolTitleSuffix}`;

  return {
    title,
    description: t.description,
    alternates: generateAlternates(slug, locales, locale, "en", "image"),
    openGraph: {
      title,
      description: t.description,
      url: `/image/${locale}/${slug}`,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
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

  const dict = await getImageDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop Image", url: `https://toolpop.org/image/${locale}` },
    { name: t.title, url: `https://toolpop.org/image/${locale}/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: t.title,
            description: t.description,
            url: `https://toolpop.org/image/${locale}/${slug}`,
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
      <ToolPageClient
        slug={slug}
        locale={locale}
        title={t.title}
        description={t.description}
        acceptedTypes={tool.acceptedTypes}
        multiFile={tool.multiFile}
        backHref={`/image/${locale}`}
        labels={dict.common}
      />
    </>
  );
}
