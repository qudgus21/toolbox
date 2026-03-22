import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import redact from "../redact";
import type { RedactArea } from "../redact";
import {
  createMarkedPdf,
  resultToPdf,
  createProgressTracker,
} from "./helpers";

// ─── 헬퍼 ─────────────────────────────────────────────────

function makeRedaction(overrides: Partial<RedactArea> = {}): RedactArea {
  return {
    id: `r_${Math.random().toString(36).slice(2)}`,
    pageIndex: 0,
    x: 50,
    y: 100,
    width: 200,
    height: 30,
    color: "#000000",
    type: "area",
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════
// 테스트
// ═══════════════════════════════════════════════════════════

describe("redact — 기본 동작", () => {
  it("단일 영역 검열 적용", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const result = await redact(
      [file],
      { redactions: [makeRedaction({ pageIndex: 0 })] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);
    expect(result.blob.type).toBe("application/pdf");
  });

  it("여러 페이지에 걸쳐 복수 검열 영역 적용", async () => {
    const file = await createMarkedPdf(5);
    const { onProgress } = createProgressTracker();

    const redactions = [
      makeRedaction({ pageIndex: 0, x: 10, y: 10, width: 100, height: 50 }),
      makeRedaction({ pageIndex: 0, x: 200, y: 200, width: 80, height: 20 }),
      makeRedaction({ pageIndex: 2, x: 50, y: 300, width: 150, height: 40 }),
      makeRedaction({ pageIndex: 4, x: 100, y: 100, width: 200, height: 60 }),
    ];

    const result = await redact([file], { redactions }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(5);
  });

  it("텍스트 타입 검열도 동일하게 적용된다", async () => {
    const file = await createMarkedPdf(2);
    const { onProgress } = createProgressTracker();

    const redactions = [
      makeRedaction({ pageIndex: 0, type: "text", label: "secret", color: "#FF0000" }),
      makeRedaction({ pageIndex: 1, type: "text", label: "password", color: "#808080" }),
    ];

    const result = await redact([file], { redactions }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
  });

  it("다양한 색상으로 검열 적용", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const redactions = [
      makeRedaction({ color: "#000000", y: 50 }),
      makeRedaction({ color: "#FFFFFF", y: 150 }),
      makeRedaction({ color: "#FF0000", y: 250 }),
      makeRedaction({ color: "#808080", y: 350 }),
    ];

    const result = await redact([file], { redactions }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });
});

describe("redact — 출력 포맷", () => {
  it("파일명이 _redacted.pdf로 끝난다", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await redact(
      [file],
      { redactions: [makeRedaction()] },
      onProgress,
    );

    expect(result.filename).toBe("marked-1p_redacted.pdf");
  });

  it("blob 타입이 application/pdf이다", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await redact(
      [file],
      { redactions: [makeRedaction()] },
      onProgress,
    );

    expect(result.blob.type).toBe("application/pdf");
  });

  it("size가 blob.size와 일치한다", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await redact(
      [file],
      { redactions: [makeRedaction()] },
      onProgress,
    );

    expect(result.size).toBe(result.blob.size);
  });

  it("pageCount가 원본과 같다", async () => {
    const file = await createMarkedPdf(4);
    const { onProgress } = createProgressTracker();

    const result = await redact(
      [file],
      { redactions: [makeRedaction({ pageIndex: 1 })] },
      onProgress,
    );

    expect(result.pageCount).toBe(4);
  });
});

describe("redact — 에러 처리", () => {
  it("파일 없으면 에러", async () => {
    const { onProgress } = createProgressTracker();

    await expect(
      redact([], { redactions: [makeRedaction()] }, onProgress),
    ).rejects.toThrow("No file provided");
  });

  it("검열 영역 없으면 에러", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    await expect(
      redact([file], { redactions: [] }, onProgress),
    ).rejects.toThrow("No redactions specified");
  });

  it("redactions 옵션 없으면 에러", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    await expect(
      redact([file], {}, onProgress),
    ).rejects.toThrow("No redactions specified");
  });
});

