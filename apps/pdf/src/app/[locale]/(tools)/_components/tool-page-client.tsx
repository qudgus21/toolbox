"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToolPageLayout, FileUploadZone } from "@toolbox/ui";
import {
  Plus,
  ArrowRight,
  ArrowDownAZ,
  ArrowUpZA,
  ArrowDown01,
  ArrowUp10,
  ChevronDown,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@toolbox/utils";
import { useToolProcessor } from "@/lib/use-tool-processor";
import { hasProcessor } from "@/lib/processor-registry";
import { addRecentTool, toggleFavorite, isFavorite } from "@toolbox/storage";
import { FileList } from "./file-list";
import { usePdfPageCounts } from "./use-pdf-page-counts";
import { ProcessingOverlay } from "./processing-overlay";
import { ResultCard } from "./result-card";
import { ErrorMessage } from "./error-message";
import { RelatedTools } from "./related-tools";
import { PageSelectorModal } from "./page-selector-modal";
import { fileId } from "./file-list";
import type { ReactNode } from "react";

interface CommonLabels {
  backToAll: string;
  dropFiles: string;
  acceptedFormats: string;
  processing: string;
  download: string;
  startOver: string;
  addMoreFiles: string;
  process: string;
  tryAgain: string;
  notImplemented: string;
  filesSelected: string;
  filesSizeTotal: string;
  sortByName?: string;
  sortBySize?: string;
  tryOtherTools?: string;
  privacyBadge?: string;
  encryptedFile?: string;
  clickToSelectPages?: string;
  dragToReorder?: string;
}

interface ToolPageClientProps {
  slug: string;
  locale: string;
  title: string;
  description: string;
  acceptedTypes: string;
  backHref: string;
  labels: CommonLabels;
  children?: ReactNode;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const transition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const };

type SortOption = "name-asc" | "name-desc" | "size-asc" | "size-desc";

const sortOptions: { value: SortOption; icon: typeof ArrowDownAZ; label: string }[] = [
  { value: "name-asc", icon: ArrowDownAZ, label: "A → Z" },
  { value: "name-desc", icon: ArrowUpZA, label: "Z → A" },
  { value: "size-asc", icon: ArrowDown01, label: "Size ↑" },
  { value: "size-desc", icon: ArrowUp10, label: "Size ↓" },
];

export function ToolPageClient({
  slug,
  locale,
  title,
  description,
  acceptedTypes,
  backHref,
  labels,
  children,
}: ToolPageClientProps) {
  const {
    stage,
    files,
    rotations,
    pageSelections,
    progress,
    result,
    error,
    addFiles,
    removeFile,
    reorderFiles,
    rotateFile,
    setPageSelection,
    sortFiles,
    process: processFiles,
    download,
    reset,
  } = useToolProcessor(slug);

  const { pageCounts, totalPages, encryptedFiles } = usePdfPageCounts(files);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [pageSelectorFile, setPageSelectorFile] = useState<File | null>(null);
  const [fav, setFav] = useState<boolean | null>(null);
  const implemented = hasProcessor(slug);
  const autoDownloadedRef = useRef(false);

  useEffect(() => {
    setFav(isFavorite(slug));
  }, [slug]);

  // 자동 다운로드: done 전환 시 한 번만
  useEffect(() => {
    if (stage === "done" && result && !autoDownloadedRef.current) {
      autoDownloadedRef.current = true;
      const timer = setTimeout(() => download(), 500);
      return () => clearTimeout(timer);
    }
    if (stage !== "done") {
      autoDownloadedRef.current = false;
    }
  }, [stage, result, download]);

  const handleAddMore = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedTypes;
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) addFiles(Array.from(target.files));
    };
    input.click();
  };

  return (
    <ToolPageLayout
      title={title}
      description={description}
      backHref={backHref}
      backLabel={labels.backToAll}
      action={fav !== null ? (
        <button
          type="button"
          onClick={() => { toggleFavorite(slug); setFav(!fav); }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-background-muted transition-colors cursor-pointer"
          aria-label="Toggle favorite"
        >
          <Star
            className={cn(
              "h-4 w-4 transition-colors",
              fav ? "fill-amber-400 text-amber-400" : "text-foreground-subtle hover:text-amber-400",
            )}
          />
        </button>
      ) : undefined}
    >
      <AnimatePresence mode="wait">
        {/* Stage: idle */}
        {stage === "idle" && (
          <motion.div key="idle" {...fadeSlide} transition={transition}>
            {!implemented && (
              <div className="mb-6 rounded-xl border border-warning/30 bg-warning-muted px-4 py-3 text-center text-sm text-foreground-muted">
                {labels.notImplemented}
              </div>
            )}
            <FileUploadZone
              accept={acceptedTypes}
              onFiles={addFiles}
              title={labels.dropFiles}
              description={`${labels.acceptedFormats}: ${acceptedTypes}`}
            />
            {labels.privacyBadge && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground-subtle">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                <span>{labels.privacyBadge}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Stage: loaded */}
        {stage === "loaded" && (
          <motion.div
            key="loaded"
            {...fadeSlide}
            transition={transition}
            className="space-y-4"
          >
            {/* 툴바 */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-foreground-muted">
                <span className="text-foreground font-semibold">{files.length}</span>{" "}
                {labels.filesSelected}
                {totalPages > 0 && (() => {
                  const effectivePages = files.reduce((sum, f) => {
                    const key = fileId(f);
                    const sel = pageSelections[key];
                    return sum + (sel ? sel.length : (pageCounts[key] ?? 0));
                  }, 0);
                  return (
                    <span className="ml-1 text-foreground-subtle">
                      · {effectivePages !== totalPages ? (
                        <><span className="text-accent font-bold">{effectivePages}</span>/{totalPages}p</>
                      ) : (
                        `${totalPages}p`
                      )}
                    </span>
                  );
                })()}
                <span className="ml-1 text-foreground-subtle">
                  · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                </span>
              </p>

              <div className="flex items-center gap-2">
                {/* 정렬 드롭다운 */}
                {files.length > 1 && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortMenuOpen(!sortMenuOpen)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-sm font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
                    >
                      <ArrowDownAZ className="h-3.5 w-3.5" />
                      {labels.sortByName ?? "Sort"}
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          sortMenuOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {sortMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setSortMenuOpen(false)}
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
                                    sortFiles(opt.value);
                                    setSortMenuOpen(false);
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
                )}

                {/* 파일 추가 */}
                <button
                  type="button"
                  onClick={handleAddMore}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-sm font-bold text-accent hover:border-accent/40 hover:bg-accent-muted transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {labels.addMoreFiles}
                </button>
              </div>
            </div>

            {/* 파일 카드 그리드 */}
            <FileList
              files={files}
              rotations={rotations}
              pageCounts={pageCounts}
              pageSelections={pageSelections}
              encryptedFiles={encryptedFiles}
              encryptedLabel={labels.encryptedFile}
              selectPagesTooltip={labels.clickToSelectPages}
              onRemove={removeFile}
              onReorder={reorderFiles}
              onRotate={rotateFile}
              onCardClick={(file) => setPageSelectorFile(file)}
            />

            {/* 도구별 옵션 UI 슬롯 */}
            {children}

            {/* 하단 버튼 여백 확보 */}
            <div className="h-24" />

            {/* 하단 고정 실행 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-muted bg-background/90 backdrop-blur-sm px-4 py-3">
              <div className="mx-auto max-w-md">
                <button
                  type="button"
                  onClick={() => { addRecentTool(slug); processFiles({ rotations, pageSelections }); }}
                  disabled={!implemented}
                  className={cn(
                    "group w-full overflow-hidden rounded-xl px-6 py-4 text-base font-bold",
                    "bg-accent text-accent-foreground shadow-md",
                    "hover:shadow-xl hover:brightness-110 active:scale-[0.98]",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "transition-all duration-200 cursor-pointer",
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    {title} {labels.process}
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stage: processing */}
        {stage === "processing" && (
          <motion.div key="processing" {...fadeSlide} transition={transition}>
            <ProcessingOverlay progress={progress} label={labels.processing} />
          </motion.div>
        )}

        {/* Stage: done */}
        {stage === "done" && result && (
          <motion.div key="done" {...fadeSlide} transition={transition}>
            <ResultCard
              result={result}
              onDownload={download}
              onReset={reset}
              downloadLabel={labels.download}
              resetLabel={labels.startOver}
            />
            <RelatedTools
              currentSlug={slug}
              locale={locale}
              title={labels.tryOtherTools}
            />
          </motion.div>
        )}

        {/* Stage: error */}
        {stage === "error" && (
          <motion.div key="error" {...fadeSlide} transition={transition}>
            <ErrorMessage
              message={error ?? "Unknown error"}
              onRetry={reset}
              retryLabel={labels.tryAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 페이지 선택 모달 */}
      {pageSelectorFile && pageCounts[fileId(pageSelectorFile)] && (
        <PageSelectorModal
          file={pageSelectorFile}
          totalPages={pageCounts[fileId(pageSelectorFile)]}
          selectedPages={pageSelections[fileId(pageSelectorFile)] ?? null}
          onConfirm={(pages) => {
            setPageSelection(fileId(pageSelectorFile), pages);
            setPageSelectorFile(null);
          }}
          onClose={() => setPageSelectorFile(null)}
          labels={{ dragToReorder: labels.dragToReorder }}
        />
      )}
    </ToolPageLayout>
  );
}
