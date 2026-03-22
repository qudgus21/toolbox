import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import pageNumbersPdf, {
  formatPageNumber,
  calculatePosition,
  mirrorPosition,
  parseRange,
  getTargetPageIndices,
  getTemplate,
} from "../page-numbers";
import {
  createMarkedPdf,
  resultToPdf,
  createProgressTracker,
  getPageSizes,
} from "./helpers";
import type { PageNumberOptions } from "../page-numbers-types";
import { DEFAULT_PAGE_NUMBER_OPTIONS } from "../page-numbers-types";

// ─── 순수 함수 단위 테스트 ───

describe("formatPageNumber", () => {
  it("{n} 치환", () => {
    expect(formatPageNumber("{n}", 3, 10)).toBe("3");
  });

  it("{n} / {total} 치환", () => {
    expect(formatPageNumber("{n} / {total}", 3, 10)).toBe("3 / 10");
  });

  it("Page {n} of {total} 치환", () => {
    expect(formatPageNumber("Page {n} of {total}", 1, 5)).toBe(
      "Page 1 of 5",
    );
  });

  it("사용자 정의 템플릿", () => {
    expect(formatPageNumber("- {n} -", 7, 20)).toBe("- 7 -");
  });

  it("여러 번 등장하는 {n}", () => {
    expect(formatPageNumber("{n}/{n}", 3, 10)).toBe("3/3");
  });
});

describe("getTemplate", () => {
  it("{n} 형식", () => {
    expect(getTemplate("{n}", "")).toBe("{n}");
  });

  it("{n}/{total} 형식", () => {
    expect(getTemplate("{n}/{total}", "")).toBe("{n} / {total}");
  });

  it("page-n 형식", () => {
    expect(getTemplate("page-n", "")).toBe("Page {n}");
  });

  it("page-n-of 형식", () => {
    expect(getTemplate("page-n-of", "")).toBe("Page {n} of {total}");
  });

  it("custom 형식", () => {
    expect(getTemplate("custom", "# {n} #")).toBe("# {n} #");
  });

  it("custom 빈 템플릿이면 {n} 사용", () => {
    expect(getTemplate("custom", "")).toBe("{n}");
  });
});

describe("calculatePosition", () => {
  const pw = 595; // A4 width in pt
  const ph = 842; // A4 height in pt
  const textWidth = 20;
  const fontSize = 12;
  const margin = 28.35; // 10mm

  it("bottom-center", () => {
    const { x, y } = calculatePosition(
      "bottom-center",
      pw,
      ph,
      textWidth,
      fontSize,
      margin,
    );
    expect(x).toBeCloseTo((pw - textWidth) / 2, 1);
    expect(y).toBeCloseTo(margin, 1);
  });

  it("top-left", () => {
    const { x, y } = calculatePosition(
      "top-left",
      pw,
      ph,
      textWidth,
      fontSize,
      margin,
    );
    expect(x).toBeCloseTo(margin, 1);
    expect(y).toBeCloseTo(ph - margin - fontSize, 1);
  });

  it("top-right", () => {
    const { x, y } = calculatePosition(
      "top-right",
      pw,
      ph,
      textWidth,
      fontSize,
      margin,
    );
    expect(x).toBeCloseTo(pw - margin - textWidth, 1);
    expect(y).toBeCloseTo(ph - margin - fontSize, 1);
  });

  it("bottom-left", () => {
    const { x, y } = calculatePosition(
      "bottom-left",
      pw,
      ph,
      textWidth,
      fontSize,
      margin,
    );
    expect(x).toBeCloseTo(margin, 1);
    expect(y).toBeCloseTo(margin, 1);
  });

  it("bottom-right", () => {
    const { x, y } = calculatePosition(
      "bottom-right",
      pw,
      ph,
      textWidth,
      fontSize,
      margin,
    );
    expect(x).toBeCloseTo(pw - margin - textWidth, 1);
    expect(y).toBeCloseTo(margin, 1);
  });

  it("top-center", () => {
    const { x, y } = calculatePosition(
      "top-center",
      pw,
      ph,
      textWidth,
      fontSize,
      margin,
    );
    expect(x).toBeCloseTo((pw - textWidth) / 2, 1);
    expect(y).toBeCloseTo(ph - margin - fontSize, 1);
  });
});

