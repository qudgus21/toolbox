"use client";

import { useCallback, useRef } from "react";
import { X, ArrowLeftRight, Hash, Palette, Code, Calendar, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConverterInputType } from "@/lib/converter/tools";

interface ConverterInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  inputType: ConverterInputType;
  label?: string;
  placeholder?: string;
  clearLabel: string;
  fromLabel?: string;
  toLabel?: string;
  swapLabel?: string;
  fromUnit?: string;
  toUnit?: string;
  onFromUnitChange?: (unit: string) => void;
  onToUnitChange?: (unit: string) => void;
  onSwap?: () => void;
  unitOptions?: { value: string; label: string }[];
  datetimeHint?: string;
  className?: string;
}

const INPUT_ICONS = {
  unit: Hash,
  color: Palette,
  code: Code,
  datetime: Calendar,
  text: Type,
} as const;

export function ConverterInputArea({
  value,
  onChange,
  inputType,
  label,
  placeholder,
  clearLabel,
  fromLabel,
  toLabel,
  swapLabel,
  fromUnit,
  toUnit,
  onFromUnitChange,
  onToUnitChange,
  onSwap,
  unitOptions,
  datetimeHint,
  className,
}: ConverterInputAreaProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleClear = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  const Icon = INPUT_ICONS[inputType];

  return (
    <div
      className={cn(
        "group/input flex flex-col rounded-2xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-border",
        "focus-within:shadow-lg focus-within:border-emerald-500/40 focus-within:ring-2 focus-within:ring-emerald-500/10",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-background-subtle/80 to-background-subtle/40 px-4 py-2.5 border-b border-border/40">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          {label}
        </span>
        <div className="flex items-center gap-0.5">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:text-red-500 hover:bg-red-500/8 transition-all duration-150 cursor-pointer"
              title={clearLabel}
              aria-label={clearLabel}
>
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{clearLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Input content - varies by type */}
      {inputType === "unit" && (
        <UnitInput
          ref={inputRef as React.Ref<HTMLInputElement>}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? "0"}
          fromLabel={fromLabel}
          toLabel={toLabel}
          swapLabel={swapLabel}
          fromUnit={fromUnit}
          toUnit={toUnit}
          onFromUnitChange={onFromUnitChange}
          onToUnitChange={onToUnitChange}
          onSwap={onSwap}
          unitOptions={unitOptions}
        />
      )}

      {inputType === "color" && (
        <ColorInput
          ref={inputRef as React.Ref<HTMLInputElement>}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? "#ff0000"}
        />
      )}

      {inputType === "code" && (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[300px] flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-foreground placeholder:text-foreground-subtle/60 focus:outline-none"
          spellCheck={false}
        />
      )}

      {inputType === "datetime" && (
        <DatetimeInput
          ref={inputRef as React.Ref<HTMLInputElement>}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? "2024-01-15 14:30:00"}
          hint={datetimeHint}
        />
      )}

      {inputType === "text" && (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground-subtle/60 focus:outline-none"
          spellCheck={false}
        />
      )}
    </div>
  );
}

// ── Unit Input ────────────────────────────────────────────────────────

import { forwardRef } from "react";

const UnitInput = forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    fromLabel?: string;
    toLabel?: string;
    swapLabel?: string;
    fromUnit?: string;
    toUnit?: string;
    onFromUnitChange?: (unit: string) => void;
    onToUnitChange?: (unit: string) => void;
    onSwap?: () => void;
    unitOptions?: { value: string; label: string }[];
  }
