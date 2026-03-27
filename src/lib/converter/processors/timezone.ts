import type { ConverterResult } from "../types";

const MAJOR_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function parseInputDate(input: string): Date | null {
  const trimmed = input.trim();

  // Time only: "14:30" or "14:30:00"
  const timeOnly = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (timeOnly) {
    const now = new Date();
    const h = parseInt(timeOnly[1], 10);
    const m = parseInt(timeOnly[2], 10);
    const s = timeOnly[3] ? parseInt(timeOnly[3], 10) : 0;
    if (h > 23 || m > 59 || s > 59) return null;
    now.setUTCHours(h, m, s, 0);
    return now;
  }

  // Full date-time or date: try native parsing
  const date = new Date(trimmed);
  if (!isNaN(date.getTime())) return date;

  return null;
}

function formatInTimezone(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  } catch {
    return "Invalid timezone";
  }
}

function getTimezoneLabel(tz: string): string {
  const parts = tz.split("/");
  return parts[parts.length - 1].replace(/_/g, " ");
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const fromTimezone = String(options?.fromTimezone ?? "Asia/Seoul");
    const toTimezone = String(options?.toTimezone ?? "America/New_York");

    // Parse input in the context of fromTimezone
    // For time-only input, construct a date in the source timezone
    let date = parseInputDate(trimmed);
    if (!date) return { output: "" };

    // If we have a time-only input, adjust for the source timezone
    const timeOnly = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.test(trimmed.trim());
    if (timeOnly && fromTimezone !== "UTC") {
      // Get offset of the source timezone to adjust
      const nowStr = new Intl.DateTimeFormat("en-US", {
        timeZone: fromTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(date);
      const utcStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(date);

      // Parse both to get offset
      const parseFormatted = (s: string) => {
        const m = s.match(/(\d{2})\/(\d{2})\/(\d{4}),?\s*(\d{2}):(\d{2}):(\d{2})/);
        if (!m) return 0;
        return (
          parseInt(m[4], 10) * 3600 +
          parseInt(m[5], 10) * 60 +
          parseInt(m[6], 10)
        );
      };

      const tzSeconds = parseFormatted(nowStr);
      const utcSeconds = parseFormatted(utcStr);
      const offset = (tzSeconds - utcSeconds) * 1000;

      // Adjust date so that the input time represents the from-timezone time
      date = new Date(date.getTime() - offset);
    }

    const output = formatInTimezone(date, toTimezone);

    const table = MAJOR_TIMEZONES.map((tz) => ({
      label: getTimezoneLabel(tz),
      value: formatInTimezone(date!, tz),
    }));

    return {
      output,
      table,
      stats: {
        fromTimezone,
        toTimezone,
        utcTime: date.toISOString(),
      },
    };
  } catch {
    return { output: "" };
  }
}
