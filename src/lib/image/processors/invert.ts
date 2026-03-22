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

  const strength = Math.max(0, Math.min(100, (options.strength as number) ?? 100));
  const t = strength / 100;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Lerp between original and inverted based on strength
    data[i] = Math.round(data[i] + (255 - 2 * data[i]) * t);
    data[i + 1] = Math.round(data[i + 1] + (255 - 2 * data[i + 1]) * t);
    data[i + 2] = Math.round(data[i + 2] + (255 - 2 * data[i + 2]) * t);
  }

  ctx.putImageData(imageData, 0, 0);

  onProgress(80);

  const ext = getFileExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: file.name,
    size: blob.size,
    width: w,
    height: h,
  };
};

export default processor;
