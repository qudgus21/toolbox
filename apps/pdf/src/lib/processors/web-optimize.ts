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

// ─── 타입 ─────────────────────────────────────────────

export type WebOptimizePreset = "screen" | "email" | "quality";

export interface WebOptimizeConfig {
  /** 이미지 JPEG 재압축 품질 0~1 */
  quality: number;
  /** 이미지 최대 해상도 (px). 0이면 축소 안 함 */
  maxDimension: number;
  /** 이 면적(px²) 미만 이미지 건너뜀 */
  minImageArea: number;
}

const presetConfig: Record<WebOptimizePreset, WebOptimizeConfig> = {
  screen: { quality: 0.6, maxDimension: 1800, minImageArea: 8000 },
  email: { quality: 0.45, maxDimension: 1200, minImageArea: 5000 },
  quality: { quality: 0.8, maxDimension: 2800, minImageArea: 15000 },
};

// ─── 최적화 통계 ─────────────────────────────────────

interface OptimizationStats {
  imagesOptimized: number;
  metadataRemoved: boolean;
  jsActionsRemoved: boolean;
  formsFlattened: boolean;
  annotationsRemoved: boolean;
  streamsCompressed: number;
}

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
      // CMYK → RGB
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

// ─── 유틸 ────────────────────────────────────────────

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
  if (filter instanceof PDFArray && filter.size() === 1) {
    return filter.get(0).toString();
  }
  return filter.toString();
}

function getDictNumber(dict: PDFDict, key: string): number | null {
  const obj = dict.get(PDFName.of(key));
  if (obj instanceof PDFNumber) return obj.asNumber();
  return null;
}

// ─── 캔버스 → JPEG ────────────────────────────────────

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

// ─── JPEG 재압축 ────────────────────────────────────────

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

    const bytes = await canvasToJpegBytes(canvas, quality);
    return { bytes, width: w, height: h };
  } catch {
    return null;
  }
}

// ─── FlateDecode(PNG) → JPEG 재압축 ──────────────────

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
    const compressed = stream.getContents();
    let raw: Uint8Array;
    try {
      raw = pako.inflate(compressed);
    } catch {
      return null;
    }

    const bpp = Math.ceil(components * (bpc / 8));
    const pixels = predictor >= 10 ? unpredictPng(raw, w, h, bpp) : raw;

    const rgba = toRGBA(pixels, w, h, components);
    const imageData = new ImageData(new Uint8ClampedArray(rgba.buffer as ArrayBuffer), w, h);
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

    const bytes = await canvasToJpegBytes(canvas, quality);
    return { bytes, width: outW, height: outH };
  } catch {
    return null;
  }
}

// ─── SMask 합성 후 재압축 ──────────────────────────────

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

    rgba[ri] = Math.round(r * alpha + 255 * (1 - alpha));
    rgba[ri + 1] = Math.round(g * alpha + 255 * (1 - alpha));
    rgba[ri + 2] = Math.round(b * alpha + 255 * (1 - alpha));
    rgba[ri + 3] = 255;
  }

  return rgba;
}

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

    let mainRaw: Uint8Array;
    try {
      mainRaw = pako.inflate(stream.getContents());
    } catch {
      return null;
    }
    const mainPixels = predictor >= 10 ? unpredictPng(mainRaw, w, h, bpp) : mainRaw;

    let smaskRaw: Uint8Array;
    try {
      smaskRaw = pako.inflate(smaskStream.getContents());
    } catch {
      return null;
    }
    const smaskPixels = smaskPredictor >= 10 ? unpredictPng(smaskRaw, w, h, 1) : smaskRaw;

    const rgba = await compositeWithSmask(mainPixels, smaskPixels, w, h, components);
    const imageData = new ImageData(new Uint8ClampedArray(rgba.buffer as ArrayBuffer), w, h);
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

    const bytes = await canvasToJpegBytes(canvas, quality);
    return { bytes, width: outW, height: outH };
  } catch {
    return null;
  }
}

