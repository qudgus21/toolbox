import type { ConverterResult } from "../types";

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function parseCoordPair(str: string): { lat: number; lon: number } | null {
  const trimmed = str.trim();
  const match = trimmed.match(/^\s*(-?\d+\.?\d*)\s*[,\s]\s*(-?\d+\.?\d*)\s*$/);
  if (!match) return null;
  const lat = parseFloat(match[1]);
  const lon = parseFloat(match[2]);
  if (isNaN(lat) || isNaN(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { lat, lon };
}

function formatNumber(n: number): string {
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(4);
  return n.toPrecision(6);
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  // Split by newline or semicolon
  const parts = trimmed.split(/[;\n]/).map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) return { output: "" };

  const coord1 = parseCoordPair(parts[0]);
  const coord2 = parseCoordPair(parts[1]);

  if (!coord1 || !coord2) return { output: "" };

  const distanceKm = haversine(coord1.lat, coord1.lon, coord2.lat, coord2.lon);
  const distanceMi = distanceKm * 0.621371;
  const distanceNm = distanceKm * 0.539957;
  const distanceM = distanceKm * 1000;

  const output = `${formatNumber(distanceKm)} km`;

  const table = [
    { label: "Kilometers", value: formatNumber(distanceKm), unit: "km" },
    { label: "Miles", value: formatNumber(distanceMi), unit: "mi" },
    { label: "Nautical Miles", value: formatNumber(distanceNm), unit: "nm" },
    { label: "Meters", value: formatNumber(distanceM), unit: "m" },
  ];

  return {
    output,
    table,
    stats: {
      distanceKm: parseFloat(distanceKm.toFixed(4)),
      distanceMi: parseFloat(distanceMi.toFixed(4)),
    },
  };
}
