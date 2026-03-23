import type { ImageProcessorFn } from "../types";
import { loadImage, createCanvas, canvasToBlob } from "../canvas-utils";

interface ColorBucket {
  rSum: number;
  gSum: number;
  bSum: number;
  count: number;
  pixels: [number, number, number][];
}

function getPixelData(
  img: HTMLImageElement,
  sampleSize: number,
): [number, number, number][] {
  // Downsample for performance
  const maxDim = 100;
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);

  const { canvas, ctx } = createCanvas(w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const pixels: [number, number, number][] = [];
  for (let i = 0; i < data.length; i += 4) {
    // Skip mostly transparent pixels
    if (data[i + 3] < 128) continue;
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }

  return pixels;
}

/**
 * Simple median-cut color quantization
 */
function medianCut(
  pixels: [number, number, number][],
  numColors: number,
): [number, number, number][] {
  if (pixels.length === 0) return [[128, 128, 128]];

  type Bucket = { pixels: [number, number, number][] };
  let buckets: Bucket[] = [{ pixels: [...pixels] }];

  while (buckets.length < numColors) {
    // Find the bucket with the largest range
    let maxRange = -1;
    let maxBucketIdx = 0;
    let splitChannel = 0;

    for (let bi = 0; bi < buckets.length; bi++) {
      const bp = buckets[bi].pixels;
      if (bp.length < 2) continue;

      for (let ch = 0; ch < 3; ch++) {
        let min = 255, max = 0;
        for (const p of bp) {
          if (p[ch] < min) min = p[ch];
          if (p[ch] > max) max = p[ch];
        }
        const range = max - min;
        if (range > maxRange) {
          maxRange = range;
          maxBucketIdx = bi;
          splitChannel = ch;
        }
      }
    }

    if (maxRange <= 0) break;

    const bucket = buckets[maxBucketIdx];
    bucket.pixels.sort((a, b) => a[splitChannel] - b[splitChannel]);
    const mid = Math.floor(bucket.pixels.length / 2);

    buckets.splice(maxBucketIdx, 1, {
      pixels: bucket.pixels.slice(0, mid),
    }, {
      pixels: bucket.pixels.slice(mid),
    });
  }

  // Average each bucket
  return buckets.map((b) => {
    if (b.pixels.length === 0) return [128, 128, 128] as [number, number, number];
    let rSum = 0, gSum = 0, bSum = 0;
    for (const p of b.pixels) {
      rSum += p[0];
      gSum += p[1];
      bSum += p[2];
    }
    const n = b.pixels.length;
    return [
      Math.round(rSum / n),
      Math.round(gSum / n),
      Math.round(bSum / n),
    ] as [number, number, number];
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const numColors = (options.numColors as number) ?? 6;
  const layout = (options.layout as string) ?? "horizontal";

  const img = await loadImage(file);
  onProgress(20);

  const pixels = getPixelData(img, 10000);
  onProgress(40);

  const colors = medianCut(pixels, numColors);
  onProgress(60);

  // Sort by luminance
  colors.sort((a, b) => luminance(b[0], b[1], b[2]) - luminance(a[0], a[1], a[2]));

  // Render swatch image
  let swatchW: number, swatchH: number;
  if (layout === "grid") {
    const cols = Math.ceil(Math.sqrt(colors.length));
    const rows = Math.ceil(colors.length / cols);
    const cellSize = 150;
    swatchW = cols * cellSize;
    swatchH = rows * (cellSize + 30);
  } else {
    // horizontal
    swatchW = colors.length * 100;
    swatchH = 200;
  }

  const { canvas, ctx } = createCanvas(swatchW, swatchH);

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, swatchW, swatchH);

  if (layout === "grid") {
    const cols = Math.ceil(Math.sqrt(colors.length));
    const cellSize = 150;
    colors.forEach(([r, g, b], i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellSize;
      const y = row * (cellSize + 30);

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x + 5, y + 5, cellSize - 10, cellSize - 10);

      // Hex label
      const hex = rgbToHex(r, g, b);
      ctx.fillStyle = "#333333";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(hex, x + cellSize / 2, y + cellSize + 18);
    });
  } else {
    const blockW = swatchW / colors.length;
    colors.forEach(([r, g, b], i) => {
      const x = i * blockW;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x, 0, blockW, swatchH - 40);

      // Hex label below
      const hex = rgbToHex(r, g, b);
      const textLum = luminance(r, g, b);
      ctx.fillStyle = "#333333";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(hex, x + blockW / 2, swatchH - 15);
    });
  }

  onProgress(90);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  const baseName = file.name.replace(/\.[^.]+$/, "");
  return {
    blob,
    filename: `${baseName}-palette.png`,
    size: blob.size,
    width: swatchW,
    height: swatchH,
  };
};

export default processor;
