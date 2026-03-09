import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
  PDFArray,
  type PDFDict,
} from "pdf-lib";
import pako from "pako";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

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

// ─── PNG Predictor 해제 ─────────────────────────────────

function paethPredictor(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/**
 * PNG row-filter 역적용.
 * Predictor >= 10 인 FlateDecode 스트림은 각 행 앞에 필터 바이트가 붙는다.
 */
function unpredictPng(
  raw: Uint8Array,
  width: number,
  height: number,
  bpp: number,
): Uint8Array {
  const rowBytes = width * bpp;
  const result = new Uint8Array(height * rowBytes);

  for (let y = 0; y < height; y++) {
    const srcOffset = y * (rowBytes + 1);
    const filterType = raw[srcOffset];
    const dstOffset = y * rowBytes;

    for (let x = 0; x < rowBytes; x++) {
      const rawByte = raw[srcOffset + 1 + x];
      const a = x >= bpp ? result[dstOffset + x - bpp] : 0;
      const b = y > 0 ? result[dstOffset - rowBytes + x] : 0;
      const c =
        x >= bpp && y > 0
          ? result[dstOffset - rowBytes + x - bpp]
          : 0;

      switch (filterType) {
        case 0:
          result[dstOffset + x] = rawByte;
          break;
        case 1:
          result[dstOffset + x] = (rawByte + a) & 0xff;
          break;
        case 2:
          result[dstOffset + x] = (rawByte + b) & 0xff;
          break;
        case 3:
          result[dstOffset + x] = (rawByte + ((a + b) >> 1)) & 0xff;
          break;
        case 4:
          result[dstOffset + x] = (rawByte + paethPredictor(a, b, c)) & 0xff;
          break;
        default:
          result[dstOffset + x] = rawByte;
      }
    }
  }

  return result;
}

// ─── 픽셀 → RGBA 변환 ──────────────────────────────────

function toRGBA(
  pixels: Uint8Array,
  width: number,
  height: number,
  components: number,
): Uint8ClampedArray {
  const total = width * height;
  const rgba = new Uint8ClampedArray(total * 4);

  for (let i = 0; i < total; i++) {
    const ri = i * 4;
    if (components === 3) {
      rgba[ri] = pixels[i * 3];
      rgba[ri + 1] = pixels[i * 3 + 1];
      rgba[ri + 2] = pixels[i * 3 + 2];
    } else if (components === 1) {
      rgba[ri] = rgba[ri + 1] = rgba[ri + 2] = pixels[i];
    } else if (components === 4) {
      // CMYK → RGB (근사치)
      const ck = pixels[i * 4] / 255;
      const mk = pixels[i * 4 + 1] / 255;
      const yk = pixels[i * 4 + 2] / 255;
      const kk = pixels[i * 4 + 3] / 255;
      rgba[ri] = Math.round(255 * (1 - ck) * (1 - kk));
      rgba[ri + 1] = Math.round(255 * (1 - mk) * (1 - kk));
      rgba[ri + 2] = Math.round(255 * (1 - yk) * (1 - kk));
    }
    rgba[ri + 3] = 255;
  }

  return rgba;
}

// ─── ColorSpace → 채널 수 ───────────────────────────────

function getColorComponents(
  dict: PDFDict,
  context: PDFDocument["context"],
): number | null {
  const cs = dict.get(PDFName.of("ColorSpace"));
  if (!cs) return null;

  const csStr = cs.toString();
  if (csStr === "/DeviceRGB") return 3;
  if (csStr === "/DeviceGray") return 1;
  if (csStr === "/DeviceCMYK") return 4;
  if (csStr === "/CalRGB") return 3;
  if (csStr === "/CalGray") return 1;

  // ICCBased: [/ICCBased streamRef] — N 값으로 채널 수 추출
  if (cs instanceof PDFArray && cs.size() >= 2) {
    const name = cs.get(0);
    if (name?.toString() === "/ICCBased") {
      const streamRef = cs.get(1);
      if (streamRef instanceof PDFRef) {
        const iccStream = context.lookup(streamRef);
        if (iccStream && "dict" in iccStream) {
          const n = (iccStream as PDFRawStream).dict.get(PDFName.of("N"));
          if (n instanceof PDFNumber) return n.asNumber();
        }
      }
    }
  }

  return null;
}

function getPredictor(dict: PDFDict): number {
  const dp = dict.get(PDFName.of("DecodeParms"));
  if (!dp) return 1;
  if ("get" in dp && typeof (dp as PDFDict).get === "function") {
    const pred = (dp as PDFDict).get(PDFName.of("Predictor"));
    if (pred instanceof PDFNumber) return pred.asNumber();
  }
  return 1;
}

function getFilterString(dict: PDFDict): string | null {
  const filter = dict.get(PDFName.of("Filter"));
  if (!filter) return null;

  // 배열 필터 [/FlateDecode] → 단일로 정규화
  if (filter instanceof PDFArray && filter.size() === 1) {
    return filter.get(0).toString();
  }

  return filter.toString();
}

// ─── 공통: 캔버스 → JPEG ────────────────────────────────

function canvasToJpegBytes(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  quality: number,
): Promise<Uint8Array> {
  if (canvas instanceof OffscreenCanvas) {
    return canvas
      .convertToBlob({ type: "image/jpeg", quality })
      .then((b) => b.arrayBuffer())
      .then((ab) => new Uint8Array(ab));
  }
  return new Promise<Uint8Array>((resolve) => {
    canvas.toBlob(
      (b) => b!.arrayBuffer().then((ab) => resolve(new Uint8Array(ab))),
      "image/jpeg",
      quality,
    );
  });
}

// ─── JPEG(DCTDecode) 재압축 ─────────────────────────────

async function recompressJpeg(
  jpegBytes: Uint8Array,
  quality: number,
  maxDim: number,
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  try {
    const blob = new Blob([jpegBytes as BlobPart], { type: "image/jpeg" });
    const bitmap = await createImageBitmap(blob);

    let w = bitmap.width;
    let h = bitmap.height;

    if (maxDim > 0 && (w > maxDim || h > maxDim)) {
      const ratio = maxDim / Math.max(w, h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const resultBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/jpeg", quality);
    });

    return {
      bytes: new Uint8Array(await resultBlob.arrayBuffer()),
      width: w,
      height: h,
    };
  } catch {
    return null;
  }
}

// ─── FlateDecode(PNG) 이미지 → JPEG 재압축 ──────────────

async function recompressFlatImage(
  stream: PDFRawStream,
  w: number,
  h: number,
  components: number,
  bpc: number,
  predictor: number,
  quality: number,
  maxDim: number,
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  try {
    // 1. zlib 해제
    const compressed = stream.getContents();
    let raw: Uint8Array;
    try {
      raw = pako.inflate(compressed);
    } catch {
      return null;
    }

    // 2. PNG predictor 역적용
    const bpp = Math.ceil(components * (bpc / 8));
    let pixels: Uint8Array;
    if (predictor >= 10) {
      pixels = unpredictPng(raw, w, h, bpp);
    } else {
      pixels = raw;
    }

    // 3. RGBA 변환 → ImageData → ImageBitmap
    const rgba = toRGBA(pixels, w, h, components);
    const imageData = new ImageData(rgba, w, h);
    const bitmap = await createImageBitmap(imageData);

    // 4. 스케일 조정
    let outW = w;
    let outH = h;
    if (maxDim > 0 && (outW > maxDim || outH > maxDim)) {
      const ratio = maxDim / Math.max(outW, outH);
      outW = Math.round(outW * ratio);
      outH = Math.round(outH * ratio);
    }

    // 5. 캔버스 → JPEG
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, outW, outH);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/jpeg", quality);
    });

    return {
      bytes: new Uint8Array(await blob.arrayBuffer()),
      width: outW,
      height: outH,
    };
  } catch {
    return null;
  }
}

