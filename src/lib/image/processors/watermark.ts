import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getSafeOutputExtension,
  getSafeOutputFilename,
  formatToMimeType,
} from "../canvas-utils";

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

function calcPosition(
  pos: Position,
  canvasW: number,
  canvasH: number,
  itemW: number,
  itemH: number,
  margin: number,
): { x: number; y: number } {
  let x: number;
  let y: number;

  // Horizontal
  if (pos.includes("left")) {
    x = margin + itemW / 2;
  } else if (pos.includes("right")) {
    x = canvasW - margin - itemW / 2;
  } else {
    x = canvasW / 2;
  }

  // Vertical
  if (pos.startsWith("top")) {
    y = margin + itemH / 2;
  } else if (pos.startsWith("bottom")) {
    y = canvasH - margin - itemH / 2;
  } else {
    y = canvasH / 2;
  }

  return { x, y };
}

function drawRotated(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotation: number,
  drawFn: () => void,
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  drawFn();
  ctx.restore();
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const mode = (options.mode as string) ?? "text";
  const opacity = (options.opacity as number) ?? 30;
  const position = (options.position as Position) ?? "center";
  const rotation = (options.rotation as number) ?? -30;
  const mosaic = (options.mosaic as boolean) ?? false;

  // Text mode options
  const text = (options.text as string) ?? "Watermark";
  const fontFamily = (options.fontFamily as string) ?? "Arial";
  const fontSize = (options.fontSize as number) ?? 48;
  const color = (options.color as string) ?? "#ffffff";

  // Image mode options
  const watermarkImage = (options.watermarkImage as File | null) ?? null;
  const scale = (options.scale as number) ?? 100;

  const img = await loadImage(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0);

  onProgress(30);

  ctx.globalAlpha = opacity / 100;

  const margin = Math.min(w, h) * 0.03;

  if (mode === "text") {
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const textW = metrics.width;
    const textH = fontSize;

    if (mosaic) {
      const spacingX = textW * 1.5;
      const spacingY = textH * 1.5;
      // Ensure we cover enough area even with rotation
      const diagonal = Math.sqrt(w * w + h * h);
      const startX = -diagonal / 2;
      const startY = -diagonal / 2;
      const endX = w + diagonal / 2;
      const endY = h + diagonal / 2;

      for (let ty = startY; ty < endY; ty += spacingY) {
        for (let tx = startX; tx < endX; tx += spacingX) {
          drawRotated(ctx, tx, ty, rotation, () => {
            ctx.fillText(text, 0, 0);
          });
        }
      }
    } else {
      const { x, y } = calcPosition(position, w, h, textW, textH, margin);
      drawRotated(ctx, x, y, rotation, () => {
        ctx.fillText(text, 0, 0);
      });
    }
  } else if (mode === "image" && watermarkImage) {
    const wmImg = await loadImage(watermarkImage);
    const wmW = wmImg.naturalWidth * (scale / 100);
    const wmH = wmImg.naturalHeight * (scale / 100);

    if (mosaic) {
      const spacingX = wmW * 1.5;
      const spacingY = wmH * 1.5;
      const diagonal = Math.sqrt(w * w + h * h);
      const startX = -diagonal / 2;
      const startY = -diagonal / 2;
      const endX = w + diagonal / 2;
      const endY = h + diagonal / 2;

      for (let ty = startY; ty < endY; ty += spacingY) {
        for (let tx = startX; tx < endX; tx += spacingX) {
          drawRotated(ctx, tx, ty, rotation, () => {
            ctx.drawImage(wmImg, -wmW / 2, -wmH / 2, wmW, wmH);
          });
        }
      }
    } else {
      const { x, y } = calcPosition(position, w, h, wmW, wmH, margin);
      drawRotated(ctx, x, y, rotation, () => {
        ctx.drawImage(wmImg, -wmW / 2, -wmH / 2, wmW, wmH);
      });
    }
  }

  ctx.globalAlpha = 1.0;

  onProgress(80);

  const ext = getSafeOutputExtension(file.name);
  const mime = formatToMimeType(ext);
  const blob = await canvasToBlob(canvas, mime);

  onProgress(100);

  return {
    blob,
    filename: getSafeOutputFilename(file.name),
    size: blob.size,
    width: w,
    height: h,
  };
};

export default processor;