// ─── 이미지 엔트리 ──────────────────────────────────────

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

// ─── 이미지 최적화 ─────────────────────────────────────

async function optimizeImages(
  doc: PDFDocument,
  config: WebOptimizeConfig,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<number> {
  const context = doc.context;
  const imageEntries: ImageEntry[] = [];

  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    if (subtype !== PDFName.of("Image")) continue;

    const filterStr = getFilterString(dict);
    if (!filterStr) continue;
    if (filterStr !== "/DCTDecode" && filterStr !== "/FlateDecode") continue;

    const w = getDictNumber(dict, "Width");
    const h = getDictNumber(dict, "Height");
    if (!w || !h) continue;
    if (w * h < config.minImageArea) continue;

    let components: number;
    if (filterStr === "/DCTDecode") {
      components = getColorComponents(dict, context) ?? 3;
    } else {
      const comps = getColorComponents(dict, context);
      if (!comps) continue;
      components = comps;
    }

    const bpc = getDictNumber(dict, "BitsPerComponent") ?? 8;
    const predictor = getPredictor(dict);
    const smaskObj = dict.get(PDFName.of("SMask"));
    const smaskRef = smaskObj instanceof PDFRef ? smaskObj : null;

    imageEntries.push({ ref, stream: obj, w, h, filter: filterStr, components, bpc, predictor, smaskRef });
  }

  let optimized = 0;

  for (let i = 0; i < imageEntries.length; i++) {
    const entry = imageEntries[i];
    let result: { bytes: Uint8Array; width: number; height: number } | null = null;

    if (entry.filter === "/DCTDecode") {
      result = await recompressJpeg(entry.stream.getContents(), config.quality, config.maxDimension);
    } else if (entry.filter === "/FlateDecode") {
      if (entry.smaskRef) {
        const smaskObj = context.lookup(entry.smaskRef);
        if (smaskObj instanceof PDFRawStream) {
          const smaskPredictor = getPredictor(smaskObj.dict);
          result = await recompressFlatImageWithSmask(
            entry.stream, smaskObj,
            entry.w, entry.h, entry.components, entry.bpc,
            entry.predictor, smaskPredictor,
            config.quality, config.maxDimension,
          );
          if (result) entry.stream.dict.delete(PDFName.of("SMask"));
        }
      }
      if (!result) {
        result = await recompressFlatImage(
          entry.stream, entry.w, entry.h,
          entry.components, entry.bpc, entry.predictor,
          config.quality, config.maxDimension,
        );
      }
    }

    if (!result) continue;
    if (result.bytes.length >= entry.stream.getContentsSize()) continue;

    const newDict = entry.stream.dict;
    if (result.width !== entry.w || result.height !== entry.h) {
      newDict.set(PDFName.of("Width"), PDFNumber.of(result.width));
      newDict.set(PDFName.of("Height"), PDFNumber.of(result.height));
    }
    newDict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
    newDict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
    newDict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
    newDict.set(PDFName.of("Length"), PDFNumber.of(result.bytes.length));
    newDict.delete(PDFName.of("DecodeParms"));

    context.assign(entry.ref, PDFRawStream.of(newDict, result.bytes));
    optimized++;

    onProgress(progressBase + progressRange * ((i + 1) / imageEntries.length));
  }

  if (imageEntries.length === 0) {
    onProgress(progressBase + progressRange);
  }

  return optimized;
}

// ─── 메타데이터 제거 ──────────────────────────────────

function stripMetadata(doc: PDFDocument): boolean {
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setCreator("");
  doc.setProducer("");

  // XMP 메타데이터 스트림 제거
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (root) {
    const catalog = context.lookup(root) as PDFDict | undefined;
    if (catalog && typeof catalog.get === "function") {
      catalog.delete(PDFName.of("Metadata"));
    }
  }

  return true;
}

// ─── JavaScript/액션 제거 ─────────────────────────────

