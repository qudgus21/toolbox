import type { ConverterResult } from "../types";

function parseDate(input: string): Date | null {
  const trimmed = input.trim();
  const date = new Date(trimmed);
  if (!isNaN(date.getTime())) return date;

  // US format
  const usMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    const d = new Date(
      parseInt(usMatch[3], 10),
      parseInt(usMatch[1], 10) - 1,
      parseInt(usMatch[2], 10),
    );
    if (!isNaN(d.getTime())) return d;
  }

  // EU format
  const euMatch = trimmed.match(/^(\d{1,2})[.\-](\d{1,2})[.\-](\d{4})$/);
  if (euMatch) {
    const d = new Date(
      parseInt(euMatch[3], 10),
      parseInt(euMatch[2], 10) - 1,
      parseInt(euMatch[1], 10),
    );
    if (!isNaN(d.getTime())) return d;
  }

  return null;
}

function parseTwoDates(
  input: string,
): [Date, Date] | null {
  // "date1 to date2"
  const toMatch = input.split(/\s+to\s+/i);
  if (toMatch.length === 2) {
    const d1 = parseDate(toMatch[0]);
    const d2 = parseDate(toMatch[1]);
    if (d1 && d2) return [d1, d2];
  }

  // "date1 - date2"
  const dashMatch = input.split(/\s*[-–—]\s*/);
  if (dashMatch.length >= 2) {
    const d1 = parseDate(dashMatch[0]);
    const d2 = parseDate(dashMatch[dashMatch.length - 1]);
    if (d1 && d2) return [d1, d2];
  }

  return null;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function diffDates(d1: Date, d2: Date) {
  const start = d1 < d2 ? d1 : d2;
  const end = d1 < d2 ? d2 : d1;
  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Calculate years, months, days
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days, totalDays, totalWeeks, remainingDays };
}

function addToDate(
  date: Date,
  amount: number,
  unit: string,
  subtract = false,
): Date {
  const result = new Date(date);
  const delta = subtract ? -amount : amount;

  switch (unit) {
    case "days":
      result.setDate(result.getDate() + delta);
      break;
    case "weeks":
      result.setDate(result.getDate() + delta * 7);
      break;
    case "months":
      result.setMonth(result.getMonth() + delta);
      break;
    case "years":
      result.setFullYear(result.getFullYear() + delta);
      break;
  }

  return result;
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const rawMode = (options?.mode as string) ?? (options?.operation as string) ?? "diff";
    const operation = rawMode === "diff" ? "difference" : rawMode;
    const amount = parseInt(String(options?.amount ?? "1"), 10);
    const unit = (options?.unit as string) ?? "days";

    if (operation === "difference") {
      // Check if endDate is provided via options
      const endDateStr = (options?.endDate as string)?.trim();
      const endDateFromOpts = endDateStr ? parseDate(endDateStr) : null;

      const dates = endDateFromOpts
        ? (() => { const d1 = parseDate(trimmed); return d1 ? [d1, endDateFromOpts] as [Date, Date] : null; })()
        : parseTwoDates(trimmed);
      if (!dates) {
        // Try single date — diff from today
        const date = parseDate(trimmed);
        if (!date) return { output: "" };
        const diff = diffDates(date, endDateFromOpts ?? new Date());
        return {
          output: `${diff.totalDays} days`,
          table: [
            { label: "From", value: formatDate(date) },
            { label: "To", value: formatDate(new Date()) },
            { label: "Years", value: String(diff.years) },
            { label: "Months", value: String(diff.months) },
            { label: "Days", value: String(diff.days) },
            { label: "Total Days", value: String(diff.totalDays) },
            {
              label: "Weeks + Days",
              value: `${diff.totalWeeks} weeks, ${diff.remainingDays} days`,
            },
          ],
          stats: {
            totalDays: diff.totalDays,
            years: diff.years,
            months: diff.months,
            days: diff.days,
          },
        };
      }

      const [d1, d2] = dates;
      const diff = diffDates(d1, d2);
      return {
        output: `${diff.totalDays} days`,
        table: [
          { label: "From", value: formatDate(d1) },
          { label: "To", value: formatDate(d2) },
          { label: "Years", value: String(diff.years) },
          { label: "Months", value: String(diff.months) },
          { label: "Days", value: String(diff.days) },
          { label: "Total Days", value: String(diff.totalDays) },
          {
            label: "Weeks + Days",
            value: `${diff.totalWeeks} weeks, ${diff.remainingDays} days`,
          },
        ],
        stats: {
          totalDays: diff.totalDays,
          years: diff.years,
          months: diff.months,
          days: diff.days,
        },
      };
    } else {
      // add or subtract
      const date = parseDate(trimmed);
      if (!date || isNaN(amount)) return { output: "" };

      const result = addToDate(date, amount, unit, operation === "subtract");
      const diff = diffDates(date, result);

      return {
        output: formatDate(result),
        table: [
          { label: "Original Date", value: formatDate(date) },
          {
            label: "Operation",
            value: `${operation} ${amount} ${unit}`,
          },
          { label: "Result Date", value: formatDate(result) },
          {
            label: "Day of Week",
            value: result.toLocaleDateString("en-US", { weekday: "long" }),
          },
          { label: "Days Between", value: String(diff.totalDays) },
        ],
        stats: {
          originalDate: formatDate(date),
          resultDate: formatDate(result),
          operation,
          amount,
          unit,
        },
      };
    }
  } catch {
    return { output: "" };
  }
}
