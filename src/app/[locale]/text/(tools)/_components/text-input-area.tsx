"use client";

import { useCallback, useRef } from "react";
import { X, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  labels: {
    clear: string;
  };
  className?: string;
}

export function TextInputArea({
  value,
  onChange,
  label,
  placeholder,
  readOnly = false,
  labels,
  className,
}: TextInputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClear = useCallback(() => {
    onChange("");
    textareaRef.current?.focus();
  }, [onChange]);

  return (
    <div
      className={cn(
        "group/input flex flex-col rounded-2xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-border",
        "focus-within:shadow-lg focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/10",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-background-subtle/80 to-background-subtle/40 px-4 py-2.5 border-b border-border/40">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Type className="h-3.5 w-3.5 text-accent" />
          {label}
        </span>
        <div className="flex items-center gap-0.5">
          {!readOnly && value && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:text-red-500 hover:bg-red-500/8 transition-all duration-150 cursor-pointer"
              title={labels.clear}
            >
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{labels.clear}</span>
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          "min-h-[300px] flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground-subtle/60 focus:outline-none",
          readOnly && "cursor-default",
        )}
        spellCheck={false}
      />
    </div>
  );
}