function stripJsAndActions(doc: PDFDocument): boolean {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return false;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return false;

  // Names (JavaScript, EmbeddedFiles 등)
  catalog.delete(PDFName.of("Names"));
  // 문서 열 때 실행되는 액션
  catalog.delete(PDFName.of("OpenAction"));
  // 추가 액션
  catalog.delete(PDFName.of("AA"));

  // 각 페이지의 액션 제거
  for (const page of doc.getPages()) {
    page.node.delete(PDFName.of("AA"));
  }

  return true;
}

// ─── 폼 필드 제거 (Flatten) ──────────────────────────

function removeFormFields(doc: PDFDocument): boolean {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return false;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return false;

  const hasForm = catalog.get(PDFName.of("AcroForm"));
  if (hasForm) {
    catalog.delete(PDFName.of("AcroForm"));
    return true;
  }
  return false;
}

// ─── 주석(Annotations) 제거 ─────────────────────────

function removeAnnotations(doc: PDFDocument): number {
  let removed = 0;
  for (const page of doc.getPages()) {
    const annots = page.node.get(PDFName.of("Annots"));
    if (annots) {
      // Link 타입만 보존하려면 필터링 가능하지만, 웹 최적화에서는 모두 제거
      page.node.delete(PDFName.of("Annots"));
      removed++;
    }
  }
  return removed;
}

// ─── 구조 트리/태그 제거 ──────────────────────────────

function stripStructureTree(doc: PDFDocument): void {
  const context = doc.context;
  const root = context.trailerInfo.Root;
  if (!root) return;
  const catalog = context.lookup(root) as PDFDict | undefined;
  if (!catalog || typeof catalog.get !== "function") return;

  catalog.delete(PDFName.of("MarkInfo"));
  catalog.delete(PDFName.of("StructTreeRoot"));
}

// ─── 임베디드 썸네일 제거 ─────────────────────────────

function removeThumbnails(doc: PDFDocument): void {
  for (const page of doc.getPages()) {
    page.node.delete(PDFName.of("Thumb"));
  }
}

// ─── 미사용 스트림 재압축 ──────────────────────────────

function recompressStreams(doc: PDFDocument): number {
  const context = doc.context;
  let count = 0;

  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    // 이미지는 이미 처리됨, 스킵
    if (subtype === PDFName.of("Image")) continue;

    const filterStr = getFilterString(dict);

    // 비압축 콘텐츠 스트림 → FlateDecode 압축
    if (!filterStr) {
      const raw = obj.getContents();
      if (raw.length < 100) continue; // 너무 작으면 스킵

      try {
        const deflated = pako.deflate(raw);
        if (deflated.length < raw.length) {
          dict.set(PDFName.of("Filter"), PDFName.of("FlateDecode"));
          dict.set(PDFName.of("Length"), PDFNumber.of(deflated.length));
          context.assign(ref, PDFRawStream.of(dict, deflated));
          count++;
        }
      } catch {
        // deflate 실패 시 스킵
      }
    }
  }

  return count;
}

// ─── 단일 파일 웹 최적화 ─────────────────────────────

