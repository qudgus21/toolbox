"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { sendEvent } from "@/lib/analytics";

function detectApp(pathname: string): string {
  if (pathname.match(/^\/[^/]+\/pdf(\/|$)/)) return "pdf";
  if (pathname.match(/^\/[^/]+\/image(\/|$)/)) return "image";
  return "landing";
}

interface ThemeToggleProps {
  app?: string;
}

export function ThemeToggle({ app }: ThemeToggleProps) {
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
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sendEvent("theme_toggle", { app: resolvedApp, theme: next });
  }

  return (
    <button
      onClick={toggle}
      className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
