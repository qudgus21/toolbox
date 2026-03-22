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

  const text = (options.text as string) ?? "Hello";
  const fontFamily = (options.fontFamily as string) ?? "Arial";
  const fontSize = (options.fontSize as number) ?? 48;
  const color = (options.color as string) ?? "#ffffff";
  const x = (options.x as number) ?? 50;
  const y = (options.y as number) ?? 50;
  const bold = (options.bold as boolean) ?? false;
  const italic = (options.italic as boolean) ?? false;
  const align = (options.align as CanvasTextAlign) ?? "center";
  const shadow = (options.shadow as boolean) ?? false;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(50);

  // Build font string
  const fontParts: string[] = [];
  if (italic) fontParts.push("italic");
  if (bold) fontParts.push("bold");
  fontParts.push(`${fontSize}px`);
  fontParts.push(fontFamily);
  ctx.font = fontParts.join(" ");

  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";

  if (shadow) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  const px = (x * w) / 100;
  const py = (y * h) / 100;
  ctx.fillText(text, px, py);

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