>(function UnitInput(
  {
    value,
    onChange,
    placeholder,
    fromLabel,
    toLabel,
    swapLabel,
    fromUnit,
    toUnit,
    onFromUnitChange,
    onToUnitChange,
    onSwap,
    unitOptions,
  },
  ref,
) {
  return (
    <div className="flex flex-col">
      {/* Large number input */}
      <div className="flex items-center justify-center px-6 py-8">
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          aria-label={fromLabel ?? "Value"}
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || v === "-" || v === "." || v === "-." || /^-?\d*\.?\d*$/.test(v)) {
              onChange(v);
            }
          }}
          placeholder={placeholder}
          className="w-full text-center text-4xl sm:text-5xl font-bold text-foreground bg-transparent focus:outline-none placeholder:text-foreground-subtle/30 tabular-nums tracking-tight"
        />
      </div>

      {/* Unit selectors */}
      {unitOptions && unitOptions.length > 0 && (
        <div className="flex items-center gap-2 px-4 pb-4">
          {/* From unit */}
          <div className="flex-1 min-w-0">
            {fromLabel && (
              <label htmlFor="converter-from-unit" className="block text-[10px] font-bold uppercase tracking-wider text-foreground-muted/60 mb-1.5 px-1">
                {fromLabel}
              </label>
            )}
            <select
              id="converter-from-unit"
              value={fromUnit}
              aria-label={fromLabel}
              onChange={(e) => onFromUnitChange?.(e.target.value)}
              className="w-full h-11 rounded-xl border border-border/60 bg-background-subtle/50 px-3 text-sm font-semibold text-foreground focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_0.5rem_center] bg-no-repeat pr-8"
            >
              {unitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <div className="flex flex-col items-center pt-4">
            <button
              type="button"
              onClick={onSwap}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              title={swapLabel}
              aria-label={swapLabel}
            >
              <ArrowLeftRight className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* To unit */}
          <div className="flex-1 min-w-0">
            {toLabel && (
              <label htmlFor="converter-to-unit" className="block text-[10px] font-bold uppercase tracking-wider text-foreground-muted/60 mb-1.5 px-1">
                {toLabel}
              </label>
            )}
            <select
              id="converter-to-unit"
              value={toUnit}
              aria-label={toLabel}
              onChange={(e) => onToUnitChange?.(e.target.value)}
              className="w-full h-11 rounded-xl border border-border/60 bg-background-subtle/50 px-3 text-sm font-semibold text-foreground focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_0.5rem_center] bg-no-repeat pr-8"
            >
              {unitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
});

// ── Color Input ──────────────────────────────────────────────────────

const ColorInput = forwardRef<
  HTMLInputElement,
  { value: string; onChange: (v: string) => void; placeholder: string }
>(function ColorInput({ value, onChange, placeholder }, ref) {
  // Parse value to get a valid color for the picker
  const pickerValue = (() => {
    const trimmed = value.trim();
    if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed;
    if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
      const [, r, g, b] = trimmed.match(/^#(.)(.)(.)$/) ?? [];
      return r ? `#${r}${r}${g}${g}${b}${b}` : "#000000";
    }
    return "#000000";
  })();

  return (
    <div className="flex items-center gap-3 px-4 py-6">
      {/* Color swatch / picker */}
      <div className="relative">
        <div
          className="h-14 w-14 rounded-xl border-2 border-border/60 shadow-inner overflow-hidden cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: pickerValue }}
        >
          <input
            type="color"
            value={pickerValue}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Color picker"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>

      {/* Text input */}
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-2xl font-mono font-bold text-foreground bg-transparent focus:outline-none placeholder:text-foreground-subtle/40"
        spellCheck={false}
      />
    </div>
  );
});

// ── Datetime Input ───────────────────────────────────────────────────

const DatetimeInput = forwardRef<
  HTMLInputElement,
  { value: string; onChange: (v: string) => void; placeholder: string; hint?: string }
>(function DatetimeInput({ value, onChange, placeholder, hint }, ref) {
  return (
    <div className="flex flex-col px-4 py-5 gap-2">
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-xl font-mono font-semibold text-foreground bg-transparent focus:outline-none placeholder:text-foreground-subtle/40"
        spellCheck={false}
      />
      <p className="text-xs text-foreground-muted/60">
        {hint ?? "e.g. 2024-01-15, 1705312200, now"}
      </p>
    </div>
  );
});
