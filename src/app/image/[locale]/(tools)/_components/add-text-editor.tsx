"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageDictionary } from "@/lib/i18n/image-config";
import type { AddTextOptionsValue, TextItem } from "./add-text-options";
import { AddTextOptions } from "./add-text-options";

interface AddTextEditorProps {
  file: File;
  originalWidth: number;
  originalHeight: number;
  value: AddTextOptionsValue;
  onChange: (value: AddTextOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["addText"];
}

type InteractionMode =
  | { type: "move"; id: string; startMouseX: number; startMouseY: number; startX: number; startY: number }
  | { type: "resize"; id: string; anchor: string; startMouseX: number; startMouseY: number; startX: number; startY: number; startW: number; startH: number }
  | null;

const HANDLE_SIZE = 8;
const MIN_SIZE_PCT = 5;

export function AddTextEditor({
  file,
  originalWidth,
  originalHeight,
  value,
  onChange,
  labels,
}: AddTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [scale, setScale] = useState(1);
  const interactionRef = useRef<InteractionMode>(null);

  // Create object URL
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
      const maxH = 500;
      const fitScale = Math.min(maxW / originalWidth, maxH / originalHeight);
      // Cap upscale at 4x to avoid extreme pixelation on tiny images
      const s = Math.min(fitScale, 4);
      setScale(s);
    };

