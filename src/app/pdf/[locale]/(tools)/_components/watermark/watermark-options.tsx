"use client";

import { useCallback, useRef, useState } from "react";
import {
  Type,
  ImageIcon,
  Upload,
  Layers,
  RotateCw,
  Grid3X3,
} from "lucide-react";
import type {
  WatermarkOptions,
  WatermarkMode,
  WatermarkPosition,
  WatermarkFont,
  WatermarkRotation,
  WatermarkLayer,
} from "@/lib/pdf/processors/watermark-types";

export interface WatermarkLabels {
  tabText: string;
  tabImage: string;
  textLabel: string;
  textPlaceholder: string;
  fontLabel: string;
  fontSizeLabel: string;
  colorLabel: string;
  shadowLabel: string;
  uploadImage: string;
  changeImage: string;
  scaleLabel: string;
  mosaicLabel: string;
  mosaicDesc: string;
  opacityLabel: string;
  positionLabel: string;
  rotationLabel: string;
  layerLabel: string;
  layerOver: string;
  layerOverDesc: string;
  layerBelow: string;
  layerBelowDesc: string;
  offsetLabel: string;
  pageRangeLabel: string;
  rangeAll: string;
  rangeCustom: string;
  rangePlaceholder: string;
  topLeft: string;
  topCenter: string;
  topRight: string;
  centerLeft: string;
  center: string;
  centerRight: string;
  bottomLeft: string;
  bottomCenter: string;
  bottomRight: string;
  applyButton: string;
  changeFile: string;
  ptUnit: string;
  mmUnit: string;
  degUnit: string;
}

interface WatermarkOptionsProps {
  options: WatermarkOptions;
  onChange: (options: WatermarkOptions) => void;
  labels: WatermarkLabels;
}

const POSITIONS: {
  key: WatermarkPosition;
  row: "top" | "center" | "bottom";
  col: "left" | "center" | "right";
}[] = [
  { key: "top-left", row: "top", col: "left" },
  { key: "top-center", row: "top", col: "center" },
  { key: "top-right", row: "top", col: "right" },
  { key: "center-left", row: "center", col: "left" },
  { key: "center", row: "center", col: "center" },
  { key: "center-right", row: "center", col: "right" },
  { key: "bottom-left", row: "bottom", col: "left" },
  { key: "bottom-center", row: "bottom", col: "center" },
  { key: "bottom-right", row: "bottom", col: "right" },
];

const FONTS: { key: WatermarkFont; label: string }[] = [
  { key: "Helvetica", label: "Helvetica" },
  { key: "HelveticaBold", label: "Helvetica Bold" },
  { key: "TimesRoman", label: "Times New Roman" },
  { key: "TimesRomanBold", label: "Times New Roman Bold" },
  { key: "Courier", label: "Courier" },
  { key: "CourierBold", label: "Courier Bold" },
  { key: "Georgia", label: "Georgia" },
  { key: "Verdana", label: "Verdana" },
];

const ROTATIONS: { value: WatermarkRotation; label: string }[] = [
  { value: 0, label: "0°" },
  { value: 45, label: "45°" },
  { value: -45, label: "-45°" },
  { value: 90, label: "90°" },
  { value: 180, label: "180°" },
];

const OPACITY_PRESETS = [0.25, 0.5, 0.75, 1.0];

