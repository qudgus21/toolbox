import type { ImageProcessorFn } from "../types";
import { createCanvas, canvasToBlob } from "../canvas-utils";

/**
 * Minimal QR Code generator (byte mode, version 1-10)
 * Produces a boolean[][] matrix representing the QR code.
 */

// Error correction levels: L=1, M=0, Q=3, H=2
const EC_LEVELS: Record<string, number> = { L: 1, M: 0, Q: 3, H: 2 };

// Data capacity (byte mode) for versions 1-10, for each EC level [L, M, Q, H]
const CAPACITIES: number[][] = [
  [17, 14, 11, 7],     // v1
  [32, 26, 20, 14],    // v2
  [53, 42, 32, 24],    // v3
  [78, 62, 46, 34],    // v4
  [106, 84, 60, 44],   // v5
  [134, 106, 74, 58],  // v6
  [154, 122, 86, 64],  // v7
  [192, 152, 108, 84], // v8
  [230, 180, 130, 98], // v9
  [271, 213, 151, 119],// v10
];

// EC codewords per block and number of blocks for versions 1-10, [L, M, Q, H]
// Format: [ecCodewordsPerBlock, numBlocks]
const EC_TABLE: [number, number][][] = [
  [[7,1],[10,1],[13,1],[17,1]],       // v1
  [[10,1],[16,1],[22,1],[28,1]],      // v2
  [[15,1],[26,1],[18,2],[22,2]],      // v3
  [[20,1],[18,2],[26,2],[16,4]],      // v4
  [[26,1],[24,2],[18,4],[22,4]],      // v5
  [[18,2],[16,4],[24,4],[28,4]],      // v6
  [[20,2],[18,4],[18,6],[26,5]],      // v7
  [[24,2],[22,4],[22,6],[26,6]],      // v8
  [[30,2],[22,5],[20,8],[24,8]],      // v9
  [[18,4],[26,5],[24,8],[28,8]],      // v10
];

function getVersion(dataLength: number, ecLevel: string): number {
  const ecIdx = ecLevel === "L" ? 0 : ecLevel === "M" ? 1 : ecLevel === "Q" ? 2 : 3;
  for (let v = 0; v < CAPACITIES.length; v++) {
    if (CAPACITIES[v][ecIdx] >= dataLength) return v + 1;
  }
  return 10; // Max we support
}

// GF(256) arithmetic for Reed-Solomon
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = x << 1;
    if (x >= 256) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
}