    observe();
    const ro = new ResizeObserver(observe);
    ro.observe(container);
    return () => ro.disconnect();
  }, [originalWidth, originalHeight]);

  const displayW = originalWidth * scale;
  const displayH = originalHeight * scale;

  const updateItem = useCallback(
    (id: string, patch: Partial<TextItem>) => {
      onChange({
        ...value,
        items: value.items.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      });
    },
    [value, onChange],
  );

  // Start move
  const handleMoveDown = useCallback(
    (e: React.MouseEvent, item: TextItem) => {
      e.preventDefault();
      e.stopPropagation();
      onChange({ ...value, selectedId: item.id });
      interactionRef.current = {
        type: "move",
        id: item.id,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startX: item.x,
        startY: item.y,
      };
    },
    [value, onChange],
  );

  // Start resize
  const handleResizeDown = useCallback(
    (e: React.MouseEvent, item: TextItem, anchor: string) => {
      e.preventDefault();
      e.stopPropagation();
      interactionRef.current = {
        type: "resize",
        id: item.id,
        anchor,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startX: item.x,
        startY: item.y,
        startW: item.w,
        startH: item.h,
      };
    },
    [],
  );

  // Mouse move & up for both move and resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mode = interactionRef.current;
      if (!mode) return;

      const dxPct = ((e.clientX - mode.startMouseX) / displayW) * 100;
      const dyPct = ((e.clientY - mode.startMouseY) / displayH) * 100;

      if (mode.type === "move") {
        updateItem(mode.id, {
          x: Math.max(0, Math.min(100, mode.startX + dxPct)),
          y: Math.max(0, Math.min(100, mode.startY + dyPct)),
        });
      } else if (mode.type === "resize") {
        const { anchor, startX, startY, startW, startH } = mode;
        let newX = startX;
        let newY = startY;
        let newW = startW;
        let newH = startH;

        // Horizontal
        if (anchor.includes("w")) {
          newX = startX + dxPct;
          newW = startW - dxPct;
        } else if (anchor.includes("e")) {
          newW = startW + dxPct;
        }

        // Vertical
        if (anchor.includes("n")) {
          newY = startY + dyPct;
          newH = startH - dyPct;
        } else if (anchor.includes("s")) {
          newH = startH + dyPct;
        }

        // Enforce min size
        if (newW < MIN_SIZE_PCT) {
          if (anchor.includes("w")) newX = startX + startW - MIN_SIZE_PCT;
          newW = MIN_SIZE_PCT;
        }
        if (newH < MIN_SIZE_PCT) {
          if (anchor.includes("n")) newY = startY + startH - MIN_SIZE_PCT;
          newH = MIN_SIZE_PCT;
        }

        updateItem(mode.id, {
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY)),
          w: Math.max(MIN_SIZE_PCT, newW),
          h: Math.max(MIN_SIZE_PCT, newH),
        });
      }
    };

    const handleMouseUp = () => {
      interactionRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [displayW, displayH, updateItem]);

  // Deselect when clicking on empty area
  const handleBackgroundDown = useCallback(
    (e: React.MouseEvent) => {
      // Only deselect if clicking directly on the background
      if (e.target === e.currentTarget) {
        onChange({ ...value, selectedId: null });
      }
    },
    [value, onChange],
  );

  // Anchor definitions
  const anchors = [
    { key: "nw", cursor: "nwse-resize", xFn: (l: number) => l, yFn: (t: number) => t },
    { key: "ne", cursor: "nesw-resize", xFn: (l: number, w: number) => l + w, yFn: (t: number) => t },
    { key: "sw", cursor: "nesw-resize", xFn: (l: number) => l, yFn: (t: number, h: number) => t + h },
    { key: "se", cursor: "nwse-resize", xFn: (l: number, w: number) => l + w, yFn: (t: number, h: number) => t + h },
    { key: "n", cursor: "ns-resize", xFn: (l: number, w: number) => l + w / 2, yFn: (t: number) => t },
    { key: "s", cursor: "ns-resize", xFn: (l: number, w: number) => l + w / 2, yFn: (t: number, h: number) => t + h },
    { key: "w", cursor: "ew-resize", xFn: (l: number) => l, yFn: (t: number, h: number) => t + h / 2 },
    { key: "e", cursor: "ew-resize", xFn: (l: number, w: number) => l + w, yFn: (t: number, h: number) => t + h / 2 },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      {/* Preview area */}
      <div className="flex-1 min-w-0 space-y-2">
        <div
          ref={containerRef}
          className="relative mx-auto overflow-hidden rounded-lg border border-border bg-[#1a1a1a]"
          style={{ width: "100%", maxWidth: displayW }}
        >
          <div
            className="relative select-none"
            style={{ width: displayW, height: displayH }}
            onMouseDown={handleBackgroundDown}
          >
            {/* Base image */}
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Preview"
                draggable={false}
                className="pointer-events-none absolute inset-0"
                style={{ width: displayW, height: displayH }}
              />
            )}

            {/* Text overlays */}
            {value.items.map((item) => {
              const isSelected = item.id === value.selectedId;
              const scaledFontSize = item.fontSize * scale;

              // Box position/size in display pixels
              const boxL = (item.x / 100) * displayW;
              const boxT = (item.y / 100) * displayH;
              const boxW = (item.w / 100) * displayW;
              const boxH = (item.h / 100) * displayH;

              return (
                <div key={item.id}>
                  {/* Text box */}
                  <div
                    className={`absolute overflow-hidden ${
                      isSelected ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                    }`}
                    style={{
                      left: boxL,
                      top: boxT,
                      width: boxW,
                      height: boxH,
                      zIndex: isSelected ? 20 : 10,
                      border: isSelected
                        ? "1.5px dashed var(--color-accent)"
                        : "1.5px dashed transparent",
                    }}
                    onMouseDown={(e) => handleMoveDown(e, item)}
                  >
                    <div
                      className="flex w-full h-full pointer-events-none"
                      style={{
                        fontFamily: item.fontFamily,
                        fontSize: `${scaledFontSize}px`,
                        fontWeight: item.bold ? "bold" : "normal",
                        fontStyle: item.italic ? "italic" : "normal",
                        color: item.color,
                        textAlign: item.alignH ?? "center",
                        textShadow: item.shadow
                          ? `${2 * scale}px ${2 * scale}px ${8 * scale}px rgba(0,0,0,0.5)`
                          : "none",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        lineHeight: 1.3,
                        justifyContent: item.alignH === "left" ? "flex-start" : item.alignH === "right" ? "flex-end" : "center",
                        alignItems: item.alignV === "top" ? "flex-start" : item.alignV === "bottom" ? "flex-end" : "center",
                        backgroundColor: item.bgColor !== "transparent" ? item.bgColor : undefined,
                        borderRadius: item.bgColor !== "transparent" ? `${2 * scale}px` : undefined,
                      }}
                    >
                      <span>{item.text || "\u00A0"}</span>
                    </div>
                  </div>

                  {/* Resize anchors (only when selected) */}
                  {isSelected &&
                    anchors.map((a) => (
                      <div
                        key={a.key}
                        className="absolute z-30 rounded-sm border border-white bg-accent"
                        style={{
                          left: a.xFn(boxL, boxW) - HANDLE_SIZE / 2,
                          top: a.yFn(boxT, boxH) - HANDLE_SIZE / 2,
                          width: HANDLE_SIZE,
                          height: HANDLE_SIZE,
                          cursor: a.cursor,
                        }}
                        onMouseDown={(e) => handleResizeDown(e, item, a.key)}
                      />
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Options panel */}
      <div className="shrink-0 rounded-lg border border-border bg-background p-4 lg:w-80">
        <AddTextOptions value={value} onChange={onChange} labels={labels} />
      </div>
    </div>
  );
}
