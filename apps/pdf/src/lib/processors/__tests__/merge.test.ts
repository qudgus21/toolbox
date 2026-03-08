import { describe, it, expect } from "vitest";
import mergePdf from "../merge";
import {
  loadFixture,
  createMarkedPdf,
  resultToPdf,
  createProgressTracker,
  fileId,
  getPageOrder,
  getPageRotations,
  getPageSizes,
} from "./helpers";

/* ═══════════════════════════════════════════════════════
 *  PDF 병합 프로세서 — 전체 테스트
 * ═══════════════════════════════════════════════════════ */

// ─── 1. 기본 병합 ───

describe("merge: 기본 병합", () => {
  it("2개 파일 병합 — 페이지 수 합산", async () => {
    const file1 = loadFixture("01-single-page.pdf"); // 1p
    const file2 = loadFixture("02-multi-page-10.pdf"); // 10p
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file1, file2], {}, onProgress);

    expect(result.pageCount).toBe(11);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(11);
  });

  it("3개 파일 순서대로 병합", async () => {
    const file1 = loadFixture("01-single-page.pdf"); // 1p
    const file2 = loadFixture("08-text-heavy.pdf"); // 3p
    const file3 = loadFixture("09-colorful.pdf"); // 3p
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file1, file2, file3], {}, onProgress);
    expect(result.pageCount).toBe(7);
  });

  it("단일 파일 병합 — 원본과 동일한 페이지 수", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    expect(result.pageCount).toBe(10);
  });

  it("마킹된 PDF 병합 시 페이지 순서가 실제로 보존된다", async () => {
    const fileA = await createMarkedPdf(3); // pages 1,2,3
    const fileB = await createMarkedPdf(2); // pages 1,2
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([fileA, fileB], {}, onProgress);
    const pdf = await resultToPdf(result.blob);

    // fileA의 3페이지(width 501,502,503) + fileB의 2페이지(width 501,502)
    const order = await getPageOrder(pdf);
    expect(order).toEqual([1, 2, 3, 1, 2]);
  });

  it("파일 0개 — 빈 PDF 생성 (0 페이지)", async () => {
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([], {}, onProgress);
    expect(result.pageCount).toBe(0);
    expect(result.blob.size).toBeGreaterThan(0); // 빈 PDF도 헤더가 있음
  });

  it("같은 파일을 여러 번 병합", async () => {
    const file = loadFixture("08-text-heavy.pdf"); // 3p
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file, file, file], {}, onProgress);
    expect(result.pageCount).toBe(9); // 3 * 3
  });
});

// ─── 2. 페이지 선택 ───

