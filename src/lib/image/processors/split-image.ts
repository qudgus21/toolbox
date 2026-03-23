import type { ImageProcessorFn } from "../types";
import {
  loadImage,
  createCanvas,
  canvasToBlob,
  getSafeOutputExtension,
  getSafeOutputFilename,
  replaceExtension,
} from "../canvas-utils";

const processor: ImageProcessorFn = async (files, options, onProgress) => {
  const file = files[0];
  onProgress(0);

  const rows = (options.rows as number) ?? 2;
  const cols = (options.cols as number) ?? 2;

  const img = await loadImage(file);
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  onProgress(20);

  // If only 1 tile, return original
  if (rows * cols === 1) {
    const ext = getSafeOutputExtension(file.name);
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
    const { canvas, ctx } = createCanvas(imgW, imgH);
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, mime);
    onProgress(100);
    return {
      blob,
      filename: getSafeOutputFilename(file.name),
      size: blob.size,
      width: imgW,
      height: imgH,
    };
  }

  const tileW = Math.floor(imgW / cols);
  const tileH = Math.floor(imgH / rows);
  const basename = replaceExtension(file.name, "").replace(/\.$/, "");

  onProgress(30);

  // Generate tile blobs
  const tiles: { name: string; blob: Blob }[] = [];
  const totalTiles = rows * cols;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const { canvas, ctx } = createCanvas(tileW, tileH);
      ctx.drawImage(img, c * tileW, r * tileH, tileW, tileH, 0, 0, tileW, tileH);
      const blob = await canvasToBlob(canvas, "image/png");
      tiles.push({
        name: `${basename}_r${r}_c${c}.png`,
        blob,
      });

      const tileIndex = r * cols + c + 1;
      onProgress(30 + Math.round((tileIndex / totalTiles) * 50));
    }
  }

  onProgress(80);

  // Try to create ZIP using JSZip
  try {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const tile of tiles) {
      zip.file(tile.name, tile.blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });

    onProgress(100);

    return {
      blob: zipBlob,
      filename: replaceExtension(file.name, "zip"),
      size: zipBlob.size,
    };
  } catch {
    // JSZip not available, return first tile with note
    onProgress(100);
    return {
      blob: tiles[0].blob,
      filename: tiles[0].name,
      size: tiles[0].blob.size,
      width: tileW,
      height: tileH,
    };
  }
};

export default processor;
