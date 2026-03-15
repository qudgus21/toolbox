"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FileList } from "./file-list";
import { SplitOptions } from "./split-options";
import { SplitPagePreview } from "./split-page-preview";
import { CompressOptions } from "./compress-options";
import { DeletePagesPreview } from "./delete-pages-preview";
import { DeletePagesOptions } from "./delete-pages-options";
import { ExtractPagesPreview } from "./extract-pages-preview";
import { ExtractPagesOptions } from "./extract-pages-options";
import { PdfToJpgOptions } from "./pdf-to-jpg-options";
import { PdfToPngOptions } from "./pdf-to-png-options";
import { PdfToTextOptions } from "./pdf-to-text-options";
import { ExtractImagesOptions } from "./extract-images-options";
import { JpgToPdfOptions } from "./jpg-to-pdf-options";
import { PngToPdfOptions } from "./png-to-pdf-options";
import { ImageToPdfOptions } from "./image-to-pdf-options";
import { HtmlToPdfOptions } from "./html-to-pdf-options";
import { ScanToPdfOptions } from "./scan-to-pdf-options";
import { OrganizePagesPreview } from "./organize-pages-preview";
import { OrganizePagesOptions } from "./organize-pages-options";
import { RotateOptions } from "./rotate-options";
import { EditMetadataOptions } from "./edit-metadata-options";
import { ResizeOptions, MARGIN_VALUES } from "./resize-options";
import { WebOptimizeOptions } from "./web-optimize-options";
import { ProtectOptions } from "./protect-options";
import { FlattenOptions } from "./flatten-options";
import { FlattenPreview } from "./flatten-preview";
import { CropLayout } from "./crop-layout";
import { EditorLayout } from "./edit-pdf/editor-layout";
import { fileId } from "./file-list";
import { SortDropdown } from "./sort-dropdown";
import { FileInfoBar } from "./file-info-bar";
import { MultiFileToolbar } from "./multi-file-toolbar";
import type { ReactNode } from "react";
import type { ToolPageClientProps, CommonLabels } from "./tool-page-types";
import type { UseToolStateReturn } from "./use-tool-state";
import { analyzePdf, type FlattenAnalysis } from "@/lib/processors/flatten";
import type { FlattenLabels } from "./flatten-options";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface ToolLoadedContentProps {
  // From parent props
  labels: ToolPageClientProps["labels"];
  splitLabels: ToolPageClientProps["splitLabels"];
  compressLabels: ToolPageClientProps["compressLabels"];
  deletePagesLabels: ToolPageClientProps["deletePagesLabels"];
  extractPagesLabels: ToolPageClientProps["extractPagesLabels"];
  pdfToJpgLabels: ToolPageClientProps["pdfToJpgLabels"];
  pdfToPngLabels: ToolPageClientProps["pdfToPngLabels"];
  pdfToTextLabels: ToolPageClientProps["pdfToTextLabels"];
  extractImagesLabels: ToolPageClientProps["extractImagesLabels"];
  jpgToPdfLabels: ToolPageClientProps["jpgToPdfLabels"];
  pngToPdfLabels: ToolPageClientProps["pngToPdfLabels"];
  imageToPdfLabels: ToolPageClientProps["imageToPdfLabels"];
  htmlToPdfLabels: ToolPageClientProps["htmlToPdfLabels"];
  scanToPdfLabels: ToolPageClientProps["scanToPdfLabels"];
  organizePagesLabels: ToolPageClientProps["organizePagesLabels"];
  rotateLabels: ToolPageClientProps["rotateLabels"];
  resizeLabels: ToolPageClientProps["resizeLabels"];
  webOptimizeLabels: ToolPageClientProps["webOptimizeLabels"];
  protectLabels: ToolPageClientProps["protectLabels"];
  flattenLabels: ToolPageClientProps["flattenLabels"];
  cropLabels: ToolPageClientProps["cropLabels"];
  editMetadataLabels: ToolPageClientProps["editMetadataLabels"];
  editPdfLabels: ToolPageClientProps["editPdfLabels"];
  children?: ReactNode;

  // From useToolProcessor
  files: File[];
  rotations: Record<string, number>;
  pageSelections: Record<string, number[]>;
  pageCounts: Record<string, number>;
  totalPages: number;
  encryptedFiles: Set<string>;
  removeFile: (index: number) => void;
  reorderFiles: (files: File[]) => void;
  rotateFile: (fileKey: string) => void;
  setPageSelection: (fileKey: string, pages: number[]) => void;
  sortFiles: (mode: "name-asc" | "name-desc" | "size-asc" | "size-desc") => void;
  reset: () => void;

  // From useToolState
  toolState: UseToolStateReturn;

  // Page selector
  setPageSelectorFile: (file: File | null) => void;
}

