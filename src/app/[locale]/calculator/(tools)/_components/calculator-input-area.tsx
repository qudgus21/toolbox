"use client";

import { useCallback, useRef, Fragment } from "react";
import { X, Calculator, FunctionSquare, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
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
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground-muted px-0.5">{label}</span>
        <select
          value={String(value ?? field.default ?? field.options?.[0]?.value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="h-11 w-full rounded-xl border border-border/60 bg-background-subtle/30 px-3 text-sm font-semibold text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_0.5rem_center] bg-no-repeat pr-8"
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {fieldOptions[`${field.name}_${opt.value}`] ?? opt.label}
            </option>
          ))}
        </select>
      </label>
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
        placeholder=""
        className="h-11 w-full rounded-xl border border-border/60 bg-background-subtle/30 px-3 text-sm font-semibold text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all placeholder:text-foreground-subtle/40"
        spellCheck={false}
      />
    </label>
  );
}

// ── Expression Input ────────────────────────────────────────────────────

function ExpressionInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. sin(pi/4) + sqrt(2) * 3"
        className="min-h-[200px] flex-1 resize-none bg-transparent px-4 py-4 font-mono text-lg leading-relaxed text-foreground placeholder:text-foreground-subtle/40 focus:outline-none"
        spellCheck={false}
      />
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
