import { rgb } from "pdf-lib";

/**
 * Convert hex color string (#RGB or #RRGGBB) to pdf-lib RGB color.
 * Returns black for invalid input.
 */
export function hexToRgb(hex: string) {
  let h = hex.replace("#", "");
  // Expand 3-digit hex to 6-digit
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return rgb(
    Number.isNaN(r) ? 0 : r,
    Number.isNaN(g) ? 0 : g,
    Number.isNaN(b) ? 0 : b,
  );
}
