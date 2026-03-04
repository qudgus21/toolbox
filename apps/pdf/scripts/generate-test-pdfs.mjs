/**
 * 테스트용 PDF 파일 10개 생성 스크립트
 * 다양한 특성(페이지 수, 텍스트, 이미지, 회전, 메타데이터 등)을 커버
 *
 * 실행: node apps/pdf/scripts/generate-test-pdfs.mjs
 */
import { PDFDocument, StandardFonts, rgb, degrees, PageSizes } from "pdf-lib";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "test-fixtures");

await mkdir(OUT_DIR, { recursive: true });

async function save(name, pdfDoc) {
  const bytes = await pdfDoc.save();
  const path = join(OUT_DIR, name);
  await writeFile(path, bytes);
  const kb = (bytes.byteLength / 1024).toFixed(1);
  console.log(`  ✓ ${name} (${kb} KB, ${pdfDoc.getPageCount()} pages)`);
}

// ─────────────────────────────────────
// 1. single-page.pdf — 단일 페이지, 기본 텍스트
// ─────────────────────────────────────
async function createSinglePage() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage(PageSizes.A4);
  const { height } = page.getSize();

  page.drawText("Single Page PDF", { x: 50, y: height - 80, size: 32, font, color: rgb(0.2, 0.2, 0.2) });
  page.drawText("This is a test PDF with a single page.\nUsed for basic upload and processing tests.", {
    x: 50, y: height - 140, size: 14, font, color: rgb(0.4, 0.4, 0.4), lineHeight: 20,
  });

  // 장식용 사각형
  page.drawRectangle({ x: 50, y: 100, width: 495, height: 3, color: rgb(0.9, 0.2, 0.2) });

  await save("01-single-page.pdf", doc);
}

// ─────────────────────────────────────
// 2. multi-page.pdf — 10페이지, 페이지 번호 포함
// ─────────────────────────────────────
async function createMultiPage() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  for (let i = 1; i <= 10; i++) {
    const page = doc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();

    // 헤더 바
    page.drawRectangle({ x: 0, y: height - 60, width, height: 60, color: rgb(0.15, 0.15, 0.15) });
    page.drawText(`Page ${i} of 10`, { x: 50, y: height - 42, size: 20, font: bold, color: rgb(1, 1, 1) });

    // 본문
    page.drawText(`This is page number ${i}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`, {
      x: 50, y: height - 120, size: 13, font, color: rgb(0.3, 0.3, 0.3), lineHeight: 20,
    });

    // 페이지 번호
    const numText = `${i}`;
    const numWidth = font.widthOfTextAtSize(numText, 12);
    page.drawText(numText, { x: (width - numWidth) / 2, y: 30, size: 12, font, color: rgb(0.5, 0.5, 0.5) });
  }

  await save("02-multi-page-10.pdf", doc);
}

// ─────────────────────────────────────
// 3. many-pages.pdf — 50페이지 (대량 테스트용)
// ─────────────────────────────────────
async function createManyPages() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Courier);

  for (let i = 1; i <= 50; i++) {
    const page = doc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();
    const hue = (i / 50);
    const r = Math.sin(hue * Math.PI * 2) * 0.3 + 0.5;
    const g = Math.sin(hue * Math.PI * 2 + 2) * 0.3 + 0.5;
    const b = Math.sin(hue * Math.PI * 2 + 4) * 0.3 + 0.5;

    page.drawRectangle({ x: 40, y: height - 100, width: width - 80, height: 50, color: rgb(r, g, b) });
    page.drawText(`PAGE ${i}`, { x: 50, y: height - 85, size: 28, font, color: rgb(1, 1, 1) });
    page.drawText(`Document with 50 pages — stress test for split, extract, organize tools.`, {
      x: 50, y: height - 140, size: 11, font, color: rgb(0.4, 0.4, 0.4),
    });
  }

  await save("03-many-pages-50.pdf", doc);
}

// ─────────────────────────────────────
// 4. landscape.pdf — 가로 방향 A4
// ─────────────────────────────────────
async function createLandscape() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const [w, h] = PageSizes.A4;
  // 가로: width와 height 뒤집기
  const page = doc.addPage([h, w]);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.96, 0.96, 0.98) });
  page.drawText("LANDSCAPE PDF", { x: 60, y: height - 80, size: 40, font, color: rgb(0.2, 0.3, 0.7) });
  page.drawText("A4 Landscape orientation (842 x 595 pt)", {
    x: 60, y: height - 120, size: 16,
    font: await doc.embedFont(StandardFonts.Helvetica), color: rgb(0.4, 0.4, 0.4),
  });

  // 그리드 패턴
  for (let x = 60; x < width - 60; x += 40) {
    for (let y = 60; y < height - 150; y += 40) {
      page.drawRectangle({ x, y, width: 30, height: 30, color: rgb(0.85, 0.88, 0.95) });
    }
  }

  await save("04-landscape.pdf", doc);
}

