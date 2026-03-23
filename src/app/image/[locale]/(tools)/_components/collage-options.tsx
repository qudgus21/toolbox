"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface CollageOptionsValue {
  template: "2h" | "2v" | "3l" | "3r" | "4grid" | "5mix";
  gap: number;
  backgroundColor: string;
  borderRadius: number;
}

interface CollageOptionsProps {
  value: CollageOptionsValue;
  onChange: (value: CollageOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["collage"];
}

/**
 * Renders a small visual preview for each collage template.
 */
function TemplatePreview({ template }: { template: CollageOptionsValue["template"] }) {
  const cell = "bg-accent/30 rounded-[2px]";
  const wrap = "grid gap-0.5 w-full h-full";

  switch (template) {
    case "2h":
      return (
        <div className={`${wrap}`} style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className={cell} />
          <div className={cell} />
        </div>
      );
    case "2v":
      return (
        <div className={`${wrap}`} style={{ gridTemplateRows: "1fr 1fr" }}>
          <div className={cell} />
          <div className={cell} />
        </div>
      );
    case "3l":
      return (
        <div className={`${wrap}`} style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr" }}>
          <div className={`${cell} row-span-2`} style={{ gridRow: "1 / 3" }} />
          <div className={cell} />
          <div className={cell} />
        </div>
      );
    case "3r":
      return (
        <div className={`${wrap}`} style={{ gridTemplateColumns: "1fr 2fr", gridTemplateRows: "1fr 1fr" }}>
          <div className={cell} />
          <div className={`${cell} row-span-2`} style={{ gridRow: "1 / 3" }} />
          <div className={cell} />
        </div>
      );
    case "4grid":
      return (
        <div className={`${wrap}`} style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
          <div className={cell} />
          <div className={cell} />
          <div className={cell} />
          <div className={cell} />
        </div>
      );
    case "5mix":
      return (
        <div className={`${wrap}`} style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
          <div className={cell} style={{ gridColumn: "1 / 3" }} />
          <div className={cell} />
          <div className={cell} />
          <div className={cell} />
          <div className={cell} />
        </div>
      );
  }
}

export function CollageOptions({ value, onChange, labels }: CollageOptionsProps) {
  const TEMPLATES: { value: CollageOptionsValue["template"]; label: string }[] = [
    { value: "2h", label: labels.horizontal2 },
    { value: "2v", label: labels.vertical2 },
    { value: "3l", label: labels.leftFocus3 },
    { value: "3r", label: labels.rightFocus3 },
    { value: "4grid", label: labels.grid4 },
    { value: "5mix", label: labels.mixed5 },
  ];

  return (
    <div className="space-y-4">
      {/* Template selector */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          {labels.template}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ ...value, template: t.value })}
              className={`flex flex-col items-center gap-1.5 rounded-md border p-2 transition-colors cursor-pointer ${
                value.template === t.value
                  ? "border-accent bg-accent/10"
                  : "border-border bg-background hover:bg-background-subtle"
              }`}
            >
              <div className="w-12 h-10">
                <TemplatePreview template={t.value} />
              </div>
              <span className={`text-[10px] font-medium ${
                value.template === t.value ? "text-accent" : "text-foreground-muted"
              }`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Gap */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.gap}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.gap}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          value={value.gap}
          onChange={(e) => onChange({ ...value, gap: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Background color */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.bgColor}
        </label>
        <input
          type="color"
          value={value.backgroundColor}
          onChange={(e) => onChange({ ...value, backgroundColor: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded border border-border bg-transparent"
        />
      </div>

      {/* Border radius */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.borderRadius}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.borderRadius}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          value={value.borderRadius}
          onChange={(e) => onChange({ ...value, borderRadius: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>
    </div>
  );
}

export function getDefaultCollageOptions(): CollageOptionsValue {
  return {
    template: "4grid",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 0,
  };
}
