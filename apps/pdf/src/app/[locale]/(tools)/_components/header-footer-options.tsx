"use client";

import { useCallback, useState } from "react";
import {
  FileText,
  BookOpen,
  BookMarked,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { cn } from "@toolbox/utils";
import type {
  HeaderFooterOptions,
  HeaderFooterAlign,
} from "@/lib/processors/header-footer-types";
import type {
  PageNumberFont,
  FacingPageMode,
} from "@/lib/processors/page-numbers-types";

// ── Types ────────────────────────────────────────────────────

export interface HeaderFooterLabels {
  dropFile: string;
  headerLabel: string;
  footerLabel: string;
  enabled: string;
  disabled: string;
  textLabel: string;
  textPlaceholder: string;
  alignLabel: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  variablesLabel: string;
  variablePage: string;
  variableTotal: string;
  variableDate: string;
  variableFilename: string;
  fontLabel: string;
  fontSizeLabel: string;
  colorLabel: string;
  marginLabel: string;
  marginUnit: string;
  ptUnit: string;
  pageRangeLabel: string;
  rangeAll: string;
  rangeCustom: string;
  rangePlaceholder: string;
  facingModeLabel: string;
  modeSingle: string;
  modeFacing: string;
  modeFacingCover: string;
  applyButton: string;
  changeFile: string;
}

interface HeaderFooterOptionsProps {
  options: HeaderFooterOptions;
  onChange: (options: HeaderFooterOptions) => void;
  labels: HeaderFooterLabels;
}

// ── Constants ────────────────────────────────────────────────

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

const ALIGNS: { key: HeaderFooterAlign; Icon: typeof AlignLeft }[] = [
  { key: "left", Icon: AlignLeft },
  { key: "center", Icon: AlignCenter },
  { key: "right", Icon: AlignRight },
];

const FACING_MODES: {
  key: FacingPageMode;
  labelKey: keyof HeaderFooterLabels;
  Icon: typeof FileText;
}[] = [
  { key: "single", labelKey: "modeSingle", Icon: FileText },
  { key: "facing", labelKey: "modeFacing", Icon: BookOpen },
  { key: "facing-cover", labelKey: "modeFacingCover", Icon: BookMarked },
];

const VARIABLES = [
  { key: "{page}", labelKey: "variablePage" as const },
  { key: "{total}", labelKey: "variableTotal" as const },
  { key: "{date}", labelKey: "variableDate" as const },
  { key: "{filename}", labelKey: "variableFilename" as const },
];

// ── Section: Header or Footer ────────────────────────────────

function HFSection({
  type,
  label,
  enabled,
  text,
  align,
  onToggle,
  onTextChange,
  onAlignChange,
  onInsertVariable,
  labels,
}: {
  type: "header" | "footer";
  label: string;
  enabled: boolean;
  text: string;
  align: HeaderFooterAlign;
  onToggle: (v: boolean) => void;
  onTextChange: (v: string) => void;
  onAlignChange: (v: HeaderFooterAlign) => void;
  onInsertVariable: (v: string) => void;
  labels: HeaderFooterLabels;
}) {
  return (
    <div className="space-y-2.5">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide">
          {label}
        </p>
        <div className="flex gap-1">
          {([true, false] as const).map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => onToggle(v)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer",
                enabled === v
                  ? "bg-accent text-accent-foreground"
                  : "bg-background-elevated text-foreground-muted hover:text-foreground",
              )}
            >
              {v ? labels.enabled : labels.disabled}
            </button>
          ))}
        </div>
      </div>

      {enabled && (
        <>
          {/* Text input */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">
              {labels.textLabel}
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder={labels.textPlaceholder}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm placeholder:text-foreground-subtle/50"
            />
          </div>

          {/* Variable buttons */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">
              {labels.variablesLabel}
            </label>
            <div className="flex flex-wrap gap-1">
              {VARIABLES.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => onInsertVariable(v.key)}
                  className="rounded-md border border-border bg-background-elevated px-2 py-1 text-xs font-mono text-foreground-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  {v.key}
                  <span className="ml-1 font-sans text-foreground-subtle">
                    {labels[v.labelKey]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Alignment */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">
              {labels.alignLabel}
            </label>
            <div className="flex gap-1">
              {ALIGNS.map(({ key, Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onAlignChange(key)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-bold transition-colors cursor-pointer",
                    align === key
                      ? "border-accent bg-accent-muted/30 text-accent"
                      : "border-border bg-background-elevated text-foreground-muted hover:border-foreground-subtle hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────

export function HeaderFooterOptionsComponent({
  options,
  onChange,
  labels,
}: HeaderFooterOptionsProps) {
  const set = useCallback(
    <K extends keyof HeaderFooterOptions>(key: K, value: HeaderFooterOptions[K]) => {
      onChange({ ...options, [key]: value });
    },
    [options, onChange],
  );

  const [fontSizeInput, setFontSizeInput] = useState(String(options.fontSize));
  const [marginInput, setMarginInput] = useState(String(options.marginMm));

  const commitNumber = useCallback(
    (raw: string, key: keyof HeaderFooterOptions, min: number, max: number, setter: (v: string) => void, isFloat = false) => {
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

  const insertVariable = (target: "header" | "footer", variable: string) => {
    const key = target === "header" ? "headerText" : "footerText";
    const current = options[key];
    set(key, current + variable);
  };

  return (
    <div className="space-y-4">
      {/* Header section */}
      <HFSection
        type="header"
        label={labels.headerLabel}
        enabled={options.headerEnabled}
        text={options.headerText}
        align={options.headerAlign}
        onToggle={(v) => set("headerEnabled", v)}
        onTextChange={(v) => set("headerText", v)}
        onAlignChange={(v) => set("headerAlign", v)}
        onInsertVariable={(v) => insertVariable("header", v)}
        labels={labels}
      />

      <div className="border-t border-border" />

      {/* Footer section */}
      <HFSection
        type="footer"
        label={labels.footerLabel}
        enabled={options.footerEnabled}
        text={options.footerText}
        align={options.footerAlign}
        onToggle={(v) => set("footerEnabled", v)}
        onTextChange={(v) => set("footerText", v)}
        onAlignChange={(v) => set("footerAlign", v)}
        onInsertVariable={(v) => insertVariable("footer", v)}
        labels={labels}
      />

      <div className="border-t border-border" />

      {/* Shared style: font, size, color, margin */}
      <div className="space-y-2.5">
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

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground-subtle">{labels.fontSizeLabel}</label>
            <div className="relative">
              <input
                type="number"
                min={6}
                max={36}
                step={1}
                value={fontSizeInput}
                onChange={(e) => {
                  setFontSizeInput(e.target.value);
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v) && v >= 6 && v <= 36) set("fontSize", v);
                }}
                onBlur={() => commitNumber(fontSizeInput, "fontSize", 6, 36, setFontSizeInput)}
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

      {/* Page range */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.pageRangeLabel}</p>
        <div className="flex items-center gap-3">
          {(["all", "custom"] as const).map((mode) => (
            <label key={mode} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="hf-page-range"
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
      </div>

      <div className="border-t border-border" />

      {/* Facing mode */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wide">{labels.facingModeLabel}</p>
        <div className="grid grid-cols-3 gap-1.5">
          {FACING_MODES.map(({ key, labelKey, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => set("facingMode", key)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all cursor-pointer",
                options.facingMode === key
                  ? "border-accent bg-accent-muted"
                  : "border-border hover:border-foreground-subtle/30",
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                options.facingMode === key ? "text-accent" : "text-foreground-subtle",
              )} />
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
