"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@toolbox/i18n";
import { toolIconMap, categoryIconMap } from "@/lib/tool-icons";

interface NavTool {
  slug: string;
  emoji: string;
  category: string;
}

interface NavMenuProps {
  locale: string;
  dict: Dictionary;
  categories: { key: string; label: string; emoji: string }[];
  tools: NavTool[];
  categoryLabelKeys: Record<string, keyof Dictionary["home"]>;
}

export function NavMenu({ locale, dict, categories, tools, categoryLabelKeys }: NavMenuProps) {
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex items-center gap-5">
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat.key);
        const isOpen = openCat === cat.key;

        return (
          <div
            key={cat.key}
            className="relative"
            onMouseEnter={() => setOpenCat(cat.key)}
            onMouseLeave={() => setOpenCat(null)}
          >
            <button
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2.5 text-base font-medium text-foreground-muted hover:text-foreground transition-colors"
            >
              {categoryIconMap[cat.key] ? (() => { const CatIcon = categoryIconMap[cat.key]; return <CatIcon className="h-5 w-5" />; })() : <span className="text-lg">{cat.emoji}</span>}
              <span>{dict.home[categoryLabelKeys[cat.key]]}</span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-50"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.div
                    className="rounded-xl border border-border bg-background shadow-lg px-2.5 py-2 overflow-hidden"
                    initial={{ scaleY: 0.95 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{ transformOrigin: "top" }}
                  >
                    <div className={catTools.length > 6 ? "grid grid-cols-2 gap-x-4" : "flex flex-col"} style={catTools.length > 6 ? { gridTemplateColumns: "1fr 1fr" } : undefined}>
                      {catTools.map((tool) => (
                        <a
                          key={tool.slug}
                          href={`/${locale}/${tool.slug}`}
                          className="flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground hover:bg-background-muted"
                        >
                          {toolIconMap[tool.slug] ? (() => { const Icon = toolIconMap[tool.slug]; return <Icon className="h-5 w-auto shrink-0" />; })() : <span className="text-base shrink-0">{tool.emoji}</span>}
                          <span className="font-medium">{dict.tools[tool.slug].title}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
