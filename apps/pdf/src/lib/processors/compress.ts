import {
  PDFDocument,
  PDFName,
} from "pdf-lib";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";
import {
  canvasToJpegBytes,
  collectImageEntries,
  recompressImageEntries,
} from "./pdf-image-utils";
import type { PDFDict } from "pdf-lib";

type CompressionLevel = "extreme" | "recommended" | "less";
type CompressMode = "image" | "rasterize";

interface CompressionConfig {
  /** JPEG 재압축 품질 0~1 */
  quality: number;
  /** 이미지 최대 가로/세로 (px). 0이면 축소 안 함 */
  maxDimension: number;
  /** 이 면적(px²) 미만 이미지는 건너뜀 (아이콘, 로고 보호) */
  minImageArea: number;
}

interface RasterizeConfig {
  /** JPEG 품질 0~1 */
  quality: number;
  /** 렌더링 스케일 (1 = 72dpi, 2 = 144dpi) */
  scale: number;
}

const levelConfig: Record<CompressionLevel, CompressionConfig> = {
  extreme: { quality: 0.35, maxDimension: 1200, minImageArea: 5000 },
  recommended: { quality: 0.55, maxDimension: 2400, minImageArea: 10000 },
  less: { quality: 0.8, maxDimension: 0, minImageArea: 40000 },
};

const rasterizeConfig: Record<CompressionLevel, RasterizeConfig> = {
  extreme: { quality: 0.4, scale: 1.2 },
  recommended: { quality: 0.6, scale: 1.5 },
  less: { quality: 0.8, scale: 2.0 },
};

// ─── PDF 불필요 객체 제거 ───────────────────────────────

function stripBloat(doc: PDFDocument, level: CompressionLevel): void {
  // 메타데이터 제거 (모든 레벨)
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setCreator("");
  doc.setProducer("");

  // extreme/recommended: 추가 bloat 제거
  if (level === "extreme" || level === "recommended") {
    const context = doc.context;
    const root = context.trailerInfo.Root;
    if (!root) return;
    const catalog = context.lookup(root) as PDFDict | undefined;
    if (!catalog || typeof catalog.get !== "function") return;

    // AcroForm (입력 폼)
    catalog.delete(PDFName.of("AcroForm"));
    // Names 딕셔너리 (JS, EmbeddedFiles)
    catalog.delete(PDFName.of("Names"));
    // 자동 실행 액션
    catalog.delete(PDFName.of("OpenAction"));
    catalog.delete(PDFName.of("AA"));
  }

  // extreme: 접근성 구조, 주석 등도 제거
  if (level === "extreme") {
    const context = doc.context;
    const root = context.trailerInfo.Root;
    if (!root) return;
    const catalog = context.lookup(root) as PDFDict | undefined;
    if (!catalog || typeof catalog.get !== "function") return;

    catalog.delete(PDFName.of("MarkInfo"));
    catalog.delete(PDFName.of("StructTreeRoot"));

    for (const page of doc.getPages()) {
      page.node.delete(PDFName.of("Annots"));
    }
  }
}

// ─── 모드 A: 이미지 XObject 재압축 (DCTDecode + FlateDecode) ──

async function compressImageMode(
  file: File,
  level: CompressionLevel,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ bytes: Uint8Array; pageCount: number }> {
  const config = levelConfig[level];
  const srcBytes = await file.arrayBuffer();

  const srcDoc = await PDFDocument.load(srcBytes);
  const doc = await PDFDocument.create();
  const copiedPages = await doc.copyPages(srcDoc, srcDoc.getPageIndices());
  for (const page of copiedPages) doc.addPage(page);

  onProgress(progressBase + progressRange * 0.1);

  // 모든 이미지 XObject 수집 (DCTDecode + FlateDecode)
  const imageEntries = collectImageEntries(doc, config.minImageArea);

  // 이미지 재압축
  await recompressImageEntries(
    doc,
    imageEntries,
    config.quality,
    config.maxDimension,
    onProgress,
    progressBase + progressRange * 0.1,
    progressRange * 0.8,
  );

  if (imageEntries.length === 0) {
    onProgress(progressBase + progressRange * 0.9);
  }

  stripBloat(doc, level);

  const pdfBytes = await doc.save({ useObjectStreams: true });
  onProgress(progressBase + progressRange);

  return { bytes: pdfBytes, pageCount: doc.getPageCount() };
}

