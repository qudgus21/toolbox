import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateAlternates, generateBreadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { notFound } from "next/navigation";
import { getArticlesByApp, getArticleBySlug } from "@/lib/blog/articles";
import { ArrowLeft, BookOpen, Lightbulb, GraduationCap } from "lucide-react";

export async function generateStaticParams() {
  const pdfArticles = getArticlesByApp("pdf");
  return locales.flatMap((locale) =>
    pdfArticles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.app !== "pdf" || !article.content[locale]) return {};

  const dict = await getDictionary(locale as Locale);
  const content = article.content[locale];
  const title = `${content.title} ${dict.metadata.toolTitleSuffix}`;

  return {
    title,
    description: content.description,
    alternates: generateAlternates(
      `blog/${slug}`,
      locales,
      locale,
      "en",
      "pdf",
    ),
    openGraph: {
      title,
      description: content.description,
      url: `/pdf/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.description,
    },
  };
}

const categoryIcons = {
  guide: BookOpen,
  tips: Lightbulb,
  knowledge: GraduationCap,
} as const;

const categoryLabelKeys = {
  guide: "categoryGuide",
  tips: "categoryTips",
  knowledge: "categoryKnowledge",
} as const;

function renderBody(body: string) {
  const blocks = body.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mt-8 mb-3 text-base font-semibold text-foreground"
        >
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 text-lg font-bold text-foreground"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
      return (
        <ul key={i} className="my-3 space-y-1.5">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-sm text-foreground-muted leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.app !== "pdf" || !article.content[locale]) notFound();

  const dict = await getDictionary(locale as Locale);
  const content = article.content[locale];
  const Icon = categoryIcons[article.category];
  const catLabel = dict.blog[categoryLabelKeys[article.category]];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "ToolPop PDF", url: `https://toolpop.org/pdf/${locale}` },
    { name: dict.blog.title, url: `https://toolpop.org/pdf/${locale}/blog` },
    {
      name: content.title,
      url: `https://toolpop.org/pdf/${locale}/blog/${slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: content.title,
            description: content.description,
            datePublished: article.publishedAt,
            author: {
              "@type": "Organization",
              name: "ToolPop",
              url: "https://toolpop.org",
            },
            publisher: {
              "@type": "Organization",
              name: "ToolPop",
              url: "https://toolpop.org",
              logo: {
                "@type": "ImageObject",
                url: "https://toolpop.org/pdf/favicon.svg",
              },
            },
            inLanguage: locale,
            url: `https://toolpop.org/pdf/${locale}/blog/${slug}`,
          }),
        }}
      />
      <main className="py-12">
        <Container size="md">
          <Link
            href={`/pdf/${locale}/blog`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.blog.backToBlog}
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1">
              <Icon className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">
                {catLabel}
              </span>
            </div>
            <span className="text-xs text-foreground-subtle">
              {dict.blog.publishedOn}{" "}
              {new Date(article.publishedAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-6 sm:text-3xl">
            {content.title}
          </h1>

          <article className="prose-custom">{renderBody(content.body)}</article>
        </Container>
      </main>
    </>
  );
}
