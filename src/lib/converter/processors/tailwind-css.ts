import type { ConverterResult } from "../types";

// Tailwind spacing scale (in rem)
const SPACING: Record<string, string> = {
  "0": "0px", "0.5": "0.125rem", "1": "0.25rem", "1.5": "0.375rem",
  "2": "0.5rem", "2.5": "0.625rem", "3": "0.75rem", "3.5": "0.875rem",
  "4": "1rem", "5": "1.25rem", "6": "1.5rem", "7": "1.75rem",
  "8": "2rem", "9": "2.25rem", "10": "2.5rem", "11": "2.75rem",
  "12": "3rem", "14": "3.5rem", "16": "4rem", "20": "5rem",
  "24": "6rem", "28": "7rem", "32": "8rem", "36": "9rem",
  "40": "10rem", "44": "11rem", "48": "12rem", "52": "13rem",
  "56": "14rem", "60": "15rem", "64": "16rem", "72": "18rem",
  "80": "20rem", "96": "24rem", "px": "1px", "auto": "auto",
  "full": "100%", "screen": "100vw",
};

const COLORS: Record<string, Record<string, string>> = {
  red: { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d" },
  blue: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" },
  green: { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d" },
  yellow: { "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047", "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207", "800": "#854d0e", "900": "#713f12" },
  purple: { "50": "#faf5ff", "100": "#f3e8ff", "200": "#e9d5ff", "300": "#d8b4fe", "400": "#c084fc", "500": "#a855f7", "600": "#9333ea", "700": "#7e22ce", "800": "#6b21a8", "900": "#581c87" },
  gray: { "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db", "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151", "800": "#1f2937", "900": "#111827" },
  pink: { "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4", "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d", "800": "#9d174d", "900": "#831843" },
  indigo: { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81" },
  orange: { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12" },
};

const FONT_SIZE: Record<string, string> = {
  xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem",
  xl: "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem",
  "5xl": "3rem", "6xl": "3.75rem", "7xl": "4.5rem", "8xl": "6rem", "9xl": "8rem",
};

const FONT_WEIGHT: Record<string, string> = {
  thin: "100", extralight: "200", light: "300", normal: "400",
  medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900",
};

const BORDER_RADIUS: Record<string, string> = {
  none: "0px", sm: "0.125rem", "": "0.25rem", md: "0.375rem",
  lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px",
};

function tailwindToCss(classes: string): string {
  const classList = classes.trim().split(/\s+/);
  const properties: string[] = [];

  for (const cls of classList) {
    const prop = resolveClass(cls);
    if (prop) properties.push(prop);
  }

  return properties.join("\n");
}

function resolveClass(cls: string): string | null {
  // Display
  if (cls === "flex") return "display: flex;";
  if (cls === "grid") return "display: grid;";
  if (cls === "block") return "display: block;";
  if (cls === "inline") return "display: inline;";
  if (cls === "inline-block") return "display: inline-block;";
  if (cls === "inline-flex") return "display: inline-flex;";
  if (cls === "hidden") return "display: none;";

  // Flex
  if (cls === "flex-row") return "flex-direction: row;";
  if (cls === "flex-col") return "flex-direction: column;";
  if (cls === "flex-wrap") return "flex-wrap: wrap;";
  if (cls === "flex-nowrap") return "flex-wrap: nowrap;";
  if (cls === "flex-1") return "flex: 1 1 0%;";
  if (cls === "flex-auto") return "flex: 1 1 auto;";
  if (cls === "flex-none") return "flex: none;";
  if (cls === "items-center") return "align-items: center;";
  if (cls === "items-start") return "align-items: flex-start;";
  if (cls === "items-end") return "align-items: flex-end;";
  if (cls === "items-stretch") return "align-items: stretch;";
  if (cls === "justify-center") return "justify-content: center;";
  if (cls === "justify-start") return "justify-content: flex-start;";
  if (cls === "justify-end") return "justify-content: flex-end;";
  if (cls === "justify-between") return "justify-content: space-between;";
  if (cls === "justify-around") return "justify-content: space-around;";
  if (cls === "justify-evenly") return "justify-content: space-evenly;";

  // Position
  if (cls === "relative") return "position: relative;";
  if (cls === "absolute") return "position: absolute;";
  if (cls === "fixed") return "position: fixed;";
  if (cls === "sticky") return "position: sticky;";
  if (cls === "static") return "position: static;";

  // Overflow
  if (cls === "overflow-hidden") return "overflow: hidden;";
  if (cls === "overflow-auto") return "overflow: auto;";
  if (cls === "overflow-scroll") return "overflow: scroll;";
  if (cls === "overflow-visible") return "overflow: visible;";

  // Text alignment
  if (cls === "text-left") return "text-align: left;";
  if (cls === "text-center") return "text-align: center;";
  if (cls === "text-right") return "text-align: right;";
  if (cls === "text-justify") return "text-align: justify;";

  // Spacing: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
  const spacingMatch = cls.match(/^(-?)(m|p)(x|y|t|r|b|l|s|e)?-(.+)$/);
  if (spacingMatch) {
    const neg = spacingMatch[1] === "-" ? "-" : "";
    const type = spacingMatch[2] === "p" ? "padding" : "margin";
    const dir = spacingMatch[3] || "";
    const size = spacingMatch[4];
    const val = SPACING[size];
    if (val) {
      const v = neg + val;
      switch (dir) {
        case "": return `${type}: ${v};`;
        case "x": return `${type}-left: ${v};\n${type}-right: ${v};`;
        case "y": return `${type}-top: ${v};\n${type}-bottom: ${v};`;
        case "t": return `${type}-top: ${v};`;
        case "r": return `${type}-right: ${v};`;
        case "b": return `${type}-bottom: ${v};`;
        case "l": return `${type}-left: ${v};`;
        case "s": return `${type}-inline-start: ${v};`;
        case "e": return `${type}-inline-end: ${v};`;
      }
    }
  }

  // Gap
  const gapMatch = cls.match(/^gap-(.+)$/);
  if (gapMatch && SPACING[gapMatch[1]]) return `gap: ${SPACING[gapMatch[1]]};`;

  // Width
  const wMatch = cls.match(/^w-(.+)$/);
  if (wMatch) {
    if (wMatch[1] === "full") return "width: 100%;";
    if (wMatch[1] === "screen") return "width: 100vw;";
    if (wMatch[1] === "auto") return "width: auto;";
    if (wMatch[1] === "min") return "width: min-content;";
    if (wMatch[1] === "max") return "width: max-content;";
    if (wMatch[1] === "fit") return "width: fit-content;";
    if (SPACING[wMatch[1]]) return `width: ${SPACING[wMatch[1]]};`;
    const frac = wMatch[1].match(/^(\d+)\/(\d+)$/);
    if (frac) return `width: ${(Number(frac[1]) / Number(frac[2]) * 100).toFixed(6).replace(/\.?0+$/, "")}%;`;
  }

  // Height
  const hMatch = cls.match(/^h-(.+)$/);
  if (hMatch) {
    if (hMatch[1] === "full") return "height: 100%;";
    if (hMatch[1] === "screen") return "height: 100vh;";
    if (hMatch[1] === "auto") return "height: auto;";
    if (hMatch[1] === "min") return "height: min-content;";
    if (hMatch[1] === "max") return "height: max-content;";
    if (hMatch[1] === "fit") return "height: fit-content;";
    if (SPACING[hMatch[1]]) return `height: ${SPACING[hMatch[1]]};`;
  }

  // Min/max width/height
  if (cls === "min-w-0") return "min-width: 0px;";
  if (cls === "min-w-full") return "min-width: 100%;";
  if (cls === "min-h-0") return "min-height: 0px;";
  if (cls === "min-h-full") return "min-height: 100%;";
  if (cls === "min-h-screen") return "min-height: 100vh;";
  if (cls === "max-w-none") return "max-width: none;";
  if (cls === "max-w-full") return "max-width: 100%;";

  // Font size
  const textSizeMatch = cls.match(/^text-(xs|sm|base|lg|xl|[2-9]xl)$/);
  if (textSizeMatch && FONT_SIZE[textSizeMatch[1]]) {
    return `font-size: ${FONT_SIZE[textSizeMatch[1]]};`;
  }

  // Font weight
  const fontWeightMatch = cls.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/);
  if (fontWeightMatch && FONT_WEIGHT[fontWeightMatch[1]]) {
    return `font-weight: ${FONT_WEIGHT[fontWeightMatch[1]]};`;
  }

  // Text/bg color
  const colorMatch = cls.match(/^(text|bg|border)-(red|blue|green|yellow|purple|gray|pink|indigo|orange)-(\d+)$/);
  if (colorMatch) {
    const prop = colorMatch[1] === "text" ? "color" : colorMatch[1] === "bg" ? "background-color" : "border-color";
    const color = COLORS[colorMatch[2]]?.[colorMatch[3]];
    if (color) return `${prop}: ${color};`;
  }

  if (cls === "text-white") return "color: #ffffff;";
  if (cls === "text-black") return "color: #000000;";
  if (cls === "bg-white") return "background-color: #ffffff;";
  if (cls === "bg-black") return "background-color: #000000;";
  if (cls === "bg-transparent") return "background-color: transparent;";

  // Border radius
  const roundedMatch = cls.match(/^rounded(?:-(none|sm|md|lg|xl|2xl|3xl|full))?$/);
  if (roundedMatch) {
    const size = roundedMatch[1] || "";
    if (BORDER_RADIUS[size] !== undefined) return `border-radius: ${BORDER_RADIUS[size]};`;
  }

  // Border width
  if (cls === "border") return "border-width: 1px;";
  const borderMatch = cls.match(/^border-(\d+)$/);
  if (borderMatch) return `border-width: ${borderMatch[1]}px;`;

  // Opacity
  const opacityMatch = cls.match(/^opacity-(\d+)$/);
  if (opacityMatch) return `opacity: ${Number(opacityMatch[1]) / 100};`;

  // Z-index
  const zMatch = cls.match(/^z-(\d+)$/);
  if (zMatch) return `z-index: ${zMatch[1]};`;

  // Cursor
  if (cls === "cursor-pointer") return "cursor: pointer;";
  if (cls === "cursor-default") return "cursor: default;";
  if (cls === "cursor-not-allowed") return "cursor: not-allowed;";

  // Whitespace
  if (cls === "whitespace-nowrap") return "white-space: nowrap;";
  if (cls === "whitespace-normal") return "white-space: normal;";
  if (cls === "truncate") return "overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;";

  return null;
}

// Reverse mapping for common CSS properties to Tailwind
const CSS_TO_TAILWIND: Record<string, (value: string) => string | null> = {};

function cssToTailwind(css: string): string {
  const classes: string[] = [];
  const lines = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split(/[;\n]/)
    .map((l) => l.trim())
    .filter((l) => l && l.includes(":"));

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    const prop = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/;$/, "");
    const tw = cssPropertyToTailwind(prop, val);
    if (tw) classes.push(tw);
    else classes.push(`/* ${prop}: ${val} */`);
  }

  return classes.join(" ");
}

function cssPropertyToTailwind(prop: string, val: string): string | null {
  // Display
  if (prop === "display") {
    if (val === "flex") return "flex";
    if (val === "grid") return "grid";
    if (val === "block") return "block";
    if (val === "inline") return "inline";
    if (val === "inline-block") return "inline-block";
    if (val === "inline-flex") return "inline-flex";
    if (val === "none") return "hidden";
  }

  // Flex direction
  if (prop === "flex-direction") {
    if (val === "row") return "flex-row";
    if (val === "column") return "flex-col";
  }

  // Align items
  if (prop === "align-items") {
    if (val === "center") return "items-center";
    if (val === "flex-start") return "items-start";
    if (val === "flex-end") return "items-end";
    if (val === "stretch") return "items-stretch";
  }

  // Justify content
  if (prop === "justify-content") {
    if (val === "center") return "justify-center";
    if (val === "flex-start") return "justify-start";
    if (val === "flex-end") return "justify-end";
    if (val === "space-between") return "justify-between";
    if (val === "space-around") return "justify-around";
  }

  // Position
  if (prop === "position") {
    const posMap: Record<string, string> = {
      relative: "relative", absolute: "absolute", fixed: "fixed", sticky: "sticky", static: "static",
    };
    if (posMap[val]) return posMap[val];
  }

  // Width/Height
  if (prop === "width") {
    if (val === "100%") return "w-full";
    if (val === "100vw") return "w-screen";
    if (val === "auto") return "w-auto";
    return findSpacingClass("w", val);
  }
  if (prop === "height") {
    if (val === "100%") return "h-full";
    if (val === "100vh") return "h-screen";
    if (val === "auto") return "h-auto";
    return findSpacingClass("h", val);
  }

  // Spacing
  if (prop === "padding") return findSpacingClass("p", val);
  if (prop === "padding-top") return findSpacingClass("pt", val);
  if (prop === "padding-right") return findSpacingClass("pr", val);
  if (prop === "padding-bottom") return findSpacingClass("pb", val);
  if (prop === "padding-left") return findSpacingClass("pl", val);
  if (prop === "margin") return findSpacingClass("m", val);
  if (prop === "margin-top") return findSpacingClass("mt", val);
  if (prop === "margin-right") return findSpacingClass("mr", val);
  if (prop === "margin-bottom") return findSpacingClass("mb", val);
  if (prop === "margin-left") return findSpacingClass("ml", val);
  if (prop === "gap") return findSpacingClass("gap", val);

  // Font size
  if (prop === "font-size") {
    for (const [name, size] of Object.entries(FONT_SIZE)) {
      if (val === size) return `text-${name}`;
    }
  }

  // Font weight
  if (prop === "font-weight") {
    for (const [name, weight] of Object.entries(FONT_WEIGHT)) {
      if (val === weight) return `font-${name}`;
    }
  }

  // Text align
  if (prop === "text-align") return `text-${val}`;

  // Color
  if (prop === "color" || prop === "background-color" || prop === "border-color") {
    const prefix = prop === "color" ? "text" : prop === "background-color" ? "bg" : "border";
    if (val === "#ffffff" || val === "#fff" || val === "white") return `${prefix}-white`;
    if (val === "#000000" || val === "#000" || val === "black") return `${prefix}-black`;
    if (val === "transparent") return `${prefix}-transparent`;
    const colorClass = findColorClass(prefix, val);
    if (colorClass) return colorClass;
  }

  // Border radius
  if (prop === "border-radius") {
    for (const [name, size] of Object.entries(BORDER_RADIUS)) {
      if (val === size) return name === "" ? "rounded" : `rounded-${name}`;
    }
  }

  // Border width
  if (prop === "border-width") {
    if (val === "1px") return "border";
    return `border-${parseInt(val)}`;
  }

  // Opacity
  if (prop === "opacity") {
    return `opacity-${Math.round(parseFloat(val) * 100)}`;
  }

  // Cursor
  if (prop === "cursor") return `cursor-${val}`;

  // Overflow
  if (prop === "overflow") return `overflow-${val}`;

  return null;
}

function findSpacingClass(prefix: string, value: string): string | null {
  for (const [key, val] of Object.entries(SPACING)) {
    if (val === value) return `${prefix}-${key}`;
  }
  return null;
}

function findColorClass(prefix: string, hex: string): string | null {
  const normalized = hex.toLowerCase();
  for (const [colorName, shades] of Object.entries(COLORS)) {
    for (const [shade, colorHex] of Object.entries(shades)) {
      if (colorHex === normalized) return `${prefix}-${colorName}-${shade}`;
    }
  }
  return null;
}

function detectDirection(input: string): "tailwindToCss" | "cssToTailwind" {
  // If it contains CSS property syntax (property: value), it's CSS
  if (/[\w-]+\s*:\s*[^;]+;?/.test(input) && !input.includes("{")) {
    // Could be CSS properties
    if (input.includes(":")) return "cssToTailwind";
  }
  return "tailwindToCss";
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const direction =
    (options?.direction as string) || detectDirection(trimmed);

  try {
    const output =
      direction === "tailwindToCss"
        ? tailwindToCss(trimmed)
        : cssToTailwind(trimmed);

    return { output };
  } catch {
    return { output: "" };
  }
}
