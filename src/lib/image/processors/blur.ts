import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getSafeOutputExtension,
  getSafeOutputFilename,
  formatToMimeType,
} from "../canvas-utils";

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const radius = Math.max(1, Math.min(50, (options.radius as number) ?? 5));

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  onProgress(30);

  // Draw on an oversized canvas to avoid edge artifacts from blur
  const padding = radius * 3;
  const { canvas: bigCanvas, ctx: bigCtx } = createCanvas(w + padding * 2, h + padding * 2);

  bigCtx.filter = `blur(${radius}px)`;

  // Draw the image with padding offset so blur doesn't cause edge fading
  // Fill edges by drawing the image stretched into the padding area
  bigCtx.drawImage(img, padding, padding);

  onProgress(50);

  // Crop back to original size
  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(bigCanvas, padding, padding, w, h, 0, 0, w, h);

  onProgress(80);

  const ext = getSafeOutputExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: getSafeOutputFilename(file.name),
    size: blob.size,
    width: w,
    height: h,
  };
};

export default processor;
