import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const roomLength = Number(fields.roomLength); // m
  const roomWidth = Number(fields.roomWidth); // m
  const tileLengthCm = Number(fields.tileLength || 30); // cm
  const tileWidthCm = Number(fields.tileWidth || 30); // cm
  const gapMm = Number(fields.gap || 3); // mm
  const wastage = Number(fields.wastage || 10); // %

  if (!isFinite(roomLength) || roomLength <= 0 || !isFinite(roomWidth) || roomWidth <= 0) {
    return { output: '' };
  }
  if (!isFinite(tileLengthCm) || tileLengthCm <= 0 || !isFinite(tileWidthCm) || tileWidthCm <= 0) {
    return { output: '' };
  }

  const roomArea = roomLength * roomWidth;

  // Tile area including gap
  const tileLengthM = (tileLengthCm + gapMm / 10) / 100;
  const tileWidthM = (tileWidthCm + gapMm / 10) / 100;
  const tileAreaWithGap = tileLengthM * tileWidthM;
  const tileAreaPure = (tileLengthCm / 100) * (tileWidthCm / 100);

  const tilesExact = roomArea / tileAreaWithGap;
  const tilesWithWastage = Math.ceil(tilesExact * (1 + wastage / 100));
  const totalTileArea = tilesWithWastage * tileAreaPure;

  // Boxes (typically 1m² per box)
  const tilesPerBox = Math.floor(1 / tileAreaPure) || 1;
  const boxes = Math.ceil(tilesWithWastage / tilesPerBox);

  return {
    output: `${fmt(tilesWithWastage)} tiles`,
    table: [
      { label: 'Room Area', value: `${fmt(roomArea)}`, unit: 'm²' },
      { label: 'Tile Size', value: `${fmt(tileLengthCm)} × ${fmt(tileWidthCm)}`, unit: 'cm' },
      { label: 'Gap', value: `${fmt(gapMm)}`, unit: 'mm' },
      { label: 'Wastage', value: `${fmt(wastage)}%` },
      { label: 'Tiles (exact)', value: fmt(Math.ceil(tilesExact)) },
      { label: 'Tiles (with wastage)', value: fmt(tilesWithWastage) },
      { label: 'Total Tile Area', value: `${fmt(totalTileArea)}`, unit: 'm²' },
      { label: 'Tiles per Box (≈1m²)', value: fmt(tilesPerBox) },
      { label: 'Boxes Needed', value: fmt(boxes) },
    ],
    breakdown: [
      { label: 'Room Area', value: `${fmt(roomLength)} × ${fmt(roomWidth)} = ${fmt(roomArea)} m²` },
      { label: 'Tile Area (with gap)', value: `${fmt(tileLengthM * 100)} × ${fmt(tileWidthM * 100)} cm = ${fmt(tileAreaWithGap * 10000)} cm²` },
      { label: 'Exact Tiles', value: `${fmt(roomArea)} / ${fmt(tileAreaWithGap)} = ${fmt(tilesExact)}` },
      { label: 'With Wastage', value: `${fmt(Math.ceil(tilesExact))} × ${fmt(1 + wastage / 100)} = ${fmt(tilesWithWastage)}`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}
