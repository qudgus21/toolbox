/**
 * Shared canvas utilities for image processing.
 * Used by both preview hooks and download processors to guarantee identical output.
 */

export function loadImage(src: string | File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    if (src instanceof File) {
      img.src = URL.createObjectURL(src);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img);
      };
    } else {
      img.src = src;
    }
  });
}

export function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");
  return { canvas, ctx };
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string = "image/png",
  quality: number = 0.92,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      format,
      quality,
    );
  });
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const img = await loadImage(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}

export function formatToMimeType(format: string): string {
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    bmp: "image/bmp",
  };
  // Canvas cannot export SVG, AVIF, etc. — fall back to PNG for non-raster formats
  return map[format.toLowerCase()] ?? "image/png";
}

export function mimeTypeToExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/svg+xml": "svg",
    "image/avif": "avif",
  };
  return map[mime] ?? "png";
}

/** Canvas-supported raster extensions */
const CANVAS_RASTER_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif", "bmp"]);

/** Returns the file extension without the dot */
export function getFileExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx >= 0 ? filename.slice(idx + 1).toLowerCase() : "";
}

/**
 * Returns a safe output extension for Canvas export.
 * Non-raster formats (svg, ico, etc.) fall back to "png".
 */
export function getSafeOutputExtension(filename: string): string {
  const ext = getFileExtension(filename);
  return CANVAS_RASTER_EXTS.has(ext) ? ext : "png";
}

/**
 * Ensures the output filename has a Canvas-compatible extension.
 * e.g. "photo.svg" → "photo.png"
 */
export function getSafeOutputFilename(filename: string): string {
  const ext = getFileExtension(filename);
  if (CANVAS_RASTER_EXTS.has(ext)) return filename;
  return replaceExtension(filename, "png");
}

/** Replaces the file extension */
export function replaceExtension(filename: string, newExt: string): string {
  const idx = filename.lastIndexOf(".");
  const base = idx >= 0 ? filename.slice(0, idx) : filename;
  return `${base}.${newExt}`;
}
