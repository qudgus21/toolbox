/**
 * 실제 PDF로 이미지 추출 프로세서 테스트
 * cd apps/pdf && npx tsx scripts/test-extract-real.ts
 */

import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFArray,
  PDFRef,
  PDFDict,
  PDFStream,
} from "pdf-lib";

const PDF_DIR = resolve(__dirname, "../../../test-fixtures/pdf");

// ─── 모든 스트림 객체를 깊게 분석 ────────────────────────

async function deepAnalyze(filepath: string) {
  const buf = readFileSync(filepath);
  const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const ctx = doc.context;
  const allObjects = Array.from(ctx.enumerateIndirectObjects());

  console.log(`  총 indirect objects: ${allObjects.length}`);

  let rawStreamCount = 0;
  let otherStreamCount = 0;
  const streamTypes: Record<string, number> = {};

  const images: Array<{
    ref: string;
    type: string;
    w: number | null;
    h: number | null;
    filter: string;
    colorSpace: string;
    bpc: number | null;
    hasSMask: boolean;
    isRawStream: boolean;
    contentsLength: number;
  }> = [];

  for (const [ref, obj] of allObjects) {
    const typeName = obj.constructor.name;

    // 모든 스트림 타입 카운트
    if (obj instanceof PDFRawStream) {
      rawStreamCount++;
    } else if (obj instanceof PDFStream) {
      otherStreamCount++;
      streamTypes[typeName] = (streamTypes[typeName] ?? 0) + 1;
    }

    // PDFRawStream이 아닌 스트림에서도 이미지 찾기
    const isRaw = obj instanceof PDFRawStream;
    const isStream = obj instanceof PDFStream;
    if (!isStream) continue;

    const dict: PDFDict = (obj as any).dict;
    if (!dict || typeof dict.get !== "function") continue;

    const subtype = dict.get(PDFName.of("Subtype"));
    if (!subtype || subtype.toString() !== "/Image") continue;

    const filter = dict.get(PDFName.of("Filter"));
    const w = dict.get(PDFName.of("Width"));
    const h = dict.get(PDFName.of("Height"));
    const cs = dict.get(PDFName.of("ColorSpace"));
    const bpc = dict.get(PDFName.of("BitsPerComponent"));
    const smask = dict.get(PDFName.of("SMask"));

    let csStr = "(none)";
    if (cs) {
      if (cs instanceof PDFRef) {
        const resolved = ctx.lookup(cs);
        csStr = `REF→${resolved?.constructor.name}:${resolved?.toString().slice(0, 80)}`;
      } else {
        csStr = cs.toString().slice(0, 80);
      }
    }

    let contentsLen = 0;
    try {
      if (typeof (obj as any).getContents === "function") {
        contentsLen = (obj as any).getContents().length;
      }
    } catch {}

    images.push({
      ref: ref.toString(),
      type: typeName,
      w: w instanceof PDFNumber ? w.asNumber() : null,
      h: h instanceof PDFNumber ? h.asNumber() : null,
      filter: filter?.toString().slice(0, 60) ?? "(none)",
      colorSpace: csStr,
      bpc: bpc instanceof PDFNumber ? bpc.asNumber() : null,
      hasSMask: !!smask,
      isRawStream: isRaw,
      contentsLength: contentsLen,
    });
  }

  console.log(`  PDFRawStream: ${rawStreamCount}, 기타 Stream: ${otherStreamCount}`);
  if (Object.keys(streamTypes).length > 0) {
    console.log(`  기타 스트림 타입:`, streamTypes);
  }

  console.log(`\n  발견된 이미지 XObject: ${images.length}개\n`);

  for (const img of images) {
    const area = (img.w ?? 0) * (img.h ?? 0);
    const sizeLabel = area < 2500 ? " ⚠️ TINY" : "";
    console.log(`    ${img.ref} [${img.type}]`);
    console.log(`      크기: ${img.w}×${img.h} (area=${area}${sizeLabel})`);
    console.log(`      필터: ${img.filter}`);
    console.log(`      ColorSpace: ${img.colorSpace}`);
    console.log(`      BPC: ${img.bpc}, SMask: ${img.hasSMask}`);
    console.log(`      isRawStream: ${img.isRawStream}, contents: ${img.contentsLength} bytes`);

    // 현재 프로세서가 이 이미지를 추출할 수 있는지 판정
    const issues: string[] = [];
    if (!img.isRawStream) issues.push("PDFRawStream이 아님 → 프로세서에서 스킵");
    if (img.filter !== "/DCTDecode" && img.filter !== "/FlateDecode") {
      issues.push(`지원하지 않는 필터: ${img.filter}`);
    }
    if (area < 2500) issues.push("MIN_IMAGE_AREA 미만 → 스킵");
    if (img.colorSpace.startsWith("REF→")) issues.push("ColorSpace가 간접참조 → getColorComponents 실패 가능");
    if (img.colorSpace === "(none)" && img.filter === "/FlateDecode") {
      issues.push("ColorSpace 없음 → FlateDecode 처리 불가");
    }

    if (issues.length > 0) {
      console.log(`      ❌ 추출 불가 사유:`);
      issues.forEach((i) => console.log(`         - ${i}`));
    } else {
      console.log(`      ✅ 추출 가능`);
    }
    console.log();
  }
}

async function main() {
  // 이미지가 있는 PDF만 분석
  const targets = [
    "12-image-heavy.pdf",
    "13-multi-jpeg-per-page.pdf",
    "14-mixed-formats.pdf",
    "15-many-images-grid.pdf",
    "16-various-sizes.pdf",
    "17-grayscale-cmyk.pdf",
    "18-with-smask.pdf",
  ];

  for (const file of targets) {
    const filepath = resolve(PDF_DIR, file);
    console.log(`\n═══ ${file} ═══`);
    try {
      await deepAnalyze(filepath);
    } catch (e: any) {
      console.log(`  ERROR: ${e.message}`);
    }
  }
}

main().catch(console.error);
