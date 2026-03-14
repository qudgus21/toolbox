"use client";

import { useState, useRef, useEffect } from "react";
import { PRESET_COLORS } from "./editor-types";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  allowTransparent?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  label,
  allowTransparent = false,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const isTransparent = value === "transparent";

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label className="mb-1 block text-xs text-foreground-muted">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:border-foreground-muted"
      >
        {isTransparent ? (
          <div className="relative h-5 w-5 overflow-hidden rounded-sm border border-border">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute left-0 top-0 h-[141%] w-px origin-top-left rotate-45 bg-red-500" />
          </div>
        ) : (
          <div
            className="h-5 w-5 rounded-sm border border-border"
            style={{ backgroundColor: value }}
          />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-border bg-background-elevated p-2 shadow-lg">
          <div className="grid grid-cols-5 gap-1">
            {allowTransparent && (
              <button
                type="button"
                onClick={() => {
                  onChange("transparent");
                  setOpen(false);
                }}
                className={`relative h-6 w-6 overflow-hidden rounded-sm border transition-transform hover:scale-110 ${
                  isTransparent
                    ? "border-accent ring-1 ring-accent"
                    : "border-border"
                }`}
              >
                <div className="absolute inset-0 bg-white" />
                <div className="absolute left-0 top-0 h-[141%] w-px origin-top-left rotate-45 bg-red-500" />
              </button>
            )}
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  onChange(color);
                  setOpen(false);
                }}
                className={`h-6 w-6 rounded-sm border transition-transform hover:scale-110 ${
                  value === color
                    ? "border-accent ring-1 ring-accent"
                    : "border-border"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <input
              type="color"
              value={isTransparent ? "#000000" : value}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
            />
            <input
              type="text"
              value={isTransparent ? "" : value}
              placeholder="#000000"
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
              }}
              className="h-7 flex-1 rounded border border-border bg-background px-1 text-xs text-foreground"
            />
          </div>
        </div>
      )}
    </div>
  );
}
