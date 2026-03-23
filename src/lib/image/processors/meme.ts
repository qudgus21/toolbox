import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getSafeOutputExtension,
  getSafeOutputFilename,
  formatToMimeType,
} from "../canvas-utils";

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

function drawMemeText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  baseY: number,
  maxWidth: number,
  fontSize: number,
  textColor: string,
  strokeColor: string,
  fromBottom: boolean,
) {
  if (!text) return;

  ctx.font = `bold ${fontSize}px Impact, "Arial Black", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = textColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = fontSize / 15;
  ctx.lineJoin = "round";

  const lines = wrapText(ctx, text.toUpperCase(), maxWidth);
  const lineHeight = fontSize * 1.2;

  let startY: number;
  if (fromBottom) {
    // Bottom text: position so the last line ends at baseY
    startY = baseY - lines.length * lineHeight;
  } else {
    startY = baseY;
  }

  for (let i = 0; i < lines.length; i++) {
    const y = startY + i * lineHeight;
    // Stroke first for outline, then fill
    ctx.strokeText(lines[i], centerX, y);
    ctx.fillText(lines[i], centerX, y);
  }
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const topText = (options.topText as string) ?? "";
  const bottomText = (options.bottomText as string) ?? "";
  const textColor = (options.textColor as string) ?? "#ffffff";
  const strokeColor = (options.strokeColor as string) ?? "#000000";

  const img = await loadImage(file);
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  onProgress(30);

  const fontSize =
    (options.fontSize as number) || Math.round(imgW / 10);

  const { canvas, ctx } = createCanvas(imgW, imgH);
  ctx.drawImage(img, 0, 0);

  onProgress(50);

  const maxTextWidth = imgW * 0.9;
  const topY = imgH * 0.05;
  const bottomY = imgH * 0.95;
  const centerX = imgW / 2;

  drawMemeText(ctx, topText, centerX, topY, maxTextWidth, fontSize, textColor, strokeColor, false);
  drawMemeText(ctx, bottomText, centerX, bottomY, maxTextWidth, fontSize, textColor, strokeColor, true);

  onProgress(80);

  const ext = getSafeOutputExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: getSafeOutputFilename(file.name),
    size: blob.size,
    width: imgW,
    height: imgH,
  };
};

export default processor;
