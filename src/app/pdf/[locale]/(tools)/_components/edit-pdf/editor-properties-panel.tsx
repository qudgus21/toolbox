"use client";

import {
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { ColorPicker } from "./color-picker";
import {
  FONT_OPTIONS,
  type EditorElement,
  type EditPdfLabels,
  type TextAlign,
} from "./editor-types";
import type { EditorDispatch } from "./use-editor-store";

interface EditorPropertiesPanelProps {
  element: EditorElement | null;
  dispatch: EditorDispatch;
  labels: EditPdfLabels;
}

export function EditorPropertiesPanel({
  element,
  dispatch,
  labels,
}: EditorPropertiesPanelProps) {
  if (!element) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-sm text-foreground-muted">
        {labels.noSelection}
      </div>
    );
  }

  const update = (changes: Partial<EditorElement>) => {
    dispatch({ type: "UPDATE_ELEMENT", id: element.id, changes });
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-3">
      {/* ── Text Properties ─────────────────────────── */}
      {element.type === "text" && (
        <>
          <Section title={labels.fontFamily}>
            <select
              value={element.fontFamily}
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
              value={element.fontSize}
              onChange={(e) =>
                update({ fontSize: Math.max(8, Number(e.target.value)) })
              }
              className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
            />
          </Section>

          <Section title="">
            <div className="flex items-center gap-1">
              <ToggleBtn
                active={element.bold}
                onClick={() => update({ bold: !element.bold })}
                title={labels.bold}
              >
                <Bold size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={element.italic}
                onClick={() => update({ italic: !element.italic })}
                title={labels.italic}
              >
                <Italic size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={element.underline}
                onClick={() => update({ underline: !element.underline })}
                title={labels.underline}
              >
                <Underline size={14} />
              </ToggleBtn>
              <div className="mx-1 h-5 w-px bg-border" />
              <ToggleBtn
                active={element.align === "left"}
                onClick={() => update({ align: "left" as TextAlign })}
                title={labels.alignLeft}
              >
                <AlignLeft size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={element.align === "center"}
                onClick={() => update({ align: "center" as TextAlign })}
                title={labels.alignCenter}
              >
                <AlignCenter size={14} />
              </ToggleBtn>
              <ToggleBtn
                active={element.align === "right"}
                onClick={() => update({ align: "right" as TextAlign })}
                title={labels.alignRight}
              >
                <AlignRight size={14} />
              </ToggleBtn>
            </div>
          </Section>

          <div className="flex gap-3">
            <ColorPicker
              value={element.fontColor}
              onChange={(c) => update({ fontColor: c })}
              label={labels.fontColor}
            />
            <ColorPicker
              value={element.backgroundColor}
              onChange={(c) => update({ backgroundColor: c })}
              label={labels.backgroundColor}
              allowTransparent
            />
          </div>
        </>
      )}

      {/* ── Shape Properties ────────────────────────── */}
      {(element.type === "rectangle" || element.type === "ellipse") && (
        <>
          <div className="flex gap-3">
            <ColorPicker
              value={element.borderColor}
              onChange={(c) => update({ borderColor: c })}
              label={labels.borderColor}
            />
            <ColorPicker
              value={element.fillColor}
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
              value={element.strokeWidth}
              onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {element.strokeWidth}px
            </span>
          </Section>
        </>
      )}

      {/* ── Line / Freehand Properties ──────────────── */}
      {(element.type === "line" || element.type === "freehand") && (
        <>
          <ColorPicker
            value={element.strokeColor}
            onChange={(c) => update({ strokeColor: c })}
            label={labels.drawColor}
          />
          <Section title={labels.drawThickness}>
            <input
              type="range"
              min={1}
              max={20}
              value={element.strokeWidth}
              onChange={(e) => update({ strokeWidth: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <span className="text-xs text-foreground-muted">
              {element.strokeWidth}px
            </span>
          </Section>
        </>
      )}

      {/* ── Symbol Properties ──────────────────────── */}
      {element.type === "symbol" && (
        <ColorPicker
          value={element.color}
          onChange={(c) => update({ color: c })}
          label={labels.fontColor}
        />
      )}

      {/* ── Opacity (shared) ───────────────────────── */}
      <Section title={labels.opacity}>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={element.opacity}
          onChange={(e) => update({ opacity: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <span className="text-xs text-foreground-muted">
          {Math.round(element.opacity * 100)}%
        </span>
      </Section>

      {/* ── Layer Order ────────────────────────────── */}
      <Section title={labels.layerOrder}>
        <div className="flex gap-1">
          <LayerBtn
            onClick={() =>
              dispatch({
                type: "MOVE_LAYER",
                id: element.id,
                direction: "top",
              })
            }
            title={labels.bringToFront}
          >
            <ChevronsUp size={14} />
          </LayerBtn>
          <LayerBtn
            onClick={() =>
              dispatch({
                type: "MOVE_LAYER",
                id: element.id,
                direction: "up",
              })
            }
            title={labels.bringForward}
          >
            <ArrowUp size={14} />
          </LayerBtn>
          <LayerBtn
            onClick={() =>
              dispatch({
                type: "MOVE_LAYER",
                id: element.id,
                direction: "down",
              })
            }
            title={labels.sendBackward}
          >
            <ArrowDown size={14} />
          </LayerBtn>
          <LayerBtn
            onClick={() =>
              dispatch({
                type: "MOVE_LAYER",
                id: element.id,
                direction: "bottom",
              })
            }
            title={labels.sendToBack}
          >
            <ChevronsDown size={14} />
          </LayerBtn>
        </div>
      </Section>

      {/* ── Delete ─────────────────────────────────── */}
      <button
        type="button"
        onClick={() => dispatch({ type: "DELETE_ELEMENT", id: element.id })}
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
