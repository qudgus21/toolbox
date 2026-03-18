import { test } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(__dirname, "screenshots");

test.describe("경쟁사 N-up / Pages Per Sheet 분석", () => {
  test.setTimeout(60000);

  test("iLovePDF - Organize PDF Pages 분석", async ({ page }) => {
    await page.goto("https://www.ilovepdf.com/organize-pdf", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(screenshotDir, "competitor-ilovepdf-organize-01-landing.png"),
      fullPage: true,
    });
  });

  test("PDF24 - Pages Per Sheet 분석", async ({ page }) => {
    await page.goto("https://tools.pdf24.org/en/pages-per-sheet", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(screenshotDir, "competitor-pdf24-nup-01-landing.png"),
      fullPage: true,
    });

    // 파일 업로드 영역 찾기
    const uploadArea = page.locator('[data-testid="file-input"], input[type="file"], .uploadArea, #fileInput, .tool-upload');
    if (await uploadArea.count() > 0) {
      await page.screenshot({
        path: path.join(screenshotDir, "competitor-pdf24-nup-02-upload-area.png"),
        fullPage: true,
      });
    }

    // 모든 옵션/설정 캡처
    const buttons = await page.locator("button, select, input[type='radio'], input[type='checkbox']").all();
    console.log(`PDF24 N-up: ${buttons.length} interactive elements found`);
  });

  test("AvePDF - N-up 분석", async ({ page }) => {
    await page.goto("https://avepdf.com/n-up", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(screenshotDir, "competitor-avepdf-nup-01-landing.png"),
      fullPage: true,
    });
  });

  test("Sejda - N-up 분석", async ({ page }) => {
    await page.goto("https://www.sejda.com/n-up", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(screenshotDir, "competitor-sejda-nup-01-landing.png"),
      fullPage: true,
    });
  });
});
