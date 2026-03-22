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

  const brightness = (options.brightness as number) ?? 100;
  const contrast = (options.contrast as number) ?? 100;
  const saturation = (options.saturation as number) ?? 100;
  const hueRotate = (options.hueRotate as number) ?? 0;
  const sepia = (options.sepia as number) ?? 0;
  const invert = (options.invert as number) ?? 0;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);

  onProgress(50);

  // Build CSS filter string
  const filterParts = [
    `brightness(${brightness / 100})`,
    `contrast(${contrast / 100})`,
    `saturate(${saturation / 100})`,
    `hue-rotate(${hueRotate}deg)`,
    `sepia(${sepia / 100})`,
    `invert(${invert / 100})`,
  ];

  ctx.filter = filterParts.join(" ");
  ctx.drawImage(img, 0, 0);

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
