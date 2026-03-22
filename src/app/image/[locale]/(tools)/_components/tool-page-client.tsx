"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { ToolPageLayout, FileUploadZone } from "@/lib/ui";
import { useToolProcessor } from "@/lib/image/use-tool-processor";
import { hasProcessor } from "@/lib/image/processor-registry";
import type { ImageDictionary } from "@/lib/i18n/image-config";
import { ProcessingOverlay } from "./processing-overlay";
import { ResultCard } from "./result-card";
import { ErrorMessage } from "./error-message";
import { useImageDimensions } from "./use-image-dimensions";
import { ImagePreview } from "./image-preview";
import { ResizeOptions, getDefaultResizeOptions } from "./resize-options";
import type { ResizeOptionsValue } from "./resize-options";
import { CropEditor, getDefaultCropOptions } from "./crop-editor";
import type { CropOptionsValue } from "./crop-options";
import { RotateOptions, getDefaultRotateOptions } from "./rotate-options";
import type { RotateOptionsValue } from "./rotate-options";
import { FlipOptions, getDefaultFlipOptions } from "./flip-options";
import type { FlipOptionsValue } from "./flip-options";
import { CompressOptions, getDefaultCompressOptions } from "./compress-options";
import type { CompressOptionsValue } from "./compress-options";
import { ConvertOptions, getDefaultConvertOptions } from "./convert-options";
import type { ConvertOptionsValue } from "./convert-options";
import { GrayscaleOptions, getDefaultGrayscaleOptions } from "./grayscale-options";
import type { GrayscaleOptionsValue } from "./grayscale-options";
import { AddTextOptions, getDefaultAddTextOptions } from "./add-text-options";
import type { AddTextOptionsValue } from "./add-text-options";
import { AddBorderOptions, getDefaultAddBorderOptions } from "./add-border-options";
import type { AddBorderOptionsValue } from "./add-border-options";
import { PixelateOptions, getDefaultPixelateOptions } from "./pixelate-options";
import type { PixelateOptionsValue } from "./pixelate-options";
import { BlurOptions, getDefaultBlurOptions } from "./blur-options";
import type { BlurOptionsValue } from "./blur-options";
import { FiltersOptions, getDefaultFiltersOptions } from "./filters-options";
import type { FiltersOptionsValue } from "./filters-options";
import { CombineOptions, getDefaultCombineOptions } from "./combine-options";
import type { CombineOptionsValue } from "./combine-options";
import { SplitOptions, getDefaultSplitOptions } from "./split-options";
import type { SplitOptionsValue } from "./split-options";
import { CollageOptions, getDefaultCollageOptions } from "./collage-options";
import type { CollageOptionsValue } from "./collage-options";
import { RoundOptions, getDefaultRoundOptions } from "./round-options";
import type { RoundOptionsValue } from "./round-options";
import { ProfilePhotoOptions, getDefaultProfilePhotoOptions } from "./profile-photo-options";
import type { ProfilePhotoOptionsValue } from "./profile-photo-options";
import { MemeOptions, getDefaultMemeOptions } from "./meme-options";
import type { MemeOptionsValue } from "./meme-options";
import { WatermarkOptions, getDefaultWatermarkOptions } from "./watermark-options";
import type { WatermarkOptionsValue } from "./watermark-options";
import { ColorReplaceOptions, getDefaultColorReplaceOptions } from "./color-replace-options";
import type { ColorReplaceOptionsValue } from "./color-replace-options";
import { VignetteOptions, getDefaultVignetteOptions } from "./vignette-options";
import type { VignetteOptionsValue } from "./vignette-options";
import { NoiseOptions, getDefaultNoiseOptions } from "./noise-options";
import type { NoiseOptionsValue } from "./noise-options";
import { SharpenOptions, getDefaultSharpenOptions } from "./sharpen-options";
import type { SharpenOptionsValue } from "./sharpen-options";
import { SepiaOptions, getDefaultSepiaOptions } from "./sepia-options";
import type { SepiaOptionsValue } from "./sepia-options";
import { InvertOptions, getDefaultInvertOptions } from "./invert-options";
import type { InvertOptionsValue } from "./invert-options";
import { ImageToIconOptions, getDefaultImageToIconOptions } from "./image-to-icon-options";
import type { ImageToIconOptionsValue } from "./image-to-icon-options";
import { ColorPaletteOptions, getDefaultColorPaletteOptions } from "./color-palette-options";
import type { ColorPaletteOptionsValue } from "./color-palette-options";
import { HtmlToImageOptions, getDefaultHtmlToImageOptions } from "./html-to-image-options";
import type { HtmlToImageOptionsValue } from "./html-to-image-options";
import { GradientOptions, getDefaultGradientOptions } from "./gradient-options";
import type { GradientOptionsValue } from "./gradient-options";
import { PlaceholderOptions, getDefaultPlaceholderOptions } from "./placeholder-options";
import type { PlaceholderOptionsValue } from "./placeholder-options";
import { PatternOptions, getDefaultPatternOptions } from "./pattern-options";
import type { PatternOptionsValue } from "./pattern-options";
import { QrCodeOptions, getDefaultQrCodeOptions } from "./qr-code-options";
import type { QrCodeOptionsValue } from "./qr-code-options";

