"use client";

import { useCallback, useMemo, useState } from "react";
import {
  PenLine,
  AtSign,
  User,
  Calendar,
  Type,
  Plus,
  Pencil,
  Trash2,
  Copy,
  ChevronDown,
} from "lucide-react";
import {
  DATE_FORMATS,
  DEFAULT_SIGNATURE_SIZE,
  DEFAULT_INITIALS_SIZE,
  DEFAULT_TEXT_FIELD,
  generateSignId,
  type SignElement,
  type SignPdfLabels,
  type SignatureData,
  type DateFormatKey,
  type SignFieldType,
} from "./sign-types";
import type { SignDispatch } from "./use-sign-store";
import type { SignState } from "./sign-types";

interface SignOptionsPanelProps {
  state: SignState;
  dispatch: SignDispatch;
  labels: SignPdfLabels;
}

export function SignOptionsPanel({ state, dispatch, labels }: SignOptionsPanelProps) {
  const { elements, selectedElementId, activePageIndex, savedSignature, savedInitials, userName, dateFormat } = state;
  const selectedElement = elements.find((e) => e.id === selectedElementId) ?? null;

  // Count placed elements per type
  const placedCounts = useMemo(() => {
    const counts: Record<SignFieldType, number> = { signature: 0, initials: 0, name: 0, date: 0, text: 0 };
    for (const el of elements) counts[el.type]++;
    return counts;
  }, [elements]);

  // ─── Add to Document ──────────────────────────────────────
  const addSignature = useCallback(() => {
    if (!savedSignature) {
      dispatch({ type: "OPEN_CREATE_MODAL", target: "signature" });
      return;
    }
    const el: SignElement = {
      id: generateSignId(),
      type: "signature",
      pageIndex: activePageIndex,
      x: 100,
      y: 100,
      width: DEFAULT_SIGNATURE_SIZE.width,
      height: DEFAULT_SIGNATURE_SIZE.height,
      rotation: 0,
      opacity: 1,
      imageDataUrl: savedSignature.imageDataUrl,
    };
    dispatch({ type: "ADD_ELEMENT", element: el });
  }, [savedSignature, activePageIndex, dispatch]);

  const addInitials = useCallback(() => {
    if (!savedInitials) {
      dispatch({ type: "OPEN_CREATE_MODAL", target: "initials" });
      return;
    }
    const el: SignElement = {
      id: generateSignId(),
      type: "initials",
      pageIndex: activePageIndex,
      x: 100,
      y: 100,
      width: DEFAULT_INITIALS_SIZE.width,
      height: DEFAULT_INITIALS_SIZE.height,
      rotation: 0,
      opacity: 1,
      imageDataUrl: savedInitials.imageDataUrl,
    };
    dispatch({ type: "ADD_ELEMENT", element: el });
  }, [savedInitials, activePageIndex, dispatch]);

  const addName = useCallback(() => {
    if (!userName.trim()) return;
    const el: SignElement = {
      id: generateSignId(),
      type: "name",
      pageIndex: activePageIndex,
      x: 100,
      y: 200,
      width: DEFAULT_TEXT_FIELD.width,
      height: DEFAULT_TEXT_FIELD.height,
      rotation: 0,
      opacity: 1,
      content: userName,
      fontFamily: DEFAULT_TEXT_FIELD.fontFamily,
      fontSize: DEFAULT_TEXT_FIELD.fontSize,
      fontColor: DEFAULT_TEXT_FIELD.fontColor,
    };
    dispatch({ type: "ADD_ELEMENT", element: el });
  }, [userName, activePageIndex, dispatch]);

  const addDate = useCallback(() => {
    const dateStr = DATE_FORMATS[dateFormat].format(new Date());
    const el: SignElement = {
      id: generateSignId(),
      type: "date",
      pageIndex: activePageIndex,
      x: 100,
      y: 250,
      width: DEFAULT_TEXT_FIELD.width,
      height: DEFAULT_TEXT_FIELD.height,
      rotation: 0,
      opacity: 1,
      content: dateStr,
      fontFamily: DEFAULT_TEXT_FIELD.fontFamily,
      fontSize: DEFAULT_TEXT_FIELD.fontSize,
      fontColor: DEFAULT_TEXT_FIELD.fontColor,
    };
    dispatch({ type: "ADD_ELEMENT", element: el });
  }, [dateFormat, activePageIndex, dispatch]);

  const [customText, setCustomText] = useState("");

  const addText = useCallback(() => {
    if (!customText.trim()) return;
    const el: SignElement = {
      id: generateSignId(),
      type: "text",
      pageIndex: activePageIndex,
      x: 100,
      y: 300,
      width: DEFAULT_TEXT_FIELD.width,
      height: DEFAULT_TEXT_FIELD.height,
      rotation: 0,
      opacity: 1,
      content: customText,
      fontFamily: DEFAULT_TEXT_FIELD.fontFamily,
      fontSize: DEFAULT_TEXT_FIELD.fontSize,
      fontColor: DEFAULT_TEXT_FIELD.fontColor,
    };
    dispatch({ type: "ADD_ELEMENT", element: el });
    setCustomText("");
  }, [customText, activePageIndex, dispatch]);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* ─── Required Section ─────────────────────────────── */}
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-700">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {labels.requiredSection}
        </h4>

        {/* Signature */}
        <FieldCard
          icon={<PenLine className="h-4 w-4" />}
          label={labels.fieldSignature}
          count={placedCounts.signature}
          countLabel={labels.placedCount}
          preview={savedSignature}
          emptyText={labels.noSignatureYet}
          emptyAction={labels.clickToCreate}
          onEdit={() => dispatch({ type: "OPEN_CREATE_MODAL", target: "signature" })}
          onAdd={addSignature}
        />
      </div>

      {/* ─── Optional Section ─────────────────────────────── */}
      <div className="flex-1 p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {labels.optionalSection}
        </h4>

        {/* Initials */}
        <FieldCard
          icon={<AtSign className="h-4 w-4" />}
          label={labels.fieldInitials}
          count={placedCounts.initials}
          countLabel={labels.placedCount}
          preview={savedInitials}
          emptyText={labels.noInitialsYet}
          emptyAction={labels.clickToCreate}
          onEdit={() => dispatch({ type: "OPEN_CREATE_MODAL", target: "initials" })}
          onAdd={addInitials}
        />

        {/* Name */}
        <div className="mb-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{labels.fieldName}</span>
              {placedCounts.name > 0 && <CountBadge count={placedCounts.name} />}
            </div>
            <button
              onClick={addName}
              disabled={!userName.trim()}
              className="cursor-pointer rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600 disabled:cursor-default disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label={labels.addToDocument}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => dispatch({ type: "SET_USER_NAME", name: e.target.value })}
            placeholder={labels.namePlaceholder}
            className="w-full rounded border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-red-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        {/* Date */}
        <div className="mb-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{labels.fieldDate}</span>
              {placedCounts.date > 0 && <CountBadge count={placedCounts.date} />}
            </div>
            <button
              onClick={addDate}
              className="cursor-pointer rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label={labels.addToDocument}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <select
              value={dateFormat}
              onChange={(e) => dispatch({ type: "SET_DATE_FORMAT", format: e.target.value as DateFormatKey })}
              className="w-full appearance-none rounded border border-zinc-200 bg-white px-3 py-1.5 pr-8 text-sm text-zinc-900 outline-none focus:border-red-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            >
              {(Object.keys(DATE_FORMATS) as DateFormatKey[]).map((key) => (
                <option key={key} value={key}>
                  {DATE_FORMATS[key].label} — {DATE_FORMATS[key].format(new Date())}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>

        {/* Text */}
        <div className="mb-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{labels.fieldText}</span>
              {placedCounts.text > 0 && <CountBadge count={placedCounts.text} />}
            </div>
            <button
              onClick={addText}
              disabled={!customText.trim()}
              className="cursor-pointer rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600 disabled:cursor-default disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label={labels.addToDocument}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addText();
            }}
            placeholder={labels.textPlaceholder}
            className="w-full rounded border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-red-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* ─── Selected Element Properties ──────────────────── */}
      {selectedElement && (
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-700">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {labels.selectedElement}
          </h4>

          {/* Position */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <NumberInput
              label="X"
              value={Math.round(selectedElement.x)}
              onChange={(v) => dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, changes: { x: v } })}
            />
            <NumberInput
              label="Y"
              value={Math.round(selectedElement.y)}
              onChange={(v) => dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, changes: { y: v } })}
            />
          </div>

          {/* Size */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <NumberInput
              label="W"
              value={Math.round(selectedElement.width)}
              onChange={(v) => dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, changes: { width: v } })}
            />
            <NumberInput
              label="H"
              value={Math.round(selectedElement.height)}
              onChange={(v) => dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, changes: { height: v } })}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: "DUPLICATE_ELEMENT", id: selectedElement.id })}
              className="cursor-pointer flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <Copy className="h-4 w-4" />
              {labels.duplicate}
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE_ELEMENT", id: selectedElement.id })}
              className="cursor-pointer flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 className="h-4 w-4" />
              {labels.deleteElement}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Field Card (Signature / Initials) ──────────────────────
