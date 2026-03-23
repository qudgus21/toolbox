import type { ImageProcessorFn } from "../types";
import { loadImage, createCanvas, canvasToBlob } from "../canvas-utils";

type Template = "2h" | "2v" | "3l" | "3r" | "4grid" | "5mix";

interface Slot {
  x: number;
  y: number;
  w: number;
  h: number;
}

function getSlots(
  template: Template,
  cw: number,
  ch: number,
  gap: number,
): Slot[] {
  const g = gap;
  const hg = g / 2; // half gap

  switch (template) {
    case "2h":
      return [
        { x: 0, y: 0, w: (cw - g) / 2, h: ch },
        { x: (cw - g) / 2 + g, y: 0, w: (cw - g) / 2, h: ch },
      ];
    case "2v":
      return [
        { x: 0, y: 0, w: cw, h: (ch - g) / 2 },
        { x: 0, y: (ch - g) / 2 + g, w: cw, h: (ch - g) / 2 },
      ];
    case "3l": {
      // 1 large left + 2 small right (stacked)
      const leftW = (cw - g) * 2 / 3;
      const rightW = cw - leftW - g;
      const rightH = (ch - g) / 2;
      return [
        { x: 0, y: 0, w: leftW, h: ch },
        { x: leftW + g, y: 0, w: rightW, h: rightH },
        { x: leftW + g, y: rightH + g, w: rightW, h: rightH },
      ];
    }
    case "3r": {
      // 2 small left + 1 large right
      const rightW = (cw - g) * 2 / 3;
      const leftW = cw - rightW - g;
      const leftH = (ch - g) / 2;
      return [
        { x: 0, y: 0, w: leftW, h: leftH },
        { x: 0, y: leftH + g, w: leftW, h: leftH },
        { x: leftW + g, y: 0, w: rightW, h: ch },
      ];
    }
    case "4grid": {
      const cellW = (cw - g) / 2;
      const cellH = (ch - g) / 2;
      return [
        { x: 0, y: 0, w: cellW, h: cellH },
        { x: cellW + g, y: 0, w: cellW, h: cellH },
        { x: 0, y: cellH + g, w: cellW, h: cellH },
        { x: cellW + g, y: cellH + g, w: cellW, h: cellH },
      ];
    }
    case "5mix": {
      // 1 large top-left + 2 small right + 2 small bottom
      const topH = (ch - g) * 2 / 3;
      const botH = ch - topH - g;
      const leftW = (cw - g) * 2 / 3;
      const rightW = cw - leftW - g;
      const rightCellH = (topH - g) / 2;
      const botCellW = (cw - g) / 2;
      return [
        { x: 0, y: 0, w: leftW, h: topH },
        { x: leftW + g, y: 0, w: rightW, h: rightCellH },
        { x: leftW + g, y: rightCellH + g, w: rightW, h: rightCellH },
        { x: 0, y: topH + g, w: botCellW, h: botH },
        { x: botCellW + g, y: topH + g, w: botCellW, h: botH },
      ];
    }
    default:
      return getSlots("4grid", cw, ch, gap);
  }
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  slot: Slot,
  borderRadius: number,
) {
  const { x, y, w, h } = slot;

  ctx.save();

  // Clip with rounded corners if needed
  if (borderRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, borderRadius);
    ctx.clip();
  }

  // Cover-fit the image into the slot
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const scale = Math.max(w / imgW, h / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const drawX = x + (w - drawW) / 2;
  const drawY = y + (h - drawH) / 2;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  ctx.restore();
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  onProgress(0);

  const template = (options.template as Template) ?? "4grid";
  const gap = (options.gap as number) ?? 10;
  const backgroundColor = (options.backgroundColor as string) ?? "#ffffff";
  const borderRadius = (options.borderRadius as number) ?? 0;

  // Canvas size
  const canvasW = 1200;
  const canvasH = 900;

  // Load images
  const images = await Promise.all(files.map((f) => loadImage(f)));

  onProgress(30);

  const slots = getSlots(template, canvasW, canvasH, gap);

  const { canvas, ctx } = createCanvas(canvasW, canvasH);

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasW, canvasH);

  onProgress(50);

  // Draw images into slots
  for (let i = 0; i < slots.length; i++) {
    if (i < images.length) {
      drawImageCover(ctx, images[i], slots[i], borderRadius);
    }
    // If fewer images than slots, slot remains background color
  }

  onProgress(80);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: "collage.png",
    size: blob.size,
    width: canvasW,
    height: canvasH,
  };
};

export default processor;
