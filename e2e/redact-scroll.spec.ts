import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/20-redact-test-complex.pdf");

test.describe("PDF 검열 - 스크롤 시 페이지 번호 동기화", () => {
  test("스크롤하면 하단 페이지 번호가 자동 변경된다", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/redact`);
    await page.waitForLoadState("networkidle");

    // 파일 업로드
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    // PDF 로딩 대기 — 캔버스 영역이 나타날 때까지
    await page.waitForSelector('[data-page-index="0"]', { timeout: 15000 });
    await page.waitForTimeout(1000); // 렌더링 안정화

    // 초기 페이지 번호 확인: 1이어야 함
    const pageInput = page.locator('input[inputmode="numeric"]').first();
    await expect(pageInput).toHaveValue("1");

    await page.screenshot({ path: "e2e/screenshots/redact-scroll-01-initial.png" });

    // 마지막 페이지로 스크롤
    const lastPageIndex = await page.locator("[data-page-index]").count() - 1;
    const lastPage = page.locator(`[data-page-index="${lastPageIndex}"]`);
    await lastPage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // 스크롤 안정화 + rAF 대기

    await page.screenshot({ path: "e2e/screenshots/redact-scroll-02-scrolled.png" });

    // 페이지 번호가 변경되었는지 확인
    const currentValue = await pageInput.inputValue();
    const currentPage = parseInt(currentValue, 10);
    console.log(`스크롤 후 페이지 번호: ${currentPage}, 총 페이지: ${lastPageIndex + 1}`);

    // 1보다 큰 값이어야 함 (스크롤했으므로)
    expect(currentPage).toBeGreaterThan(1);

    // 중간 페이지로 스크롤
    const midIndex = Math.floor(lastPageIndex / 2);
    const midPage = page.locator(`[data-page-index="${midIndex}"]`);
    await midPage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const midValue = await pageInput.inputValue();
    const midPageNum = parseInt(midValue, 10);
    console.log(`중간 스크롤 후 페이지 번호: ${midPageNum}`);

    // 중간 근처 페이지여야 함
    expect(midPageNum).toBeGreaterThan(1);
    expect(midPageNum).toBeLessThanOrEqual(lastPageIndex + 1);

    await page.screenshot({ path: "e2e/screenshots/redact-scroll-03-mid.png" });

    // 첫 페이지로 다시 스크롤
    const firstPage = page.locator('[data-page-index="0"]');
    await firstPage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const firstValue = await pageInput.inputValue();
    expect(parseInt(firstValue, 10)).toBe(1);

    await page.screenshot({ path: "e2e/screenshots/redact-scroll-04-back-to-first.png" });
  });
});
