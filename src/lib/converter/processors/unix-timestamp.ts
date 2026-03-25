import type { ConverterResult } from "../types";

function isTimestamp(input: string): boolean {
  return /^\d{1,13}$/.test(input.trim());
}

function relativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs < 0;
  const suffix = isFuture ? "from now" : "ago";

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ${suffix}`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ${suffix}`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ${suffix}`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ${suffix}`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ${suffix}`;
  return `${years} year${years !== 1 ? "s" : ""} ${suffix}`;
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const unit = (options?.unit as string) ?? "seconds";

    if (isTimestamp(trimmed)) {
      // Timestamp to date
      let ms = parseInt(trimmed, 10);
      if (unit === "seconds" || trimmed.length <= 10) {
        ms = ms * 1000;
      }

      const date = new Date(ms);
      if (isNaN(date.getTime())) return { output: "" };

      const timestampSec = Math.floor(ms / 1000);
      const timestampMs = ms;

      return {
        output: date.toISOString(),
        table: [
          { label: "ISO 8601", value: date.toISOString() },
          { label: "UTC", value: date.toUTCString() },
          { label: "Local", value: date.toString() },
          { label: "Unix (seconds)", value: String(timestampSec) },
          { label: "Unix (milliseconds)", value: String(timestampMs) },
          { label: "Relative", value: relativeTime(date) },
        ],
        stats: {
          timestampSeconds: timestampSec,
          timestampMilliseconds: timestampMs,
          iso: date.toISOString(),
        },
      };
    } else {
      // Date to timestamp
      const date = new Date(trimmed);
      if (isNaN(date.getTime())) return { output: "" };

      const timestampSec = Math.floor(date.getTime() / 1000);
      const timestampMs = date.getTime();
      const output =
        unit === "milliseconds" ? String(timestampMs) : String(timestampSec);

      return {
        output,
        table: [
          { label: "Unix (seconds)", value: String(timestampSec) },
          { label: "Unix (milliseconds)", value: String(timestampMs) },
          { label: "ISO 8601", value: date.toISOString() },
          { label: "UTC", value: date.toUTCString() },
          { label: "Relative", value: relativeTime(date) },
        ],
        stats: {
          timestampSeconds: timestampSec,
          timestampMilliseconds: timestampMs,
          iso: date.toISOString(),
        },
      };
    }
  } catch {
    return { output: "" };
  }
}
