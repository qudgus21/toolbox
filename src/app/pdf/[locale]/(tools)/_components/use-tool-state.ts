import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hasProcessor } from "@/lib/pdf/processor-registry";
import { addRecentTool, toggleFavorite, isFavorite } from "@/lib/storage";
import { usePdfMetadata } from "./use-pdf-metadata";
import { fileId } from "./file-list";
import { MARGIN_VALUES } from "./resize-options";
import type { OrganizePageEntry } from "./organize-pages-preview";
import type { PageSizePreset, ScaleMode, Unit } from "@/lib/pdf/processors/resize";
import type { PdfMetadata } from "@/lib/pdf/processors/edit-metadata";
import type { PageSizeKey, Orientation } from "@/lib/pdf/processors/jpg-to-pdf";
import type { FileBreak } from "@/lib/pdf/processors/html-to-pdf";
import type { ScanColorMode } from "@/lib/pdf/processors/scan-to-pdf";
import type { MarginPreset } from "./tool-page-types";
import type { CropArea, CropPageMode, CropMargins } from "@/lib/pdf/processors/crop";

interface UseToolStateParams {
  slug: string;
  files: File[];
  rotations: Record<string, number>;
  pageSelections: Record<string, number[]>;
  pageCounts: Record<string, number>;
  totalPages: number;
  stage: string;
  result: unknown;
  download: () => void;
  reset: () => void;
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  sortFiles: (mode: "name-asc" | "name-desc" | "size-asc" | "size-desc") => void;
  rotateFile: (fileKey: string) => void;
  setPageSelection: (fileKey: string, pages: number[]) => void;
  acceptedTypes: string;
}

