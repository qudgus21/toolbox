/**
 * 테스트용 PDF 생성 — 폼 필드 + 주석이 포함된 PDF
 * 실행: node apps/pdf/scripts/create-test-flatten-pdf.mjs
 */
import { PDFDocument, PDFName, PDFString, PDFArray, PDFDict, PDFNumber, rgb, StandardFonts } from "pdf-lib";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createTestPdf() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  // ── 페이지 1: 폼 필드 포함 ──
  const page1 = doc.addPage([595, 842]); // A4
  page1.drawText("Flatten Test PDF — Page 1 (Form Fields)", {
    x: 50,
    y: 780,
    size: 18,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.8),
  });

  page1.drawText("Name:", { x: 50, y: 720, size: 14, font });
  page1.drawText("Email:", { x: 50, y: 670, size: 14, font });
  page1.drawText("Comments:", { x: 50, y: 620, size: 14, font });

  // 텍스트 폼 필드 생성
  const form = doc.getForm();

  const nameField = form.createTextField("name");
  nameField.setText("John Doe");
  nameField.addToPage(page1, { x: 120, y: 705, width: 250, height: 25 });

  const emailField = form.createTextField("email");
  emailField.setText("john@example.com");
  emailField.addToPage(page1, { x: 120, y: 655, width: 250, height: 25 });

  const commentsField = form.createTextField("comments");
  commentsField.setText("This is a test comment for flattening.");
  commentsField.addToPage(page1, { x: 120, y: 555, width: 350, height: 75 });

  // 체크박스
  page1.drawText("Agree to terms:", { x: 50, y: 500, size: 14, font });
  const checkbox = form.createCheckBox("agree");
  checkbox.check();
  checkbox.addToPage(page1, { x: 180, y: 495, width: 15, height: 15 });

  // 드롭다운
  page1.drawText("Priority:", { x: 50, y: 460, size: 14, font });
  const dropdown = form.createDropdown("priority");
  dropdown.addOptions(["Low", "Medium", "High"]);
  dropdown.select("Medium");
  dropdown.addToPage(page1, { x: 120, y: 445, width: 150, height: 25 });

  // ── 페이지 2: 주석 시뮬레이션 (텍스트 콘텐츠) ──
  const page2 = doc.addPage([595, 842]);
  page2.drawText("Flatten Test PDF — Page 2 (With Annotations)", {
    x: 50,
    y: 780,
    size: 18,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.8),
  });

  page2.drawText("This page contains some sample content that would", {
    x: 50, y: 720, size: 12, font,
  });
  page2.drawText("typically have highlight and note annotations.", {
    x: 50, y: 700, size: 12, font,
  });

  // 텍스트 주석 추가 (pdf-lib의 low-level API 사용)
  const context = doc.context;

  // Text annotation (sticky note)
  const textAnnotDict = context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Text"),
    Rect: [100, 640, 120, 660],
    Contents: PDFString.of("This is a sticky note annotation"),
    Name: PDFName.of("Comment"),
    C: [1, 1, 0], // Yellow
    Open: false,
  });
  const textAnnotRef = context.register(textAnnotDict);

  // Highlight annotation
  const highlightAnnotDict = context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Highlight"),
    Rect: [50, 715, 450, 730],
    Contents: PDFString.of("Highlighted text"),
    C: [1, 1, 0], // Yellow
    QuadPoints: [50, 730, 450, 730, 50, 715, 450, 715],
  });
  const highlightAnnotRef = context.register(highlightAnnotDict);

  // FreeText annotation
  const freeTextAnnotDict = context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("FreeText"),
    Rect: [50, 560, 300, 600],
    Contents: PDFString.of("This is a free text annotation"),
    DA: PDFString.of("/Helv 12 Tf 0 0 1 rg"),
  });
  const freeTextAnnotRef = context.register(freeTextAnnotDict);

  // 주석 배열을 페이지에 연결
  const annotsArray = context.obj([textAnnotRef, highlightAnnotRef, freeTextAnnotRef]);
  page2.node.set(PDFName.of("Annots"), annotsArray);

  // ── 페이지 3: 일반 콘텐츠 (폼/주석 없음) ──
  const page3 = doc.addPage([595, 842]);
  page3.drawText("Flatten Test PDF — Page 3 (Plain Content)", {
    x: 50,
    y: 780,
    size: 18,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.8),
  });
  page3.drawText("This page has no form fields or annotations.", {
    x: 50, y: 720, size: 12, font,
  });
  page3.drawText("It should remain unchanged after flattening.", {
    x: 50, y: 700, size: 12, font,
  });

  // 저장
  const pdfBytes = await doc.save();
  const outPath = join(__dirname, "..", "..", "..", "test-fixtures", "pdf", "flatten-test.pdf");
  writeFileSync(outPath, pdfBytes);
  console.log(`✅ Test PDF created: ${outPath}`);
  console.log(`   Pages: 3`);
  console.log(`   Form fields: 4 (name, email, comments, agree, priority)`);
  console.log(`   Annotations: 3 (Text, Highlight, FreeText)`);
}

createTestPdf().catch(console.error);
