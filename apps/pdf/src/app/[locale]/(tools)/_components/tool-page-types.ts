import type { ReactNode } from "react";
import type { PdfToJpgLabels } from "./pdf-to-jpg-options";
import type { PdfToPngLabels } from "./pdf-to-png-options";
import type { PdfToTextLabels } from "./pdf-to-text-options";
import type { ExtractImagesLabels } from "./extract-images-options";
import type { JpgToPdfLabels } from "./jpg-to-pdf-options";
import type { PngToPdfLabels } from "./png-to-pdf-options";
import type { ImageToPdfLabels } from "./image-to-pdf-options";
import type { HtmlToPdfLabels } from "./html-to-pdf-options";
import type { ScanToPdfLabels } from "./scan-to-pdf-options";
import type { OrganizePagesLabels } from "./organize-pages-options";
import type { RotateLabels } from "./rotate-options";
import type { EditMetadataLabels } from "./edit-metadata-options";
import type { ResizeLabels, MarginPreset } from "./resize-options";
import type { WebOptimizeLabels } from "./web-optimize-options";
import type { ProtectLabels } from "./protect-options";
import type { FlattenLabels } from "./flatten-options";
import type { CropLabels } from "./crop-options";
import type { EditPdfLabels } from "./edit-pdf/editor-layout";
import type { RedactPdfLabels } from "./redact-pdf/redact-layout";
import type { PageNumbersLabels } from "./page-numbers/page-numbers-options";

export interface CommonLabels {
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

export interface SplitLabels {
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

export interface CompressLabels {
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

export interface DeletePagesLabels {
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

export interface ExtractPagesLabels {
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

export interface ToolPageClientProps {
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
  protectLabels?: ProtectLabels;
  flattenLabels?: FlattenLabels;
  cropLabels?: CropLabels;
  editMetadataLabels?: EditMetadataLabels;
  editPdfLabels?: EditPdfLabels;
  redactLabels?: RedactPdfLabels;
  pageNumbersLabels?: PageNumbersLabels;
  children?: ReactNode;
}

export type {
  PdfToJpgLabels, PdfToPngLabels, PdfToTextLabels, ExtractImagesLabels,
  JpgToPdfLabels, PngToPdfLabels, ImageToPdfLabels, HtmlToPdfLabels,
  ScanToPdfLabels, OrganizePagesLabels, RotateLabels, EditMetadataLabels,
  ResizeLabels, MarginPreset, WebOptimizeLabels, ProtectLabels, FlattenLabels, CropLabels, EditPdfLabels, RedactPdfLabels, PageNumbersLabels,
};
