"use client";

import { useCallback, useRef, useState, Fragment } from "react";
import { X, Calculator, FunctionSquare, BarChart3, Delete } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/lib/ui";
import type { CalculatorFieldDefinition, CalculatorInputType } from "@/lib/calculator/tools";

interface CalculatorInputAreaProps {
  fields: CalculatorFieldDefinition[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  fieldLabels: Record<string, string>;
  fieldOptions: Record<string, string>;
  inputType: CalculatorInputType;
  label: string;
  clearLabel: string;
  datasetPlaceholder?: string;
  className?: string;
}

const INPUT_ICONS = {
  fields: Calculator,
  expression: FunctionSquare,
  dataset: BarChart3,
} as const;

export function CalculatorInputArea({
  fields,
  values,
  onChange,
  fieldLabels,
  fieldOptions,
  inputType,
  label,
  clearLabel,
  datasetPlaceholder,
  className,
}: CalculatorInputAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClear = useCallback(() => {
    const cleared: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.type === "select" || field.type === "radio") {
        // Keep select/radio defaults
        if (field.default !== undefined) cleared[field.name] = field.default;
        else if (field.options?.[0]) cleared[field.name] = field.options[0].value;
      } else {
        cleared[field.name] = field.type === "number" ? "" : "";
      }
    }
    onChange(cleared);
  }, [fields, onChange]);

  const handleFieldChange = useCallback(
    (name: string, value: unknown) => {
      onChange({ ...values, [name]: value });
    },
    [values, onChange],
  );

  const hasValue = Object.values(values).some(
    (v) => v !== "" && v !== undefined && v !== null,
  );

  const Icon = INPUT_ICONS[inputType];

  return (
    <div
      ref={containerRef}
      className={cn(
        "group/input flex flex-col rounded-2xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-border",
        "focus-within:shadow-lg focus-within:border-violet-500/40 focus-within:ring-2 focus-within:ring-violet-500/10",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-background-subtle/80 to-background-subtle/40 px-4 py-2.5 border-b border-border/40">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          {label}
        </span>
        <div className="flex items-center gap-0.5">
          {hasValue && (
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

      {/* Content */}
      {inputType === "fields" && (
        <FieldsInput
          fields={fields}
          values={values}
          onChange={handleFieldChange}
          fieldLabels={fieldLabels}
          fieldOptions={fieldOptions}
        />
      )}

      {inputType === "expression" && (
        <ExpressionInput
          value={(values.expression as string) ?? ""}
          onChange={(v) => handleFieldChange("expression", v)}
        />
      )}

      {inputType === "dataset" && (
        <DatasetInput
          value={(values.dataset as string) ?? ""}
          onChange={(v) => handleFieldChange("dataset", v)}
          placeholder={datasetPlaceholder}
        />
      )}
    </div>
  );
}

// ── Fields Input ────────────────────────────────────────────────────────

function FieldsInput({
  fields,
  values,
  onChange,
  fieldLabels,
  fieldOptions,
}: {
  fields: CalculatorFieldDefinition[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  fieldLabels: Record<string, string>;
  fieldOptions: Record<string, string>;
}) {
  // Group fields by group property
  const groups = new Map<string | undefined, CalculatorFieldDefinition[]>();
  for (const field of fields) {
    const group = field.group;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(field);
  }

  const groupEntries = Array.from(groups.entries());

  return (
    <div className="px-4 py-4 space-y-4">
      {groupEntries.map(([groupName, groupFields], gi) => (
        <Fragment key={groupName ?? `group-${gi}`}>
          {groupName && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted/60 px-1 pt-1">
              {fieldLabels[`group_${groupName}`] ?? groupName}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groupFields.map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={onChange}
                fieldLabels={fieldLabels}
                fieldOptions={fieldOptions}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

// ── Single Field Renderer ───────────────────────────────────────────────

function FieldRenderer({
  field,
  value,
  onChange,
  fieldLabels,
  fieldOptions,
}: {
  field: CalculatorFieldDefinition;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
  fieldLabels: Record<string, string>;
  fieldOptions: Record<string, string>;
}) {
  const label = fieldLabels[field.name] ?? field.name;

  if (field.type === "number") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground-muted px-0.5">{label}</span>
        <div className="relative">
          <input
            type="number"
            value={value === undefined || value === null ? "" : String(value)}
            onChange={(e) => {
              const v = e.target.value;
              onChange(field.name, v === "" ? "" : Number(v));
            }}
            min={field.min}
            max={field.max}
            step={field.step ?? "any"}
            placeholder="0"
            className={cn(
              "h-11 w-full rounded-xl border border-border/60 bg-background-subtle/30 px-3 text-sm font-semibold text-foreground tabular-nums",
              "focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all",
              "placeholder:text-foreground-subtle/40",
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              field.suffix && "pr-14",
            )}
          />
          {field.suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-bold text-violet-600 dark:text-violet-400 pointer-events-none">
              {field.suffix}
            </span>
          )}
        </div>
      </label>
    );
  }

  if (field.type === "select") {
    const selectOptions = (field.options ?? []).map((opt) => ({
      value: opt.value,
      label: fieldOptions[`${field.name}_${opt.value}`] ?? opt.label,
    }));
    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground-muted px-0.5">{label}</span>
        <Dropdown
          value={String(value ?? field.default ?? field.options?.[0]?.value ?? "")}
          onChange={(v) => onChange(field.name, v)}
          options={selectOptions}
          accentColor="violet"
        />
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset className="flex flex-col gap-1.5 sm:col-span-2">
        <legend className="text-xs font-semibold text-foreground-muted px-0.5 mb-1">{label}</legend>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const isSelected = String(value ?? field.default) === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(field.name, opt.value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-violet-500/50 bg-violet-500/10 text-violet-700 dark:text-violet-300 shadow-sm shadow-violet-500/10"
                    : "border-border/60 bg-background-subtle/30 text-foreground-muted hover:border-violet-500/30 hover:bg-violet-500/5",
                )}
              >
                <span
                  className={cn(
                    "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "border-violet-500"
                      : "border-foreground-subtle/40",
                  )}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                  )}
                </span>
                {fieldOptions[`${field.name}_${opt.value}`] ?? opt.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  // text type
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-foreground-muted px-0.5">{label}</span>
      <input
        type="text"
        value={String(value ?? "")}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.name === "ipAddress" ? "192.168.1.1" : ""}
        className="h-11 w-full rounded-xl border border-border/60 bg-background-subtle/30 px-3 text-sm font-semibold text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all placeholder:text-foreground-subtle/40"
        spellCheck={false}
      />
    </label>
  );
}

// ── Expression Input (Scientific Calculator Keypad) ─────────────────────

type KeypadButton = {
  label: string;
  label2nd?: string;
  insert?: string;
  insert2nd?: string;
  action?: "backspace" | "clear" | "toggle2nd";
  variant: "num" | "op" | "fn" | "const" | "action" | "toggle";
  span?: number;
};

// Function keys (top section) — affected by 2nd toggle
const FN_ROWS: KeypadButton[][] = [
  [
    { label: "2nd", action: "toggle2nd", variant: "toggle" },
    { label: "sin", label2nd: "sin⁻¹", insert: "sin(", insert2nd: "asin(", variant: "fn" },
    { label: "cos", label2nd: "cos⁻¹", insert: "cos(", insert2nd: "acos(", variant: "fn" },
    { label: "tan", label2nd: "tan⁻¹", insert: "tan(", insert2nd: "atan(", variant: "fn" },
    { label: "π", insert: "pi", variant: "const" },
  ],
  [
    { label: "x²", label2nd: "x³", insert: "^2", insert2nd: "^3", variant: "fn" },
    { label: "√", label2nd: "1/x", insert: "sqrt(", insert2nd: "1/(", variant: "fn" },
    { label: "log", label2nd: "log₂", insert: "log(", insert2nd: "log2(", variant: "fn" },
    { label: "ln", label2nd: "eˣ", insert: "ln(", insert2nd: "exp(", variant: "fn" },
    { label: "e", insert: "e", variant: "const" },
  ],
  [
    { label: "(", insert: "(", variant: "op" },
    { label: ")", insert: ")", variant: "op" },
    { label: "xʸ", insert: "^", variant: "op" },
    { label: "abs", label2nd: "round", insert: "abs(", insert2nd: "round(", variant: "fn" },
    { label: "%", label2nd: "mod", insert: "%", variant: "op" },
  ],
];

// Number pad (bottom section) — always the same
const NUM_ROWS: KeypadButton[][] = [
  [
    { label: "7", insert: "7", variant: "num" },
    { label: "8", insert: "8", variant: "num" },
    { label: "9", insert: "9", variant: "num" },
    { label: "÷", insert: "/", variant: "op" },
    { label: "⌫", action: "backspace", variant: "action" },
  ],
  [
    { label: "4", insert: "4", variant: "num" },
    { label: "5", insert: "5", variant: "num" },
    { label: "6", insert: "6", variant: "num" },
    { label: "×", insert: "*", variant: "op" },
    { label: "C", action: "clear", variant: "action" },
  ],
  [
    { label: "1", insert: "1", variant: "num" },
    { label: "2", insert: "2", variant: "num" },
    { label: "3", insert: "3", variant: "num" },
    { label: "−", insert: "-", variant: "op" },
    { label: "+", insert: "+", variant: "op" },
  ],
  [
    { label: "0", insert: "0", variant: "num", span: 2 },
    { label: ".", insert: ".", variant: "num" },
    { label: "(", insert: "(", variant: "op" },
    { label: ")", insert: ")", variant: "op" },
  ],
];

const VARIANT_STYLES: Record<KeypadButton["variant"], string> = {
  num: "bg-background hover:bg-background-subtle/80 text-foreground font-semibold",
  op: "bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-bold",
  fn: "bg-indigo-500/8 hover:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold text-xs",
  const: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold",
  action: "bg-red-500/8 hover:bg-red-500/15 text-red-600 dark:text-red-400 font-bold",
  toggle: "",
};

function ExpressionInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [is2nd, setIs2nd] = useState(false);

  const insert = useCallback(
    (text: string) => {
      const input = inputRef.current;
      const start = input?.selectionStart ?? value.length;
      const end = input?.selectionEnd ?? value.length;
      const newValue = value.slice(0, start) + text + value.slice(end);
      onChange(newValue);
      const newPos = start + text.length;
      requestAnimationFrame(() => {
        input?.setSelectionRange(newPos, newPos);
        input?.focus();
      });
    },
    [value, onChange],
  );

  const backspace = useCallback(() => {
    const input = inputRef.current;
    const start = input?.selectionStart ?? value.length;
    const end = input?.selectionEnd ?? value.length;
    if (start !== end) {
      const newValue = value.slice(0, start) + value.slice(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        input?.setSelectionRange(start, start);
        input?.focus();
      });
    } else if (start > 0) {
      const newValue = value.slice(0, start - 1) + value.slice(start);
      onChange(newValue);
      requestAnimationFrame(() => {
        input?.setSelectionRange(start - 1, start - 1);
        input?.focus();
      });
    }
  }, [value, onChange]);

  const clear = useCallback(() => {
    onChange("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onChange]);

  const handleButton = useCallback(
    (btn: KeypadButton) => {
      if (btn.action === "toggle2nd") {
        setIs2nd((prev) => !prev);
        return;
      }
      if (btn.action === "backspace") { backspace(); return; }
      if (btn.action === "clear") { clear(); return; }

      const text = is2nd && btn.insert2nd ? btn.insert2nd : btn.insert;
      if (text) {
        insert(text);
        // Auto-reset 2nd after use
        if (is2nd && btn.insert2nd) setIs2nd(false);
      }
    },
    [insert, backspace, clear, is2nd],
  );

  return (
    <div className="flex flex-col">
      {/* Display */}
      <div className="px-3 pt-3 pb-2">
        <input
          ref={inputRef}
          type="text"
          inputMode="none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className={cn(
            "w-full rounded-xl border border-border/60 bg-background-subtle/30 px-4 py-3",
            "text-right font-mono text-xl font-bold text-foreground tabular-nums tracking-wide",
            "focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all",
            "placeholder:text-foreground-subtle/30",
          )}
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {/* Function keys */}
      <div className="px-3 pb-1.5 space-y-1.5">
        {FN_ROWS.map((row, ri) => (
          <div key={ri} className="grid grid-cols-5 gap-1.5">
            {row.map((btn, bi) => {
              const label = is2nd && btn.label2nd ? btn.label2nd : btn.label;
              const isToggle = btn.action === "toggle2nd";

              return (
                <button
                  key={bi}
                  type="button"
                  onClick={() => handleButton(btn)}
                  className={cn(
                    "h-10 rounded-xl border border-border/30 text-sm transition-all duration-100 cursor-pointer select-none",
                    "active:scale-95 active:brightness-90",
                    isToggle
                      ? is2nd
                        ? "bg-violet-600 text-white border-violet-500 font-bold text-xs shadow-sm shadow-violet-500/30"
                        : "bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-bold text-xs"
                      : VARIANT_STYLES[btn.variant],
                    is2nd && btn.insert2nd && !isToggle && "ring-1 ring-violet-400/30",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-border/30 mb-1.5" />

      {/* Number pad */}
      <div className="px-3 pb-3 space-y-1.5">
        {NUM_ROWS.map((row, ri) => (
          <div key={ri} className="grid grid-cols-5 gap-1.5">
            {row.map((btn, bi) => (
              <button
                key={bi}
                type="button"
                onClick={() => handleButton(btn)}
                aria-label={btn.action === "backspace" ? "Backspace" : undefined}
                className={cn(
                  "h-12 rounded-xl border border-border/30 text-sm transition-all duration-100 cursor-pointer select-none",
                  "active:scale-95 active:brightness-90",
                  VARIANT_STYLES[btn.variant],
                  btn.span === 2 && "col-span-2",
                )}
              >
                {btn.action === "backspace" ? (
                  <Delete className="h-4 w-4 mx-auto" aria-hidden="true" />
                ) : (
                  btn.label
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dataset Input ───────────────────────────────────────────────────────

function DatasetInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "1, 2, 3, 4, 5\n10, 20, 30"}
        className="min-h-[200px] flex-1 resize-none bg-transparent px-4 py-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-foreground-subtle/40 focus:outline-none"
        spellCheck={false}
      />
    </div>
  );
}