describe("mirrorPosition", () => {
  it("left → right", () => {
    expect(mirrorPosition("top-left")).toBe("top-right");
    expect(mirrorPosition("bottom-left")).toBe("bottom-right");
  });

  it("right → left", () => {
    expect(mirrorPosition("top-right")).toBe("top-left");
    expect(mirrorPosition("bottom-right")).toBe("bottom-left");
  });

  it("center는 그대로", () => {
    expect(mirrorPosition("top-center")).toBe("top-center");
    expect(mirrorPosition("bottom-center")).toBe("bottom-center");
  });
});

describe("parseRange", () => {
  it("단일 페이지", () => {
    expect(parseRange("3", 10)).toEqual([3]);
  });

  it("범위", () => {
    expect(parseRange("2-5", 10)).toEqual([2, 3, 4, 5]);
  });

  it("혼합", () => {
    expect(parseRange("1-3, 7, 9-10", 10)).toEqual([1, 2, 3, 7, 9, 10]);
  });

  it("totalPages 초과 범위 잘림", () => {
    expect(parseRange("8-15", 10)).toEqual([8, 9, 10]);
  });

  it("빈 문자열", () => {
    expect(parseRange("", 10)).toEqual([]);
  });

  it("중복 제거", () => {
    expect(parseRange("1-3, 2-4", 10)).toEqual([1, 2, 3, 4]);
  });

  it("0 이하 무시", () => {
    expect(parseRange("0, -1, 1", 10)).toEqual([1]);
  });
});

describe("getTargetPageIndices", () => {
  it("all이면 모든 페이지", () => {
    const set = getTargetPageIndices(5, {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
    });
    expect(set).toEqual(new Set([0, 1, 2, 3, 4]));
  });

  it("skipFirstN 적용", () => {
    const set = getTargetPageIndices(5, {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      skipFirstN: 2,
    });
    expect(set).toEqual(new Set([2, 3, 4]));
  });

  it("facing-cover는 첫 페이지 제외", () => {
    const set = getTargetPageIndices(5, {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      facingMode: "facing-cover",
    });
    expect(set).toEqual(new Set([1, 2, 3, 4]));
  });

  it("custom range", () => {
    const set = getTargetPageIndices(10, {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      pageRange: "custom",
      customRange: "2-4, 8",
    });
    expect(set).toEqual(new Set([1, 2, 3, 7])); // 0-based
  });

  it("skipFirstN + custom range 조합", () => {
    const set = getTargetPageIndices(10, {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      pageRange: "custom",
      customRange: "1-5",
      skipFirstN: 2,
    });
    // pages 1-5 → indices 0-4, skip 0,1 → indices 2,3,4
    expect(set).toEqual(new Set([2, 3, 4]));
  });
});

// ─── 프로세서 통합 테스트 ───

