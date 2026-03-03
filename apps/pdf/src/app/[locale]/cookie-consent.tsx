"use client";

import { useState, useEffect } from "react";
import type { Dictionary } from "@toolbox/i18n";

export function CookieConsent({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function respond(value: "accepted" | "declined") {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-foreground/80">{dict.cookie.message}</p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => respond("declined")}
            className="rounded-md border border-border px-4 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-foreground/5"
          >
            {dict.cookie.decline}
          </button>
          <button
            onClick={() => respond("accepted")}
            className="rounded-md bg-accent px-4 py-1.5 text-sm text-white transition-colors hover:bg-accent/90"
          >
            {dict.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
