import type { ConverterResult } from "../types";

function parseDate(input: string): Date | null {
  const trimmed = input.trim();

  // ISO or standard
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

  return null;
}

function calculateAge(birthDate: Date, now: Date) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function getNextBirthday(birthDate: Date, now: Date): Date {
  const thisYear = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
  );
  if (thisYear > now) return thisYear;
  return new Date(
    now.getFullYear() + 1,
    birthDate.getMonth(),
    birthDate.getDate(),
  );
}

export function process(
  input: string,
  _options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const birthDate = parseDate(trimmed);
    if (!birthDate) return { output: "" };

    const now = new Date();

    // Birth date must be in the past
    if (birthDate > now) return { output: "" };

    const age = calculateAge(birthDate, now);
    const totalMs = now.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMs / (1000 * 60));
    const totalMonths = age.years * 12 + age.months;

    const nextBirthday = getNextBirthday(birthDate, now);
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    const output = `${age.years} years, ${age.months} months, ${age.days} days`;

    return {
      output,
      table: [
        { label: "Age", value: output },
        { label: "Years", value: String(age.years) },
        { label: "Months", value: String(age.months) },
        { label: "Days", value: String(age.days) },
        { label: "Total Months", value: String(totalMonths) },
        { label: "Total Days", value: totalDays.toLocaleString() },
        { label: "Total Hours", value: totalHours.toLocaleString() },
        { label: "Total Minutes", value: totalMinutes.toLocaleString() },
        {
          label: "Next Birthday",
          value: `${nextBirthday.toISOString().split("T")[0]} (${daysUntilBirthday} days)`,
        },
      ],
      stats: {
        years: age.years,
        months: age.months,
        days: age.days,
        totalDays,
        daysUntilBirthday,
      },
    };
  } catch {
    return { output: "" };
  }
}
