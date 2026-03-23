import Link from "next/link";
import type { ImageDictionary } from "@/lib/i18n/image-config";
import type { ImageToolDefinition } from "@/lib/image/tools";
import { Container, FooterServiceInfo } from "@/lib/ui";
import { categoryIconMap } from "@/lib/image/tool-icons";

const categoryLabelKeys: Record<string, keyof ImageDictionary["home"]> = {
  edit: "categoryEdit",
  convert: "categoryConvert",
  effects: "categoryEffects",
  compose: "categoryCompose",
  optimize: "categoryOptimize",
  generate: "categoryGenerate",
};

interface SiteFooterProps {
  locale: string;
  dict: ImageDictionary;
  categories: { key: string; label: string; emoji: string }[];
  tools: ImageToolDefinition[];
}

export function SiteFooter({ locale, dict, categories, tools }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <Container size="full" className="max-w-screen-2xl py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-7">
          {/* Tool categories */}
          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key}>
                <p className="text-sm font-semibold text-foreground mb-3">
                  {categoryIconMap[cat.key] ? (() => { const CatIcon = categoryIconMap[cat.key]; return <CatIcon className="inline-block h-4 w-4 align-middle -mt-0.5 mr-1" />; })() : <>{cat.emoji} </>}{dict.home[categoryLabelKeys[cat.key]]}
                </p>
                <ul className="space-y-1.5">
                  {catTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/${locale}/image/${tool.slug}`}
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
