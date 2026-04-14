"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const NEEDS_DECODE = new Set(["heic", "heif", "tif", "tiff", "psd", "eps"]);

function getExtension(name: string): string {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function needsLibraryDecode(file: File): boolean {
  return NEEDS_DECODE.has(getExtension(file.name));
}

/**
 * Decode formats that browsers can't render natively.
 * Returns a blob URL for the decoded image.
 */
async function decodeToObjectUrl(file: File): Promise<string> {
  const ext = getExtension(file.name);

  // HEIC / HEIF
  if (ext === "heic" || ext === "heif") {
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.7 });
    const blob = Array.isArray(result) ? result[0] : result;
    return URL.createObjectURL(blob);
  }

  // TIFF
  if (ext === "tif" || ext === "tiff") {
    const UTIF = await import("utif2");
    const buf = await file.arrayBuffer();
    const ifds = UTIF.decode(buf);
    UTIF.decodeImage(buf, ifds[0]);
    const rgba = UTIF.toRGBA8(ifds[0]);
    const w = ifds[0].width;
    const h = ifds[0].height;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const imgData = ctx.createImageData(w, h);
    imgData.data.set(new Uint8Array(rgba.buffer));
    ctx.putImageData(imgData, 0, 0);
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        canvas.width = 0;
        canvas.height = 0;
        if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    });
  }

  // PSD — composite image (flattened)
  if (ext === "psd") {
    const { readPsd } = await import("ag-psd");
    const buf = await file.arrayBuffer();
    const psd = readPsd(buf);
    const canvas = psd.canvas;
    if (!canvas) throw new Error("PSD has no composite image");
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        canvas.width = 0;
        canvas.height = 0;
        if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    });
  }

  // EPS — cannot decode client-side, will fall through to error
  throw new Error(`Unsupported format: ${ext}`);
}

interface ImagePreviewProps {
  file: File;
  files?: File[];
  slug: string;
  options: Record<string, unknown>;
}

