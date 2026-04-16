import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { indexedLocales } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import type { Format } from "@/lib/formats/format-data";
import { getFormatBySlugLocale, getFormatsLocale } from "@/lib/formats/format-data";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return indexedLocales.flatMap((locale) =>
    getFormatsLocale("en").map((f) => ({ locale, format: f.slug })),
  );
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; format: string }>;
}): Promise<Metadata> {
  const { locale, format: slug } = await params;
  const format = getFormatBySlugLocale(slug, locale);
  if (!format) return {};

  const title = `${format.name} Format Guide`;
  const description = format.intro.slice(0, 160).replace(/\n/g, " ");

  return {
    title,
    description,
    alternates: {
      languages: {
        ...Object.fromEntries(
          indexedLocales.map((l) => [l, `/${l}/formats/${slug}`]),
        ),
        "x-default": `/en/formats/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/formats/${slug}`,
      type: "article",
      locale,
      siteName: "ToolPop",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const categoryColors: Record<string, string> = {
  Document: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  document: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Image: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  image: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Text & Data":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  text: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  data: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

type AnyFormat = import("@/lib/formats/format-data").FormatGuide | Format;

function getPros(fmt: AnyFormat): string[] {
  if ("prosAndCons" in fmt && fmt.prosAndCons) return fmt.prosAndCons.pros;
  return (fmt as Format).pros ?? [];
}

function getCons(fmt: AnyFormat): string[] {
  if ("prosAndCons" in fmt && fmt.prosAndCons) return fmt.prosAndCons.cons;
  return (fmt as Format).cons ?? [];
}

function getToolHref(
  tool: { app?: string; slug?: string; name?: string; href?: string },
  locale: string,
): string {
  if (tool.app && tool.slug) return `/${tool.app}/${locale}/${tool.slug}`;
  if (tool.href) return tool.href.replace("{locale}", locale);
  return "#";
}

function getToolName(tool: {
  app?: string;
  slug?: string;
  name?: string;
  href?: string;
}): string {
  if (tool.name) return tool.name;
  if (tool.slug)
    return tool.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  return "";
}

function renderParagraphs(text: string) {
  return text.split("\n\n").map((p, i) => (
    <p
      key={i}
      className="text-sm text-foreground-muted leading-relaxed mb-4"
    >
      {p.trim()}
    </p>
  ));
}

export default async function FormatGuidePage({
  params,
}: {
  params: Promise<{ locale: string; format: string }>;
}) {
  const { locale, format: slug } = await params;
  const format = getFormatBySlugLocale(slug, locale);
  if (!format) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: "https://toolpop.org" },
    {
      name: "File Format Guides",
      url: `https://toolpop.org/${locale}/formats`,
    },
    {
      name: format.name,
      url: `https://toolpop.org/${locale}/formats/${slug}`,
    },
  ]);

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${format.name} Format Guide`,
    description: format.intro.slice(0, 160).replace(/\n/g, " "),
    author: {
      "@type": "Organization",
      name: "ToolPop",
      url: "https://toolpop.org",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolPop",
      url: "https://toolpop.org",
    },
    inLanguage: locale,
    url: `https://toolpop.org/${locale}/formats/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(techArticleJsonLd)}
      </script>

      <main className="py-12">
        <Container size="md">
          {/* Back link */}
          <Link
            href={`/${locale}/formats`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Format Guides
          </Link>

          {/* Category badge */}
          <div className="mb-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[format.category] ?? "bg-secondary text-secondary-foreground"}`}
            >
              {format.category}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-2xl font-bold text-foreground mb-4 sm:text-3xl">
            {format.name}
          </h1>

          {/* Metadata bar */}
          <div className="mb-8 flex flex-wrap gap-4 text-sm text-foreground-muted">
            <div>
              <span className="font-medium text-foreground">Extension:</span>{" "}
              <code className="rounded bg-background-muted px-1.5 py-0.5 text-xs font-mono">
                {format.extension}
              </code>
            </div>
            <div>
              <span className="font-medium text-foreground">MIME Type:</span>{" "}
              <code className="rounded bg-background-muted px-1.5 py-0.5 text-xs font-mono">
                {format.mimeType}
              </code>
            </div>
          </div>

          <article className="space-y-10">
            {/* Overview */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Overview
              </h2>
              {renderParagraphs(format.intro)}
            </section>

            {/* History */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                History
              </h2>
              {renderParagraphs(format.history)}
            </section>

            {/* Technical Details */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Technical Details
              </h2>
              {renderParagraphs(format.technicalDetails)}
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Pros &amp; Cons
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Pros */}
                <div className="rounded-lg border border-border-muted p-4">
                  <h3 className="mb-3 text-base font-semibold text-foreground">
                    Pros
                  </h3>
                  <ul className="space-y-2">
                    {getPros(format).map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="rounded-lg border border-border-muted p-4">
                  <h3 className="mb-3 text-base font-semibold text-foreground">
                    Cons
                  </h3>
                  <ul className="space-y-2">
                    {getCons(format).map((con, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-error" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Use Cases */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Common Use Cases
              </h2>
              <ul className="space-y-2">
                {format.useCases.map((uc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {uc}
                  </li>
                ))}
              </ul>
            </section>

            {/* Related Formats */}
            {format.relatedFormats.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Related Formats
                </h2>
                <div className="flex flex-wrap gap-2">
                  {format.relatedFormats.map((rf) => {
                    const related = getFormatsLocale(locale).find((f) => f.slug === rf);
                    if (!related) return null;
                    return (
                      <Link
                        key={rf}
                        href={`/${locale}/formats/${rf}`}
                        className="rounded-full border border-border-muted bg-background-subtle px-3 py-1 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
                      >
                        {related.extension}
                        <span className="ml-1 text-foreground-muted">
                          {related.name.split("(")[0].trim()}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Related Tools */}
            {format.relatedTools.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Related Tools
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {format.relatedTools.map((tool, i) => (
                    <Link
                      key={i}
                      href={getToolHref(tool, locale)}
                      className="group rounded-lg border border-border-muted p-4 transition-colors hover:border-accent hover:bg-accent-muted"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {getToolName(tool)}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </Container>
      </main>
    </>
  );
}
