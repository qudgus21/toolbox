import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const TEST_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/02-multi-page-10.pdf");
const SINGLE_PDF = path.resolve(__dirname, "../../../test-fixtures/pdf/01-single-page.pdf");

/** Helper: upload a PDF and wait for editor to load */
async function uploadPdf(page: import("@playwright/test").Page, pdfPath: string) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/ko/sign`);
  await page.waitForLoadState("networkidle");
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(pdfPath);
  await page.waitForTimeout(3000);
}

/** Helper: create a signature via the Type tab (most reliable in headless) */
async function createSignatureViaType(page: import("@playwright/test").Page, text = "Test Sig") {
  // Click create button
  const createBtn = page.getByText("클릭하여 만들기").first();
  await createBtn.click();
  await page.waitForTimeout(500);

  // Switch to type tab
  await page.getByRole("button", { name: "입력" }).click();
  await page.waitForTimeout(500);

  // Fill in the modal's text input (inside the modal overlay)
  const modal = page.locator(".fixed.inset-0");
  const input = modal.locator('input[type="text"]');
  await input.fill(text);
  await page.waitForTimeout(1000); // wait for font load + preview

  // Click save
  await page.getByRole("button", { name: "저장" }).click();
  await page.waitForTimeout(500);
}

test.describe("PDF 서명 도구", () => {
  test("페이지 로드 및 기본 UI 확인", async ({ page }) => {
    await page.goto(`${BASE_URL}/ko/sign`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("서명");
    await expect(page.locator('input[type="file"]')).toBeAttached();

    await page.screenshot({ path: "e2e/screenshots/sign-01-idle.png", fullPage: true });
  });

  test("PDF 업로드 → 3패널 에디터 표시", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);

    // 필수 섹션 확인
    await expect(page.getByText("필수")).toBeVisible();
    // 선택 입력 섹션 확인
    await expect(page.getByText("선택 입력")).toBeVisible();
    // 서명 필드 확인
    await expect(page.getByText("서명", { exact: true }).first()).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-02-editor.png", fullPage: true });
  });

  test("서명 생성 모달 — 그리기 탭 UI", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);

    // 서명 만들기 클릭
    await page.getByText("클릭하여 만들기").first().click();
    await page.waitForTimeout(500);

    // 모달 탭 확인
    await expect(page.getByRole("button", { name: "그리기" })).toBeVisible();
    await expect(page.getByRole("button", { name: "입력" })).toBeVisible();
    await expect(page.getByRole("button", { name: "이미지" })).toBeVisible();

    // 모달 내 서명 캔버스 확인
    await expect(page.locator("canvas.cursor-crosshair")).toBeVisible();

    // 색상 선택 확인
    await expect(page.getByText("색상")).toBeVisible();

    // 지우기 버튼 확인
    await expect(page.getByText("지우기")).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-03-draw-modal.png", fullPage: true });

    // 취소
    await page.getByRole("button", { name: "취소", exact: true }).click();
    await page.waitForTimeout(300);
  });

  test("서명 생성 모달 — 입력 탭에서 서명 생성", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);

    await createSignatureViaType(page, "홍길동");

    // 서명이 생성되면 서명 미리보기 이미지가 표시됨
    await expect(page.locator('img[alt="서명"]')).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-04-signature-created.png", fullPage: true });
  });

  test("서명 PDF에 추가 및 배치 수 확인", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);
    await createSignatureViaType(page);

    // PDF에 추가 버튼 클릭
    await page.locator('button[aria-label="add to document"]').first().click();
    await page.waitForTimeout(500);

    // 배치 수 배지 확인 (CountBadge에 숫자 "1" 표시)
    const badge = page.locator(".rounded-full.bg-red-100");
    await expect(badge.first()).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-05-element-placed.png", fullPage: true });

    // 두 번째 서명 추가
    await page.locator('button[aria-label="add to document"]').first().click();
    await page.waitForTimeout(500);

    // 배지에 "2" 표시
    await expect(badge.first()).toContainText("2");

    await page.screenshot({ path: "e2e/screenshots/sign-06-two-elements.png", fullPage: true });
  });

  test("이름, 텍스트 필드 입력 확인", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);
    await createSignatureViaType(page);

    // 이름 필드에 입력
    const nameInput = page.locator('input[placeholder="이름을 입력하세요"]');
    await nameInput.fill("홍길동");

    // 텍스트 필드에 입력
    const textInput = page.locator('input[placeholder="텍스트를 입력하세요"]');
    if (await textInput.isVisible()) {
      await textInput.fill("계약에 동의합니다");
    }

    await page.screenshot({ path: "e2e/screenshots/sign-07-text-fields.png", fullPage: true });
  });

  test("멀티 페이지 PDF 서명", async ({ page }) => {
    await uploadPdf(page, TEST_PDF);

    // 하단 네비게이션 바의 페이지 정보 확인
    await expect(page.getByText("/ 10")).toBeVisible();

    // 좌측 썸네일 패널 확인
    await expect(page.getByText("페이지").first()).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-08-multipage.png", fullPage: true });
  });

  test("Undo/Redo 동작", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);
    await createSignatureViaType(page);

    // PDF에 서명 추가
    await page.locator('button[aria-label="add to document"]').first().click();
    await page.waitForTimeout(500);
    const badge = page.locator(".rounded-full.bg-red-100");
    await expect(badge.first()).toBeVisible();

    // Ctrl+Z로 실행 취소
    await page.keyboard.press("Control+z");
    await page.waitForTimeout(300);

    // 배치 수가 0으로 돌아감 (배지 사라짐)
    await expect(badge).toHaveCount(0);

    await page.screenshot({ path: "e2e/screenshots/sign-09-undo.png", fullPage: true });

    // Ctrl+Y로 다시 실행
    await page.keyboard.press("Control+y");
    await page.waitForTimeout(300);

    await expect(badge.first()).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-10-redo.png", fullPage: true });
  });

  test("줌 및 파일 변경 UI 확인", async ({ page }) => {
    await uploadPdf(page, SINGLE_PDF);

    // 줌 레벨 표시 확인 (textbox with zoom percentage)
    await expect(page.locator('input[value$="%"]').first()).toBeVisible();

    // 파일 변경 버튼 확인
    await expect(page.getByText("파일 변경")).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/sign-11-zoom-and-change.png", fullPage: true });
  });
});
