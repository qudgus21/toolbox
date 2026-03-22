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

// ─── Utility: filter string ──────────────────────────────

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

// ─── PNG predictor ───────────────────────────────────────

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

// ─── Pixel → RGBA conversion ─────────────────────────────

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

// ─── SMask alpha compositing ─────────────────────────────

function compositeWithSmask(
  mainPixels: Uint8Array,
  smaskPixels: Uint8Array,
  w: number,
  h: number,
  components: number,
): Uint8ClampedArray {
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

    // Alpha compositing on white background
    rgba[ri] = Math.round(r * alpha + 255 * (1 - alpha));
    rgba[ri + 1] = Math.round(g * alpha + 255 * (1 - alpha));
    rgba[ri + 2] = Math.round(b * alpha + 255 * (1 - alpha));
    rgba[ri + 3] = 255;
  }

  return rgba;
}

// ─── FlateDecode → canvas → PNG blob ─────────────────────

async function flatImageToBlob(
  stream: PDFRawStream,
  w: number,
  h: number,
  components: number,
  bpc: number,
  predictor: number,
  smaskStream: PDFRawStream | null,
  smaskPredictor: number,
): Promise<Blob | null> {
  try {
    const bpp = Math.ceil(components * (bpc / 8));

    let mainRaw: Uint8Array;
    try {
      mainRaw = pako.inflate(stream.getContents());
    } catch {
      return null;
    }
    const mainPixels =
      predictor >= 10 ? unpredictPng(mainRaw, w, h, bpp) : mainRaw;

    let rgba: Uint8ClampedArray;
    if (smaskStream) {
      let smaskRaw: Uint8Array;
      try {
        smaskRaw = pako.inflate(smaskStream.getContents());
      } catch {
        return null;
      }
      const smaskPixels =
        smaskPredictor >= 10 ? unpredictPng(smaskRaw, w, h, 1) : smaskRaw;
      rgba = compositeWithSmask(mainPixels, smaskPixels, w, h, components);
    } else {
      rgba = toRGBA(mainPixels, w, h, components);
    }

    const imageData = new ImageData(
      new Uint8ClampedArray(rgba.buffer as ArrayBuffer),
      w,
      h,
    );
    const bitmap = await createImageBitmap(imageData);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          canvas.width = 0;
          canvas.height = 0;
          b ? resolve(b) : reject(new Error("toBlob failed"));
        },
        "image/png",
      );
    });
  } catch {
    return null;
  }
}

// ─── Extracted image info ────────────────────────────────

interface ExtractedImage {
  index: number;
  width: number;
  height: number;
  format: "jpeg" | "png";
  data: Uint8Array;
}

// ─── Min image area: skip tiny images (icons, artifacts) ─

const MIN_IMAGE_AREA = 2500; // 50×50

/**
 * Extract Images processor
 *
 * Scans all XObject images in the PDF and extracts them as original files.
 * - DCTDecode → extracted as .jpg (original bytes, lossless)
 * - FlateDecode → decoded and saved as .png
 */
const extractImages: ProcessorFn = async (files, _options, onProgress) => {
  const file = files[0];
  if (!file) throw new Error("No file provided");

  onProgress(5);

  const srcBytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(srcBytes);
  const context = doc.context;

  onProgress(10);

  // Collect all image XObjects
  const images: ExtractedImage[] = [];
  let imageIndex = 0;

  const allObjects = Array.from(context.enumerateIndirectObjects());
  const totalObjects = allObjects.length;

  for (let objIdx = 0; objIdx < totalObjects; objIdx++) {
    const [, obj] = allObjects[objIdx];
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

    // Skip tiny images (icons, bullets, etc.)
    if (w * h < MIN_IMAGE_AREA) continue;

    imageIndex++;

    if (filterStr === "/DCTDecode") {
      // JPEG: extract raw bytes directly (lossless)
      const jpegBytes = obj.getContents();
      images.push({
        index: imageIndex,
        width: w,
        height: h,
        format: "jpeg",
        data: new Uint8Array(jpegBytes),
      });
    } else {
      // FlateDecode: decode and render to PNG
      const components = getColorComponents(dict, context);
      if (!components) continue;

      const bpc = getDictNumber(dict, "BitsPerComponent") ?? 8;
      const predictor = getPredictor(dict);

      // Check for SMask (alpha channel)
      const smaskObj = dict.get(PDFName.of("SMask"));
      const smaskRef = smaskObj instanceof PDFRef ? smaskObj : null;
      let smaskStream: PDFRawStream | null = null;
      let smaskPredictor = 1;

      if (smaskRef) {
        const smaskLookup = context.lookup(smaskRef);
        if (smaskLookup instanceof PDFRawStream) {
          smaskStream = smaskLookup;
          smaskPredictor = getPredictor(smaskLookup.dict);
        }
      }

      const blob = await flatImageToBlob(
        obj,
        w,
        h,
        components,
        bpc,
        predictor,
        smaskStream,
        smaskPredictor,
      );

      if (blob) {
        const ab = await blob.arrayBuffer();
        images.push({
          index: imageIndex,
          width: w,
          height: h,
          format: "png",
          data: new Uint8Array(ab),
        });
      }
    }

    onProgress(10 + 70 * ((objIdx + 1) / totalObjects));
  }

  if (images.length === 0) {
    throw new Error("NO_IMAGES_FOUND");
  }

  onProgress(85);

  const baseName = file.name.replace(/\.pdf$/i, "");

  // Single image → direct download
  if (images.length === 1) {
    const img = images[0];
    const ext = img.format === "jpeg" ? "jpg" : "png";
    const mimeType = img.format === "jpeg" ? "image/jpeg" : "image/png";
    const blob = new Blob([img.data as BlobPart], { type: mimeType });
    onProgress(100);

    return {
      blob,
      filename: `${baseName}_image_1.${ext}`,
      size: blob.size,
      pageCount: 1,
    } satisfies ProcessingResult;
  }

  // Multiple images → ZIP
  const zip = new JSZip();
  const padLen = String(images.length).length;

  for (const img of images) {
    const ext = img.format === "jpeg" ? "jpg" : "png";
    const label = String(img.index).padStart(padLen, "0");
    zip.file(`${baseName}_image_${label}.${ext}`, img.data);
  }

  onProgress(92);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: `${baseName}_images.zip`,
    size: zipBlob.size,
    pageCount: images.length,
  } satisfies ProcessingResult;
};

export default extractImages;
