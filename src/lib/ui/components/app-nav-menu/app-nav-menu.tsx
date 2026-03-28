"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { appIconMap } from "@/lib/app-icons";

export interface NavApp {
  slug: string;
  label: string;
  href: string;
}

interface AppNavMenuProps {
  apps: NavApp[];
  menuLabel?: string;
}

/* ── Desktop nav ── */
function DesktopNav({ apps }: AppNavMenuProps) {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {apps.map((app) => {
        const AppIcon = appIconMap[app.slug];
        return (
          <Link
            key={app.slug}
            href={app.href}
            className="flex items-center gap-2 px-3.5 py-2 text-lg font-semibold text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-background-muted"
          >
            {AppIcon && <AppIcon className="h-5 w-auto shrink-0" />}
            <span>{app.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

/* ── Mobile slide-down nav ── */
function MobileNav({ apps, menuLabel = "Menu" }: AppNavMenuProps) {
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
        aria-label={menuLabel}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* backdrop */}
      <div
        className={`fixed inset-0 top-[72px] z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-150 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />
      {/* panel */}
      <div
        className={`fixed left-0 right-0 top-[72px] z-50 border-b border-border bg-background shadow-xl max-h-[70vh] overflow-y-auto transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {apps.map((app) => {
            const AppIcon = appIconMap[app.slug];
            return (
              <Link
                key={app.slug}
                href={app.href}
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-background-muted transition-colors"
              >
                {AppIcon && <AppIcon className="h-6 w-auto shrink-0" />}
                <span>{app.label}</span>
                <ArrowRight className="h-4 w-4 ml-auto text-foreground-subtle" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Combined ── */
export function AppNavMenu({ apps, menuLabel }: AppNavMenuProps) {
  return (
    <>
      <DesktopNav apps={apps} />
      <MobileNav apps={apps} menuLabel={menuLabel} />
    </>
  );
}