export function WatermarkOptions({
  options,
  onChange,
  labels,
}: WatermarkOptionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = useCallback(
    (patch: Partial<WatermarkOptions>) => {
      onChange({ ...options, ...patch });
    },
    [options, onChange],
  );

  const setText = useCallback(
    (patch: Partial<WatermarkOptions["text"]>) => {
      onChange({ ...options, text: { ...options.text, ...patch } });
    },
    [options, onChange],
  );

  const setImage = useCallback(
    (patch: Partial<WatermarkOptions["image"]>) => {
      onChange({ ...options, image: { ...options.image, ...patch } });
    },
    [options, onChange],
  );

  // local state + onBlur 커밋
  const [fontSizeInput, setFontSizeInput] = useState(String(options.text.fontSize));
  const [scaleInput, setScaleInput] = useState(String(Math.round(options.image.scale * 100)));
  const [offsetXInput, setOffsetXInput] = useState(String(options.offsetX));
  const [offsetYInput, setOffsetYInput] = useState(String(options.offsetY));

  const currentOpacity = options.mode === "text" ? options.text.opacity : options.image.opacity;

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setImage({
          imageFile: file,
          imageDataUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
      // reset input so same file can be re-selected
      e.target.value = "";
    },
    [setImage],
  );

  const positionLabelMap: Record<WatermarkPosition, string> = {
    "top-left": labels.topLeft,
    "top-center": labels.topCenter,
    "top-right": labels.topRight,
    "center-left": labels.centerLeft,
    center: labels.center,
    "center-right": labels.centerRight,
    "bottom-left": labels.bottomLeft,
    "bottom-center": labels.bottomCenter,
    "bottom-right": labels.bottomRight,
  };

  return (
    <div className="space-y-3.5">
      {/* ─── 모드 탭 ─── */}
      <div className="grid grid-cols-2 gap-1.5 rounded-lg bg-background-muted p-1">
        {(["text", "image"] as WatermarkMode[]).map((mode) => {
          const Icon = mode === "text" ? Type : ImageIcon;
          const label = mode === "text" ? labels.tabText : labels.tabImage;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => set({ mode })}
              className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                options.mode === mode
                  ? "bg-background shadow-sm text-foreground"
                  : "text-foreground-subtle hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="border-t border-border" />

      {/* ─── 텍스트 모드 옵션 ─── */}
      {options.mode === "text" && (
        <div className="space-y-2.5">
          {/* 텍스트 입력 */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">{labels.textLabel}</label>
            <input
              type="text"
              value={options.text.text}
              onChange={(e) => setText({ text: e.target.value })}
              placeholder={labels.textPlaceholder}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm placeholder:text-foreground-subtle/50"
            />
          </div>

          {/* 폰트 */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">{labels.fontLabel}</label>
            <select
              value={options.text.font}
              onChange={(e) => setText({ font: e.target.value as WatermarkFont })}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm cursor-pointer"
            >
              {FONTS.map((f) => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* 크기 + 색상 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground-subtle">{labels.fontSizeLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min={8}
                  max={200}
                  step={1}
                  value={fontSizeInput}
                  onChange={(e) => {
                    setFontSizeInput(e.target.value);
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 8 && v <= 200) setText({ fontSize: v });
                  }}
                  onBlur={() => {
                    const v = parseInt(fontSizeInput, 10);
                    if (!isNaN(v)) {
                      const clamped = Math.max(8, Math.min(200, v));
                      setText({ fontSize: clamped });
                      setFontSizeInput(String(clamped));
                    } else {
                      setFontSizeInput(String(options.text.fontSize));
                    }
                  }}
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 pr-7 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-foreground-subtle">
                  {labels.ptUnit}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground-subtle">{labels.colorLabel}</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={options.text.color}
                  onChange={(e) => setText({ color: e.target.value })}
                  className="h-8 w-8 shrink-0 rounded-md border border-border cursor-pointer bg-background p-0.5"
                />
                <input
                  type="text"
                  value={options.text.color}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      setText({ color: e.target.value });
                    }
                  }}
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm font-mono"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* 그림자 토글 */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.text.shadow}
              onChange={(e) => setText({ shadow: e.target.checked })}
              className="h-3.5 w-3.5 accent-accent cursor-pointer"
            />
            <span className="text-sm text-foreground">{labels.shadowLabel}</span>
          </label>
        </div>
      )}

      {/* ─── 이미지 모드 옵션 ─── */}
      {options.mode === "image" && (
        <div className="space-y-2.5">
          {/* 이미지 업로드 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleImageUpload}
            className="hidden"
          />

          {options.image.imageDataUrl ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center rounded-lg border border-border bg-background-muted p-3">
                <img
                  src={options.image.imageDataUrl}
                  alt="watermark"
                  className="max-h-24 max-w-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground-subtle hover:bg-background-muted transition-colors cursor-pointer"
              >
                {labels.changeImage}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background-muted px-4 py-6 text-sm text-foreground-subtle hover:border-accent/50 transition-colors cursor-pointer"
            >
              <Upload className="h-5 w-5" />
              {labels.uploadImage}
            </button>
          )}

          {/* 크기 조절 */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">{labels.scaleLabel}</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={Math.round(options.image.scale * 100)}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setImage({ scale: v / 100 });
                  setScaleInput(String(v));
                }}
                className="flex-1 accent-accent cursor-pointer"
              />
              <div className="relative w-16">
                <input
                  type="number"
                  min={10}
                  max={200}
                  step={5}
                  value={scaleInput}
                  onChange={(e) => {
                    setScaleInput(e.target.value);
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 10 && v <= 200) setImage({ scale: v / 100 });
                  }}
                  onBlur={() => {
                    const v = parseInt(scaleInput, 10);
                    if (!isNaN(v)) {
                      const clamped = Math.max(10, Math.min(200, v));
                      setImage({ scale: clamped / 100 });
                      setScaleInput(String(clamped));
                    } else {
                      setScaleInput(String(Math.round(options.image.scale * 100)));
                    }
                  }}
                  className="w-full rounded-md border border-border bg-background px-2 py-1 pr-5 text-sm text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-foreground-subtle">%</span>
              </div>
            </div>
          </div>

          {/* 모자이크(타일) 토글 */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.image.mosaic}
              onChange={(e) => setImage({ mosaic: e.target.checked })}
              className="mt-0.5 h-3.5 w-3.5 accent-accent cursor-pointer"
            />
            <div>
              <span className="text-sm text-foreground">{labels.mosaicLabel}</span>
              <p className="text-[11px] text-foreground-muted">{labels.mosaicDesc}</p>
            </div>
          </label>
        </div>
      )}

      <div className="border-t border-border" />

      {/* ─── 공통: 투명도 ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.opacityLabel}</p>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(currentOpacity * 100)}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10) / 100;
            if (options.mode === "text") setText({ opacity: v });
            else setImage({ opacity: v });
          }}
          className="w-full accent-accent cursor-pointer"
        />
        <div className="flex gap-1">
          {OPACITY_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                if (options.mode === "text") setText({ opacity: preset });
                else setImage({ opacity: preset });
              }}
              className={`flex-1 rounded-md border px-1 py-1 text-xs font-medium transition-all cursor-pointer ${
                Math.abs(currentOpacity - preset) < 0.01
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border text-foreground-subtle hover:border-foreground-subtle/30"
              }`}
            >
              {Math.round(preset * 100)}%
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ─── 공통: 위치 (3x3 그리드) ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.positionLabel}</p>
        <div className="flex justify-center">
          <div className="relative w-[120px] h-[150px] rounded-lg border-2 border-border bg-background-muted">
            {POSITIONS.map((pos) => {
              const isSelected = options.position === pos.key;
              const topClass =
                pos.row === "top"
                  ? "top-2"
                  : pos.row === "center"
                    ? "top-1/2 -translate-y-1/2"
                    : "bottom-2";
              const leftClass =
                pos.col === "left"
                  ? "left-2"
                  : pos.col === "center"
                    ? "left-1/2 -translate-x-1/2"
                    : "right-2";

              return (
                <button
                  key={pos.key}
                  type="button"
                  onClick={() => set({ position: pos.key })}
                  title={positionLabelMap[pos.key]}
                  className={`absolute ${topClass} ${leftClass} w-5 h-5 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "border-accent bg-accent text-white scale-110"
                      : "border-foreground-subtle/30 bg-background hover:border-accent/50 hover:scale-105"
                  }`}
                >
                  <span className="text-[7px] font-bold">
                    {isSelected ? "●" : "○"}
                  </span>
                </button>
              );
            })}
            {/* 페이지 라인 데코레이션 */}
            <div className="absolute inset-x-5 top-10 bottom-10 space-y-1.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full bg-foreground-subtle/10"
                  style={{ width: `${65 + (i % 3) * 12}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 미세 조정 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">X {labels.offsetLabel}</label>
            <div className="relative">
              <input
                type="number"
                value={offsetXInput}
                onChange={(e) => {
                  setOffsetXInput(e.target.value);
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v) && v >= -100 && v <= 100) set({ offsetX: v });
                }}
                onBlur={() => {
                  const v = parseFloat(offsetXInput);
                  if (!isNaN(v)) {
                    const clamped = Math.max(-100, Math.min(100, v));
                    set({ offsetX: clamped });
                    setOffsetXInput(String(clamped));
                  } else {
                    setOffsetXInput(String(options.offsetX));
                  }
                }}
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 pr-8 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-foreground-subtle">
                {labels.mmUnit}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">Y {labels.offsetLabel}</label>
            <div className="relative">
              <input
                type="number"
                value={offsetYInput}
                onChange={(e) => {
                  setOffsetYInput(e.target.value);
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v) && v >= -100 && v <= 100) set({ offsetY: v });
                }}
                onBlur={() => {
                  const v = parseFloat(offsetYInput);
                  if (!isNaN(v)) {
                    const clamped = Math.max(-100, Math.min(100, v));
                    set({ offsetY: clamped });
                    setOffsetYInput(String(clamped));
                  } else {
                    setOffsetYInput(String(options.offsetY));
                  }
                }}
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 pr-8 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-foreground-subtle">
                {labels.mmUnit}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ─── 공통: 회전 ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.rotationLabel}</p>
        <div className="flex gap-1.5">
          {ROTATIONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => set({ rotation: r.value })}
              className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                options.rotation === r.value
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border text-foreground-subtle hover:border-foreground-subtle/30"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ─── 공통: 레이어 ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.layerLabel}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {(["over", "below"] as WatermarkLayer[]).map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => set({ layer })}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all cursor-pointer ${
                options.layer === layer
                  ? "border-accent bg-accent-muted"
                  : "border-border hover:border-foreground-subtle/30"
              }`}
            >
              <Layers className={`h-4 w-4 ${
                options.layer === layer ? "text-accent" : "text-foreground-subtle"
              }`} />
              <span className="text-[11px] font-medium text-foreground leading-tight">
                {layer === "over" ? labels.layerOver : labels.layerBelow}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ─── 공통: 페이지 범위 ─── */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.pageRangeLabel}</p>
        <div className="flex items-center gap-3">
          {(["all", "custom"] as const).map((mode) => (
            <label key={mode} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="watermark-page-range"
                checked={options.pageRange === mode}
                onChange={() => set({ pageRange: mode })}
                className="h-3.5 w-3.5 accent-accent cursor-pointer"
              />
              <span className="text-sm text-foreground">
                {mode === "all" ? labels.rangeAll : labels.rangeCustom}
              </span>
            </label>
          ))}
        </div>

        {options.pageRange === "custom" && (
          <input
            type="text"
            value={options.customRange}
            onChange={(e) => set({ customRange: e.target.value })}
            placeholder={labels.rangePlaceholder}
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm placeholder:text-foreground-subtle/50"
          />
        )}
      </div>
    </div>
  );
}
