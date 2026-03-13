"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import { SplitOptions } from "./split-options";
import { SplitPagePreview } from "./split-page-preview";
import { CompressOptions } from "./compress-options";
import { DeletePagesPreview } from "./delete-pages-preview";
import { DeletePagesOptions } from "./delete-pages-options";
import { ExtractPagesPreview } from "./extract-pages-preview";
import { ExtractPagesOptions } from "./extract-pages-options";
import { PdfToJpgOptions, type PdfToJpgLabels } from "./pdf-to-jpg-options";
import { PdfToPngOptions, type PdfToPngLabels } from "./pdf-to-png-options";
import { PdfToTextOptions, type PdfToTextLabels } from "./pdf-to-text-options";
import { ExtractImagesOptions, type ExtractImagesLabels } from "./extract-images-options";
import { JpgToPdfOptions, type JpgToPdfLabels } from "./jpg-to-pdf-options";
import { PngToPdfOptions, type PngToPdfLabels } from "./png-to-pdf-options";
import { ImageToPdfOptions, type ImageToPdfLabels } from "./image-to-pdf-options";
import { HtmlToPdfOptions, type HtmlToPdfLabels } from "./html-to-pdf-options";
import { ScanToPdfOptions, type ScanToPdfLabels } from "./scan-to-pdf-options";
import { OrganizePagesPreview, type OrganizePageEntry } from "./organize-pages-preview";
import { OrganizePagesOptions, type OrganizePagesLabels } from "./organize-pages-options";
import { RotateOptions, type RotateLabels } from "./rotate-options";
import { EditMetadataOptions, type EditMetadataLabels } from "./edit-metadata-options";
import { ResizeOptions, MARGIN_VALUES, type ResizeLabels, type MarginPreset } from "./resize-options";
import { WebOptimizeOptions, type WebOptimizeLabels } from "./web-optimize-options";
import type { PageSizePreset, ScaleMode, Unit } from "@/lib/processors/resize";
import { usePdfMetadata } from "./use-pdf-metadata";
import type { PdfMetadata } from "@/lib/processors/edit-metadata";
import type { PageSizeKey, Orientation } from "@/lib/processors/jpg-to-pdf";
import type { FileBreak } from "@/lib/processors/html-to-pdf";
import type { ScanColorMode } from "@/lib/processors/scan-to-pdf";

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
  favHint?: string;
  favoriteAdded?: string;
  favoriteRemoved?: string;
}

interface SplitLabels {
  tabRange: string;
  tabExtract: string;
  tabSize: string;
  rangeCustom: string;
  rangeFixed: string;
  addRange: string;
  from: string;
  to: string;
  everyNPages: string;
  mergeIntoOne: string;
  extractAll: string;
  extractSelect: string;
  pagesPlaceholder: string;
  maxFileSize: string;
  originalSize: string;
  totalPages: string;
  filesCreated: string;
  fileSelected: string;
  changeFile: string;
  dropFile: string;
  pages: string;
  rangeLabel: string;
  errorFromGreaterThanTo: string;
  errorEmptyValue: string;
}

interface CompressLabels {
  levelExtreme: string;
  levelExtremeDesc: string;
  levelRecommended: string;
  levelRecommendedDesc: string;
  levelLess: string;
  levelLessDesc: string;
  originalSize: string;
  compressedSize: string;
  reduction: string;
  modeImage: string;
  modeImageDesc: string;
  modeRasterize: string;
  modeRasterizeDesc: string;
  rasterizeWarning: string;
}

interface DeletePagesLabels {
  dropFile: string;
  changeFile: string;
  pagesToDelete: string;
  pagesPlaceholder: string;
  selectAll: string;
  deselectAll: string;
  selectOdd: string;
  selectEven: string;
  willBeDeleted: string;
  willRemain: string;
  pages: string;
  noPageSelected: string;
  cannotDeleteAll: string;
}

interface ExtractPagesLabels {
  dropFile: string;
  changeFile: string;
  pagesToExtract: string;
  pagesPlaceholder: string;
  selectAll: string;
  deselectAll: string;
  selectOdd: string;
  selectEven: string;
  willBeExtracted: string;
  willRemain: string;
  pages: string;
  noPageSelected: string;
  cannotExtractAll: string;
  pageOf: string;
  addPage: string;
  removePage: string;
  selectedPages: string;
  dragToReorder: string;
}

