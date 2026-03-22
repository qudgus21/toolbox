"use client";

import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface AddTextOptionsValue {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  align: "left" | "center" | "right";
  shadow: boolean;
  x: number;
  y: number;
}

interface AddTextOptionsProps {
  value: AddTextOptionsValue;
  onChange: (value: AddTextOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["addText"];
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

const ALIGNMENTS = [
  { value: "left" as const, Icon: AlignLeft },
  { value: "center" as const, Icon: AlignCenter },
  { value: "right" as const, Icon: AlignRight },
];

export function AddTextOptions({ value, onChange, labels }: AddTextOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Text input */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-1">
          {labels.text}
        </label>
        <input
          type="text"
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder={labels.enterText}
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

      {/* Bold / Italic / Shadow toggles */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...value, bold: !value.bold })}
          className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors cursor-pointer ${
            value.bold
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
          }`}
          title={labels.bold}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...value, italic: !value.italic })}
          className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors cursor-pointer ${
            value.italic
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
          }`}
          title={labels.italic}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...value, shadow: !value.shadow })}
          className={`flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors cursor-pointer ${
            value.shadow
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
          }`}
        >
          {labels.shadow}
        </button>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          {labels.alignment}
        </label>
        <div className="flex gap-2">
          {ALIGNMENTS.map(({ value: v, Icon }) => (
            <button
              key={v}
              type="button"
              onClick={() => onChange({ ...value, align: v })}
              className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                value.align === v
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Position X */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.xPosition}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.x}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.x}
          onChange={(e) => onChange({ ...value, x: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Position Y */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.yPosition}
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.y}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value.y}
          onChange={(e) => onChange({ ...value, y: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>
    </div>
  );
}

export function getDefaultAddTextOptions(): AddTextOptionsValue {
  return {
    text: "",
    fontFamily: "Arial",
    fontSize: 48,
    color: "#ffffff",
    bold: false,
    italic: false,
    align: "center",
    shadow: false,
    x: 50,
    y: 50,
  };
}
