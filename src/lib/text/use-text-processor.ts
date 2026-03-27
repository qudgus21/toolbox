"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { TextResult } from "./types";
import { getProcessor } from "./processor-registry";

// Tools whose output is stats-only (count/analysis)
const COUNT_TOOLS = new Set([
  "word-counter",
  "character-counter",
  "text-statistics",
  "keyword-density",
]);

// Tools that don't require text input
const NO_INPUT_TOOLS = new Set([
  "lorem-ipsum",
  "password-generator",
  "random-string",
  "uuid-generator",
]);

// Async processors that need useEffect instead of useMemo
const ASYNC_TOOLS = new Set(["hash-generator"]);

// Tools that benefit from debounce (expensive computation)
const DEBOUNCED_TOOLS = new Set(["text-diff", "regex-tester", "text-statistics", "keyword-density"]);

const DEBOUNCE_MS = 150;

export function isCountTool(slug: string): boolean {
  return COUNT_TOOLS.has(slug);
}

export function isNoInputTool(slug: string): boolean {
  return NO_INPUT_TOOLS.has(slug);
}

export function useTextResult(
  slug: string,
  input: string,
  input2: string,
  options: Record<string, unknown>,
): TextResult | null {
  const [asyncResult, setAsyncResult] = useState<TextResult | null>(null);
  const [processor, setProcessor] = useState<((input: string, options?: Record<string, unknown>) => TextResult | Promise<TextResult>) | null>(null);
  const [processorLoaded, setProcessorLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [debouncedInput2, setDebouncedInput2] = useState(input2);
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

    return () => { cancelled = true; };
  }, [slug]);

  // Debounce input for expensive tools
  const needsDebounce = DEBOUNCED_TOOLS.has(slug);

  // Stabilize options reference — object is recreated every render by the parent
  const optionsKey = JSON.stringify(options);
  const stableOptions = useMemo(() => options, [optionsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!needsDebounce) {
      setDebouncedInput(input);
      setDebouncedInput2(input2);
      setDebouncedOptions(stableOptions);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedInput(input);
      setDebouncedInput2(input2);
      setDebouncedOptions(stableOptions);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, input2, stableOptions, needsDebounce]);

  // Effective inputs (debounced or direct)
  const effectiveInput = needsDebounce ? debouncedInput : input;
  const effectiveInput2 = needsDebounce ? debouncedInput2 : input2;
  const effectiveOptions = needsDebounce ? debouncedOptions : stableOptions;

  // Sync result for non-async tools
  const syncResult = useMemo(() => {
    if (!processorLoaded || !processor) return null;
    if (ASYNC_TOOLS.has(slug)) return null;

    // For no-input tools and count/stats tools, always run the processor (show 0 stats)
    const isNoInput = NO_INPUT_TOOLS.has(slug);
    const isCount = COUNT_TOOLS.has(slug);
    if (!isNoInput && !isCount && !effectiveInput) return null;

    try {
      // For dual-input tools (text-diff), pass input2 via options
      const mergedOptions = { ...effectiveOptions, input2: effectiveInput2 };
      const result = processor(effectiveInput, mergedOptions);

      // If the processor returns a Promise, ignore it here (handled by async path)
      if (result && typeof (result as Promise<TextResult>).then === "function") return null;
      return result as TextResult;
    } catch {
      return { output: "", stats: {} };
    }
  }, [slug, effectiveInput, effectiveInput2, effectiveOptions, processor, processorLoaded]);

  // Async result for hash-generator etc.
  useEffect(() => {
    if (!processorLoaded || !processor) return;
    if (!ASYNC_TOOLS.has(slug)) return;
    if (!effectiveInput) {
      setAsyncResult(null);
      return;
    }

    let cancelled = false;
    const mergedOptions = { ...effectiveOptions, input2: effectiveInput2 };

    Promise.resolve(processor(effectiveInput, mergedOptions)).then((result) => {
      if (!cancelled) setAsyncResult(result);
    }).catch(() => {
      if (!cancelled) setAsyncResult({ output: "", stats: {} });
    });

    return () => { cancelled = true; };
  }, [slug, effectiveInput, effectiveInput2, effectiveOptions, processor, processorLoaded]);

  if (ASYNC_TOOLS.has(slug)) return asyncResult;
  return syncResult;
}
