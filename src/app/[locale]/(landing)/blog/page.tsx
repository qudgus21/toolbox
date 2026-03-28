import type { Metadata } from "next";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { notFound } from "next/navigation";
import { articles } from "@/lib/blog/articles";
import { BlogList } from "./blog-list";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const title = dict.blog.title;

  return {
    title,
    description: dict.blog.description,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/blog`])),
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title,
      description: dict.blog.description,
      url: `/${locale}/blog`,
      type: "website",
      locale,
      siteName: "ToolPop",
    },
    twitter: { card: "summary_large_image", title, description: dict.blog.description },
  };
}

const categoryLabelKeys = {
  guide: "categoryGuide",
  tips: "categoryTips",
  knowledge: "categoryKnowledge",
} as const;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  const localeArticles = articles
    .filter((a) => a.content[locale])
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map((a) => ({
      slug: a.slug,
      category: a.category,
      title: a.content[locale].title,
      description: a.content[locale].description,
    }));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop", url: `https://toolpop.org/${locale}` },
    { name: dict.blog.title, url: `https://toolpop.org/${locale}/blog` },
  ]);

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <main className="py-12">
      <Container size="lg">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {dict.blog.title}
        </h1>
        <p className="text-foreground-muted leading-relaxed mb-10">
          {dict.blog.description}
        </p>

        <BlogList
          articles={localeArticles}
          locale={locale}
          readMoreLabel={dict.blog.readMore}
          categoryLabels={{
            guide: dict.blog[categoryLabelKeys.guide],
            tips: dict.blog[categoryLabelKeys.tips],
            knowledge: dict.blog[categoryLabelKeys.knowledge],
          }}
          prevLabel={dict.blog.prev}
          nextLabel={dict.blog.next}
          pageLabel={dict.blog.page}
          paginationLabel={dict.blog.paginationLabel}
        />
      </Container>
    </main>
    </>
  );
}