interface ToolPageClientProps {
  slug: string;
  locale: string;
  title: string;
  description: string;
  acceptedTypes: string;
  backHref: string;
  labels: CommonLabels;
  splitLabels?: SplitLabels;
  compressLabels?: CompressLabels;
  deletePagesLabels?: DeletePagesLabels;
  extractPagesLabels?: ExtractPagesLabels;
  pdfToJpgLabels?: PdfToJpgLabels;
  pdfToPngLabels?: PdfToPngLabels;
  pdfToTextLabels?: PdfToTextLabels;
  extractImagesLabels?: ExtractImagesLabels;
  jpgToPdfLabels?: JpgToPdfLabels;
  pngToPdfLabels?: PngToPdfLabels;
  imageToPdfLabels?: ImageToPdfLabels;
  htmlToPdfLabels?: HtmlToPdfLabels;
  scanToPdfLabels?: ScanToPdfLabels;
  organizePagesLabels?: OrganizePagesLabels;
  rotateLabels?: RotateLabels;
  resizeLabels?: ResizeLabels;
  webOptimizeLabels?: WebOptimizeLabels;
  editMetadataLabels?: EditMetadataLabels;
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
  editMetadataLabels,
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
  const [showFavHint, setShowFavHint] = useState(false);
  const [favToast, setFavToast] = useState<string | null>(null);

