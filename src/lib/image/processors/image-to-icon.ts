import type { ImageProcessorFn } from "../types";
import { loadImage, createCanvas, canvasToBlob } from "../canvas-utils";

const ALL_SIZES = [16, 32, 48, 64, 128, 256, 512];

async function resizeToIcon(
  file: File,
  targetSize: number,
): Promise<HTMLCanvasElement> {
  // Center-crop to square, then resize using createImageBitmap (high quality)
  const bitmap = await createImageBitmap(file);
  const minDim = Math.min(bitmap.width, bitmap.height);
  const cropX = (bitmap.width - minDim) / 2;
  const cropY = (bitmap.height - minDim) / 2;

  // createImageBitmap with resizeWidth/Height uses high-quality Lanczos resampling
  const resized = await createImageBitmap(file, cropX, cropY, minDim, minDim, {
    resizeWidth: targetSize,
    resizeHeight: targetSize,
    resizeQuality: "high",
  });

  const { canvas, ctx } = createCanvas(targetSize, targetSize);
  ctx.drawImage(resized, 0, 0);
  resized.close();
  bitmap.close();

  return canvas;
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const sizes = (options.sizes as number[]) ?? ALL_SIZES;
  onProgress(20);

  const blobs: { name: string; blob: Blob }[] = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const resized = await resizeToIcon(file, size);
    const blob = await canvasToBlob(resized, "image/png");
    blobs.push({ name: `icon-${size}x${size}.png`, blob });
    onProgress(20 + Math.round(((i + 1) / sizes.length) * 60));
  }

  onProgress(80);

  // If only one size, return directly
  if (blobs.length === 1) {
    onProgress(100);
    return {
      blob: blobs[0].blob,
      filename: blobs[0].name,
      size: blobs[0].blob.size,
      width: sizes[0],
      height: sizes[0],
    };
  }

  // Multiple sizes → ZIP
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const item of blobs) {
    zip.file(item.name, item.blob);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });

  onProgress(100);

  const baseName = file.name.replace(/\.[^.]+$/, "");
  return {
    blob: zipBlob,
    filename: `${baseName}-icons.zip`,
    size: zipBlob.size,
  };
};

export default processor;
