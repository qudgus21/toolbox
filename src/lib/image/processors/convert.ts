import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  formatToMimeType,
  replaceExtension,
} from "../canvas-utils";

/**
 * Parse target format from tool slug.
 * e.g. "jpg-to-png" → "png", "svg-to-jpg" → "jpg"
 */
function parseTargetFormat(slug: string): string {
  const match = slug.match(/-to-(\w+)$/);
  if (!match) {
    throw new Error(`Cannot determine target format from slug: "${slug}"`);
  }
  return match[1].toLowerCase();
}

/** Formats that do not support transparency — require opaque background */
const OPAQUE_FORMATS = new Set(["jpg", "jpeg", "bmp"]);

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const slug = options.slug as string;
  const targetFormat = parseTargetFormat(slug);
  const quality = (options.quality as number) ?? 0.92;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  onProgress(50);

  const { canvas, ctx } = createCanvas(w, h);

  // For opaque target formats, fill white background to handle transparency
  if (OPAQUE_FORMATS.has(targetFormat)) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }

  ctx.drawImage(img, 0, 0);

  const mime = formatToMimeType(targetFormat);
  const blob = await canvasToBlob(canvas, mime, quality);

  const ext = targetFormat === "jpeg" ? "jpg" : targetFormat;
  const filename = replaceExtension(file.name, ext);

  onProgress(100);

  return {
    blob,
    filename,
    size: blob.size,
    width: w,
    height: h,
  };
};

export default processor;
