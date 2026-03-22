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

  const horizontal = (options.horizontal as boolean) ?? false;
  const vertical = (options.vertical as boolean) ?? false;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  onProgress(30);

  const { canvas, ctx } = createCanvas(w, h);

  const scaleX = horizontal ? -1 : 1;
  const scaleY = vertical ? -1 : 1;
  const translateX = horizontal ? -w : 0;
  const translateY = vertical ? -h : 0;

  ctx.scale(scaleX, scaleY);
  ctx.drawImage(img, translateX, translateY);

  onProgress(70);

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
