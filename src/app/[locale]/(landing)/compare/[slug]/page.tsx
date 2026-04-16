import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { indexedLocales } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import {
  getComparisonBySlugLocale,
  comparisons,
} from "@/lib/formats/comparison-data";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return indexedLocales.flatMap((locale) =>
    comparisons.map((c) => ({ locale, slug: c.slug })),
  );
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const comparison = getComparisonBySlugLocale(slug, locale);
  if (!comparison) return {};

  const title = comparison.title;
  const description = comparison.intro.slice(0, 160).replace(/\n/g, " ");

  return {
    title,
    description,
    alternates: {
      languages: {
        ...Object.fromEntries(
          indexedLocales.map((l) => [l, `/${l}/compare/${slug}`]),
        ),
        "x-default": `/en/compare/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/compare/${slug}`,
      type: "article",
      locale,
      siteName: "ToolPop",
    },
    twitter: { card: "summary_large_image", title, description },
  };
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

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const comparison = getComparisonBySlugLocale(slug, locale);
  if (!comparison) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: "https://toolpop.org" },
    {
      name: "Format Comparisons",
      url: `https://toolpop.org/${locale}/compare`,
    },
    {
      name: comparison.title,
      url: `https://toolpop.org/${locale}/compare/${slug}`,
    },
  ]);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <main className="py-12">
        <Container size="md">
          {/* Back link */}
          <Link
            href={`/${locale}/compare`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Comparisons
          </Link>

          {/* H1 */}
          <h1 className="text-2xl font-bold text-foreground mb-6 sm:text-3xl">
            {comparison.title}
          </h1>

          <article className="space-y-10">
            {/* Intro */}
            <section>{renderParagraphs(comparison.intro)}</section>

            {/* Comparison Table */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Comparison Table
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border-muted">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-background-muted">
                      {comparison.comparisonTable ? (
                        <>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">Aspect</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">{comparison.formatA.toUpperCase()}</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground">{comparison.formatB.toUpperCase()}</th>
                        </>
                      ) : comparison.table ? (
                        comparison.table.headers.map((header, i) => (
                          <th key={i} className="px-4 py-3 text-left font-semibold text-foreground">{header}</th>
                        ))
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.comparisonTable
                      ? comparison.comparisonTable.map((row, ri) => (
                          <tr
                            key={ri}
                            className={ri % 2 === 0 ? "bg-background" : "bg-background-subtle"}
                          >
                            <td className="px-4 py-3 font-medium text-foreground">{row.aspect}</td>
                            <td className="px-4 py-3 text-foreground-muted">{row.formatA}</td>
                            <td className="px-4 py-3 text-foreground-muted">{row.formatB}</td>
                          </tr>
                        ))
                      : comparison.table
                        ? comparison.table.rows.map((row, ri) => (
                            <tr
                              key={ri}
                              className={ri % 2 === 0 ? "bg-background" : "bg-background-subtle"}
                            >
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`px-4 py-3 text-foreground-muted ${ci === 0 ? "font-medium text-foreground" : ""}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))
                        : null}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Detailed Analysis */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Detailed Analysis
              </h2>
              {renderParagraphs(comparison.detailedAnalysis ?? comparison.analysis ?? "")}
            </section>

            {/* When to Use A / B — side by side */}
            <section>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Format A */}
                <div className="rounded-lg border border-border-muted p-4">
                  <h2 className="mb-3 text-base font-semibold text-foreground">
                    When to Use {comparison.formatA.toUpperCase()}
                  </h2>
                  {comparison.whenToUse ? (
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {comparison.whenToUse.formatA}
                    </p>
                  ) : comparison.whenToUseA ? (
                    <ul className="space-y-2">
                      {comparison.whenToUseA.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {/* Format B */}
                <div className="rounded-lg border border-border-muted p-4">
                  <h2 className="mb-3 text-base font-semibold text-foreground">
                    When to Use {comparison.formatB.toUpperCase()}
                  </h2>
                  {comparison.whenToUse ? (
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {comparison.whenToUse.formatB}
                    </p>
                  ) : comparison.whenToUseB ? (
                    <ul className="space-y-2">
                      {comparison.whenToUseB.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Conclusion
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {comparison.conclusion}
              </p>
            </section>

            {/* Related Tools */}
            {comparison.relatedTools.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Related Tools
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {comparison.relatedTools.map((tool, i) => {
                    const href = tool.app && tool.slug
                      ? `/${tool.app}/${locale}/${tool.slug}`
                      : tool.href
                        ? tool.href.replace("{locale}", locale)
                        : "#";
                    const label = tool.app && tool.slug
                      ? tool.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                      : tool.name ?? "";
                    return (
                      <Link
                        key={i}
                        href={href}
                        className="group rounded-lg border border-border-muted p-4 transition-colors hover:border-accent hover:bg-accent-muted"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                          {label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </article>
        </Container>
      </main>
    </>
  );
}