// ─── 모드 B: 전체 페이지 래스터화 ──────────────────────

async function compressRasterizeMode(
  file: File,
  level: CompressionLevel,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ bytes: Uint8Array; pageCount: number }> {
  const config = rasterizeConfig[level];
  const srcBytes = await file.arrayBuffer();

  // pdfjs-dist 동적 로드
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const pdfDoc = await pdfjsLib.getDocument({ data: srcBytes }).promise;
  const numPages = pdfDoc.numPages;

  onProgress(progressBase + progressRange * 0.05);

  // 새 PDF 문서
  const doc = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: config.scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;

    await (page.render({
      canvasContext: ctx,
      viewport,
      canvas,
    } as Parameters<typeof page.render>[0]) as { promise: Promise<void> }).promise;

    const jpegBytes = await canvasToJpegBytes(canvas, config.quality);
    const image = await doc.embedJpg(jpegBytes);

    // 원본 페이지 크기(pt) 유지
    const origViewport = page.getViewport({ scale: 1 });
    const pdfPage = doc.addPage([origViewport.width, origViewport.height]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: origViewport.width,
      height: origViewport.height,
    });

    onProgress(
      progressBase + progressRange * (0.05 + 0.85 * (i / numPages)),
    );
  }

  pdfDoc.destroy();

  const pdfBytes = await doc.save({ useObjectStreams: true });
  onProgress(progressBase + progressRange);

  return { bytes: pdfBytes, pageCount: numPages };
}

// ─── 단일 파일 압축 (모드 분기) ─────────────────────────

async function compressSinglePdf(
  file: File,
  level: CompressionLevel,
  mode: CompressMode,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ bytes: Uint8Array; pageCount: number }> {
  if (mode === "rasterize") {
    return compressRasterizeMode(
      file,
      level,
      onProgress,
      progressBase,
      progressRange,
    );
  }
  return compressImageMode(
    file,
    level,
    onProgress,
    progressBase,
    progressRange,
  );
}

// ─── 메인 프로세서 ─────────────────────────────────────

/** 단일 파일 압축 + 크기 보장: 결과가 원본보다 크면 원본 반환 */
async function compressWithSizeGuard(
  file: File,
  level: CompressionLevel,
  mode: CompressMode,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ bytes: Uint8Array; pageCount: number }> {
  const originalBytes = new Uint8Array(await file.arrayBuffer());
  const result = await compressSinglePdf(
    file,
    level,
    mode,
    onProgress,
    progressBase,
    progressRange,
  );

  // 압축 결과가 원본보다 크면 원본을 그대로 반환 (역효과 방지)
  if (result.bytes.length >= originalBytes.length) {
    return { bytes: originalBytes, pageCount: result.pageCount };
  }

  return result;
}

const compressPdf: ProcessorFn = async (files, options, onProgress) => {
  const level =
    (options.compressionLevel as CompressionLevel) ?? "recommended";
  const mode = (options.compressMode as CompressMode) ?? "image";

  if (files.length === 1) {
    const { bytes, pageCount } = await compressWithSizeGuard(
      files[0],
      level,
      mode,
      onProgress,
      5,
      90,
    );

    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const baseName = files[0].name.replace(/\.pdf$/i, "");
    onProgress(100);

    return {
      blob,
      filename: `${baseName}_compressed.pdf`,
      size: blob.size,
      pageCount,
    } satisfies ProcessingResult;
  }

  // 다중 파일 → 개별 압축 후 ZIP
  const zip = new JSZip();
  let totalPageCount = 0;
  const perFile = 80 / files.length;

  for (let i = 0; i < files.length; i++) {
    const base = 5 + i * perFile;
    const { bytes, pageCount } = await compressWithSizeGuard(
      files[i],
      level,
      mode,
      onProgress,
      base,
      perFile,
    );
    const baseName = files[i].name.replace(/\.pdf$/i, "");
    zip.file(`${baseName}_compressed.pdf`, bytes);
    totalPageCount += pageCount;
  }

  onProgress(90);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "compressed_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default compressPdf;
