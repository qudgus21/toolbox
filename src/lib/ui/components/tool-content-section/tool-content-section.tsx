import Link from "next/link";
import type { ToolContentData } from "@/lib/seo/tool-content-types";
import { getArticleBySlug } from "@/lib/blog/articles";

interface ToolContentSectionProps {
  content?: ToolContentData;
  locale?: string;
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p
          key={i}
          className="text-sm text-foreground-muted leading-relaxed mb-3 last:mb-0"
        >
          {p}
        </p>
      ))}
    </>
  );
}

export function ToolContentSection({ content, locale }: ToolContentSectionProps) {
  if (!content) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-8">
      <div className="space-y-10">
        {/* What Is */}
        {content.whatIs && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {content.whatIs.title}
            </h2>
            <Paragraphs text={content.whatIs.description} />
          </div>
        )}

        {/* How To */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {content.howTo.title}
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            {content.howTo.steps.map((step, i) => (
              <li
                key={i}
                className="text-sm text-foreground-muted leading-relaxed"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {content.features.title}
          </h2>
          <ul className="space-y-2">
            {content.features.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        {content.useCases && content.useCases.items.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {content.useCases.title}
            </h2>
            <ul className="space-y-2">
              {content.useCases.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why Use */}
        {content.whyUse && content.whyUse.items.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {content.whyUse.title}
            </h2>
            <ul className="space-y-2">
              {content.whyUse.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Comparison */}
        {content.comparison && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {content.comparison.title}
            </h2>
            <Paragraphs text={content.comparison.description} />
          </div>
        )}

        {/* Tips */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {content.tips.title}
          </h2>
          <ul className="space-y-2">
            {content.tips.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground-subtle" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {content.faq.map((item, i) => (
                <div key={i}>
                  <dt className="text-sm font-medium text-foreground mb-1">
                    {item.question}
                  </dt>
                  <dd className="text-sm text-foreground-muted leading-relaxed">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Related Articles & Formats */}
        {locale && (content.relatedArticles?.length || content.relatedFormats?.length) && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Learn More
            </h2>
            <div className="flex flex-wrap gap-2">
              {content.relatedArticles?.map((slug) => {
                const article = getArticleBySlug(slug);
                if (!article) return null;
                const articleContent = article.content[locale] ?? article.content["en"];
                if (!articleContent) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/blog/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-foreground-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="text-xs">📖</span>
                    {articleContent.title}
                  </Link>
                );
              })}
              {content.relatedFormats?.map((slug) => (
                <Link
                  key={slug}
                  href={`/${locale}/formats/${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-foreground-muted hover:border-accent hover:text-accent transition-colors"
                >
                  <span className="text-xs">📄</span>
                  {slug.toUpperCase()} Format Guide
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
