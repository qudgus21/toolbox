import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getFileExtension,
  formatToMimeType,
} from "../canvas-utils";

// 3x3 sharpening convolution kernel
const SHARPEN_3X3 = [0, -1, 0, -1, 5, -1, 0, -1, 0];
// 5x5 sharpening kernel (stronger)
const SHARPEN_5X5 = [
  0, 0, -1, 0, 0,
  0, -1, -2, -1, 0,
  -1, -2, 17, -2, -1,
  0, -1, -2, -1, 0,
  0, 0, -1, 0, 0,
];

function applyConvolution(
  src: Uint8ClampedArray,
  dst: Uint8ClampedArray,
  w: number,
  h: number,
  kernel: number[],
  kSize: number,
  strength: number,
) {
  const half = Math.floor(kSize / 2);
  const kernelSum = kernel.reduce((a, b) => a + b, 0) || 1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0, g = 0, b = 0;

      for (let ky = 0; ky < kSize; ky++) {
        for (let kx = 0; kx < kSize; kx++) {
          const px = Math.min(w - 1, Math.max(0, x + kx - half));
          const py = Math.min(h - 1, Math.max(0, y + ky - half));
          const idx = (py * w + px) * 4;
          const kVal = kernel[ky * kSize + kx];
          r += src[idx] * kVal;
          g += src[idx + 1] * kVal;
          b += src[idx + 2] * kVal;
        }
      }

      const idx = (y * w + x) * 4;
      r = r / kernelSum;
      g = g / kernelSum;
      b = b / kernelSum;

      // Blend between original and sharpened based on strength
      const t = strength;
      dst[idx] = Math.max(0, Math.min(255, Math.round(src[idx] * (1 - t) + r * t)));
      dst[idx + 1] = Math.max(0, Math.min(255, Math.round(src[idx + 1] * (1 - t) + g * t)));
      dst[idx + 2] = Math.max(0, Math.min(255, Math.round(src[idx + 2] * (1 - t) + b * t)));
      dst[idx + 3] = src[idx + 3];
    }
  }
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const amount = Math.max(0, Math.min(200, (options.amount as number) ?? 50));
  const radius = Math.max(1, Math.min(5, (options.radius as number) ?? 1));

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  const imageData = ctx.getImageData(0, 0, w, h);
  const srcData = new Uint8ClampedArray(imageData.data);
  const strength = amount / 100;

  if (radius <= 2) {
    applyConvolution(srcData, imageData.data, w, h, SHARPEN_3X3, 3, strength);
  } else {
    applyConvolution(srcData, imageData.data, w, h, SHARPEN_5X5, 5, strength);
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