  const handleFavHintEnter = useCallback(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("fav-hint-seen")) return;
    setShowFavHint(true);
    localStorage.setItem("fav-hint-seen", "1");
  }, []);

  useEffect(() => {
    if (!showFavHint) return;
    const t = setTimeout(() => setShowFavHint(false), 2500);
    return () => clearTimeout(t);
  }, [showFavHint]);

  const [splitOptions, setSplitOptions] = useState<Record<string, unknown>>({ mode: "range" });
  const splitSetRangesRef = useRef<((ranges: { from: number; to: number }[]) => void) | null>(null);
  const splitSetExtractPagesRef = useRef<((pages: number[]) => void) | null>(null);
  const splitValidateRef = useRef<(() => boolean) | null>(null);
  const [compressOptions, setCompressOptions] = useState<Record<string, unknown>>({ compressionLevel: "recommended" });
  const [webOptimizeOptions, setWebOptimizeOptions] = useState<Record<string, unknown>>({ preset: "screen", images: true, metadata: true, jsActions: true, forms: true, annotations: false, thumbnails: true, streams: true });
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set());
  const [deletePageOrder, setDeletePageOrder] = useState<number[]>([]);
  const [extractedPages, setExtractedPages] = useState<Set<number>>(new Set());
  const [extractPageOrder, setExtractPageOrder] = useState<number[]>([]);
  const [jpgQuality, setJpgQuality] = useState<"high" | "medium" | "low">("high");
  const [pngQuality, setPngQuality] = useState<"high" | "medium" | "low">("high");
  const [jpgToPdfOrientation, setJpgToPdfOrientation] = useState<Orientation>("portrait");
  const [jpgToPdfPageSize, setJpgToPdfPageSize] = useState<PageSizeKey>("a4");
  const [jpgToPdfMarginMm, setJpgToPdfMarginMm] = useState(0);
  const [jpgToPdfMergeAll, setJpgToPdfMergeAll] = useState(true);
  const [pngToPdfOrientation, setPngToPdfOrientation] = useState<Orientation>("portrait");
  const [pngToPdfPageSize, setPngToPdfPageSize] = useState<PageSizeKey>("a4");
  const [pngToPdfMarginMm, setPngToPdfMarginMm] = useState(0);
  const [pngToPdfMergeAll, setPngToPdfMergeAll] = useState(true);
  const [imageToPdfOrientation, setImageToPdfOrientation] = useState<Orientation>("portrait");
  const [imageToPdfPageSize, setImageToPdfPageSize] = useState<PageSizeKey>("a4");
  const [imageToPdfMarginMm, setImageToPdfMarginMm] = useState(0);
  const [imageToPdfMergeAll, setImageToPdfMergeAll] = useState(true);
  const [htmlToPdfOrientation, setHtmlToPdfOrientation] = useState<Orientation>("portrait");
  const [htmlToPdfPageSize, setHtmlToPdfPageSize] = useState<PageSizeKey>("a4");
  const [htmlToPdfMarginMm, setHtmlToPdfMarginMm] = useState(0);
  const [htmlToPdfMergeAll, setHtmlToPdfMergeAll] = useState(true);
  const [htmlToPdfFileBreak, setHtmlToPdfFileBreak] = useState<FileBreak>("new-page");
  const [htmlToPdfFileGapMm, setHtmlToPdfFileGapMm] = useState(10);
  const [scanToPdfOrientation, setScanToPdfOrientation] = useState<Orientation>("portrait");
  const [scanToPdfPageSize, setScanToPdfPageSize] = useState<PageSizeKey>("a4");
  const [scanToPdfMarginMm, setScanToPdfMarginMm] = useState(0);
  const [scanToPdfMergeAll, setScanToPdfMergeAll] = useState(true);
  const [scanToPdfAutoEnhance, setScanToPdfAutoEnhance] = useState(true);
  const [scanToPdfColorMode, setScanToPdfColorMode] = useState<ScanColorMode>("grayscale");
  const [organizePages, setOrganizePages] = useState<OrganizePageEntry[]>([]);
  const [resizePreset, setResizePreset] = useState<PageSizePreset | "custom">("a4");
  const [resizeCustomW, setResizeCustomW] = useState(210);
  const [resizeCustomH, setResizeCustomH] = useState(297);
  const [resizeUnit, setResizeUnit] = useState<Unit>("mm");
  const [resizeOrientation, setResizeOrientation] = useState<"portrait" | "landscape">("portrait");
  const [resizeScaleMode, setResizeScaleMode] = useState<ScaleMode>("fit");
  const [resizeMarginPreset, setResizeMarginPreset] = useState<MarginPreset>("none");
  const implemented = hasProcessor(slug);
  const autoDownloadedRef = useRef(false);
  const isSplit = slug === "split";
  const isCompress = slug === "compress";
  const isDeletePages = slug === "delete-pages";
  const isExtractPages = slug === "extract-pages";
  const isPdfToJpg = slug === "pdf-to-jpg";
  const isPdfToPng = slug === "pdf-to-png";
  const isPdfToText = slug === "pdf-to-text";
  const isExtractImages = slug === "extract-images";
  const isJpgToPdf = slug === "jpg-to-pdf";
  const isPngToPdf = slug === "png-to-pdf";
  const isImageToPdf = slug === "image-to-pdf";
  const isHtmlToPdf = slug === "html-to-pdf";
  const isScanToPdf = slug === "scan-to-pdf";
  const isOrganizePages = slug === "organize-pages";
  const isRotate = slug === "rotate";
  const isResize = slug === "resize";
  const isWebOptimize = slug === "web-optimize";
  const isGrayscale = slug === "grayscale";
  const isEditMetadata = slug === "edit-metadata";
  const isSingleFileMode = isSplit || isDeletePages || isExtractPages || isExtractImages || isPdfToText || isOrganizePages || isEditMetadata;

  const [editedMetadata, setEditedMetadata] = useState<PdfMetadata | null>(null);
  const { metadata: originalMetadata, loading: metadataLoading } = usePdfMetadata(
    isEditMetadata && files.length > 0 ? files[0] : null,
  );
  useEffect(() => {
    if (originalMetadata) {
      setEditedMetadata({ ...originalMetadata });
    }
  }, [originalMetadata]);

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
    input.multiple = !isSingleFileMode;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        if (isSingleFileMode) {
          reset();
          setDeletedPages(new Set());
          setDeletePageOrder([]);
          setExtractedPages(new Set());
          setExtractPageOrder([]);
          setOrganizePages([]);

          setTimeout(() => addFiles(Array.from(target.files!)), 0);
        } else {
          addFiles(Array.from(target.files));
        }
      }
    };
    input.click();
  };

  const handleSingleFileChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedTypes;
    input.multiple = false;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.length) {
        reset();
        if (isDeletePages) { setDeletedPages(new Set()); setDeletePageOrder([]); }
        if (isExtractPages) { setExtractedPages(new Set()); setExtractPageOrder([]); }
        if (isOrganizePages) { setOrganizePages([]); }
        setTimeout(() => addFiles([target.files![0]]), 0);
      }
    };
    input.click();
  };

  const handleToggleDeletePage = useCallback((pageNum: number) => {
    setDeletedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      return next;
    });
  }, []);

  const handleToggleExtractPage = useCallback((pageNum: number) => {
    setExtractedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      return next;
    });
  }, []);

  // Initialize organize-pages entries when pageCount is available
  const organizeFileKey = files[0] ? fileId(files[0]) : "";
  const organizePageCount = pageCounts[organizeFileKey] ?? 0;
  useEffect(() => {
    if (!isOrganizePages || organizePageCount === 0) return;
    if (organizePages.length > 0) return; // already initialized
    setOrganizePages(
      Array.from({ length: organizePageCount }, (_, i) => ({
        id: `org-${i + 1}`,
        srcPage: i + 1,
        deleted: false,
        rotation: 0,
        isDuplicate: false,
      })),
    );
  }, [isOrganizePages, organizePageCount, organizePages.length]);

  const handleOrganizePagesReset = useCallback(() => {
    setOrganizePages(
      Array.from({ length: organizePageCount }, (_, i) => ({
        id: `org-${i + 1}`,
        srcPage: i + 1,
        deleted: false,
        rotation: 0,
        isDuplicate: false,
      })),
    );
  }, [organizePageCount]);

  return (
    <>
    <ToolPageLayout
      title={title}
      description={description}
      backHref={backHref}
      backLabel={labels.backToAll}
      size={(isSplit || isDeletePages || isExtractPages || isOrganizePages || isRotate || isEditMetadata || isPdfToJpg || isPdfToPng || isPdfToText || isJpgToPdf || isPngToPdf || isImageToPdf || isHtmlToPdf || isScanToPdf) && stage !== "idle" ? "xl" : isExtractImages && stage !== "idle" ? "md" : "lg"}
      action={fav !== null ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              const added = toggleFavorite(slug);
              setFav(added);
              const msg = added ? labels.favoriteAdded : labels.favoriteRemoved;
              if (msg) setFavToast(msg);
            }}
            onMouseEnter={handleFavHintEnter}
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
              onFiles={(f) => isSingleFileMode ? addFiles([f[0]]) : addFiles(f)}
              title={isSplit && splitLabels ? splitLabels.dropFile : isDeletePages && deletePagesLabels ? deletePagesLabels.dropFile : isExtractPages && extractPagesLabels ? extractPagesLabels.dropFile : isExtractImages && extractImagesLabels ? extractImagesLabels.dropFile : labels.dropFiles}
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
            {isSplit && splitLabels && files.length > 0 ? (
              /* ─── Split: single-file mode ─── */
              <>
                {/* File info bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {formatSize(files[0].size)}
                        {pageCounts[fileId(files[0])] && (
                          <span> · {pageCounts[fileId(files[0])]}p</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSingleFileChange}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {splitLabels.changeFile}
                  </button>
                </div>

                {/* Split layout: preview + options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
                  {/* Page preview */}
                  {pageCounts[fileId(files[0])] && (
                    <div className="self-start">
                      <SplitPagePreview
                        file={files[0]}
                        pageCount={pageCounts[fileId(files[0])]}
                        splitOptions={splitOptions}
                        rangeLabel={splitLabels.rangeLabel}
                        onRangesReorder={(newRanges) => splitSetRangesRef.current?.(newRanges)}
                        onExtractPagesChange={(pages) => splitSetExtractPagesRef.current?.(pages)}
                      />
                    </div>
                  )}

                  {/* Options panel */}
                  {pageCounts[fileId(files[0])] && (
                    <div className="lg:sticky lg:top-4 lg:self-start">
                      <SplitOptions
                        pageCount={pageCounts[fileId(files[0])]}
                        fileSize={files[0].size}
                        onChange={setSplitOptions}
                        labels={splitLabels}
                        onRegisterSetRanges={(setter) => { splitSetRangesRef.current = setter; }}
                        onRegisterSetExtractPages={(setter) => { splitSetExtractPagesRef.current = setter; }}
                        onRegisterValidate={(validator) => { splitValidateRef.current = validator; }}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : isDeletePages && deletePagesLabels && files.length > 0 ? (
              /* ─── Delete Pages: single-file mode ─── */
              <>
                {/* File info bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {formatSize(files[0].size)}
                        {pageCounts[fileId(files[0])] && (
                          <span> · {pageCounts[fileId(files[0])]}p</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSingleFileChange}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {deletePagesLabels.changeFile}
                  </button>
                </div>

                {/* Delete pages layout: preview + options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  {pageCounts[fileId(files[0])] && (
                    <div className="self-start">
                      <DeletePagesPreview
                        file={files[0]}
                        pageCount={pageCounts[fileId(files[0])]}
                        deletedPages={deletedPages}
                        orderedPages={deletePageOrder.length === pageCounts[fileId(files[0])] ? deletePageOrder : Array.from({ length: pageCounts[fileId(files[0])] }, (_, i) => i + 1)}
                        onTogglePage={handleToggleDeletePage}
                        onOrderChange={setDeletePageOrder}
                      />
                    </div>
                  )}

                  {pageCounts[fileId(files[0])] && (
                    <div className="lg:sticky lg:top-4 lg:self-start">
                      <DeletePagesOptions
                        pageCount={pageCounts[fileId(files[0])]}
                        deletedPages={deletedPages}
                        onDeletedPagesChange={setDeletedPages}
                        labels={deletePagesLabels}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : isExtractPages && extractPagesLabels && files.length > 0 ? (
              /* ─── Extract Pages: single-file mode ─── */
              <>
                {/* File info bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {formatSize(files[0].size)}
                        {pageCounts[fileId(files[0])] && (
                          <span> · {pageCounts[fileId(files[0])]}p</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSingleFileChange}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {extractPagesLabels.changeFile}
                  </button>
                </div>

                {/* Extract pages layout: preview + options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  {pageCounts[fileId(files[0])] && (
                    <div className="self-start">
                      <ExtractPagesPreview
                        file={files[0]}
                        pageCount={pageCounts[fileId(files[0])]}
                        selectedPages={extractedPages}
                        orderedPages={extractPageOrder.length === pageCounts[fileId(files[0])] ? extractPageOrder : Array.from({ length: pageCounts[fileId(files[0])] }, (_, i) => i + 1)}
                        onTogglePage={handleToggleExtractPage}
                        onOrderChange={setExtractPageOrder}
                      />
                    </div>
                  )}

                  {pageCounts[fileId(files[0])] && (
                    <div className="lg:sticky lg:top-4 lg:self-start">
                      <ExtractPagesOptions
                        pageCount={pageCounts[fileId(files[0])]}
                        extractedPages={extractedPages}
                        onExtractedPagesChange={setExtractedPages}
                        labels={extractPagesLabels}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : isOrganizePages && organizePagesLabels && files.length > 0 ? (
              /* ─── Organize Pages: single-file mode ─── */
              <>
                {/* File info bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {formatSize(files[0].size)}
                        {pageCounts[fileId(files[0])] && (
                          <span> · {pageCounts[fileId(files[0])]}p</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSingleFileChange}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {organizePagesLabels.changeFile}
                  </button>
                </div>

                {/* Organize pages layout: preview + options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  {organizePages.length > 0 && (
                    <div className="self-start">
                      <OrganizePagesPreview
                        file={files[0]}
                        pageCount={pageCounts[fileId(files[0])]}
                        pages={organizePages}
                        onPagesChange={setOrganizePages}
                        labels={organizePagesLabels}
                      />
                    </div>
                  )}

                  {organizePages.length > 0 && (
                    <div className="lg:sticky lg:top-4 lg:self-start">
                      <OrganizePagesOptions
                        pageCount={pageCounts[fileId(files[0])]}
                        pages={organizePages}
                        onPagesChange={setOrganizePages}
                        onResetAll={handleOrganizePagesReset}
                        labels={organizePagesLabels}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : isRotate && rotateLabels && files.length > 0 ? (
              /* ─── Rotate: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageCounts={pageCounts}
                      pageOrientation="portrait"
                      pageSize="a4"
                      pageMargin={0}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <RotateOptions
                      pageCount={files.length}
                      rotations={rotations}
                      onRotateCwAll={() => {
                        for (const f of files) rotateFile(fileId(f));
                      }}
                      onRotateCcwAll={() => {
                        for (const f of files) {
                          rotateFile(fileId(f));
                          rotateFile(fileId(f));
                          rotateFile(fileId(f));
                        }
                      }}
                      onResetAll={reset}
                      labels={rotateLabels}
                    />
                  </div>
                </div>
              </>
            ) : isResize && resizeLabels && files.length > 0 ? (
              /* ─── Resize: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-border bg-background-elevated p-1 shadow-lg"
                              >
                                {sortOptions.map((opt) => {
                                  const SortIcon = opt.icon;
                                  return (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => {
                                        sortFiles(opt.value);
                                        setSortMenuOpen(false);
                                      }}
                                      className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors cursor-pointer"
                                    >
                                      <SortIcon className="h-3.5 w-3.5" />
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

                    <button
                      type="button"
                      onClick={handleAddMore}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-sm font-bold text-foreground-muted hover:border-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {labels.addMoreFiles}
                    </button>
                  </div>
                </div>

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageCounts={pageCounts}
                      pageOrientation={resizeOrientation}
                      pageSize={resizePreset === "custom" ? "a4" : resizePreset}
                      pageMargin={MARGIN_VALUES[resizeMarginPreset]}
                      contentScale={resizeScaleMode}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <ResizeOptions
                      preset={resizePreset}
                      customWidth={resizeCustomW}
                      customHeight={resizeCustomH}
                      unit={resizeUnit}
                      orientation={resizeOrientation}
                      scaleMode={resizeScaleMode}
                      marginPreset={resizeMarginPreset}
                      onPresetChange={setResizePreset}
                      onCustomWidthChange={setResizeCustomW}
                      onCustomHeightChange={setResizeCustomH}
                      onUnitChange={setResizeUnit}
                      onOrientationChange={setResizeOrientation}
                      onScaleModeChange={setResizeScaleMode}
                      onMarginPresetChange={setResizeMarginPreset}
                      labels={resizeLabels}
                    />
                  </div>
                </div>
              </>
            ) : isEditMetadata && editMetadataLabels && files.length > 0 ? (
              /* ─── Edit Metadata: single-file + form sidebar ─── */
              <>
                {/* File info bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/40">
                      <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {formatSize(files[0].size)}
                        {pageCounts[fileId(files[0])] && (
                          <span> · {pageCounts[fileId(files[0])]}p</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSingleFileChange}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:border-purple-500 hover:text-purple-500 transition-colors cursor-pointer"
                  >
                    {editMetadataLabels.changeFile}
                  </button>
                </div>

                {/* Metadata form */}
                {editedMetadata && (
                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <EditMetadataOptions
                      metadata={editedMetadata}
                      original={originalMetadata}
                      onChange={(field, value) => {
                        setEditedMetadata((prev) =>
                          prev ? { ...prev, [field]: value } : prev,
                        );
                      }}
                      onClearAll={() => {
                        setEditedMetadata({
                          title: "",
                          author: "",
                          subject: "",
                          keywords: "",
                          creator: "",
                          producer: "",
                          creationDate: null,
                          modificationDate: null,
                        });
                      }}
                      labels={editMetadataLabels}
                      loading={metadataLoading}
                    />
                  </div>
                )}
              </>
            ) : isExtractImages && extractImagesLabels && files.length > 0 ? (
              /* ─── Extract Images: single-file mode ─── */
              <>
                {/* File info bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40">
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {formatSize(files[0].size)}
                        {pageCounts[fileId(files[0])] && (
                          <span> · {pageCounts[fileId(files[0])]}p</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSingleFileChange}
                    className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground-muted hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    {extractImagesLabels.changeFile}
                  </button>
                </div>

                {/* Extract images options */}
                <ExtractImagesOptions labels={extractImagesLabels} />
              </>
            ) : isPdfToText && pdfToTextLabels && files.length > 0 ? (
              /* ─── PDF to Text: single-file card + options ─── */
              <>
                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageCounts={pageCounts}
                      pageOrientation="portrait"
                      pageSize="a4"
                      pageMargin={0}
                      onRemove={() => { reset(); }}
                      onReorder={reorderFiles}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <PdfToTextOptions labels={pdfToTextLabels} />
                  </div>
                </div>
              </>
            ) : isPdfToJpg && pdfToJpgLabels && files.length > 0 ? (
              /* ─── PDF to JPG: multi-file + quality sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    {totalPages > 0 && (
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageCounts={pageCounts}
                      encryptedFiles={encryptedFiles}
                      encryptedLabel={labels.encryptedFile}
                      pageOrientation="portrait"
                      pageSize="a4"
                      pageMargin={0}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <PdfToJpgOptions
                      quality={jpgQuality}
                      onQualityChange={setJpgQuality}
                      labels={pdfToJpgLabels}
                    />
                  </div>
                </div>
              </>
            ) : isPdfToPng && pdfToPngLabels && files.length > 0 ? (
              /* ─── PDF to PNG: multi-file + quality sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    {totalPages > 0 && (
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageCounts={pageCounts}
                      encryptedFiles={encryptedFiles}
                      encryptedLabel={labels.encryptedFile}
                      pageOrientation="portrait"
                      pageSize="a4"
                      pageMargin={0}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <PdfToPngOptions
                      quality={pngQuality}
                      onQualityChange={setPngQuality}
                      labels={pdfToPngLabels}
                    />
                  </div>
                </div>
              </>
            ) : isJpgToPdf && jpgToPdfLabels && files.length > 0 ? (
              /* ─── JPG to PDF: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageOrientation={jpgToPdfOrientation}
                      pageSize={jpgToPdfPageSize}
                      pageMargin={jpgToPdfMarginMm}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <JpgToPdfOptions
                      orientation={jpgToPdfOrientation}
                      pageSize={jpgToPdfPageSize}
                      marginMm={jpgToPdfMarginMm}
                      mergeAll={jpgToPdfMergeAll}
                      fileCount={files.length}
                      onOrientationChange={setJpgToPdfOrientation}
                      onPageSizeChange={setJpgToPdfPageSize}
                      onMarginMmChange={setJpgToPdfMarginMm}
                      onMergeAllChange={setJpgToPdfMergeAll}
                      labels={jpgToPdfLabels}
                    />
                  </div>
                </div>
              </>
            ) : isPngToPdf && pngToPdfLabels && files.length > 0 ? (
              /* ─── PNG to PDF: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageOrientation={pngToPdfOrientation}
                      pageSize={pngToPdfPageSize}
                      pageMargin={pngToPdfMarginMm}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <PngToPdfOptions
                      orientation={pngToPdfOrientation}
                      pageSize={pngToPdfPageSize}
                      marginMm={pngToPdfMarginMm}
                      mergeAll={pngToPdfMergeAll}
                      fileCount={files.length}
                      onOrientationChange={setPngToPdfOrientation}
                      onPageSizeChange={setPngToPdfPageSize}
                      onMarginMmChange={setPngToPdfMarginMm}
                      onMergeAllChange={setPngToPdfMergeAll}
                      labels={pngToPdfLabels}
                    />
                  </div>
                </div>
              </>
            ) : isImageToPdf && imageToPdfLabels && files.length > 0 ? (
              /* ─── Image to PDF: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageOrientation={imageToPdfOrientation}
                      pageSize={imageToPdfPageSize}
                      pageMargin={imageToPdfMarginMm}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <ImageToPdfOptions
                      orientation={imageToPdfOrientation}
                      pageSize={imageToPdfPageSize}
                      marginMm={imageToPdfMarginMm}
                      mergeAll={imageToPdfMergeAll}
                      fileCount={files.length}
                      onOrientationChange={setImageToPdfOrientation}
                      onPageSizeChange={setImageToPdfPageSize}
                      onMarginMmChange={setImageToPdfMarginMm}
                      onMergeAllChange={setImageToPdfMergeAll}
                      labels={imageToPdfLabels}
                    />
                  </div>
                </div>
              </>
            ) : isHtmlToPdf && htmlToPdfLabels && files.length > 0 ? (
              /* ─── HTML to PDF: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      pageOrientation={htmlToPdfOrientation}
                      pageSize={htmlToPdfPageSize}
                      pageMargin={htmlToPdfMarginMm}
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <HtmlToPdfOptions
                      orientation={htmlToPdfOrientation}
                      pageSize={htmlToPdfPageSize as never}
                      marginMm={htmlToPdfMarginMm}
                      mergeAll={htmlToPdfMergeAll}
                      fileBreak={htmlToPdfFileBreak}
                      fileGapMm={htmlToPdfFileGapMm}
                      fileCount={files.length}
                      onOrientationChange={setHtmlToPdfOrientation as never}
                      onPageSizeChange={setHtmlToPdfPageSize as never}
                      onMarginMmChange={setHtmlToPdfMarginMm}
                      onMergeAllChange={setHtmlToPdfMergeAll}
                      onFileBreakChange={setHtmlToPdfFileBreak}
                      onFileGapMmChange={setHtmlToPdfFileGapMm}
                      labels={htmlToPdfLabels}
                    />
                  </div>
                </div>
              </>
            ) : isScanToPdf && scanToPdfLabels && files.length > 0 ? (
              /* ─── Scan to PDF: multi-file + options sidebar ─── */
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground-muted">
                    <span className="text-foreground font-semibold">{files.length}</span>{" "}
                    {labels.filesSelected}
                    <span className="ml-1 text-foreground-subtle">
                      · {formatSize(files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
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

                {/* Cards + Options */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                  <div className="self-start">
                    <FileList
                      files={files}
                      rotations={rotations}
                      pageOrientation={scanToPdfOrientation}
                      pageSize={scanToPdfPageSize}
                      pageMargin={scanToPdfMarginMm}
                      colorFilter={
                        scanToPdfColorMode === "grayscale"
                          ? "grayscale(100%)"
                          : scanToPdfColorMode === "bw"
                            ? "grayscale(100%) contrast(10000%)"
                            : undefined
                      }
                      onRemove={removeFile}
                      onReorder={reorderFiles}
                      onRotate={rotateFile}
                    />
                  </div>

                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <ScanToPdfOptions
                      orientation={scanToPdfOrientation}
                      pageSize={scanToPdfPageSize}
                      marginMm={scanToPdfMarginMm}
                      mergeAll={scanToPdfMergeAll}
                      autoEnhance={scanToPdfAutoEnhance}
                      colorMode={scanToPdfColorMode}
                      fileCount={files.length}
                      onOrientationChange={setScanToPdfOrientation}
                      onPageSizeChange={setScanToPdfPageSize}
                      onMarginMmChange={setScanToPdfMarginMm}
                      onMergeAllChange={setScanToPdfMergeAll}
                      onAutoEnhanceChange={setScanToPdfAutoEnhance}
                      onColorModeChange={setScanToPdfColorMode}
                      labels={scanToPdfLabels}
                    />
                  </div>
                </div>
              </>
            ) : (
              /* ─── Default: multi-file mode ─── */
              <>
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
                  colorFilter={isGrayscale ? "grayscale(100%)" : undefined}
                  onRemove={removeFile}
                  onReorder={reorderFiles}
                  onRotate={isCompress || isGrayscale || isWebOptimize ? undefined : rotateFile}
                  onCardClick={isCompress || isGrayscale || isWebOptimize ? undefined : (file) => setPageSelectorFile(file)}
                />
              </>
            )}

            {/* Compress: 압축 레벨 선택 */}
            {isCompress && compressLabels && (
              <CompressOptions
                onChange={setCompressOptions}
                labels={compressLabels}
              />
            )}

            {isWebOptimize && webOptimizeLabels && (
              <WebOptimizeOptions
                onChange={setWebOptimizeOptions}
                labels={webOptimizeLabels}
              />
            )}

            {/* 도구별 옵션 UI 슬롯 */}
            {children}

            {/* 하단 버튼 여백 확보 */}
            <div className="h-24" />
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
              message={error === "NO_IMAGES_FOUND" && extractImagesLabels ? extractImagesLabels.noImagesFound : error ?? "Unknown error"}
              onRetry={reset}
              retryLabel={labels.tryAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 고정 실행 버튼 — AnimatePresence 밖에서 CLS 방지 */}
      {stage === "loaded" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-muted bg-background/90 backdrop-blur-sm px-4 py-3">
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={() => {
                if (isSplit && splitValidateRef.current && !splitValidateRef.current()) {
                  return;
                }
                addRecentTool(slug);
                if (isSplit) {
                  processFiles(splitOptions);
                } else if (isCompress) {
                  processFiles(compressOptions);
                } else if (isWebOptimize) {
                  processFiles(webOptimizeOptions);
                } else if (isDeletePages) {
                  processFiles({
                    pagesToDelete: Array.from(deletedPages),
                    pageOrder: deletePageOrder.length > 0 ? deletePageOrder : undefined,
                  });
                } else if (isExtractPages) {
                  processFiles({
                    pagesToExtract: Array.from(extractedPages),
                    pageOrder: extractPageOrder.length > 0 ? extractPageOrder : undefined,
                  });
                } else if (isOrganizePages) {
                  const pageOrder = organizePages.map((p) => p.srcPage);
                  const deletedIndices = organizePages
                    .map((p, i) => (p.deleted ? i : -1))
                    .filter((i) => i >= 0);
                  const rotationsMap: Record<string, number> = {};
                  organizePages.forEach((p, i) => {
                    if (p.rotation > 0) rotationsMap[String(i)] = p.rotation;
                  });
                  processFiles({
                    pageOrder,
                    deletedPages: deletedIndices,
                    rotations: rotationsMap,
                  });
                } else if (isResize) {
                  const margin = MARGIN_VALUES[resizeMarginPreset];
                  processFiles({
                    preset: resizePreset,
                    customWidth: resizeCustomW,
                    customHeight: resizeCustomH,
                    unit: "mm",
                    orientation: resizeOrientation,
                    scaleMode: resizeScaleMode,
                    marginTop: margin,
                    marginBottom: margin,
                    marginLeft: margin,
                    marginRight: margin,
                  });
                } else if (isRotate) {
                  processFiles({ rotations });
                } else if (isPdfToJpg) {
                  processFiles({
                    quality: jpgQuality,
                    rotations,
                  });
                } else if (isPdfToPng) {
                  processFiles({
                    quality: pngQuality,
                    rotations,
                  });
                } else if (isJpgToPdf) {
                  processFiles({
                    pageSize: jpgToPdfPageSize,
                    orientation: jpgToPdfOrientation,
                    marginMm: jpgToPdfMarginMm,
                    mergeAll: jpgToPdfMergeAll,
                    rotations,
                  });
                } else if (isPngToPdf) {
                  processFiles({
                    pageSize: pngToPdfPageSize,
                    orientation: pngToPdfOrientation,
                    marginMm: pngToPdfMarginMm,
                    mergeAll: pngToPdfMergeAll,
                    rotations,
                  });
                } else if (isImageToPdf) {
                  processFiles({
                    pageSize: imageToPdfPageSize,
                    orientation: imageToPdfOrientation,
                    marginMm: imageToPdfMarginMm,
                    mergeAll: imageToPdfMergeAll,
                    rotations,
                  });
                } else if (isHtmlToPdf) {
                  processFiles({
                    pageSize: htmlToPdfPageSize,
                    orientation: htmlToPdfOrientation,
                    marginMm: htmlToPdfMarginMm,
                    mergeAll: htmlToPdfMergeAll,
                    fileBreak: htmlToPdfFileBreak,
                    fileGapMm: htmlToPdfFileGapMm,
                  });
                } else if (isScanToPdf) {
                  processFiles({
                    pageSize: scanToPdfPageSize,
                    orientation: scanToPdfOrientation,
                    marginMm: scanToPdfMarginMm,
                    mergeAll: scanToPdfMergeAll,
                    autoEnhance: scanToPdfAutoEnhance,
                    colorMode: scanToPdfColorMode,
                    rotations,
                  });
                } else if (isPdfToText) {
                  processFiles({});
                } else if (isExtractImages) {
                  processFiles({});
                } else if (isGrayscale) {
                  processFiles({});
                } else if (isEditMetadata && editedMetadata) {
                  processFiles({
                    title: editedMetadata.title,
                    author: editedMetadata.author,
                    subject: editedMetadata.subject,
                    keywords: editedMetadata.keywords,
                    creator: editedMetadata.creator,
                    producer: editedMetadata.producer,
                    creationDate: editedMetadata.creationDate || undefined,
                    modificationDate: editedMetadata.modificationDate || undefined,
                  });
                } else {
                  processFiles({ rotations, pageSelections });
                }
              }}
              disabled={!implemented || (isDeletePages && (deletedPages.size === 0 || deletedPages.size >= (pageCounts[files[0] ? fileId(files[0]) : ""] ?? 0))) || (isExtractPages && (extractedPages.size === 0 || extractedPages.size >= (pageCounts[files[0] ? fileId(files[0]) : ""] ?? 0))) || (isOrganizePages && (organizePages.length - organizePages.filter(p => p.deleted).length) === 0) || (isRotate && Object.values(rotations).filter(r => r > 0).length === 0) || (isEditMetadata && !editedMetadata)}
              className={cn(
                "group w-full overflow-hidden rounded-xl px-6 py-4 text-base font-bold",
                "bg-accent text-accent-foreground shadow-md",
                "hover:shadow-xl hover:brightness-110 active:scale-[0.98]",
                "disabled:pointer-events-none disabled:opacity-50",
                "transition-all duration-200 cursor-pointer",
              )}
            >
              <span className="flex items-center justify-center gap-2">
                {isEditMetadata && editMetadataLabels ? editMetadataLabels.applyButton : isWebOptimize && webOptimizeLabels ? webOptimizeLabels.optimizeButton : isJpgToPdf && jpgToPdfLabels ? jpgToPdfLabels.convertButton : isPngToPdf && pngToPdfLabels ? pngToPdfLabels.convertButton : isImageToPdf && imageToPdfLabels ? imageToPdfLabels.convertButton : isHtmlToPdf && htmlToPdfLabels ? htmlToPdfLabels.convertButton : isScanToPdf && scanToPdfLabels ? scanToPdfLabels.convertButton : isPdfToJpg && pdfToJpgLabels ? pdfToJpgLabels.convertButton : isPdfToPng && pdfToPngLabels ? pdfToPngLabels.convertButton : isPdfToText && pdfToTextLabels ? pdfToTextLabels.convertButton : title}
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
              setTimeout(() => setFavToast(null), 2000);
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
