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

  const mode = (options.mode as "luminance" | "average" | "desaturate") ?? "luminance";

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

    let gray: number;
    switch (mode) {
      case "average":
        gray = (r + g + b) / 3;
        break;
      case "desaturate":
        gray = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
        break;
      case "luminance":
      default:
        gray = 0.299 * r + 0.587 * g + 0.114 * b;
        break;
    }

    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  ctx.putImageData(imageData, 0, 0);

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
