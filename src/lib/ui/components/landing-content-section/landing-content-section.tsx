import type { LandingContentData } from "@/lib/seo/content/landing-content";

interface LandingContentSectionProps {
  content: LandingContentData;
}

export function LandingContentSection({ content }: LandingContentSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-12 pb-8">
      <div className="border-t border-border-muted pt-8">
        <h2 className="text-base font-semibold text-foreground mb-3">
          {content.title}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">
          {content.description}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {content.sections.map((s, i) => (
            <div key={i}>
              <h3 className="text-sm font-medium text-foreground mb-1.5">
                {s.heading}
              </h3>
              <p className="text-sm text-foreground-muted/80 leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
