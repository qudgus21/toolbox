import type { ConverterResult } from "../types";

function parseFlexibleDate(input: string): Date | null {
  const trimmed = input.trim();

  // ISO format
  let date = new Date(trimmed);
  if (!isNaN(date.getTime())) return date;

  // US format: mm/dd/yyyy
  const usMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    date = new Date(
      parseInt(usMatch[3], 10),
      parseInt(usMatch[1], 10) - 1,
      parseInt(usMatch[2], 10),
    );
    if (!isNaN(date.getTime())) return date;
  }

  // EU format: dd.mm.yyyy or dd-mm-yyyy
  const euMatch = trimmed.match(/^(\d{1,2})[.\-](\d{1,2})[.\-](\d{4})$/);
  if (euMatch) {
    date = new Date(
      parseInt(euMatch[3], 10),
      parseInt(euMatch[2], 10) - 1,
      parseInt(euMatch[1], 10),
    );
    if (!isNaN(date.getTime())) return date;
  }

  // Natural language: "March 25, 2024" or "25 March 2024"
  date = new Date(trimmed);
  if (!isNaN(date.getTime())) return date;

  return null;
}

function formatISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatUS(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${m}/${d}/${date.getFullYear()}`;
}

function formatEU(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${d}/${m}/${date.getFullYear()}`;
}

function formatLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function formatRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs < 0;
  const suffix = isFuture ? "from now" : "ago";

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return isFuture ? "Tomorrow" : "Yesterday";
  if (days < 7) return `${days} days ${suffix}`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ${suffix}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ${suffix}`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ${suffix}`;
}

type OutputFormat = "ISO" | "US" | "EU" | "long" | "short" | "relative";

const FORMAT_MAP: Record<OutputFormat, (d: Date) => string> = {
  ISO: formatISO,
  US: formatUS,
  EU: formatEU,
  long: formatLong,
  short: formatShort,
  relative: formatRelative,
};

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const date = parseFlexibleDate(trimmed);
    if (!date) return { output: "" };

    const rawFormat = (options?.format as string) ?? (options?.outputFormat as string) ?? "iso";
    // Normalize: UI sends lowercase, map accepts mixed case
    const FORMAT_KEY_MAP: Record<string, OutputFormat> = {
      iso: "ISO", us: "US", eu: "EU", long: "long", short: "short", relative: "relative",
      ISO: "ISO", US: "US", EU: "EU",
    };
    const outputFormat = FORMAT_KEY_MAP[rawFormat] ?? "ISO";
    const formatter = FORMAT_MAP[outputFormat] ?? formatISO;
    const output = formatter(date);

    const table = [
      { label: "ISO 8601", value: formatISO(date) },
      { label: "US (MM/DD/YYYY)", value: formatUS(date) },
      { label: "EU (DD/MM/YYYY)", value: formatEU(date) },
      { label: "Long", value: formatLong(date) },
      { label: "Short", value: formatShort(date) },
      { label: "Relative", value: formatRelative(date) },
      { label: "Unix Timestamp", value: String(Math.floor(date.getTime() / 1000)) },
    ];

    return {
      output,
      table,
      stats: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
        outputFormat,
      },
    };
  } catch {
    return { output: "" };
  }
}