interface ToolPageClientProps {
  slug: string;
  locale: string;
  title: string;
  description: string;
  acceptedTypes: string;
  multiFile?: boolean;
  backHref: string;
  labels: ImageDictionary["common"];
}

type ToolOptionsMap = {
  resize: ResizeOptionsValue;
  crop: CropOptionsValue;
  rotate: RotateOptionsValue;
  flip: FlipOptionsValue;
  compress: CompressOptionsValue;
  convert: ConvertOptionsValue;
  grayscale: GrayscaleOptionsValue;
  "add-text": AddTextOptionsValue;
  "add-border": AddBorderOptionsValue;
  pixelate: PixelateOptionsValue;
  blur: BlurOptionsValue;
  filters: FiltersOptionsValue;
  combine: CombineOptionsValue;
  "split-image": SplitOptionsValue;
  collage: CollageOptionsValue;
  "round-image": RoundOptionsValue;
  "profile-photo": ProfilePhotoOptionsValue;
  meme: MemeOptionsValue;
  watermark: WatermarkOptionsValue;
  "color-replace": ColorReplaceOptionsValue;
  vignette: VignetteOptionsValue;
  noise: NoiseOptionsValue;
  sharpen: SharpenOptionsValue;
  sepia: SepiaOptionsValue;
  invert: InvertOptionsValue;
  "image-to-icon": ImageToIconOptionsValue;
  "color-palette": ColorPaletteOptionsValue;
  "html-to-image": HtmlToImageOptionsValue;
  gradient: GradientOptionsValue;
  placeholder: PlaceholderOptionsValue;
  pattern: PatternOptionsValue;
  "qr-code": QrCodeOptionsValue;
};

// Tools that have a dedicated options panel
const TOOLS_WITH_OPTIONS = new Set([
  "resize", "crop", "rotate", "flip", "compress",
  "grayscale", "add-text", "add-border", "pixelate", "blur", "filters",
  "combine", "split-image", "collage", "round-image", "profile-photo", "meme", "watermark",
  "color-replace", "vignette", "noise", "sharpen", "sepia", "invert",
  "image-to-icon", "color-palette", "html-to-image",
  "gradient", "placeholder", "pattern", "qr-code",
]);

// Multi-file tools that need to show all uploaded files
const MULTI_FILE_TOOLS = new Set(["combine", "collage"]);

// Tools that don't require file upload (generate from scratch)
const NO_UPLOAD_TOOLS = new Set([
  "html-to-image", "gradient", "placeholder", "pattern", "qr-code",
]);

function isConvertTool(slug: string): boolean {
  return slug.includes("-to-");
}

function hasOptionsPanel(slug: string): boolean {
  return TOOLS_WITH_OPTIONS.has(slug) || isConvertTool(slug);
}

