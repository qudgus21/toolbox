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

  const targetWidth = options.width as number;
  const targetHeight = options.height as number;

  const img = await loadImage(file);

  onProgress(30);

  const { canvas, ctx } = createCanvas(targetWidth, targetHeight);
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  onProgress(70);

  const ext = getSafeOutputExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: getSafeOutputFilename(file.name),
    size: blob.size,
    width: targetWidth,
    height: targetHeight,
  };
};

export default processor;