describe("pageNumbersPdf processor", () => {
  it("기본 설정으로 모든 페이지에 번호 추가", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress, values } = createProgressTracker();

    const result = await pageNumbersPdf(
      [file],
      DEFAULT_PAGE_NUMBER_OPTIONS as unknown as Record<string, unknown>,
      onProgress,
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.filename).toBe("marked-5p_numbered.pdf");
    expect(result.pageCount).toBe(5);

    // 진행률 확인
    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toBe(100);

    // 결과 PDF 검증
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(5);
  });

  it("페이지 크기가 변경되지 않음", async () => {
    const file = await createMarkedPdf(3);
    const originalPdf = await PDFDocument.load(await file.arrayBuffer());
    const originalSizes = getPageSizes(originalPdf);

    const result = await pageNumbersPdf(
      [file],
      DEFAULT_PAGE_NUMBER_OPTIONS as unknown as Record<string, unknown>,
      () => {},
    );

    const resultPdf = await resultToPdf(result.blob);
    const resultSizes = getPageSizes(resultPdf);

    expect(resultSizes).toEqual(originalSizes);
  });

  it.each([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ] as const)("%s 위치에 번호 추가", async (position) => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      position,
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
  });

  it("{n}/{total} 형식", async () => {
    const file = await createMarkedPdf(3);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      format: "{n}/{total}",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("page-n-of 형식", async () => {
    const file = await createMarkedPdf(3);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      format: "page-n-of",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("사용자 정의 형식", async () => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      format: "custom",
      customTemplate: "- {n} of {total} -",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("범위 지정 시 해당 페이지만 처리", async () => {
    const file = await createMarkedPdf(5);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      pageRange: "custom",
      customRange: "2-4",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(5);
  });

  it("시작 번호 5로 설정", async () => {
    const file = await createMarkedPdf(3);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      startNumber: 5,
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("첫 2페이지 건너뛰기", async () => {
    const file = await createMarkedPdf(5);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      skipFirstN: 2,
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(5);
  });

  it("facing 모드", async () => {
    const file = await createMarkedPdf(4);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      position: "bottom-left",
      facingMode: "facing",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(4);
  });

  it("facing-cover 모드에서 첫 페이지 건너뛰기", async () => {
    const file = await createMarkedPdf(4);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      position: "bottom-right",
      facingMode: "facing-cover",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(4);
  });

  it("폰트 변경 (Courier)", async () => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      font: "Courier",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("폰트 변경 (TimesRoman)", async () => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      font: "TimesRoman",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("큰 글자 크기 (48pt)", async () => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      fontSize: 48,
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("색상 변경", async () => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      color: "#FF0000",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("여백 변경 (20mm)", async () => {
    const file = await createMarkedPdf(2);
    const opts: PageNumberOptions = {
      ...DEFAULT_PAGE_NUMBER_OPTIONS,
      marginMm: 20,
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("100페이지 PDF 처리", async () => {
    const file = await createMarkedPdf(100);
    const { onProgress, values } = createProgressTracker();

    const result = await pageNumbersPdf(
      [file],
      DEFAULT_PAGE_NUMBER_OPTIONS as unknown as Record<string, unknown>,
      onProgress,
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(100);
    expect(values[values.length - 1]).toBe(100);
  });

  it("진행률이 단조 증가", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress, values } = createProgressTracker();

    await pageNumbersPdf(
      [file],
      DEFAULT_PAGE_NUMBER_OPTIONS as unknown as Record<string, unknown>,
      onProgress,
    );

    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it("파일이 없으면 에러", async () => {
    await expect(
      pageNumbersPdf(
        [],
        DEFAULT_PAGE_NUMBER_OPTIONS as unknown as Record<string, unknown>,
        () => {},
      ),
    ).rejects.toThrow("No file provided");
  });

  it("_numbered 접미사 추가", async () => {
    const doc = await PDFDocument.create();
    doc.addPage();
    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const file = new File([blob], "report.pdf", { type: "application/pdf" });

    const result = await pageNumbersPdf(
      [file],
      DEFAULT_PAGE_NUMBER_OPTIONS as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.filename).toBe("report_numbered.pdf");
  });

  it("모든 옵션 조합", async () => {
    const file = await createMarkedPdf(6);
    const opts: PageNumberOptions = {
      position: "top-right",
      format: "page-n-of",
      customTemplate: "",
      font: "Courier",
      fontSize: 16,
      color: "#0000FF",
      marginMm: 15,
      pageRange: "custom",
      customRange: "2-5",
      skipFirstN: 0,
      startNumber: 3,
      facingMode: "facing",
    };

    const result = await pageNumbersPdf(
      [file],
      opts as unknown as Record<string, unknown>,
      () => {},
    );

    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.pageCount).toBe(6);
  });
});