initGaloisField();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsEncode(data: number[], ecCount: number): number[] {
  // Generate generator polynomial
  const gen = [1];
  for (let i = 0; i < ecCount; i++) {
    const newGen = new Array(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      newGen[j] ^= gen[j];
      newGen[j + 1] ^= gfMul(gen[j], GF_EXP[i]);
    }
    gen.length = 0;
    gen.push(...newGen);
  }

  const msg = [...data, ...new Array(ecCount).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        msg[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }

  return msg.slice(data.length);
}

function generateQRMatrix(text: string, ecLevel: string): boolean[][] {
  const bytes = new TextEncoder().encode(text);
  const version = getVersion(bytes.length, ecLevel);
  const size = version * 4 + 17;

  const ecIdx = ecLevel === "L" ? 0 : ecLevel === "M" ? 1 : ecLevel === "Q" ? 2 : 3;
  const [ecPerBlock, numBlocks] = EC_TABLE[version - 1][ecIdx];

  // Total data codewords
  const totalModules = size * size;
  // Simplified: total data + ec codewords
  const totalDataCodewords = CAPACITIES[version - 1][ecIdx];

  // Encode data in byte mode
  const dataBits: number[] = [];

  // Mode indicator: 0100 (byte mode)
  dataBits.push(0, 1, 0, 0);

  // Character count indicator (8 bits for version 1-9, 16 for 10+)
  const cciBits = version <= 9 ? 8 : 16;
  for (let i = cciBits - 1; i >= 0; i--) {
    dataBits.push((bytes.length >> i) & 1);
  }

  // Data
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) {
      dataBits.push((b >> i) & 1);
    }
  }

  // Terminator (up to 4 bits)
  const totalDataBits = totalDataCodewords * 8;
  for (let i = 0; i < 4 && dataBits.length < totalDataBits; i++) {
    dataBits.push(0);
  }

  // Pad to byte boundary
  while (dataBits.length % 8 !== 0) dataBits.push(0);

  // Pad codewords
  let padToggle = false;
  while (dataBits.length < totalDataBits) {
    const padByte = padToggle ? 0x11 : 0xEC;
    for (let i = 7; i >= 0; i--) {
      dataBits.push((padByte >> i) & 1);
    }
    padToggle = !padToggle;
  }

  // Convert to codewords
  const dataCodewords: number[] = [];
  for (let i = 0; i < dataBits.length; i += 8) {
    let val = 0;
    for (let j = 0; j < 8; j++) {
      val = (val << 1) | (dataBits[i + j] || 0);
    }
    dataCodewords.push(val);
  }

  // Split into blocks and generate EC
  const blockSize = Math.floor(dataCodewords.length / numBlocks);
  const allData: number[][] = [];
  const allEc: number[][] = [];

  let offset = 0;
  for (let b = 0; b < numBlocks; b++) {
    const extra = b < (dataCodewords.length % numBlocks) ? 1 : 0;
    const blockData = dataCodewords.slice(offset, offset + blockSize + extra);
    offset += blockSize + extra;
    allData.push(blockData);
    allEc.push(rsEncode(blockData, ecPerBlock));
  }

  // Interleave data codewords
  const finalData: number[] = [];
  const maxDataLen = Math.max(...allData.map(d => d.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of allData) {
      if (i < block.length) finalData.push(block[i]);
    }
  }
  // Interleave EC codewords
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of allEc) {
      if (i < block.length) finalData.push(block[i]);
    }
  }

  // Convert to bit stream
  const bitStream: number[] = [];
  for (const cw of finalData) {
    for (let i = 7; i >= 0; i--) {
      bitStream.push((cw >> i) & 1);
    }
  }

  // Initialize matrix
  const matrix: (boolean | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null),
  );
  const reserved: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false),
  );

  // Place finder patterns
  function placeFinderPattern(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r;
        const cc = col + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const isBorder = r === -1 || r === 7 || c === -1 || c === 7;
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[rr][cc] = !isBorder && (isOuter || isInner);
        reserved[rr][cc] = true;
      }
    }
  }

  placeFinderPattern(0, 0);
  placeFinderPattern(0, size - 7);
  placeFinderPattern(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    reserved[6][i] = true;
    matrix[i][6] = i % 2 === 0;
    reserved[i][6] = true;
  }

  // Alignment patterns (for version >= 2)
  if (version >= 2) {
    const positions = getAlignmentPositions(version);
    for (const r of positions) {
      for (const c of positions) {
        if (reserved[r]?.[c]) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const rr = r + dr;
            const cc = c + dc;
            if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
            if (reserved[rr][cc]) continue;
            matrix[rr][cc] = Math.abs(dr) === 2 || Math.abs(dc) === 2 ||
              (dr === 0 && dc === 0);
            reserved[rr][cc] = true;
          }
        }
      }
    }
  }

  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    if (!reserved[8]?.[i]) reserved[8][i] = true;
    if (!reserved[i]?.[8]) reserved[i][8] = true;
    if (i < 7) {
      if (!reserved[8]?.[size - 1 - i]) reserved[8][size - 1 - i] = true;
      if (!reserved[size - 1 - i]?.[8]) reserved[size - 1 - i][8] = true;
    }
  }
  reserved[8][8] = true;

  // Dark module
  matrix[size - 8][8] = true;
  reserved[size - 8][8] = true;

  // Reserve version info for version >= 7
  if (version >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        reserved[i][size - 11 + j] = true;
        reserved[size - 11 + j][i] = true;
      }
    }
  }

  // Place data bits
  let bitIdx = 0;
  let upward = true;
  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5; // Skip timing column
    for (let row = 0; row < size; row++) {
      const actualRow = upward ? size - 1 - row : row;
      for (let c = 0; c < 2; c++) {
        const actualCol = col - c;
        if (actualCol < 0) continue;
        if (reserved[actualRow][actualCol]) continue;
        matrix[actualRow][actualCol] = bitIdx < bitStream.length
          ? bitStream[bitIdx++] === 1
          : false;
      }
    }
    upward = !upward;
  }

  // Apply mask (pattern 0: (row + col) % 2 === 0)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c]) {
        if ((r + c) % 2 === 0) {
          matrix[r][c] = !matrix[r][c];
        }
      }
    }
  }

  // Place format info
  const ecBits = EC_LEVELS[ecLevel] ?? 0;
  const formatData = (ecBits << 3) | 0; // mask pattern 0
  const formatBits = calculateFormatBits(formatData);

  const FORMAT_POSITIONS_A: [number, number][] = [
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
    [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  ];
  const FORMAT_POSITIONS_B: [number, number][] = [
    [8, size - 1], [8, size - 2], [8, size - 3], [8, size - 4],
    [8, size - 5], [8, size - 6], [8, size - 7],
    [size - 7, 8], [size - 6, 8], [size - 5, 8], [size - 4, 8],
    [size - 3, 8], [size - 2, 8], [size - 1, 8], [size - 8, 8],
  ];

  for (let i = 0; i < 15; i++) {
    const bit = ((formatBits >> (14 - i)) & 1) === 1;
    const [ra, ca] = FORMAT_POSITIONS_A[i];
    matrix[ra][ca] = bit;
    const [rb, cb] = FORMAT_POSITIONS_B[i];
    matrix[rb][cb] = bit;
  }

  return matrix.map(row => row.map(cell => cell === true));
}

