import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getFileExtension,
  formatToMimeType,
} from "../canvas-utils";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const sourceColor = (options.sourceColor as string) ?? "#ff0000";
  const targetColor = (options.targetColor as string) ?? "#0000ff";
  const tolerance = Math.max(0, Math.min(100, (options.tolerance as number) ?? 30));

  const [sr, sg, sb] = hexToRgb(sourceColor);
  const [tr, tg, tb] = hexToRgb(targetColor);

  // Tolerance mapped to Euclidean distance (max ~441 for full RGB range)
  const maxDist = (tolerance / 100) * 441;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const dist = colorDistance(data[i], data[i + 1], data[i + 2], sr, sg, sb);
    if (dist <= maxDist) {
      // Blend based on how close the color is
      const blend = 1 - dist / Math.max(maxDist, 1);
      data[i] = Math.round(data[i] + (tr - data[i]) * blend);
      data[i + 1] = Math.round(data[i + 1] + (tg - data[i + 1]) * blend);
      data[i + 2] = Math.round(data[i + 2] + (tb - data[i + 2]) * blend);
    }
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
