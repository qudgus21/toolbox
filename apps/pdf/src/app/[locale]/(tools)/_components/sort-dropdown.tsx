"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownAZ,
  ArrowUpZA,
  ArrowDown01,
  ArrowUp10,
  ChevronDown,
} from "lucide-react";
import { cn } from "@toolbox/utils";

export type SortOption = "name-asc" | "name-desc" | "size-asc" | "size-desc";

const sortOptions: { value: SortOption; icon: typeof ArrowDownAZ; label: string }[] = [
  { value: "name-asc", icon: ArrowDownAZ, label: "A → Z" },
  { value: "name-desc", icon: ArrowUpZA, label: "Z → A" },
  { value: "size-asc", icon: ArrowDown01, label: "Size ↑" },
  { value: "size-desc", icon: ArrowUp10, label: "Size ↓" },
];

interface SortDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSort: (option: SortOption) => void;
  sortLabel?: string;
}

export function SortDropdown({ open, onOpenChange, onSort, sortLabel }: SortDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-sm font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowDownAZ className="h-3.5 w-3.5" />
        {sortLabel ?? "Sort"}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => onOpenChange(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-border-muted bg-background-elevated shadow-lg"
            >
              {sortOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSort(opt.value);
                      onOpenChange(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground-muted hover:bg-accent-muted hover:text-accent transition-colors cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                    {opt.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
