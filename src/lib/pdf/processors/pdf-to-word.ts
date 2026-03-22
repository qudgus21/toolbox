import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  PageBreak,
  AlignmentType,
  convertInchesToTwip,
} from "docx";
import JSZip from "jszip";
import type { ProcessorFn, ProcessingResult } from "../types";

// ─── 텍스트 아이템 타입 ──────────────────────────────

interface TextItem {
  str: string;
  transform: number[]; // [scaleX, skewY, skewX, scaleY, translateX, translateY]
  width: number;
  height: number;
  fontName: string;
}

interface TextLine {
  y: number;
  items: TextItem[];
  fontSize: number;
}

// ─── pdfjs-dist 동적 로드 ────────────────────────────

async function loadPdfJs() {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  return pdfjsLib;
}

// ─── 텍스트 추출 ─────────────────────────────────────

function getFontSize(item: TextItem): number {
  // transform[0] = scaleX, transform[3] = scaleY — 둘 중 큰 절대값이 폰트 크기
  return Math.abs(item.transform[3]) || Math.abs(item.transform[0]) || 12;
}

function groupTextByLines(items: TextItem[], tolerance = 3): TextLine[] {
  const lines: TextLine[] = [];

  for (const item of items) {
    if (!item.str) continue;

    const y = Math.round(item.transform[5]);
    const fontSize = getFontSize(item);

    // 기존 라인에 합류할 수 있는지 확인
    const existing = lines.find((l) => Math.abs(l.y - y) <= tolerance);
    if (existing) {
      existing.items.push(item);
      existing.fontSize = Math.max(existing.fontSize, fontSize);
    } else {
      lines.push({ y, items: [item], fontSize });
    }
  }

  // Y 내림차순 정렬 (PDF는 아래→위 좌표계)
  lines.sort((a, b) => b.y - a.y);

  // 각 라인 내 X 좌표 오름차순 정렬
  for (const line of lines) {
    line.items.sort((a, b) => a.transform[4] - b.transform[4]);
  }

  return lines;
}

/** 라인 내 텍스트 아이템을 위치 기반으로 합친다 (불필요한 공백 방지) */
function joinLineItems(items: TextItem[]): string {
  if (items.length === 0) return "";
  let result = items[0].str;

  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1];
    const curr = items[i];

    // 이전 아이템의 끝 X 좌표
    const prevEnd = prev.transform[4] + prev.width;
    // 현재 아이템의 시작 X 좌표
    const currStart = curr.transform[4];
    // 간격 (PDF 유닛)
    const gap = currStart - prevEnd;

    const fontSize = getFontSize(curr);
    // 폰트 크기의 약 30% 이상 간격이면 공백 삽입 (단어 사이)
    if (gap > fontSize * 0.3) {
      result += " ";
    }
    result += curr.str;
  }

  return result;
}

function detectParagraphs(lines: TextLine[]): TextLine[][] {
  if (lines.length === 0) return [];

  const paragraphs: TextLine[][] = [[lines[0]]];
  const medianFontSize =
    lines.reduce((s, l) => s + l.fontSize, 0) / lines.length;

  for (let i = 1; i < lines.length; i++) {
    const prev = lines[i - 1];
    const curr = lines[i];
    const gap = prev.y - curr.y;
    const lineHeight = medianFontSize * 1.6;

    // 큰 간격이면 새 문단
    if (gap > lineHeight) {
      paragraphs.push([curr]);
    } else {
      paragraphs[paragraphs.length - 1].push(curr);
    }
  }

  return paragraphs;
}

// ─── DOCX 생성 ───────────────────────────────────────

// CJK·한글 포함 여부 판별
const CJK_REGEX = /[\u3000-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF]/;

function pickFont(text: string): string {
  return CJK_REGEX.test(text) ? "Malgun Gothic" : "Arial";
}

function buildDocxParagraph(
  lines: TextLine[],
  medianFontSize: number,
): Paragraph {
  const runs: TextRun[] = [];
  const avgFontSize =
    lines.reduce((s, l) => s + l.fontSize, 0) / lines.length;
  const isHeading = avgFontSize > medianFontSize * 1.3;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = joinLineItems(line.items);

    if (i > 0) {
      runs.push(new TextRun({ break: 1 }));
    }

    runs.push(
      new TextRun({
        text,
        bold: isHeading,
        size: Math.round(avgFontSize * 2), // docx는 half-point 단위
        font: pickFont(text),
      }),
    );
  }

  return new Paragraph({
    children: runs,
    spacing: { after: 120 },
    alignment: AlignmentType.LEFT,
  });
}

async function convertSinglePdf(
  file: File,
  onProgress: (pct: number) => void,
  progressBase: number,
  progressRange: number,
): Promise<{ blob: Blob; pageCount: number }> {
  const pdfjsLib = await loadPdfJs();
  const data = await file.arrayBuffer();
  const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
  const numPages = pdfDoc.numPages;

  onProgress(progressBase + progressRange * 0.05);

  const sections: Paragraph[][] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();

    const textItems = content.items.filter(
      (item: Record<string, unknown>) => "str" in item,
    ) as unknown as TextItem[];

    const lines = groupTextByLines(textItems);
    const paragraphs = detectParagraphs(lines);

    const medianFontSize =
      lines.length > 0
        ? lines.reduce((s, l) => s + l.fontSize, 0) / lines.length
        : 12;

    const pageParagraphs: Paragraph[] = [];

    // 페이지 구분 (첫 페이지 제외)
    if (i > 1) {
      pageParagraphs.push(
        new Paragraph({
          children: [new PageBreak()],
        }),
      );
    }

    if (paragraphs.length === 0) {
      // 텍스트가 없는 페이지
      pageParagraphs.push(new Paragraph({ children: [] }));
    } else {
      for (const para of paragraphs) {
        pageParagraphs.push(buildDocxParagraph(para, medianFontSize));
      }
    }

    sections.push(pageParagraphs);

    onProgress(
      progressBase + progressRange * (0.05 + 0.8 * (i / numPages)),
    );
  }

  pdfDoc.destroy();

  // DOCX 문서 생성
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: sections.flat(),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  onProgress(progressBase + progressRange);

  return { blob, pageCount: numPages };
}

// ─── 메인 프로세서 ───────────────────────────────────

const pdfToWord: ProcessorFn = async (files, _options, onProgress) => {
  if (files.length === 1) {
    const { blob, pageCount } = await convertSinglePdf(
      files[0],
      onProgress,
      5,
      90,
    );

    const baseName = files[0].name.replace(/\.pdf$/i, "");
    onProgress(100);

    return {
      blob,
      filename: `${baseName}.docx`,
      size: blob.size,
      pageCount,
    } satisfies ProcessingResult;
  }

  // 다중 파일 → 개별 변환 후 ZIP
  const zip = new JSZip();
  let totalPageCount = 0;
  const perFile = 80 / files.length;

  for (let i = 0; i < files.length; i++) {
    const base = 5 + i * perFile;
    const { blob, pageCount } = await convertSinglePdf(
      files[i],
      onProgress,
      base,
      perFile,
    );
    const baseName = files[i].name.replace(/\.pdf$/i, "");
    zip.file(`${baseName}.docx`, blob);
    totalPageCount += pageCount;
  }

  onProgress(90);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);

  return {
    blob: zipBlob,
    filename: "converted_docx.zip",
    size: zipBlob.size,
    pageCount: totalPageCount,
  } satisfies ProcessingResult;
};

export default pdfToWord;
