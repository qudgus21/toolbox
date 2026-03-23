"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
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

/* ── Desktop dropdown nav ── */
function DesktopNav({ apps }: AppNavMenuProps) {
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

/* ── Mobile slide-down nav ── */
function MobileNav({ apps }: AppNavMenuProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
        aria-label="Menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 top-[72px] z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={close}
            />
            {/* panel */}
            <motion.div
              className="fixed left-0 right-0 top-[72px] z-50 border-b border-border bg-background shadow-xl max-h-[70vh] overflow-y-auto"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-3 space-y-1">
                {apps.map((app) => {
                  const AppIcon = appIconMap[app.slug];
                  return (
                    <div key={app.slug}>
                      <Link
                        href={app.href}
                        onClick={close}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-background-muted transition-colors"
                      >
                        {AppIcon && <AppIcon className="h-6 w-auto shrink-0" />}
                        <span>{app.label}</span>
                        <ArrowRight className="h-4 w-4 ml-auto text-foreground-subtle" />
                      </Link>
                      {app.tools.length > 0 && (
                        <div className="ml-4 pl-4 border-l border-border/60 space-y-0.5 mb-2">
                          {app.tools.map((tool) => {
                            const iconMap = app.slug === "pdf" ? pdfToolIcons : imageToolIcons;
                            const ToolIcon = iconMap[tool.slug];
                            return (
                              <Link
                                key={tool.slug}
                                href={tool.href}
                                onClick={close}
                                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
                              >
                                {ToolIcon ? (
                                  <ToolIcon className="h-4 w-4 shrink-0" />
                                ) : (
                                  <span className="text-sm shrink-0">{tool.emoji}</span>
                                )}
                                <span>{tool.title}</span>
                              </Link>
                            );
                          })}
                          <Link
                            href={app.href}
                            onClick={close}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-accent hover:bg-accent-muted transition-colors"
                          >
                            {app.viewAll}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Combined ── */
export function AppNavMenu({ apps }: AppNavMenuProps) {
  return (
    <>
      <DesktopNav apps={apps} />
      <MobileNav apps={apps} />
    </>
  );
}
