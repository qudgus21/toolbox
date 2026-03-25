import type { ConverterResult } from "../types";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function parseColor(input: string): RGB | null {
  const trimmed = input.trim();
  // HEX
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
  // RGB
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

function parseTwoColors(input: string): [RGB, RGB] | null {
  // Try comma-separated first
  let parts = input.split(",").map((s) => s.trim());
  if (parts.length < 2) {
    // Try space-separated (two hex colors)
    parts = input.split(/\s+/).filter(Boolean);
  }
  if (parts.length < 2) return null;

  const color1 = parseColor(parts[0]);
  const color2 = parseColor(parts[parts.length - 1]);
  if (!color1 || !color2) return null;
  return [color1, color2];
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const colors = parseTwoColors(trimmed);
    if (!colors) return { output: "" };

    const [c1, c2] = colors;
    const hex1 = rgbToHex(c1);
    const hex2 = rgbToHex(c2);
    const type = (options?.type as string) ?? "linear";
    const angle = String(options?.angle ?? "90");

    let cssGradient: string;
    switch (type) {
      case "radial":
        cssGradient = `radial-gradient(circle, ${hex1}, ${hex2})`;
        break;
      case "conic":
        cssGradient = `conic-gradient(from ${angle}deg, ${hex1}, ${hex2})`;
        break;
      default:
        cssGradient = `linear-gradient(${angle}deg, ${hex1}, ${hex2})`;
        break;
    }

    return {
      output: cssGradient,
      preview: cssGradient,
      table: [
        { label: "Type", value: type },
        { label: "Color 1", value: hex1 },
        { label: "Color 2", value: hex2 },
        { label: "Angle", value: `${angle}deg`, unit: "deg" },
        { label: "CSS", value: cssGradient },
      ],
      stats: {
        type,
        color1: hex1,
        color2: hex2,
        angle: parseInt(angle, 10),
      },
    };
  } catch {
    return { output: "" };
  }
}
