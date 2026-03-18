"use client";

import {
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import type { AnnotateElement, AnnotatePdfLabels } from "./annotate-types";
import { HIGHLIGHT_COLORS, STAMP_TEXT, type HighlightColor } from "./annotate-types";
import { FONT_OPTIONS } from "./annotate-types";
import { ColorPicker } from "../edit-pdf/color-picker";
import type { AnnotateDispatch } from "./use-annotate-store";
import type { TextAlign } from "./annotate-types";

/* ── Props ──────────────────────────────────────────────────── */

interface AnnotatePropertiesPanelProps {
  selectedElement: AnnotateElement | null;
  dispatch: AnnotateDispatch;
  labels: AnnotatePdfLabels;
}

/* ── Main Component ─────────────────────────────────────────── */

export function AnnotatePropertiesPanel({
  selectedElement,
  dispatch,
  labels,
}: AnnotatePropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center text-sm text-foreground-muted">
        <p>{labels.noSelection}</p>
      </div>
    );
  }

  const el = selectedElement;

  const update = (changes: Partial<AnnotateElement>) => {
    dispatch({ type: "UPDATE_ELEMENT", id: el.id, changes });
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-3">
      {/* ── Position ──────────────────────────────────── */}
      <Section title={labels.position}>
        <div className="grid grid-cols-2 gap-2">
          <NumberField label="X" value={el.x} onChange={(v) => update({ x: v })} />
          <NumberField label="Y" value={el.y} onChange={(v) => update({ y: v })} />
        </div>
      </Section>

      {/* ── Size ──────────────────────────────────────── */}
      <Section title={labels.size}>
        <div className="grid grid-cols-2 gap-2">
          <NumberField label="W" value={el.width} min={1} onChange={(v) => update({ width: v })} />
          <NumberField label="H" value={el.height} min={1} onChange={(v) => update({ height: v })} />
        </div>
      </Section>

      {/* ── Rotation ──────────────────────────────────── */}
      <Section title={labels.rotation}>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={-180}
            max={180}
            value={el.rotation}
            onChange={(e) => update({ rotation: Number(e.target.value) })}
            className="w-full accent-accent"
          />
          <span className="w-10 text-right text-xs text-foreground-muted">
            {el.rotation}°
          </span>
        </div>
      </Section>

      {/* ── Highlight Properties ──────────────────────── */}
      {el.type === "highlight" && (
        <Section title={labels.toolHighlight}>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(HIGHLIGHT_COLORS) as HighlightColor[]).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => update({ color })}
                title={labels[`color${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof AnnotatePdfLabels] as string}
                className={`h-7 w-7 rounded-md border-2 transition-colors ${
                  el.color === color
                    ? "border-accent ring-1 ring-accent/30"
                    : "border-transparent hover:border-border"
                }`}
                style={{ backgroundColor: HIGHLIGHT_COLORS[color] }}
              />
            ))}
          </div>
        </Section>
      )}

      {/* ── Underline / Strikethrough Properties ──────── */}
      {(el.type === "underline" || el.type === "strikethrough") && (
        <>
          <ColorPicker
            value={el.color}
            onChange={(c) => update({ color: c })}
            label={labels.drawColor}
          />
          <Section title={labels.drawThickness}>
            <input
              type="range"
              min={1}
              max={10}
              value={el.strokeWidth}
              onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {el.strokeWidth}px
            </span>
          </Section>
        </>
      )}

      {/* ── Sticky Note Properties ────────────────────── */}
      {el.type === "sticky-note" && (
        <>
          <ColorPicker
            value={el.noteColor}
            onChange={(c) => update({ noteColor: c })}
            label={labels.backgroundColor}
          />
          <Section title={labels.noteContent}>
            <textarea
              value={el.noteContent}
              onChange={(e) => update({ noteContent: e.target.value })}
              rows={4}
              className="w-full resize-y rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-accent focus:outline-none"
              placeholder={labels.noteContent}
            />
          </Section>
        </>
      )}

      {/* ── Freehand Properties ───────────────────────── */}
      {el.type === "freehand" && (
        <>
          <ColorPicker
            value={el.strokeColor}
            onChange={(c) => update({ strokeColor: c })}
            label={labels.drawColor}
          />
          <Section title={labels.drawThickness}>
            <input
              type="range"
              min={1}
              max={20}
              value={el.strokeWidth}
              onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {el.strokeWidth}px
            </span>
          </Section>
        </>
      )}

      {/* ── Rectangle / Ellipse Properties ────────────── */}
      {(el.type === "rectangle" || el.type === "ellipse") && (
        <>
          <div className="flex gap-3">
            <ColorPicker
              value={el.borderColor}
              onChange={(c) => update({ borderColor: c })}
              label={labels.borderColor}
            />
            <ColorPicker
              value={el.fillColor}
              onChange={(c) => update({ fillColor: c })}
              label={labels.fillColor}
              allowTransparent
            />
          </div>
          <Section title={labels.strokeWidth}>
            <input
              type="range"
              min={1}
              max={20}
              value={el.strokeWidth}
              onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {el.strokeWidth}px
            </span>
          </Section>
        </>
      )}

      {/* ── Arrow Properties ──────────────────────────── */}
      {el.type === "arrow" && (
        <>
          <ColorPicker
            value={el.strokeColor}
            onChange={(c) => update({ strokeColor: c })}
            label={labels.drawColor}
          />
          <Section title={labels.drawThickness}>
            <input
              type="range"
              min={1}
              max={20}
              value={el.strokeWidth}
              onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {el.strokeWidth}px
            </span>
          </Section>
          <Section title={labels.arrowSize}>
            <input
              type="range"
              min={4}
              max={30}
              value={el.headSize}
              onChange={(e) => update({ headSize: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {el.headSize}px
            </span>
          </Section>
        </>
      )}

      {/* ── Text Box Properties ───────────────────────── */}
      {el.type === "text-box" && (
        <>
          <Section title={labels.fontFamily}>
            <select
              value={el.fontFamily}
              onChange={(e) => update({ fontFamily: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </Section>

          <Section title={labels.fontSize}>
            <input
              type="number"
              min={8}
              max={200}
              value={el.fontSize}
              onChange={(e) =>
                update({ fontSize: Math.max(8, Number(e.target.value)) })
              }
              className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
            />
          </Section>

          <Section title="">
            <div className="flex items-center gap-1">
              <ToggleBtn
                active={el.bold}
                onClick={() => update({ bold: !el.bold })}
                title={labels.bold}
              >
                <Bold size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={el.italic}
                onClick={() => update({ italic: !el.italic })}
                title={labels.italic}
              >
                <Italic size={14} />
              </ToggleBtn>
              <div className="mx-1 h-5 w-px bg-border" />
              <ToggleBtn
                active={el.align === "left"}
                onClick={() => update({ align: "left" as TextAlign })}
                title={labels.alignLeft}
              >
                <AlignLeft size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={el.align === "center"}
                onClick={() => update({ align: "center" as TextAlign })}
                title={labels.alignCenter}
              >
                <AlignCenter size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={el.align === "right"}
                onClick={() => update({ align: "right" as TextAlign })}
                title={labels.alignRight}
              >
                <AlignRight size={14} />
              </ToggleBtn>
            </div>
          </Section>

          <div className="flex gap-3">
            <ColorPicker
              value={el.fontColor}
              onChange={(c) => update({ fontColor: c })}
              label={labels.fontColor}
            />
            <ColorPicker
              value={el.backgroundColor}
              onChange={(c) => update({ backgroundColor: c })}
              label={labels.backgroundColor}
              allowTransparent
            />
          </div>
        </>
      )}

      {/* ── Stamp Properties ──────────────────────────── */}
      {el.type === "stamp" && (
        <ColorPicker
          value={el.color}
          onChange={(c) => update({ color: c })}
          label={labels.fontColor}
        />
      )}

      {/* ── Opacity (shared) ──────────────────────────── */}
      <Section title={labels.opacity}>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={el.opacity}
          onChange={(e) => update({ opacity: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <span className="text-xs text-foreground-muted">
          {Math.round(el.opacity * 100)}%
        </span>
      </Section>

      {/* ── Layer Order ───────────────────────────────── */}
      <Section title={labels.layerOrder}>
        <div className="flex gap-1">
          <LayerBtn
            onClick={() =>
              dispatch({ type: "MOVE_LAYER", id: el.id, direction: "top" })
            }
            title={labels.bringToFront}
          >
            <ChevronsUp size={14} />
          </LayerBtn>
          <LayerBtn
            onClick={() =>
              dispatch({ type: "MOVE_LAYER", id: el.id, direction: "up" })
            }
            title={labels.bringForward}
          >
            <ArrowUp size={14} />
          </LayerBtn>
          <LayerBtn
            onClick={() =>
              dispatch({ type: "MOVE_LAYER", id: el.id, direction: "down" })
            }
            title={labels.sendBackward}
          >
            <ArrowDown size={14} />
          </LayerBtn>
          <LayerBtn
            onClick={() =>
              dispatch({ type: "MOVE_LAYER", id: el.id, direction: "bottom" })
            }
            title={labels.sendToBack}
          >
            <ChevronsDown size={14} />
          </LayerBtn>
        </div>
      </Section>

      {/* ── Comment (shared, optional) ────────────────── */}
      <Section title={labels.addComment}>
        <textarea
          value={el.comment ?? ""}
          onChange={(e) => update({ comment: e.target.value })}
          rows={3}
          className="w-full resize-y rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-accent focus:outline-none"
          placeholder={labels.commentPlaceholder}
        />
      </Section>

      {/* ── Delete ────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => dispatch({ type: "DELETE_ELEMENT", id: el.id })}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
      >
        <Trash2 size={14} />
        {labels.deleteElement}
      </button>
    </div>
  );
}

// ─── Helper Components ──────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {title && (
        <label className="mb-1 block text-xs text-foreground-muted">
          {title}
        </label>
      )}
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-4 text-xs text-foreground-muted">{label}</span>
      <input
        type="number"
        min={min}
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
      />
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-accent/10 text-accent"
          : "text-foreground-muted hover:bg-background-muted"
      }`}
    >
      {children}
    </button>
  );
}

function LayerBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:bg-background-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}
