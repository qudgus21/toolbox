import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/02-multi-page-10.pdf");

test.describe("페이지 번호 추가 도구", () => {
  test("페이지 로드 및 기본 UI 확인", async ({ page }) => {
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    // 타이틀 확인
    await expect(page.locator("h1")).toContainText("페이지 번호");

    // 파일 업로드 영역 확인
    await expect(page.locator('input[type="file"]')).toBeAttached();

    await page.screenshot({ path: "e2e/screenshots/page-numbers-01-idle.png", fullPage: true });
  });

  test("PDF 업로드 → 옵션 패널 표시", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    // 옵션 패널 로드 대기
    await page.waitForTimeout(2000);

    // 위치 섹션 확인
    await expect(page.getByText("위치", { exact: true })).toBeVisible();

    // 번호 형식 섹션 확인
    await expect(page.getByText("번호 형식")).toBeVisible();

    // 글꼴 섹션 확인
    await expect(page.getByText("글꼴")).toBeVisible();

    // 적용 범위 섹션 확인
    await expect(page.getByText("적용 범위")).toBeVisible();

    // 페이지 모드 섹션 확인
    await expect(page.getByText("페이지 모드")).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/page-numbers-02-loaded.png", fullPage: true });
  });

  test("위치 선택 버튼 동작", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // 위치 버튼 6개 확인
    const positionButtons = page.locator('button[title]');
    const titles = await positionButtons.allTextContents();
    expect(titles.length).toBeGreaterThanOrEqual(6);

    // 상단 왼쪽 클릭
    await page.locator('button[title="상단 왼쪽"]').click();
    await page.screenshot({ path: "e2e/screenshots/page-numbers-03-position-top-left.png", fullPage: true });

    // 하단 오른쪽 클릭
    await page.locator('button[title="하단 오른쪽"]').click();
    await page.screenshot({ path: "e2e/screenshots/page-numbers-04-position-bottom-right.png", fullPage: true });
  });

  test("번호 형식 변경", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // "1 / 10" 형식 선택
    await page.getByLabel("1 / 10").check();
    await page.screenshot({ path: "e2e/screenshots/page-numbers-05-format-n-total.png", fullPage: true });

    // "Page 1 of 10" 형식 선택
    await page.getByLabel("Page 1 of 10").check();
    await page.screenshot({ path: "e2e/screenshots/page-numbers-06-format-page-n-of.png", fullPage: true });

    // "직접 입력" 형식 선택
    await page.getByLabel("직접 입력").check();
    const customInput = page.locator('input[placeholder*="예: - {n} -"]');
    await expect(customInput).toBeVisible();
    await customInput.fill("[ {n} / {total} ]");
    await page.screenshot({ path: "e2e/screenshots/page-numbers-07-format-custom.png", fullPage: true });
  });

  test("폰트 변경", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // 폰트 드롭다운에서 Courier 선택
    await page.locator('select').selectOption("Courier");
    await page.screenshot({ path: "e2e/screenshots/page-numbers-08-font-courier.png", fullPage: true });
  });

  test("페이지 범위 지정", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // "범위 지정" 선택
    await page.getByLabel("범위 지정").check();
    const rangeInput = page.locator('input[placeholder*="예: 1-5"]');
    await expect(rangeInput).toBeVisible();
    await rangeInput.fill("2-5, 8");
    await page.screenshot({ path: "e2e/screenshots/page-numbers-09-custom-range.png", fullPage: true });
  });

  test("마주보기 모드", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // "마주보기" 선택
    await page.getByText("마주보기", { exact: true }).click();
    await page.screenshot({ path: "e2e/screenshots/page-numbers-10-facing.png", fullPage: true });

    // "표지 + 마주보기" 선택
    await page.getByText("표지 + 마주보기").click();
    await page.screenshot({ path: "e2e/screenshots/page-numbers-11-facing-cover.png", fullPage: true });
  });

  test("시작 번호와 건너뛰기 변경", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // 시작 번호를 5로 변경
    const startInput = page.locator('input[type="number"]').nth(1); // fontSize 다음
    await startInput.fill("5");

    // 건너뛰기를 2로 변경
    const skipInput = page.locator('input[type="number"]').nth(2);
    await skipInput.fill("2");

    await page.screenshot({ path: "e2e/screenshots/page-numbers-12-start-skip.png", fullPage: true });
  });

  test("PDF 변환 실행 및 다운로드", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // "번호 추가" 버튼 클릭
    const applyButton = page.getByRole("button", { name: "번호 추가" });
    await expect(applyButton).toBeVisible();
    await applyButton.click();

    // 처리 완료 대기 (결과 카드 표시)
    await page.waitForTimeout(5000);

    // 다운로드 버튼이 표시되는지 확인
    const downloadBtn = page.getByRole("button", { name: /다운로드|download/i });
    await expect(downloadBtn).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: "e2e/screenshots/page-numbers-13-result.png", fullPage: true });
  });

  test("모바일 뷰포트에서 레이아웃", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // 모바일에서 단일 컬럼 레이아웃 확인
    await page.screenshot({ path: "e2e/screenshots/page-numbers-14-mobile.png", fullPage: true });
  });

  test("파일 변경 버튼 동작", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // "파일 변경" 버튼 확인
    const changeBtn = page.getByRole("button", { name: "파일 변경" });
    await expect(changeBtn).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/page-numbers-15-change-file.png", fullPage: true });
  });

  test("색상 변경", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/page-numbers`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(2000);

    // hex 입력으로 색상 변경
    const hexInput = page.locator('input[type="text"].font-mono');
    await hexInput.fill("#FF0000");

    await page.screenshot({ path: "e2e/screenshots/page-numbers-16-color-red.png", fullPage: true });
  });
});
