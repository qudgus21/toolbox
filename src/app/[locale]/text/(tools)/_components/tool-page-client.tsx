"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ToolPageLayout } from "@/lib/ui";
import { sendEvent } from "@/lib/analytics";
import { addRecentTool } from "@/lib/storage";
import type { TextDictionary } from "@/lib/i18n/text-config";
import { useTextResult, isCountTool, isNoInputTool } from "@/lib/text/use-text-processor";
import { TextInputArea } from "./text-input-area";
import { TextOutputArea } from "./text-output-area";
import { StatsDisplay } from "./stats-display";
import { ToolOptions } from "./tool-options";
import { RelatedTools } from "./related-tools";

interface TextToolPageClientProps {
  slug: string;
  locale: string;
  title: string;
  description: string;
  backHref: string;
  labels: TextDictionary["common"];
  toolOptions: Record<string, string>;
  statsLabels: Record<string, string>;
  toolNames: Record<string, { title: string }>;
  processorMessages: Record<string, string>;
  dualInput?: boolean;
  noInput?: boolean;
}

// Tools whose output should be displayed with the stats component
const STATS_TOOLS = new Set([
  "word-counter",
  "character-counter",
  "text-statistics",
  "keyword-density",
  "find-duplicates",
]);

// Generate tools that use a "Generate" button to trigger (not real-time)
const GENERATE_BUTTON_TOOLS = new Set([
  "password-generator",
  "random-string",
  "uuid-generator",
]);

export function TextToolPageClient({
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
  dualInput,
  noInput,
}: TextToolPageClientProps) {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [options, setOptions] = useState<Record<string, unknown>>({});

  // For generate-button tools, we use a trigger counter to force re-evaluation
  const [generateTrigger, setGenerateTrigger] = useState(0);
  const isGenerateButton = GENERATE_BUTTON_TOOLS.has(slug);
  const isStats = STATS_TOOLS.has(slug);
  const isNone = noInput ?? isNoInputTool(slug);

  // Inject translated messages + trigger into options for processors
  const baseOptions = { ...options, _messages: processorMessages };
  const effectiveOptions = isGenerateButton
    ? { ...baseOptions, _trigger: generateTrigger }
    : baseOptions;

  const result = useTextResult(slug, input, input2, effectiveOptions);

  // Track tool usage
  const trackedRef = useRef(false);
  useEffect(() => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      addRecentTool(slug);
      sendEvent("tool_view", { app: "text", tool_slug: slug });
    }
  }, [slug]);

  // Track first input
  const inputTrackedRef = useRef(false);
  useEffect(() => {
    if (input && !inputTrackedRef.current) {
      inputTrackedRef.current = true;
      sendEvent("tool_input", { app: "text", tool_slug: slug });
    }
  }, [input, slug]);

  const handleGenerate = useCallback(() => {
    setGenerateTrigger((n) => n + 1);
    sendEvent("tool_generate", { app: "text", tool_slug: slug });
  }, [slug]);

  // Auto-generate once on mount for generate-button tools
  const autoGenRef = useRef(false);
  useEffect(() => {
    if (isGenerateButton && !autoGenRef.current) {
      autoGenRef.current = true;
      setGenerateTrigger(1);
    }
  }, [isGenerateButton]);

  const inputLabels = {
    clear: labels.clear,
  };

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
      />

      {/* Generate button for no-input generator tools */}
      {isGenerateButton && (
        <div className="flex justify-center my-5">
          <button
            type="button"
            onClick={handleGenerate}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-hover px-10 py-3.5 text-base font-bold text-accent-foreground shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span className="flex items-center justify-center gap-2">
              {labels.process}
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* Main content area — always show both panels side-by-side */}
      <div
        className={cn(
          "mt-4 flex flex-col gap-4",
          !isNone && "lg:flex-row lg:items-start",
          isNone && !isGenerateButton && "lg:flex-row lg:items-start",
        )}
      >
        {/* Input area(s) */}
        {!isNone && (
          <div className={cn("flex-1 min-w-0", dualInput && "flex flex-col gap-4 lg:flex-[1]")}>
            <TextInputArea
              value={input}
              onChange={setInput}
              label={dualInput ? `${labels.input} (A)` : labels.input}
              placeholder={labels.inputPlaceholder}
              labels={inputLabels}
            />
            {dualInput && (
              <TextInputArea
                value={input2}
                onChange={setInput2}
                label={`${labels.input} (B)`}
                placeholder={labels.inputPlaceholder}
                labels={inputLabels}
              />
            )}
          </div>
        )}

        {/* Output area — always visible */}
        <div className={cn(
          "flex-1 min-w-0",
          isNone && !isGenerateButton && "w-full",
        )}>
          {isStats ? (
            <StatsDisplay stats={result?.stats} labels={statsLabels} />
          ) : (
            <TextOutputArea
              value={result?.output ?? ""}
              label={labels.output}
              copyLabel={labels.copyToClipboard}
              copiedLabel={labels.copied}
              downloadLabel={labels.downloadAsFile}
            />
          )}
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
