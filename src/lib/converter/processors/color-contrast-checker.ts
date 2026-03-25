import type { ConverterResult } from "../types";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function parseColor(input: string): RGB | null {
  const trimmed = input.trim();
  const hexMatch = trimmed.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  const rgbMatch = trimmed.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }
  return null;
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function relativeLuminance(rgb: RGB): number {
  const sRGB = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function contrastRatio(c1: RGB, c2: RGB): number {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function process(
  input: string,
  _options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const parts = trimmed.split(",").map((s) => s.trim());
    if (parts.length < 2) return { output: "" };

    const c1 = parseColor(parts[0]);
    const c2 = parseColor(parts[1]);
    if (!c1 || !c2) return { output: "" };

    const ratio = contrastRatio(c1, c2);
    const ratioRounded = Math.round(ratio * 100) / 100;

    // WCAG 2.0 thresholds
    const passAANormal = ratio >= 4.5;
    const passAALarge = ratio >= 3;
    const passAAANormal = ratio >= 7;
    const passAAALarge = ratio >= 4.5;

    const formatResult = (pass: boolean) => (pass ? "Pass" : "Fail");

    return {
      output: `${ratioRounded}:1`,
      table: [
        { label: "Color 1", value: rgbToHex(c1) },
        { label: "Color 2", value: rgbToHex(c2) },
        { label: "Contrast Ratio", value: `${ratioRounded}:1` },
        {
          label: "AA Normal Text",
          value: formatResult(passAANormal),
        },
        {
          label: "AA Large Text",
          value: formatResult(passAALarge),
        },
        {
          label: "AAA Normal Text",
          value: formatResult(passAAANormal),
        },
        {
          label: "AAA Large Text",
          value: formatResult(passAAALarge),
        },
      ],
      stats: {
        contrastRatio: ratioRounded,
        passAA: passAANormal,
        passAAA: passAAANormal,
        passAALarge: passAALarge,
        passAAALarge: passAAALarge,
      },
    };
  } catch {
    return { output: "" };
  }
}
