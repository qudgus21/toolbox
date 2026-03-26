"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ToolPageLayout } from "@/lib/ui";
import { sendEvent } from "@/lib/analytics";
import { addRecentTool } from "@/lib/storage";
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
}: CalculatorToolPageClientProps) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.default !== undefined) initial[field.name] = field.default;
    }
    return initial;
  });

  // Inject translated messages into options for processors
  const effectiveOptions = { _messages: processorMessages };

  // Preview: check if enough fields have default values to show a preview result
  const hasUserInput = fields.some((f) => {
    const v = values[f.name];
    if (v === undefined || v === null || v === "") return false;
    // If value equals default, it's not user input
    if (f.default !== undefined && v === f.default) return false;
    return true;
  });

  const hasDefaults = fields.some((f) => f.default !== undefined);
  const isPreview = !hasUserInput && hasDefaults;

  const result = useCalculatorResult(slug, values, effectiveOptions);

  // Track tool usage
  const trackedRef = useRef(false);
  useEffect(() => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      addRecentTool(slug);
      sendEvent("tool_view", { app: "calculator", tool_slug: slug });
    }
  }, [slug]);

  // Track first input
  const inputTrackedRef = useRef(false);
  useEffect(() => {
    if (hasUserInput && !inputTrackedRef.current) {
      inputTrackedRef.current = true;
      sendEvent("calculatorInput", { app: "calculator", tool_slug: slug });
    }
  }, [hasUserInput, slug]);

  // Track result
  const resultTrackedRef = useRef(false);
  useEffect(() => {
    if (result?.output && !resultTrackedRef.current) {
      resultTrackedRef.current = true;
      sendEvent("calculatorResult", { app: "calculator", tool_slug: slug });
    }
  }, [result, slug]);

  const handleValuesChange = useCallback(
    (newValues: Record<string, unknown>) => {
      setValues(newValues);
    },
    [],
  );

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
            onCopy={() => sendEvent("calculatorCopy", { app: "calculator", tool_slug: slug, output_length: result?.output?.length ?? 0 })}
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
