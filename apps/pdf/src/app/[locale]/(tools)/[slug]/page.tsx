import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales, getDictionary } from "@toolbox/i18n";
import { tools, getToolBySlug } from "@/lib/tools";
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
  const dict = await getDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) return {};

  const title = `${t.title} ${dict.metadata.toolTitleSuffix}`;

  return {
    title,
    description: t.description,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/${slug}`]),
      ),
    },
    openGraph: {
      title,
      description: t.description,
      url: `/${locale}/${slug}`,
      type: "website",
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

  const dict = await getDictionary(locale as Locale);
  const t = dict.tools[slug];
  if (!t) notFound();

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
            url: `https://pdf.toolbox.co.kr/${locale}/${slug}`,
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
      <ToolPageClient
        slug={slug}
        locale={locale}
        title={t.title}
        description={t.description}
        acceptedTypes={tool.acceptedTypes}
        backHref={`/${locale}`}
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
        imageToPdfLabels={slug === "image-to-pdf" ? dict.imageToPdfTool : undefined}
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
      />
    </>
  );
}
