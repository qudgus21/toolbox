"use client";

import { useState } from "react";
import { cn } from "@toolbox/utils";
import {
  Monitor,
  Mail,
  Sparkles,
  ChevronDown,
  ImageDown,
  FileX2,
  Code2,
  FormInput,
  MessageSquareOff,
  Layers,
} from "lucide-react";
import type { WebOptimizePreset } from "@/lib/processors/web-optimize";

export interface WebOptimizeLabels {
  presetLabel: string;
  presetScreen: string;
  presetScreenDesc: string;
  presetEmail: string;
  presetEmailDesc: string;
  presetQuality: string;
  presetQualityDesc: string;
  advancedLabel: string;
  toggleImages: string;
  toggleImagesDesc: string;
  toggleMetadata: string;
  toggleMetadataDesc: string;
  toggleJsActions: string;
  toggleJsActionsDesc: string;
  toggleForms: string;
  toggleFormsDesc: string;
  toggleAnnotations: string;
  toggleAnnotationsDesc: string;
  toggleStreams: string;
  toggleStreamsDesc: string;
  optimizeButton: string;
}

interface WebOptimizeOptionsProps {
  onChange: (options: Record<string, unknown>) => void;
  labels: WebOptimizeLabels;
}

const presets: {
  value: WebOptimizePreset;
  icon: typeof Monitor;
  color: string;
  selectedBg: string;
  selectedBorder: string;
  iconColor: string;
  dpi: string;
}[] = [
  {
    value: "screen",
    icon: Monitor,
    color: "text-blue-500",
    selectedBg: "bg-blue-50 dark:bg-blue-950/30",
    selectedBorder: "border-blue-400 dark:border-blue-500",
    iconColor: "text-blue-500",
    dpi: "96 DPI",
  },
  {
    value: "email",
    icon: Mail,
    color: "text-orange-500",
    selectedBg: "bg-orange-50 dark:bg-orange-950/30",
    selectedBorder: "border-orange-400 dark:border-orange-500",
    iconColor: "text-orange-500",
    dpi: "72 DPI",
  },
  {
    value: "quality",
    icon: Sparkles,
    color: "text-emerald-500",
    selectedBg: "bg-emerald-50 dark:bg-emerald-950/30",
    selectedBorder: "border-emerald-400 dark:border-emerald-500",
    iconColor: "text-emerald-500",
    dpi: "150 DPI",
  },
];

interface Toggle {
  key: string;
  icon: typeof ImageDown;
  defaultOn: boolean;
}

const toggles: Toggle[] = [
  { key: "images", icon: ImageDown, defaultOn: true },
  { key: "metadata", icon: FileX2, defaultOn: true },
  { key: "jsActions", icon: Code2, defaultOn: true },
  { key: "forms", icon: FormInput, defaultOn: true },
  { key: "annotations", icon: MessageSquareOff, defaultOn: false },
  { key: "streams", icon: Layers, defaultOn: true },
];

export function WebOptimizeOptions({ onChange, labels }: WebOptimizeOptionsProps) {
  const [preset, setPreset] = useState<WebOptimizePreset>("screen");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [toggleState, setToggleState] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const t of toggles) init[t.key] = t.defaultOn;
    return init;
  });

  const emit = (p: WebOptimizePreset, ts: Record<string, boolean>) => {
    onChange({ preset: p, ...ts });
  };

  const handlePreset = (p: WebOptimizePreset) => {
    setPreset(p);
    emit(p, toggleState);
  };

  const handleToggle = (key: string) => {
    const next = { ...toggleState, [key]: !toggleState[key] };
    setToggleState(next);
    emit(preset, next);
  };

  const labelMap: Record<WebOptimizePreset, { title: string; desc: string }> = {
    screen: { title: labels.presetScreen, desc: labels.presetScreenDesc },
    email: { title: labels.presetEmail, desc: labels.presetEmailDesc },
    quality: { title: labels.presetQuality, desc: labels.presetQualityDesc },
  };

  const toggleLabelMap: Record<string, { title: string; desc: string }> = {
    images: { title: labels.toggleImages, desc: labels.toggleImagesDesc },
    metadata: { title: labels.toggleMetadata, desc: labels.toggleMetadataDesc },
    jsActions: { title: labels.toggleJsActions, desc: labels.toggleJsActionsDesc },
    forms: { title: labels.toggleForms, desc: labels.toggleFormsDesc },
    annotations: { title: labels.toggleAnnotations, desc: labels.toggleAnnotationsDesc },
    streams: { title: labels.toggleStreams, desc: labels.toggleStreamsDesc },
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-background-elevated p-4">
      {/* 프리셋 선택 */}
      <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide">{labels.presetLabel}</p>
      <div className="grid grid-cols-1 gap-2">
        {presets.map((p) => {
          const Icon = p.icon;
          const isSelected = preset === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => handlePreset(p.value)}
              className={cn(
                "relative flex items-center gap-3 rounded-xl border-2 px-3 py-3 transition-all duration-200 cursor-pointer text-left",
                isSelected
                  ? cn(p.selectedBg, p.selectedBorder, "shadow-sm")
                  : "border-border bg-background-elevated hover:border-foreground-subtle/30",
              )}
            >
              {p.value === "screen" && (
                <span className="absolute -top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                  ★
                </span>
              )}
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isSelected ? p.iconColor : "text-foreground-subtle",
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-sm font-bold transition-colors",
                      isSelected ? "text-foreground" : "text-foreground-muted",
                    )}
                  >
                    {labelMap[p.value].title}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isSelected
                        ? "bg-white/60 dark:bg-white/10 text-foreground"
                        : "bg-background-muted text-foreground-subtle",
                    )}
                  >
                    {p.dpi}
                  </span>
                </div>
                <p className="text-xs text-foreground-subtle leading-tight mt-0.5">
                  {labelMap[p.value].desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 고급 옵션 토글 */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1.5 text-sm font-bold text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
      >
        {labels.advancedLabel}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            showAdvanced && "rotate-180",
          )}
        />
      </button>

      {showAdvanced && (
        <div className="space-y-2 rounded-xl border border-border bg-background-elevated p-3">
          {toggles.map((t) => {
            const Icon = t.icon;
            const isOn = toggleState[t.key];
            const tl = toggleLabelMap[t.key];
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => handleToggle(t.key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 cursor-pointer",
                  isOn
                    ? "bg-accent-muted/50"
                    : "hover:bg-background-muted",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isOn ? "text-accent" : "text-foreground-subtle",
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-bold transition-colors",
                      isOn ? "text-foreground" : "text-foreground-muted",
                    )}
                  >
                    {tl.title}
                  </p>
                  <p className="text-xs text-foreground-subtle leading-tight">
                    {tl.desc}
                  </p>
                </div>
                {/* 토글 스위치 */}
                <div
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
                    isOn ? "bg-accent" : "bg-foreground-subtle/30",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                      isOn ? "translate-x-5" : "translate-x-0.5",
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
