import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getSafeOutputExtension,
  getSafeOutputFilename,
  formatToMimeType,
} from "../canvas-utils";

interface TextItem {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  shadow: boolean;
  alignH: "left" | "center" | "right";
  alignV: "top" | "center" | "bottom";
  bgColor: string;
  x: number; // top-left x as % of image width
  y: number; // top-left y as % of image height
  w: number; // width as % of image width
  h: number; // height as % of image height
}

const LINE_HEIGHT = 1.3;

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const items = (options.items as TextItem[]) ?? [];

  const img = await loadImage(file);
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  const { canvas, ctx } = createCanvas(imgW, imgH);
  ctx.drawImage(img, 0, 0);

  onProgress(50);

  for (const item of items) {
    if (!item.text) continue;

    const fontParts: string[] = [];
    if (item.italic) fontParts.push("italic");
    if (item.bold) fontParts.push("bold");
    fontParts.push(`${item.fontSize}px`);
    fontParts.push(item.fontFamily);
    ctx.font = fontParts.join(" ");

    ctx.fillStyle = item.color;
    const alignH = item.alignH ?? "center";
    const alignV = item.alignV ?? "center";
    ctx.textAlign = alignH;
    ctx.textBaseline = "top";

    // Box in image pixels
    const boxX = (item.x / 100) * imgW;
    const boxY = (item.y / 100) * imgH;
    const boxW = (item.w / 100) * imgW;
    const boxH = (item.h / 100) * imgH;

    // Draw background
    if (item.bgColor && item.bgColor !== "transparent") {
      // Reset shadow before drawing bg
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.fillStyle = item.bgColor;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 4);
      ctx.fill();
      // Restore text color
      ctx.fillStyle = item.color;
    }

    if (item.shadow) {
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    } else {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Horizontal anchor X
    let anchorX: number;
    if (alignH === "left") anchorX = boxX;
    else if (alignH === "right") anchorX = boxX + boxW;
    else anchorX = boxX + boxW / 2;

    const lines = item.text.split("\n");
    const lineStep = item.fontSize * LINE_HEIGHT;
    const totalTextH = lineStep * lines.length;

    // Vertical start Y
    let startY: number;
    if (alignV === "top") startY = boxY;
    else if (alignV === "bottom") startY = boxY + boxH - totalTextH;
    else startY = boxY + (boxH - totalTextH) / 2;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], anchorX, startY + i * lineStep);
    }
  }

  // Reset shadow
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

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