// ─── SMask(알파) 합성: 흰 배경 위에 합성 ────────────────

async function compositeWithSmask(
  mainPixels: Uint8Array,
  smaskPixels: Uint8Array,
  w: number,
  h: number,
  components: number,
): Promise<Uint8ClampedArray> {
  const total = w * h;
  const rgba = new Uint8ClampedArray(total * 4);

  for (let i = 0; i < total; i++) {
    const alpha = smaskPixels[i] / 255;
    const ri = i * 4;

    let r: number, g: number, b: number;
    if (components === 3) {
      r = mainPixels[i * 3];
      g = mainPixels[i * 3 + 1];
      b = mainPixels[i * 3 + 2];
    } else if (components === 1) {
      r = g = b = mainPixels[i];
    } else {
      r = g = b = 128;
    }

    // 흰 배경(255)에 알파 합성
    rgba[ri] = Math.round(r * alpha + 255 * (1 - alpha));
    rgba[ri + 1] = Math.round(g * alpha + 255 * (1 - alpha));
    rgba[ri + 2] = Math.round(b * alpha + 255 * (1 - alpha));
    rgba[ri + 3] = 255;
  }

  return rgba;
}

// ─── SMask 이미지(FlateDecode) 포함 재압축 ──────────────

async function recompressFlatImageWithSmask(
  stream: PDFRawStream,
  smaskStream: PDFRawStream,
  w: number,
  h: number,
  components: number,
  bpc: number,
  predictor: number,
  smaskPredictor: number,
  quality: number,
  maxDim: number,
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  try {
    const bpp = Math.ceil(components * (bpc / 8));

    // 메인 이미지 디코드
    let mainRaw: Uint8Array;
    try {
      mainRaw = pako.inflate(stream.getContents());
    } catch {
      return null;
    }
    const mainPixels =
      predictor >= 10 ? unpredictPng(mainRaw, w, h, bpp) : mainRaw;

    // SMask 디코드 (항상 DeviceGray, 8bpc)
    let smaskRaw: Uint8Array;
    try {
      smaskRaw = pako.inflate(smaskStream.getContents());
    } catch {
      return null;
    }
    const smaskPixels =
      smaskPredictor >= 10 ? unpredictPng(smaskRaw, w, h, 1) : smaskRaw;

    // 흰 배경 합성
    const rgba = await compositeWithSmask(
      mainPixels,
      smaskPixels,
      w,
      h,
      components,
    );
    const imageData = new ImageData(rgba, w, h);
    const bitmap = await createImageBitmap(imageData);

    let outW = w;
    let outH = h;
    if (maxDim > 0 && (outW > maxDim || outH > maxDim)) {
      const ratio = maxDim / Math.max(outW, outH);
      outW = Math.round(outW * ratio);
      outH = Math.round(outH * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, outW, outH);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/jpeg", quality);
    });

    return {
      bytes: new Uint8Array(await blob.arrayBuffer()),
      width: outW,
      height: outH,
    };
  } catch {
    return null;
  }
}

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

