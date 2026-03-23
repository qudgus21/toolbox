"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

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
  labels: ImageDictionary["toolOptions"]["watermark"];
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

export function WatermarkOptions({ value, onChange, labels }: WatermarkOptionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const POSITIONS: { value: WatermarkPosition; label: string }[] = [
    { value: "top-left", label: labels.tl },
    { value: "top-center", label: labels.tc },
    { value: "top-right", label: labels.tr },
    { value: "center-left", label: labels.cl },
    { value: "center", label: labels.c },
    { value: "center-right", label: labels.cr },
    { value: "bottom-left", label: labels.bl },
    { value: "bottom-center", label: labels.bc },
    { value: "bottom-right", label: labels.br },
  ];

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.mode}
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
            {labels.text}
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
            {labels.image}
          </button>
        </div>
      </div>

      {/* Text mode options */}
      {value.mode === "text" && (
        <>
          {/* Text input */}
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1">
              {labels.text}
            </label>
            <input
              type="text"
              value={value.text}
              onChange={(e) => onChange({ ...value, text: e.target.value })}
              placeholder={labels.enterWatermarkText}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Font family */}
          <div>
            <label className="block text-xs font-medium text-foreground-muted mb-1">
              {labels.fontFamily}
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
                {labels.fontSize}
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
              {labels.color}
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
              {labels.watermarkImage}
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
              {value.watermarkImage ? value.watermarkImage.name : labels.chooseImage}
            </button>
          </div>

          {/* Scale */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-foreground-muted">
                {labels.scale}
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
            {labels.opacity}
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
            {labels.position}
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
            {labels.rotation}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.rotation}&deg;
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
          {labels.mosaic}
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
