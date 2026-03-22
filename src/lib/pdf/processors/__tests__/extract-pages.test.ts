import { describe, it, expect } from "vitest";
import extractPages from "../extract-pages";
import {
  loadFixture,
  createMarkedPdf,
  resultToPdf,
  getPageOrder,
  getPageSizes,
  createProgressTracker,
} from "./helpers";

/* ═══════════════════════════════════════════════════════
 *  PDF 페이지 추출 프로세서 — 전체 테스트
 *
 *  핵심: 선택한 페이지만 정확히 추출되는지,
 *  순서와 크기가 보존되는지 검증한다.
 * ═══════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════
//  1. 기본 추출
// ═══════════════════════════════════════════════════════

describe("extract-pages: 기본 추출", () => {
  it("특정 페이지 추출 — 실제 페이지 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [2, 5, 8] },
      onProgress,
    );

    expect(result.filename).toMatch(/_extracted\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
    expect(await getPageOrder(pdf)).toEqual([2, 5, 8]);
  });

  it("단일 페이지 추출", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [5] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    expect(await getPageOrder(pdf)).toEqual([5]);
  });

  it("여러 페이지 추출 — 순서대로", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [1, 2, 3] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3]);
  });
});

// ═══════════════════════════════════════════════════════
//  2. DnD 순서 (pageOrder)
// ═══════════════════════════════════════════════════════

describe("extract-pages: DnD pageOrder", () => {
  it("pageOrder로 순서 변경 — 추출 결과 순서 반영", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    // 원래 순서: 1..10, DnD로 역순 배치
    const result = await extractPages(
      [file],
      {
        pagesToExtract: [2, 5, 8],
        pageOrder: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    // pageOrder에서 extractSet에 포함된 것만: 8, 5, 2
    expect(await getPageOrder(pdf)).toEqual([8, 5, 2]);
  });

  it("pageOrder 없으면 기본 1..N 순서", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [8, 2, 5] }, // 입력 순서 무관, Set 기반
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    // pageOrder 기본 1..10에서 extractSet(2,5,8) 필터 → [2, 5, 8]
    expect(await getPageOrder(pdf)).toEqual([2, 5, 8]);
  });

  it("pageOrder에서 일부를 앞으로 이동", async () => {
    const file = await createMarkedPdf(6);
    const { onProgress } = createProgressTracker();

    // 6번 페이지를 맨 앞으로 이동
    const result = await extractPages(
      [file],
      {
        pagesToExtract: [1, 3, 6],
        pageOrder: [6, 1, 2, 3, 4, 5],
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([6, 1, 3]);
  });
});

// ═══════════════════════════════════════════════════════
//  3. 에러 케이스
// ═══════════════════════════════════════════════════════

describe("extract-pages: 에러", () => {
  it("파일 없으면 에러", async () => {
    const { onProgress } = createProgressTracker();
    await expect(extractPages([], {}, onProgress)).rejects.toThrow("No file provided");
  });

  it("pagesToExtract가 빈 배열 — 에러", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], { pagesToExtract: [] }, onProgress),
    ).rejects.toThrow("No pages selected for extraction");
  });

  it("pagesToExtract가 undefined — 에러", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], {}, onProgress),
    ).rejects.toThrow("No pages selected for extraction");
  });

  it("모든 페이지가 범위 밖 — 에러", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], { pagesToExtract: [50, 100] }, onProgress),
    ).rejects.toThrow("No valid pages selected for extraction");
  });

  it("0이나 음수만 — 에러", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], { pagesToExtract: [0, -1, -3] }, onProgress),
    ).rejects.toThrow("No valid pages selected for extraction");
  });

  it("전체 페이지 추출 시도 — 에러", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], { pagesToExtract: [1, 2, 3] }, onProgress),
    ).rejects.toThrow("Cannot extract all pages");
  });

  it("중복 포함해도 Set 기준 전체이면 에러", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], { pagesToExtract: [1, 2, 3, 1, 2] }, onProgress),
    ).rejects.toThrow("Cannot extract all pages");
  });
});

// ═══════════════════════════════════════════════════════
//  4. 엣지 케이스
// ═══════════════════════════════════════════════════════

describe("extract-pages: 엣지 케이스", () => {
  it("범위 초과 + 유효 값 혼합 — 유효한 것만 추출", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [1, 99, 3, 100] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
    expect(await getPageOrder(pdf)).toEqual([1, 3]);
  });

  it("유효 + 무효 혼합 — 무효 필터 후 추출", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [0, -1, 2, -3, 4] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
    expect(await getPageOrder(pdf)).toEqual([2, 4]);
  });

  it("1페이지 PDF에서 추출 시도 — 전체이므로 에러", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    await expect(
      extractPages([file], { pagesToExtract: [1] }, onProgress),
    ).rejects.toThrow("Cannot extract all pages");
  });
});

// ═══════════════════════════════════════════════════════
//  5. 출력 형식
// ═══════════════════════════════════════════════════════

describe("extract-pages: 출력 형식", () => {
  it("파일명 — _extracted.pdf", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [1, 5] },
      onProgress,
    );

    expect(result.filename).toBe("02-multi-page-10_extracted.pdf");
  });

  it("항상 단일 PDF 출력 (ZIP 아님)", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [1, 2, 3, 4, 5] },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    expect(result.blob.type).toBe("application/pdf");
  });

  it("result.size가 blob.size와 일치", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [2, 4] },
      onProgress,
    );

    expect(result.size).toBeGreaterThan(0);
    expect(result.size).toBe(result.blob.size);
  });

  it("result.pageCount가 추출 수와 일치", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [3, 6, 9] },
      onProgress,
    );

    expect(result.pageCount).toBe(3);
  });
});

// ═══════════════════════════════════════════════════════
//  6. progress 콜백
// ═══════════════════════════════════════════════════════

describe("extract-pages: progress", () => {
  it("0~100 범위, 단조 증가, 마지막 100", async () => {
    const file = await createMarkedPdf(5);
    const { values, onProgress } = createProgressTracker();

    await extractPages([file], { pagesToExtract: [1, 3] }, onProgress);

    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toBe(100);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    }
  });
});

// ═══════════════════════════════════════════════════════
//  7. 다양한 PDF 타입
// ═══════════════════════════════════════════════════════

describe("extract-pages: 다양한 PDF 타입", () => {
  it("landscape PDF — 크기 보존", async () => {
    const file = loadFixture("04-landscape.pdf");
    const { onProgress } = createProgressTracker();

    // landscape fixture는 여러 페이지일 수 있으므로 1페이지만 추출 시도
    // 단, 전체가 1페이지면 에러 → 2페이지 이상인 fixture만 사용
    const srcDoc = await resultToPdf(
      new Blob([await file.arrayBuffer()], { type: "application/pdf" }),
    );
    const total = srcDoc.getPageCount();

    if (total < 2) return; // 1페이지 fixture는 스킵

    const result = await extractPages(
      [file],
      { pagesToExtract: [1] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
  });

  it("mixed-sizes PDF — 각 페이지 크기 보존", async () => {
    const file = loadFixture("07-mixed-sizes.pdf");
    const { onProgress } = createProgressTracker();

    const origPdf = await resultToPdf(
      new Blob([await file.arrayBuffer()], { type: "application/pdf" }),
    );
    const origSizes = getPageSizes(origPdf);

    const result = await extractPages(
      [file],
      { pagesToExtract: [1, 3] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0]).toEqual(origSizes[0]);
    expect(sizes[1]).toEqual(origSizes[2]);
  });

  it("50페이지 PDF에서 일부 추출", async () => {
    const file = loadFixture("03-many-pages-50.pdf");
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [1, 25, 50] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it("결과 PDF를 다시 save 가능 (유효한 PDF)", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await extractPages(
      [file],
      { pagesToExtract: [2, 4] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const bytes = await pdf.save();
    expect(bytes.length).toBeGreaterThan(0);
  });
});
