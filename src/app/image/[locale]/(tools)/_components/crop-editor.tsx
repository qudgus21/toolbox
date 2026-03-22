"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CropOptionsValue } from "./crop-options";
import { CropOptions, getDefaultCropOptions } from "./crop-options";

interface CropEditorProps {
  file: File;
  originalWidth: number;
  originalHeight: number;
  value: CropOptionsValue;
  onChange: (value: CropOptionsValue) => void;
}

type DragMode =
  | "move"
  | "nw" | "n" | "ne"
  | "w" | "e"
  | "sw" | "s" | "se"
  | null;

const MIN_CROP_SIZE = 10;

export function CropEditor({
  file,
  originalWidth,
  originalHeight,
  value,
  onChange,
}: CropEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [dragMode, setDragMode] = useState<DragMode>(null);
  const dragStartRef = useRef<{ x: number; y: number; crop: CropOptionsValue } | null>(null);

  // Create object URL for the image
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Calculate scale to fit container
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !originalWidth || !originalHeight) return;

    const observe = () => {
      const rect = container.getBoundingClientRect();
      const maxW = rect.width;
      const maxH = 500; // Max preview height
      const s = Math.min(maxW / originalWidth, maxH / originalHeight, 1);
      setScale(s);
    };

    observe();
    const ro = new ResizeObserver(observe);
    ro.observe(container);
    return () => ro.disconnect();
  }, [originalWidth, originalHeight]);

  const displayW = originalWidth * scale;
  const displayH = originalHeight * scale;

  // Convert screen coords to image coords
  const screenToImage = useCallback(
    (sx: number, sy: number) => ({
      x: sx / scale,
      y: sy / scale,
    }),
    [scale],
  );

  const clampCrop = useCallback(
    (crop: CropOptionsValue): CropOptionsValue => {
      let { x, y, width, height, aspectRatio } = crop;
      width = Math.max(MIN_CROP_SIZE, Math.min(width, originalWidth));
      height = Math.max(MIN_CROP_SIZE, Math.min(height, originalHeight));
      x = Math.max(0, Math.min(x, originalWidth - width));
      y = Math.max(0, Math.min(y, originalHeight - height));
      return { x, y, width, height, aspectRatio };
    },
    [originalWidth, originalHeight],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, mode: DragMode) => {
      e.preventDefault();
      e.stopPropagation();
      setDragMode(mode);
      dragStartRef.current = { x: e.clientX, y: e.clientY, crop: { ...value } };
    },
    [value],
  );

  useEffect(() => {
    if (!dragMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;

      const dx = (e.clientX - dragStartRef.current.x) / scale;
      const dy = (e.clientY - dragStartRef.current.y) / scale;
      const start = dragStartRef.current.crop;

      let newCrop: CropOptionsValue;

      if (dragMode === "move") {
        newCrop = clampCrop({
          ...start,
          x: start.x + dx,
          y: start.y + dy,
        });
      } else {
        let newX = start.x;
        let newY = start.y;
        let newW = start.width;
        let newH = start.height;

        // Handle horizontal resizing
        if (dragMode.includes("w")) {
          newX = start.x + dx;
          newW = start.width - dx;
        } else if (dragMode.includes("e")) {
          newW = start.width + dx;
        }

        // Handle vertical resizing
        if (dragMode.startsWith("n")) {
          newY = start.y + dy;
          newH = start.height - dy;
        } else if (dragMode.startsWith("s")) {
          newH = start.height + dy;
        }

        // Enforce aspect ratio
        if (value.aspectRatio) {
          const ar = value.aspectRatio;
          if (dragMode === "n" || dragMode === "s") {
            newW = newH * ar;
          } else if (dragMode === "w" || dragMode === "e") {
            newH = newW / ar;
          } else {
            // Corner — use the larger dimension
            const candidateW = newH * ar;
            const candidateH = newW / ar;
            if (candidateW <= originalWidth) {
              newW = candidateW;
            } else {
              newH = candidateH;
            }
          }
        }

        // Prevent flipping
        if (newW < MIN_CROP_SIZE) {
          newW = MIN_CROP_SIZE;
          if (dragMode.includes("w")) newX = start.x + start.width - MIN_CROP_SIZE;
        }
        if (newH < MIN_CROP_SIZE) {
          newH = MIN_CROP_SIZE;
          if (dragMode.startsWith("n")) newY = start.y + start.height - MIN_CROP_SIZE;
        }

        newCrop = clampCrop({
          x: newX,
          y: newY,
          width: newW,
          height: newH,
          aspectRatio: value.aspectRatio,
        });
      }

      onChange(newCrop);
    };

    const handleMouseUp = () => {
      setDragMode(null);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragMode, scale, value.aspectRatio, onChange, clampCrop, originalWidth, originalHeight]);

  // Handle positions in display coordinates
  const cropLeft = value.x * scale;
  const cropTop = value.y * scale;
  const cropW = value.width * scale;
  const cropH = value.height * scale;

  const handleSize = 10;
  const halfHandle = handleSize / 2;

  // 8 handle positions
  const handles: { mode: DragMode; left: number; top: number; cursor: string }[] = [
    { mode: "nw", left: cropLeft - halfHandle, top: cropTop - halfHandle, cursor: "nwse-resize" },
    { mode: "n", left: cropLeft + cropW / 2 - halfHandle, top: cropTop - halfHandle, cursor: "ns-resize" },
    { mode: "ne", left: cropLeft + cropW - halfHandle, top: cropTop - halfHandle, cursor: "nesw-resize" },
    { mode: "w", left: cropLeft - halfHandle, top: cropTop + cropH / 2 - halfHandle, cursor: "ew-resize" },
    { mode: "e", left: cropLeft + cropW - halfHandle, top: cropTop + cropH / 2 - halfHandle, cursor: "ew-resize" },
    { mode: "sw", left: cropLeft - halfHandle, top: cropTop + cropH - halfHandle, cursor: "nesw-resize" },
    { mode: "s", left: cropLeft + cropW / 2 - halfHandle, top: cropTop + cropH - halfHandle, cursor: "ns-resize" },
    { mode: "se", left: cropLeft + cropW - halfHandle, top: cropTop + cropH - halfHandle, cursor: "nwse-resize" },
  ];

  return (
    <div className="space-y-4">
      {/* Crop options (aspect ratio presets + inputs) */}
      <CropOptions
        value={value}
        onChange={onChange}
        originalWidth={originalWidth}
        originalHeight={originalHeight}
      />

      {/* Interactive crop area */}
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden rounded-lg border border-border bg-[#1a1a1a]"
        style={{ width: "100%", maxWidth: displayW }}
      >
        <div
          className="relative"
          style={{ width: displayW, height: displayH }}
        >
          {/* Base image (dimmed) */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Crop preview"
              draggable={false}
              className="pointer-events-none absolute inset-0 select-none opacity-40"
              style={{ width: displayW, height: displayH }}
            />
          )}

          {/* Bright crop region (clipped image) */}
          {imageUrl && (
            <div
              className="absolute overflow-hidden"
              style={{
                left: cropLeft,
                top: cropTop,
                width: cropW,
                height: cropH,
              }}
            >
              <img
                src={imageUrl}
                alt=""
                draggable={false}
                className="pointer-events-none absolute select-none"
                style={{
                  width: displayW,
                  height: displayH,
                  left: -cropLeft,
                  top: -cropTop,
                }}
              />
            </div>
          )}

          {/* Crop border */}
          <div
            className="absolute border-2 border-white/80"
            style={{
              left: cropLeft,
              top: cropTop,
              width: cropW,
              height: cropH,
              cursor: dragMode === "move" ? "grabbing" : "grab",
            }}
            onMouseDown={(e) => handleMouseDown(e, "move")}
          >
            {/* Rule of thirds lines */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/3 top-0 h-full w-px bg-white/30" />
              <div className="absolute left-2/3 top-0 h-full w-px bg-white/30" />
              <div className="absolute left-0 top-1/3 h-px w-full bg-white/30" />
              <div className="absolute left-0 top-2/3 h-px w-full bg-white/30" />
            </div>
          </div>

          {/* Drag handles */}
          {handles.map((h) => (
            <div
              key={h.mode}
              className="absolute z-10 rounded-sm border border-white bg-accent"
              style={{
                left: h.left,
                top: h.top,
                width: handleSize,
                height: handleSize,
                cursor: h.cursor,
              }}
              onMouseDown={(e) => handleMouseDown(e, h.mode)}
            />
          ))}
        </div>
      </div>

      {/* Crop size indicator */}
      <p className="text-center text-xs text-foreground-muted">
        {Math.round(value.width)} &times; {Math.round(value.height)} px
      </p>
    </div>
  );
}

export { getDefaultCropOptions } from "./crop-options";
