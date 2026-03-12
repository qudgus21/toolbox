/**
 * 실제 이미지 파일로 PDF를 만들고 추출 분석
 * cd apps/pdf && npx tsx scripts/test-extract-realistic.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFStream,
  PDFArray,
  PDFRef,
  PDFDict,
} from "pdf-lib";

const FIXTURES = resolve(__dirname, "../../../test-fixtures");

async function main() {
  // 1) 실제 이미지로 PDF 생성
  console.log("═══ 실제 이미지로 PDF 생성 ═══\n");

  const doc = await PDFDocument.create();

  const jpg1 = readFileSync(resolve(FIXTURES, "jpg/01-small-red.jpg"));
  const jpg2 = readFileSync(resolve(FIXTURES, "jpg/03-portrait.jpg"));
  const png1 = readFileSync(resolve(FIXTURES, "png/01-transparent.png"));
  const png2 = readFileSync(resolve(FIXTURES, "png/03-large.png"));

  const embeddedJpg1 = await doc.embedJpg(jpg1);
  const embeddedJpg2 = await doc.embedJpg(jpg2);
  const embeddedPng1 = await doc.embedPng(png1);
  const embeddedPng2 = await doc.embedPng(png2);

  console.log(`  JPG1: ${embeddedJpg1.width}×${embeddedJpg1.height}`);
  console.log(`  JPG2: ${embeddedJpg2.width}×${embeddedJpg2.height}`);
  console.log(`  PNG1: ${embeddedPng1.width}×${embeddedPng1.height}`);
  console.log(`  PNG2: ${embeddedPng2.width}×${embeddedPng2.height}`);

  // Page 1: JPG 2개
  const p1 = doc.addPage([612, 792]);
  p1.drawImage(embeddedJpg1, { x: 50, y: 500, width: 250, height: 180 });
  p1.drawImage(embeddedJpg2, { x: 320, y: 500, width: 180, height: 250 });

  // Page 2: PNG 2개
  const p2 = doc.addPage([612, 792]);
  p2.drawImage(embeddedPng1, { x: 50, y: 400, width: 500, height: 350 });
  p2.drawImage(embeddedPng2, { x: 200, y: 50, width: 200, height: 300 });

  const pdfBytes = await doc.save();
  const outPath = resolve(FIXTURES, "pdf/19-real-images.pdf");
  writeFileSync(outPath, pdfBytes);
  console.log(`\n  저장: 19-real-images.pdf (${(pdfBytes.length / 1024).toFixed(1)} KB)\n`);

  // 2) 생성된 PDF 분석
  console.log("═══ 생성된 PDF 이미지 분석 ═══\n");

  const reloaded = await PDFDocument.load(pdfBytes);
  const ctx = reloaded.context;
  const allObjects = Array.from(ctx.enumerateIndirectObjects());

  let imageCount = 0;
  for (const [ref, obj] of allObjects) {
    // 모든 스트림 타입 검사
    const isRaw = obj instanceof PDFRawStream;
    const isStream = obj instanceof PDFStream;
    if (!isStream) continue;

    const dict: PDFDict = (obj as any).dict;
    if (!dict || typeof dict.get !== "function") continue;

    const subtype = dict.get(PDFName.of("Subtype"));
    if (!subtype || subtype.toString() !== "/Image") continue;

    imageCount++;
    const filter = dict.get(PDFName.of("Filter"));
    const w = dict.get(PDFName.of("Width"));
    const h = dict.get(PDFName.of("Height"));
    const cs = dict.get(PDFName.of("ColorSpace"));
    const bpc = dict.get(PDFName.of("BitsPerComponent"));
    const smask = dict.get(PDFName.of("SMask"));
    const dp = dict.get(PDFName.of("DecodeParms"));

    // ColorSpace 깊은 분석
    let csDetail = "(none)";
    if (cs) {
      if (cs instanceof PDFRef) {
        const resolved = ctx.lookup(cs);
        csDetail = `PDFRef → ${resolved?.constructor.name}: ${resolved?.toString().slice(0, 100)}`;
      } else if (cs instanceof PDFArray) {
        const items: string[] = [];
        for (let i = 0; i < cs.size(); i++) {
          const item = cs.get(i);
          items.push(`${item.constructor.name}:${item.toString().slice(0, 40)}`);
        }
        csDetail = `PDFArray[${cs.size()}]: [${items.join(", ")}]`;
      } else {
        csDetail = `${cs.constructor.name}: ${cs.toString()}`;
      }
    }

    // Filter 분석
    let filterDetail = "(none)";
    if (filter) {
      if (filter instanceof PDFArray) {
        const items: string[] = [];
        for (let i = 0; i < filter.size(); i++) items.push(filter.get(i).toString());
        filterDetail = `PDFArray[${filter.size()}]: [${items.join(", ")}]`;
      } else {
        filterDetail = filter.toString();
      }
    }

    // DecodeParms 분석
    let dpDetail = "(none)";
    if (dp) {
      dpDetail = `${dp.constructor.name}: ${dp.toString().slice(0, 120)}`;
    }

    console.log(`  이미지 #${imageCount} — ${ref.toString()} [${obj.constructor.name}]`);
    console.log(`    크기: ${w instanceof PDFNumber ? w.asNumber() : "?"}×${h instanceof PDFNumber ? h.asNumber() : "?"}`);
    console.log(`    Filter: ${filterDetail}`);
    console.log(`    ColorSpace: ${csDetail}`);
    console.log(`    BPC: ${bpc instanceof PDFNumber ? bpc.asNumber() : "?"}`);
    console.log(`    DecodeParms: ${dpDetail}`);
    console.log(`    SMask: ${smask ? smask.toString().slice(0, 40) : "없음"}`);
    console.log(`    isRawStream: ${isRaw}`);

    // 현재 프로세서 호환성 판정
    const issues: string[] = [];
    if (!isRaw) issues.push("❌ PDFRawStream이 아님 → instanceof 체크 실패");

    const filterStr = filter?.toString() ?? "";
    if (filter instanceof PDFArray) {
      if (filter.size() === 1) {
        const f = filter.get(0).toString();
        if (f !== "/DCTDecode" && f !== "/FlateDecode") issues.push(`❌ 미지원 필터: ${f}`);
      } else {
        issues.push(`❌ 다중 필터 체인: ${filterStr}`);
      }
    } else if (filterStr !== "/DCTDecode" && filterStr !== "/FlateDecode") {
      issues.push(`❌ 미지원 필터: ${filterStr}`);
    }

    if (cs instanceof PDFRef) issues.push("❌ ColorSpace가 간접참조(PDFRef) → getColorComponents null 반환");
    if (cs instanceof PDFArray) {
      const firstName = cs.get(0)?.toString();
      if (firstName === "/ICCBased") {
        issues.push("⚠️ ICCBased ColorSpace — 현재 코드가 PDFArray만 체크하므로 처리 가능할 수 있음");
      }
    }

    if (issues.length === 0) {
      console.log(`    → ✅ 프로세서 추출 가능`);
    } else {
      console.log(`    → 프로세서 이슈:`);
      issues.forEach((i) => console.log(`       ${i}`));
    }
    console.log();
  }

  console.log(`  총 이미지 XObject: ${imageCount}개`);
}

main().catch(console.error);
