"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { PRESET_COLORS } from "./editor-types";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  icon?: React.ReactNode;
  allowTransparent?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  label,
  icon,
  allowTransparent = false,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePos = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 4, left: rect.left });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, updatePos]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        wrapperRef.current && !wrapperRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const isTransparent = value === "transparent";

  return (
    <div className="group/tip relative" ref={wrapperRef}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 items-center gap-1 rounded-md border border-border px-1.5 transition-colors hover:border-foreground-muted"
      >
        {icon && <span className="flex items-center text-foreground-muted">{icon}</span>}
        {isTransparent ? (
          <div className="relative h-4 w-4 overflow-hidden rounded-sm border border-border">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute left-0 top-0 h-[141%] w-px origin-top-left rotate-45 bg-red-500" />
          </div>
        ) : (
          <div
            className="h-4 w-4 rounded-sm border border-border"
            style={{ backgroundColor: value }}
          />
        )}
      </button>
      {label && !open && (
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
          {label}
        </div>
      )}

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[100] rounded-lg border border-border bg-background-elevated p-2 shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          >
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
          </div>,
          document.body,
        )}
    </div>
  );
}
