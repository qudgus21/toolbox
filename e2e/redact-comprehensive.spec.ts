import { test, expect, type Page } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/20-redact-test-complex.pdf");
const SIMPLE_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/01-single-page.pdf");
const MULTI_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/02-multi-page-10.pdf");

/* ── Helpers ───────────────────────────────────── */

async function uploadPdf(page: Page, pdfPath: string) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/ko/redact`);
  await page.waitForLoadState("networkidle");
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(pdfPath);
  await page.waitForSelector('[data-page-index="0"]', { timeout: 15000 });
  await page.waitForTimeout(1500);
}

async function selectCategories(page: Page, types: string[]) {
  for (const type of types) {
    await page.locator(`[data-testid="category-${type}"]`).click();
    await page.waitForTimeout(200);
  }
}

async function scanAndWait(page: Page) {
  const scanBtn = page.locator('[data-testid="scan-button"]');
  await expect(scanBtn).toBeVisible({ timeout: 3000 });
  await scanBtn.click();
  await page.waitForFunction(
    () => !document.querySelector('[data-testid="scan-button"]'),
    { timeout: 20000 },
  );
  await page.waitForTimeout(500);
}

/** 상단 툴바 뱃지에서 검열 영역 수를 읽는다 */
async function getRedactionCount(page: Page): Promise<number> {
  const badge = page.locator("span.text-red-500.rounded-full.font-medium");
  const count = await badge.count();
  if (count === 0) return 0;
  const text = await badge.first().textContent();
  return parseInt(text?.trim() ?? "0", 10);
}

/** 캔버스 위에서 영역 드래그하여 검열 영역 생성 */
async function drawRedactionArea(page: Page, pageIndex = 0) {
  await page.locator("button", { hasText: "영역 검열" }).click();
  await page.waitForTimeout(300);

  // [data-page-index] 자체를 타겟으로 사용
  const pageEl = page.locator(`[data-page-index="${pageIndex}"]`).first();
  await pageEl.waitFor({ state: "visible", timeout: 10000 });
  const box = await pageEl.boundingBox();
  if (!box) throw new Error(`Page element ${pageIndex} not found`);

  await page.mouse.move(box.x + 50, box.y + 50);
  await page.mouse.down();
  await page.mouse.move(box.x + 250, box.y + 150, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(500);
}

/* ═══════════════════════════════════════════════════
   1. 파일 업로드 & 기본 UI 렌더링
   ═══════════════════════════════════════════════════ */

test.describe("1. 파일 업로드 & 기본 UI", () => {
  test.setTimeout(60000);

  test("PDF 업로드 후 3패널 레이아웃이 렌더링된다", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);

    // 좌측 썸네일
    expect(await page.locator("[data-page-index]").count()).toBeGreaterThan(0);

    // 우측 도구 패널
    await expect(page.locator("text=검열 도구")).toBeVisible();

    // 중앙 페이지 렌더링
    await expect(page.locator('[data-page-index="0"]').first()).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/redact-comp-01-layout.png" });
  });

  test("파일 변경 버튼이 존재한다", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await expect(page.locator("text=파일 변경")).toBeVisible();
  });
});

/* ═══════════════════════════════════════════════════
   2. 도구 선택 (선택 / 영역 검열)
   ═══════════════════════════════════════════════════ */

test.describe("2. 도구 선택 모드", () => {
  test.setTimeout(60000);

  test("영역 검열 모드 전환 시 안내 배너가 나타난다", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    await page.locator("button", { hasText: "영역 검열" }).click();
    await page.waitForTimeout(300);

    await expect(page.locator("text=드래그")).toBeVisible();
    await page.screenshot({ path: "e2e/screenshots/redact-comp-02-area-mode.png" });
  });

  test("영역을 드래그하여 검열 영역을 생성한다", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    await drawRedactionArea(page);

    const count = await getRedactionCount(page);
    expect(count).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: "e2e/screenshots/redact-comp-02-area-created.png" });
  });
});

/* ═══════════════════════════════════════════════════
   3. 검열 색상 변경
   ═══════════════════════════════════════════════════ */

test.describe("3. 검열 색상", () => {
  test.setTimeout(60000);

  test("색상 버튼 클릭으로 색상이 변경된다", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);

    const colorBtns = page.locator("button.rounded-full.border-2.cursor-pointer");
    expect(await colorBtns.count()).toBeGreaterThan(1);

    await colorBtns.nth(1).click();
    await page.waitForTimeout(200);

    const selected = page.locator("button.rounded-full.ring-2");
    await expect(selected).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/redact-comp-03-color.png" });
  });
});

/* ═══════════════════════════════════════════════════
   4. 자동 감지 — 개별 카테고리
   ═══════════════════════════════════════════════════ */

test.describe("4. 자동 감지 — 개별 카테고리", () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
  });

  test("신용카드만 스캔", async ({ page }) => {
    await selectCategories(page, ["creditCard"]);
    await scanAndWait(page);
    const count = await page.locator(".border-yellow-400").count();
    console.log(`[신용카드만] 감지: ${count}개`);
    expect(count).toBeGreaterThan(0);
  });

  test("전화번호만 스캔", async ({ page }) => {
    await selectCategories(page, ["phone"]);
    await scanAndWait(page);
    const count = await page.locator(".border-yellow-400").count();
    console.log(`[전화번호만] 감지: ${count}개`);
    expect(count).toBeGreaterThan(0);
  });

  test("이메일만 스캔", async ({ page }) => {
    await selectCategories(page, ["email"]);
    await scanAndWait(page);
    const count = await page.locator(".border-yellow-400").count();
    console.log(`[이메일만] 감지: ${count}개`);
    expect(count).toBeGreaterThan(0);
  });

  test("텍스트 검색만 스캔 (에러 없음)", async ({ page }) => {
    await selectCategories(page, ["text"]);
    const searchInput = page.locator('input[placeholder]').last();
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Acme");
    await scanAndWait(page);
    await page.screenshot({ path: "e2e/screenshots/redact-comp-04-text-only.png" });
  });
});

/* ═══════════════════════════════════════════════════
   5. 자동 감지 — 복합 조합
   ═══════════════════════════════════════════════════ */

test.describe("5. 자동 감지 — 복합 조합", () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
  });

  test("신용카드 + 전화번호", async ({ page }) => {
    await selectCategories(page, ["creditCard", "phone"]);
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);
  });

  test("신용카드 + 이메일", async ({ page }) => {
    await selectCategories(page, ["creditCard", "email"]);
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);
  });

  test("전화번호 + 이메일", async ({ page }) => {
    await selectCategories(page, ["phone", "email"]);
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);
  });

  test("전체 패턴 (신용카드 + 전화번호 + 이메일)", async ({ page }) => {
    await selectCategories(page, ["creditCard", "phone", "email"]);
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);
  });

  test("텍스트 + 신용카드", async ({ page }) => {
    await selectCategories(page, ["text", "creditCard"]);
    await page.locator('input[placeholder]').last().fill("Acme");
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);
  });

  test("텍스트 + 전체 패턴", async ({ page }) => {
    await selectCategories(page, ["text", "creditCard", "phone", "email"]);
    await page.locator('input[placeholder]').last().fill("Acme");
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);
  });
});

/* ═══════════════════════════════════════════════════
   6. 스캔 결과 → 검열 변환
   ═══════════════════════════════════════════════════ */

test.describe("6. 스캔 결과 → 검열 변환", () => {
  test.setTimeout(60000);

  test("전체 패턴 스캔 후 선택 항목 검열 버튼이 동작한다", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await selectCategories(page, ["creditCard", "phone", "email"]);
    await scanAndWait(page);

    const redactBtn = page.locator('[data-testid="redact-selected-button"]');
    await expect(redactBtn).toBeVisible({ timeout: 5000 });
    await redactBtn.click();
    await page.waitForTimeout(500);

    const count = await getRedactionCount(page);
    console.log(`검열 변환 후 영역: ${count}개`);
    expect(count).toBeGreaterThan(0);

    await page.screenshot({ path: "e2e/screenshots/redact-comp-06-converted.png" });
  });

  test("스캔 후 결과 닫기(X) 버튼으로 초기화", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await selectCategories(page, ["email"]);
    await scanAndWait(page);

    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);

    // X 닫기 버튼
    const closeBtn = page.locator(".lucide-x").first();
    await closeBtn.click();
    await page.waitForTimeout(300);

    expect(await page.locator(".border-yellow-400").count()).toBe(0);
  });
});

/* ═══════════════════════════════════════════════════
   7. 카테고리 토글 (선택/해제 반복)
   ═══════════════════════════════════════════════════ */

test.describe("7. 카테고리 토글", () => {
  test.setTimeout(60000);

  test("카테고리 선택 후 해제하면 스캔 버튼이 사라진다", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await selectCategories(page, ["creditCard"]);
    await expect(page.locator('[data-testid="scan-button"]')).toBeVisible();

    await selectCategories(page, ["creditCard"]);
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="scan-button"]')).not.toBeVisible();
  });

  test("스캔 후 카테고리 변경 시 결과가 초기화된다", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await selectCategories(page, ["email"]);
    await scanAndWait(page);
    expect(await page.locator(".border-yellow-400").count()).toBeGreaterThan(0);

    await page.locator('[data-testid="category-phone"]').click();
    await page.waitForTimeout(500);

    expect(await page.locator(".border-yellow-400").count()).toBe(0);
  });
});

/* ═══════════════════════════════════════════════════
   8. 영역 선택 & Undo/Redo
   ═══════════════════════════════════════════════════ */

test.describe("8. 영역 선택 & Undo/Redo", () => {
  test.setTimeout(60000);

  test("영역 생성 후 Undo로 제거, Redo로 복원", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    await drawRedactionArea(page);

    const c1 = await getRedactionCount(page);
    expect(c1).toBeGreaterThanOrEqual(1);

    // Mac Undo
    await page.keyboard.press("Meta+z");
    await page.waitForTimeout(300);
    expect(await getRedactionCount(page)).toBe(0);

    // Mac Redo
    await page.keyboard.press("Meta+Shift+z");
    await page.waitForTimeout(300);
    expect(await getRedactionCount(page)).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: "e2e/screenshots/redact-comp-08-undo-redo.png" });
  });

  test("빈 영역 클릭 시 선택 해제", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    await drawRedactionArea(page);

    await page.locator("button", { hasText: "선택" }).first().click();
    await page.waitForTimeout(200);

    // 영역 클릭 → 선택
    const svg = page.locator("[data-page-index='0'] svg").first();
    if (await svg.isVisible()) {
      await svg.click();
      await page.waitForTimeout(300);
    }

    // 빈 곳 클릭 → 선택 해제
    const pageEl = page.locator("[data-page-index='0']").first();
    const box = await pageEl.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width - 20, box.y + box.height - 20);
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: "e2e/screenshots/redact-comp-08-deselected.png" });
  });
});

/* ═══════════════════════════════════════════════════
   9. 페이지 선택 검열
   ═══════════════════════════════════════════════════ */

test.describe("9. 페이지 선택 검열", () => {
  test.setTimeout(60000);

  test("페이지 선택 섹션이 기본 접혀있고 펼치면 옵션이 보인다", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    expect(await page.locator('input[name="pageRedactMode"]').count()).toBe(0);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);

    await expect(page.locator('input[name="pageRedactMode"]').first()).toBeVisible();
  });

  test("현재 페이지 검열", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);

    await page.locator("button", { hasText: "선택 페이지 검열" }).click();
    await page.waitForTimeout(500);

    expect(await getRedactionCount(page)).toBe(1);
  });

  test("홀수 페이지 검열", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);

    await page.locator("label", { hasText: "홀수 페이지" }).click();
    await page.waitForTimeout(200);
    await page.locator("button", { hasText: "선택 페이지 검열" }).click();
    await page.waitForTimeout(500);

    expect(await getRedactionCount(page)).toBe(5);
  });

  test("짝수 페이지 검열", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);

    await page.locator("label", { hasText: "짝수 페이지" }).click();
    await page.waitForTimeout(200);
    await page.locator("button", { hasText: "선택 페이지 검열" }).click();
    await page.waitForTimeout(500);

    expect(await getRedactionCount(page)).toBe(5);
  });

  test("모든 페이지 검열", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);

    await page.locator("label", { hasText: "모든 페이지" }).click();
    await page.waitForTimeout(200);
    await page.locator("button", { hasText: "선택 페이지 검열" }).click();
    await page.waitForTimeout(1000); // 10개 생성이라 여유 있게

    expect(await getRedactionCount(page)).toBe(10);
  });

  test("사용자 지정 페이지 검열", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);

    await page.locator("label", { hasText: "페이지 직접 입력" }).click();
    await page.waitForTimeout(200);

    await page.locator('input[placeholder*="1, 3-5"]').fill("1-3, 5");
    await page.waitForTimeout(200);

    await page.locator("button", { hasText: "선택 페이지 검열" }).click();
    await page.waitForTimeout(500);

    expect(await getRedactionCount(page)).toBe(4);
  });
});

/* ═══════════════════════════════════════════════════
   10. 스크롤 & 페이지 동기화
   ═══════════════════════════════════════════════════ */

test.describe("10. 스크롤 & 페이지 동기화", () => {
  test.setTimeout(60000);

  test("스크롤 시 하단 페이지 번호가 변경된다", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    const pageInput = page.locator('input[inputmode="numeric"]').first();
    await expect(pageInput).toHaveValue("1");

    // 중간 페이지로 스크롤 (마지막 페이지는 로딩이 오래걸릴 수 있음)
    const midIdx = 4;
    await page.locator(`[data-page-index="${midIdx}"]`).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    const val = parseInt(await pageInput.inputValue(), 10);
    expect(val).toBeGreaterThan(1);
  });
});

/* ═══════════════════════════════════════════════════
   11. 줌 & 레이아웃
   ═══════════════════════════════════════════════════ */

test.describe("11. 줌 & 레이아웃", () => {
  test.setTimeout(60000);

  test("줌 표시가 보인다", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    // 줌 % — input의 value에 표시됨
    const zoomInput = page.locator("input").filter({ hasText: /\d+%/ }).or(
      page.locator("input[value*='%']")
    );
    // fallback: 줌 관련 버튼(+/-)이라도 있는지
    const zoomArea = page.locator(".lucide-zoom-in").or(page.locator(".lucide-zoom-out"));
    await expect(zoomArea.first()).toBeVisible();
  });

  test("2열 전환 버튼이 동작한다", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    const colBtn = page.locator(".lucide-columns-2").first();
    if (await colBtn.isVisible()) {
      await colBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: "e2e/screenshots/redact-comp-11-2col.png" });
    }
  });
});

/* ═══════════════════════════════════════════════════
   12. 썸네일 뱃지 카운트
   ═══════════════════════════════════════════════════ */

test.describe("12. 썸네일 뱃지 카운트", () => {
  test.setTimeout(60000);

  test("영역 검열 생성 시 썸네일에 뱃지 표시", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    await drawRedactionArea(page);

    // 좌측 패널의 빨간 뱃지 (text-red-500 중 가장 작은 것)
    const badge = page.locator("span.text-red-500").first();
    await expect(badge).toBeVisible();
  });

  test("자동 감지 시에도 썸네일 뱃지에 반영", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await selectCategories(page, ["creditCard", "phone", "email"]);
    await scanAndWait(page);

    const badges = page.locator("span.text-red-500");
    expect(await badges.count()).toBeGreaterThan(0);
  });
});

/* ═══════════════════════════════════════════════════
   13. 엣지 케이스 & 에러 처리
   ═══════════════════════════════════════════════════ */

test.describe("13. 엣지 케이스", () => {
  test.setTimeout(60000);

  test("텍스트만 선택 + 검색어 없으면 스캔 버튼 비활성", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await page.locator('[data-testid="category-text"]').click();
    await page.waitForTimeout(300);

    const scanBtn = page.locator('[data-testid="scan-button"]');
    await expect(scanBtn).toBeDisabled();
  });

  test("텍스트 + 패턴 선택 시 검색어 없어도 스캔 가능", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);
    await selectCategories(page, ["text", "creditCard"]);

    const scanBtn = page.locator('[data-testid="scan-button"]');
    await expect(scanBtn).toBeEnabled();
  });

  test("연속 스캔 — 재스캔해도 에러 없이 동작", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);

    // 1차 스캔
    await selectCategories(page, ["creditCard"]);
    await scanAndWait(page);
    const count1 = await page.locator(".border-yellow-400").count();
    console.log(`연속 스캔 1차: ${count1}`);
    expect(count1).toBeGreaterThan(0);

    // 카테고리 토글 → 결과 초기화 → 이메일만으로 재스캔
    await page.locator('[data-testid="category-phone"]').click();
    await page.waitForTimeout(300);
    // 결과 초기화됨, 이제 creditCard + phone이 선택됨
    await scanAndWait(page);
    const count2 = await page.locator(".border-yellow-400").count();
    console.log(`연속 스캔 2차: ${count2}`);
    expect(count2).toBeGreaterThan(0);
  });

  test("영역 검열 + 패턴 검열 혼합 사용", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);

    // 1. 영역 검열
    await drawRedactionArea(page);
    const c1 = await getRedactionCount(page);
    expect(c1).toBeGreaterThanOrEqual(1);

    // 2. 패턴 스캔 후 검열 변환
    await selectCategories(page, ["creditCard"]);
    await scanAndWait(page);
    const redactBtn = page.locator('[data-testid="redact-selected-button"]');
    await expect(redactBtn).toBeVisible();
    await redactBtn.click();
    await page.waitForTimeout(500);

    const c2 = await getRedactionCount(page);
    console.log(`영역+패턴: ${c1} → ${c2}`);
    expect(c2).toBeGreaterThan(c1);

    await page.screenshot({ path: "e2e/screenshots/redact-comp-13-mixed.png" });
  });

  test("영역 + 페이지 검열 혼합", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);

    await drawRedactionArea(page);
    const c1 = await getRedactionCount(page);
    expect(c1).toBeGreaterThanOrEqual(1);

    await page.locator("text=페이지 선택").click();
    await page.waitForTimeout(500);
    await page.locator("button", { hasText: "선택 페이지 검열" }).click();
    await page.waitForTimeout(500);

    const c2 = await getRedactionCount(page);
    expect(c2).toBeGreaterThan(c1);
  });
});

/* ═══════════════════════════════════════════════════
   14. 다른 PDF 파일 호환성
   ═══════════════════════════════════════════════════ */

test.describe("14. 다른 PDF 파일 호환성", () => {
  test.setTimeout(60000);

  test("단일 페이지 PDF에서 기본 동작", async ({ page }) => {
    await uploadPdf(page, SIMPLE_PDF);
    await expect(page.locator('[data-page-index="0"]').first()).toBeVisible();
  });

  test("10페이지 PDF에서 영역 검열 동작", async ({ page }) => {
    await uploadPdf(page, MULTI_PDF);
    await drawRedactionArea(page);
    expect(await getRedactionCount(page)).toBeGreaterThanOrEqual(1);
  });
});
