import { describe, it, expect } from "vitest";
import splitPdf from "../split";
import {
  loadFixture,
  createMarkedPdf,
  resultToPdf,
  extractZipPdfs,
  extractZipFilenames,
  getResultPageCounts,
  getPageOrder,
  getPageSizes,
  createProgressTracker,
} from "./helpers";

/* ═══════════════════════════════════════════════════════
 *  PDF 분할 프로세서 — 전체 테스트
 *
 *  핵심 원칙: 결과물을 실제로 열어서 페이지 순서, 내용,
 *  크기를 검증한다. 페이지 수만 세는 것으로는 불충분.
 * ═══════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════
//  1. 범위 분할 — Custom
// ═══════════════════════════════════════════════════════

describe("split: range - custom", () => {
  it("단일 범위 — PDF 1개, 실제 페이지 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "custom", ranges: [{ from: 3, to: 7 }] },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(5);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([3, 4, 5, 6, 7]); // 실제 페이지 확인
  });

  it("여러 범위 — ZIP, 각 파일의 실제 페이지 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "custom",
        ranges: [
          { from: 1, to: 3 },
          { from: 4, to: 7 },
          { from: 8, to: 10 },
        ],
      },
      onProgress,
    );

    expect(result.filename).toMatch(/\.zip$/);
    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);

    expect(await getPageOrder(pdfs[0])).toEqual([1, 2, 3]);
    expect(await getPageOrder(pdfs[1])).toEqual([4, 5, 6, 7]);
    expect(await getPageOrder(pdfs[2])).toEqual([8, 9, 10]);
  });

  it("DnD reorder — [8-10],[1-3],[4-7] 순서로 바꾸면 결과도 그 순서", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "custom",
        ranges: [
          { from: 8, to: 10 },
          { from: 1, to: 3 },
          { from: 4, to: 7 },
        ],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    // ZIP 내 파일은 _1, _2, _3 순서 → _1이 8-10, _2가 1-3, _3이 4-7
    expect(await getPageOrder(pdfs[0])).toEqual([8, 9, 10]);
    expect(await getPageOrder(pdfs[1])).toEqual([1, 2, 3]);
    expect(await getPageOrder(pdfs[2])).toEqual([4, 5, 6, 7]);
  });

  it("mergeIntoOne — 여러 범위를 하나의 PDF로, 실제 순서 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "custom",
        ranges: [
          { from: 7, to: 9 },
          { from: 1, to: 3 },
        ],
        mergeIntoOne: true,
      },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([7, 8, 9, 1, 2, 3]); // 범위 순서 보존
  });

  it("mergeIntoOne: false 명시적 — 여러 파일로 분할", async () => {
    const file = await createMarkedPdf(6);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "custom",
        ranges: [{ from: 1, to: 3 }, { from: 4, to: 6 }],
        mergeIntoOne: false,
      },
      onProgress,
    );

    expect(result.filename).toMatch(/\.zip$/);
    const pdfs = await extractZipPdfs(result.blob);
    expect(await getPageOrder(pdfs[0])).toEqual([1, 2, 3]);
    expect(await getPageOrder(pdfs[1])).toEqual([4, 5, 6]);
  });

  it("범위가 pageCount를 초과하면 clamp", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 1, to: 999 }] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([1, 2, 3, 4, 5]); // clamped to 5
  });

  it("from이 0 — 1로 clamp", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 0, to: 3 }] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([1, 2, 3]);
  });

  it("from이 음수 — 1로 clamp", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: -3, to: 2 }] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([1, 2]);
  });

  it("from > to — 필터된다", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        ranges: [
          { from: 5, to: 3 }, // invalid
          { from: 1, to: 2 }, // valid
        ],
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2]);
  });

  it("모든 범위가 invalid — 전체 폴백", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        ranges: [
          { from: 3, to: 1 },
          { from: 4, to: 2 },
        ],
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5]);
  });

  it("빈 ranges — 전체 폴백", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5]);
  });

  it("ranges가 undefined — 전체 폴백", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "custom" },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5]);
  });

  it("겹치는 범위 + mergeIntoOne — 중복 페이지 포함", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        ranges: [
          { from: 1, to: 5 },
          { from: 3, to: 7 },
        ],
        mergeIntoOne: true,
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    // 1-5 + 3-7 = [1,2,3,4,5,3,4,5,6,7]
    expect(order).toEqual([1, 2, 3, 4, 5, 3, 4, 5, 6, 7]);
  });

  it("from === to — 1페이지 범위", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 3, to: 3 }] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([3]);
  });
});

// ═══════════════════════════════════════════════════════
//  2. 범위 분할 — Fixed interval
// ═══════════════════════════════════════════════════════

describe("split: range - fixed", () => {
  it("3페이지씩 — 실제 페이지 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: 3 },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(4);
    expect(await getPageOrder(pdfs[0])).toEqual([1, 2, 3]);
    expect(await getPageOrder(pdfs[1])).toEqual([4, 5, 6]);
    expect(await getPageOrder(pdfs[2])).toEqual([7, 8, 9]);
    expect(await getPageOrder(pdfs[3])).toEqual([10]);
  });

  it("간격 1 — 각 페이지 개별 분할, 페이지 확인", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: 1 },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
    expect(await getPageOrder(pdfs[1])).toEqual([2]);
    expect(await getPageOrder(pdfs[2])).toEqual([3]);
  });

  it("간격 >= 전체 페이지 수 — 단일 PDF", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: 100 },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5]);
  });

  it("fixedInterval이 undefined — 기본 1", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed" },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3); // 각 1페이지씩
  });

  it("fixedInterval이 0 — Math.max(1, 0) = 1로 clamp", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: 0 },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3); // 1씩 분할
  });

  it("fixedInterval이 음수 — 1로 clamp", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: -5 },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
  });

  it("DnD reorder — [6-10],[1-5] 스왑, 결과물 실제 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "fixed",
        fixedInterval: 5,
        ranges: [
          { from: 6, to: 10 },
          { from: 1, to: 5 },
        ],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(await getPageOrder(pdfs[0])).toEqual([6, 7, 8, 9, 10]);
    expect(await getPageOrder(pdfs[1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("ranges override가 빈 배열 — interval 기반 폴백", async () => {
    const file = await createMarkedPdf(6);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "fixed",
        fixedInterval: 2,
        ranges: [], // 빈 배열
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    expect(await getPageOrder(pdfs[0])).toEqual([1, 2]);
    expect(await getPageOrder(pdfs[1])).toEqual([3, 4]);
    expect(await getPageOrder(pdfs[2])).toEqual([5, 6]);
  });

  it("fixed + mergeIntoOne — 전체 합쳐서 단일 PDF", async () => {
    const file = await createMarkedPdf(6);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "fixed",
        fixedInterval: 2,
        mergeIntoOne: true,
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("fixed + DnD reorder + mergeIntoOne — 순서 반영 검증", async () => {
    const file = await createMarkedPdf(6);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        rangeType: "fixed",
        fixedInterval: 3,
        ranges: [
          { from: 4, to: 6 },
          { from: 1, to: 3 },
        ],
        mergeIntoOne: true,
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([4, 5, 6, 1, 2, 3]);
  });
});

// ═══════════════════════════════════════════════════════
//  3. 페이지 추출 — 전체 (extractAll)
// ═══════════════════════════════════════════════════════

describe("split: extract - all", () => {
  it("모든 페이지 개별 추출 — 각 파일의 실제 페이지 확인", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: true },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(5);

    for (let i = 0; i < 5; i++) {
      expect(await getPageOrder(pdfs[i])).toEqual([i + 1]);
    }
  });

  it("DnD 순서 변경 — [5,3,1,4,2] 순서로, 결과물 실제 검증", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [5, 3, 1, 4, 2],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(5);

    // _1.pdf = 5번 페이지, _2.pdf = 3번 페이지, ...
    expect(await getPageOrder(pdfs[0])).toEqual([5]);
    expect(await getPageOrder(pdfs[1])).toEqual([3]);
    expect(await getPageOrder(pdfs[2])).toEqual([1]);
    expect(await getPageOrder(pdfs[3])).toEqual([4]);
    expect(await getPageOrder(pdfs[4])).toEqual([2]);
  });

  it("DnD에서 8번 페이지를 4번 위치로 이동 — 결과 검증", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    // 원래: [1,2,3,4,5,6,7,8,9,10]
    // 8번을 4번 위치로: [1,2,3,8,4,5,6,7,9,10]
    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [1, 2, 3, 8, 4, 5, 6, 7, 9, 10],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
    expect(await getPageOrder(pdfs[1])).toEqual([2]);
    expect(await getPageOrder(pdfs[2])).toEqual([3]);
    expect(await getPageOrder(pdfs[3])).toEqual([8]); // 원래 8번이 4번째 위치
    expect(await getPageOrder(pdfs[4])).toEqual([4]);
  });

  it("일부 선택 해제 — [3,1,5]만 남김, 순서 검증", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [3, 1, 5],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    expect(await getPageOrder(pdfs[0])).toEqual([3]);
    expect(await getPageOrder(pdfs[1])).toEqual([1]);
    expect(await getPageOrder(pdfs[2])).toEqual([5]);
  });

  it("mergeIntoOne + DnD — 순서 반영된 단일 PDF", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [5, 3, 1],
        mergeIntoOne: true,
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([5, 3, 1]);
  });

  it("extractPages 없이 extractAll — 순차 페이지", async () => {
    const file = await createMarkedPdf(4);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: true },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    for (let i = 0; i < 4; i++) {
      expect(await getPageOrder(pdfs[i])).toEqual([i + 1]);
    }
  });

  it("extractAll이 undefined — true로 평가 (extractAll !== false)", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract" }, // extractAll 생략
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
  });

  it("extractAll: true + extractPages: [] — 빈 배열은 무시, 순차 폴백", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: true, extractPages: [] },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
  });

  it("extractPages에 0이나 음수 — 필터됨", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [0, -1, 2, -3, 4],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(2); // 2, 4만 유효
    expect(await getPageOrder(pdfs[0])).toEqual([2]);
    expect(await getPageOrder(pdfs[1])).toEqual([4]);
  });

  it("extractPages에 범위 초과 + 유효 값 혼합", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [1, 99, 3, 100],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(2);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
    expect(await getPageOrder(pdfs[1])).toEqual([3]);
  });

  it("extractPages에 중복 번호 — 중복 유지", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: true,
        extractPages: [1, 1, 3, 3],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(4);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
    expect(await getPageOrder(pdfs[1])).toEqual([1]);
    expect(await getPageOrder(pdfs[2])).toEqual([3]);
    expect(await getPageOrder(pdfs[3])).toEqual([3]);
  });

  it("1페이지 PDF — 단일 PDF 출력", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: true },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1]);
  });
});

// ═══════════════════════════════════════════════════════
//  4. 페이지 추출 — 선택 (extractAll=false)
// ═══════════════════════════════════════════════════════

describe("split: extract - select", () => {
  it("특정 페이지만 추출 — 실제 페이지 확인", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: false,
        extractPages: [2, 5, 8],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    expect(await getPageOrder(pdfs[0])).toEqual([2]);
    expect(await getPageOrder(pdfs[1])).toEqual([5]);
    expect(await getPageOrder(pdfs[2])).toEqual([8]);
  });

  it("역순 추출 — 순서 보존 검증", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: false,
        extractPages: [10, 5, 1],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(await getPageOrder(pdfs[0])).toEqual([10]);
    expect(await getPageOrder(pdfs[1])).toEqual([5]);
    expect(await getPageOrder(pdfs[2])).toEqual([1]);
  });

  it("선택 추출 + mergeIntoOne — 순서 보존", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: false,
        extractPages: [9, 7, 5, 3, 1],
        mergeIntoOne: true,
      },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([9, 7, 5, 3, 1]);
  });

  it("범위 밖 페이지 필터", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: false,
        extractPages: [1, 2, 50, 100],
      },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(2);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
    expect(await getPageOrder(pdfs[1])).toEqual([2]);
  });

  it("모든 페이지가 범위 밖 — 전체 폴백", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "extract",
        extractAll: false,
        extractPages: [50, 100, 200],
      },
      onProgress,
    );

    // 빈 배열 → 전체 폴백
    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
  });

  it("빈 extractPages — 전체 폴백", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: false, extractPages: [] },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
  });

  it("extractPages가 undefined — 전체 폴백", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: false },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
  });

  it("1개만 추출 — 단일 PDF", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: false, extractPages: [7] },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([7]);
  });
});

// ═══════════════════════════════════════════════════════
//  5. 크기 분할
// ═══════════════════════════════════════════════════════

describe("split: size", () => {
  it("충분히 큰 크기 — 단일 PDF, 전체 페이지 포함", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "size", maxSizeKB: 99999 },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5]);
  });

  it("작은 크기 — 여러 파일로, 전체 페이지 합 보존", async () => {
    const file = loadFixture("02-multi-page-10.pdf"); // 10p
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "size", maxSizeKB: 1 },
      onProgress,
    );

    const pageCounts = await getResultPageCounts(result.blob, result.filename);
    const total = pageCounts.reduce((a, b) => a + b, 0);
    expect(total).toBe(10);
    for (const pc of pageCounts) {
      expect(pc).toBeGreaterThanOrEqual(1);
    }
  });

  it("마킹된 PDF 크기 분할 — 페이지 순서가 보존", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "size", maxSizeKB: 99999 },
      onProgress,
    );

    // 충분히 크면 단일 파일 → 순서 그대로
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("기본 maxSizeKB는 5120 (5MB)", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await splitPdf([file], { mode: "size" }, onProgress);
    expect(result.filename).toMatch(/\.pdf$/); // 작은 파일이므로 단일
  });

  it("maxSizeKB가 0 — 모든 페이지 초과, 1페이지씩", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "size", maxSizeKB: 0 },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    expect(pdfs.length).toBe(3);
    expect(await getPageOrder(pdfs[0])).toEqual([1]);
    expect(await getPageOrder(pdfs[1])).toEqual([2]);
    expect(await getPageOrder(pdfs[2])).toEqual([3]);
  });

  it("1페이지 PDF + size 모드", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "size", maxSizeKB: 1 },
      onProgress,
    );

    expect(result.filename).toMatch(/\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1]);
  });
});

// ═══════════════════════════════════════════════════════
//  6. 공통 동작
// ═══════════════════════════════════════════════════════

describe("split: 공통 동작", () => {
  it("파일 없으면 에러", async () => {
    const { onProgress } = createProgressTracker();
    await expect(splitPdf([], { mode: "range" }, onProgress)).rejects.toThrow("No file provided");
  });

  it("기본 mode는 range", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf([file], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3]);
  });

  it("알 수 없는 mode — default 분기 (range로 폴백)", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf([file], { mode: "unknown_mode" }, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3]);
  });

  it("파일명 패턴 — 단일: _split.pdf", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 1, to: 5 }] },
      onProgress,
    );
    expect(result.filename).toBe("02-multi-page-10_split.pdf");
  });

  it("파일명 패턴 — ZIP: _split.zip", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 1, to: 3 }, { from: 4, to: 10 }] },
      onProgress,
    );
    expect(result.filename).toBe("02-multi-page-10_split.zip");
  });

  it("ZIP 내 파일명 패턴 — _{번호}.pdf", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      {
        mode: "range",
        ranges: [
          { from: 1, to: 3 },
          { from: 4, to: 6 },
          { from: 7, to: 10 },
        ],
      },
      onProgress,
    );

    const names = await extractZipFilenames(result.blob);
    expect(names).toEqual([
      "02-multi-page-10_1.pdf",
      "02-multi-page-10_2.pdf",
      "02-multi-page-10_3.pdf",
    ]);
  });

  it("progress — 0~100 범위, 단조 증가, 마지막 100", async () => {
    const file = await createMarkedPdf(5);
    const { values, onProgress } = createProgressTracker();

    await splitPdf([file], { mode: "extract", extractAll: true }, onProgress);

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

  it("결과 blob size > 0 이고 result.size와 일치", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf([file], { mode: "extract", extractAll: true }, onProgress);
    expect(result.size).toBeGreaterThan(0);
    expect(result.size).toBe(result.blob.size);
  });
});

// ═══════════════════════════════════════════════════════
//  7. 다양한 PDF 타입
// ═══════════════════════════════════════════════════════

describe("split: 다양한 PDF 타입", () => {
  it("1페이지 PDF — range custom", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 1, to: 1 }] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1]);
  });

  it("1페이지 PDF — range fixed", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: 3 },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1]);
  });

  it("landscape PDF — 분할 후 크기 보존", async () => {
    const file = loadFixture("04-landscape.pdf"); // 842x595
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", ranges: [{ from: 1, to: 1 }] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);
    expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
  });

  it("mixed-sizes PDF — 각 페이지 크기 보존", async () => {
    const file = loadFixture("07-mixed-sizes.pdf"); // 5p
    const { onProgress } = createProgressTracker();

    // 원본 크기 기록
    const origPdf = await resultToPdf(
      new Blob([await file.arrayBuffer()], { type: "application/pdf" }),
    );
    const origSizes = getPageSizes(origPdf);

    // extract all
    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: true },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    for (let i = 0; i < pdfs.length; i++) {
      const sizes = getPageSizes(pdfs[i]);
      expect(sizes[0].width).toBe(origSizes[i].width);
      expect(sizes[0].height).toBe(origSizes[i].height);
    }
  });

  it("50페이지 PDF — fixed 10씩 분할", async () => {
    const file = loadFixture("03-many-pages-50.pdf");
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "range", rangeType: "fixed", fixedInterval: 10 },
      onProgress,
    );

    const pageCounts = await getResultPageCounts(result.blob, result.filename);
    expect(pageCounts).toEqual([10, 10, 10, 10, 10]);
  });

  it("결과 PDF를 다시 save 가능 (유효한 PDF)", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await splitPdf(
      [file],
      { mode: "extract", extractAll: false, extractPages: [2, 4] },
      onProgress,
    );

    const pdfs = await extractZipPdfs(result.blob);
    for (const pdf of pdfs) {
      const bytes = await pdf.save();
      expect(bytes.length).toBeGreaterThan(0);
    }
  });
});
