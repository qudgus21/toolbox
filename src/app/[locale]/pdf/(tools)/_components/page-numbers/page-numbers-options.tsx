"use client";

import { useCallback, useState } from "react";
import {
  FileText,
  BookOpen,
  BookMarked,
} from "lucide-react";
import type {
  PageNumberOptions,
  PageNumberPosition,
  PageNumberFormat,
  PageNumberFont,
  FacingPageMode,
} from "./page-numbers-types";

export interface PageNumbersLabels {
  positionLabel: string;
  formatLabel: string;
  fontLabel: string;
  fontSizeLabel: string;
  colorLabel: string;
  marginLabel: string;
  pageRangeLabel: string;
  startNumberLabel: string;
  skipFirstLabel: string;
  facingModeLabel: string;
  applyButton: string;
  changeFile: string;
  topLeft: string;
  topCenter: string;
  topRight: string;
  bottomLeft: string;
  bottomCenter: string;
  bottomRight: string;
  formatNumber: string;
  formatNumberTotal: string;
  formatPageN: string;
  formatPageNOf: string;
  formatCustom: string;
  customTemplatePlaceholder: string;
  customTemplateHint: string;
  rangeAll: string;
  rangeCustom: string;
  rangePlaceholder: string;
  modeSingle: string;
  modeSingleDesc: string;
  modeFacing: string;
  modeFacingDesc: string;
  modeFacingCover: string;
  modeFacingCoverDesc: string;
  marginUnit: string;
  ptUnit: string;
  pages: string;
}

interface PageNumbersOptionsProps {
  options: PageNumberOptions;
  onChange: (options: PageNumberOptions) => void;
  labels: PageNumbersLabels;
}

const POSITIONS: { key: PageNumberPosition; row: "top" | "bottom"; col: "left" | "center" | "right" }[] = [
  { key: "top-left", row: "top", col: "left" },
  { key: "top-center", row: "top", col: "center" },
  { key: "top-right", row: "top", col: "right" },
  { key: "bottom-left", row: "bottom", col: "left" },
  { key: "bottom-center", row: "bottom", col: "center" },
  { key: "bottom-right", row: "bottom", col: "right" },
];

const FORMATS: { key: PageNumberFormat; labelKey: keyof PageNumbersLabels }[] = [
  { key: "{n}", labelKey: "formatNumber" },
  { key: "{n}/{total}", labelKey: "formatNumberTotal" },
  { key: "page-n", labelKey: "formatPageN" },
  { key: "page-n-of", labelKey: "formatPageNOf" },
  { key: "custom", labelKey: "formatCustom" },
];

const FONTS: { key: PageNumberFont; label: string }[] = [
  { key: "Helvetica", label: "Helvetica" },
  { key: "HelveticaBold", label: "Helvetica Bold" },
  { key: "TimesRoman", label: "Times New Roman" },
  { key: "TimesRomanBold", label: "Times New Roman Bold" },
  { key: "Courier", label: "Courier" },
  { key: "CourierBold", label: "Courier Bold" },
  { key: "Georgia", label: "Georgia" },
  { key: "Verdana", label: "Verdana" },
];

const FACING_MODES: {
  key: FacingPageMode;
  labelKey: keyof PageNumbersLabels;
  Icon: typeof FileText;
}[] = [
  { key: "single", labelKey: "modeSingle", Icon: FileText },
  { key: "facing", labelKey: "modeFacing", Icon: BookOpen },
  { key: "facing-cover", labelKey: "modeFacingCover", Icon: BookMarked },
];