function FieldCard({
  icon,
  label,
  count,
  countLabel,
  preview,
  emptyText,
  emptyAction,
  onEdit,
  onAdd,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  countLabel: string;
  preview: SignatureData | null;
  emptyText: string;
  emptyAction: string;
  onEdit: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="mb-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
          {count > 0 && <CountBadge count={count} />}
        </div>
        <div className="flex items-center gap-1">
          {preview && (
            <button
              onClick={onEdit}
              className="cursor-pointer rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onAdd}
            className="cursor-pointer rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="add to document"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {preview ? (
        <div className="flex items-center justify-center rounded border border-zinc-100 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview.imageDataUrl}
            alt={label}
            className="max-h-[50px] max-w-full object-contain"
          />
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="cursor-pointer flex w-full items-center justify-center rounded border-2 border-dashed border-zinc-200 py-4 text-sm text-zinc-500 transition-colors hover:border-red-300 hover:text-red-500 dark:text-zinc-400 dark:border-zinc-700 dark:hover:border-red-600 dark:hover:text-red-400"
        >
          <span>{emptyText} — {emptyAction}</span>
        </button>
      )}
    </div>
  );
}

// ─── Count Badge ────────────────────────────────────────────
function CountBadge({ count }: { count: number }) {
  return (
    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-100 px-1.5 text-[10px] font-bold text-red-600 dark:bg-red-900/40 dark:text-red-400">
      {count}
    </span>
  );
}

// ─── Number Input ───────────────────────────────────────────
function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium text-zinc-400">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v)) onChange(v);
        }}
        className="w-full rounded border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900 outline-none focus:border-red-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
    </div>
  );
}
