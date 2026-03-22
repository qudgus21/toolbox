import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getFileExtension,
  formatToMimeType,
} from "../canvas-utils";

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const targetWidth = options.width as number;
  const targetHeight = options.height as number;
  const maintainAspectRatio = (options.maintainAspectRatio as boolean) ?? true;
  const mode = (options.mode as "fit" | "fill" | "stretch") ?? "fit";

  const img = await loadImage(file);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  onProgress(30);

  let drawW: number;
  let drawH: number;
  let canvasW: number;
  let canvasH: number;
  let offsetX = 0;
  let offsetY = 0;

  if (!maintainAspectRatio || mode === "stretch") {
    // Stretch: ignore aspect ratio
    canvasW = targetWidth;
    canvasH = targetHeight;
    drawW = targetWidth;
    drawH = targetHeight;
  } else if (mode === "fill") {
    // Fill: cover the target area, clip overflow
    canvasW = targetWidth;
    canvasH = targetHeight;
    const scale = Math.max(targetWidth / srcW, targetHeight / srcH);
    drawW = srcW * scale;
    drawH = srcH * scale;
    offsetX = (targetWidth - drawW) / 2;
    offsetY = (targetHeight - drawH) / 2;
  } else {
    // Fit: scale to fit within bounds, preserving aspect ratio
    const scale = Math.min(targetWidth / srcW, targetHeight / srcH);
    drawW = Math.round(srcW * scale);
    drawH = Math.round(srcH * scale);
    canvasW = drawW;
    canvasH = drawH;
  }

  const { canvas, ctx } = createCanvas(canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

  onProgress(70);

  const ext = getFileExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: file.name,
    size: blob.size,
    width: canvasW,
    height: canvasH,
  };
};

export default processor;