async function optimizeSinglePdf(
  file: File,
  preset: WebOptimizePreset,
  toggles: {
    images: boolean;
    metadata: boolean;
    jsActions: boolean;
    forms: boolean;
    annotations: boolean;
    thumbnails: boolean;
    streams: boolean;
  },
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ bytes: Uint8Array; pageCount: number; stats: OptimizationStats }> {
  const config = presetConfig[preset];
  const srcBytes = await file.arrayBuffer();

  const srcDoc = await PDFDocument.load(srcBytes);
  const doc = await PDFDocument.create();
  const copiedPages = await doc.copyPages(srcDoc, srcDoc.getPageIndices());
  for (const page of copiedPages) doc.addPage(page);

  onProgress(progressBase + progressRange * 0.05);

  const stats: OptimizationStats = {
    imagesOptimized: 0,
    metadataRemoved: false,
    jsActionsRemoved: false,
    formsFlattened: false,
    annotationsRemoved: false,
    streamsCompressed: 0,
  };

  // 1. 이미지 최적화 (가장 시간 소요)
  if (toggles.images) {
    stats.imagesOptimized = await optimizeImages(
      doc, config, onProgress,
      progressBase + progressRange * 0.05,
      progressRange * 0.65,
    );
  } else {
    onProgress(progressBase + progressRange * 0.7);
  }

  // 2. 메타데이터 제거
  if (toggles.metadata) {
    stats.metadataRemoved = stripMetadata(doc);
  }

  onProgress(progressBase + progressRange * 0.75);

  // 3. JavaScript/액션 제거
  if (toggles.jsActions) {
    stats.jsActionsRemoved = stripJsAndActions(doc);
  }

  // 4. 폼 필드 제거
  if (toggles.forms) {
    stats.formsFlattened = removeFormFields(doc);
  }

  // 5. 주석 제거
  if (toggles.annotations) {
    const count = removeAnnotations(doc);
    stats.annotationsRemoved = count > 0;
  }

  // 6. 구조 트리 제거
  stripStructureTree(doc);

  // 7. 썸네일 제거
  if (toggles.thumbnails) {
    removeThumbnails(doc);
  }

  onProgress(progressBase + progressRange * 0.8);

  // 8. 스트림 재압축
  if (toggles.streams) {
    stats.streamsCompressed = recompressStreams(doc);
  }

  onProgress(progressBase + progressRange * 0.9);

  // Object streams 사용으로 추가 압축
  const pdfBytes = await doc.save({ useObjectStreams: true });

  onProgress(progressBase + progressRange);

  return { bytes: pdfBytes, pageCount: doc.getPageCount(), stats };
}

// ─── 메인 프로세서 ────────────────────────────────────

const webOptimizePdf: ProcessorFn = async (files, options, onProgress) => {
  const preset = (options.preset as WebOptimizePreset) ?? "screen";
  const toggles = {
    images: (options.images as boolean) ?? true,
    metadata: (options.metadata as boolean) ?? true,
    jsActions: (options.jsActions as boolean) ?? true,
    forms: (options.forms as boolean) ?? true,
    annotations: (options.annotations as boolean) ?? false,
    thumbnails: (options.thumbnails as boolean) ?? true,
    streams: (options.streams as boolean) ?? true,
  };

  if (files.length === 1) {
    const file = files[0];
    const originalSize = file.size;
    const { bytes, pageCount } = await optimizeSinglePdf(
      file, preset, toggles, onProgress, 5, 90,
    );

    // 결과가 원본보다 크면 원본 반환
    const finalBytes = bytes.length >= originalSize
      ? new Uint8Array(await file.arrayBuffer())
      : bytes;

    const blob = new Blob([finalBytes as BlobPart], { type: "application/pdf" });
    const baseName = file.name.replace(/\.pdf$/i, "");
    onProgress(100);

    return {
      blob,
      filename: `${baseName}_optimized.pdf`,
      size: blob.size,
      pageCount,
    } satisfies ProcessingResult;
  }

  // 다중 파일 → 개별 최적화 후 ZIP
  const zip = new JSZip();
  let totalPageCount = 0;
  const perFile = 80 / files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const originalSize = file.size;
    const base = 5 + i * perFile;
    const { bytes, pageCount } = await optimizeSinglePdf(
      file, preset, toggles, onProgress, base, perFile,
    );

    const finalBytes = bytes.length >= originalSize
      ? new Uint8Array(await file.arrayBuffer())
      : bytes;

    const baseName = file.name.replace(/\.pdf$/i, "");
    zip.file(`${baseName}_optimized.pdf`, finalBytes);
    totalPageCount += pageCount;
  }

  onProgress(90);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "optimized_pdfs.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default webOptimizePdf;