export function useToolState({
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
}: UseToolStateParams) {
  // ─── Boolean flags ───
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
  const isImageToPdf = slug === "image-to-pdf" || slug === "webp-to-pdf" || slug === "tiff-to-pdf" || slug === "heic-to-pdf";
  const isHtmlToPdf = slug === "html-to-pdf";
  const isScanToPdf = slug === "scan-to-pdf";
  const isOrganizePages = slug === "organize-pages";
  const isRotate = slug === "rotate";
  const isResize = slug === "resize";
  const isWebOptimize = slug === "web-optimize";
  const isProtect = slug === "protect";
  const isGrayscale = slug === "grayscale";
  const isEditMetadata = slug === "edit-metadata";
  const isEditPdf = slug === "edit-pdf";
  const isFlatten = slug === "flatten";
  const isCrop = slug === "crop";
  const isRedact = slug === "redact";
  const isPageNumbers = slug === "page-numbers";
  const isAnnotate = slug === "annotate";
  const isSign = slug === "sign";
  const isWatermark = slug === "watermark";
  const isPagesPerSheet = slug === "pages-per-sheet";
  const isHeaderFooter = slug === "header-footer";
  const isOverlay = slug === "overlay";
  const isBooklet = slug === "booklet";
  const isSingleFileMode = isSplit || isDeletePages || isExtractPages || isExtractImages || isPdfToText || isOrganizePages || isEditMetadata || isEditPdf || isFlatten || isCrop || isRedact || isPageNumbers || isAnnotate || isSign || isWatermark || isHeaderFooter || isBooklet;

  const implemented = hasProcessor(slug);

  // ─── Favorites ───
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

  useEffect(() => {
    setFav(isFavorite(slug));
  }, [slug]);

  const handleToggleFavorite = useCallback(
    (favoriteAddedLabel?: string, favoriteRemovedLabel?: string) => {
      const added = toggleFavorite(slug);
      setFav(added);
      const msg = added ? favoriteAddedLabel : favoriteRemovedLabel;
      if (msg) setFavToast(msg);
    },
    [slug],
  );

  // ─── Auto-download ───
  const autoDownloadedRef = useRef(false);
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

  // ─── Split options ───
  const [splitOptions, setSplitOptions] = useState<Record<string, unknown>>({ mode: "range" });
  const splitSetRangesRef = useRef<((ranges: { from: number; to: number }[]) => void) | null>(null);
  const splitSetExtractPagesRef = useRef<((pages: number[]) => void) | null>(null);
  const splitValidateRef = useRef<(() => boolean) | null>(null);

  // ─── Compress options ───
  const [compressOptions, setCompressOptions] = useState<Record<string, unknown>>({ compressionLevel: "recommended" });

  // ─── Web optimize options ───
  const [webOptimizeOptions, setWebOptimizeOptions] = useState<Record<string, unknown>>({ preset: "screen", images: true, metadata: true, jsActions: true, forms: true, annotations: false, thumbnails: true, streams: true });

  // ─── Protect options ───
  const [protectOptions, setProtectOptions] = useState<Record<string, unknown>>({ userPassword: "", _valid: false });

  // ─── Delete pages ───
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set());
  const [deletePageOrder, setDeletePageOrder] = useState<number[]>([]);

  // ─── Extract pages ───
  const [extractedPages, setExtractedPages] = useState<Set<number>>(new Set());
  const [extractPageOrder, setExtractPageOrder] = useState<number[]>([]);

  // ─── PDF to JPG/PNG quality ───
  const [jpgQuality, setJpgQuality] = useState<"high" | "medium" | "low">("high");
  const [pngQuality, setPngQuality] = useState<"high" | "medium" | "low">("high");

  // ─── JPG to PDF ───
  const [jpgToPdfOrientation, setJpgToPdfOrientation] = useState<Orientation>("portrait");
  const [jpgToPdfPageSize, setJpgToPdfPageSize] = useState<PageSizeKey>("a4");
  const [jpgToPdfMarginMm, setJpgToPdfMarginMm] = useState(0);
  const [jpgToPdfMergeAll, setJpgToPdfMergeAll] = useState(true);

  // ─── PNG to PDF ───
  const [pngToPdfOrientation, setPngToPdfOrientation] = useState<Orientation>("portrait");
  const [pngToPdfPageSize, setPngToPdfPageSize] = useState<PageSizeKey>("a4");
  const [pngToPdfMarginMm, setPngToPdfMarginMm] = useState(0);
  const [pngToPdfMergeAll, setPngToPdfMergeAll] = useState(true);

  // ─── Image to PDF ───
  const [imageToPdfOrientation, setImageToPdfOrientation] = useState<Orientation>("portrait");
  const [imageToPdfPageSize, setImageToPdfPageSize] = useState<PageSizeKey>("a4");
  const [imageToPdfMarginMm, setImageToPdfMarginMm] = useState(0);
  const [imageToPdfMergeAll, setImageToPdfMergeAll] = useState(true);

  // ─── HTML to PDF ───
  const [htmlToPdfOrientation, setHtmlToPdfOrientation] = useState<Orientation>("portrait");
  const [htmlToPdfPageSize, setHtmlToPdfPageSize] = useState<PageSizeKey>("a4");
  const [htmlToPdfMarginMm, setHtmlToPdfMarginMm] = useState(0);
  const [htmlToPdfMergeAll, setHtmlToPdfMergeAll] = useState(true);
  const [htmlToPdfFileBreak, setHtmlToPdfFileBreak] = useState<FileBreak>("new-page");
  const [htmlToPdfFileGapMm, setHtmlToPdfFileGapMm] = useState(10);

  // ─── Scan to PDF ───
  const [scanToPdfOrientation, setScanToPdfOrientation] = useState<Orientation>("portrait");
  const [scanToPdfPageSize, setScanToPdfPageSize] = useState<PageSizeKey>("a4");
  const [scanToPdfMarginMm, setScanToPdfMarginMm] = useState(0);
  const [scanToPdfMergeAll, setScanToPdfMergeAll] = useState(true);
  const [scanToPdfAutoEnhance, setScanToPdfAutoEnhance] = useState(true);
  const [scanToPdfColorMode, setScanToPdfColorMode] = useState<ScanColorMode>("grayscale");

  // ─── Organize pages ───
  const [organizePages, setOrganizePages] = useState<OrganizePageEntry[]>([]);
  const organizeFileKey = files[0] ? fileId(files[0]) : "";
  const organizePageCount = pageCounts[organizeFileKey] ?? 0;

  useEffect(() => {
    if (!isOrganizePages || organizePageCount === 0) return;
    if (organizePages.length > 0) return;
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

  // ─── Resize ───
  const [resizePreset, setResizePreset] = useState<PageSizePreset | "custom">("a4");
  const [resizeCustomW, setResizeCustomW] = useState(210);
  const [resizeCustomH, setResizeCustomH] = useState(297);
  const [resizeUnit, setResizeUnit] = useState<Unit>("mm");
  const [resizeOrientation, setResizeOrientation] = useState<"portrait" | "landscape">("portrait");
  const [resizeScaleMode, setResizeScaleMode] = useState<ScaleMode>("fit");
  const [resizeMarginPreset, setResizeMarginPreset] = useState<MarginPreset>("none");

  // ─── Pages Per Sheet ───
  const [nupCount, setNupCount] = useState<2 | 4 | 6 | 9 | 16>(4);
  const [nupSheetSize, setNupSheetSize] = useState<PageSizePreset>("a4");
  const [nupOrientation, setNupOrientation] = useState<"portrait" | "landscape" | "auto">("auto");
  const [nupPageOrder, setNupPageOrder] = useState<"left-to-right" | "right-to-left" | "top-to-bottom">("left-to-right");
  const [nupGap, setNupGap] = useState(2);
  const [nupBorder, setNupBorder] = useState(false);
  const [nupFileMode, setNupFileMode] = useState<"merge" | "new-sheet">("merge");

  // ─── Header/Footer ───
  const [hfOptions, setHfOptions] = useState({
    headerEnabled: true,
    footerEnabled: false,
    headerText: "{filename}",
    footerText: "Page {page} of {total}",
    headerAlign: "center" as "left" | "center" | "right",
    footerAlign: "center" as "left" | "center" | "right",
    font: "Helvetica" as import("@/lib/pdf/processors/page-numbers-types").PageNumberFont,
    fontSize: 10,
    color: "#666666",
    marginMm: 10,
    pageRange: "all" as "all" | "custom",
    customRange: "",
    facingMode: "single" as import("@/lib/pdf/processors/page-numbers-types").FacingPageMode,
  });

  // ─── Booklet ───
  const [bookletOptions, setBookletOptions] = useState({
    sheetSize: "a4" as "a4" | "a3" | "letter" | "legal" | "ledger",
    binding: "left" as "left" | "right",
  });

  // ─── Overlay ───
  const [overlayOptions, setOverlayOptions] = useState({
    layer: "above" as "above" | "below",
    overlayMode: "repeat-first" as "repeat-first" | "match",
    scaleMode: "fit" as "fit" | "original" | "stretch",
  });

  // ─── Flatten options ───
  const [flattenOptions, setFlattenOptions] = useState<Record<string, unknown>>({ formFields: true, annotations: true });

  // ─── Crop ───
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [cropMargins, setCropMargins] = useState<CropMargins>({ top: 10, right: 10, bottom: 10, left: 10 });
  const [cropMode, setCropMode] = useState<"area" | "margins">("area");
  const [cropPageMode, setCropPageMode] = useState<CropPageMode>("all");
  const [cropCurrentPage, setCropCurrentPage] = useState(0);
  const [cropPageRange, setCropPageRange] = useState("");

  // ─── Page Numbers ───
  const [pageNumberOptions, setPageNumberOptions] = useState<import("@/lib/pdf/processors/page-numbers-types").PageNumberOptions>({
    position: "bottom-center",
    format: "{n}",
    customTemplate: "{n}",
    font: "Helvetica",
    fontSize: 12,
    color: "#000000",
    marginMm: 10,
    pageRange: "all",
    customRange: "",
    skipFirstN: 0,
    startNumber: 1,
    facingMode: "single",
  });

  // ─── Redact areas ───
  const [redactAreas, setRedactAreas] = useState<unknown[]>([]);

  // ─── Annotate annotations ───
  const [annotateAnnotations, setAnnotateAnnotations] = useState<unknown[]>([]);

  // ─── Sign elements ───
  const [signElements, setSignElements] = useState<unknown[]>([]);

  // ─── Watermark ───
  const [watermarkOptions, setWatermarkOptions] = useState<import("@/lib/pdf/processors/watermark-types").WatermarkOptions>({
    mode: "text",
    text: { text: "CONFIDENTIAL", font: "Helvetica", fontSize: 48, color: "#FF0000", opacity: 0.3, shadow: false },
    image: { imageFile: null, imageDataUrl: "", scale: 1.0, opacity: 0.3, mosaic: false },
    position: "center",
    rotation: -45,
    layer: "over",
    offsetX: 0,
    offsetY: 0,
    pageRange: "all",
    customRange: "",
  });

  // ─── Edit PDF annotations ───
  const [editPdfAnnotations, setEditPdfAnnotations] = useState<unknown[]>([]);

  // ─── Edit Metadata ───
  const [editedMetadata, setEditedMetadata] = useState<PdfMetadata | null>(null);
  const { metadata: originalMetadata, loading: metadataLoading } = usePdfMetadata(
    isEditMetadata && files.length > 0 ? files[0] : null,
  );
  useEffect(() => {
    if (originalMetadata) {
      setEditedMetadata({ ...originalMetadata });
    }
  }, [originalMetadata]);

  // ─── Callbacks ───
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

  const handleSingleFileChange = useCallback(() => {
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
        if (isCrop) { setCropArea(null); setCropCurrentPage(0); }
        setTimeout(() => addFiles([target.files![0]]), 0);
      }
    };
    input.click();
  }, [acceptedTypes, reset, addFiles, isDeletePages, isExtractPages, isOrganizePages, isCrop]);

  const handleAddMore = useCallback(() => {
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
  }, [acceptedTypes, isSingleFileMode, reset, addFiles]);

  // ─── buildProcessOptions ───
  const buildProcessOptions = useCallback((): Record<string, unknown> | null => {
    if (isSplit && splitValidateRef.current && !splitValidateRef.current()) {
      return null;
    }
    addRecentTool(slug);

    if (isSplit) {
      return splitOptions;
    } else if (isCompress) {
      return compressOptions;
    } else if (isWebOptimize) {
      return webOptimizeOptions;
    } else if (isDeletePages) {
      return {
        pagesToDelete: Array.from(deletedPages),
        pageOrder: deletePageOrder.length > 0 ? deletePageOrder : undefined,
      };
    } else if (isExtractPages) {
      return {
        pagesToExtract: Array.from(extractedPages),
        pageOrder: extractPageOrder.length > 0 ? extractPageOrder : undefined,
      };
    } else if (isOrganizePages) {
      const pageOrder = organizePages.map((p) => p.srcPage);
      const deletedIndices = organizePages
        .map((p, i) => (p.deleted ? i : -1))
        .filter((i) => i >= 0);
      const rotationsMap: Record<string, number> = {};
      organizePages.forEach((p, i) => {
        if (p.rotation > 0) rotationsMap[String(i)] = p.rotation;
      });
      return {
        pageOrder,
        deletedPages: deletedIndices,
        rotations: rotationsMap,
      };
    } else if (isResize) {
      const margin = MARGIN_VALUES[resizeMarginPreset];
      return {
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
      };
    } else if (isPagesPerSheet) {
      return {
        pagesPerSheet: nupCount,
        sheetSize: nupSheetSize,
        orientation: nupOrientation,
        pageOrder: nupPageOrder,
        gap: nupGap,
        border: nupBorder,
        fileMode: nupFileMode,
      };
    } else if (isHeaderFooter) {
      return hfOptions;
    } else if (isOverlay) {
      return overlayOptions;
    } else if (isBooklet) {
      return bookletOptions;
    } else if (isRotate) {
      return { rotations };
    } else if (isPdfToJpg) {
      return {
        quality: jpgQuality,
        rotations,
      };
    } else if (isPdfToPng) {
      return {
        quality: pngQuality,
        rotations,
      };
    } else if (isJpgToPdf) {
      return {
        pageSize: jpgToPdfPageSize,
        orientation: jpgToPdfOrientation,
        marginMm: jpgToPdfMarginMm,
        mergeAll: jpgToPdfMergeAll,
        rotations,
      };
    } else if (isPngToPdf) {
      return {
        pageSize: pngToPdfPageSize,
        orientation: pngToPdfOrientation,
        marginMm: pngToPdfMarginMm,
        mergeAll: pngToPdfMergeAll,
        rotations,
      };
    } else if (isImageToPdf) {
      return {
        pageSize: imageToPdfPageSize,
        orientation: imageToPdfOrientation,
        marginMm: imageToPdfMarginMm,
        mergeAll: imageToPdfMergeAll,
        rotations,
      };
    } else if (isHtmlToPdf) {
      return {
        pageSize: htmlToPdfPageSize,
        orientation: htmlToPdfOrientation,
        marginMm: htmlToPdfMarginMm,
        mergeAll: htmlToPdfMergeAll,
        fileBreak: htmlToPdfFileBreak,
        fileGapMm: htmlToPdfFileGapMm,
      };
    } else if (isScanToPdf) {
      return {
        pageSize: scanToPdfPageSize,
        orientation: scanToPdfOrientation,
        marginMm: scanToPdfMarginMm,
        mergeAll: scanToPdfMergeAll,
        autoEnhance: scanToPdfAutoEnhance,
        colorMode: scanToPdfColorMode,
        rotations,
      };
    } else if (isPdfToText) {
      return {};
    } else if (isExtractImages) {
      return {};
    } else if (isProtect) {
      return protectOptions;
    } else if (isGrayscale) {
      return {};
    } else if (isFlatten) {
      return flattenOptions;
    } else if (isCrop) {
      const parsedRange = cropPageRange
        .split(",")
        .flatMap((part) => {
          const m = part.trim().match(/^(\d+)\s*-\s*(\d+)$/);
          if (m) {
            const from = parseInt(m[1], 10);
            const to = parseInt(m[2], 10);
            return Array.from({ length: to - from + 1 }, (_, i) => from + i);
          }
          const n = parseInt(part.trim(), 10);
          return isNaN(n) ? [] : [n];
        });
      return {
        mode: cropMode,
        cropArea: cropMode === "area" ? cropArea : undefined,
        margins: cropMode === "margins" ? cropMargins : undefined,
        pageMode: cropPageMode,
        currentPage: cropCurrentPage,
        pageRange: parsedRange.length > 0 ? parsedRange : undefined,
      };
    } else if (isRedact) {
      return { redactions: redactAreas };
    } else if (isPageNumbers) {
      return { ...pageNumberOptions } as unknown as Record<string, unknown>;
    } else if (isAnnotate) {
      return { annotations: annotateAnnotations };
    } else if (isSign) {
      return { signElements };
    } else if (isWatermark) {
      return { ...watermarkOptions, imageFile: watermarkOptions.image.imageFile } as unknown as Record<string, unknown>;
    } else if (isEditPdf) {
      return { annotations: editPdfAnnotations };
    } else if (isEditMetadata && editedMetadata) {
      return {
        title: editedMetadata.title,
        author: editedMetadata.author,
        subject: editedMetadata.subject,
        keywords: editedMetadata.keywords,
        creator: editedMetadata.creator,
        producer: editedMetadata.producer,
        creationDate: editedMetadata.creationDate || undefined,
        modificationDate: editedMetadata.modificationDate || undefined,
      };
    } else {
      return { rotations, pageSelections };
    }
  }, [
    slug, isSplit, isCompress, isWebOptimize, isDeletePages, isExtractPages,
    isOrganizePages, isResize, isRotate, isPdfToJpg, isPdfToPng, isJpgToPdf,
    isPngToPdf, isImageToPdf, isHtmlToPdf, isScanToPdf, isPdfToText,
    isExtractImages, isProtect, isGrayscale, isEditPdf, isEditMetadata, isFlatten, isCrop, isRedact, isAnnotate, isSign, isWatermark,
    splitOptions, compressOptions, webOptimizeOptions, protectOptions, flattenOptions, watermarkOptions,
    deletedPages, deletePageOrder, extractedPages, extractPageOrder,
    organizePages, resizePreset, resizeCustomW, resizeCustomH, resizeOrientation,
    resizeScaleMode, resizeMarginPreset, rotations, pageSelections,
    jpgQuality, pngQuality,
    jpgToPdfOrientation, jpgToPdfPageSize, jpgToPdfMarginMm, jpgToPdfMergeAll,
    pngToPdfOrientation, pngToPdfPageSize, pngToPdfMarginMm, pngToPdfMergeAll,
    imageToPdfOrientation, imageToPdfPageSize, imageToPdfMarginMm, imageToPdfMergeAll,
    htmlToPdfOrientation, htmlToPdfPageSize, htmlToPdfMarginMm, htmlToPdfMergeAll,
    htmlToPdfFileBreak, htmlToPdfFileGapMm,
    scanToPdfOrientation, scanToPdfPageSize, scanToPdfMarginMm, scanToPdfMergeAll,
    scanToPdfAutoEnhance, scanToPdfColorMode,
    editPdfAnnotations, editedMetadata, redactAreas, annotateAnnotations, signElements, pageNumberOptions,
    cropArea, cropMargins, cropMode, cropPageMode, cropCurrentPage, cropPageRange,
    isPageNumbers, isPagesPerSheet, nupCount, nupSheetSize, nupOrientation, nupPageOrder, nupGap, nupBorder, nupFileMode,
    isHeaderFooter, hfOptions, isBooklet, bookletOptions, isOverlay, overlayOptions,
  ]);

  // ─── getButtonLabel ───
  const getButtonLabel = useCallback((props: {
    title: string;
    redactLabels?: { applyButton: string };
    editPdfLabels?: { applyButton: string };
    protectLabels?: { protectButton: string };
    editMetadataLabels?: { applyButton: string };
    webOptimizeLabels?: { optimizeButton: string };
    jpgToPdfLabels?: { convertButton: string };
    pngToPdfLabels?: { convertButton: string };
    imageToPdfLabels?: { convertButton: string };
    htmlToPdfLabels?: { convertButton: string };
    scanToPdfLabels?: { convertButton: string };
    pdfToJpgLabels?: { convertButton: string };
    pdfToPngLabels?: { convertButton: string };
    pdfToTextLabels?: { convertButton: string };
    flattenLabels?: { flattenButton: string };
    cropLabels?: { cropButton: string };
    pageNumbersLabels?: { applyButton: string };
    annotateLabels?: { applyButton: string };
    signLabels?: { applyButton: string };
    watermarkLabels?: { applyButton: string };
  }): string => {
    if (isWatermark && props.watermarkLabels) return props.watermarkLabels.applyButton;
    if (isSign && props.signLabels) return props.signLabels.applyButton;
    if (isAnnotate && props.annotateLabels) return props.annotateLabels.applyButton;
    if (isPageNumbers && props.pageNumbersLabels) return props.pageNumbersLabels.applyButton;
    if (isRedact && props.redactLabels) return props.redactLabels.applyButton;
    if (isCrop && props.cropLabels) return props.cropLabels.cropButton;
    if (isFlatten && props.flattenLabels) return props.flattenLabels.flattenButton;
    if (isEditPdf && props.editPdfLabels) return props.editPdfLabels.applyButton;
    if (isProtect && props.protectLabels) return props.protectLabels.protectButton;
    if (isEditMetadata && props.editMetadataLabels) return props.editMetadataLabels.applyButton;
    if (isWebOptimize && props.webOptimizeLabels) return props.webOptimizeLabels.optimizeButton;
    if (isJpgToPdf && props.jpgToPdfLabels) return props.jpgToPdfLabels.convertButton;
    if (isPngToPdf && props.pngToPdfLabels) return props.pngToPdfLabels.convertButton;
    if (isImageToPdf && props.imageToPdfLabels) return props.imageToPdfLabels.convertButton;
    if (isHtmlToPdf && props.htmlToPdfLabels) return props.htmlToPdfLabels.convertButton;
    if (isScanToPdf && props.scanToPdfLabels) return props.scanToPdfLabels.convertButton;
    if (isPdfToJpg && props.pdfToJpgLabels) return props.pdfToJpgLabels.convertButton;
    if (isPdfToPng && props.pdfToPngLabels) return props.pdfToPngLabels.convertButton;
    if (isPdfToText && props.pdfToTextLabels) return props.pdfToTextLabels.convertButton;
    return props.title;
  }, [
    isWatermark, isSign, isAnnotate, isPageNumbers, isRedact, isCrop, isFlatten, isEditPdf, isProtect, isEditMetadata, isWebOptimize,
    isJpgToPdf, isPngToPdf, isImageToPdf, isHtmlToPdf, isScanToPdf,
    isPdfToJpg, isPdfToPng, isPdfToText,
  ]);

  // ─── isDisabled ───
  const isDisabled = useMemo((): boolean => {
    if (!implemented) return true;
    if (isDeletePages && (deletedPages.size === 0 || deletedPages.size >= (pageCounts[files[0] ? fileId(files[0]) : ""] ?? 0))) return true;
    if (isExtractPages && (extractedPages.size === 0 || extractedPages.size >= (pageCounts[files[0] ? fileId(files[0]) : ""] ?? 0))) return true;
    if (isOrganizePages && (organizePages.length - organizePages.filter(p => p.deleted).length) === 0) return true;
    if (isRotate && Object.values(rotations).filter(r => r > 0).length === 0) return true;
    if (isEditMetadata && !editedMetadata) return true;
    if (isProtect && !protectOptions._valid) return true;
    if (isRedact && redactAreas.length === 0) return true;
    if (isAnnotate && annotateAnnotations.length === 0) return true;
    if (isSign && signElements.length === 0) return true;
    if (isEditPdf && editPdfAnnotations.length === 0) return true;
    if (isCrop && cropMode === "area" && !cropArea) return true;
    if (isCrop && cropMode === "margins" && cropMargins.top === 0 && cropMargins.right === 0 && cropMargins.bottom === 0 && cropMargins.left === 0) return true;
    if (isOverlay && files.length < 2) return true;
    return false;
  }, [
    implemented, isDeletePages, isExtractPages, isOrganizePages, isRotate,
    isEditMetadata, isProtect, isEditPdf, isCrop, isRedact, isAnnotate, isSign, deletedPages, extractedPages,
    cropArea, cropMode, cropMargins,
    organizePages, rotations, editedMetadata, protectOptions, editPdfAnnotations, redactAreas, annotateAnnotations, signElements,
    pageCounts, files,
  ]);

  // ─── getLayoutSize ───
  const getLayoutSize = useCallback((currentStage: string): "sm" | "md" | "lg" | "xl" | "full" => {
    if ((isEditPdf || isRedact || isAnnotate || isSign) && currentStage !== "idle") return "full";
    if ((isWatermark || isPageNumbers || isCrop || isSplit || isDeletePages || isExtractPages || isOrganizePages || isRotate || isProtect || isEditMetadata || isFlatten || isPdfToJpg || isPdfToPng || isPdfToText || isJpgToPdf || isPngToPdf || isImageToPdf || isHtmlToPdf || isScanToPdf || isPagesPerSheet || isHeaderFooter || isOverlay || isBooklet) && currentStage !== "idle") return "xl";
    if (isExtractImages && currentStage !== "idle") return "md";
    return "lg";
  }, [
    isEditPdf, isRedact, isAnnotate, isSign, isWatermark, isPageNumbers, isCrop, isSplit, isDeletePages, isExtractPages, isOrganizePages,
    isRotate, isProtect, isEditMetadata, isFlatten, isPdfToJpg, isPdfToPng, isPdfToText,
    isJpgToPdf, isPngToPdf, isImageToPdf, isHtmlToPdf, isScanToPdf,
    isExtractImages,
  ]);

  return {
    // Boolean flags
    isSplit,
    isCompress,
    isDeletePages,
    isExtractPages,
    isPdfToJpg,
    isPdfToPng,
    isPdfToText,
    isExtractImages,
    isJpgToPdf,
    isPngToPdf,
    isImageToPdf,
    isHtmlToPdf,
    isScanToPdf,
    isOrganizePages,
    isRotate,
    isResize,
    isWebOptimize,
    isProtect,
    isGrayscale,
    isEditMetadata,
    isEditPdf,
    isFlatten,
    isCrop,
    isRedact,
    isPageNumbers,
    isAnnotate,
    isSign,
    isWatermark,
    isPagesPerSheet,
    isHeaderFooter,
    isOverlay,
    isBooklet,
    isSingleFileMode,
    implemented,

    // Favorites
    fav,
    showFavHint,
    favToast,
    setFavToast,
    handleFavHintEnter,
    handleToggleFavorite,

    // Split
    splitOptions,
    setSplitOptions,
    splitSetRangesRef,
    splitSetExtractPagesRef,
    splitValidateRef,

    // Compress
    compressOptions,
    setCompressOptions,

    // Web optimize
    webOptimizeOptions,
    setWebOptimizeOptions,

    // Protect
    protectOptions,
    setProtectOptions,

    // Delete pages
    deletedPages,
    setDeletedPages,
    deletePageOrder,
    setDeletePageOrder,
    handleToggleDeletePage,

    // Extract pages
    extractedPages,
    setExtractedPages,
    extractPageOrder,
    setExtractPageOrder,
    handleToggleExtractPage,

    // PDF to JPG/PNG quality
    jpgQuality,
    setJpgQuality,
    pngQuality,
    setPngQuality,

    // JPG to PDF
    jpgToPdfOrientation,
    setJpgToPdfOrientation,
    jpgToPdfPageSize,
    setJpgToPdfPageSize,
    jpgToPdfMarginMm,
    setJpgToPdfMarginMm,
    jpgToPdfMergeAll,
    setJpgToPdfMergeAll,

    // PNG to PDF
    pngToPdfOrientation,
    setPngToPdfOrientation,
    pngToPdfPageSize,
    setPngToPdfPageSize,
    pngToPdfMarginMm,
    setPngToPdfMarginMm,
    pngToPdfMergeAll,
    setPngToPdfMergeAll,

    // Image to PDF
    imageToPdfOrientation,
    setImageToPdfOrientation,
    imageToPdfPageSize,
    setImageToPdfPageSize,
    imageToPdfMarginMm,
    setImageToPdfMarginMm,
    imageToPdfMergeAll,
    setImageToPdfMergeAll,

    // HTML to PDF
    htmlToPdfOrientation,
    setHtmlToPdfOrientation,
    htmlToPdfPageSize,
    setHtmlToPdfPageSize,
    htmlToPdfMarginMm,
    setHtmlToPdfMarginMm,
    htmlToPdfMergeAll,
    setHtmlToPdfMergeAll,
    htmlToPdfFileBreak,
    setHtmlToPdfFileBreak,
    htmlToPdfFileGapMm,
    setHtmlToPdfFileGapMm,

    // Scan to PDF
    scanToPdfOrientation,
    setScanToPdfOrientation,
    scanToPdfPageSize,
    setScanToPdfPageSize,
    scanToPdfMarginMm,
    setScanToPdfMarginMm,
    scanToPdfMergeAll,
    setScanToPdfMergeAll,
    scanToPdfAutoEnhance,
    setScanToPdfAutoEnhance,
    scanToPdfColorMode,
    setScanToPdfColorMode,

    // Organize pages
    organizePages,
    setOrganizePages,
    handleOrganizePagesReset,

    // Resize
    resizePreset,
    setResizePreset,
    resizeCustomW,
    setResizeCustomW,
    resizeCustomH,
    setResizeCustomH,
    resizeUnit,
    setResizeUnit,
    resizeOrientation,
    setResizeOrientation,
    resizeScaleMode,
    setResizeScaleMode,
    resizeMarginPreset,
    setResizeMarginPreset,

    // Pages Per Sheet
    nupCount,
    setNupCount,
    nupSheetSize,
    setNupSheetSize,
    nupOrientation,
    setNupOrientation,
    nupPageOrder,
    setNupPageOrder,
    nupGap,
    setNupGap,
    nupBorder,
    setNupBorder,
    nupFileMode,
    setNupFileMode,

    // Header/Footer
    hfOptions,
    setHfOptions,

    // Booklet
    bookletOptions,
    setBookletOptions,

    // Overlay
    overlayOptions,
    setOverlayOptions,

    // Crop
    cropArea,
    setCropArea,
    cropMargins,
    setCropMargins,
    cropMode,
    setCropMode,
    cropPageMode,
    setCropPageMode,
    cropCurrentPage,
    setCropCurrentPage,
    cropPageRange,
    setCropPageRange,

    // Flatten
    flattenOptions,
    setFlattenOptions,

    // Page Numbers
    pageNumberOptions,
    setPageNumberOptions,

    // Watermark
    watermarkOptions,
    setWatermarkOptions,

    // Redact
    redactAreas,
    setRedactAreas,

    // Annotate
    annotateAnnotations,
    setAnnotateAnnotations,

    // Sign
    signElements,
    setSignElements,

    // Edit PDF
    editPdfAnnotations,
    setEditPdfAnnotations,

    // Edit Metadata
    editedMetadata,
    setEditedMetadata,
    originalMetadata,
    metadataLoading,

    // Handlers
    handleSingleFileChange,
    handleAddMore,

    // Computed
    buildProcessOptions,
    getButtonLabel,
    isDisabled,
    getLayoutSize,
  };
}

export type UseToolStateReturn = ReturnType<typeof useToolState>;
