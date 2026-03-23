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

  const amount = Math.max(0, Math.min(100, (options.amount as number) ?? 30));
  const monochrome = (options.monochrome as boolean) ?? false;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // Noise strength mapped from 0-100 to pixel range
  const strength = (amount / 100) * 128;

  for (let i = 0; i < data.length; i += 4) {
    if (monochrome) {
      const noise = (Math.random() - 0.5) * 2 * strength;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    } else {
      data[i] = Math.max(0, Math.min(255, data[i] + (Math.random() - 0.5) * 2 * strength));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + (Math.random() - 0.5) * 2 * strength));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + (Math.random() - 0.5) * 2 * strength));
    }
  }

  ctx.putImageData(imageData, 0, 0);

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
