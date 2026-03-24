"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { TextDictionary } from "@/lib/i18n/text-config";

interface ToolOptionsProps {
  slug: string;
  options: Record<string, unknown>;
  onChange: (options: Record<string, unknown>) => void;
  labels: TextDictionary["common"];
  t: Record<string, string>;
}

// ── Shared small UI primitives ──────────────────────────────────────

function ToggleSwitch({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group">
      <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-all duration-200 cursor-pointer",
          value ? "bg-accent shadow-sm shadow-accent/30" : "bg-foreground-subtle/25 hover:bg-foreground-subtle/35",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white transition-all duration-200 shadow-sm",
            value ? "translate-x-[20px] scale-110" : "translate-x-[4px]",
          )}
        />
      </button>
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  label,
  min = 0,
  max = 9999,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <label className="flex items-center justify-between gap-2">
      <span className="text-sm font-medium text-foreground-muted">{label}</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-foreground-muted hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all duration-150 cursor-pointer text-sm font-bold"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          min={min}
          max={max}
          step={step}
          className="h-8 w-16 rounded-lg border border-border/60 bg-transparent px-2 text-center text-sm font-semibold text-foreground tabular-nums focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + step))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-foreground-muted hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all duration-150 cursor-pointer text-sm font-bold"
        >
          +
        </button>
      </div>
    </label>
  );
}

function TextInput({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground-muted">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 rounded-lg border border-border/60 bg-transparent px-3 text-sm text-foreground placeholder:text-foreground-subtle/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
      />
    </label>
  );
}

