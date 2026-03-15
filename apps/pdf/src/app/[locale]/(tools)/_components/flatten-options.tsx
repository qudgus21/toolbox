"use client";

import { useEffect, useState } from "react";
import { cn } from "@toolbox/utils";
import {
  FormInput,
  MessageSquare,
  Layers,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import type { FlattenAnalysis } from "@/lib/processors/flatten";

export interface FlattenLabels {
  flattenButton: string;
  formFieldsLabel: string;
  formFieldsDesc: string;
  annotationsLabel: string;
  annotationsDesc: string;
  analysisTitle: string;
  formFieldsFound: string;
  annotationsFound: string;
  noFormFields: string;
  noAnnotations: string;
  nothingToFlatten: string;
  annotationType: Record<string, string>;
}

interface FlattenOptionsProps {
  onChange: (options: Record<string, unknown>) => void;
  labels: FlattenLabels;
  analysis: FlattenAnalysis | null;
  analysisLoading: boolean;
}

interface ToggleDef {
  key: "formFields" | "annotations";
  icon: typeof FormInput;
  defaultOn: boolean;
}

const toggleDefs: ToggleDef[] = [
  { key: "formFields", icon: FormInput, defaultOn: true },
  { key: "annotations", icon: MessageSquare, defaultOn: true },
];

export function FlattenOptions({
  onChange,
  labels,
  analysis,
  analysisLoading,
}: FlattenOptionsProps) {
  const [toggleState, setToggleState] = useState<Record<string, boolean>>({
    formFields: true,
    annotations: true,
  });

  const emit = (ts: Record<string, boolean>) => {
    onChange(ts);
  };

  const handleToggle = (key: string) => {
    const next = { ...toggleState, [key]: !toggleState[key] };
    setToggleState(next);
    emit(next);
  };

  // 분석 결과에 따라 토글 자동 설정
  useEffect(() => {
    if (!analysis) return;
    const next = {
      formFields: analysis.hasFormFields,
      annotations: analysis.hasAnnotations,
    };
    setToggleState(next);
    emit(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  const labelMap: Record<string, { title: string; desc: string }> = {
    formFields: {
      title: labels.formFieldsLabel,
      desc: labels.formFieldsDesc,
    },
    annotations: {
      title: labels.annotationsLabel,
      desc: labels.annotationsDesc,
    },
  };

  const nothingToFlatten =
    analysis &&
    !analysis.hasFormFields &&
    !analysis.hasAnnotations;

  const hasSelection = toggleState.formFields || toggleState.annotations;

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-background-elevated p-4">
      {/* 분석 결과 */}
      <div>
        <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide mb-3">
          {labels.analysisTitle}
        </p>

        {analysisLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-12 rounded-xl bg-background-muted animate-pulse"
              />
            ))}
          </div>
        ) : analysis ? (
          <div className="space-y-2">
            {/* 폼 필드 현황 */}
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                analysis.hasFormFields
                  ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
                  : "border-border bg-background-muted",
              )}
            >
              <FormInput
                className={cn(
                  "h-4 w-4 shrink-0",
                  analysis.hasFormFields
                    ? "text-blue-500"
                    : "text-foreground-subtle",
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {analysis.hasFormFields
                    ? labels.formFieldsFound.replace(
                        "{count}",
                        String(analysis.formFieldCount),
                      )
                    : labels.noFormFields}
                </p>
              </div>
              {analysis.hasFormFields && (
                <FileCheck className="h-4 w-4 text-blue-500 shrink-0" />
              )}
            </div>

            {/* 주석 현황 */}
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                analysis.hasAnnotations
                  ? "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30"
                  : "border-border bg-background-muted",
              )}
            >
              <MessageSquare
                className={cn(
                  "h-4 w-4 shrink-0",
                  analysis.hasAnnotations
                    ? "text-purple-500"
                    : "text-foreground-subtle",
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {analysis.hasAnnotations
                    ? labels.annotationsFound.replace(
                        "{count}",
                        String(analysis.annotationCount),
                      )
                    : labels.noAnnotations}
                </p>
                {analysis.hasAnnotations &&
                  Object.keys(analysis.annotationTypes).length > 0 && (
                    <p className="text-xs text-foreground-subtle mt-0.5">
                      {Object.entries(analysis.annotationTypes)
                        .map(
                          ([type, count]) =>
                            `${labels.annotationType[type] ?? type} (${count})`,
                        )
                        .join(", ")}
                    </p>
                  )}
              </div>
              {analysis.hasAnnotations && (
                <FileCheck className="h-4 w-4 text-purple-500 shrink-0" />
              )}
            </div>

            {nothingToFlatten && (
              <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 dark:border-amber-800 dark:bg-amber-950/30">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  {labels.nothingToFlatten}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 옵션 토글 */}
      {analysis && !nothingToFlatten && (
        <div>
          <div className="space-y-2 rounded-xl border border-border bg-background-elevated p-3">
            {toggleDefs.map((t) => {
              const Icon = t.icon;
              const isOn = toggleState[t.key];
              const tl = labelMap[t.key];
              const hasItems =
                t.key === "formFields"
                  ? analysis.hasFormFields
                  : analysis.hasAnnotations;

              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => handleToggle(t.key)}
                  disabled={!hasItems}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                    hasItems ? "cursor-pointer" : "cursor-not-allowed opacity-40",
                    isOn && hasItems
                      ? "bg-accent-muted/50"
                      : "hover:bg-background-muted",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isOn && hasItems
                        ? "text-accent"
                        : "text-foreground-subtle",
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-bold transition-colors",
                        isOn && hasItems
                          ? "text-foreground"
                          : "text-foreground-muted",
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
                      isOn && hasItems
                        ? "bg-accent"
                        : "bg-foreground-subtle/30",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                        isOn && hasItems
                          ? "translate-x-5"
                          : "translate-x-0.5",
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
