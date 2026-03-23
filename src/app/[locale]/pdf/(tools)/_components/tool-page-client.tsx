"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ToolPageLayout, FileUploadZone } from "@/lib/ui";
import {
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolProcessor } from "@/lib/pdf/use-tool-processor";
import { usePdfPageCounts } from "./use-pdf-page-counts";
import { ProcessingOverlay } from "./processing-overlay";
import { ResultCard } from "./result-card";
import { ErrorMessage } from "./error-message";
import { RelatedTools } from "./related-tools";
import { PageSelectorModal } from "./page-selector-modal";
import { fileId } from "./file-list";
import { useToolState } from "./use-tool-state";
import { ToolLoadedContent } from "./tool-loaded-content";
import { sendEvent } from "@/lib/analytics";

import type { ToolPageClientProps } from "./tool-page-types";

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const transition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const };

export type { ToolPageClientProps };

export function ToolPageClient({
  slug,
  locale,
  title,
  description,
  acceptedTypes,
  backHref,
  labels,
  splitLabels,
  compressLabels,
  deletePagesLabels,
  extractPagesLabels,
  pdfToJpgLabels,
  pdfToPngLabels,
  pdfToTextLabels,
  extractImagesLabels,
  jpgToPdfLabels,
  pngToPdfLabels,
  imageToPdfLabels,
  htmlToPdfLabels,
  scanToPdfLabels,
  organizePagesLabels,
  rotateLabels,
  resizeLabels,
  webOptimizeLabels,
  protectLabels,
  flattenLabels,
  cropLabels,
  editMetadataLabels,
  editPdfLabels,
  redactLabels,
  annotateLabels,
  signLabels,
  pageNumbersLabels,
  watermarkLabels,
  pagesPerSheetLabels,
  headerFooterLabels,
  overlayLabels,
  bookletLabels,
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
  const [pageSelectorFile, setPageSelectorFile] = useState<File | null>(null);
  const favToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (favToastTimerRef.current) clearTimeout(favToastTimerRef.current);
    };
  }, []);

  const toolState = useToolState({
    slug,
    files,
    rotations,
    pageSelections,
    pageCounts,
    totalPages,
    stage,
    result,
    download,
    reset,
    addFiles,
    removeFile,
    sortFiles,
    rotateFile,
    setPageSelection,
    acceptedTypes,
  });

  const {
    isSingleFileMode,
    isSplit,
    isDeletePages,
    isExtractPages,
    isExtractImages,
    isEditPdf,
    isCrop,
    isRedact,
    isAnnotate,
    isSign,
    implemented,
    fav,
    showFavHint,
    favToast,
    setFavToast,
    handleFavHintEnter,
    handleToggleFavorite,
    buildProcessOptions,
    getButtonLabel,
    isDisabled,
    getLayoutSize,
  } = toolState;

  return (
    <>
    <ToolPageLayout
      title={title}
      description={description}
      backHref={backHref}
      backLabel={labels.backToAll}
      linkComponent={Link}
      size={getLayoutSize(stage)}
      hideHeader={(isEditPdf || isCrop || isRedact || isAnnotate || isSign || headerFooterLabels) && stage === "loaded"}
      className={(isEditPdf || isCrop || isRedact || isAnnotate || isSign) && stage === "loaded" ? "!h-screen !min-h-0 !overflow-hidden !py-0 sm:!py-0 [&>div]:!px-0 [&>div]:!max-w-none [&>div>div:first-child]:!hidden" : undefined}
      action={fav !== null ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => handleToggleFavorite(labels.favoriteAdded, labels.favoriteRemoved)}
            onMouseEnter={handleFavHintEnter}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-background-muted transition-colors cursor-pointer"
            aria-label={fav ? labels.favoriteRemoved : labels.favoriteAdded}
            aria-pressed={fav}
          >
            <Star
              className={cn(
                "h-4 w-4 transition-colors",
                fav ? "fill-amber-400 text-amber-400" : "text-foreground-subtle hover:text-amber-400",
              )}
            />
          </button>
          <AnimatePresence>
            {showFavHint && labels.favHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-lg pointer-events-none"
              >
                {labels.favHint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
              multiple={!isSingleFileMode}
              onFiles={(f) => isSingleFileMode ? addFiles([f[0]]) : addFiles(f)}
              title={isSplit && splitLabels ? splitLabels.dropFile : isDeletePages && deletePagesLabels ? deletePagesLabels.dropFile : isExtractPages && extractPagesLabels ? extractPagesLabels.dropFile : isExtractImages && extractImagesLabels ? extractImagesLabels.dropFile : isEditPdf && editPdfLabels ? editPdfLabels.dropFile : isRedact && redactLabels ? redactLabels.dropFile : headerFooterLabels ? headerFooterLabels.dropFile : labels.dropFiles}
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
            className={(isEditPdf || isCrop || isRedact || isAnnotate || isSign) ? "h-full" : "space-y-4"}
          >
            <ToolLoadedContent
              labels={labels}
              splitLabels={splitLabels}
              compressLabels={compressLabels}
              deletePagesLabels={deletePagesLabels}
              extractPagesLabels={extractPagesLabels}
              pdfToJpgLabels={pdfToJpgLabels}
              pdfToPngLabels={pdfToPngLabels}
              pdfToTextLabels={pdfToTextLabels}
              extractImagesLabels={extractImagesLabels}
              jpgToPdfLabels={jpgToPdfLabels}
              pngToPdfLabels={pngToPdfLabels}
              imageToPdfLabels={imageToPdfLabels}
              htmlToPdfLabels={htmlToPdfLabels}
              scanToPdfLabels={scanToPdfLabels}
              organizePagesLabels={organizePagesLabels}
              rotateLabels={rotateLabels}
              resizeLabels={resizeLabels}
              webOptimizeLabels={webOptimizeLabels}
              protectLabels={protectLabels}
              flattenLabels={flattenLabels}
              cropLabels={cropLabels}
              editMetadataLabels={editMetadataLabels}
              editPdfLabels={editPdfLabels}
              redactLabels={redactLabels}
              annotateLabels={annotateLabels}
              signLabels={signLabels}
              pageNumbersLabels={pageNumbersLabels}
              watermarkLabels={watermarkLabels}
              pagesPerSheetLabels={pagesPerSheetLabels}
              headerFooterLabels={headerFooterLabels}
              overlayLabels={overlayLabels}
              bookletLabels={bookletLabels}
              files={files}
              rotations={rotations}
              pageSelections={pageSelections}
              pageCounts={pageCounts}
              totalPages={totalPages}
              encryptedFiles={encryptedFiles}
              removeFile={removeFile}
              reorderFiles={reorderFiles}
              rotateFile={rotateFile}
              setPageSelection={setPageSelection}
              sortFiles={sortFiles}
              reset={reset}
              toolState={toolState}
              setPageSelectorFile={setPageSelectorFile}
            >
              {children}
            </ToolLoadedContent>
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
              shareLabel={labels.share}
              shareTitle={labels.shareTitle}
              shareSubtitle={labels.shareSubtitle}
              shareCopyLabel={labels.shareCopyLink}
              shareCopiedLabel={labels.shareCopied}
              toolSlug={slug}
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
              message={error === "NO_IMAGES_FOUND" && extractImagesLabels ? extractImagesLabels.noImagesFound : error ?? "Unknown error"}
              onRetry={reset}
              retryLabel={labels.tryAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 고정 실행 버튼 — AnimatePresence 밖에서 CLS 방지 */}
      {stage === "loaded" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-muted bg-background/90 backdrop-blur-sm px-4 py-3" role="toolbar" aria-label="Actions">
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={() => {
                const options = buildProcessOptions();
                if (options !== null) {
                  sendEvent("process_click", { app: "pdf", tool_slug: slug, file_count: files.length });
                  processFiles(options);
                }
              }}
              disabled={isDisabled}
              className={cn(
                "group w-full overflow-hidden rounded-xl px-6 py-4 text-base font-bold",
                "bg-accent text-accent-foreground shadow-md",
                "hover:shadow-xl hover:brightness-110 active:scale-[0.98]",
                "disabled:pointer-events-none disabled:opacity-50",
                "transition-all duration-200 cursor-pointer",
              )}
            >
              <span className="flex items-center justify-center gap-2">
                {getButtonLabel({
                  title,
                  redactLabels,
                  editPdfLabels,
                  protectLabels,
                  editMetadataLabels,
                  webOptimizeLabels,
                  jpgToPdfLabels,
                  pngToPdfLabels,
                  imageToPdfLabels,
                  htmlToPdfLabels,
                  scanToPdfLabels,
                  pdfToJpgLabels,
                  pdfToPngLabels,
                  pdfToTextLabels,
                  flattenLabels,
                  cropLabels,
                  pageNumbersLabels,
                  annotateLabels,
                  signLabels,
                  watermarkLabels,
                })}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      )}

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

      {/* Favorite toast */}
      <AnimatePresence>
        {favToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={() => {
              if (favToastTimerRef.current) clearTimeout(favToastTimerRef.current);
              favToastTimerRef.current = setTimeout(() => setFavToast(null), 2000);
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg"
          >
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {favToast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
