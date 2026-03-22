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

  const angle = (options.angle as number) ?? 0;
  const backgroundColor = (options.backgroundColor as string) ?? "#ffffff";

  const img = await loadImage(file);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  onProgress(30);

  // Normalize angle to 0-360
  const normalizedAngle = ((angle % 360) + 360) % 360;
  const radians = (normalizedAngle * Math.PI) / 180;

  let canvasW: number;
  let canvasH: number;

  // For exact 90/270 rotations, simply swap dimensions
  if (normalizedAngle === 90 || normalizedAngle === 270) {
    canvasW = srcH;
    canvasH = srcW;
  } else if (normalizedAngle === 0 || normalizedAngle === 180) {
    canvasW = srcW;
    canvasH = srcH;
  } else {
    // For arbitrary angles, calculate bounding box of rotated rectangle
    const absCos = Math.abs(Math.cos(radians));
    const absSin = Math.abs(Math.sin(radians));
    canvasW = Math.ceil(srcW * absCos + srcH * absSin);
    canvasH = Math.ceil(srcW * absSin + srcH * absCos);
  }

  const { canvas, ctx } = createCanvas(canvasW, canvasH);

  // Fill background (visible for non-90-degree rotations)
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Translate to center, rotate, draw centered
  ctx.translate(canvasW / 2, canvasH / 2);
  ctx.rotate(radians);
  ctx.drawImage(img, -srcW / 2, -srcH / 2);

  onProgress(70);

  const ext = getFileExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: file.name,
    size: blob.size,
    width: canvasW,
    height: canvasH,
  };
};

export default processor;