export function ToolLoadedContent({
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
  children,
  files,
  rotations,
  pageSelections,
  pageCounts,
  totalPages,
  encryptedFiles,
  removeFile,
  reorderFiles,
  rotateFile,
  setPageSelection,
  sortFiles,
  reset,
  toolState,
  setPageSelectorFile,
}: ToolLoadedContentProps) {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const {
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

    handleSingleFileChange,
    handleAddMore,
    handleToggleDeletePage,
    handleToggleExtractPage,
    handleOrganizePagesReset,

    splitOptions,
    setSplitOptions,
    splitSetRangesRef,
    splitSetExtractPagesRef,
    splitValidateRef,

    setCompressOptions,
    setWebOptimizeOptions,
    setProtectOptions,
    setFlattenOptions,
    flattenOptions,

    deletedPages,
    setDeletedPages,
    deletePageOrder,
    setDeletePageOrder,

    extractedPages,
    setExtractedPages,
    extractPageOrder,
    setExtractPageOrder,

    jpgQuality,
    setJpgQuality,
    pngQuality,
    setPngQuality,

    jpgToPdfOrientation,
    setJpgToPdfOrientation,
    jpgToPdfPageSize,
    setJpgToPdfPageSize,
    jpgToPdfMarginMm,
    setJpgToPdfMarginMm,
    jpgToPdfMergeAll,
    setJpgToPdfMergeAll,

    pngToPdfOrientation,
    setPngToPdfOrientation,
    pngToPdfPageSize,
    setPngToPdfPageSize,
    pngToPdfMarginMm,
    setPngToPdfMarginMm,
    pngToPdfMergeAll,
    setPngToPdfMergeAll,

    imageToPdfOrientation,
    setImageToPdfOrientation,
    imageToPdfPageSize,
    setImageToPdfPageSize,
    imageToPdfMarginMm,
    setImageToPdfMarginMm,
    imageToPdfMergeAll,
    setImageToPdfMergeAll,

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

    organizePages,
    setOrganizePages,

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

    setEditPdfAnnotations,

    editedMetadata,
    setEditedMetadata,
    originalMetadata,
    metadataLoading,
  } = toolState;

  return (
    <>
      {isSplit && splitLabels && files.length > 0 ? (
        /* ─── Split: single-file mode ─── */
        <>
          {/* File info bar */}
          <FileInfoBar
            file={files[0]}
            pageCount={pageCounts[fileId(files[0])]}
            changeLabel={splitLabels.changeFile}
            onChangeFile={handleSingleFileChange}
          />

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
          <FileInfoBar
            file={files[0]}
            pageCount={pageCounts[fileId(files[0])]}
            changeLabel={deletePagesLabels.changeFile}
            onChangeFile={handleSingleFileChange}
          />

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
          <FileInfoBar
            file={files[0]}
            pageCount={pageCounts[fileId(files[0])]}
            changeLabel={extractPagesLabels.changeFile}
            onChangeFile={handleSingleFileChange}
          />

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
          <FileInfoBar
            file={files[0]}
            pageCount={pageCounts[fileId(files[0])]}
            changeLabel={organizePagesLabels.changeFile}
            onChangeFile={handleSingleFileChange}
          />

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
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
      ) : isProtect && protectLabels && files.length > 0 ? (
        /* ─── Protect: multi-file + options sidebar ─── */
        <>
          {/* Toolbar */}
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

          {/* Cards + Options */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
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
              />
            </div>

            <div className="lg:sticky lg:top-4 lg:self-start">
              <ProtectOptions
                onChange={setProtectOptions}
                labels={protectLabels}
              />
            </div>
          </div>
        </>
      ) : isEditPdf && editPdfLabels && files.length > 0 ? (
        /* ─── Edit PDF: full-screen editor ─── */
        <EditorLayout
          file={files[0]}
          labels={editPdfLabels}
          onAnnotationsChange={setEditPdfAnnotations}
          onChangeFile={handleSingleFileChange}
        />
      ) : isEditMetadata && editMetadataLabels && files.length > 0 ? (
        /* ─── Edit Metadata: single-file + form sidebar ─── */
        <>
          {/* File info bar */}
          <FileInfoBar
            file={files[0]}
            pageCount={pageCounts[fileId(files[0])]}
            changeLabel={editMetadataLabels.changeFile}
            onChangeFile={handleSingleFileChange}
            accentColor="purple"
          />

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
          <FileInfoBar
            file={files[0]}
            pageCount={pageCounts[fileId(files[0])]}
            changeLabel={extractImagesLabels.changeFile}
            onChangeFile={handleSingleFileChange}
            accentColor="blue"
          />

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
          <MultiFileToolbar
            files={files}
            totalPages={totalPages}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
          <MultiFileToolbar
            files={files}
            totalPages={totalPages}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
      ) : isCrop && cropLabels && files.length > 0 ? (
        /* ─── Crop: full-screen editor-style layout ─── */
        <CropLayout
          file={files[0]}
          pageCount={pageCounts[fileId(files[0])] ?? 0}
          cropArea={cropArea}
          onCropAreaChange={setCropArea}
          cropMargins={cropMargins}
          onCropMarginsChange={setCropMargins}
          cropMode={cropMode}
          onCropModeChange={setCropMode}
          cropPageMode={cropPageMode}
          onCropPageModeChange={setCropPageMode}
          cropCurrentPage={cropCurrentPage}
          onCropCurrentPageChange={setCropCurrentPage}
          cropPageRange={cropPageRange}
          onCropPageRangeChange={setCropPageRange}
          onResetAll={() => {
            setCropArea(null);
            setCropMargins({ top: 10, right: 10, bottom: 10, left: 10 });
          }}
          onChangeFile={handleSingleFileChange}
          labels={cropLabels}
        />
      ) : isFlatten && flattenLabels && files.length > 0 ? (
        /* ─── Flatten: single-file preview + options sidebar ─── */
        <FlattenLoadedContent
          file={files[0]}
          pageCount={pageCounts[fileId(files[0])] ?? 0}
          flattenLabels={flattenLabels}
          flattenOptions={flattenOptions}
          setFlattenOptions={setFlattenOptions}
          onChangeFile={handleSingleFileChange}
          labels={labels}
        />
      ) : isWebOptimize && webOptimizeLabels && files.length > 0 ? (
        /* ─── Web Optimize: multi-file + options sidebar ─── */
        <>
          {/* Toolbar */}
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
              />
            </div>

            <div className="lg:sticky lg:top-4 lg:self-start">
              <WebOptimizeOptions
                onChange={setWebOptimizeOptions}
                labels={webOptimizeLabels}
              />
            </div>
          </div>
        </>
      ) : isScanToPdf && scanToPdfLabels && files.length > 0 ? (
        /* ─── Scan to PDF: multi-file + options sidebar ─── */
        <>
          {/* Toolbar */}
          <MultiFileToolbar
            files={files}
            sortMenuOpen={sortMenuOpen}
            onSortMenuOpenChange={setSortMenuOpen}
            onSort={sortFiles}
            onAddMore={handleAddMore}
            labels={{ filesSelected: labels.filesSelected, addMoreFiles: labels.addMoreFiles, sortByName: labels.sortByName }}
          />

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
                <SortDropdown
                  open={sortMenuOpen}
                  onOpenChange={setSortMenuOpen}
                  onSort={sortFiles}
                  sortLabel={labels.sortByName}
                />
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
            onRotate={isCompress || isGrayscale || isProtect ? undefined : rotateFile}
            onCardClick={isCompress || isGrayscale || isProtect ? undefined : (file) => setPageSelectorFile(file)}
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



      {/* 도구별 옵션 UI 슬롯 */}
      {children}

      {/* 하단 버튼 여백 확보 */}
      <div className="h-24" />
    </>
  );
}

/* ─── Flatten: 분석 + 미리보기 + 옵션 래퍼 ─── */

function FlattenLoadedContent({
  file,
  pageCount,
  flattenLabels,
  flattenOptions,
  setFlattenOptions,
  onChangeFile,
  labels,
}: {
  file: File;
  pageCount: number;
  flattenLabels: FlattenLabels;
  flattenOptions: Record<string, unknown>;
  setFlattenOptions: (opts: Record<string, unknown>) => void;
  onChangeFile: () => void;
  labels: CommonLabels;
}) {
  const [analysis, setAnalysis] = useState<FlattenAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    setAnalysisLoading(true);
    setAnalysis(null);

    analyzePdf(file).then((result) => {
      if (cancelled) return;
      setAnalysis(result);
      setAnalysisLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setAnalysisLoading(false);
    });

    return () => { cancelled = true; };
  }, [file]);

  return (
    <>
      {/* File info */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="self-start">
          <FlattenPreview
            file={file}
            pageCount={pageCount}
            analysis={analysis}
            flattenForms={(flattenOptions.formFields as boolean) ?? true}
            flattenAnnotations={(flattenOptions.annotations as boolean) ?? true}
            labels={{
              pageOf: labels.process ?? "pages",
              changeFile: labels.startOver ?? "Change file",
            }}
            onChangeFile={onChangeFile}
          />
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <FlattenOptions
            onChange={setFlattenOptions}
            labels={flattenLabels}
            analysis={analysis}
            analysisLoading={analysisLoading}
          />
        </div>
      </div>
    </>
  );
}