describe("redact — 엣지 케이스", () => {
  it("범위 밖 pageIndex는 무시된다 (에러 없음)", async () => {
    const file = await createMarkedPdf(2);
    const { onProgress } = createProgressTracker();

    const redactions = [
      makeRedaction({ pageIndex: 0 }),
      makeRedaction({ pageIndex: 99 }), // 존재하지 않는 페이지
      makeRedaction({ pageIndex: -1 }), // 음수 인덱스
    ];

    const result = await redact([file], { redactions }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(2);
  });

  it("1페이지 PDF 검열", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const result = await redact(
      [file],
      { redactions: [makeRedaction()] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("같은 페이지에 많은 검열 영역 적용", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    const redactions = Array.from({ length: 50 }, (_, i) =>
      makeRedaction({ y: i * 10, height: 8 }),
    );

    const result = await redact([file], { redactions }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(1);
  });

  it("결과 PDF가 유효하고 다시 로드 가능하다", async () => {
    const file = await createMarkedPdf(3);
    const { onProgress } = createProgressTracker();

    const redactions = [
      makeRedaction({ pageIndex: 0 }),
      makeRedaction({ pageIndex: 1 }),
      makeRedaction({ pageIndex: 2 }),
    ];

    const result = await redact([file], { redactions }, onProgress);

    const pdf = await resultToPdf(result.blob);
    expect(pdf.getPageCount()).toBe(3);

    // 다시 저장 가능해야 함
    const bytes2 = await pdf.save();
    expect(bytes2.length).toBeGreaterThan(0);
  });

  it("페이지 크기가 보존된다", async () => {
    const file = await createMarkedPdf(2);
    const { onProgress } = createProgressTracker();

    // 원본 페이지 크기 확인
    const origPdf = await PDFDocument.load(await file.arrayBuffer());
    const origSizes = origPdf.getPages().map((p) => p.getSize());

    const result = await redact(
      [file],
      { redactions: [makeRedaction({ pageIndex: 0 })] },
      onProgress,
    );

    const pdf = await resultToPdf(result.blob);
    for (let i = 0; i < pdf.getPageCount(); i++) {
      const { width, height } = pdf.getPage(i).getSize();
      expect(Math.round(width)).toBe(Math.round(origSizes[i].width));
      expect(Math.round(height)).toBe(Math.round(origSizes[i].height));
    }
  });
});

describe("redact — progress 콜백", () => {
  it("progress가 호출된다", async () => {
    const file = await createMarkedPdf(2);
    const { values, onProgress } = createProgressTracker();

    await redact(
      [file],
      { redactions: [makeRedaction({ pageIndex: 0 })] },
      onProgress,
    );

    expect(values.length).toBeGreaterThan(0);
    expect(values[values.length - 1]).toBe(100);
  });

  it("progress가 단조 증가한다", async () => {
    const file = await createMarkedPdf(3);
    const { values, onProgress } = createProgressTracker();

    const redactions = [
      makeRedaction({ pageIndex: 0 }),
      makeRedaction({ pageIndex: 1 }),
      makeRedaction({ pageIndex: 2 }),
    ];

    await redact([file], { redactions }, onProgress);

    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
    expect(values[values.length - 1]).toBe(100);
  });

  it("progress 5, 15, 25 시작 후 90, 100으로 끝난다", async () => {
    const file = await createMarkedPdf(1);
    const { values, onProgress } = createProgressTracker();

    await redact(
      [file],
      { redactions: [makeRedaction()] },
      onProgress,
    );

    expect(values[0]).toBe(5);
    expect(values).toContain(15);
    expect(values).toContain(25);
    expect(values).toContain(90);
    expect(values).toContain(100);
  });
});

describe("redact — Y좌표 변환", () => {
  it("검열 후 결과 PDF의 content stream이 변경된다 (draw 연산 확인)", async () => {
    const file = await createMarkedPdf(1);
    const { onProgress } = createProgressTracker();

    // 원본 PDF 크기
    const origPdf = await PDFDocument.load(await file.arrayBuffer());
    const origBytes = await origPdf.save();

    const result = await redact(
      [file],
      { redactions: [makeRedaction({ x: 50, y: 100, width: 200, height: 30 })] },
      onProgress,
    );

    // 검열 후 바이트가 원본보다 커야 함 (draw 연산이 추가되었으므로)
    const resultBytes = await result.blob.arrayBuffer();
    expect(resultBytes.byteLength).toBeGreaterThan(origBytes.length);
  });
});
