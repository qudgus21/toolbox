"use client";

import { cn } from "@/lib/utils";
import { RotateCcw, Calendar } from "lucide-react";
import type { PdfMetadata } from "@/lib/pdf/processors/edit-metadata";

export interface EditMetadataLabels {
  dropFile: string;
  changeFile: string;
  titleLabel: string;
  authorLabel: string;
  subjectLabel: string;
  keywordsLabel: string;
  creatorLabel: string;
  producerLabel: string;
  createdAtLabel: string;
  modifiedAtLabel: string;
  keywordsPlaceholder: string;
  clearAll: string;
  applyButton: string;
  noMetadata: string;
  editableFields: string;
  readonlyFields: string;
  notSet: string;
}

interface EditMetadataOptionsProps {
  metadata: PdfMetadata;
  original: PdfMetadata | null;
  onChange: (field: keyof PdfMetadata, value: string) => void;
  onClearAll: () => void;
  labels: EditMetadataLabels;
  loading?: boolean;
}

const editableFields = [
  "title",
  "author",
  "subject",
  "keywords",
  "creator",
  "producer",
] as const;

/** ISO → datetime-local input value (YYYY-MM-DDTHH:mm) */
function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
}

/** datetime-local value → ISO string */
function fromDatetimeLocal(val: string): string {
  if (!val) return "";
  try {
    return new Date(val).toISOString();
  } catch {
    return "";
  }
}

export function EditMetadataOptions({
  metadata,
  original,
  onChange,
  onClearAll,
  labels,
  loading,
}: EditMetadataOptionsProps) {
  const fieldLabels: Record<string, string> = {
    title: labels.titleLabel,
    author: labels.authorLabel,
    subject: labels.subjectLabel,
    keywords: labels.keywordsLabel,
    creator: labels.creatorLabel,
    producer: labels.producerLabel,
  };

  const hasChanges =
    original != null &&
    (editableFields.some((f) => metadata[f] !== original[f]) ||
      metadata.creationDate !== original.creationDate ||
      metadata.modificationDate !== original.modificationDate);

  return (
    <div className="space-y-5">
      {/* Editable fields */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.editableFields}
        </p>

        {editableFields.map((field) => {
          const changed =
            original != null && metadata[field] !== original[field];
          return (
            <div key={field} className="space-y-1">
              <label
                htmlFor={`meta-${field}`}
                className="text-xs font-semibold text-foreground-muted"
              >
                {fieldLabels[field]}
              </label>
              {field === "keywords" ? (
                <textarea
                  id={`meta-${field}`}
                  value={metadata[field]}
                  onChange={(e) => onChange(field, e.target.value)}
                  placeholder={labels.keywordsPlaceholder}
                  rows={2}
                  disabled={loading}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-sm bg-background-elevated text-foreground placeholder:text-foreground-subtle/50",
                    "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors resize-none",
                    changed
                      ? "border-accent/50 bg-accent-muted/20"
                      : "border-border",
                  )}
                />
              ) : (
                <input
                  id={`meta-${field}`}
                  type="text"
                  value={metadata[field]}
                  onChange={(e) => onChange(field, e.target.value)}
                  disabled={loading}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-sm bg-background-elevated text-foreground placeholder:text-foreground-subtle/50",
                    "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors",
                    changed
                      ? "border-accent/50 bg-accent-muted/20"
                      : "border-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Date fields */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {labels.readonlyFields}
        </p>

        <div className="space-y-1">
          <label
            htmlFor="meta-creationDate"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground-muted"
          >
            <Calendar className="h-3 w-3" />
            {labels.createdAtLabel}
          </label>
          <input
            id="meta-creationDate"
            type="datetime-local"
            value={toDatetimeLocal(metadata.creationDate)}
            onChange={(e) =>
              onChange("creationDate", fromDatetimeLocal(e.target.value))
            }
            disabled={loading}
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-sm bg-background-elevated text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors",
              original != null &&
                metadata.creationDate !== original.creationDate
                ? "border-accent/50 bg-accent-muted/20"
                : "border-border",
            )}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="meta-modificationDate"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground-muted"
          >
            <Calendar className="h-3 w-3" />
            {labels.modifiedAtLabel}
          </label>
          <input
            id="meta-modificationDate"
            type="datetime-local"
            value={toDatetimeLocal(metadata.modificationDate)}
            onChange={(e) =>
              onChange(
                "modificationDate",
                fromDatetimeLocal(e.target.value),
              )
            }
            disabled={loading}
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-sm bg-background-elevated text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors",
              original != null &&
                metadata.modificationDate !== original.modificationDate
                ? "border-accent/50 bg-accent-muted/20"
                : "border-border",
            )}
          />
        </div>
      </div>

      {/* Clear all */}
      <div className="pt-2 border-t border-border">
        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasChanges && !editableFields.some((f) => metadata[f])}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="h-3 w-3" />
          {labels.clearAll}
        </button>
      </div>
    </div>
  );
}
