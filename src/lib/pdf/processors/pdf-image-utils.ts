/**
 * PDF 이미지 처리 공유 유틸리티
 * compress.ts와 web-optimize.ts에서 공통으로 사용하는 함수들
 */
import {
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
  PDFArray,
  PDFDocument,
  type PDFDict,
} from "pdf-lib";
import pako from "pako";

// ─── 타입 ──────────────────────────────────────────────

export interface ImageEntry {
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

export interface RecompressResult {
  bytes: Uint8Array;
  width: number;
  height: number;
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

/**
 * PNG row-filter 역적용.
 * Predictor >= 10 인 FlateDecode 스트림은 각 행 앞에 필터 바이트가 붙는다.
 */
export function unpredictPng(
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

export function toRGBA(
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

// ─── Dict 유틸 ──────────────────────────────────────────

export function getColorComponents(
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

export function getPredictor(dict: PDFDict): number {
  const dp = dict.get(PDFName.of("DecodeParms"));
  if (!dp) return 1;
  if ("get" in dp && typeof (dp as PDFDict).get === "function") {
    const pred = (dp as PDFDict).get(PDFName.of("Predictor"));
    if (pred instanceof PDFNumber) return pred.asNumber();
  }
  return 1;
}

export function getFilterString(dict: PDFDict): string | null {
  const filter = dict.get(PDFName.of("Filter"));
  if (!filter) return null;

  // 배열 필터 [/FlateDecode] → 단일로 정규화
  if (filter instanceof PDFArray && filter.size() === 1) {
    return filter.get(0).toString();
  }

  return filter.toString();
}

export function getDictNumber(dict: PDFDict, key: string): number | null {
  const obj = dict.get(PDFName.of(key));
  if (obj instanceof PDFNumber) return obj.asNumber();
  return null;
}

// ─── 캔버스 → JPEG ────────────────────────────────────

export function canvasToJpegBytes(
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

export async function recompressJpeg(
  jpegBytes: Uint8Array,
  quality: number,
  maxDim: number,
): Promise<RecompressResult | null> {
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

// ─── FlateDecode(PNG) 이미지 → JPEG 재압축 ──────────────

export async function recompressFlatImage(
  stream: PDFRawStream,
  w: number,
  h: number,
  components: number,
  bpc: number,
  predictor: number,
  quality: number,
  maxDim: number,
): Promise<RecompressResult | null> {
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
    const pixels = predictor >= 10 ? unpredictPng(raw, w, h, bpp) : raw;

    // 3. RGBA 변환 → ImageData → ImageBitmap
    const rgba = toRGBA(pixels, w, h, components);
    const imageData = new ImageData(new Uint8ClampedArray(rgba.buffer as ArrayBuffer), w, h);
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

    const bytes = await canvasToJpegBytes(canvas, quality);
    return { bytes, width: outW, height: outH };
  } catch {
    return null;
  }
}

// ─── SMask(알파) 합성: 흰 배경 위에 합성 ────────────────

export async function compositeWithSmask(
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

export async function recompressFlatImageWithSmask(
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
): Promise<RecompressResult | null> {
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

// ─── 이미지 XObject 수집 ──────────────────────────────

export function collectImageEntries(
  doc: PDFDocument,
  minImageArea: number,
): ImageEntry[] {
  const context = doc.context;
  const entries: ImageEntry[] = [];

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
    if (w * h < minImageArea) continue;

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

    entries.push({
      ref, stream: obj, w, h,
      filter: filterStr, components, bpc, predictor, smaskRef,
    });
  }

  return entries;
}

// ─── 이미지 재압축 + PDF 반영 ──────────────────────────

export async function recompressImageEntries(
  doc: PDFDocument,
  entries: ImageEntry[],
  quality: number,
  maxDimension: number,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<number> {
  const context = doc.context;
  let optimized = 0;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    let result: RecompressResult | null = null;

    if (entry.filter === "/DCTDecode") {
      result = await recompressJpeg(
        entry.stream.getContents(),
        quality,
        maxDimension,
      );
    } else if (entry.filter === "/FlateDecode") {
      if (entry.smaskRef) {
        const smaskObj = context.lookup(entry.smaskRef);
        if (smaskObj instanceof PDFRawStream) {
          const smaskPred = getPredictor(smaskObj.dict);
          result = await recompressFlatImageWithSmask(
            entry.stream,
            smaskObj,
            entry.w,
            entry.h,
            entry.components,
            entry.bpc,
            entry.predictor,
            smaskPred,
            quality,
            maxDimension,
          );
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
          quality,
          maxDimension,
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
    newDict.delete(PDFName.of("DecodeParms"));

    context.assign(entry.ref, PDFRawStream.of(newDict, result.bytes));
    optimized++;

    onProgress(
      progressBase +
        progressRange * ((i + 1) / entries.length),
    );
  }

  if (entries.length === 0) {
    onProgress(progressBase + progressRange);
  }

  return optimized;
}
