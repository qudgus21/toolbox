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

  const intensity = Math.max(0, Math.min(100, (options.intensity as number) ?? 100));
  const t = intensity / 100;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Standard sepia transform
    const sepiaR = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    const sepiaG = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    const sepiaB = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);

    // Lerp between original and sepia based on intensity
    data[i] = Math.round(r + (sepiaR - r) * t);
    data[i + 1] = Math.round(g + (sepiaG - g) * t);
    data[i + 2] = Math.round(b + (sepiaB - b) * t);
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
