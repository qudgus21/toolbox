/**
 * 이미지 추출 디버깅 스크립트
 * 실행: cd apps/pdf && npx tsx scripts/debug-extract-images.ts
 */

import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { PDFDocument, PDFName, PDFNumber, PDFRawStream, PDFArray, PDFRef, PDFDict } from "pdf-lib";

const PDF_DIR = resolve(__dirname, "../../../test-fixtures/pdf");

// ─── PDFName 비교 테스트 ─────────────────────────────────

function testPdfNameComparison() {
  console.log("═══ PDFName 비교 테스트 ═══\n");

  const a = PDFName.of("Image");
  const b = PDFName.of("Image");

  console.log(`  PDFName.of("Image") === PDFName.of("Image")  →  ${a === b}`);
  console.log(`  PDFName.of("Image") !== PDFName.of("Image")  →  ${a !== b}`);
  console.log(`  a.toString() = "${a.toString()}"`);
  console.log(`  a.toString() === "/Image"  →  ${a.toString() === "/Image"}`);
  console.log();
}

// ─── 각 PDF의 이미지 XObject 스캔 ────────────────────────

async function scanPdf(filepath: string) {
  const buf = readFileSync(filepath);
  const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const context = doc.context;

  const allObjects = Array.from(context.enumerateIndirectObjects());

  let totalStreams = 0;
  let imageSubtype = 0;
  let imageSubtypeByRef = 0;
  let imageSubtypeByString = 0;
  let supportedFilter = 0;
  let unsupportedFilter = 0;
  const filterCounts: Record<string, number> = {};
  const colorSpaceCounts: Record<string, number> = {};
  let missingColorSpace = 0;
  let colorSpaceIsRef = 0;

  for (const [, obj] of allObjects) {
    if (!(obj instanceof PDFRawStream)) continue;
    totalStreams++;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    if (!subtype) continue;

    // Reference comparison (현재 코드 방식)
    if (subtype === PDFName.of("Image")) imageSubtypeByRef++;
    // String comparison (올바른 방식)
    if (subtype.toString() === "/Image") imageSubtypeByString++;

    if (subtype.toString() !== "/Image") continue;
    imageSubtype++;

    // Filter 분석
    const filter = dict.get(PDFName.of("Filter"));
    const filterStr = filter?.toString() ?? "(none)";
    filterCounts[filterStr] = (filterCounts[filterStr] ?? 0) + 1;

    if (filterStr === "/DCTDecode" || filterStr === "/FlateDecode") {
      supportedFilter++;
    } else {
      unsupportedFilter++;
    }

    // ColorSpace 분석
    const cs = dict.get(PDFName.of("ColorSpace"));
    if (!cs) {
      missingColorSpace++;
    } else if (cs instanceof PDFRef) {
      colorSpaceIsRef++;
      const resolved = context.lookup(cs);
      colorSpaceCounts[`REF→${resolved?.toString().slice(0, 40)}`] =
        (colorSpaceCounts[`REF→${resolved?.toString().slice(0, 40)}`] ?? 0) + 1;
    } else {
      const csStr = cs.toString().slice(0, 60);
      colorSpaceCounts[csStr] = (colorSpaceCounts[csStr] ?? 0) + 1;
    }
  }

  return {
    totalStreams,
    imageSubtype,
    imageSubtypeByRef,
    imageSubtypeByString,
    supportedFilter,
    unsupportedFilter,
    filterCounts,
    colorSpaceCounts,
    missingColorSpace,
    colorSpaceIsRef,
  };
}

async function main() {
  testPdfNameComparison();

  console.log("═══ PDF 파일별 이미지 스캔 결과 ═══\n");

  const files = readdirSync(PDF_DIR)
    .filter((f) => f.endsWith(".pdf"))
    .sort();

  for (const file of files) {
    const filepath = resolve(PDF_DIR, file);
    try {
      const result = await scanPdf(filepath);

      if (result.imageSubtype === 0 && result.imageSubtypeByString === 0) {
        console.log(`  ${file}: 이미지 없음 (streams: ${result.totalStreams})`);
        continue;
      }

      console.log(`  ${file}:`);
      console.log(`    총 스트림: ${result.totalStreams}`);
      console.log(`    이미지 XObject (=== 참조비교): ${result.imageSubtypeByRef}`);
      console.log(`    이미지 XObject (toString 비교): ${result.imageSubtypeByString}`);

      if (result.imageSubtypeByRef !== result.imageSubtypeByString) {
        console.log(`    ⚠️  참조비교로 ${result.imageSubtypeByString - result.imageSubtypeByRef}개 이미지 누락!`);
      }

      console.log(`    지원 필터: ${result.supportedFilter}, 미지원 필터: ${result.unsupportedFilter}`);
      console.log(`    필터 분포:`, result.filterCounts);

      if (Object.keys(result.colorSpaceCounts).length > 0) {
        console.log(`    ColorSpace 분포:`, result.colorSpaceCounts);
      }
      if (result.colorSpaceIsRef > 0) {
        console.log(`    ⚠️  ColorSpace가 간접참조(PDFRef)인 이미지: ${result.colorSpaceIsRef}개`);
      }
      if (result.missingColorSpace > 0) {
        console.log(`    ⚠️  ColorSpace 없는 이미지: ${result.missingColorSpace}개`);
      }
    } catch (e: any) {
      console.log(`  ${file}: ERROR - ${e.message}`);
    }
    console.log();
  }
}

main().catch(console.error);
