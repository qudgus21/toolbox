"use client";

import { Plus } from "lucide-react";
import { formatSize } from "@/lib/utils";
import { SortDropdown, type SortOption } from "./sort-dropdown";

interface MultiFileToolbarProps {
  files: File[];
  totalPages?: number;
  sortMenuOpen: boolean;
  onSortMenuOpenChange: (open: boolean) => void;
  onSort: (option: SortOption) => void;
  onAddMore: () => void;
  labels: {
    filesSelected: string;
    addMoreFiles: string;
    sortByName?: string;
  };
}

export function MultiFileToolbar({
  files,
  totalPages,
  sortMenuOpen,
  onSortMenuOpenChange,
  onSort,
  onAddMore,
  labels,
}: MultiFileToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold text-foreground-muted">
        <span className="text-foreground font-semibold">{files.length}</span>{" "}
        {labels.filesSelected}
        {totalPages !== undefined && totalPages > 0 && (
          <span className="ml-1 text-foreground-subtle">
            · {totalPages}p
          </span>
        )}
        <span className="ml-1 text-foreground-subtle">
          · {formatSize(files.reduce((s, f) => s + f.size, 0))}
        </span>
      </p>

      <div className="flex items-center gap-2">
        {files.length > 1 && (
          <SortDropdown
            open={sortMenuOpen}
            onOpenChange={onSortMenuOpenChange}
            onSort={onSort}
            sortLabel={labels.sortByName}
          />
        )}

        <button
          type="button"
          onClick={onAddMore}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-sm font-bold text-accent hover:border-accent/40 hover:bg-accent-muted transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          {labels.addMoreFiles}
        </button>
      </div>
    </div>
  );
}
