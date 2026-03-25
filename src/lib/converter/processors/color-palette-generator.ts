import type { ConverterResult } from "../types";

interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}

function parseColor(input: string): RGB | null {
  // HEX
  const hexMatch = input.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
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
  const rgbMatch = input.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }
  // HSL
  const hslMatch = input.match(/hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/i);
  if (hslMatch) {
    const hsl: HSL = {
      h: parseInt(hslMatch[1], 10),
      s: parseInt(hslMatch[2], 10) / 100,
      l: parseInt(hslMatch[3], 10) / 100,
    };
    return hslToRgb(hsl);
  }
  return null;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}

function hslToRgb(hsl: HSL): RGB {
  const { h, s, l } = hsl;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0, g1 = 0, b1 = 0;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function hueShift(hsl: HSL, degrees: number): HSL {
  return { h: (hsl.h + degrees + 360) % 360, s: hsl.s, l: hsl.l };
}

type Harmony = "complementary" | "triadic" | "analogous" | "split-complementary" | "tetradic";

function generateHarmony(hsl: HSL, harmony: Harmony): HSL[] {
  switch (harmony) {
    case "complementary":
      return [hsl, hueShift(hsl, 180)];
    case "triadic":
      return [hsl, hueShift(hsl, 120), hueShift(hsl, 240)];
    case "analogous":
      return [hueShift(hsl, -30), hsl, hueShift(hsl, 30)];
    case "split-complementary":
      return [hsl, hueShift(hsl, 150), hueShift(hsl, 210)];
    case "tetradic":
      return [hsl, hueShift(hsl, 90), hueShift(hsl, 180), hueShift(hsl, 270)];
    default:
      return [hsl, hueShift(hsl, 180)];
  }
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const rgb = parseColor(trimmed);
    if (!rgb) return { output: "" };

    const harmony = (options?.harmony as Harmony) ?? "complementary";
    const hsl = rgbToHsl(rgb);
    const palette = generateHarmony(hsl, harmony);
    const colors = palette.map((h) => {
      const c = hslToRgb(h);
      return { hex: rgbToHex(c), rgb: c };
    });

    const hexList = colors.map((c) => c.hex);

    return {
      output: hexList.join(", "),
      preview: JSON.stringify(hexList),
      table: colors.map((c, i) => ({
        label: `Color ${i + 1}`,
        value: `${c.hex} — rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`,
      })),
      stats: {
        harmony,
        colorCount: colors.length,
        baseColor: rgbToHex(rgb),
      },
    };
  } catch {
    return { output: "" };
  }
}
