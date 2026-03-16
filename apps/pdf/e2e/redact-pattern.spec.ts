import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/20-redact-test-complex.pdf");

test.describe("PDF 검열 - 패턴 감지 (신용카드, 전화번호, 이메일)", () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/redact`);
    await page.waitForLoadState("networkidle");
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForSelector('[data-page-index="0"]', { timeout: 15000 });
    await page.waitForTimeout(1500);
  });

  async function selectCategories(page: import("@playwright/test").Page, types: string[]) {
    for (const type of types) {
      await page.locator(`[data-testid="category-${type}"]`).click();
      await page.waitForTimeout(200);
    }
  }

  async function scanAndWait(page: import("@playwright/test").Page) {
    await page.locator('[data-testid="scan-button"]').click();
    // 스캔 완료 대기 — 버튼이 사라지거나 결과가 나타남
    await page.waitForFunction(() => {
      // scan-button이 사라지면 결과가 표시됨
      return !document.querySelector('[data-testid="scan-button"]');
    }, { timeout: 15000 });
    await page.waitForTimeout(500);
  }

  test("신용카드 패턴 감지 — 유효한 카드번호를 찾는다", async ({ page }) => {
    await selectCategories(page, ["creditCard"]);
    await scanAndWait(page);
    await page.screenshot({ path: "e2e/screenshots/redact-pattern-creditcard.png" });

    const highlights = page.locator(".border-yellow-400");
    const count = await highlights.count();
    console.log(`신용카드 감지: ${count}개`);
    expect(count).toBeGreaterThan(0);
  });

  test("전화번호 패턴 감지 — 국내외 전화번호를 찾는다", async ({ page }) => {
    await selectCategories(page, ["phone"]);
    await scanAndWait(page);
    await page.screenshot({ path: "e2e/screenshots/redact-pattern-phone.png" });

    const highlights = page.locator(".border-yellow-400");
    const count = await highlights.count();
    console.log(`전화번호 감지: ${count}개`);
    expect(count).toBeGreaterThan(0);
  });

  test("이메일 패턴 감지 — 이메일 주소를 찾는다", async ({ page }) => {
    await selectCategories(page, ["email"]);
    await scanAndWait(page);
    await page.screenshot({ path: "e2e/screenshots/redact-pattern-email.png" });

    const highlights = page.locator(".border-yellow-400");
    const count = await highlights.count();
    console.log(`이메일 감지: ${count}개`);
    expect(count).toBeGreaterThan(0);
  });

  test("전체 패턴 스캔 후 선택 항목 검열 — 검열 영역이 생성된다", async ({ page }) => {
    await selectCategories(page, ["creditCard", "phone", "email"]);
    await scanAndWait(page);
    await page.screenshot({ path: "e2e/screenshots/redact-pattern-all-scan.png" });

    // "선택 항목 검열" 버튼 클릭
    const redactBtn = page.locator('[data-testid="redact-selected-button"]');
    await expect(redactBtn).toBeVisible({ timeout: 5000 });
    await redactBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "e2e/screenshots/redact-pattern-applied.png" });

    // 검열 영역(해치 패턴 SVG)이 캔버스 페이지 안에 생성되었는지
    const svgCount = await page.locator("[data-page-index] svg").count();
    console.log(`검열 영역: ${svgCount}개`);
    expect(svgCount).toBeGreaterThan(0);
  });
});