// ─── Dict 유틸 ──────────────────────────────────────────

function getDictNumber(dict: PDFDict, key: string): number | null {
  const obj = dict.get(PDFName.of(key));
  if (obj instanceof PDFNumber) return obj.asNumber();
  return null;
}

// ─── 이미지 항목 ────────────────────────────────────────

interface ImageEntry {
  ref: PDFRef;
  stream: PDFRawStream;
  w: number;
  h: number;
  filter: string;
  components: number;
  bpc: number;
  predictor: number;
  smaskRef: PDFRef | null;
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

  const context = doc.context;
  const imageEntries: ImageEntry[] = [];

  // 모든 이미지 XObject 수집 (DCTDecode + FlateDecode)
  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    if (subtype !== PDFName.of("Image")) continue;

    const filterStr = getFilterString(dict);
    if (!filterStr) continue;

    // DCTDecode(JPEG) 또는 FlateDecode(PNG류) 만 처리
    if (filterStr !== "/DCTDecode" && filterStr !== "/FlateDecode") continue;

    const w = getDictNumber(dict, "Width");
    const h = getDictNumber(dict, "Height");
    if (!w || !h) continue;

    if (w * h < config.minImageArea) continue;

    let components: number;
    if (filterStr === "/DCTDecode") {
      // JPEG: ColorSpace 값 또는 기본 3(RGB)
      components = getColorComponents(dict, context) ?? 3;
    } else {
      // FlateDecode: ColorSpace 필수
      const comps = getColorComponents(dict, context);
      if (!comps) continue; // 알 수 없는 색상 공간 → 스킵
      components = comps;
    }

    const bpc = getDictNumber(dict, "BitsPerComponent") ?? 8;
    const predictor = getPredictor(dict);

    // SMask 참조 확인
    const smaskObj = dict.get(PDFName.of("SMask"));
    const smaskRef = smaskObj instanceof PDFRef ? smaskObj : null;

    imageEntries.push({
      ref,
      stream: obj,
      w,
      h,
      filter: filterStr,
      components,
      bpc,
      predictor,
      smaskRef,
    });
  }

  // 이미지 재압축
  for (let i = 0; i < imageEntries.length; i++) {
    const entry = imageEntries[i];
    let result: {
      bytes: Uint8Array;
      width: number;
      height: number;
    } | null = null;

    if (entry.filter === "/DCTDecode") {
      // 기존 JPEG 재압축
      result = await recompressJpeg(
        entry.stream.getContents(),
        config.quality,
        config.maxDimension,
      );
    } else if (entry.filter === "/FlateDecode") {
      // FlateDecode: SMask 유무에 따라 분기
      if (entry.smaskRef) {
        const smaskObj = context.lookup(entry.smaskRef);
        if (smaskObj instanceof PDFRawStream) {
          const smaskPredictor = getPredictor(smaskObj.dict);
          result = await recompressFlatImageWithSmask(
            entry.stream,
            smaskObj,
            entry.w,
            entry.h,
            entry.components,
            entry.bpc,
            entry.predictor,
            smaskPredictor,
            config.quality,
            config.maxDimension,
          );
          // SMask 제거 (JPEG는 알파 없음, 이미 흰 배경 합성 완료)
          if (result) {
            entry.stream.dict.delete(PDFName.of("SMask"));
          }
        }
      }

      if (!result) {
        result = await recompressFlatImage(
          entry.stream,
          entry.w,
          entry.h,
          entry.components,
          entry.bpc,
          entry.predictor,
          config.quality,
          config.maxDimension,
        );
      }
    }

    if (!result) continue;
    if (result.bytes.length >= entry.stream.getContentsSize()) continue;

    // 새 JPEG 데이터로 교체
    const newDict = entry.stream.dict;

    if (result.width !== entry.w || result.height !== entry.h) {
      newDict.set(PDFName.of("Width"), PDFNumber.of(result.width));
      newDict.set(PDFName.of("Height"), PDFNumber.of(result.height));
    }

    newDict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
    newDict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
    newDict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
    newDict.set(PDFName.of("Length"), PDFNumber.of(result.bytes.length));
    // FlateDecode → DCTDecode 전환 시 DecodeParms 제거
    newDict.delete(PDFName.of("DecodeParms"));

    context.assign(entry.ref, PDFRawStream.of(newDict, result.bytes));

    onProgress(
      progressBase +
        progressRange * (0.1 + 0.8 * ((i + 1) / imageEntries.length)),
    );
  }

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
