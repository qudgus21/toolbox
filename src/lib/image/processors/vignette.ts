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

  const intensity = Math.max(0, Math.min(100, (options.intensity as number) ?? 50));
  const radius = Math.max(0, Math.min(100, (options.radius as number) ?? 70));

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  // Create radial gradient for vignette
  const cx = w / 2;
  const cy = h / 2;
  const maxRadius = Math.sqrt(cx * cx + cy * cy);
  const innerRadius = (radius / 100) * maxRadius;

  const gradient = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, maxRadius);
  gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
  gradient.addColorStop(1, `rgba(0, 0, 0, ${intensity / 100})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

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
