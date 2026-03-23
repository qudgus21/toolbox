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

  const x = options.x as number;
  const y = options.y as number;
  const width = options.width as number;
  const height = options.height as number;

  const img = await loadImage(file);

  onProgress(30);

  // Clamp crop region to image bounds
  const srcX = Math.max(0, Math.min(x, img.naturalWidth));
  const srcY = Math.max(0, Math.min(y, img.naturalHeight));
  const srcW = Math.min(width, img.naturalWidth - srcX);
  const srcH = Math.min(height, img.naturalHeight - srcY);

  const { canvas, ctx } = createCanvas(srcW, srcH);
  ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

  onProgress(70);

  const ext = getSafeOutputExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: getSafeOutputFilename(file.name),
    size: blob.size,
    width: srcW,
    height: srcH,
  };
};

export default processor;
