"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { ConverterResult } from "./types";
import { getProcessor } from "./processor-registry";

// Tools that benefit from debounce (expensive computation)
const DEBOUNCED_TOOLS = new Set([
  "color-converter",
  "color-palette-generator",
  "gradient-generator",
  "color-contrast-checker",
  "color-blindness-simulator",
  "json-yaml",
  "json-csv",
  "json-xml",
  "json-toml",
  "markdown-html",
  "csv-table",
  "json-typescript",
  "sql-json",
  "css-minifier",
  "tailwind-css",
]);

const DEBOUNCE_MS = 150;

export function useConverterResult(
  slug: string,
  input: string,
  options: Record<string, unknown>,
): ConverterResult | null {
  const [processor, setProcessor] = useState<
    ((input: string, options?: Record<string, unknown>) => ConverterResult | Promise<ConverterResult>) | null
  >(null);
  const [processorLoaded, setProcessorLoaded] = useState(false);
  const [asyncResult, setAsyncResult] = useState<ConverterResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [debouncedOptions, setDebouncedOptions] = useState(options);

  // Load processor on mount / slug change
  useEffect(() => {
    let cancelled = false;
    setProcessorLoaded(false);
    setProcessor(null);
    setAsyncResult(null);

    getProcessor(slug).then((proc) => {
      if (!cancelled && proc) {
        setProcessor(() => proc);
        setProcessorLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Stabilize options reference
  const optionsKey = JSON.stringify(options);
  const stableOptions = useMemo(() => options, [optionsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const needsDebounce = DEBOUNCED_TOOLS.has(slug);

  useEffect(() => {
    if (!needsDebounce) {
      setDebouncedInput(input);
      setDebouncedOptions(stableOptions);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedInput(input);
      setDebouncedOptions(stableOptions);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, stableOptions, needsDebounce]);

  const effectiveInput = needsDebounce ? debouncedInput : input;
  const effectiveOptions = needsDebounce ? debouncedOptions : stableOptions;

  // Sync result
  const syncResult = useMemo(() => {
    if (!processorLoaded || !processor) return null;
    try {
      const result = processor(effectiveInput, effectiveOptions);

      if (result && typeof (result as Promise<ConverterResult>).then === "function") return null;
      return result as ConverterResult;
    } catch {
      return { output: "" };
    }
  }, [slug, effectiveInput, effectiveOptions, processor, processorLoaded]);

  // Async result fallback
  useEffect(() => {
    if (!processorLoaded || !processor) return;
    let cancelled = false;

    const result = processor(effectiveInput, effectiveOptions);
    if (!result || typeof (result as Promise<ConverterResult>).then !== "function") return;

    (result as Promise<ConverterResult>)
      .then((r) => {
        if (!cancelled) setAsyncResult(r);
      })
      .catch(() => {
        if (!cancelled) setAsyncResult({ output: "" });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, effectiveInput, effectiveOptions, processor, processorLoaded]);

  return syncResult ?? asyncResult;
}