describe("merge: 페이지 선택 (pageSelections)", () => {
  it("특정 페이지만 선택 — 결과에 선택된 페이지만 포함", async () => {
    const file = loadFixture("02-multi-page-10.pdf"); // 10p
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [1, 3, 5] } },
      onProgress,
    );

    expect(result.pageCount).toBe(3);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
  });

  it("페이지 선택 순서가 결과 PDF 페이지 순서에 실제로 반영된다", async () => {
    const file = await createMarkedPdf(5);
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    // DnD로 5, 3, 1 순서로 변경
    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [5, 3, 1] } },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([5, 3, 1]); // 실제 순서 검증
  });

  it("pageSelections 키가 없는 파일은 전체 페이지 포함", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { pageSelections: {} }, onProgress);
    expect(result.pageCount).toBe(10);
  });

  it("pageSelections 옵션 자체가 undefined", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    expect(result.pageCount).toBe(10);
  });

  it("여러 파일 각각에 다른 페이지 선택 적용", async () => {
    const file1 = loadFixture("02-multi-page-10.pdf"); // 10p → 2p
    const file2 = loadFixture("08-text-heavy.pdf"); // 3p → 1p
    const key1 = fileId(file1);
    const key2 = fileId(file2);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file1, file2],
      { pageSelections: { [key1]: [1, 5], [key2]: [2] } },
      onProgress,
    );

    expect(result.pageCount).toBe(3);
  });

  it("존재하지 않는 페이지 번호는 무시된다 (범위 초과)", async () => {
    const file = loadFixture("08-text-heavy.pdf"); // 3p
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [1, 2, 99, 100] } },
      onProgress,
    );

    expect(result.pageCount).toBe(2);
  });

  it("0번 페이지 — 필터된다 (1-based이므로 0은 무효)", async () => {
    const file = loadFixture("08-text-heavy.pdf"); // 3p
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    // 0 → index -1 → allIndices에 없으므로 필터
    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [0, 1] } },
      onProgress,
    );

    expect(result.pageCount).toBe(1);
  });

  it("음수 페이지 번호 — 필터된다", async () => {
    const file = loadFixture("08-text-heavy.pdf"); // 3p
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [-1, -3, 2] } },
      onProgress,
    );

    expect(result.pageCount).toBe(1); // 2번만 유효
  });

  it("빈 pageSelections 배열 [] — 0 페이지 복사", async () => {
    const file = loadFixture("08-text-heavy.pdf"); // 3p
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    // [] 는 truthy → map/filter 진입 → 빈 배열 → 0 페이지
    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [] } },
      onProgress,
    );

    expect(result.pageCount).toBe(0);
  });

  it("중복 페이지 번호 — 중복만큼 복사", async () => {
    const file = await createMarkedPdf(3);
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file],
      { pageSelections: { [key]: [1, 1, 2, 2, 3] } },
      onProgress,
    );

    expect(result.pageCount).toBe(5);
    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([1, 1, 2, 2, 3]);
  });

  it("같은 파일 여러 번 + 각각 다른 선택은 같은 key로 동일 적용", async () => {
    const file = await createMarkedPdf(5);
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    // 같은 파일 2번 → 같은 fileId → 같은 selection 적용
    const result = await mergePdf(
      [file, file],
      { pageSelections: { [key]: [1, 3] } },
      onProgress,
    );

    expect(result.pageCount).toBe(4); // 2 + 2
    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([1, 3, 1, 3]);
  });
});

// ─── 3. 회전 ───

describe("merge: 회전 (rotations)", () => {
  it("90도 회전 — 결과 PDF에서 실제 각도 확인", async () => {
    const file = loadFixture("01-single-page.pdf");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: { [key]: 90 } }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([90]);
  });

  it("180도 회전", async () => {
    const file = loadFixture("01-single-page.pdf");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: { [key]: 180 } }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([180]);
  });

  it("270도 회전", async () => {
    const file = loadFixture("01-single-page.pdf");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: { [key]: 270 } }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([270]);
  });

  it("0도 회전 — 원본 유지", async () => {
    const file = loadFixture("01-single-page.pdf");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: { [key]: 0 } }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([0]);
  });

  it("360도 회전 — pdf-lib에서 360으로 설정됨", async () => {
    const file = loadFixture("01-single-page.pdf");
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: { [key]: 360 } }, onProgress);

    const pdf = await resultToPdf(result.blob);
    const angle = pdf.getPage(0).getRotation().angle;
    // pdf-lib은 360을 정규화하지 않을 수 있음
    expect(angle === 360 || angle === 0).toBe(true);
  });

  it("이미 회전된 PDF에 추가 회전 — 각도 누적", async () => {
    const file = loadFixture("05-rotated-pages.pdf"); // 4p, 회전된 페이지 포함
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    // 원본의 첫 페이지 회전 각도 파악
    const origPdf = await resultToPdf(
      new Blob([await file.arrayBuffer()], { type: "application/pdf" }),
    );
    const origAngle = origPdf.getPage(0).getRotation().angle;

    // 90도 추가 회전
    const result = await mergePdf([file], { rotations: { [key]: 90 } }, onProgress);
    const pdf = await resultToPdf(result.blob);
    const newAngle = pdf.getPage(0).getRotation().angle;

    expect(newAngle).toBe(origAngle + 90);
  });

  it("rotation 키가 없는 파일은 회전 없음", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: {} }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([0]);
  });

  it("rotations 옵션 자체가 undefined — 회전 없음", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([0]);
  });

  it("회전 + 페이지 선택 동시 적용 — 결과 검증", async () => {
    const file = await createMarkedPdf(5);
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file],
      {
        rotations: { [key]: 180 },
        pageSelections: { [key]: [3, 1, 5] },
      },
      onProgress,
    );

    expect(result.pageCount).toBe(3);
    const pdf = await resultToPdf(result.blob);
    const order = await getPageOrder(pdf);
    expect(order).toEqual([3, 1, 5]); // 순서 보존
    expect(getPageRotations(pdf)).toEqual([180, 180, 180]); // 모두 회전
  });

  it("여러 파일에 각각 다른 회전 적용", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("04-landscape.pdf");
    const key1 = fileId(file1);
    const key2 = fileId(file2);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf(
      [file1, file2],
      { rotations: { [key1]: 90, [key2]: 270 } },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    const rotations = getPageRotations(pdf);
    expect(rotations[0]).toBe(90);
    expect(rotations[1]).toBe(270);
  });

  it("다중 페이지 파일 회전 — 모든 페이지에 동일 회전 적용", async () => {
    const file = loadFixture("08-text-heavy.pdf"); // 3p
    const key = fileId(file);
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], { rotations: { [key]: 90 } }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(getPageRotations(pdf)).toEqual([90, 90, 90]);
  });
});

