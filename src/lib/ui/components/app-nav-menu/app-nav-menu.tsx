"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { appIconMap } from "@/lib/app-icons";
import { toolIconMap as pdfToolIcons } from "@/lib/pdf/tool-icons";
import { toolIconMap as imageToolIcons } from "@/lib/image/tool-icons";

export interface NavAppTool {
  slug: string;
  title: string;
  emoji: string;
  href: string;
}

export interface NavApp {
  slug: string;
  label: string;
  href: string;
  viewAll: string;
  tools: NavAppTool[];
}

interface AppNavMenuProps {
  apps: NavApp[];
}

export function AppNavMenu({ apps }: AppNavMenuProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex items-center gap-1">
      {apps.map((app) => {
        const isOpen = openSlug === app.slug;
        const AppIcon = appIconMap[app.slug];

        return (
          <div
            key={app.slug}
            className="relative"
            onMouseEnter={() => setOpenSlug(app.slug)}
            onMouseLeave={() => setOpenSlug(null)}
          >
            <Link
              href={app.href}
              className="flex items-center gap-2 px-3.5 py-2 text-base font-semibold text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-background-muted"
            >
              {AppIcon && <AppIcon className="h-5 w-auto shrink-0" />}
              <span>{app.label}</span>
            </Link>

            <AnimatePresence>
              {isOpen && app.tools.length > 0 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-50"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.div
                    className="rounded-xl border border-border bg-background shadow-lg overflow-hidden w-[280px]"
                    initial={{ scaleY: 0.95 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="px-2.5 py-2">
                      {app.tools.map((tool) => {
                        const iconMap = app.slug === "pdf" ? pdfToolIcons : imageToolIcons;
                        const ToolIcon = iconMap[tool.slug];
                        return (
                          <Link
                            key={tool.slug}
                            href={tool.href}
                            className="flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground hover:bg-background-muted"
                          >
                            {ToolIcon ? (
                              <ToolIcon className="h-5 w-5 shrink-0" />
                            ) : (
                              <span className="text-base shrink-0">{tool.emoji}</span>
                            )}
                            <span className="font-medium">{tool.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-border px-2.5 py-1.5">
                      <Link
                        href={app.href}
                        className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-accent hover:bg-accent-muted transition-colors"
                      >
                        {app.viewAll}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
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
