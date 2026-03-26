"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { CalculatorResult } from "./types";
import { getProcessor } from "./processor-registry";

// Tools that benefit from debounce (expensive computation)
const DEBOUNCED_TOOLS = new Set([
  "scientific-calculator",
  "matrix-calculator",
  "regression",
  "subnet-calculator",
]);

const DEBOUNCE_MS = 150;

export function useCalculatorResult(
  slug: string,
  fields: Record<string, unknown>,
  options: Record<string, unknown>,
): CalculatorResult | null {
  const [processor, setProcessor] = useState<
    ((fields: Record<string, unknown>, options?: Record<string, unknown>) => CalculatorResult | Promise<CalculatorResult>) | null
  >(null);
  const [processorLoaded, setProcessorLoaded] = useState(false);
  const [asyncResult, setAsyncResult] = useState<CalculatorResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedFields, setDebouncedFields] = useState(fields);
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

  // Stabilize fields and options references
  const fieldsKey = JSON.stringify(fields);
  const stableFields = useMemo(() => fields, [fieldsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const optionsKey = JSON.stringify(options);
  const stableOptions = useMemo(() => options, [optionsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const needsDebounce = DEBOUNCED_TOOLS.has(slug);

  useEffect(() => {
    if (!needsDebounce) {
      setDebouncedFields(stableFields);
      setDebouncedOptions(stableOptions);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedFields(stableFields);
      setDebouncedOptions(stableOptions);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [stableFields, stableOptions, needsDebounce]);

  const effectiveFields = needsDebounce ? debouncedFields : stableFields;
  const effectiveOptions = needsDebounce ? debouncedOptions : stableOptions;

  // Sync result
  const syncResult = useMemo(() => {
    if (!processorLoaded || !processor) return null;
    try {
      const result = processor(effectiveFields, effectiveOptions);

      if (result && typeof (result as Promise<CalculatorResult>).then === "function") return null;
      return result as CalculatorResult;
    } catch {
      return { output: "" };
    }
  }, [slug, effectiveFields, effectiveOptions, processor, processorLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Async result fallback
  useEffect(() => {
    if (!processorLoaded || !processor) return;
    let cancelled = false;

    const result = processor(effectiveFields, effectiveOptions);
    if (!result || typeof (result as Promise<CalculatorResult>).then !== "function") return;

    (result as Promise<CalculatorResult>)
      .then((r) => {
        if (!cancelled) setAsyncResult(r);
      })
      .catch(() => {
        if (!cancelled) setAsyncResult({ output: "" });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, effectiveFields, effectiveOptions, processor, processorLoaded]);

  return syncResult ?? asyncResult;
}
