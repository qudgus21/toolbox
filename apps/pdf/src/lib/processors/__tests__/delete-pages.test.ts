import { describe, it, expect } from "vitest";
import deletePagesPdf from "../delete-pages";
import {
  createMarkedPdf,
  resultToPdf,
  getPageOrder,
  createProgressTracker,
} from "./helpers";

/* ═══════════════════════════════════════════════════════
 *  PDF 페이지 삭제 프로세서 — 전체 테스트
 *
 *  핵심 원칙: 결과물을 실제로 열어서 남은 페이지 순서와
 *  내용을 검증한다. 페이지 수만 세는 것으로는 불충분.
 * ═══════════════════════════════════════════════════════ */

// Helper: pagesToDelete 옵션 생성
function del(pages: number[]): Record<string, unknown> {
  return { pagesToDelete: pages };
}

// ═══════════════════════════════════════════════════════
//  1. 기본 삭제
// ═══════════════════════════════════════════════════════

describe("delete-pages: 기본 삭제", () => {
  it("중간 페이지 1개 삭제", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([3]), onProgress);

    expect(result.filename).toMatch(/_deleted\.pdf$/);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 4, 5]);
  });

  it("첫 페이지 삭제", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([1]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    expect(await getPageOrder(pdf)).toEqual([2, 3, 4, 5]);
  });

  it("마지막 페이지 삭제", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([5]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 3, 4]);
  });

  it("여러 페이지 삭제 — 비연속", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([2, 5, 8]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(7);
    expect(await getPageOrder(pdf)).toEqual([1, 3, 4, 6, 7, 9, 10]);
  });

  it("여러 페이지 삭제 — 연속", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([3, 4, 5, 6]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(6);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 7, 8, 9, 10]);
  });

  it("한 페이지만 남기고 모두 삭제", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([1, 2, 3, 5]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    expect(await getPageOrder(pdf)).toEqual([4]);
  });
});

// ═══════════════════════════════════════════════════════
//  2. 엣지 케이스
// ═══════════════════════════════════════════════════════

describe("delete-pages: 엣지 케이스", () => {
  it("2페이지 PDF에서 1페이지 삭제", async () => {
    const file = await createMarkedPdf(2);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([1]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
    expect(await getPageOrder(pdf)).toEqual([2]);
  });

  it("범위 밖 페이지 번호는 무시", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    // 0, 6, 100은 범위 밖 → 유효한 것은 2번만
    const result = await deletePagesPdf([file], del([0, 2, 6, 100]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    expect(await getPageOrder(pdf)).toEqual([1, 3, 4, 5]);
  });

  it("중복 페이지 번호 처리", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([3, 3, 3]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 4, 5]);
  });

  it("페이지 번호 순서가 뒤섞여도 결과는 원본 순서 유지", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([7, 2, 9, 4]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(6);
    expect(await getPageOrder(pdf)).toEqual([1, 3, 5, 6, 8, 10]);
  });

  it("대량 페이지(100p) PDF에서 절반 삭제", async () => {
    const file = await createMarkedPdf(100);
    const { onProgress } = createProgressTracker();

    // 짝수 페이지 모두 삭제
    const evenPages = Array.from({ length: 50 }, (_, i) => (i + 1) * 2);
    const result = await deletePagesPdf([file], del(evenPages), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(50);
    const expected = Array.from({ length: 50 }, (_, i) => i * 2 + 1);
    expect(await getPageOrder(pdf)).toEqual(expected);
  });
});

// ═══════════════════════════════════════════════════════
//  3. DnD 페이지 재배치 + 삭제
// ═══════════════════════════════════════════════════════

describe("delete-pages: pageOrder (DnD 재배치)", () => {
  it("pageOrder 없으면 원본 순서 유지", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([3]), onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(await getPageOrder(pdf)).toEqual([1, 2, 4, 5]);
  });

  it("pageOrder로 역순 재배치 후 삭제", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    // 사용자가 5,4,3,2,1 순으로 재배치 후 3번 삭제
    const result = await deletePagesPdf(
      [file],
      { pagesToDelete: [3], pageOrder: [5, 4, 3, 2, 1] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    // 3번이 빠지고 역순: 5, 4, 2, 1
    expect(await getPageOrder(pdf)).toEqual([5, 4, 2, 1]);
  });

  it("pageOrder로 일부만 재배치 후 여러 페이지 삭제", async () => {
    const file = await createMarkedPdf(6);
    const { onProgress } = createProgressTracker();

    // 사용자가 3,1,5,2,6,4 순으로 재배치 후 1번, 5번 삭제
    const result = await deletePagesPdf(
      [file],
      { pagesToDelete: [1, 5], pageOrder: [3, 1, 5, 2, 6, 4] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);
    // 1,5 빠지고 남은 순서: 3, 2, 6, 4
    expect(await getPageOrder(pdf)).toEqual([3, 2, 6, 4]);
  });

  it("pageOrder와 삭제 후 pageCount 정확", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf(
      [file],
      { pagesToDelete: [2, 4, 6, 8, 10], pageOrder: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] },
      onProgress,
    );

    expect(result.pageCount).toBe(5);
    const pdf = await resultToPdf(result.blob);
    // 짝수 삭제, 역순: 9, 7, 5, 3, 1
    expect(await getPageOrder(pdf)).toEqual([9, 7, 5, 3, 1]);
  });
});

// ═══════════════════════════════════════════════════════
//  4. 에러 처리
// ═══════════════════════════════════════════════════════

describe("delete-pages: 에러 처리", () => {
  it("파일이 없으면 에러", async () => {
    const { onProgress } = createProgressTracker();

    await expect(
      deletePagesPdf([], del([1]), onProgress),
    ).rejects.toThrow("No file provided");
  });

  it("삭제할 페이지를 선택하지 않으면 에러", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    await expect(
      deletePagesPdf([file], {}, onProgress),
    ).rejects.toThrow("No pages selected for deletion");
  });

  it("빈 배열 선택이면 에러", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    await expect(
      deletePagesPdf([file], del([]), onProgress),
    ).rejects.toThrow("No pages selected for deletion");
  });

  it("모든 페이지를 삭제하면 에러", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    await expect(
      deletePagesPdf([file], del([1, 2, 3]), onProgress),
    ).rejects.toThrow("Cannot delete all pages from PDF");
  });

  it("유효한 페이지가 모두 범위 밖이면 에러", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    await expect(
      deletePagesPdf([file], del([0, -1, 6, 100]), onProgress),
    ).rejects.toThrow("No valid pages selected for deletion");
  });
});

// ═══════════════════════════════════════════════════════
//  5. 결과 메타데이터
// ═══════════════════════════════════════════════════════

describe("delete-pages: 결과 메타데이터", () => {
  it("파일명은 _deleted.pdf로 끝남", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([1]), onProgress);
    expect(result.filename).toBe("marked-5p_deleted.pdf");
  });

  it("결과 size > 0", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([1]), onProgress);
    expect(result.size).toBeGreaterThan(0);
    expect(result.size).toBe(result.blob.size);
  });

  it("pageCount가 정확함", async () => {
    const file = await createMarkedPdf(10);
    const { onProgress } = createProgressTracker();

    const result = await deletePagesPdf([file], del([1, 5, 10]), onProgress);
    expect(result.pageCount).toBe(7);
  });

  it("progress가 100까지 호출됨", async () => {
    const file = await createMarkedPdf(5);
    const { values, onProgress } = createProgressTracker();

    await deletePagesPdf([file], del([3]), onProgress);

    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toBe(100);
    // 증가하는 순서인지 확인
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });
});
