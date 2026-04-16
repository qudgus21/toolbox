import type { Metadata } from "next";
import Link from "next/link";
import { indexedLocales, locales, type Locale } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { getComparisonsLocale } from "@/lib/formats/comparison-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Format Comparisons";
  const description =
    "Side-by-side comparisons of popular file formats. PNG vs JPG, PDF vs DOCX, JSON vs CSV, and more.";

  return {
    title,
    description,
    alternates: {
      languages: {
        ...Object.fromEntries(
          indexedLocales.map((l) => [l, `/${l}/compare`]),
        ),
        "x-default": "/en/compare",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/compare`,
      type: "website",
      locale,
      siteName: "ToolPop",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const categoryOrder = ["Image", "Document", "Data"] as const;

const imageFormats = new Set(["png", "jpg", "jpeg", "webp", "svg", "gif", "heic", "tiff", "bmp", "ico", "psd", "eps"]);
const documentFormats = new Set(["pdf", "docx", "epub", "pdfa", "odt", "rtf"]);

function inferCategory(c: {
  category?: string;
  formatA: string;
  formatB: string;
}): string {
  if (c.category) return c.category;
  const a = c.formatA.toLowerCase().replace(/-/g, "");
  const b = c.formatB.toLowerCase().replace(/-/g, "");
  if (imageFormats.has(a) || imageFormats.has(b)) return "Image";
  if (documentFormats.has(a) || documentFormats.has(b)) return "Document";
  return "Data";
}

const categoryDescriptions: Record<string, string> = {
  Image: "Compare image formats to find the right one for your project.",
  Document: "Compare document formats for editing, sharing, and archival.",
  Data: "Compare data interchange formats for APIs, spreadsheets, and storage.",
};

function getFirstSentence(text: string): string {
  const firstParagraph = text.split("\n\n")[0];
  const match = firstParagraph.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : firstParagraph.slice(0, 120) + "...";
}

export default async function CompareListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: `https://toolpop.org/${locale}` },
    {
      name: "Format Comparisons",
      url: `https://toolpop.org/${locale}/compare`,
    },
  ]);

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: getComparisonsLocale(locale).filter((c) => inferCategory(c) === cat),
  }));

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <main className="py-12">
        <Container size="lg">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Format Comparisons
          </h1>
          <p className="text-foreground-muted leading-relaxed mb-10">
            Side-by-side comparisons of popular file formats to help you choose
            the right one
          </p>

          <div className="space-y-12">
            {grouped.map(({ category, items }) =>
              items.length === 0 ? null : (
                <section key={category}>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-foreground mb-1">
                      {category}
                    </h2>
                    <p className="text-sm text-foreground-muted">
                      {categoryDescriptions[category]}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((comparison) => (
                      <Link
                        key={comparison.slug}
                        href={`/${locale}/compare/${comparison.slug}`}
                        className="group rounded-lg border border-border-muted p-5 transition-colors hover:border-accent hover:bg-accent-muted"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded bg-background-muted px-2 py-0.5 text-xs font-mono font-medium text-foreground">
                            {comparison.formatA}
                          </span>
                          <span className="text-xs text-foreground-subtle">
                            vs
                          </span>
                          <span className="rounded bg-background-muted px-2 py-0.5 text-xs font-mono font-medium text-foreground">
                            {comparison.formatB}
                          </span>
                        </div>
                        <h3 className="mb-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                          {comparison.title}
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {getFirstSentence(comparison.intro)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ),
            )}
          </div>
        </Container>
      </main>
    </>
  );
}
