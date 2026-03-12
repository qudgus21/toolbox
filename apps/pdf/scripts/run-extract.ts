/**
 * 실제로 extract-images 프로세서를 실행해보는 스크립트
 * cd apps/pdf && npx tsx scripts/run-extract.ts
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { PDFDocument, PDFName, PDFNumber, PDFRawStream } from "pdf-lib";
import JSZip from "jszip";

const FIXTURES = resolve(__dirname, "../../../test-fixtures/pdf");
const OUT = resolve(__dirname, "../../../test-fixtures/extract-output");
mkdirSync(OUT, { recursive: true });

// Canvas mock이 필요 없는 JPEG 전용 추출 테스트
// 프로세서의 핵심 로직을 그대로 재현

const MIN_IMAGE_AREA = 2500;

function getFilterString(dict: any): string | null {
  const filter = dict.get(PDFName.of("Filter"));
  if (!filter) return null;
  if (filter.size && filter.size() === 1) return filter.get(0).toString();
  return filter.toString();
}

async function extractFromPdf(filepath: string) {
  const buf = readFileSync(filepath);
  const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const ctx = doc.context;
  const allObjects = Array.from(ctx.enumerateIndirectObjects());

  const results: Array<{
    index: number;
    w: number;
    h: number;
    filter: string;
    format: string;
    dataSize: number;
    validJpeg: boolean;
  }> = [];

  let idx = 0;
  for (const [, obj] of allObjects) {
    if (!(obj instanceof PDFRawStream)) continue;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    if (subtype?.toString() !== "/Image") continue;

    const filterStr = getFilterString(dict);
    if (!filterStr) continue;

    const wObj = dict.get(PDFName.of("Width"));
    const hObj = dict.get(PDFName.of("Height"));
    const w = wObj instanceof PDFNumber ? wObj.asNumber() : 0;
    const h = hObj instanceof PDFNumber ? hObj.asNumber() : 0;

    if (w * h < MIN_IMAGE_AREA) continue;
    idx++;

    if (filterStr === "/DCTDecode") {
      const jpegBytes = obj.getContents();
      const data = new Uint8Array(jpegBytes);

      // JPEG 유효성 검사: SOI(FF D8) + EOI(FF D9)
      const hasSOI = data[0] === 0xff && data[1] === 0xd8;
      const hasEOI = data[data.length - 2] === 0xff && data[data.length - 1] === 0xd9;

      results.push({
        index: idx,
        w, h,
        filter: filterStr,
        format: "jpeg",
        dataSize: data.length,
        validJpeg: hasSOI && hasEOI,
      });

      // 실제 파일로 저장
      const outName = resolve(OUT, `image_${idx}.jpg`);
      writeFileSync(outName, data);
    } else if (filterStr === "/FlateDecode") {
      const data = obj.getContents();
      results.push({
        index: idx,
        w, h,
        filter: filterStr,
        format: "png (needs canvas)",
        dataSize: data.length,
        validJpeg: false,
      });
    } else {
      results.push({
        index: idx,
        w, h,
        filter: filterStr,
        format: "unsupported",
        dataSize: 0,
        validJpeg: false,
      });
    }
  }

  return results;
}

async function main() {
  const targets = [
    "12-image-heavy.pdf",
    "19-real-images.pdf",
    "13-multi-jpeg-per-page.pdf",
  ];

  for (const file of targets) {
    const filepath = resolve(FIXTURES, file);
    console.log(`\n═══ ${file} ═══`);

    try {
      const results = await extractFromPdf(filepath);

      if (results.length === 0) {
        console.log("  이미지 없음!");
        continue;
      }

      for (const r of results) {
        const status = r.format === "jpeg"
          ? (r.validJpeg ? "✅ 유효한 JPEG" : "❌ 깨진 JPEG")
          : r.format === "png (needs canvas)"
            ? "⚠️ FlateDecode (Node에서 PNG 변환 불가)"
            : "❌ 미지원";

        console.log(`  #${r.index}: ${r.w}×${r.h} | ${r.filter} | ${r.dataSize} bytes | ${status}`);
      }
    } catch (e: any) {
      console.log(`  ERROR: ${e.message}`);
    }
  }

  console.log(`\n추출된 JPEG 파일: ${OUT}/`);
}

main().catch(console.error);
