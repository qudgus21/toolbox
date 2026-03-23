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

  const pixelSize = Math.max(2, Math.min(100, (options.pixelSize as number) ?? 10));
  const region = (options.region as { x: number; y: number; width: number; height: number } | null) ?? null;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);

  onProgress(30);

  if (region) {
    // Draw original image first
    ctx.drawImage(img, 0, 0);

    // Pixelate only the specified region using a temp canvas
    const rw = Math.min(region.width, w - region.x);
    const rh = Math.min(region.height, h - region.y);
    const smallW = Math.max(1, Math.ceil(rw / pixelSize));
    const smallH = Math.max(1, Math.ceil(rh / pixelSize));

    const { canvas: tempCanvas, ctx: tempCtx } = createCanvas(smallW, smallH);
    tempCtx.imageSmoothingEnabled = false;

    // Draw the region scaled down
    tempCtx.drawImage(
      canvas,
      region.x, region.y, rw, rh,
      0, 0, smallW, smallH,
    );

    // Draw it back scaled up over the original region
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, region.x, region.y, rw, rh);
    ctx.imageSmoothingEnabled = true;
  } else {
    // Full pixelation: scale down then back up
    const smallW = Math.max(1, Math.ceil(w / pixelSize));
    const smallH = Math.max(1, Math.ceil(h / pixelSize));

    const { canvas: tempCanvas, ctx: tempCtx } = createCanvas(smallW, smallH);
    tempCtx.imageSmoothingEnabled = true;
    tempCtx.drawImage(img, 0, 0, smallW, smallH);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, 0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
  }

  onProgress(70);

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
