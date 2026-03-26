import Link from "next/link";
import type { CalculatorDictionary } from "@/lib/i18n/calculator-config";
import type { CalculatorToolDefinition } from "@/lib/calculator/tools";
import { Container, FooterServiceInfo } from "@/lib/ui";

const categoryLabelKeys: Record<string, keyof CalculatorDictionary["home"]> = {
  math: "categoryMath",
  statistics: "categoryStatistics",
  trigonometry: "categoryTrigonometry",
  financial: "categoryFinancial",
  health: "categoryHealth",
  everyday: "categoryEveryday",
  education: "categoryEducation",
  developer: "categoryDeveloper",
};

interface SiteFooterProps {
  locale: string;
  dict: CalculatorDictionary;
  categories: { key: string; emoji: string }[];
  tools: CalculatorToolDefinition[];
}

export function SiteFooter({ locale, dict, categories, tools }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <Container size="full" className="max-w-screen-2xl py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-9">
          {/* Tool categories */}
          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key}>
                <p className="text-sm font-semibold text-foreground mb-3">
                  {cat.emoji}{" "}
                  {dict.home[categoryLabelKeys[cat.key]]}
                </p>
                <ul className="space-y-1.5">
                  {catTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/${locale}/calculator/${tool.slug}`}
                        className="text-xs text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {dict.tools[tool.slug]?.title ?? tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Service Info */}
          <FooterServiceInfo
            locale={locale}
            labels={dict.footer}
            blogTitle={dict.blog.title}
          />
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <Container size="full" className="max-w-screen-2xl py-4">
          <p className="text-center text-xs text-foreground-subtle">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
        </Container>
      </div>
    </footer>
  );
}
