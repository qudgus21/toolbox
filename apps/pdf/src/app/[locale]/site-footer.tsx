import Link from "next/link";
import type { Dictionary } from "@toolbox/i18n";
import type { ToolDefinition } from "@/lib/tools";
import { Container } from "@toolbox/ui";
import { categoryIconMap } from "@/lib/tool-icons";

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
    <footer className="border-t border-border bg-background-subtle" style={{ contentVisibility: "auto", containIntrinsicSize: "0 300px" }}>
      <Container size="full" className="max-w-screen-2xl py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Tool categories */}
          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {categoryIconMap[cat.key] ? (() => { const CatIcon = categoryIconMap[cat.key]; return <CatIcon className="inline-block h-4 w-4 align-middle -mt-0.5 mr-1" />; })() : <>{cat.emoji} </>}{dict.home[categoryLabelKeys[cat.key]]}
                </h3>
                <ul className="space-y-1.5">
                  {catTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/${locale}/${tool.slug}`}
                        className="text-xs text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {dict.tools[tool.slug].title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {dict.footer.legal}
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href={`/${locale}/privacy`} className="text-xs text-foreground-muted hover:text-foreground transition-colors">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-xs text-foreground-muted hover:text-foreground transition-colors">
                  {dict.footer.terms}
                </Link>
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
