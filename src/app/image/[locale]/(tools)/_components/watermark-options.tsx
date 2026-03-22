"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkOptionsValue {
  mode: "text" | "image";
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  opacity: number;
  position: WatermarkPosition;
  rotation: number;
  mosaic: boolean;
  watermarkImage: File | null;
  scale: number;
}

interface WatermarkOptionsProps {
  value: WatermarkOptionsValue;
  onChange: (value: WatermarkOptionsValue) => void;
}

const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Impact",
  "Courier New",
];

const POSITIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "top-left", label: "TL" },
  { value: "top-center", label: "TC" },
  { value: "top-right", label: "TR" },
  { value: "center-left", label: "CL" },
  { value: "center", label: "C" },
  { value: "center-right", label: "CR" },
  { value: "bottom-left", label: "BL" },
  { value: "bottom-center", label: "BC" },
  { value: "bottom-right", label: "BR" },
];

export function WatermarkOptions({ value, onChange }: WatermarkOptionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          Mode
        </label>
        <div className="flex gap-1 rounded-md border border-border p-1">
          <button
            type="button"
            onClick={() => onChange({ ...value, mode: "text" })}
            className={`flex-1 rounded px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              value.mode === "text"
                ? "bg-accent text-accent-foreground"
                : "text-foreground-muted hover:bg-background-subtle"
            }`}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, mode: "image" })}
            className={`flex-1 rounded px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              value.mode === "image"
                ? "bg-accent text-accent-foreground"
                : "text-foreground-muted hover:bg-background-subtle"
            }`}
          >
            Image
          </button>
        </div>
      </div>

      {/* Text mode options */}
      {value.mode === "text" && (
        <>
          {/* Text input */}
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1">
              Text
            </label>
            <input
              type="text"
              value={value.text}
              onChange={(e) => onChange({ ...value, text: e.target.value })}
              placeholder="Enter watermark text..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Font family */}
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1">
              Font Family
            </label>
            <select
              value={value.fontFamily}
              onChange={(e) => onChange({ ...value, fontFamily: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Font size */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-foreground-muted">
                Font Size
              </label>
              <span className="text-sm font-semibold text-foreground">
                {value.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={200}
              step={1}
              value={value.fontSize}
              onChange={(e) => onChange({ ...value, fontSize: Number(e.target.value) })}
              className="w-full accent-accent"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1">
              Color
            </label>
            <input
              type="color"
              value={value.color}
              onChange={(e) => onChange({ ...value, color: e.target.value })}
              className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
            />
          </div>
        </>
      )}

      {/* Image mode options */}
      {value.mode === "image" && (
        <>
          {/* Image upload */}
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1">
              Watermark Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                onChange({ ...value, watermarkImage: f });
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-3 text-sm text-foreground-muted hover:bg-background-subtle transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              {value.watermarkImage ? value.watermarkImage.name : "Choose image..."}
            </button>
          </div>

          {/* Scale */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-foreground-muted">
                Scale
              </label>
              <span className="text-sm font-semibold text-foreground">
                {value.scale}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={200}
              step={1}
              value={value.scale}
              onChange={(e) => onChange({ ...value, scale: Number(e.target.value) })}
              className="w-full accent-accent"
            />
          </div>
        </>
      )}

      {/* Shared options */}

      {/* Opacity */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Opacity
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.opacity}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.opacity}
          onChange={(e) => onChange({ ...value, opacity: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Position grid (3x3) */}
      {!value.mosaic && (
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-2">
            Position
          </label>
          <div className="grid grid-cols-3 gap-1">
            {POSITIONS.map(({ value: pos, label }) => (
              <button
                key={pos}
                type="button"
                onClick={() => onChange({ ...value, position: pos })}
                className={`flex h-8 items-center justify-center rounded text-xs font-medium transition-colors cursor-pointer ${
                  value.position === pos
                    ? "border border-accent bg-accent/10 text-accent"
                    : "border border-border bg-background text-foreground-muted hover:bg-background-subtle"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rotation */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Rotation
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.rotation}°
          </span>
        </div>
        <input
          type="range"
          min={-180}
          max={180}
          step={1}
          value={value.rotation}
          onChange={(e) => onChange({ ...value, rotation: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Mosaic toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-foreground-muted">
          Mosaic (tile)
        </label>
        <button
          type="button"
          onClick={() => onChange({ ...value, mosaic: !value.mosaic })}
          className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
            value.mosaic ? "bg-accent" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
              value.mosaic ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export function getDefaultWatermarkOptions(): WatermarkOptionsValue {
  return {
    mode: "text",
    text: "Watermark",
    fontFamily: "Arial",
    fontSize: 48,
    color: "#ffffff",
    opacity: 30,
    position: "center",
    rotation: -30,
    mosaic: false,
    watermarkImage: null,
    scale: 100,
  };
}