// ─────────────────────────────────────
// 5. rotated-pages.pdf — 각 페이지 다른 회전
// ─────────────────────────────────────
async function createRotatedPages() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const rotations = [0, 90, 180, 270];

  for (const deg of rotations) {
    const page = doc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();
    page.setRotation(degrees(deg));

    page.drawText(`Rotation: ${deg}°`, { x: 50, y: height - 80, size: 28, font, color: rgb(0.8, 0.2, 0.2) });
    page.drawText("This page is rotated. Use the rotate tool to fix it.", {
      x: 50, y: height - 120, size: 13,
      font: await doc.embedFont(StandardFonts.Helvetica), color: rgb(0.4, 0.4, 0.4),
    });

    // 방향 표시 화살표 (단순 사각형)
    page.drawRectangle({ x: width / 2 - 2, y: height / 2, width: 4, height: 100, color: rgb(0.8, 0.2, 0.2) });
    page.drawRectangle({ x: width / 2 - 20, y: height / 2 + 80, width: 40, height: 4, color: rgb(0.8, 0.2, 0.2) });
  }

  await save("05-rotated-pages.pdf", doc);
}

// ─────────────────────────────────────
// 6. with-metadata.pdf — 풍부한 메타데이터
// ─────────────────────────────────────
async function createWithMetadata() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.TimesRoman);

  doc.setTitle("Test Document with Metadata");
  doc.setAuthor("ToolBox Test Suite");
  doc.setSubject("PDF Metadata Testing");
  doc.setKeywords(["test", "metadata", "pdf-lib", "toolbox"]);
  doc.setCreator("ToolBox PDF Generator");
  doc.setProducer("pdf-lib v1.17");
  doc.setCreationDate(new Date("2025-01-15T10:30:00Z"));
  doc.setModificationDate(new Date("2025-03-05T09:00:00Z"));

  const page = doc.addPage(PageSizes.A4);
  const { height } = page.getSize();

  page.drawText("PDF with Rich Metadata", { x: 50, y: height - 80, size: 26, font, color: rgb(0.1, 0.1, 0.1) });

  const meta = [
    "Title: Test Document with Metadata",
    "Author: ToolBox Test Suite",
    "Subject: PDF Metadata Testing",
    "Keywords: test, metadata, pdf-lib, toolbox",
    "Creator: ToolBox PDF Generator",
    "Producer: pdf-lib v1.17",
    "Created: 2025-01-15",
    "Modified: 2025-03-05",
  ];
  meta.forEach((line, i) => {
    page.drawText(line, { x: 50, y: height - 130 - i * 24, size: 13, font, color: rgb(0.3, 0.3, 0.3) });
  });

  await save("06-with-metadata.pdf", doc);
}

// ─────────────────────────────────────
// 7. mixed-sizes.pdf — 다양한 페이지 크기 혼합
// ─────────────────────────────────────
async function createMixedSizes() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const light = await doc.embedFont(StandardFonts.Helvetica);

  const sizes = [
    { name: "A4", size: PageSizes.A4 },
    { name: "Letter", size: PageSizes.Letter },
    { name: "A5", size: PageSizes.A5 },
    { name: "Legal", size: PageSizes.Legal },
    { name: "A3", size: PageSizes.A3 },
  ];

  for (const { name, size } of sizes) {
    const page = doc.addPage(size);
    const { width, height } = page.getSize();

    // 테두리
    page.drawRectangle({ x: 10, y: 10, width: width - 20, height: height - 20, borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 1, color: rgb(1, 1, 1) });

    page.drawText(name, { x: 30, y: height - 60, size: 36, font, color: rgb(0.2, 0.2, 0.7) });
    page.drawText(`${size[0]} × ${size[1]} pt`, { x: 30, y: height - 90, size: 14, font: light, color: rgb(0.5, 0.5, 0.5) });
  }

  await save("07-mixed-sizes.pdf", doc);
}

// ─────────────────────────────────────
// 8. text-heavy.pdf — 텍스트가 많은 PDF (텍스트 추출 테스트용)
// ─────────────────────────────────────
async function createTextHeavy() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);

  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
    "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.",
  ];

  for (let p = 0; p < 3; p++) {
    const page = doc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();

    page.drawText(`Chapter ${p + 1}`, { x: 50, y: height - 70, size: 24, font: bold, color: rgb(0.1, 0.1, 0.1) });
    page.drawRectangle({ x: 50, y: height - 80, width: 200, height: 1, color: rgb(0.3, 0.3, 0.3) });

    let yPos = height - 110;
    for (let i = 0; i < paragraphs.length; i++) {
      // 수동 줄바꿈 (간단한 방식)
      const words = paragraphs[i].split(" ");
      let line = "";
      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(testLine, 12) > width - 100) {
          page.drawText(line, { x: 50, y: yPos, size: 12, font, color: rgb(0.2, 0.2, 0.2) });
          yPos -= 18;
          line = word;
        } else {
          line = testLine;
        }
      }
      if (line) {
        page.drawText(line, { x: 50, y: yPos, size: 12, font, color: rgb(0.2, 0.2, 0.2) });
        yPos -= 28;
      }
    }
  }

  await save("08-text-heavy.pdf", doc);
}