// Crop has its own built-in preview via CropEditor
function usesCropEditor(slug: string): boolean {
  return slug === "crop";
}

// Tools where a standalone preview makes sense
function usesImagePreview(slug: string): boolean {
  return ["resize", "rotate", "flip", "grayscale", "add-text", "add-border",
    "pixelate", "blur", "filters", "round-image", "profile-photo", "meme", "watermark",
    "color-replace", "vignette", "noise", "sharpen", "sepia", "invert"].includes(slug);
}

export function ToolPageClient({
  slug,
  locale,
  title,
  description,
  acceptedTypes,
  multiFile,
  backHref,
  labels,
}: ToolPageClientProps) {
  const {
    stage,
    files,
    progress,
    result,
    error,
    addFiles,
    removeFile,
    process: processFiles,
    download,
    reset,
  } = useToolProcessor(slug);

  const firstFile = files.length > 0 ? files[0] : null;
  const { width: origW, height: origH, loading: dimLoading } = useImageDimensions(firstFile);

  // Tool-specific options state
  const [resizeOpts, setResizeOpts] = useState<ResizeOptionsValue | null>(null);
  const [cropOpts, setCropOpts] = useState<CropOptionsValue | null>(null);
  const [rotateOpts, setRotateOpts] = useState<RotateOptionsValue>(getDefaultRotateOptions());
  const [flipOpts, setFlipOpts] = useState<FlipOptionsValue>(getDefaultFlipOptions());
  const [compressOpts, setCompressOpts] = useState<CompressOptionsValue>(getDefaultCompressOptions());
  const [convertOpts, setConvertOpts] = useState<ConvertOptionsValue>(getDefaultConvertOptions(slug));
  const [grayscaleOpts, setGrayscaleOpts] = useState<GrayscaleOptionsValue>(getDefaultGrayscaleOptions());
  const [addTextOpts, setAddTextOpts] = useState<AddTextOptionsValue>(getDefaultAddTextOptions());
  const [addBorderOpts, setAddBorderOpts] = useState<AddBorderOptionsValue>(getDefaultAddBorderOptions());
  const [pixelateOpts, setPixelateOpts] = useState<PixelateOptionsValue>(getDefaultPixelateOptions());
  const [blurOpts, setBlurOpts] = useState<BlurOptionsValue>(getDefaultBlurOptions());
  const [filtersOpts, setFiltersOpts] = useState<FiltersOptionsValue>(getDefaultFiltersOptions());
  const [combineOpts, setCombineOpts] = useState<CombineOptionsValue>(getDefaultCombineOptions());
  const [splitOpts, setSplitOpts] = useState<SplitOptionsValue>(getDefaultSplitOptions());
  const [collageOpts, setCollageOpts] = useState<CollageOptionsValue>(getDefaultCollageOptions());
  const [roundOpts, setRoundOpts] = useState<RoundOptionsValue>(getDefaultRoundOptions());
  const [profilePhotoOpts, setProfilePhotoOpts] = useState<ProfilePhotoOptionsValue>(getDefaultProfilePhotoOptions());
  const [memeOpts, setMemeOpts] = useState<MemeOptionsValue>(getDefaultMemeOptions());
  const [watermarkOpts, setWatermarkOpts] = useState<WatermarkOptionsValue>(getDefaultWatermarkOptions());
  const [colorReplaceOpts, setColorReplaceOpts] = useState<ColorReplaceOptionsValue>(getDefaultColorReplaceOptions());
  const [vignetteOpts, setVignetteOpts] = useState<VignetteOptionsValue>(getDefaultVignetteOptions());
  const [noiseOpts, setNoiseOpts] = useState<NoiseOptionsValue>(getDefaultNoiseOptions());
  const [sharpenOpts, setSharpenOpts] = useState<SharpenOptionsValue>(getDefaultSharpenOptions());
  const [sepiaOpts, setSepiaOpts] = useState<SepiaOptionsValue>(getDefaultSepiaOptions());
  const [invertOpts, setInvertOpts] = useState<InvertOptionsValue>(getDefaultInvertOptions());
  const [imageToIconOpts, setImageToIconOpts] = useState<ImageToIconOptionsValue>(getDefaultImageToIconOptions());
  const [colorPaletteOpts, setColorPaletteOpts] = useState<ColorPaletteOptionsValue>(getDefaultColorPaletteOptions());
  const [htmlToImageOpts, setHtmlToImageOpts] = useState<HtmlToImageOptionsValue>(getDefaultHtmlToImageOptions());
  const [gradientOpts, setGradientOpts] = useState<GradientOptionsValue>(getDefaultGradientOptions());
  const [placeholderOpts, setPlaceholderOpts] = useState<PlaceholderOptionsValue>(getDefaultPlaceholderOptions());
  const [patternOpts, setPatternOpts] = useState<PatternOptionsValue>(getDefaultPatternOptions());
  const [qrCodeOpts, setQrCodeOpts] = useState<QrCodeOptionsValue>(getDefaultQrCodeOptions());

  // Initialize dimension-dependent options once dimensions are loaded
  const resizeValue = useMemo(() => {
    if (resizeOpts) return resizeOpts;
    if (origW > 0 && origH > 0) return getDefaultResizeOptions(origW, origH);
    return getDefaultResizeOptions(800, 600);
  }, [resizeOpts, origW, origH]);

  const cropValue = useMemo(() => {
    if (cropOpts) return cropOpts;
    if (origW > 0 && origH > 0) return getDefaultCropOptions(origW, origH);
    return getDefaultCropOptions(800, 600);
  }, [cropOpts, origW, origH]);

  // Build the options object to pass to the processor
  const buildProcessOptions = useCallback((): Record<string, unknown> => {
    switch (slug) {
      case "resize":
        return { ...resizeValue };
      case "crop":
        return {
          x: cropValue.x,
          y: cropValue.y,
          width: cropValue.width,
          height: cropValue.height,
        };
      case "rotate":
        return { ...rotateOpts };
      case "flip":
        return { ...flipOpts };
      case "compress":
        return { ...compressOpts };
      case "grayscale":
        return { ...grayscaleOpts };
      case "add-text":
        return { ...addTextOpts };
      case "add-border":
        return { ...addBorderOpts };
      case "pixelate":
        return { ...pixelateOpts };
      case "blur":
        return { ...blurOpts };
      case "filters":
        return { ...filtersOpts };
      case "combine":
        return { ...combineOpts };
      case "split-image":
        return { ...splitOpts };
      case "collage":
        return { ...collageOpts };
      case "round-image":
        return { ...roundOpts };
      case "profile-photo":
        return { ...profilePhotoOpts };
      case "meme":
        return { ...memeOpts };
      case "watermark":
        return { ...watermarkOpts };
      case "color-replace":
        return { ...colorReplaceOpts };
      case "vignette":
        return { ...vignetteOpts };
      case "noise":
        return { ...noiseOpts };
      case "sharpen":
        return { ...sharpenOpts };
      case "sepia":
        return { ...sepiaOpts };
      case "invert":
        return { ...invertOpts };
      case "image-to-icon":
        return { ...imageToIconOpts };
      case "color-palette":
        return { ...colorPaletteOpts };
      case "html-to-image":
        return { ...htmlToImageOpts };
      case "gradient":
        return { ...gradientOpts };
      case "placeholder":
        return { ...placeholderOpts };
      case "pattern":
        return { ...patternOpts };
      case "qr-code":
        return { ...qrCodeOpts };
      default:
        if (isConvertTool(slug)) {
          return { ...convertOpts };
        }
        return {};
    }
  }, [slug, resizeValue, cropValue, rotateOpts, flipOpts, compressOpts, convertOpts,
    grayscaleOpts, addTextOpts, addBorderOpts, pixelateOpts, blurOpts, filtersOpts,
    combineOpts, splitOpts, collageOpts, roundOpts, profilePhotoOpts, memeOpts, watermarkOpts,
    colorReplaceOpts, vignetteOpts, noiseOpts, sharpenOpts, sepiaOpts, invertOpts,
    imageToIconOpts, colorPaletteOpts, htmlToImageOpts, gradientOpts, placeholderOpts, patternOpts, qrCodeOpts]);

  // Options for preview (same as process options)
  const previewOptions = useMemo(() => buildProcessOptions(), [buildProcessOptions]);

  const handleProcess = useCallback(() => {
    processFiles(buildProcessOptions());
  }, [processFiles, buildProcessOptions]);

  const showOptionsPanel = hasOptionsPanel(slug);
  const showPreview = usesImagePreview(slug);
  const showCropEditor = usesCropEditor(slug);
  const isMultiFileTool = MULTI_FILE_TOOLS.has(slug);
  const isNoUploadTool = NO_UPLOAD_TOOLS.has(slug);

  // Whether we need the side-by-side / stacked layout
  const needsEditorLayout = stage === "loaded" && (showOptionsPanel || showPreview || showCropEditor);

  return (
    <ToolPageLayout
      title={title}
      description={description}
      backHref={backHref}
      backLabel={labels.backToAll}
      linkComponent={Link}
    >
      {/* Idle -- no-upload tools show options directly */}
      {stage === "idle" && isNoUploadTool && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Options
            </h3>

            {slug === "html-to-image" && (
              <HtmlToImageOptions value={htmlToImageOpts} onChange={setHtmlToImageOpts} />
            )}
            {slug === "gradient" && (
              <GradientOptions value={gradientOpts} onChange={setGradientOpts} />
            )}
            {slug === "placeholder" && (
              <PlaceholderOptions value={placeholderOpts} onChange={setPlaceholderOpts} />
            )}
            {slug === "pattern" && (
              <PatternOptions value={patternOpts} onChange={setPatternOpts} />
            )}
            {slug === "qr-code" && (
              <QrCodeOptions value={qrCodeOpts} onChange={setQrCodeOpts} />
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleProcess}
              className="cursor-pointer rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover transition-colors"
            >
              {labels.process}
            </button>
          </div>
        </div>
      )}

      {/* Idle -- upload zone (for tools that need files) */}
      {stage === "idle" && !isNoUploadTool && (
        <>
          {!hasProcessor(slug) && (
            <div className="mb-6 rounded-xl border border-warning/30 bg-warning-muted px-4 py-3 text-center text-sm text-foreground-muted">
              {labels.notImplemented}
            </div>
          )}
          <FileUploadZone
            accept={acceptedTypes}
            multiple={multiFile !== false}
            onFiles={addFiles}
            title={labels.dropFiles}
            description={labels.acceptedFormats}
          />
        </>
      )}

      {/* Loaded -- editor layout with preview + options */}
      {stage === "loaded" && !needsEditorLayout && (
        <LoadedSimple
          files={files}
          labels={labels}
          acceptedTypes={acceptedTypes}
          multiFile={multiFile}
          addFiles={addFiles}
          removeFile={removeFile}
          onProcess={handleProcess}
        />
      )}

      {stage === "loaded" && needsEditorLayout && (
        <div className="space-y-4">
          {/* File info bar */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2">
            <span className="text-sm text-foreground truncate">
              {firstFile?.name}
              {files.length > 1 && ` (+${files.length - 1} more)`}
            </span>
            <button
              onClick={reset}
              className="ml-2 text-xs text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Change file
            </button>
          </div>

          {/* Multi-file list for combine/collage tools */}
          {isMultiFileTool && files.length > 1 && (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-medium text-foreground mb-3">
                {files.length} {labels.filesSelected}
              </p>
              <ul className="space-y-2">
                {files.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between rounded-md bg-background-subtle px-3 py-2 text-sm"
                  >
                    <span className="truncate text-foreground">{file.name}</span>
                    <button
                      onClick={() => removeFile(i)}
                      className="ml-2 shrink-0 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <FileUploadZone
                  accept={acceptedTypes}
                  multiple
                  onFiles={addFiles}
                  title={labels.addMoreFiles}
                  className="min-h-[60px]"
                />
              </div>
            </div>
          )}

          {/* Crop editor (full-width, has its own preview) */}
          {showCropEditor && firstFile && origW > 0 && (
            <CropEditor
              file={firstFile}
              originalWidth={origW}
              originalHeight={origH}
              value={cropValue}
              onChange={setCropOpts}
            />
          )}

          {/* Side-by-side layout for preview + options (non-crop tools) */}
          {!showCropEditor && (
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Preview area */}
              {showPreview && firstFile && (
                <div className="flex-1 min-w-0">
                  <ImagePreview
                    file={firstFile}
                    slug={slug}
                    options={previewOptions}
                  />
                </div>
              )}

              {/* Options panel */}
              {showOptionsPanel && (
                <div
                  className={`shrink-0 rounded-lg border border-border bg-background p-4 ${
                    showPreview ? "lg:w-80" : "w-full"
                  }`}
                >
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    Options
                  </h3>

                  {slug === "resize" && origW > 0 && (
                    <ResizeOptions
                      originalWidth={origW}
                      originalHeight={origH}
                      value={resizeValue}
                      onChange={setResizeOpts}
                    />
                  )}

                  {slug === "rotate" && (
                    <RotateOptions
                      value={rotateOpts}
                      onChange={setRotateOpts}
                    />
                  )}

                  {slug === "flip" && (
                    <FlipOptions
                      value={flipOpts}
                      onChange={setFlipOpts}
                    />
                  )}

                  {slug === "compress" && (
                    <CompressOptions
                      value={compressOpts}
                      onChange={setCompressOpts}
                      originalSize={firstFile?.size}
                    />
                  )}

                  {isConvertTool(slug) && !TOOLS_WITH_OPTIONS.has(slug) && (
                    <ConvertOptions
                      slug={slug}
                      value={convertOpts}
                      onChange={setConvertOpts}
                    />
                  )}

                  {slug === "grayscale" && (
                    <GrayscaleOptions
                      value={grayscaleOpts}
                      onChange={setGrayscaleOpts}
                    />
                  )}

                  {slug === "add-text" && (
                    <AddTextOptions
                      value={addTextOpts}
                      onChange={setAddTextOpts}
                    />
                  )}

                  {slug === "add-border" && (
                    <AddBorderOptions
                      value={addBorderOpts}
                      onChange={setAddBorderOpts}
                    />
                  )}

                  {slug === "pixelate" && (
                    <PixelateOptions
                      value={pixelateOpts}
                      onChange={setPixelateOpts}
                    />
                  )}

                  {slug === "blur" && (
                    <BlurOptions
                      value={blurOpts}
                      onChange={setBlurOpts}
                    />
                  )}

                  {slug === "filters" && (
                    <FiltersOptions
                      value={filtersOpts}
                      onChange={setFiltersOpts}
                    />
                  )}

                  {slug === "combine" && (
                    <CombineOptions
                      value={combineOpts}
                      onChange={setCombineOpts}
                    />
                  )}

                  {slug === "split-image" && (
                    <SplitOptions
                      value={splitOpts}
                      onChange={setSplitOpts}
                    />
                  )}

                  {slug === "collage" && (
                    <CollageOptions
                      value={collageOpts}
                      onChange={setCollageOpts}
                    />
                  )}

                  {slug === "round-image" && (
                    <RoundOptions
                      value={roundOpts}
                      onChange={setRoundOpts}
                    />
                  )}

                  {slug === "profile-photo" && (
                    <ProfilePhotoOptions
                      value={profilePhotoOpts}
                      onChange={setProfilePhotoOpts}
                    />
                  )}

                  {slug === "meme" && (
                    <MemeOptions
                      value={memeOpts}
                      onChange={setMemeOpts}
                    />
                  )}

                  {slug === "watermark" && (
                    <WatermarkOptions
                      value={watermarkOpts}
                      onChange={setWatermarkOpts}
                    />
                  )}

                  {slug === "color-replace" && (
                    <ColorReplaceOptions
                      value={colorReplaceOpts}
                      onChange={setColorReplaceOpts}
                    />
                  )}

                  {slug === "vignette" && (
                    <VignetteOptions
                      value={vignetteOpts}
                      onChange={setVignetteOpts}
                    />
                  )}

                  {slug === "noise" && (
                    <NoiseOptions
                      value={noiseOpts}
                      onChange={setNoiseOpts}
                    />
                  )}

                  {slug === "sharpen" && (
                    <SharpenOptions
                      value={sharpenOpts}
                      onChange={setSharpenOpts}
                    />
                  )}

                  {slug === "sepia" && (
                    <SepiaOptions
                      value={sepiaOpts}
                      onChange={setSepiaOpts}
                    />
                  )}

                  {slug === "invert" && (
                    <InvertOptions
                      value={invertOpts}
                      onChange={setInvertOpts}
                    />
                  )}

                  {slug === "image-to-icon" && (
                    <ImageToIconOptions
                      value={imageToIconOpts}
                      onChange={setImageToIconOpts}
                    />
                  )}

                  {slug === "color-palette" && (
                    <ColorPaletteOptions
                      value={colorPaletteOpts}
                      onChange={setColorPaletteOpts}
                    />
                  )}

                  {slug === "html-to-image" && (
                    <HtmlToImageOptions
                      value={htmlToImageOpts}
                      onChange={setHtmlToImageOpts}
                    />
                  )}

                  {slug === "gradient" && (
                    <GradientOptions
                      value={gradientOpts}
                      onChange={setGradientOpts}
                    />
                  )}

                  {slug === "placeholder" && (
                    <PlaceholderOptions
                      value={placeholderOpts}
                      onChange={setPlaceholderOpts}
                    />
                  )}

                  {slug === "pattern" && (
                    <PatternOptions
                      value={patternOpts}
                      onChange={setPatternOpts}
                    />
                  )}

                  {slug === "qr-code" && (
                    <QrCodeOptions
                      value={qrCodeOpts}
                      onChange={setQrCodeOpts}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Process button */}
          <div className="flex justify-center">
            <button
              onClick={handleProcess}
              disabled={dimLoading}
              className="cursor-pointer rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {labels.process}
            </button>
          </div>
        </div>
      )}

      {/* Processing -- overlay */}
      {stage === "processing" && (
        <ProcessingOverlay progress={progress} label={labels.processing} />
      )}

      {/* Done -- result card */}
      {stage === "done" && result && (
        <ResultCard
          result={result}
          onDownload={() => download()}
          onReset={reset}
          labels={labels}
        />
      )}

      {/* Error */}
      {stage === "error" && (
        <ErrorMessage
          message={error ?? "Unknown error"}
          onRetry={reset}
          retryLabel={labels.tryAgain}
        />
      )}
    </ToolPageLayout>
  );
}

/**
 * Simple loaded state for tools without options (e.g., grayscale, add-border, etc.)
 * Preserves the original file-list + process button UI.
 */
function LoadedSimple({
  files,
  labels,
  acceptedTypes,
  multiFile,
  addFiles,
  removeFile,
  onProcess,
}: {
  files: File[];
  labels: ImageDictionary["common"];
  acceptedTypes: string;
  multiFile?: boolean;
  addFiles: (f: File[]) => void;
  removeFile: (i: number) => void;
  onProcess: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-background p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          {files.length} {labels.filesSelected}
        </p>
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-md bg-background-subtle px-3 py-2 text-sm"
            >
              <span className="truncate text-foreground">{file.name}</span>
              <button
                onClick={() => removeFile(i)}
                className="ml-2 shrink-0 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      <FileUploadZone
        accept={acceptedTypes}
        multiple={multiFile !== false}
        onFiles={addFiles}
        title={labels.addMoreFiles}
        className="min-h-[80px]"
      />

      <div className="flex justify-center">
        <button
          onClick={onProcess}
          className="cursor-pointer rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover transition-colors"
        >
          {labels.process}
        </button>
      </div>
    </div>
  );
}
