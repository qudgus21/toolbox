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

  const borderWidth = (options.borderWidth as number) ?? 20;
  const borderColor = (options.borderColor as string) ?? "#000000";
  const borderStyle = (options.borderStyle as "solid" | "double" | "rounded") ?? "solid";
  const borderRadius = (options.borderRadius as number) ?? 0;

  const img = await loadImage(file);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  const canvasW = srcW + borderWidth * 2;
  const canvasH = srcH + borderWidth * 2;

  const { canvas, ctx } = createCanvas(canvasW, canvasH);

  onProgress(30);

  if (borderStyle === "double") {
    // Draw outer border
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Draw gap (transparent/white area)
    const gap = Math.max(Math.floor(borderWidth / 3), 1);
    const innerBorder = Math.max(Math.floor(borderWidth / 3), 1);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      innerBorder,
      innerBorder,
      canvasW - innerBorder * 2,
      canvasH - innerBorder * 2,
    );

    // Draw inner border
    ctx.fillStyle = borderColor;
    ctx.fillRect(
      innerBorder + gap,
      innerBorder + gap,
      canvasW - (innerBorder + gap) * 2,
      canvasH - (innerBorder + gap) * 2,
    );

    // Draw image centered
    ctx.drawImage(img, borderWidth, borderWidth);
  } else if (borderStyle === "rounded") {
    // Fill background with border color
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Clip a rounded rect for the image area
    const radius = Math.min(borderRadius, canvasW / 2, canvasH / 2);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(borderWidth, borderWidth, srcW, srcH, radius);
    ctx.clip();
    ctx.drawImage(img, borderWidth, borderWidth);
    ctx.restore();
  } else {
    // Solid: fill with border color, draw image centered
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, borderWidth, borderWidth);
  }

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
