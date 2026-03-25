import type { ConverterResult } from "../types";

interface Coord {
  lat: number;
  lon: number;
}

function parseDD(input: string): Coord | null {
  // "40.7128, -74.0060"
  const match = input.match(/^\s*(-?\d+\.?\d*)\s*[,\s]\s*(-?\d+\.?\d*)\s*$/);
  if (match) {
    return { lat: parseFloat(match[1]), lon: parseFloat(match[2]) };
  }
  return null;
}

function parseDMS(input: string): Coord | null {
  // 40°42'46.1"N 74°0'21.6"W
  const dmsPattern = /(\d+)[°]\s*(\d+)[′']\s*([\d.]+)[″"]\s*([NSns])\s*(\d+)[°]\s*(\d+)[′']\s*([\d.]+)[″"]\s*([EWew])/;
  const match = input.match(dmsPattern);
  if (match) {
    let lat = Number(match[1]) + Number(match[2]) / 60 + Number(match[3]) / 3600;
    let lon = Number(match[5]) + Number(match[6]) / 60 + Number(match[7]) / 3600;
    if (match[4].toUpperCase() === "S") lat = -lat;
    if (match[8].toUpperCase() === "W") lon = -lon;
    return { lat, lon };
  }
  return null;
}

function parseDDM(input: string): Coord | null {
  // 40°42.768'N 74°0.360'W
  const ddmPattern = /(\d+)[°]\s*([\d.]+)[′']\s*([NSns])\s*(\d+)[°]\s*([\d.]+)[′']\s*([EWew])/;
  const match = input.match(ddmPattern);
  if (match) {
    let lat = Number(match[1]) + Number(match[2]) / 60;
    let lon = Number(match[4]) + Number(match[5]) / 60;
    if (match[3].toUpperCase() === "S") lat = -lat;
    if (match[6].toUpperCase() === "W") lon = -lon;
    return { lat, lon };
  }
  return null;
}

function parseCoord(input: string): Coord | null {
  return parseDMS(input) || parseDDM(input) || parseDD(input);
}

function toDD(coord: Coord): string {
  return `${coord.lat.toFixed(6)}, ${coord.lon.toFixed(6)}`;
}

function toDMS(coord: Coord): string {
  function convert(deg: number, pos: string, neg: string): string {
    const dir = deg >= 0 ? pos : neg;
    const abs = Math.abs(deg);
    const d = Math.floor(abs);
    const mFull = (abs - d) * 60;
    const m = Math.floor(mFull);
    const s = (mFull - m) * 60;
    return `${d}°${m}'${s.toFixed(1)}"${dir}`;
  }
  return `${convert(coord.lat, "N", "S")} ${convert(coord.lon, "E", "W")}`;
}

function toDDM(coord: Coord): string {
  function convert(deg: number, pos: string, neg: string): string {
    const dir = deg >= 0 ? pos : neg;
    const abs = Math.abs(deg);
    const d = Math.floor(abs);
    const m = (abs - d) * 60;
    return `${d}°${m.toFixed(3)}'${dir}`;
  }
  return `${convert(coord.lat, "N", "S")} ${convert(coord.lon, "E", "W")}`;
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const outputFormat = (options?.outputFormat as string) || "DD";
  const coord = parseCoord(trimmed);
  if (!coord) return { output: "" };

  let output: string;
  switch (outputFormat) {
    case "DMS":
      output = toDMS(coord);
      break;
    case "DDM":
      output = toDDM(coord);
      break;
    case "DD":
    default:
      output = toDD(coord);
      break;
  }

  const table = [
    { label: "Decimal Degrees (DD)", value: toDD(coord), unit: "DD" },
    { label: "Degrees Minutes Seconds (DMS)", value: toDMS(coord), unit: "DMS" },
    { label: "Degrees Decimal Minutes (DDM)", value: toDDM(coord), unit: "DDM" },
  ];

  return {
    output,
    table,
    stats: {
      latitude: parseFloat(coord.lat.toFixed(6)),
      longitude: parseFloat(coord.lon.toFixed(6)),
    },
  };
}
