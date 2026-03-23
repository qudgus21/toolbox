"use client";

import { useEffect, useRef } from "react";

interface LayoutScriptsProps {
  locale: string;
  dir: "ltr" | "rtl";
  jsonLd?: Record<string, unknown>;
}

export function LayoutScripts({ locale, dir, jsonLd }: LayoutScriptsProps) {
  const jsonLdRef = useRef<HTMLScriptElement | null>(null);

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

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const register = () => navigator.serviceWorker.register("/pdf/sw.js", { scope: "/pdf/" });
      if ("requestIdleCallback" in window) {
        (window as Window).requestIdleCallback(register);
      } else {
        setTimeout(register, 3000);
      }
    }
  }, []);

  useEffect(() => {
    if (!jsonLd) return;
    const existing = document.querySelector('script[data-layout-jsonld]');
    if (existing) {
      existing.textContent = JSON.stringify(jsonLd);
      return;
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-layout-jsonld", "true");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    jsonLdRef.current = script;
    return () => {
      if (jsonLdRef.current) {
        jsonLdRef.current.remove();
        jsonLdRef.current = null;
      }
    };
  }, [jsonLd]);

  return null;
}
