import type { ImageProcessorFn } from "../types";
import { createCanvas, canvasToBlob } from "../canvas-utils";

const processor: ImageProcessorFn = async (_files, options, onProgress) => {
  onProgress(0);

  const width = (options.width as number) ?? 800;
  const height = (options.height as number) ?? 600;
  const bgColor = (options.bgColor as string) ?? "#cccccc";
  const textColor = (options.textColor as string) ?? "#666666";
  const text = (options.text as string) || `${width} x ${height}`;
  const format = (options.format as string) ?? "png";

  onProgress(20);

  const { canvas, ctx } = createCanvas(width, height);

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  onProgress(40);

  // Draw cross lines
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.15;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.moveTo(width, 0);
  ctx.lineTo(0, height);
  ctx.stroke();
  ctx.globalAlpha = 1;

  onProgress(60);

  // Draw centered text
  const fontSize = Math.max(16, Math.min(width, height) / 8);
  ctx.fillStyle = textColor;
  ctx.font = `bold ${fontSize}px -apple-system, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  // Draw border
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.3;
  ctx.strokeRect(1, 1, width - 2, height - 2);
  ctx.globalAlpha = 1;

  onProgress(80);

  const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
  const ext = format === "jpg" ? "jpg" : "png";
  const blob = await canvasToBlob(canvas, mimeType);

  onProgress(100);

  return {
    blob,
    filename: `placeholder-${width}x${height}.${ext}`,
    size: blob.size,
    width,
    height,
  };
};

export default processor;
