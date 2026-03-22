import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  replaceExtension,
} from "../canvas-utils";

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const borderWidth = (options.borderWidth as number) ?? 0;
  const borderColor = (options.borderColor as string) ?? "#ffffff";

  const img = await loadImage(file);
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  onProgress(30);

  // Center crop to square
  const minDim = Math.min(imgW, imgH);
  const cropX = (imgW - minDim) / 2;
  const cropY = (imgH - minDim) / 2;

  // Canvas includes border
  const totalSize = minDim + borderWidth * 2;
  const { canvas, ctx } = createCanvas(totalSize, totalSize);

  const centerX = totalSize / 2;
  const centerY = totalSize / 2;
  const outerRadius = totalSize / 2;
  const imageRadius = minDim / 2;

  onProgress(50);

  // Draw border circle if borderWidth > 0
  if (borderWidth > 0) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = borderColor;
    ctx.fill();
  }

  // Clip to circle for image
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, imageRadius, 0, Math.PI * 2);
  ctx.clip();

  // Draw the center-cropped image
  ctx.drawImage(
    img,
    cropX,
    cropY,
    minDim,
    minDim,
    borderWidth,
    borderWidth,
    minDim,
    minDim,
  );
  ctx.restore();

  onProgress(80);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: replaceExtension(file.name, "png"),
    size: blob.size,
    width: totalSize,
    height: totalSize,
  };
};

export default processor;
