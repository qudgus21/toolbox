import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(
  __dirname,
  "../../../test-fixtures/pdf/02-multi-page-10.pdf",
);
const SCREENSHOT_DIR = "e2e/screenshots/pages-per-sheet";

test.describe("Pages Per Sheet (N-up) 도구", () => {
  test("01 - 초기 페이지 로드 및 기본 UI", async ({ page }) => {
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    // 타이틀 확인
    await expect(page.locator("h1")).toContainText("한 장에 여러 페이지");

    // 파일 업로드 영역 확인
    await expect(page.locator('input[type="file"]')).toBeAttached();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-01-idle.png`,
      fullPage: true,
    });
  });

  test("02 - PDF 업로드 후 옵션 패널 표시", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);

    await page.waitForTimeout(3000);

    // 옵션 섹션들 확인
    await expect(page.getByText("장당 페이지 수")).toBeVisible();
    await expect(page.getByText("용지 크기")).toBeVisible();
    await expect(page.getByText("방향")).toBeVisible();
    await expect(page.getByText("페이지 순서")).toBeVisible();
    await expect(page.getByText("간격")).toBeVisible();
    await expect(page.getByText("셀 테두리")).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-02-loaded.png`,
      fullPage: true,
    });
  });

  test("03 - N-up 옵션 변경 (2, 4, 6, 9, 16)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // N-up 버튼들은 grid 안에 있는 button들 (text로 식별)
    const nupValues = [2, 4, 6, 9, 16] as const;

    for (const n of nupValues) {
      // 각 N-up 버튼 클릭 — 버튼은 NupGridPreview + 숫자 span을 포함
      const nupButton = page
        .locator("button")
        .filter({ hasText: new RegExp(`^${n}$`) });
      await nupButton.first().click();
      await page.waitForTimeout(500);

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/nup-03-nup-${n}.png`,
        fullPage: true,
      });
    }
  });

  test("04 - 방향 옵션 변경 (자동, 세로, 가로)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // 자동
    await page.getByRole("button", { name: "자동" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-04-orient-auto.png`,
      fullPage: true,
    });

    // 세로
    await page.getByRole("button", { name: "세로" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-04-orient-portrait.png`,
      fullPage: true,
    });

    // 가로
    await page.getByRole("button", { name: "가로" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-04-orient-landscape.png`,
      fullPage: true,
    });
  });

  test("05 - 페이지 순서 드롭다운 변경", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // 페이지 순서 select 찾기 (두 번째 select — 첫 번째는 용지 크기)
    const selects = page.locator("select");
    const pageOrderSelect = selects.nth(1);

    // 오른쪽에서 왼쪽
    await pageOrderSelect.selectOption("right-to-left");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-05-order-rtl.png`,
      fullPage: true,
    });

    // 위에서 아래로
    await pageOrderSelect.selectOption("top-to-bottom");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-05-order-ttb.png`,
      fullPage: true,
    });

    // 왼쪽에서 오른쪽 (기본)
    await pageOrderSelect.selectOption("left-to-right");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-05-order-ltr.png`,
      fullPage: true,
    });
  });

  test("06 - 간격 슬라이더 변경", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // range 슬라이더 찾기
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();

    // 간격을 10mm로 변경
    await slider.fill("10");
    await page.waitForTimeout(300);

    // 값이 반영되었는지 확인
    await expect(page.getByText("10 mm")).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-06-gap-10mm.png`,
      fullPage: true,
    });

    // 간격을 0mm로 변경
    await slider.fill("0");
    await page.waitForTimeout(300);
    await expect(page.getByText("0 mm")).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-06-gap-0mm.png`,
      fullPage: true,
    });
  });

  test("07 - 셀 테두리 토글", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // 켜기 버튼 클릭
    await page.getByRole("button", { name: "켜기" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-07-border-on.png`,
      fullPage: true,
    });

    // 끄기 버튼 클릭
    await page.getByRole("button", { name: "끄기" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-07-border-off.png`,
      fullPage: true,
    });
  });

  test("08 - 변환 실행 및 결과 다운로드", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // 실행 버튼 클릭 (하단 고정 버튼 — title 텍스트가 버튼 라벨)
    const processButton = page
      .locator("button")
      .filter({ hasText: "한 장에 여러 페이지" });
    await expect(processButton).toBeVisible();
    await processButton.click();

    // 처리 완료 대기
    await page.waitForTimeout(8000);

    // 다운로드 버튼 확인
    const downloadBtn = page.getByRole("button", { name: /다운로드|download/i });
    await expect(downloadBtn).toBeVisible({ timeout: 15000 });

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-08-result.png`,
      fullPage: true,
    });

    // 다운로드 실행
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 15000 }),
      downloadBtn.click(),
    ]);

    // 다운로드된 파일 확인
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    expect(fs.existsSync(downloadPath!)).toBe(true);

    const suggestedName = download.suggestedFilename();
    expect(suggestedName).toContain(".pdf");
  });

  test("09 - 영어 버전 (i18n 확인)", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    // 영어 타이틀 확인
    await expect(page.locator("h1")).toContainText("Pages Per Sheet");

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-09-en-idle.png`,
      fullPage: true,
    });

    // 파일 업로드
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // 영어 라벨 확인
    await expect(page.getByText("Pages per sheet", { exact: true })).toBeVisible();
    await expect(page.getByText("Sheet size")).toBeVisible();
    await expect(page.getByText("Orientation")).toBeVisible();
    await expect(page.getByText("Page order")).toBeVisible();
    await expect(page.getByText("Spacing")).toBeVisible();
    await expect(page.getByText("Cell border")).toBeVisible();

    // 영어 방향 버튼 확인
    await expect(page.getByRole("button", { name: "Auto" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Portrait" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Landscape" })).toBeVisible();

    // 영어 테두리 버튼 확인
    await expect(page.getByRole("button", { name: "On", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Off", exact: true })).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-09-en-loaded.png`,
      fullPage: true,
    });
  });

  test("10 - 모바일 뷰포트 (375x667)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/ko/pages-per-sheet`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-10-mobile-idle.png`,
      fullPage: true,
    });

    // 파일 업로드
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_PDF);
    await page.waitForTimeout(3000);

    // 모바일에서 옵션 패널이 보이는지 확인
    await expect(page.getByText("장당 페이지 수")).toBeVisible();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-10-mobile-loaded.png`,
      fullPage: true,
    });

    // 모바일에서 N-up 변경
    const nup4Button = page
      .locator("button")
      .filter({ hasText: /^4$/ });
    await nup4Button.first().click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/nup-10-mobile-nup4.png`,
      fullPage: true,
    });
  });
});