// ─────────────────────────────────────
// 9. colorful.pdf — 도형과 색상이 풍부한 PDF (이미지 변환 테스트)
// ─────────────────────────────────────
async function createColorful() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);

  for (let p = 0; p < 3; p++) {
    const page = doc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();

    // 배경 그라데이션 시뮬레이션 (스트라이프)
    for (let y = 0; y < height; y += 4) {
      const t = y / height;
      const r = p === 0 ? 0.95 - t * 0.3 : p === 1 ? 0.2 + t * 0.3 : 0.3;
      const g = p === 0 ? 0.3 : p === 1 ? 0.85 - t * 0.3 : 0.2 + t * 0.3;
      const b = p === 0 ? 0.3 + t * 0.3 : p === 1 ? 0.3 : 0.9 - t * 0.3;
      page.drawRectangle({ x: 0, y, width, height: 4, color: rgb(r, g, b) });
    }

    // 랜덤 도형
    for (let i = 0; i < 15; i++) {
      const x = 30 + (i % 5) * 110;
      const y = 100 + Math.floor(i / 5) * 200;
      const size = 60 + (i * 7) % 40;
      const r = ((i * 37) % 100) / 100;
      const g = ((i * 53) % 100) / 100;
      const b = ((i * 71) % 100) / 100;

      if (i % 3 === 0) {
        page.drawRectangle({ x, y, width: size, height: size, color: rgb(r, g, b), opacity: 0.7 });
      } else if (i % 3 === 1) {
        page.drawEllipse({ x: x + size / 2, y: y + size / 2, xScale: size / 2, yScale: size / 2, color: rgb(r, g, b), opacity: 0.7 });
      } else {
        page.drawRectangle({ x, y, width: size, height: size * 0.6, color: rgb(r, g, b), opacity: 0.7, borderColor: rgb(1, 1, 1), borderWidth: 2 });
      }
    }

    page.drawText(`Colorful Page ${p + 1}`, { x: 50, y: height - 60, size: 30, font, color: rgb(1, 1, 1) });
  }

  await save("09-colorful.pdf", doc);
}

// ─────────────────────────────────────
// 10. protected.pdf — 비밀번호 보호 (빈 비밀번호로 열림 가능)
// ─────────────────────────────────────
async function createProtected() {
  // pdf-lib은 암호화를 직접 지원하지 않으므로
  // "보호된 것처럼 보이는" 문서 + 설명 텍스트로 대체
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const light = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();

  // 보안 아이콘 대용 (큰 자물쇠 모양)
  page.drawRectangle({ x: width / 2 - 30, y: height - 200, width: 60, height: 50, color: rgb(0.9, 0.6, 0.1) });
  page.drawEllipse({ x: width / 2, y: height - 150, xScale: 25, yScale: 25, borderColor: rgb(0.9, 0.6, 0.1), borderWidth: 6, color: rgb(1, 1, 1) });

  page.drawText("Security Test PDF", { x: 50, y: height - 270, size: 28, font, color: rgb(0.2, 0.2, 0.2) });
  page.drawText("This file simulates a protected PDF for testing\nthe protect/unlock tools.", {
    x: 50, y: height - 310, size: 14, font: light, color: rgb(0.4, 0.4, 0.4), lineHeight: 22,
  });

  const info = [
    "Test scenarios:",
    "• Protect: Add password to this file",
    "• Unlock: Remove protection from PDFs",
    "• Redact: Black out sensitive areas",
    "",
    "Note: pdf-lib cannot create encrypted PDFs directly.",
    "For real encryption tests, use an external tool to",
    "create a password-protected PDF.",
  ];
  info.forEach((line, i) => {
    page.drawText(line, {
      x: 50, y: height - 380 - i * 22, size: 12,
      font: line.startsWith("•") || line.startsWith("Note") ? light : font,
      color: rgb(0.35, 0.35, 0.35),
    });
  });

  await save("10-security-test.pdf", doc);
}

// ─────────────────────────────────────
// 실행
// ─────────────────────────────────────
console.log("Generating test PDFs...\n");

await createSinglePage();
await createMultiPage();
await createManyPages();
await createLandscape();
await createRotatedPages();
await createWithMetadata();
await createMixedSizes();
await createTextHeavy();
await createColorful();
await createProtected();

console.log("\n✅ All 10 test PDFs generated in apps/pdf/test-fixtures/");
