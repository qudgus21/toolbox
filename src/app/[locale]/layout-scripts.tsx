"use client";

import { useEffect } from "react";

interface LayoutScriptsProps {
  locale: string;
  dir: "ltr" | "rtl";
}

export function LayoutScripts({ locale, dir }: LayoutScriptsProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (
        t === "dark" ||
        (!t && window.matchMedia("(prefers-color-scheme:dark)").matches)
      ) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {
      // ignore
    }
  }, []);

  return null;
}
