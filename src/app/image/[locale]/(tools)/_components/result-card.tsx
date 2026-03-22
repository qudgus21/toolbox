"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Download, RotateCcw, Pencil } from "lucide-react";
import { cn, formatSize } from "@/lib/utils";
import type { ImageProcessingResult } from "@/lib/image/types";
import type { ImageDictionary } from "@/lib/i18n/image-config";

interface ResultCardProps {
  result: ImageProcessingResult;
  onDownload: (filename?: string) => void;
  onReset: () => void;
  labels: ImageDictionary["common"];
}

export function ResultCard({ result, onDownload, onReset, labels }: ResultCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [filename, setFilename] = useState(result.filename);

  const ext = result.filename.includes(".")
    ? `.${result.filename.split(".").pop()}`
    : "";
  const nameWithoutExt = filename.endsWith(ext)
    ? filename.slice(0, -ext.length)
    : filename;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-success/30 bg-success-muted p-6 text-center"
    >
      <CheckCircle className="mx-auto h-12 w-12 text-success" />

      {/* Preview */}
      {result.previewUrl && (
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.previewUrl}
            alt={filename}
            className="mx-auto max-h-64 object-contain"
          />
        </div>
      )}

      {/* Editable filename */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={nameWithoutExt}
              onChange={(e) => setFilename(e.target.value + ext)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsEditing(false);
              }}
              autoFocus
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-center text-base font-semibold text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
            <span className="text-sm text-foreground-muted">{ext}</span>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-foreground">
              {filename}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-foreground-subtle hover:text-foreground hover:bg-background transition-colors cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>

      {/* File info */}
      <p className="mt-1 text-sm text-foreground-muted">
        {formatSize(result.size)}
        {result.width && result.height && ` · ${result.width} × ${result.height}`}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() => onDownload(filename)}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200"
        >
          <Download className="h-4 w-4" />
          {labels.download}
        </button>
        <button
          onClick={onReset}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          {labels.startOver}
        </button>
      </div>
    </motion.div>
  );
}
