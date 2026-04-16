import type { Metadata } from "next";
import Link from "next/link";
import { indexedLocales, locales, type Locale } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { getFormatsLocale } from "@/lib/formats/format-data";
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
  const title = "File Format Guides";
  const description =
    "Comprehensive guides to document, image, and data file formats. Learn about PDF, PNG, JPG, SVG, CSV, JSON, and more.";

  return {
    title,
    description,
    alternates: {
      languages: {
        ...Object.fromEntries(
          indexedLocales.map((l) => [l, `/${l}/formats`]),
        ),
        "x-default": "/en/formats",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/formats`,
      type: "website",
      locale,
      siteName: "ToolPop",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const categoryOrder = ["Document", "Image", "Text & Data"] as const;

const categoryDescriptions: Record<string, string> = {
  Document: "Formats for documents, reports, and printable content.",
  Image: "Formats for photographs, graphics, icons, and illustrations.",
  "Text & Data": "Formats for structured data, configuration, and data exchange.",
};

const categoryColors: Record<string, string> = {
  Document: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Image: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Text & Data":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

function getFirstSentence(text: string): string {
  const firstParagraph = text.split("\n\n")[0];
  const match = firstParagraph.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : firstParagraph.slice(0, 120) + "...";
}

export default async function FormatsListPage({
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
      name: "File Format Guides",
      url: `https://toolpop.org/${locale}/formats`,
    },
  ]);

  // Normalise category: new data uses lowercase ("document"), old ko data uses Title Case ("Document" / "Text & Data")
  const normCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower === "document") return "Document";
    if (lower === "image") return "Image";
    if (lower === "text" || lower === "data" || lower === "text & data") return "Text & Data";
    return cat;
  };
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: getFormatsLocale(locale).filter((f) => normCategory(f.category) === cat),
  }));

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <main className="py-12">
        <Container size="lg">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            File Format Guides
          </h1>
          <p className="text-foreground-muted leading-relaxed mb-10">
            Comprehensive guides to document, image, and data file formats
          </p>

          <div className="space-y-12">
            {grouped.map(({ category, items }) => (
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
                  {items.map((format) => (
                    <Link
                      key={format.slug}
                      href={`/${locale}/formats/${format.slug}`}
                      className="group rounded-lg border border-border-muted p-5 transition-colors hover:border-accent hover:bg-accent-muted"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                          {format.name.split("(")[0].trim()}
                        </span>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[format.category] ?? ""}`}
                        >
                          {format.extension}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {getFirstSentence(format.intro)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