function ButtonGroup({
  options: opts,
  value,
  onChange,
  label,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-foreground-muted">{label}</span>}
      <div className="flex flex-wrap gap-1.5">
        {opts.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer",
              value === opt.value
                ? "bg-accent text-accent-foreground shadow-sm shadow-accent/25"
                : "bg-background-subtle/80 text-foreground-muted hover:text-foreground hover:bg-background-elevated hover:shadow-sm",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EncodeModeToggle({
  value,
  onChange,
  encodeLabel,
  decodeLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  encodeLabel: string;
  decodeLabel: string;
}) {
  return (
    <div className="flex rounded-xl border border-border/50 overflow-hidden bg-background-subtle/50">
      <button
        type="button"
        onClick={() => onChange("encode")}
        className={cn(
          "flex-1 px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
          value === "encode"
            ? "bg-accent text-accent-foreground shadow-sm"
            : "text-foreground-muted hover:text-foreground hover:bg-background-subtle",
        )}
      >
        {encodeLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("decode")}
        className={cn(
          "flex-1 px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
          value === "decode"
            ? "bg-accent text-accent-foreground shadow-sm"
            : "text-foreground-muted hover:text-foreground hover:bg-background-subtle",
        )}
      >
        {decodeLabel}
      </button>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────

function o<T>(options: Record<string, unknown>, key: string, fallback: T): T {
  return (options[key] as T) ?? fallback;
}

// ── Main component ──────────────────────────────────────────────────

export function ToolOptions({ slug, options, onChange, labels, t }: ToolOptionsProps) {
  const set = useCallback(
    (key: string, value: unknown) => {
      onChange({ ...options, [key]: value });
    },
    [options, onChange],
  );

  const content = renderOptions(slug, options, set, labels, t);
  if (!content) return null;

  return (
    <div className="rounded-2xl border border-border/50 bg-gradient-to-r from-background-subtle/60 to-background p-4 space-y-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-accent">{labels.options}</h3>
      {content}
    </div>
  );
}

function renderOptions(
  slug: string,
  options: Record<string, unknown>,
  set: (key: string, value: unknown) => void,
  labels: TextDictionary["common"],
  t: Record<string, string>,
): React.ReactNode {
  switch (slug) {
    // ── Transform ───────────────────────────────────────────

    case "case-converter":
      return (
        <ButtonGroup
          label={t.caseType}
          value={o(options, "caseType", "upper")}
          onChange={(v) => set("caseType", v)}
          options={[
            { value: "upper", label: t.caseUpper },
            { value: "lower", label: t.caseLower },
            { value: "title", label: t.caseTitle },
            { value: "sentence", label: t.caseSentence },
            { value: "camel", label: t.caseCamel },
            { value: "pascal", label: t.casePascal },
            { value: "snake", label: t.caseSnake },
            { value: "kebab", label: t.caseKebab },
            { value: "constant", label: t.caseConstant },
            { value: "toggle", label: t.caseToggle },
          ]}
        />
      );

    case "reverse-text":
      return (
        <ButtonGroup
          label={t.reverseMode}
          value={o(options, "mode", "characters")}
          onChange={(v) => set("mode", v)}
          options={[
            { value: "characters", label: t.characters },
            { value: "words", label: t.words },
            { value: "lines", label: t.lines },
          ]}
        />
      );

    case "text-repeater":
      return (
        <>
          <NumberInput
            label={t.repeatCount}
            value={o(options, "count", 2)}
            onChange={(v) => set("count", v)}
            min={1}
            max={10000}
          />
          <TextInput
            label={t.separator}
            value={o(options, "separator", "\n")}
            onChange={(v) => set("separator", v)}
            placeholder="\n"
          />
        </>
      );

    case "text-sort":
      return (
        <>
          <ButtonGroup
            label={t.sortDirection}
            value={o(options, "direction", "asc")}
            onChange={(v) => set("direction", v)}
            options={[
              { value: "asc", label: t.sortAZ },
              { value: "desc", label: t.sortZA },
              { value: "numeric", label: t.sortNumeric },
              { value: "length", label: t.sortByLength },
              { value: "random", label: t.sortRandom },
            ]}
          />
          <ToggleSwitch
            label={t.caseSensitive}
            value={o(options, "caseSensitive", false)}
            onChange={(v) => set("caseSensitive", v)}
          />
          <ToggleSwitch
            label={t.removeBlanks}
            value={o(options, "removeBlanks", false)}
            onChange={(v) => set("removeBlanks", v)}
          />
        </>
      );

    case "remove-duplicates":
      return (
        <>
          <ToggleSwitch
            label={t.caseSensitive}
            value={o(options, "caseSensitive", false)}
            onChange={(v) => set("caseSensitive", v)}
          />
          <ToggleSwitch
            label={t.trimLines}
            value={o(options, "trimLines", true)}
            onChange={(v) => set("trimLines", v)}
          />
        </>
      );

    case "add-line-numbers":
      return (
        <>
          <NumberInput
            label={t.startFrom}
            value={o(options, "startFrom", 1)}
            onChange={(v) => set("startFrom", v)}
            min={0}
            max={99999}
          />
          <TextInput
            label={t.separator}
            value={o(options, "separator", ". ")}
            onChange={(v) => set("separator", v)}
            placeholder=". "
          />
          <ToggleSwitch
            label={t.padZeros}
            value={o(options, "padZeros", false)}
            onChange={(v) => set("padZeros", v)}
          />
        </>
      );

    case "add-prefix-suffix":
      return (
        <>
          <TextInput
            label={t.prefix}
            value={o(options, "prefix", "")}
            onChange={(v) => set("prefix", v)}
            placeholder={t.prefixPlaceholder}
          />
          <TextInput
            label={t.suffix}
            value={o(options, "suffix", "")}
            onChange={(v) => set("suffix", v)}
            placeholder={t.suffixPlaceholder}
          />
        </>
      );

    case "join-text":
      return (
        <TextInput
          label={t.delimiter}
          value={o(options, "delimiter", ", ")}
          onChange={(v) => set("delimiter", v)}
          placeholder=", "
        />
      );

    case "split-text":
      return (
        <>
          <TextInput
            label={t.delimiter}
            value={o(options, "delimiter", ",")}
            onChange={(v) => set("delimiter", v)}
            placeholder=","
          />
          <ToggleSwitch
            label={t.trimResults}
            value={o(options, "trimResults", true)}
            onChange={(v) => set("trimResults", v)}
          />
        </>
      );

    // ── Clean ───────────────────────────────────────────────

    case "remove-line-breaks":
      return (
        <TextInput
          label={t.replacement}
          value={o(options, "replacement", " ")}
          onChange={(v) => set("replacement", v)}
          placeholder=" "
        />
      );

    case "remove-special-characters":
      return (
        <>
          <ToggleSwitch
            label={t.keepLetters}
            value={o(options, "keepLetters", true)}
            onChange={(v) => set("keepLetters", v)}
          />
          <ToggleSwitch
            label={t.keepNumbers}
            value={o(options, "keepNumbers", true)}
            onChange={(v) => set("keepNumbers", v)}
          />
          <ToggleSwitch
            label={t.keepSpaces}
            value={o(options, "keepSpaces", true)}
            onChange={(v) => set("keepSpaces", v)}
          />
          <ToggleSwitch
            label={t.keepLineBreaks}
            value={o(options, "keepLineBreaks", true)}
            onChange={(v) => set("keepLineBreaks", v)}
          />
        </>
      );

    case "remove-empty-lines":
      return (
        <ToggleSwitch
          label={t.removeWhitespaceOnly}
          value={o(options, "removeWhitespaceOnly", true)}
          onChange={(v) => set("removeWhitespaceOnly", v)}
        />
      );

    case "trim-text":
      return (
        <ButtonGroup
          label={t.trimMode}
          value={o(options, "mode", "both")}
          onChange={(v) => set("mode", v)}
          options={[
            { value: "both", label: t.trimBoth },
            { value: "start", label: t.trimStart },
            { value: "end", label: t.trimEnd },
          ]}
        />
      );

    // ── Find ────────────────────────────────────────────────

    case "find-and-replace":
      return (
        <>
          <TextInput
            label={t.find}
            value={o(options, "find", "")}
            onChange={(v) => set("find", v)}
            placeholder={t.searchPlaceholder}
          />
          <TextInput
            label={t.replaceWith}
            value={o(options, "replace", "")}
            onChange={(v) => set("replace", v)}
            placeholder={t.replacePlaceholder}
          />
          <ToggleSwitch
            label={t.useRegex}
            value={o(options, "useRegex", false)}
            onChange={(v) => set("useRegex", v)}
          />
          <ToggleSwitch
            label={t.caseSensitive}
            value={o(options, "caseSensitive", false)}
            onChange={(v) => set("caseSensitive", v)}
          />
        </>
      );

    case "regex-tester":
      return (
        <>
          <TextInput
            label={t.pattern}
            value={o(options, "pattern", "")}
            onChange={(v) => set("pattern", v)}
            placeholder={t.regexPlaceholder}
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-foreground">{t.flags}</span>
            <div className="flex gap-2">
              {(["g", "i", "m", "s"] as const).map((flag) => {
                const flags = o(options, "flags", "g") as string;
                const active = flags.includes(flag);
                return (
                  <button
                    key={flag}
                    type="button"
                    onClick={() => {
                      const newFlags = active
                        ? flags.replace(flag, "")
                        : flags + flag;
                      set("flags", newFlags);
                    }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-mono font-bold transition-all duration-150 cursor-pointer",
                      active
                        ? "bg-accent text-accent-foreground shadow-sm shadow-accent/25"
                        : "bg-background-subtle/80 text-foreground-muted hover:bg-background-elevated hover:text-foreground",
                    )}
                  >
                    {flag}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      );

    case "filter-lines":
      return (
        <>
          <TextInput
            label={t.pattern}
            value={o(options, "pattern", "")}
            onChange={(v) => set("pattern", v)}
            placeholder={t.filterPlaceholder}
          />
          <ButtonGroup
            label={t.filterMode}
            value={o(options, "mode", "include")}
            onChange={(v) => set("mode", v)}
            options={[
              { value: "include", label: t.includeMatches },
              { value: "exclude", label: t.excludeMatches },
            ]}
          />
          <ToggleSwitch
            label={t.useRegex}
            value={o(options, "useRegex", false)}
            onChange={(v) => set("useRegex", v)}
          />
          <ToggleSwitch
            label={t.caseSensitive}
            value={o(options, "caseSensitive", false)}
            onChange={(v) => set("caseSensitive", v)}
          />
        </>
      );

    case "number-extractor":
      return (
        <>
          <ToggleSwitch
            label={t.includeDecimals}
            value={o(options, "includeDecimals", true)}
            onChange={(v) => set("includeDecimals", v)}
          />
          <ToggleSwitch
            label={t.includeNegative}
            value={o(options, "includeNegative", true)}
            onChange={(v) => set("includeNegative", v)}
          />
        </>
      );

    // ── Encode ──────────────────────────────────────────────

    case "base64":
    case "url-encode":
    case "html-encode":
    case "unicode-escape":
    case "morse-code":
    case "binary-converter":
    case "hex-converter":
      return (
        <EncodeModeToggle
          value={o(options, "mode", "encode")}
          onChange={(v) => set("mode", v)}
          encodeLabel={labels.encode}
          decodeLabel={labels.decode}
        />
      );

    // ── Generate ────────────────────────────────────────────

    case "lorem-ipsum":
      return (
        <>
          <NumberInput
            label={t.paragraphs}
            value={o(options, "paragraphs", 3)}
            onChange={(v) => set("paragraphs", v)}
            min={1}
            max={100}
          />
          <NumberInput
            label={t.wordsPerParagraph}
            value={o(options, "wordsPerParagraph", 50)}
            onChange={(v) => set("wordsPerParagraph", v)}
            min={5}
            max={500}
          />
        </>
      );

    case "slug-generator":
      return (
        <>
          <TextInput
            label={t.separator}
            value={o(options, "separator", "-")}
            onChange={(v) => set("separator", v)}
            placeholder="-"
          />
          <ToggleSwitch
            label={t.lowercase}
            value={o(options, "lowercase", true)}
            onChange={(v) => set("lowercase", v)}
          />
        </>
      );

    case "password-generator":
      return (
        <>
          <NumberInput
            label={t.length}
            value={o(options, "length", 16)}
            onChange={(v) => set("length", v)}
            min={4}
            max={128}
          />
          <NumberInput
            label={t.count}
            value={o(options, "count", 5)}
            onChange={(v) => set("count", v)}
            min={1}
            max={100}
          />
          <ToggleSwitch
            label={t.uppercaseAZ}
            value={o(options, "uppercase", true)}
            onChange={(v) => set("uppercase", v)}
          />
          <ToggleSwitch
            label={t.lowercaseAZ}
            value={o(options, "lowercase", true)}
            onChange={(v) => set("lowercase", v)}
          />
          <ToggleSwitch
            label={t.numbers09}
            value={o(options, "numbers", true)}
            onChange={(v) => set("numbers", v)}
          />
          <ToggleSwitch
            label={t.symbols}
            value={o(options, "symbols", true)}
            onChange={(v) => set("symbols", v)}
          />
          <ToggleSwitch
            label={t.excludeSimilar}
            value={o(options, "excludeSimilar", false)}
            onChange={(v) => set("excludeSimilar", v)}
          />
        </>
      );

    case "random-string":
      return (
        <>
          <NumberInput
            label={t.length}
            value={o(options, "length", 32)}
            onChange={(v) => set("length", v)}
            min={1}
            max={1000}
          />
          <NumberInput
            label={t.count}
            value={o(options, "count", 5)}
            onChange={(v) => set("count", v)}
            min={1}
            max={100}
          />
          <ButtonGroup
            label={t.charSet}
            value={o(options, "charset", "alphanumeric")}
            onChange={(v) => set("charset", v)}
            options={[
              { value: "alphanumeric", label: t.charAlphanumeric },
              { value: "alpha", label: t.charLetters },
              { value: "numeric", label: t.charNumbers },
              { value: "hex", label: t.charHex },
              { value: "custom", label: t.charCustom },
            ]}
          />
          {(options.charset as string) === "custom" && (
            <TextInput
              label={t.customChars}
              value={o(options, "customChars", "")}
              onChange={(v) => set("customChars", v)}
              placeholder="abc123..."
            />
          )}
        </>
      );

    case "uuid-generator":
      return (
        <>
          <NumberInput
            label={t.count}
            value={o(options, "count", 5)}
            onChange={(v) => set("count", v)}
            min={1}
            max={1000}
          />
          <ToggleSwitch
            label={t.uppercase}
            value={o(options, "uppercase", false)}
            onChange={(v) => set("uppercase", v)}
          />
        </>
      );

    case "hash-generator":
      return (
        <ButtonGroup
          label={t.algorithm}
          value={o(options, "algorithm", "SHA-256")}
          onChange={(v) => set("algorithm", v)}
          options={[
            { value: "SHA-1", label: "SHA-1" },
            { value: "SHA-256", label: "SHA-256" },
            { value: "SHA-384", label: "SHA-384" },
            { value: "SHA-512", label: "SHA-512" },
          ]}
        />
      );

    case "json-formatter":
      return (
        <>
          <ButtonGroup
            label={t.mode}
            value={o(options, "mode", "format")}
            onChange={(v) => set("mode", v)}
            options={[
              { value: "format", label: t.formatMode },
              { value: "minify", label: t.minifyMode },
              { value: "validate", label: t.validateMode },
            ]}
          />
          {o(options, "mode", "format") === "format" && (
            <NumberInput
              label={t.indentSpaces}
              value={o(options, "indent", 2)}
              onChange={(v) => set("indent", v)}
              min={1}
              max={8}
            />
          )}
        </>
      );

    case "keyword-density":
      return (
        <>
          <NumberInput
            label={t.minWordLength}
            value={o(options, "minLength", 3)}
            onChange={(v) => set("minLength", v)}
            min={1}
            max={20}
          />
          <NumberInput
            label={t.topNKeywords}
            value={o(options, "topN", 20)}
            onChange={(v) => set("topN", v)}
            min={5}
            max={100}
          />
        </>
      );

    // No options for these tools
    case "word-counter":
    case "character-counter":
    case "text-statistics":
    case "find-duplicates":
    case "remove-extra-spaces":
    case "remove-emojis":
    case "remove-html-tags":
    case "remove-accents":
    case "email-extractor":
    case "url-extractor":
    case "rot13":
    case "text-diff":
      return null;

    default:
      return null;
  }
}
