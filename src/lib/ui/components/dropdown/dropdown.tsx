"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  accentColor?: "emerald" | "violet" | "blue";
  className?: string;
}

const ACCENT = {
  emerald: {
    focus: "border-emerald-500/60 ring-2 ring-emerald-500/10",
    active: "bg-emerald-500/8 text-emerald-700 dark:text-emerald-300",
    check: "text-emerald-500",
    hover: "hover:bg-emerald-500/6",
  },
  violet: {
    focus: "border-violet-500/60 ring-2 ring-violet-500/10",
    active: "bg-violet-500/8 text-violet-700 dark:text-violet-300",
    check: "text-violet-500",
    hover: "hover:bg-violet-500/6",
  },
  blue: {
    focus: "border-blue-500/60 ring-2 ring-blue-500/10",
    active: "bg-blue-500/8 text-blue-700 dark:text-blue-300",
    check: "text-blue-500",
    hover: "hover:bg-blue-500/6",
  },
} as const;

interface ListPos {
  top: number;
  left: number;
  width: number;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  label,
  id,
  accentColor = "blue",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [pos, setPos] = useState<ListPos>({ top: 0, left: 0, width: 0 });
  const accent = ACCENT[accentColor];

  const selected = options.find((o) => o.value === value);

  // Position the portal list below the trigger
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    });
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on resize only (not scroll — scroll inside list must work)
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focusedIndex < 0 || !listRef.current) return;
    const items = listRef.current.children;
    if (items[focusedIndex]) {
      (items[focusedIndex] as HTMLElement).scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, open]);

  // Reset focus index when opening
  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setFocusedIndex(idx >= 0 ? idx : 0);
    }
  }, [open, options, value]);

  const handleSelect = useCallback(
    (optValue: string) => {
      onChange?.(optValue);
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            handleSelect(options[focusedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [open, focusedIndex, options, handleSelect],
  );

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[10px] font-bold uppercase tracking-wider text-foreground-subtle mb-1.5 px-1"
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full h-9 items-center justify-between rounded-xl border border-border/60 bg-background-subtle/50 px-3 text-sm font-semibold text-foreground transition-all duration-150 cursor-pointer",
          open ? accent.focus : "hover:border-border hover:shadow-sm",
        )}
      >
        <span className={cn("truncate", !selected && "text-foreground-subtle/60")}>
          {selected?.label ?? placeholder ?? ""}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-foreground-muted/60 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown list — rendered via portal to escape overflow:hidden */}
      {open &&
        createPortal(
          <ul
            ref={listRef}
            role="listbox"
            style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width }}
            className="z-[9999] max-h-60 overflow-auto rounded-xl border border-border/60 bg-background shadow-xl shadow-black/8 dark:shadow-black/20 py-1 scrollbar-thin"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isFocused = i === focusedIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  onMouseEnter={() => setFocusedIndex(i)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors duration-100",
                    isSelected
                      ? cn("font-semibold", accent.active)
                      : "text-foreground",
                    isFocused && !isSelected && cn("bg-background-subtle/60", accent.hover),
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className={cn("h-3.5 w-3.5 shrink-0", accent.check)} />}
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}
