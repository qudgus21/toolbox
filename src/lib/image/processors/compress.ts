import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  formatToMimeType,
  replaceExtension,
} from "../canvas-utils";

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const quality = (options.quality as number) ?? 80;
  const outputFormat = (options.outputFormat as "jpeg" | "webp") ?? "jpeg";

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  onProgress(30);

  const { canvas, ctx } = createCanvas(w, h);

  // For JPEG output, fill white background first (handles transparency)
  if (outputFormat === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }

  ctx.drawImage(img, 0, 0);

  onProgress(60);

  const mime = formatToMimeType(outputFormat === "jpeg" ? "jpg" : outputFormat);
  const blob = await canvasToBlob(canvas, mime, quality / 100);

  const ext = outputFormat === "jpeg" ? "jpg" : outputFormat;
  const filename = replaceExtension(file.name, ext);

  onProgress(100);

  return {
    blob,
    filename,
    size: blob.size,
    width: w,
    height: h,
  };
};

export default processor;
