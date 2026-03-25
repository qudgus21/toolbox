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
  const hslMatch = trimmed.match(/hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/i);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseInt(hslMatch[2], 10) / 100;
    const l = parseInt(hslMatch[3], 10) / 100;
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
  return null;
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// sRGB to linear
function linearize(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

// Linear to sRGB
function delinearize(c: number): number {
  const s = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(1, s)) * 255);
}

// Brettel/Vienot simulation matrices for each deficiency
// These are standard 3x3 simulation matrices
const MATRICES: Record<string, number[][]> = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.011820, 0.042940, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.303900],
  ],
  achromatopsia: [
    [0.2126, 0.7152, 0.0722],
    [0.2126, 0.7152, 0.0722],
    [0.2126, 0.7152, 0.0722],
  ],
};

function simulate(rgb: RGB, type: string): RGB {
  const matrix = MATRICES[type];
  if (!matrix) return rgb;

  const lr = linearize(rgb.r);
  const lg = linearize(rgb.g);
  const lb = linearize(rgb.b);

  return {
    r: delinearize(matrix[0][0] * lr + matrix[0][1] * lg + matrix[0][2] * lb),
    g: delinearize(matrix[1][0] * lr + matrix[1][1] * lg + matrix[1][2] * lb),
    b: delinearize(matrix[2][0] * lr + matrix[2][1] * lg + matrix[2][2] * lb),
  };
}

type DeficiencyType = "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";
const ALL_TYPES: DeficiencyType[] = [
  "protanopia",
  "deuteranopia",
  "tritanopia",
  "achromatopsia",
];

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const rgb = parseColor(trimmed);
    if (!rgb) return { output: "" };

    const selectedType = (options?.type as DeficiencyType) ?? "deuteranopia";
    const simulated = simulate(rgb, selectedType);
    const simulatedHex = rgbToHex(simulated);
    const originalHex = rgbToHex(rgb);

    const table = [
      {
        label: "Original",
        value: `${originalHex} — rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      },
    ];

    for (const type of ALL_TYPES) {
      const sim = simulate(rgb, type);
      const hex = rgbToHex(sim);
      table.push({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: `${hex} — rgb(${sim.r}, ${sim.g}, ${sim.b})`,
      });
    }

    return {
      output: simulatedHex,
      preview: simulatedHex,
      table,
      stats: {
        originalColor: originalHex,
        simulatedColor: simulatedHex,
        deficiencyType: selectedType,
      },
    };
  } catch {
    return { output: "" };
  }
}
