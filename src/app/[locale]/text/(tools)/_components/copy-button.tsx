"use client";

import { useState, useCallback, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
  className?: string;
  variant?: "default" | "icon";
  onCopied?: () => void;
}

export function CopyButton({ text, label, copiedLabel, className, variant = "default", onCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopied?.();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [text, onCopied]);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center justify-center rounded-lg p-1.5 transition-all duration-200 cursor-pointer",
          copied
            ? "text-emerald-500 bg-emerald-500/10 scale-110"
            : "text-foreground-muted hover:text-accent hover:bg-accent/10",
          className,
        )}
        title={copied ? copiedLabel : label}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
        copied
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 scale-105"
          : "text-foreground-muted hover:text-accent hover:bg-accent/8",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  );
}
