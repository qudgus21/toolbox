import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/flatten-test.pdf");

test.describe("PDF 평탄화 도구", () => {
  test("페이지 로드 및 기본 UI 확인", async ({ page }) => {
    await page.goto(`${BASE_URL}/ko/flatten`);
    await page.waitForLoadState("networkidle");

    // 타이틀 확인
    await expect(page.locator("h1")).toContainText("평탄화");

    // 파일 업로드 영역 확인
    await expect(page.locator('input[type="file"]')).toBeAttached();

    await page.screenshot({ path: "e2e/screenshots/flatten-01-idle.png", fullPage: true });
  });

  test("PDF 업로드 → 분석 결과 표시", async ({ page }) => {
    await page.goto(`${BASE_URL}/ko/flatten`);
    await page.waitForLoadState("networkidle");

    // 파일 업로드
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    // 분석 결과 로딩 대기
    await page.waitForTimeout(2000);

    // 분석 결과 확인 — 폼 필드 발견
    await expect(page.getByText("양식 필드 5개 발견")).toBeVisible();
    await expect(page.getByText("주석 3개 발견")).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/flatten-02-loaded.png", fullPage: true });
  });

  test("좌우 레이아웃 확인 (미리보기 + 옵션)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/flatten`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    await page.waitForTimeout(2000);

    // 그리드 레이아웃 확인
    const grid = page.locator(".grid.grid-cols-1.lg\\:grid-cols-\\[1fr_340px\\]");
    await expect(grid).toBeVisible();

    // 미리보기 영역에 썸네일이 표시되는지 확인
    await page.waitForTimeout(3000); // 썸네일 렌더링 대기

    await page.screenshot({ path: "e2e/screenshots/flatten-03-layout.png", fullPage: true });
  });

  test("토글 옵션 동작 확인", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/flatten`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    await page.waitForTimeout(2000);

    // 양식 필드 토글 확인
    const formToggle = page.locator("button:has-text('양식 필드')");
    await expect(formToggle).toBeVisible();

    // 주석 토글 확인
    const annotToggle = page.locator("button:has-text('주석')");
    await expect(annotToggle).toBeVisible();

    // 토글 클릭 테스트
    await formToggle.click();
    await page.screenshot({ path: "e2e/screenshots/flatten-04-toggle-form-off.png", fullPage: true });

    await formToggle.click();
    await page.screenshot({ path: "e2e/screenshots/flatten-05-toggle-form-on.png", fullPage: true });
  });

  test("평탄화 실행 및 결과", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/flatten`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    await page.waitForTimeout(2000);

    // 평탄화 버튼 클릭
    const flattenButton = page.locator("button:has-text('평탄화')").last();
    await expect(flattenButton).toBeEnabled();
    await flattenButton.click();

    // 처리 완료 대기
    await page.waitForTimeout(5000);

    // 결과 카드 확인 (다운로드 버튼)
    await expect(page.locator("text=다운로드").first()).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: "e2e/screenshots/flatten-06-result.png", fullPage: true });
  });

  test("영어 페이지 확인", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/flatten`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("Flatten");

    await page.screenshot({ path: "e2e/screenshots/flatten-07-en.png", fullPage: true });
  });

  test("모바일 반응형 확인", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/ko/flatten`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    await page.waitForTimeout(3000);

    await page.screenshot({ path: "e2e/screenshots/flatten-08-mobile.png", fullPage: true });
  });
});
