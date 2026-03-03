import type { Dictionary } from "@toolbox/i18n";
import type { ToolDefinition } from "@/lib/tools";
import { Container } from "@toolbox/ui";

const categoryLabelKeys: Record<string, keyof Dictionary["home"]> = {
  organize: "categoryOrganize",
  convert: "categoryConvert",
  edit: "categoryEdit",
  optimize: "categoryOptimize",
  security: "categorySecurity",
};

interface SiteFooterProps {
  locale: string;
  dict: Dictionary;
  categories: { key: string; label: string; emoji: string }[];
  tools: ToolDefinition[];
}

export function SiteFooter({ locale, dict, categories, tools }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <Container size="full" className="max-w-screen-2xl py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Tool categories */}
          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key}>
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  {cat.emoji} {dict.home[categoryLabelKeys[cat.key]]}
                </h4>
                <ul className="space-y-1.5">
                  {catTools.map((tool) => (
                    <li key={tool.slug}>
                      <a
                        href={`/${locale}/${tool.slug}`}
                        className="text-xs text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {dict.tools[tool.slug].title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              {dict.footer.legal}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href={`/${locale}/privacy`} className="text-xs text-foreground-muted hover:text-foreground transition-colors">
                  {dict.footer.privacy}
                </a>
              </li>
              <li>
                <a href={`/${locale}/terms`} className="text-xs text-foreground-muted hover:text-foreground transition-colors">
                  {dict.footer.terms}
                </a>
              </li>
            </ul>
          </div>
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
