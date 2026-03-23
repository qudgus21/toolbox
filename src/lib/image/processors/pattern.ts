import type { ImageProcessorFn } from "../types";
import { createCanvas, canvasToBlob } from "../canvas-utils";

function drawStripes(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  spacing: number,
) {
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color2;
  for (let y = 0; y < h; y += spacing * 2) {
    ctx.fillRect(0, y, w, spacing);
  }
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  spacing: number,
) {
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color2;
  const radius = spacing / 4;
  for (let y = spacing / 2; y < h; y += spacing) {
    for (let x = spacing / 2; x < w; x += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawCheckerboard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  spacing: number,
) {
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color2;
  for (let y = 0; y < h; y += spacing) {
    for (let x = 0; x < w; x += spacing) {
      const col = Math.floor(x / spacing);
      const row = Math.floor(y / spacing);
      if ((col + row) % 2 === 0) {
        ctx.fillRect(x, y, spacing, spacing);
      }
    }
  }
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  spacing: number,
) {
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = color2;
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

function drawDiagonal(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  spacing: number,
) {
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = color2;
  ctx.lineWidth = spacing / 4;
  const maxDim = w + h;
  for (let i = -maxDim; i < maxDim; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
  }
}

const processor: ImageProcessorFn = async (_files, options, onProgress) => {
  onProgress(0);

  const type = (options.type as string) ?? "stripes";
  const color1 = (options.color1 as string) ?? "#ffffff";
  const color2 = (options.color2 as string) ?? "#000000";
  const width = (options.width as number) ?? 800;
  const height = (options.height as number) ?? 800;
  const spacing = (options.spacing as number) ?? 20;

  onProgress(20);

  const { canvas, ctx } = createCanvas(width, height);

  onProgress(40);

  switch (type) {
    case "dots":
      drawDots(ctx, width, height, color1, color2, spacing);
      break;
    case "checkerboard":
      drawCheckerboard(ctx, width, height, color1, color2, spacing);
      break;
    case "grid":
      drawGrid(ctx, width, height, color1, color2, spacing);
      break;
    case "diagonal":
      drawDiagonal(ctx, width, height, color1, color2, spacing);
      break;
    case "stripes":
    default:
      drawStripes(ctx, width, height, color1, color2, spacing);
      break;
  }

  onProgress(80);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: `pattern-${type}.png`,
    size: blob.size,
    width,
    height,
  };
};

export default processor;
