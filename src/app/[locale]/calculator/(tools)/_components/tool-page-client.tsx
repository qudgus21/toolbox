"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ToolPageLayout } from "@/lib/ui";
import { useTrack, useToolViewTracking, calculatorEvents } from "@/lib/analytics";
import type { CalculatorDictionary } from "@/lib/i18n/calculator-config";
import type { CalculatorInputType, CalculatorFieldDefinition } from "@/lib/calculator/tools";
import { useCalculatorResult } from "@/lib/calculator/use-calculator-processor";
import { CalculatorInputArea } from "./calculator-input-area";
import { CalculatorOutputArea } from "./calculator-output-area";
import { RelatedTools } from "./related-tools";

interface CalculatorToolPageClientProps {
  slug: string;
  locale: string;
  title: string;
  description: string;
  backHref: string;
  labels: CalculatorDictionary["common"];
  fieldLabels: Record<string, string>;
  fieldOptions: Record<string, string>;
  statsLabels: Record<string, string>;
  toolNames: Record<string, { title: string }>;
  processorMessages: Record<string, string>;
  inputType: CalculatorInputType;
  fields: CalculatorFieldDefinition[];
  previewData?: string;
}

export function CalculatorToolPageClient({
  slug,
  locale,
  title,
  description,
  backHref,
  labels,
  fieldLabels,
  fieldOptions,
  statsLabels,
  toolNames,
  processorMessages,
  inputType,
  fields,
  previewData,
}: CalculatorToolPageClientProps) {
  // Generate preview defaults for required fields without explicit defaults
  const previewDefaults = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.default !== undefined) {
        defaults[field.name] = field.default;
      } else if (field.type === "number" && field.required) {
        // Only fill required number fields for preview
        defaults[field.name] = field.preview ?? (field.min && field.min > 0 ? field.min : 1);
      } else if ((field.type === "select" || field.type === "radio") && field.options?.length) {
        defaults[field.name] = field.options[0].value;
      }
    }
    return defaults;
  })[0];

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.default !== undefined) initial[field.name] = field.default;
    }
    return initial;
  });

  // Inject translated messages into options for processors
  const effectiveOptions = { _messages: processorMessages };

  // Preview: check if user has entered any value beyond defaults
  const hasUserInput = inputType === "fields"
    ? fields.some((f) => {
        const v = values[f.name];
        if (v === undefined || v === null || v === "") return false;
        if (f.default !== undefined && v === f.default) return false;
        return true;
      })
    : !!(
        (inputType === "expression" && (values.expression as string)?.trim()) ||
        (inputType === "dataset" && (values.dataset as string)?.trim())
      );

  // For preview, merge preview defaults with current values
  const canPreviewFields = inputType === "fields" && fields.some((f) => f.type === "number" && f.required);
  const canPreviewData = (inputType === "expression" || inputType === "dataset") && !!previewData;
  const isPreview = !hasUserInput && (canPreviewFields || canPreviewData);

  const effectiveValues = (() => {
    if (!isPreview) return values;
    if (canPreviewFields) {
      return { ...previewDefaults, ...Object.fromEntries(Object.entries(values).filter(([, v]) => v !== undefined && v !== null && v !== "")) };
    }
    if (canPreviewData && previewData) {
      const dataKey = inputType === "expression" ? "expression" : "dataset";
      return { ...values, [dataKey]: previewData };
    }
    return values;
  })();

  const result = useCalculatorResult(slug, effectiveValues, effectiveOptions);

  // Auto-detect IP for subnet calculator
  useEffect(() => {
    if (slug !== "subnet-calculator") return;
    const fetchIp = async () => {
      const apis = [
        { url: "https://api.ipify.org?format=json", parse: (d: Record<string, string>) => d.ip },
        { url: "https://api.seeip.org/jsonip", parse: (d: Record<string, string>) => d.ip },
        { url: "https://ipapi.co/json/", parse: (d: Record<string, string>) => d.ip },
      ];
      for (const api of apis) {
        try {
          const r = await fetch(api.url, { signal: AbortSignal.timeout(3000) });
          const data = await r.json();
          const ip = api.parse(data);
          if (ip) {
            setValues((prev) => (prev.ipAddress ? prev : { ...prev, ipAddress: ip }));
            return;
          }
        } catch {
          // Try next API
        }
      }
    };
    fetchIp();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Analytics ──
  const track = useTrack("calculator", calculatorEvents);
  const maxStageRef = useRef<string>("view");
  useToolViewTracking("calculator", slug, () => maxStageRef.current);

  // Track first input
  const inputTrackedRef = useRef(false);
  useEffect(() => {
    if (hasUserInput && !inputTrackedRef.current) {
      inputTrackedRef.current = true;
      maxStageRef.current = "input";
      track.toolInput({ tool_slug: slug });
    }
  }, [hasUserInput, slug, track]);

  // Track first result
  const resultTrackedRef = useRef(false);
  useEffect(() => {
    if (result?.output && !resultTrackedRef.current) {
      resultTrackedRef.current = true;
      maxStageRef.current = "result";
      track.toolResult({ tool_slug: slug });
    }
  }, [result, slug, track]);

  const handleValuesChange = useCallback(
    (newValues: Record<string, unknown>) => {
      setValues(newValues);
    },
    [],
  );

  const handleCopy = useCallback(() => {
    maxStageRef.current = "copy";
    track.toolCopy({ tool_slug: slug, output_length: result?.output?.length ?? 0 });
  }, [slug, result, track]);

  return (
    <ToolPageLayout
      title={title}
      description={description}
      backHref={backHref}
      backLabel={labels.backToAll}
      linkComponent={Link}
    >
      {/* Main content area */}
      <div
        className={cn(
          "mt-4 flex flex-col gap-4 lg:flex-row lg:items-start",
        )}
      >
        {/* Input area */}
        <div className="flex-1 min-w-0">
          <CalculatorInputArea
            fields={fields}
            values={values}
            onChange={handleValuesChange}
            fieldLabels={fieldLabels}
            fieldOptions={fieldOptions}
            inputType={inputType}
            label={labels.input}
            clearLabel={labels.clear}
          />
        </div>

        {/* Output area */}
        <div className="flex-1 min-w-0">
          <CalculatorOutputArea
            result={result}
            isPreview={isPreview}
            label={labels.output}
            copyLabel={labels.copyToClipboard}
            copiedLabel={labels.copied}
            breakdownLabel={labels.breakdown}
            allResultsLabel={labels.allResults}
            statsLabels={statsLabels}
            processorLabels={processorMessages}
            booleanYes={fieldOptions.yes}
            booleanNo={fieldOptions.no}
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
