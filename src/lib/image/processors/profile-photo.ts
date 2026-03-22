import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  replaceExtension,
} from "../canvas-utils";

type Platform = "instagram" | "twitter" | "linkedin" | "facebook" | "youtube" | "custom";

const PLATFORM_SIZES: Record<Exclude<Platform, "custom">, number> = {
  instagram: 320,
  twitter: 400,
  linkedin: 400,
  facebook: 170,
  youtube: 800,
};

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const platform = (options.platform as Platform) ?? "instagram";
  const customSize = (options.customSize as number) ?? 400;

  const targetSize =
    platform === "custom" ? customSize : PLATFORM_SIZES[platform];

  const img = await loadImage(file);
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  onProgress(30);

  // Center crop to square
  const minDim = Math.min(imgW, imgH);
  const cropX = (imgW - minDim) / 2;
  const cropY = (imgH - minDim) / 2;

  const { canvas, ctx } = createCanvas(targetSize, targetSize);

  onProgress(50);

  // Clip to circle
  ctx.beginPath();
  ctx.arc(targetSize / 2, targetSize / 2, targetSize / 2, 0, Math.PI * 2);
  ctx.clip();

  // Draw center-cropped and scaled image
  ctx.drawImage(
    img,
    cropX,
    cropY,
    minDim,
    minDim,
    0,
    0,
    targetSize,
    targetSize,
  );

  onProgress(80);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: replaceExtension(file.name, "png"),
    size: blob.size,
    width: targetSize,
    height: targetSize,
  };
};

export default processor;
