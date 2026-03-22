import type { ImageProcessorFn } from "../types";
import { createCanvas, canvasToBlob } from "../canvas-utils";

const processor: ImageProcessorFn = async (_files, options, onProgress) => {
  onProgress(0);

  const type = (options.type as string) ?? "linear";
  const colors = (options.colors as string[]) ?? ["#ff0000", "#0000ff"];
  const angle = (options.angle as number) ?? 90;
  const width = (options.width as number) ?? 800;
  const height = (options.height as number) ?? 600;

  onProgress(20);

  const { canvas, ctx } = createCanvas(width, height);

  let gradient: CanvasGradient;

  if (type === "radial") {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.max(width, height) / 2;
    gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  } else if (type === "conic") {
    const cx = width / 2;
    const cy = height / 2;
    gradient = ctx.createConicGradient((angle * Math.PI) / 180, cx, cy);
  } else {
    // linear
    const rad = (angle * Math.PI) / 180;
    const cx = width / 2;
    const cy = height / 2;
    const len = Math.max(width, height);
    const x1 = cx - Math.cos(rad) * len / 2;
    const y1 = cy - Math.sin(rad) * len / 2;
    const x2 = cx + Math.cos(rad) * len / 2;
    const y2 = cy + Math.sin(rad) * len / 2;
    gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  }

  onProgress(40);

  colors.forEach((color, i) => {
    gradient.addColorStop(i / Math.max(colors.length - 1, 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  onProgress(80);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: `gradient-${type}.png`,
    size: blob.size,
    width,
    height,
  };
};

export default processor;