function getAlignmentPositions(version: number): number[] {
  if (version <= 1) return [];
  const positions: number[][] = [
    [],          // v1
    [6, 18],     // v2
    [6, 22],     // v3
    [6, 26],     // v4
    [6, 30],     // v5
    [6, 34],     // v6
    [6, 22, 38], // v7
    [6, 24, 42], // v8
    [6, 26, 46], // v9
    [6, 28, 50], // v10
  ];
  return positions[version - 1] ?? [];
}

function calculateFormatBits(data: number): number {
  const FORMAT_MASK = 0x5412;
  let bits = data << 10;
  let gen = 0x537 << 4;
  for (let i = 4; i >= 0; i--) {
    if (bits & (1 << (14 - (4 - i)))) {
      bits ^= gen;
    }
    gen >>= 1;
  }
  return ((data << 10) | bits) ^ FORMAT_MASK;
}

const processor: ImageProcessorFn = async (_files, options, onProgress) => {
  onProgress(0);

  const text = (options.text as string) ?? "https://example.com";
  const size = (options.size as number) ?? 400;
  const fgColor = (options.fgColor as string) ?? "#000000";
  const bgColor = (options.bgColor as string) ?? "#ffffff";
  onProgress(20);

  const matrix = generateQRMatrix(text, "M");

  onProgress(60);

  const qrSize = matrix.length;
  const quiet = 4; // Quiet zone
  const totalModules = qrSize + quiet * 2;
  const moduleSize = Math.max(1, Math.floor(size / totalModules));
  const canvasSize = totalModules * moduleSize;

  const { canvas, ctx } = createCanvas(canvasSize, canvasSize);

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw QR modules
  ctx.fillStyle = fgColor;
  for (let r = 0; r < qrSize; r++) {
    for (let c = 0; c < qrSize; c++) {
      if (matrix[r][c]) {
        ctx.fillRect(
          (c + quiet) * moduleSize,
          (r + quiet) * moduleSize,
          moduleSize,
          moduleSize,
        );
      }
    }
  }

  onProgress(90);

  const blob = await canvasToBlob(canvas, "image/png");

  onProgress(100);

  return {
    blob,
    filename: "qr-code.png",
    size: blob.size,
    width: canvasSize,
    height: canvasSize,
  };
};

export default processor;
