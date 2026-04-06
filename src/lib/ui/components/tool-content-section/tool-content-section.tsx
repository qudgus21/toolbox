import type { ToolContentData } from "@/lib/seo/tool-content-types";

interface ToolContentSectionProps {
  content?: ToolContentData;
}

export function ToolContentSection({ content }: ToolContentSectionProps) {
  if (!content) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-8">
      <div className="space-y-10">
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
      </div>
    </section>
  );
}
