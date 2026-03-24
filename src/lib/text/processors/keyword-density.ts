import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const minLength = (options?.minLength as number) ?? 3;
  const topN = (options?.topN as number) ?? 20;
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input || !input.trim()) {
    return { output: msg.noInput ?? "No text provided.", stats: { totalWords: 0 } };
  }

  const words = input
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}'-]/gu, "").toLowerCase())
    .filter((w) => w.length >= minLength);

  const totalWords = words.length;
  const freq = new Map<string, number>();
  for (const w of words) {
    freq.set(w, (freq.get(w) || 0) + 1);
  }

  const sorted = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN);

  const lblKeyword = msg.densityKeyword ?? "Keyword";
  const lblCount = msg.densityCount ?? "Count";
  const lblDensity = msg.densityDensity ?? "Density";
  const lblTitle = msg.densityTitle ?? "=== Keyword Density Analysis ===";
  const lblTotalWords = msg.densityTotalWords ?? "Total words";
  const lblMinLength = msg.densityMinLength ?? "min length";
  const lblUniqueKeywords = msg.densityUniqueKeywords ?? "Unique keywords";

  const maxWordLen = Math.max(...sorted.map(([w]) => w.length), lblKeyword.length);
  const header = `${lblKeyword.padEnd(maxWordLen)}  ${lblCount}  ${lblDensity}`;
  const separator = "-".repeat(header.length);

  const rows = sorted.map(([word, count]) => {
    const density = ((count / totalWords) * 100).toFixed(2);
    return `${word.padEnd(maxWordLen)}  ${String(count).padStart(5)}  ${density.padStart(6)}%`;
  });

  const output = [
    lblTitle,
    "",
    `${lblTotalWords} (${lblMinLength} ${minLength}): ${totalWords}`,
    `${lblUniqueKeywords}: ${freq.size}`,
    "",
    header,
    separator,
    ...rows,
  ].join("\n");

  return {
    output,
    stats: {
      totalWords,
      uniqueKeywords: freq.size,
      topKeyword: sorted.length > 0 ? sorted[0][0] : "",
      topKeywordCount: sorted.length > 0 ? sorted[0][1] : 0,
    },
  };
}
