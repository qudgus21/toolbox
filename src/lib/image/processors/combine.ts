import type { ImageProcessorFn } from "../types";
import { loadImage, createCanvas, canvasToBlob } from "../canvas-utils";

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  onProgress(0);

  const layout = (options.layout as "horizontal" | "vertical" | "grid") ?? "horizontal";
  const gap = (options.gap as number) ?? 0;
  const backgroundColor = (options.backgroundColor as string) ?? "#ffffff";
  const alignment = (options.alignment as "start" | "center" | "end") ?? "center";

  // Load all images
  const images = await Promise.all(files.map((f) => loadImage(f)));
  const dims = images.map((img) => ({
    w: img.naturalWidth,
    h: img.naturalHeight,
  }));

  onProgress(30);

  let canvasW: number;
  let canvasH: number;

  // Compute positions for each image
  const positions: { x: number; y: number; w: number; h: number }[] = [];

  if (layout === "horizontal") {
    canvasW = dims.reduce((sum, d) => sum + d.w, 0) + gap * (dims.length - 1);
    canvasH = Math.max(...dims.map((d) => d.h));
    let x = 0;
    for (const d of dims) {
      let y = 0;
      if (alignment === "center") y = (canvasH - d.h) / 2;
      else if (alignment === "end") y = canvasH - d.h;
      positions.push({ x, y, w: d.w, h: d.h });
      x += d.w + gap;
    }
  } else if (layout === "vertical") {
    canvasW = Math.max(...dims.map((d) => d.w));
    canvasH = dims.reduce((sum, d) => sum + d.h, 0) + gap * (dims.length - 1);
    let y = 0;
    for (const d of dims) {
      let x = 0;
      if (alignment === "center") x = (canvasW - d.w) / 2;
      else if (alignment === "end") x = canvasW - d.w;
      positions.push({ x, y, w: d.w, h: d.h });
      y += d.h + gap;
    }
  } else {
    // grid
    const count = dims.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellW = Math.max(...dims.map((d) => d.w));
    const cellH = Math.max(...dims.map((d) => d.h));
    canvasW = cols * cellW + (cols - 1) * gap;
    canvasH = rows * cellH + (rows - 1) * gap;

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const cellX = col * (cellW + gap);
      const cellY = row * (cellH + gap);
      const d = dims[i];

      let x = cellX;
      let y = cellY;
      if (alignment === "center") {
        x = cellX + (cellW - d.w) / 2;
        y = cellY + (cellH - d.h) / 2;
      } else if (alignment === "end") {
        x = cellX + (cellW - d.w);
        y = cellY + (cellH - d.h);
      }
      positions.push({ x, y, w: d.w, h: d.h });
    }
  }

  onProgress(50);

  const { canvas, ctx } = createCanvas(canvasW, canvasH);

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Draw images
  for (let i = 0; i < images.length; i++) {
    const pos = positions[i];
    ctx.drawImage(images[i], pos.x, pos.y, pos.w, pos.h);
  }

  onProgress(80);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: "combined.png",
    size: blob.size,
    width: canvasW,
    height: canvasH,
  };
};

export default processor;
