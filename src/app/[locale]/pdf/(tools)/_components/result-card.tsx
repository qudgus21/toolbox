"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatSize } from "@/lib/utils";
import { CheckCircle, Download, RotateCcw, Pencil } from "lucide-react";
import { Button } from "@/lib/ui";
import { ShareToolButton } from "@/lib/ui/components/share-button";
import { useTrack, pdfEvents } from "@/lib/analytics";
import type { ProcessingResult } from "@/lib/pdf/types";

interface ResultCardProps {
  result: ProcessingResult;
  onDownload: (filename?: string) => void;
  onReset: () => void;
  downloadLabel?: string;
  resetLabel?: string;
  pagesLabel?: string;
  shareLabel?: string;
  shareTitle?: string;
  shareSubtitle?: string;
  shareCopyLabel?: string;
  shareCopiedLabel?: string;
  className?: string;
  toolSlug: string;
}

export function ResultCard({
  result,
  onDownload,
  onReset,
  downloadLabel = "Download",
  resetLabel = "Start over",
  pagesLabel = "pages",
  shareLabel = "Share",
  shareTitle = "Share this page",
  shareSubtitle = "Spread the word!",
  shareCopyLabel = "Copy link",
  shareCopiedLabel = "Copied!",
  className,
  toolSlug,
}: ResultCardProps) {
  const track = useTrack("pdf", pdfEvents);
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
      className={cn(
        "relative rounded-2xl border border-success/30 bg-success-muted p-6 text-center",
        className,
      )}
    >
      {/* Share — 우상단 */}
      <div className="absolute right-4 top-4">
        <ShareToolButton
          label={shareLabel}
          shareTitle={shareTitle}
          shareSubtitle={shareSubtitle}
          copyLabel={shareCopyLabel}
          copiedLabel={shareCopiedLabel}
          app="pdf"
          toolSlug={toolSlug}
        />
      </div>

      <CheckCircle className="mx-auto h-12 w-12 text-success" />

      {/* 파일명 (편집 가능) */}
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

      {/* 파일 정보 */}
      <p className="mt-1 text-sm text-foreground-muted">
        {formatSize(result.size)}
        {result.pageCount != null && ` · ${result.pageCount} ${pagesLabel}`}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button variant="accent" size="lg" onClick={() => { onDownload(filename); track.downloadClick({ tool_slug: toolSlug, file_size_kb: Math.round(result.size / 1024) }); }}>
          <Download className="mr-2 h-4 w-4" />
          {downloadLabel}
        </Button>
        <Button variant="ghost" size="lg" onClick={() => { track.resetClick({ tool_slug: toolSlug }); onReset(); }}>
          <RotateCcw className="mr-2 h-4 w-4" />
          {resetLabel}
        </Button>
      </div>
    </motion.div>
  );
}
