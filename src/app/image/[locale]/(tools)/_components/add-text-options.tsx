"use client";

import { useRef } from "react";
import { Bold, Italic, Plus, Trash2, Type, GripVertical, AlignLeft, AlignCenter, AlignRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical } from "lucide-react";
import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface TextItem {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  shadow: boolean;
  alignH: "left" | "center" | "right";
  alignV: "top" | "center" | "bottom";
  bgColor: string; // "transparent" or hex color
  x: number;  // percentage 0-100
  y: number;  // percentage 0-100
  w: number;  // percentage of image width
  h: number;  // percentage of image height
}

export interface AddTextOptionsValue {
  items: TextItem[];
  selectedId: string | null;
}

interface AddTextOptionsProps {
  value: AddTextOptionsValue;
  onChange: (value: AddTextOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["addText"];
}

let nextId = 1;

export function createTextItem(overrides?: Partial<TextItem>): TextItem {
  return {
    id: `text-${nextId++}`,
    text: "Text",
    fontFamily: "Arial",
    fontSize: 48,
    color: "#ffffff",
    bold: false,
    italic: false,
    shadow: true,
    alignH: "center",
    alignV: "center",
    bgColor: "transparent",
    x: 50,
    y: 50,
    w: 40,
    h: 15,
    ...overrides,
  };
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

export function AddTextOptions({ value, onChange, labels }: AddTextOptionsProps) {
  const { items, selectedId } = value;
  const selected = items.find((t) => t.id === selectedId) ?? null;
  const dragItemRef = useRef<string | null>(null);
  const dragOverRef = useRef<string | null>(null);

  const addItem = () => {
    const item = createTextItem({ y: 30 + (items.length * 10) % 60 });
    onChange({ items: [...items, item], selectedId: item.id });
  };

  const deleteItem = (id: string) => {
    const next = items.filter((t) => t.id !== id);
    onChange({
      items: next,
      selectedId: selectedId === id ? (next[0]?.id ?? null) : selectedId,
    });
  };

  const updateSelected = (patch: Partial<TextItem>) => {
    if (!selectedId) return;
    onChange({
      ...value,
      items: items.map((t) => (t.id === selectedId ? { ...t, ...patch } : t)),
    });
  };

  // DnD reorder handlers
  const handleDragStart = (id: string) => {
    dragItemRef.current = id;
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    dragOverRef.current = id;
  };

  const handleDrop = () => {
    const fromId = dragItemRef.current;
    const toId = dragOverRef.current;
    dragItemRef.current = null;
    dragOverRef.current = null;
    if (!fromId || !toId || fromId === toId) return;

    const fromIdx = items.findIndex((t) => t.id === fromId);
    const toIdx = items.findIndex((t) => t.id === toId);
    if (fromIdx === -1 || toIdx === -1) return;

    const reordered = [...items];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    onChange({ ...value, items: reordered });
  };

  return (
    <div className="space-y-4">
      {/* Text items list */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-foreground-muted">
            {labels.text}
          </label>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground-muted hover:bg-background-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            {labels.addText ?? "Add"}
          </button>
        </div>

        {items.length === 0 && (
          <p className="text-xs text-foreground-subtle text-center py-4">
            {labels.noItems ?? "Click + to add text"}
          </p>
        )}

        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDrop={handleDrop}
              onClick={() => onChange({ ...value, selectedId: item.id })}
              className={`flex items-center gap-1.5 rounded-md border px-2 py-2 text-sm transition-colors cursor-pointer ${
                item.id === selectedId
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              <GripVertical className="h-3.5 w-3.5 shrink-0 cursor-grab opacity-40" />
              <Type className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 truncate">{item.text || "..."}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                className="shrink-0 text-foreground-subtle hover:text-error transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected item properties */}
      {selected && (
        <div className="space-y-3 border-t border-border pt-3">
          {/* Text content */}
          <textarea
            rows={2}
            value={selected.text}
            onChange={(e) => updateSelected({ text: e.target.value })}
            placeholder={labels.enterText}
            className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {/* Font family + size */}
          <div className="flex gap-2">
            <select
              value={selected.fontFamily}
              onChange={(e) => updateSelected({ fontFamily: e.target.value })}
              className="flex-1 min-w-0 rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <input
              type="number"
              min={8}
              max={200}
              value={selected.fontSize}
              onChange={(e) => updateSelected({ fontSize: Math.max(8, Math.min(200, Number(e.target.value))) })}
              className="w-16 rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground text-center focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Style toggles + colors — single row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Bold */}
            <button
              type="button"
              onClick={() => updateSelected({ bold: !selected.bold })}
              className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                selected.bold ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
              title={labels.bold}
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            {/* Italic */}
            <button
              type="button"
              onClick={() => updateSelected({ italic: !selected.italic })}
              className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                selected.italic ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
              title={labels.italic}
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            {/* Shadow */}
            <button
              type="button"
              onClick={() => updateSelected({ shadow: !selected.shadow })}
              className={`flex h-8 items-center gap-1 rounded-md border px-2 text-xs font-medium transition-colors cursor-pointer ${
                selected.shadow ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              {labels.shadow}
            </button>

            <div className="w-px h-5 bg-border mx-0.5" />

            {/* Text color */}
            <label className="relative cursor-pointer" title={labels.color}>
              <span className="flex h-8 items-center gap-1 rounded-md border border-border px-1.5 hover:bg-background-subtle transition-colors">
                <span className="text-[10px] font-bold text-foreground-muted">A</span>
                <span className="h-3 w-5 rounded-sm border border-border" style={{ backgroundColor: selected.color }} />
              </span>
              <input
                type="color"
                value={selected.color}
                onChange={(e) => updateSelected({ color: e.target.value })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            {/* Background color */}
            <label className="relative cursor-pointer" title={labels.bgColor ?? "Background"}>
              <span className="flex h-8 items-center gap-1 rounded-md border border-border px-1.5 hover:bg-background-subtle transition-colors">
                <span className="text-[10px] font-bold text-foreground-muted">BG</span>
                {selected.bgColor === "transparent" ? (
                  <span
                    className="h-3 w-5 rounded-sm border border-border"
                    style={{
                      backgroundImage: "conic-gradient(#ccc 25%, #fff 25% 50%, #ccc 50% 75%, #fff 75%)",
                      backgroundSize: "4px 4px",
                    }}
                  />
                ) : (
                  <span className="h-3 w-5 rounded-sm border border-border" style={{ backgroundColor: selected.bgColor }} />
                )}
              </span>
              <input
                type="color"
                value={selected.bgColor === "transparent" ? "#000000" : selected.bgColor}
                onChange={(e) => updateSelected({ bgColor: e.target.value })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            {selected.bgColor !== "transparent" && (
              <button
                type="button"
                onClick={() => updateSelected({ bgColor: "transparent" })}
                className="text-xs text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
                title={labels.transparent ?? "None"}
              >
                ×
              </button>
            )}
          </div>

          {/* Alignment — horizontal + vertical in one row */}
          <div className="flex items-center gap-1.5">
            {([
              { v: "left" as const, Icon: AlignLeft },
              { v: "center" as const, Icon: AlignCenter },
              { v: "right" as const, Icon: AlignRight },
            ]).map(({ v, Icon }) => (
              <button
                key={v}
                type="button"
                onClick={() => updateSelected({ alignH: v })}
                className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                  selected.alignH === v ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
            <div className="w-px h-5 bg-border mx-0.5" />
            {([
              { v: "top" as const, Icon: AlignStartVertical },
              { v: "center" as const, Icon: AlignCenterVertical },
              { v: "bottom" as const, Icon: AlignEndVertical },
            ]).map(({ v, Icon }) => (
              <button
                key={v}
                type="button"
                onClick={() => updateSelected({ alignV: v })}
                className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                  selected.alignV === v ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function getDefaultAddTextOptions(): AddTextOptionsValue {
  const item = createTextItem();
  return {
    items: [item],
    selectedId: item.id,
  };
}
