"use client";

import { useCallback, useEffect, useState } from "react";
import { Crop, Ruler, RotateCcw } from "lucide-react";
import type { CropArea, CropPageMode, CropMargins } from "@/lib/pdf/processors/crop";

export interface CropLabels {
  title: string;
  dragHint: string;
  resetCrop: string;
  changeFile: string;
  cropButton: string;
  modeArea: string;
  modeAreaDesc: string;
  modeMargins: string;
  modeMarginsDesc: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  marginUnit: string;
  pageModeLabel: string;
  pageModeAll: string;
  pageModeCurrent: string;
  pageModeRange: string;
  pageRangePlaceholder: string;
  pageOf: string;
  resetAll: string;
  noCropArea: string;
  loadingPdf?: string;
}

interface CropOptionsProps {
  cropArea: CropArea | null;
  margins: CropMargins;
  onMarginsChange: (margins: CropMargins) => void;
  cropMode: "area" | "margins";
  onCropModeChange: (mode: "area" | "margins") => void;
  pageMode: CropPageMode;
  onPageModeChange: (mode: CropPageMode) => void;
  pageRange: string;
  onPageRangeChange: (range: string) => void;
  pageCount: number;
  onResetAll: () => void;
  labels: CropLabels;
}

export function CropOptions({
  cropArea,
  margins,
  onMarginsChange,
  cropMode,
  onCropModeChange,
  pageMode,
  onPageModeChange,
  pageRange,
  onPageRangeChange,
  pageCount,
  onResetAll,
  labels,
}: CropOptionsProps) {
  const handleMarginChange = useCallback(
    (key: keyof CropMargins, value: string) => {
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0) {
        onMarginsChange({ ...margins, [key]: num });
      }
    },
    [margins, onMarginsChange],
  );

  return (
    <div className="space-y-5">
      {/* 리셋 */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onResetAll}
          className="text-xs font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer"
        >
          {labels.resetAll}
        </button>
      </div>

      {/* 모드 선택 */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onCropModeChange("area")}
          className={`w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-all cursor-pointer ${
            cropMode === "area"
              ? "border-accent bg-accent-muted"
              : "border-border hover:border-foreground-subtle/30"
          }`}
        >
          <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            cropMode === "area" ? "bg-accent text-white" : "bg-background-muted text-foreground-subtle"
          }`}>
            <Crop className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{labels.modeArea}</p>
            <p className="text-xs text-foreground-subtle mt-0.5">{labels.modeAreaDesc}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onCropModeChange("margins")}
          className={`w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-all cursor-pointer ${
            cropMode === "margins"
              ? "border-accent bg-accent-muted"
              : "border-border hover:border-foreground-subtle/30"
          }`}
        >
          <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            cropMode === "margins" ? "bg-accent text-white" : "bg-background-muted text-foreground-subtle"
          }`}>
            <Ruler className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{labels.modeMargins}</p>
            <p className="text-xs text-foreground-subtle mt-0.5">{labels.modeMarginsDesc}</p>
          </div>
        </button>
      </div>

      {/* 여백 입력 (margins 모드) */}
      {cropMode === "margins" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <div key={side} className="space-y-1">
                <label className="text-xs font-medium text-foreground-subtle">
                  {labels[`margin${side.charAt(0).toUpperCase() + side.slice(1)}` as keyof CropLabels] as string}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={margins[side]}
                    onChange={(e) => handleMarginChange(side, e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground-subtle">
                    {labels.marginUnit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 크롭 영역 상태 (area 모드) */}
      {cropMode === "area" && (
        <div className={`rounded-lg border px-3 py-2.5 text-center text-sm ${
          cropArea
            ? "border-accent/30 bg-accent-muted text-accent"
            : "border-border bg-background-muted text-foreground-subtle"
        }`}>
          {cropArea ? (
            <span className="font-medium">
              {Math.round(cropArea.width * 100)}% × {Math.round(cropArea.height * 100)}%
            </span>
          ) : (
            labels.noCropArea
          )}
        </div>
      )}

      {/* 구분선 */}
      <div className="border-t border-border" />

      {/* 페이지 적용 범위 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">{labels.pageModeLabel}</p>

        <div className="space-y-2">
          {(["all", "current", "range"] as const).map((mode) => (
            <label
              key={mode}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <input
                type="radio"
                name="page-mode"
                checked={pageMode === mode}
                onChange={() => onPageModeChange(mode)}
                className="h-4 w-4 accent-accent cursor-pointer"
              />
              <span className="text-sm text-foreground">
                {mode === "all" && labels.pageModeAll}
                {mode === "current" && labels.pageModeCurrent}
                {mode === "range" && labels.pageModeRange}
              </span>
            </label>
          ))}
        </div>

        {/* 페이지 범위 입력 */}
        {pageMode === "range" && (
          <input
            type="text"
            value={pageRange}
            onChange={(e) => onPageRangeChange(e.target.value)}
            placeholder={labels.pageRangePlaceholder}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-foreground-subtle/50"
          />
        )}
      </div>
    </div>
  );
}
