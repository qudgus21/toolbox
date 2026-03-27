import type { TextResult } from "../types";

type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "toggle";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const caseType = ((options?.caseType as string) || "upper") as CaseType;

  if (!input) return { output: "", stats: { caseType } };

  let output: string;

  switch (caseType) {
    case "upper":
      output = input.toUpperCase();
      break;
    case "lower":
      output = input.toLowerCase();
      break;
    case "title":
      output = input.replace(
        /\b\w/g,
        (ch) => ch.toUpperCase()
      );
      break;
    case "sentence":
      output = toSentenceCase(input);
      break;
    case "camel":
      output = toCamelCase(input);
      break;
    case "pascal":
      output = toPascalCase(input);
      break;
    case "snake":
      output = toDelimitedCase(input, "_");
      break;
    case "kebab":
      output = toDelimitedCase(input, "-");
      break;
    case "constant":
      output = toDelimitedCase(input, "_").toUpperCase();
      break;
    case "toggle":
      output = input
        .split("")
        .map((ch) =>
          ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()
        )
        .join("");
      break;
    default:
      output = input;
  }

  return { output, stats: { caseType } };
}

function toSentenceCase(text: string): string {
  return text.replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
}

function splitWords(text: string): string[] {
  // Split on spaces, underscores, hyphens, and camelCase boundaries
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_\-]+/)
    .filter((w) => w.length > 0);
}

function toCamelCase(text: string): string {
  const words = splitWords(text);
  if (words.length === 0) return "";
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("")
  );
}

function toPascalCase(text: string): string {
  const words = splitWords(text);
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function toDelimitedCase(text: string, delimiter: string): string {
  const words = splitWords(text);
  return words.map((w) => w.toLowerCase()).join(delimiter);
}
