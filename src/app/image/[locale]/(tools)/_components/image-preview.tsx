"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ImagePreviewProps {
  file: File;
  slug: string;
  options: Record<string, unknown>;
}

export function ImagePreview({ file, slug, options }: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const renderTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Create object URL
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !imageUrl) return;

    const img = new Image();
    img.onload = () => {
      const containerRect = container.getBoundingClientRect();
      const maxW = containerRect.width;
      const maxH = 500;

      let outputW = img.naturalWidth;
      let outputH = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Apply tool-specific transformations
      if (slug === "resize") {
        const tW = (options.width as number) || img.naturalWidth;
        const tH = (options.height as number) || img.naturalHeight;
        outputW = tW;
        outputH = tH;
      } else if (slug === "rotate") {
        const angle = ((options.angle as number) || 0) * (Math.PI / 180);
        const bgColor = (options.backgroundColor as string) || "transparent";
        const absAngle = Math.abs(angle);

        outputW = Math.round(
          img.naturalWidth * Math.abs(Math.cos(absAngle)) +
          img.naturalHeight * Math.abs(Math.sin(absAngle))
        );
        outputH = Math.round(
          img.naturalWidth * Math.abs(Math.sin(absAngle)) +
          img.naturalHeight * Math.abs(Math.cos(absAngle))
        );

        // Scale to fit display
        const scale = Math.min(maxW / outputW, maxH / outputH, 1);
        const displayW = Math.round(outputW * scale);
        const displayH = Math.round(outputH * scale);

        canvas.width = displayW;
        canvas.height = displayH;

        ctx.clearRect(0, 0, displayW, displayH);
        if (bgColor !== "transparent") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, displayW, displayH);
        }

        ctx.save();
        ctx.translate(displayW / 2, displayH / 2);
        ctx.rotate(angle);
        const imgScale = Math.min(
          (displayW / outputW) * (outputW / img.naturalWidth),
          (displayH / outputH) * (outputH / img.naturalHeight),
          scale
        );
        ctx.drawImage(
          img,
          (-img.naturalWidth * imgScale) / 2,
          (-img.naturalHeight * imgScale) / 2,
          img.naturalWidth * imgScale,
          img.naturalHeight * imgScale,
        );
        ctx.restore();
        return;
      } else if (slug === "flip") {
        const flipH = (options.horizontal as boolean) || false;
        const flipV = (options.vertical as boolean) || false;

        const scale = Math.min(maxW / outputW, maxH / outputH, 1);
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

      // Default rendering (resize, compress, convert, etc.)
      const scale = Math.min(maxW / outputW, maxH / outputH, 1);
      const displayW = Math.round(outputW * scale);
      const displayH = Math.round(outputH * scale);

      canvas.width = displayW;
      canvas.height = displayH;

      ctx.clearRect(0, 0, displayW, displayH);
      ctx.drawImage(img, 0, 0, displayW, displayH);
    };
    img.src = imageUrl;
  }, [imageUrl, slug, options]);

  // Debounced rendering
  useEffect(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }
    renderTimeoutRef.current = setTimeout(render, 150);
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
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
