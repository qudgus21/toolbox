"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

interface GeneratePreviewProps {
  slug: string;
  options: Record<string, unknown>;
}

function HtmlPreview({ options }: { options: Record<string, unknown> }) {
  const html = (options.html as string) ?? "";

  const isFullDoc = /^\s*<!DOCTYPE|^\s*<html/i.test(html);

  const srcDoc = useMemo(() => {
    if (isFullDoc) return html;
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box;}</style>
</head><body>${html}</body></html>`;
  }, [html, isFullDoc]);

  return (
    <div
      className="rounded-lg border border-border bg-[#f5f5f5] dark:bg-[#1a1a1a] p-2 min-h-[200px] overflow-hidden"
    >
      <iframe
        srcDoc={srcDoc}
        sandbox="allow-same-origin"
        title="HTML Preview"
        className="w-full rounded border-0"
        style={{ pointerEvents: "none", height: 400 }}
      />
    </div>
  );
}

export function GeneratePreview({ slug, options }: GeneratePreviewProps) {
  if (slug === "html-to-image") {
    return <HtmlPreview options={options} />;
  }
  return <CanvasPreview slug={slug} options={options} />;
}

function CanvasPreview({ slug, options }: GeneratePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const maxW = containerRect.width;
    const maxH = 400;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- Gradient ---
    if (slug === "gradient") {
      const type = (options.type as string) ?? "linear";
      const colors = (options.colors as string[]) ?? ["#ff0000", "#0000ff"];
      const angle = (options.angle as number) ?? 90;
      const origW = (options.width as number) ?? 800;
      const origH = (options.height as number) ?? 600;

      const scale = Math.min(maxW / origW, maxH / origH, 4);
      const displayW = Math.round(origW * scale);
      const displayH = Math.round(origH * scale);

      canvas.width = displayW;
      canvas.height = displayH;
      ctx.clearRect(0, 0, displayW, displayH);

      let gradient: CanvasGradient;
      if (type === "radial") {
        const cx = displayW / 2;
        const cy = displayH / 2;
        const radius = Math.max(displayW, displayH) / 2;
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      } else if (type === "conic") {
        gradient = ctx.createConicGradient((angle * Math.PI) / 180, displayW / 2, displayH / 2);
      } else {
        const rad = (angle * Math.PI) / 180;
        const cx = displayW / 2;
        const cy = displayH / 2;
        const len = Math.max(displayW, displayH);
        gradient = ctx.createLinearGradient(
          cx - Math.cos(rad) * len / 2, cy - Math.sin(rad) * len / 2,
          cx + Math.cos(rad) * len / 2, cy + Math.sin(rad) * len / 2,
        );
      }

      colors.forEach((color, i) => {
        gradient.addColorStop(i / Math.max(colors.length - 1, 1), color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, displayW, displayH);
      return;
    }

    // --- Placeholder ---
    if (slug === "placeholder") {
      const origW = (options.width as number) ?? 800;
      const origH = (options.height as number) ?? 600;
      const bgColor = (options.bgColor as string) ?? "#cccccc";
      const textColor = (options.textColor as string) ?? "#666666";
      const text = (options.text as string) || `${origW} × ${origH}`;

      const scale = Math.min(maxW / origW, maxH / origH, 4);
      const displayW = Math.round(origW * scale);
      const displayH = Math.round(origH * scale);

      canvas.width = displayW;
      canvas.height = displayH;
      ctx.clearRect(0, 0, displayW, displayH);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, displayW, displayH);

      // Cross lines
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(displayW, displayH);
      ctx.moveTo(displayW, 0);
      ctx.lineTo(0, displayH);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Center text
      const fontSize = Math.max(12, Math.min(displayW, displayH) / 8);
      ctx.fillStyle = textColor;
      ctx.font = `bold ${fontSize}px -apple-system, "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, displayW / 2, displayH / 2);

      // Border
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      ctx.strokeRect(1, 1, displayW - 2, displayH - 2);
      ctx.globalAlpha = 1;
      return;
    }

    // --- Pattern ---
    if (slug === "pattern") {
      const type = (options.type as string) ?? "stripes";
      const color1 = (options.color1 as string) ?? "#ffffff";
      const color2 = (options.color2 as string) ?? "#000000";
      const origW = (options.width as number) ?? 800;
      const origH = (options.height as number) ?? 800;
      const spacing = (options.spacing as number) ?? 20;

      const scale = Math.min(maxW / origW, maxH / origH, 4);
      const displayW = Math.round(origW * scale);
      const displayH = Math.round(origH * scale);
      const sSpacing = spacing * scale;

      canvas.width = displayW;
      canvas.height = displayH;
      ctx.clearRect(0, 0, displayW, displayH);

      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, displayW, displayH);

      if (type === "stripes") {
        ctx.fillStyle = color2;
        for (let y = 0; y < displayH; y += sSpacing * 2) {
          ctx.fillRect(0, y, displayW, sSpacing);
        }
      } else if (type === "dots") {
        ctx.fillStyle = color2;
        const radius = sSpacing / 4;
        for (let y = sSpacing / 2; y < displayH; y += sSpacing) {
          for (let x = sSpacing / 2; x < displayW; x += sSpacing) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (type === "checkerboard") {
        ctx.fillStyle = color2;
        for (let y = 0; y < displayH; y += sSpacing) {
          for (let x = 0; x < displayW; x += sSpacing) {
            const col = Math.floor(x / sSpacing);
            const row = Math.floor(y / sSpacing);
            if ((col + row) % 2 === 0) {
              ctx.fillRect(x, y, sSpacing, sSpacing);
            }
          }
        }
      } else if (type === "grid") {
        ctx.strokeStyle = color2;
        ctx.lineWidth = 1;
        for (let x = 0; x <= displayW; x += sSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, displayH);
          ctx.stroke();
        }
        for (let y = 0; y <= displayH; y += sSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(displayW, y);
          ctx.stroke();
        }
      } else if (type === "diagonal") {
        ctx.strokeStyle = color2;
        ctx.lineWidth = sSpacing / 4;
        const maxDim = displayW + displayH;
        for (let i = -maxDim; i < maxDim; i += sSpacing) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + displayH, displayH);
          ctx.stroke();
        }
      }
      return;
    }

    // --- QR Code (simplified visual preview) ---
    if (slug === "qr-code") {
      const size = (options.size as number) ?? 400;
      const fgColor = (options.fgColor as string) ?? "#000000";
      const bgColor = (options.bgColor as string) ?? "#ffffff";
      const text = (options.text as string) ?? "";

      const scale = Math.min(maxW / size, maxH / size, 1);
      const displaySize = Math.round(size * scale);

      canvas.width = displaySize;
      canvas.height = displaySize;
      ctx.clearRect(0, 0, displaySize, displaySize);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, displaySize, displaySize);

      if (!text) {
        // Show placeholder
        ctx.fillStyle = fgColor;
        ctx.globalAlpha = 0.2;
        ctx.font = `${displaySize / 8}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("QR", displaySize / 2, displaySize / 2);
        ctx.globalAlpha = 1;
      } else {
        // Draw a simplified QR-like pattern based on text hash
        const moduleCount = 21; // v1 QR size
        const quiet = 2;
        const totalModules = moduleCount + quiet * 2;
        const moduleSize = displaySize / totalModules;

        // Simple hash-based pattern for visual preview
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
          hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
        }

        ctx.fillStyle = fgColor;

        // Finder patterns (top-left, top-right, bottom-left)
        const drawFinder = (sx: number, sy: number) => {
          for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
              const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
              const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
              if (isOuter || isInner) {
                ctx.fillRect((sx + c + quiet) * moduleSize, (sy + r + quiet) * moduleSize, moduleSize, moduleSize);
              }
            }
          }
        };
        drawFinder(0, 0);
        drawFinder(moduleCount - 7, 0);
        drawFinder(0, moduleCount - 7);

        // Fill data area with hash-based pseudo-random pattern
        const seededRandom = (seed: number) => {
          const x = Math.sin(seed) * 10000;
          return x - Math.floor(x);
        };
        for (let r = 0; r < moduleCount; r++) {
          for (let c = 0; c < moduleCount; c++) {
            // Skip finder pattern areas
            if ((r < 8 && c < 8) || (r < 8 && c >= moduleCount - 8) || (r >= moduleCount - 8 && c < 8)) continue;
            if (seededRandom(hash + r * moduleCount + c) > 0.5) {
              ctx.fillRect((c + quiet) * moduleSize, (r + quiet) * moduleSize, moduleSize, moduleSize);
            }
          }
        }
      }
      return;
    }

    // html-to-image is handled by HtmlPreview component above
  }, [slug, options]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

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
