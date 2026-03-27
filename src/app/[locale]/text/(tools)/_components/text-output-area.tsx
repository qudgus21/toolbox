"use client";

import { useCallback } from "react";
import { Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

interface TextOutputAreaProps {
  value: string;
  label?: string;
  copyLabel: string;
  copiedLabel: string;
  downloadLabel?: string;
  className?: string;
  onCopy?: (length: number) => void;
  onDownload?: (length: number) => void;
}

export function TextOutputArea({
  value,
  label,
  copyLabel,
  copiedLabel,
  downloadLabel,
  className,
  onCopy,
  onDownload,
}: TextOutputAreaProps) {
  const handleDownload = useCallback(() => {
    if (!value) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.(value.length);
  }, [value, onDownload]);

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all duration-200",
        "border border-accent/25 bg-gradient-to-b from-accent/[0.03] to-transparent",
        "hover:shadow-md hover:border-accent/40",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-accent/10 to-accent/[0.03] px-4 py-2.5 border-b border-accent/15">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          {label}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <>
              <CopyButton
                text={value}
                label={copyLabel}
                copiedLabel={copiedLabel}
                onCopied={() => onCopy?.(value.length)}
              />
              {downloadLabel && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground-muted hover:text-accent hover:bg-accent/8 transition-all duration-150 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{downloadLabel}</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Output textarea */}
      <textarea
        value={value}
        readOnly
        className="min-h-[300px] flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none cursor-default"
        spellCheck={false}
      />
    </div>
  );
}
