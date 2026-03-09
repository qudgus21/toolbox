"use client";

import { useState } from "react";
import { cn } from "@toolbox/utils";
import { Zap, Scale, Shield, Image, Layers, TriangleAlert } from "lucide-react";

type CompressionLevel = "extreme" | "recommended" | "less";
type CompressMode = "image" | "rasterize";

interface CompressLabels {
  levelExtreme: string;
  levelExtremeDesc: string;
  levelRecommended: string;
  levelRecommendedDesc: string;
  levelLess: string;
  levelLessDesc: string;
  originalSize: string;
  compressedSize: string;
  reduction: string;
  modeImage: string;
  modeImageDesc: string;
  modeRasterize: string;
  modeRasterizeDesc: string;
  rasterizeWarning: string;
}

interface CompressOptionsProps {
  onChange: (options: Record<string, unknown>) => void;
  labels: CompressLabels;
}

const levels: {
  value: CompressionLevel;
  icon: typeof Zap;
  color: string;
  selectedBg: string;
  selectedBorder: string;
  iconColor: string;
}[] = [
  {
    value: "extreme",
    icon: Zap,
    color: "text-orange-500",
    selectedBg: "bg-orange-50 dark:bg-orange-950/30",
    selectedBorder: "border-orange-400 dark:border-orange-500",
    iconColor: "text-orange-500",
  },
  {
    value: "recommended",
    icon: Scale,
    color: "text-accent",
    selectedBg: "bg-accent-muted",
    selectedBorder: "border-accent",
    iconColor: "text-accent",
  },
  {
    value: "less",
    icon: Shield,
    color: "text-emerald-500",
    selectedBg: "bg-emerald-50 dark:bg-emerald-950/30",
    selectedBorder: "border-emerald-400 dark:border-emerald-500",
    iconColor: "text-emerald-500",
  },
];

export function CompressOptions({ onChange, labels }: CompressOptionsProps) {
  const [selected, setSelected] = useState<CompressionLevel>("recommended");
  const [mode, setMode] = useState<CompressMode>("image");

  const emit = (level: CompressionLevel, m: CompressMode) => {
    onChange({ compressionLevel: level, compressMode: m });
  };

  const handleSelect = (level: CompressionLevel) => {
    setSelected(level);
    emit(level, mode);
  };

  const handleMode = (m: CompressMode) => {
    setMode(m);
    emit(selected, m);
  };

  const labelMap: Record<CompressionLevel, { title: string; desc: string }> = {
    extreme: { title: labels.levelExtreme, desc: labels.levelExtremeDesc },
    recommended: { title: labels.levelRecommended, desc: labels.levelRecommendedDesc },
    less: { title: labels.levelLess, desc: labels.levelLessDesc },
  };

  return (
    <div className="space-y-4">
      {/* 모드 선택 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleMode("image")}
          className={cn(
            "flex items-start gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 cursor-pointer",
            mode === "image"
              ? "border-accent bg-accent-muted shadow-sm"
              : "border-border bg-background-elevated hover:border-foreground-subtle/30",
          )}
        >
          <Image
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 transition-colors",
              mode === "image" ? "text-accent" : "text-foreground-subtle",
            )}
          />
          <div>
            <p className={cn(
              "text-sm font-bold transition-colors",
              mode === "image" ? "text-foreground" : "text-foreground-muted",
            )}>
              {labels.modeImage}
            </p>
            <p className="mt-0.5 text-xs text-foreground-subtle leading-tight">
              {labels.modeImageDesc}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleMode("rasterize")}
          className={cn(
            "flex items-start gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 cursor-pointer",
            mode === "rasterize"
              ? "border-violet-400 dark:border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-sm"
              : "border-border bg-background-elevated hover:border-foreground-subtle/30",
          )}
        >
          <Layers
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 transition-colors",
              mode === "rasterize" ? "text-violet-500" : "text-foreground-subtle",
            )}
          />
          <div>
            <p className={cn(
              "text-sm font-bold transition-colors",
              mode === "rasterize" ? "text-foreground" : "text-foreground-muted",
            )}>
              {labels.modeRasterize}
            </p>
            <p className="mt-0.5 text-xs text-foreground-subtle leading-tight">
              {labels.modeRasterizeDesc}
            </p>
          </div>
        </button>
      </div>

      {/* 래스터화 경고 */}
      {mode === "rasterize" && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 dark:border-amber-600/50 bg-amber-50 dark:bg-amber-950/20 px-3.5 py-2.5">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            {labels.rasterizeWarning}
          </p>
        </div>
      )}

      {/* 압축 레벨 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {levels.map((level) => {
          const Icon = level.icon;
          const isSelected = selected === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => handleSelect(level.value)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-5 transition-all duration-200 cursor-pointer",
                isSelected
                  ? cn(level.selectedBg, level.selectedBorder, "shadow-sm")
                  : "border-border bg-background-elevated hover:border-foreground-subtle/30",
              )}
            >
              {level.value === "recommended" && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                  ★
                </span>
              )}
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  isSelected ? level.iconColor : "text-foreground-subtle",
                )}
              />
              <span
                className={cn(
                  "text-sm font-bold transition-colors",
                  isSelected ? "text-foreground" : "text-foreground-muted",
                )}
              >
                {labelMap[level.value].title}
              </span>
              <span className="text-xs text-foreground-subtle text-center leading-tight">
                {labelMap[level.value].desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
