"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { sendEvent } from "@/lib/analytics";

function detectApp(pathname: string): string {
  const match = pathname.match(/^\/[^/]+\/(pdf|image|text|converter|calculator)(\/|$)/);
  return match?.[1] ?? "landing";
}

interface ThemeToggleProps {
  app?: string;
  ariaLabel?: string;
}

export function ThemeToggle({ app, ariaLabel = "Toggle theme" }: ThemeToggleProps) {
  const pathname = usePathname();
  const resolvedApp = app ?? detectApp(pathname);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-transitioning", "");
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sendEvent("theme_toggle", { app: resolvedApp, theme: next });
    setTimeout(() => {
      document.documentElement.removeAttribute("data-transitioning");
    }, 150);
  }

  return (
    <button
      onClick={toggle}
      className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
      aria-label={ariaLabel}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