export function PageNumbersOptions({
  options,
  onChange,
  labels,
}: PageNumbersOptionsProps) {
  const set = useCallback(
    <K extends keyof PageNumberOptions>(key: K, value: PageNumberOptions[K]) => {
      onChange({ ...options, [key]: value });
    },
    [options, onChange],
  );

  // number input 중간값 허용을 위한 로컬 state + onBlur 커밋 패턴
  const [fontSizeInput, setFontSizeInput] = useState(String(options.fontSize));
  const [startNumInput, setStartNumInput] = useState(String(options.startNumber));
  const [skipInput, setSkipInput] = useState(String(options.skipFirstN));
  const [marginInput, setMarginInput] = useState(String(options.marginMm));

  const commitNumber = useCallback(
    (raw: string, key: keyof PageNumberOptions, min: number, max: number, setter: (v: string) => void, isFloat = false) => {
      const v = isFloat ? parseFloat(raw) : parseInt(raw, 10);
      if (!isNaN(v)) {
        const clamped = Math.max(min, Math.min(max, v));
        set(key, clamped as never);
        setter(String(clamped));
      } else {
        setter(String(options[key]));
      }
    },
    [set, options],
  );

  const positionLabelMap: Record<PageNumberPosition, string> = {
    "top-left": labels.topLeft,
    "top-center": labels.topCenter,
    "top-right": labels.topRight,
    "bottom-left": labels.bottomLeft,
    "bottom-center": labels.bottomCenter,
    "bottom-right": labels.bottomRight,
  };

  return (
    <div className="space-y-3.5">
      {/* ─── 위치 선택 ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.positionLabel}</p>
        <div className="flex justify-center">
          <div className="relative w-[120px] h-[150px] rounded-lg border-2 border-border bg-background-muted">
            {POSITIONS.map((pos) => {
              const isSelected = options.position === pos.key;
              const top = pos.row === "top" ? "top-2" : "bottom-2";
              const left =
                pos.col === "left"
                  ? "left-2"
                  : pos.col === "center"
                    ? "left-1/2 -translate-x-1/2"
                    : "right-2";

              return (
                <button
                  key={pos.key}
                  type="button"
                  onClick={() => set("position", pos.key)}
                  title={positionLabelMap[pos.key]}
                  className={`absolute ${top} ${left} w-5 h-5 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
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
      </div>

      <div className="border-t border-border" />

      {/* ─── 번호 형식 ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.formatLabel}</p>
        <div className="space-y-1">
          {FORMATS.map((fmt) => (
            <label key={fmt.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="page-number-format"
                checked={options.format === fmt.key}
                onChange={() => set("format", fmt.key)}
                className="h-3.5 w-3.5 accent-accent cursor-pointer"
              />
              <span className="text-sm text-foreground">
                {labels[fmt.labelKey]}
              </span>
            </label>
          ))}
        </div>

        {options.format === "custom" && (
          <div className="space-y-1 pl-5">
            <input
              type="text"
              value={options.customTemplate}
              onChange={(e) => set("customTemplate", e.target.value)}
              placeholder={labels.customTemplatePlaceholder}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm placeholder:text-foreground-subtle/50"
            />
            <p className="text-[11px] text-foreground-muted">{labels.customTemplateHint}</p>
          </div>
        )}
      </div>

      <div className="border-t border-border" />

      {/* ─── 스타일: 폰트, 크기, 색상, 여백 ─── */}
      <div className="space-y-2.5">
        {/* 폰트 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground-subtle">{labels.fontLabel}</label>
          <select
            value={options.font}
            onChange={(e) => set("font", e.target.value as PageNumberFont)}
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
                max={72}
                step={1}
                value={fontSizeInput}
                onChange={(e) => {
                  setFontSizeInput(e.target.value);
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v) && v >= 8 && v <= 72) set("fontSize", v);
                }}
                onBlur={() => commitNumber(fontSizeInput, "fontSize", 8, 72, setFontSizeInput)}
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
                value={options.color}
                onChange={(e) => set("color", e.target.value)}
                className="h-8 w-8 shrink-0 rounded-md border border-border cursor-pointer bg-background p-0.5"
              />
              <input
                type="text"
                value={options.color}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    set("color", e.target.value);
                  }
                }}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm font-mono"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        {/* 여백 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground-subtle">{labels.marginLabel}</label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={marginInput}
              onChange={(e) => {
                setMarginInput(e.target.value);
                const v = parseFloat(e.target.value);
                if (!isNaN(v) && v >= 0 && v <= 100) set("marginMm", v);
              }}
              onBlur={() => commitNumber(marginInput, "marginMm", 0, 100, setMarginInput, true)}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 pr-9 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-foreground-subtle">
              {labels.marginUnit}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ─── 적용 범위 + 시작/건너뛰기 ─── */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.pageRangeLabel}</p>
        <div className="flex items-center gap-3">
          {(["all", "custom"] as const).map((mode) => (
            <label key={mode} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="page-range"
                checked={options.pageRange === mode}
                onChange={() => set("pageRange", mode)}
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
            onChange={(e) => set("customRange", e.target.value)}
            placeholder={labels.rangePlaceholder}
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm placeholder:text-foreground-subtle/50"
          />
        )}

        {/* 시작 번호, 건너뛰기 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">{labels.startNumberLabel}</label>
            <input
              type="number"
              min={1}
              step={1}
              value={startNumInput}
              onChange={(e) => {
                setStartNumInput(e.target.value);
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 1) set("startNumber", v);
              }}
              onBlur={() => commitNumber(startNumInput, "startNumber", 1, 9999, setStartNumInput)}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">{labels.skipFirstLabel}</label>
            <input
              type="number"
              min={0}
              step={1}
              value={skipInput}
              onChange={(e) => {
                setSkipInput(e.target.value);
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 0) set("skipFirstN", v);
              }}
              onBlur={() => commitNumber(skipInput, "skipFirstN", 0, 9999, setSkipInput)}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* ─── 마주보기 모드 (컴팩트) ─── */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.facingModeLabel}</p>
        <div className="grid grid-cols-3 gap-1.5">
          {FACING_MODES.map(({ key, labelKey, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => set("facingMode", key)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all cursor-pointer ${
                options.facingMode === key
                  ? "border-accent bg-accent-muted"
                  : "border-border hover:border-foreground-subtle/30"
              }`}
            >
              <Icon className={`h-4 w-4 ${
                options.facingMode === key ? "text-accent" : "text-foreground-subtle"
              }`} />
              <span className="text-[11px] font-medium text-foreground leading-tight">
                {labels[labelKey]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
