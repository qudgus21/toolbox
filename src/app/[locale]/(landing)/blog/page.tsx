import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, locales, getDictionary } from "@/lib/i18n";
import { generateAlternates } from "@/lib/seo";
import { Container } from "@/lib/ui";
import { notFound } from "next/navigation";
import { articles } from "@/lib/blog/articles";
import { BookOpen, Lightbulb, GraduationCap } from "lucide-react";

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
    );

  return (
    <main className="py-12">
      <Container size="lg">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {dict.blog.title}
        </h1>
        <p className="text-foreground-muted leading-relaxed mb-10">
          {dict.blog.description}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localeArticles.map((article) => {
            const content = article.content[locale];
            const Icon = categoryIcons[article.category];
            const catLabel =
              dict.blog[categoryLabelKeys[article.category]];

            return (
              <Link
                key={article.slug}
                href={`/${locale}/blog/${article.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent/40 hover:bg-background-subtle"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium text-accent">
                    {catLabel}
                  </span>
                </div>
                <h2 className="mb-2 text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  {content.title}
                </h2>
                <p className="text-sm text-foreground-muted line-clamp-3 flex-1">
                  {content.description}
                </p>
                <span className="mt-4 text-xs font-medium text-accent">
                  {dict.blog.readMore} →
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
