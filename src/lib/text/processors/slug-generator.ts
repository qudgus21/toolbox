import type { TextResult } from "../types";

const TRANSLITERATION_MAP: Record<string, string> = {
  // Latin extended
  "a": "a", "e": "e", "i": "i", "o": "o", "u": "u",
  "c": "c", "n": "n", "s": "s", "z": "z", "y": "y",
  // German
  "\u00e4": "ae", "\u00f6": "oe", "\u00fc": "ue", "\u00df": "ss",
  "\u00c4": "Ae", "\u00d6": "Oe", "\u00dc": "Ue",
  // French / Spanish / Portuguese / etc.
  "\u00e0": "a", "\u00e1": "a", "\u00e2": "a", "\u00e3": "a", "\u00e5": "a",
  "\u00e8": "e", "\u00e9": "e", "\u00ea": "e", "\u00eb": "e",
  "\u00ec": "i", "\u00ed": "i", "\u00ee": "i", "\u00ef": "i",
  "\u00f2": "o", "\u00f3": "o", "\u00f4": "o", "\u00f5": "o", "\u00f8": "o",
  "\u00f9": "u", "\u00fa": "u", "\u00fb": "u",
  "\u00fd": "y", "\u00ff": "y",
  "\u00e7": "c", "\u00f1": "n",
  "\u0161": "s", "\u010d": "c", "\u0159": "r", "\u017e": "z",
  "\u0144": "n", "\u0107": "c", "\u015b": "s", "\u017a": "z",
  "\u0142": "l", "\u0105": "a", "\u0119": "e",
  // Turkish
  "\u011f": "g", "\u0131": "i", "\u015f": "s",
  // Nordic
  "\u00e6": "ae", "\u00f0": "d", "\u00fe": "th",
};

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const separator = options?.separator !== undefined ? String(options.separator) : "-";
  const lowercase = (options?.lowercase as boolean) ?? true;

  if (!input) return { output: "", stats: {} };

  let slug = input;

  // Transliterate known characters
  slug = Array.from(slug)
    .map((ch) => TRANSLITERATION_MAP[ch] || ch)
    .join("");

  // Remove accents via NFD decomposition
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (lowercase) slug = slug.toLowerCase();

  // Replace non-alphanumeric characters with separator
  slug = slug.replace(/[^a-zA-Z0-9]+/g, separator);

  // Escape separator for regex
  const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Remove leading/trailing separators
  slug = slug.replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, "g"), "");

  // Collapse multiple separators
  if (separator) {
    slug = slug.replace(
      new RegExp(`${escapedSep}{2,}`, "g"),
      separator
    );
  }

  return {
    output: slug,
    stats: { inputLength: input.length, outputLength: slug.length },
  };
}