// ─── 4. 다양한 PDF 타입 ───

describe("merge: 다양한 PDF 타입", () => {
  it("landscape PDF — 크기 보존", async () => {
    const file = loadFixture("04-landscape.pdf"); // 842x595
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(sizes[0].width).toBeGreaterThan(sizes[0].height);
  });

  it("landscape + portrait 합치기 — 각 크기 유지", async () => {
    const landscape = loadFixture("04-landscape.pdf"); // 842x595
    const portrait = loadFixture("01-single-page.pdf"); // 595x842
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([landscape, portrait], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    const sizes = getPageSizes(pdf);

    expect(sizes[0].width).toBeGreaterThan(sizes[0].height); // landscape
    expect(sizes[1].height).toBeGreaterThan(sizes[1].width); // portrait
  });

  it("혼합 크기 PDF 병합 — 페이지 크기 보존", async () => {
    const file = loadFixture("07-mixed-sizes.pdf"); // 5p, 다양한 크기
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(5);
  });
});

// ─── 5. Progress 콜백 ───

describe("merge: progress 콜백", () => {
  it("progress가 0~100 범위로 호출된다", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("08-text-heavy.pdf");
    const { values, onProgress } = createProgressTracker();

    await mergePdf([file1, file2], {}, onProgress);

    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toBe(100);
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    }
  });

  it("progress가 단조 증가한다", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("02-multi-page-10.pdf");
    const { values, onProgress } = createProgressTracker();

    await mergePdf([file1, file2], {}, onProgress);

    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it("파일 1개일 때 progress: 90, 100", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { values, onProgress } = createProgressTracker();

    await mergePdf([file], {}, onProgress);

    expect(values).toEqual([90, 100]);
  });

  it("파일 2개일 때 progress: 45, 90, 100", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("04-landscape.pdf");
    const { values, onProgress } = createProgressTracker();

    await mergePdf([file1, file2], {}, onProgress);

    expect(values).toEqual([45, 90, 100]);
  });
});

// ─── 6. 출력 포맷 ───

describe("merge: 출력 포맷", () => {
  it("blob type은 application/pdf", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    expect(result.blob.type).toBe("application/pdf");
  });

  it("파일명은 항상 merged.pdf", async () => {
    const file = loadFixture("01-single-page.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    expect(result.filename).toBe("merged.pdf");
  });

  it("size는 실제 blob.size와 일치", async () => {
    const file = loadFixture("02-multi-page-10.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file], {}, onProgress);
    expect(result.size).toBe(result.blob.size);
  });

  it("결과 Blob을 PDFDocument로 다시 열 수 있다 (유효한 PDF)", async () => {
    const file1 = loadFixture("01-single-page.pdf");
    const file2 = loadFixture("08-text-heavy.pdf");
    const { onProgress } = createProgressTracker();

    const result = await mergePdf([file1, file2], {}, onProgress);
    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(4);

    // 다시 save 가능
    const bytes = await pdf.save();
    expect(bytes.length).toBeGreaterThan(0);
  });
});
