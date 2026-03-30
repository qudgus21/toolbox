"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ToolPageLayout } from "@/lib/ui";
import { useTrack, useToolViewTracking, converterEvents } from "@/lib/analytics";
import type { ConverterDictionary } from "@/lib/i18n/converter-config";
import type { ConverterInputType } from "@/lib/converter/tools";
import { useConverterResult } from "@/lib/converter/use-converter-processor";
import { ConverterInputArea } from "./converter-input-area";
import { ConverterOutputArea } from "./converter-output-area";
import { ToolOptions, DEFAULT_UNITS, getUnits } from "./tool-options";
import dynamic from "next/dynamic";

const RelatedTools = dynamic(() =>
  import("./related-tools").then((m) => ({ default: m.RelatedTools }))
);

interface ConverterToolPageClientProps {
  slug: string;
  locale: string;
  title: string;
  description: string;
  backHref: string;
  labels: ConverterDictionary["common"];
  toolOptions: Record<string, string>;
  statsLabels: Record<string, string>;
  toolNames: Record<string, { title: string }>;
  processorMessages: Record<string, string>;
  unitLabels?: Record<string, Record<string, string>>;
  inputType: ConverterInputType;
  dualInput?: boolean;
  toolPlaceholder?: string;
}

export function ConverterToolPageClient({
  slug,
  locale,
  title,
  description,
  backHref,
  labels,
  toolOptions,
  statsLabels,
  toolNames,
  processorMessages,
  unitLabels,
  inputType,
  dualInput,
  toolPlaceholder,
}: ConverterToolPageClientProps) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Record<string, unknown>>(() => {
    // Initialize from/to units from defaults
    const defaults = DEFAULT_UNITS[slug];
    if (defaults) {
      return { fromUnit: defaults.from, toUnit: defaults.to };
    }
    return {};
  });

  // Inject translated messages into options for processors
  const effectiveOptions = { ...options, _messages: processorMessages };

  // Preview: use default value when input is empty (unit/color)
  const previewInput = !input
    ? inputType === "unit" ? "1"
    : inputType === "color" ? "#3b82f6"
    : inputType === "dualColor" ? "#3b82f6, #ffffff"
    : ""
    : input;
  const isPreview = !input && !!previewInput;

  const result = useConverterResult(slug, previewInput, effectiveOptions);

  // ── Analytics ──
  const track = useTrack("converter", converterEvents);
  const maxStageRef = useRef<string>("view");
  useToolViewTracking("converter", slug, () => maxStageRef.current);

  // Track first input
  const inputTrackedRef = useRef(false);
  useEffect(() => {
    if (input && !inputTrackedRef.current) {
      inputTrackedRef.current = true;
      maxStageRef.current = "input";
      track.toolInput({ tool_slug: slug });
    }
  }, [input, slug, track]);

  // Track first result
  const resultTrackedRef = useRef(false);
  useEffect(() => {
    if (result?.output && !resultTrackedRef.current) {
      resultTrackedRef.current = true;
      maxStageRef.current = "result";
      track.toolResult({ tool_slug: slug });
    }
  }, [result, slug, track]);

  // Unit-specific handlers
  const unitOptions = getUnits(slug, unitLabels);
  const fromUnit = (options.fromUnit as string) ?? DEFAULT_UNITS[slug]?.from ?? unitOptions?.[0]?.value;
  const toUnit = (options.toUnit as string) ?? DEFAULT_UNITS[slug]?.to ?? unitOptions?.[1]?.value;

  const handleFromUnitChange = useCallback(
    (unit: string) => setOptions((prev) => ({ ...prev, fromUnit: unit })),
    [],
  );

  const handleToUnitChange = useCallback(
    (unit: string) => setOptions((prev) => ({ ...prev, toUnit: unit })),
    [],
  );

  const handleSwap = useCallback(() => {
    setOptions((prev) => ({
      ...prev,
      fromUnit: prev.toUnit as string,
      toUnit: prev.fromUnit as string,
    }));
    track.toolSwap({ tool_slug: slug });
  }, [slug, track]);

  const handleCopy = useCallback(() => {
    maxStageRef.current = "copy";
    track.toolCopy({ tool_slug: slug, output_length: result?.output?.length ?? 0 });
  }, [slug, result, track]);

  const isUnitType = inputType === "unit";

  return (
    <ToolPageLayout
      title={title}
      description={description}
      backHref={backHref}
      backLabel={labels.backToAll}
      linkComponent={Link}
    >
      {/* Options bar */}
      <ToolOptions
        slug={slug}
        options={options}
        onChange={setOptions}
        labels={labels}
        t={toolOptions}
        unitLabels={unitLabels}
      />

      {/* Main content area */}
      <div
        className={cn(
          "mt-4 flex flex-col gap-4 lg:flex-row lg:items-start",
        )}
      >
        {/* Input area */}
        <div className="flex-1 min-w-0">
          <ConverterInputArea
            value={input}
            onChange={setInput}
            inputType={inputType}
            label={labels.input}
            placeholder={toolPlaceholder || labels.inputPlaceholder}
            clearLabel={labels.clear}
            fromLabel={isUnitType ? labels.from : undefined}
            toLabel={isUnitType ? labels.to : undefined}
            swapLabel={isUnitType ? labels.swap : undefined}
            fromUnit={isUnitType ? fromUnit : undefined}
            toUnit={isUnitType ? toUnit : undefined}
            onFromUnitChange={isUnitType ? handleFromUnitChange : undefined}
            onToUnitChange={isUnitType ? handleToUnitChange : undefined}
            onSwap={isUnitType ? handleSwap : undefined}
            unitOptions={isUnitType ? unitOptions : undefined}
            datetimeHint={inputType === "datetime" ? toolOptions.datetimeHint : undefined}
            colorPickerLabel={labels.colorPickerLabel}
          />
        </div>

        {/* Output area */}
        <div className="flex-1 min-w-0">
          <ConverterOutputArea
            result={result}
            isPreview={isPreview}
            label={labels.output}
            copyLabel={labels.copyToClipboard}
            copiedLabel={labels.copied}
            allConversionsLabel={labels.allConversions}
            unitLabels={unitLabels?.[slug]}
            processorLabels={processorMessages}
            onCopy={handleCopy}
          />
        </div>
      </div>

      {/* Related tools */}
      <RelatedTools
        currentSlug={slug}
        locale={locale}
        title={labels.tryOtherTools}
        toolNames={toolNames}
      />
    </ToolPageLayout>
  );
}
