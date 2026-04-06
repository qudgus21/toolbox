import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateAlternates, generateBreadcrumbJsonLd, generateHowToJsonLd, generateFAQPageJsonLd, getToolContent } from "@/lib/seo";
import { ToolContentSection } from "@/lib/ui";
import { tools, getToolBySlug } from "@/lib/pdf/tools";
import { ToolPageClient } from "../_components/tool-page-client";


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
  const dict = await getDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) return {};

  return {
    title: t.title,
    description: t.description,
    alternates: generateAlternates(slug, locales, locale, "en", "pdf"),
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${locale}/pdf/${slug}`,
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

  const dict = await getDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop PDF", url: `https://toolpop.org/${locale}/pdf` },
    { name: t.title, url: `https://toolpop.org/${locale}/pdf/${slug}` },
  ]);

  const toolContent = getToolContent("pdf", slug);
  const howToJsonLd = toolContent ? generateHowToJsonLd(toolContent, t.title, `https://toolpop.org/${locale}/pdf/${slug}`) : null;
  const faqJsonLd = toolContent ? generateFAQPageJsonLd(toolContent, t.title) : null;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: t.title,
          description: t.description,
          url: `https://toolpop.org/${locale}/pdf/${slug}`,
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
      <ToolPageClient
        slug={slug}
        locale={locale}
        title={t.title}
        description={t.description}
        acceptedTypes={tool.acceptedTypes}
        backHref={`/${locale}/pdf`}
        labels={{ ...dict.common, favHint: dict.home.favHint }}
        splitLabels={slug === "split" ? dict.splitTool : undefined}
        compressLabels={slug === "compress" ? dict.compressTool : undefined}
        deletePagesLabels={slug === "delete-pages" ? dict.deletePagesTool : undefined}
        extractPagesLabels={slug === "extract-pages" ? dict.extractPagesTool : undefined}
        pdfToJpgLabels={slug === "pdf-to-jpg" ? dict.pdfToJpgTool : undefined}
        pdfToPngLabels={slug === "pdf-to-png" ? dict.pdfToPngTool : undefined}
        pdfToTextLabels={slug === "pdf-to-text" ? dict.pdfToTextTool : undefined}
        extractImagesLabels={slug === "extract-images" ? dict.extractImagesTool : undefined}
        jpgToPdfLabels={slug === "jpg-to-pdf" ? dict.jpgToPdfTool : undefined}
        pngToPdfLabels={slug === "png-to-pdf" ? dict.pngToPdfTool : undefined}
        imageToPdfLabels={["image-to-pdf", "webp-to-pdf", "tiff-to-pdf", "heic-to-pdf"].includes(slug) ? dict.imageToPdfTool : undefined}
        htmlToPdfLabels={slug === "html-to-pdf" ? dict.htmlToPdfTool : undefined}
        scanToPdfLabels={slug === "scan-to-pdf" ? dict.scanToPdfTool : undefined}
        organizePagesLabels={slug === "organize-pages" ? dict.organizePagesTool : undefined}
        rotateLabels={slug === "rotate" ? dict.rotateTool : undefined}
        resizeLabels={slug === "resize" ? dict.resizeTool : undefined}
        webOptimizeLabels={slug === "web-optimize" ? dict.webOptimizeTool : undefined}
        protectLabels={slug === "protect" ? dict.protectTool : undefined}
        flattenLabels={slug === "flatten" ? dict.flattenTool : undefined}
        cropLabels={slug === "crop" ? dict.cropTool : undefined}
        editMetadataLabels={slug === "edit-metadata" ? dict.editMetadataTool : undefined}
        editPdfLabels={slug === "edit-pdf" ? dict.editPdfTool : undefined}
        redactLabels={slug === "redact" ? dict.redactTool : undefined}
        pageNumbersLabels={slug === "page-numbers" ? dict.pageNumbersTool : undefined}
        annotateLabels={slug === "annotate" ? dict.annotateTool : undefined}
        signLabels={slug === "sign" ? dict.signTool : undefined}
        watermarkLabels={slug === "watermark" ? dict.watermarkTool : undefined}
        pagesPerSheetLabels={slug === "pages-per-sheet" ? dict.pagesPerSheetTool : undefined}
        headerFooterLabels={slug === "header-footer" ? dict.headerFooterTool : undefined}
        overlayLabels={slug === "overlay" ? dict.overlayTool : undefined}
        bookletLabels={slug === "booklet" ? dict.bookletTool : undefined}
      >
        <ToolContentSection content={toolContent} />
      </ToolPageClient>
    </>
  );
}