export function ImagePreview({ file, files, slug, options }: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [allImageUrls, setAllImageUrls] = useState<string[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [decoding, setDecoding] = useState(false);
  const rafRef = useRef<number>(0);

  // Create object URL — for unsupported formats, decode first
  useEffect(() => {
    setLoadError(false);
    setImageUrl("");

    if (needsLibraryDecode(file)) {
      setDecoding(true);
      let revoked = false;
      let createdUrl: string | null = null;
      decodeToObjectUrl(file)
        .then((url) => {
          if (!revoked) {
            createdUrl = url;
            setImageUrl(url);
            setDecoding(false);
          } else {
            URL.revokeObjectURL(url);
          }
        })
        .catch(() => { setLoadError(true); setDecoding(false); });
      return () => {
        revoked = true;
        if (createdUrl) URL.revokeObjectURL(createdUrl);
      };
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Create object URLs for all files (combine/collage)
  useEffect(() => {
    if (!files || files.length === 0) {
      setAllImageUrls([]);
      return;
    }
    const urls = files.map((f) => URL.createObjectURL(f));
    setAllImageUrls(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !imageUrl) return;

    const img = new Image();
    img.onload = () => {
      const containerRect = container.getBoundingClientRect();
      const maxW = containerRect.width;
      const maxH = 500;

      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      let outputW = srcW;
      let outputH = srcH;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // --- Resize ---
      if (slug === "resize") {
        outputW = (options.width as number) || srcW;
        outputH = (options.height as number) || srcH;
      }

      // --- Rotate ---
      if (slug === "rotate") {
        const angleDeg = (options.angle as number) ?? 0;
        const bgColor = (options.backgroundColor as string) || "transparent";
        const normalizedAngle = ((angleDeg % 360) + 360) % 360;
        const radians = (normalizedAngle * Math.PI) / 180;

        const diagonal = Math.ceil(Math.sqrt(srcW * srcW + srcH * srcH));
        const scale = Math.min(maxW / diagonal, maxH / diagonal, 4);
        const displaySize = Math.round(diagonal * scale);

        canvas.width = displaySize;
        canvas.height = displaySize;
        ctx.clearRect(0, 0, displaySize, displaySize);

        if (bgColor !== "transparent") {
          const absCos = Math.abs(Math.cos(radians));
          const absSin = Math.abs(Math.sin(radians));
          const bbW = Math.ceil(srcW * absCos + srcH * absSin) * scale;
          const bbH = Math.ceil(srcW * absSin + srcH * absCos) * scale;
          ctx.fillStyle = bgColor;
          ctx.save();
          ctx.translate(displaySize / 2, displaySize / 2);
          ctx.fillRect(-bbW / 2, -bbH / 2, bbW, bbH);
          ctx.restore();
        }

        ctx.save();
        ctx.translate(displaySize / 2, displaySize / 2);
        ctx.rotate(radians);
        const drawW = srcW * scale;
        const drawH = srcH * scale;
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
        return;
      }

      // --- Flip ---
      if (slug === "flip") {
        const flipH = (options.horizontal as boolean) || false;
        const flipV = (options.vertical as boolean) || false;

        const scale = Math.min(maxW / outputW, maxH / outputH, 4);
        const displayW = Math.round(outputW * scale);
        const displayH = Math.round(outputH * scale);

        canvas.width = displayW;
        canvas.height = displayH;
        ctx.clearRect(0, 0, displayW, displayH);
        ctx.save();
        ctx.translate(flipH ? displayW : 0, flipV ? displayH : 0);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(img, 0, 0, displayW, displayH);
        ctx.restore();
        return;
      }

      // --- Add border ---
      if (slug === "add-border") {
        const borderWidth = (options.borderWidth as number) ?? 20;
        const borderColor = (options.borderColor as string) ?? "#000000";
        const borderStyle = (options.borderStyle as string) ?? "solid";
        const borderRadius = (options.borderRadius as number) ?? 0;

        const totalW = srcW + borderWidth * 2;
        const totalH = srcH + borderWidth * 2;
        const scale = Math.min(maxW / totalW, maxH / totalH, 4);
        const displayW = Math.round(totalW * scale);
        const displayH = Math.round(totalH * scale);
        const sb = borderWidth * scale;
        const imgW = Math.round(srcW * scale);
        const imgH = Math.round(srcH * scale);

        canvas.width = displayW;
        canvas.height = displayH;
        ctx.clearRect(0, 0, displayW, displayH);

        if (borderStyle === "double") {
          ctx.fillStyle = borderColor;
          ctx.fillRect(0, 0, displayW, displayH);
          const gap = Math.max(Math.floor(sb / 3), 1);
          const ib = Math.max(Math.floor(sb / 3), 1);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(ib, ib, displayW - ib * 2, displayH - ib * 2);
          ctx.fillStyle = borderColor;
          ctx.fillRect(ib + gap, ib + gap, displayW - (ib + gap) * 2, displayH - (ib + gap) * 2);
          ctx.drawImage(img, sb, sb, imgW, imgH);
        } else if (borderStyle === "rounded") {
          ctx.fillStyle = borderColor;
          ctx.fillRect(0, 0, displayW, displayH);
          const r = Math.min(borderRadius * scale, displayW / 2, displayH / 2);
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(sb, sb, imgW, imgH, r);
          ctx.clip();
          ctx.drawImage(img, sb, sb, imgW, imgH);
          ctx.restore();
        } else {
          ctx.fillStyle = borderColor;
          ctx.fillRect(0, 0, displayW, displayH);
          ctx.drawImage(img, sb, sb, imgW, imgH);
        }
        return;
      }

      // --- Combine (multi-file) ---
      if (slug === "combine" && allImageUrls.length > 0) {
        const layout = (options.layout as string) ?? "horizontal";
        const gap = (options.gap as number) ?? 0;
        const bgColor = (options.backgroundColor as string) ?? "#ffffff";
        const alignment = (options.alignment as string) ?? "center";

        const allImgs: HTMLImageElement[] = [];
        let loaded = 0;
        const total = allImageUrls.length;

        const onAllLoaded = () => {
          const dims = allImgs.map((im) => ({ w: im.naturalWidth, h: im.naturalHeight }));
          const positions: { x: number; y: number; w: number; h: number }[] = [];
          let canvasW: number, canvasH: number;

          if (layout === "vertical") {
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
          } else if (layout === "grid") {
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
              let x = cellX, y = cellY;
              if (alignment === "center") { x = cellX + (cellW - d.w) / 2; y = cellY + (cellH - d.h) / 2; }
              else if (alignment === "end") { x = cellX + (cellW - d.w); y = cellY + (cellH - d.h); }
              positions.push({ x, y, w: d.w, h: d.h });
            }
          } else {
            // horizontal
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
          }

          const s = Math.min(maxW / canvasW, maxH / canvasH, 4);
          const dW = Math.round(canvasW * s);
          const dH = Math.round(canvasH * s);

          canvas.width = dW;
          canvas.height = dH;
          ctx.clearRect(0, 0, dW, dH);
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, dW, dH);

          for (let i = 0; i < allImgs.length; i++) {
            const p = positions[i];
            ctx.drawImage(allImgs[i], Math.round(p.x * s), Math.round(p.y * s), Math.round(p.w * s), Math.round(p.h * s));
          }
        };

        for (const url of allImageUrls) {
          const im = new Image();
          im.onload = () => {
            loaded++;
            if (loaded === total) onAllLoaded();
          };
          im.src = url;
          allImgs.push(im);
        }
        return;
      }

      // --- Collage (multi-file) ---
      if (slug === "collage" && allImageUrls.length > 0) {
        const template = (options.template as string) ?? "4grid";
        const gap = (options.gap as number) ?? 10;
        const bgColor = (options.backgroundColor as string) ?? "#ffffff";
        const borderRadius = (options.borderRadius as number) ?? 0;

        const cw = 1200;
        const ch = 900;

        const getSlots = (t: string, w: number, h: number, g: number) => {
          const slots: { x: number; y: number; w: number; h: number }[] = [];
          if (t === "2h") {
            slots.push({ x: 0, y: 0, w: (w - g) / 2, h });
            slots.push({ x: (w - g) / 2 + g, y: 0, w: (w - g) / 2, h });
          } else if (t === "2v") {
            slots.push({ x: 0, y: 0, w, h: (h - g) / 2 });
            slots.push({ x: 0, y: (h - g) / 2 + g, w, h: (h - g) / 2 });
          } else if (t === "3l") {
            const lw = (w - g) * 2 / 3, rw = w - lw - g, rh = (h - g) / 2;
            slots.push({ x: 0, y: 0, w: lw, h });
            slots.push({ x: lw + g, y: 0, w: rw, h: rh });
            slots.push({ x: lw + g, y: rh + g, w: rw, h: rh });
          } else if (t === "3r") {
            const rw = (w - g) * 2 / 3, lw = w - rw - g, lh = (h - g) / 2;
            slots.push({ x: 0, y: 0, w: lw, h: lh });
            slots.push({ x: 0, y: lh + g, w: lw, h: lh });
            slots.push({ x: lw + g, y: 0, w: rw, h });
          } else if (t === "5mix") {
            const topH = (h - g) * 2 / 3, botH = h - topH - g;
            const lw = (w - g) * 2 / 3, rw = w - lw - g;
            const rch = (topH - g) / 2, bcw = (w - g) / 2;
            slots.push({ x: 0, y: 0, w: lw, h: topH });
            slots.push({ x: lw + g, y: 0, w: rw, h: rch });
            slots.push({ x: lw + g, y: rch + g, w: rw, h: rch });
            slots.push({ x: 0, y: topH + g, w: bcw, h: botH });
            slots.push({ x: bcw + g, y: topH + g, w: bcw, h: botH });
          } else {
            // 4grid
            const cW = (w - g) / 2, cH = (h - g) / 2;
            slots.push({ x: 0, y: 0, w: cW, h: cH });
            slots.push({ x: cW + g, y: 0, w: cW, h: cH });
            slots.push({ x: 0, y: cH + g, w: cW, h: cH });
            slots.push({ x: cW + g, y: cH + g, w: cW, h: cH });
          }
          return slots;
        };

        const allImgs: HTMLImageElement[] = [];
        let loaded = 0;
        const total = allImageUrls.length;

        const onAllLoaded = () => {
          const slots = getSlots(template, cw, ch, gap);
          const s = Math.min(maxW / cw, maxH / ch, 4);
          const dW = Math.round(cw * s);
          const dH = Math.round(ch * s);

          canvas.width = dW;
          canvas.height = dH;
          ctx.clearRect(0, 0, dW, dH);
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, dW, dH);

          for (let i = 0; i < slots.length && i < allImgs.length; i++) {
            const slot = slots[i];
            const sx = Math.round(slot.x * s);
            const sy = Math.round(slot.y * s);
            const sw = Math.round(slot.w * s);
            const sh = Math.round(slot.h * s);
            const im = allImgs[i];

            ctx.save();
            if (borderRadius > 0) {
              ctx.beginPath();
              ctx.roundRect(sx, sy, sw, sh, borderRadius * s);
              ctx.clip();
            }
            // Cover-fit
            const imgScale = Math.max(sw / im.naturalWidth, sh / im.naturalHeight);
            const drawW = im.naturalWidth * imgScale;
            const drawH = im.naturalHeight * imgScale;
            ctx.drawImage(im, sx + (sw - drawW) / 2, sy + (sh - drawH) / 2, drawW, drawH);
            ctx.restore();
          }
        };

        for (const url of allImageUrls) {
          const im = new Image();
          im.onload = () => { loaded++; if (loaded === total) onAllLoaded(); };
          im.src = url;
          allImgs.push(im);
        }
        return;
      }

      // --- Default base rendering (shared by remaining tools) ---
      const scale = Math.min(maxW / outputW, maxH / outputH, 4);
      const displayW = Math.round(outputW * scale);
      const displayH = Math.round(outputH * scale);

      canvas.width = displayW;
      canvas.height = displayH;
      ctx.clearRect(0, 0, displayW, displayH);

      // --- Blur (use CSS filter before drawing) ---
      if (slug === "blur") {
        const radius = Math.max(1, Math.min(50, (options.radius as number) ?? 5));
        const scaledRadius = radius * scale;
        ctx.filter = `blur(${scaledRadius}px)`;
        ctx.drawImage(img, 0, 0, displayW, displayH);
        ctx.filter = "none";
        return;
      }

      // --- Filters (brightness, contrast, saturation, hue, sepia, invert) ---
      if (slug === "filters") {
        const brightness = (options.brightness as number) ?? 100;
        const contrast = (options.contrast as number) ?? 100;
        const saturation = (options.saturation as number) ?? 100;
        const hueRotate = (options.hueRotate as number) ?? 0;
        const sepia = (options.sepia as number) ?? 0;
        const invert = (options.invert as number) ?? 0;

        ctx.filter = [
          `brightness(${brightness / 100})`,
          `contrast(${contrast / 100})`,
          `saturate(${saturation / 100})`,
          `hue-rotate(${hueRotate}deg)`,
          `sepia(${sepia / 100})`,
          `invert(${invert / 100})`,
        ].join(" ");
        ctx.drawImage(img, 0, 0, displayW, displayH);
        ctx.filter = "none";
        return;
      }

      // --- Pixelate ---
      if (slug === "pixelate") {
        const pixelSize = Math.max(2, Math.min(100, (options.pixelSize as number) ?? 10));
        const smallW = Math.max(1, Math.ceil(displayW / pixelSize));
        const smallH = Math.max(1, Math.ceil(displayH / pixelSize));

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = smallW;
        tempCanvas.height = smallH;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.imageSmoothingEnabled = true;
          tempCtx.drawImage(img, 0, 0, smallW, smallH);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, 0, 0, displayW, displayH);
          ctx.imageSmoothingEnabled = true;
        }
        return;
      }

      // Draw base image for post-processing effects
      ctx.drawImage(img, 0, 0, displayW, displayH);

      // --- Grayscale ---
      if (slug === "grayscale") {
        const mode = (options.mode as string) || "luminance";
        const imageData = ctx.getImageData(0, 0, displayW, displayH);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          let gray: number;
          if (mode === "average") {
            gray = (d[i] + d[i + 1] + d[i + 2]) / 3;
          } else if (mode === "desaturate") {
            gray = (Math.max(d[i], d[i + 1], d[i + 2]) + Math.min(d[i], d[i + 1], d[i + 2])) / 2;
          } else {
            gray = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          }
          d[i] = d[i + 1] = d[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // --- Sepia ---
      if (slug === "sepia") {
        const intensity = Math.max(0, Math.min(100, (options.intensity as number) ?? 100));
        const t = intensity / 100;
        const imageData = ctx.getImageData(0, 0, displayW, displayH);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          const sepiaR = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          const sepiaG = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          const sepiaB = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
          d[i] = Math.round(r + (sepiaR - r) * t);
          d[i + 1] = Math.round(g + (sepiaG - g) * t);
          d[i + 2] = Math.round(b + (sepiaB - b) * t);
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // --- Invert ---
      if (slug === "invert") {
        const strength = Math.max(0, Math.min(100, (options.strength as number) ?? 100));
        const t = strength / 100;
        const imageData = ctx.getImageData(0, 0, displayW, displayH);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = Math.round(d[i] + (255 - 2 * d[i]) * t);
          d[i + 1] = Math.round(d[i + 1] + (255 - 2 * d[i + 1]) * t);
          d[i + 2] = Math.round(d[i + 2] + (255 - 2 * d[i + 2]) * t);
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // --- Vignette ---
      if (slug === "vignette") {
        const intensity = Math.max(0, Math.min(100, (options.intensity as number) ?? 50));
        const radius = Math.max(0, Math.min(100, (options.radius as number) ?? 70));
        const cx = displayW / 2;
        const cy = displayH / 2;
        const maxRadius = Math.sqrt(cx * cx + cy * cy);
        const innerRadius = (radius / 100) * maxRadius;
        const gradient = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, maxRadius);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, `rgba(0, 0, 0, ${intensity / 100})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, displayW, displayH);
      }

      // --- Noise ---
      if (slug === "noise") {
        const amount = Math.max(0, Math.min(100, (options.amount as number) ?? 30));
        const monochrome = (options.monochrome as boolean) ?? false;
        const strength = (amount / 100) * 128;
        const imageData = ctx.getImageData(0, 0, displayW, displayH);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          if (monochrome) {
            const noise = (Math.random() - 0.5) * 2 * strength;
            d[i] = Math.max(0, Math.min(255, d[i] + noise));
            d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + noise));
            d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + noise));
          } else {
            d[i] = Math.max(0, Math.min(255, d[i] + (Math.random() - 0.5) * 2 * strength));
            d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + (Math.random() - 0.5) * 2 * strength));
            d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + (Math.random() - 0.5) * 2 * strength));
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // --- Sharpen ---
      if (slug === "sharpen") {
        const amount = Math.max(0, Math.min(200, (options.amount as number) ?? 50));
        const kRadius = Math.max(1, Math.min(5, (options.radius as number) ?? 1));
        const t = amount / 100;

        const imageData = ctx.getImageData(0, 0, displayW, displayH);
        const src = new Uint8ClampedArray(imageData.data);
        const dst = imageData.data;

        const kernel = kRadius <= 2
          ? [0, -1, 0, -1, 5, -1, 0, -1, 0]
          : [0, 0, -1, 0, 0, 0, -1, -2, -1, 0, -1, -2, 17, -2, -1, 0, -1, -2, -1, 0, 0, 0, -1, 0, 0];
        const kSize = kRadius <= 2 ? 3 : 5;
        const half = Math.floor(kSize / 2);
        const kernelSum = kernel.reduce((a, b) => a + b, 0) || 1;

        for (let y = 0; y < displayH; y++) {
          for (let x = 0; x < displayW; x++) {
            let r = 0, g = 0, b = 0;
            for (let ky = 0; ky < kSize; ky++) {
              for (let kx = 0; kx < kSize; kx++) {
                const px = Math.min(displayW - 1, Math.max(0, x + kx - half));
                const py = Math.min(displayH - 1, Math.max(0, y + ky - half));
                const idx = (py * displayW + px) * 4;
                const kVal = kernel[ky * kSize + kx];
                r += src[idx] * kVal;
                g += src[idx + 1] * kVal;
                b += src[idx + 2] * kVal;
              }
            }
            const idx = (y * displayW + x) * 4;
            r /= kernelSum;
            g /= kernelSum;
            b /= kernelSum;
            dst[idx] = Math.max(0, Math.min(255, Math.round(src[idx] * (1 - t) + r * t)));
            dst[idx + 1] = Math.max(0, Math.min(255, Math.round(src[idx + 1] * (1 - t) + g * t)));
            dst[idx + 2] = Math.max(0, Math.min(255, Math.round(src[idx + 2] * (1 - t) + b * t)));
            dst[idx + 3] = src[idx + 3];
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // --- Color replace ---
      if (slug === "color-replace") {
        const sourceColor = (options.sourceColor as string) ?? "#ff0000";
        const targetColor = (options.targetColor as string) ?? "#0000ff";
        const tolerance = Math.max(0, Math.min(100, (options.tolerance as number) ?? 30));

        const hexToRgb = (hex: string): [number, number, number] => {
          const h = hex.replace("#", "");
          return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
        };
        const [sr, sg, sb] = hexToRgb(sourceColor);
        const [tr, tg, tb] = hexToRgb(targetColor);
        const maxDist = (tolerance / 100) * 441;

        const imageData = ctx.getImageData(0, 0, displayW, displayH);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const dist = Math.sqrt((d[i] - sr) ** 2 + (d[i + 1] - sg) ** 2 + (d[i + 2] - sb) ** 2);
          if (dist <= maxDist) {
            const blend = 1 - dist / Math.max(maxDist, 1);
            d[i] = Math.round(d[i] + (tr - d[i]) * blend);
            d[i + 1] = Math.round(d[i + 1] + (tg - d[i + 1]) * blend);
            d[i + 2] = Math.round(d[i + 2] + (tb - d[i + 2]) * blend);
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // --- Meme ---
      if (slug === "meme") {
        const topText = (options.topText as string) ?? "";
        const bottomText = (options.bottomText as string) ?? "";
        const textColor = (options.textColor as string) ?? "#ffffff";
        const strokeColor = (options.strokeColor as string) ?? "#000000";
        const fontSize = (options.fontSize as number) || Math.round(displayW / 10);

        const drawMemeText = (text: string, baseY: number, fromBottom: boolean) => {
          if (!text) return;
          ctx.font = `bold ${fontSize}px Impact, "Arial Black", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillStyle = textColor;
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = fontSize / 15;
          ctx.lineJoin = "round";

          const maxTextWidth = displayW * 0.9;
          const words = text.toUpperCase().split(" ");
          const lines: string[] = [];
          let currentLine = "";
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (ctx.measureText(testLine).width > maxTextWidth && currentLine) {
              lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) lines.push(currentLine);

          const lineHeight = fontSize * 1.2;
          const startY = fromBottom ? baseY - lines.length * lineHeight : baseY;
          for (let i = 0; i < lines.length; i++) {
            const y = startY + i * lineHeight;
            ctx.strokeText(lines[i], displayW / 2, y);
            ctx.fillText(lines[i], displayW / 2, y);
          }
        };

        drawMemeText(topText, displayH * 0.05, false);
        drawMemeText(bottomText, displayH * 0.95, true);
      }

      // --- Watermark ---
      if (slug === "watermark") {
        const mode = (options.mode as string) ?? "text";
        const opacity = (options.opacity as number) ?? 30;
        const position = (options.position as string) ?? "center";
        const rotation = (options.rotation as number) ?? -30;
        const mosaic = (options.mosaic as boolean) ?? false;

        if (mode === "text") {
          const text = (options.text as string) ?? "";
          const fontFamily = (options.fontFamily as string) ?? "Arial";
          const wmFontSize = (options.fontSize as number) ?? 48;
          const color = (options.color as string) ?? "#ffffff";

          const scaledFontSize = wmFontSize * scale;
          ctx.globalAlpha = opacity / 100;
          ctx.font = `${scaledFontSize}px ${fontFamily}`;
          ctx.fillStyle = color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const textW = ctx.measureText(text).width;
          const textH = scaledFontSize;
          const margin = Math.min(displayW, displayH) * 0.03;

          const drawRotatedText = (x: number, y: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.fillText(text, 0, 0);
            ctx.restore();
          };

          if (mosaic) {
            const spacingX = textW * 1.5;
            const spacingY = textH * 1.5;
            const diagonal = Math.sqrt(displayW * displayW + displayH * displayH);
            for (let ty = -diagonal / 2; ty < displayH + diagonal / 2; ty += spacingY) {
              for (let tx = -diagonal / 2; tx < displayW + diagonal / 2; tx += spacingX) {
                drawRotatedText(tx, ty);
              }
            }
          } else {
            let x: number, y: number;
            if (position.includes("left")) x = margin + textW / 2;
            else if (position.includes("right")) x = displayW - margin - textW / 2;
            else x = displayW / 2;
            if (position.startsWith("top")) y = margin + textH / 2;
            else if (position.startsWith("bottom")) y = displayH - margin - textH / 2;
            else y = displayH / 2;
            drawRotatedText(x, y);
          }
          ctx.globalAlpha = 1.0;
        }

        if (mode === "image") {
          const wmFile = options.watermarkImage as File | null;
          const wmScale = ((options.scale as number) ?? 100) / 100;
          if (wmFile) {
            const wmUrl = URL.createObjectURL(wmFile);
            const wmImg = new Image();
            wmImg.onload = () => {
              const wmW = wmImg.naturalWidth * wmScale * scale;
              const wmH = wmImg.naturalHeight * wmScale * scale;
              const margin = Math.min(displayW, displayH) * 0.03;

              ctx.globalAlpha = opacity / 100;

              const drawRotatedWm = (x: number, y: number) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.drawImage(wmImg, -wmW / 2, -wmH / 2, wmW, wmH);
                ctx.restore();
              };

              if (mosaic) {
                const spacingX = wmW * 1.5;
                const spacingY = wmH * 1.5;
                const diagonal = Math.sqrt(displayW * displayW + displayH * displayH);
                for (let ty = -diagonal / 2; ty < displayH + diagonal / 2; ty += spacingY) {
                  for (let tx = -diagonal / 2; tx < displayW + diagonal / 2; tx += spacingX) {
                    drawRotatedWm(tx, ty);
                  }
                }
              } else {
                let x: number, y: number;
                if (position.includes("left")) x = margin + wmW / 2;
                else if (position.includes("right")) x = displayW - margin - wmW / 2;
                else x = displayW / 2;
                if (position.startsWith("top")) y = margin + wmH / 2;
                else if (position.startsWith("bottom")) y = displayH - margin - wmH / 2;
                else y = displayH / 2;
                drawRotatedWm(x, y);
              }

              ctx.globalAlpha = 1.0;
              URL.revokeObjectURL(wmUrl);
            };
            wmImg.onerror = () => {
              URL.revokeObjectURL(wmUrl);
            };
            wmImg.src = wmUrl;
          }
        }
      }

      // --- Round image ---
      if (slug === "round-image") {
        const borderRadiusPct = (options.borderRadius as number) ?? 50;
        const borderWidth = (options.borderWidth as number) ?? 0;
        const borderColor = (options.borderColor as string) ?? "#ffffff";

        const minDim = Math.min(srcW, srcH);
        const cropX = (srcW - minDim) / 2;
        const cropY = (srcH - minDim) / 2;
        const totalSize = minDim + borderWidth * 2;

        const rScale = Math.min(maxW / totalSize, maxH / totalSize, 4);
        const dSize = Math.round(totalSize * rScale);

        canvas.width = dSize;
        canvas.height = dSize;
        ctx.clearRect(0, 0, dSize, dSize);

        const outerRadius = (borderRadiusPct / 50) * (dSize / 2);
        const imgSize = minDim * rScale;
        const sb = borderWidth * rScale;
        const innerRadius = (borderRadiusPct / 50) * (imgSize / 2);

        if (borderWidth > 0) {
          ctx.beginPath();
          ctx.roundRect(0, 0, dSize, dSize, outerRadius);
          ctx.fillStyle = borderColor;
          ctx.fill();
        }

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(sb, sb, imgSize, imgSize, innerRadius);
        ctx.clip();
        ctx.drawImage(img, cropX, cropY, minDim, minDim, sb, sb, imgSize, imgSize);
        ctx.restore();
      }

      // --- Profile photo ---
      if (slug === "profile-photo") {
        const PLATFORM_SIZES: Record<string, number> = {
          instagram: 320, twitter: 400, linkedin: 400, facebook: 170, youtube: 800,
        };
        const platform = (options.platform as string) ?? "instagram";
        const customSize = (options.customSize as number) ?? 400;
        const targetSize = platform === "custom" ? customSize : (PLATFORM_SIZES[platform] ?? 320);

        const minDim = Math.min(srcW, srcH);
        const cropX = (srcW - minDim) / 2;
        const cropY = (srcH - minDim) / 2;

        // Cap at 1x so actual size differences between platforms are visible
        const pScale = Math.min(maxW / targetSize, maxH / targetSize, 1);
        const dSize = Math.round(targetSize * pScale);

        canvas.width = dSize;
        canvas.height = dSize;
        ctx.clearRect(0, 0, dSize, dSize);

        ctx.beginPath();
        ctx.arc(dSize / 2, dSize / 2, dSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, cropX, cropY, minDim, minDim, 0, 0, dSize, dSize);

        // Show output size label
        ctx.restore();
        ctx.save();
        ctx.font = "bold 12px -apple-system, 'Segoe UI', Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(dSize / 2 - 40, dSize - 22, 80, 20);
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "middle";
        ctx.fillText(`${targetSize}×${targetSize}`, dSize / 2, dSize - 12);
        ctx.restore();
      }

      // --- Split image (grid overlay) ---
      if (slug === "split-image") {
        const rows = (options.rows as number) ?? 2;
        const cols = (options.cols as number) ?? 2;

        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);

        for (let r = 1; r < rows; r++) {
          const y = Math.round((r / rows) * displayH);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(displayW, y);
          ctx.stroke();
        }
        for (let c = 1; c < cols; c++) {
          const x = Math.round((c / cols) * displayW);
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, displayH);
          ctx.stroke();
        }

        // Draw shadow lines for contrast
        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = 1;
        for (let r = 1; r < rows; r++) {
          const y = Math.round((r / rows) * displayH) + 1;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(displayW, y);
          ctx.stroke();
        }
        for (let c = 1; c < cols; c++) {
          const x = Math.round((c / cols) * displayW) + 1;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, displayH);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    };
    img.onerror = () => setLoadError(true);
    img.src = imageUrl;
  }, [imageUrl, allImageUrls, slug, options]);

  // Render on every frame (real-time during drag)
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  if (decoding) {
    return (
      <div
        ref={containerRef}
        className="flex items-center justify-center rounded-lg border border-border bg-[#f5f5f5] dark:bg-[#1a1a1a] p-2 min-h-[200px]"
      >
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-[#f5f5f5] dark:bg-[#1a1a1a] p-8 min-h-[200px]"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground truncate max-w-[280px]">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {getExtension(file.name).toUpperCase()} · {formatFileSize(file.size)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center rounded-lg border border-border bg-[#f5f5f5] dark:bg-[#1a1a1a] p-2 min-h-[200px]"
      style={{
        backgroundImage:
          "conic-gradient(#e0e0e0 25%, transparent 25% 50%, #e0e0e0 50% 75%, transparent 75%)",
        backgroundSize: "16px 16px",
      }}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full rounded"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
