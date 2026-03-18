import { test } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(
  __dirname,
  "..",
  "screenshots",
  "competitor-header-footer"
);

test.describe("경쟁사 Header/Footer PDF 도구 분석", () => {
  test.setTimeout(90000);

  test("iLovePDF - Add Page Numbers 분석", async ({ page }) => {
    // 올바른 URL: /add_pdf_page_number (underscore 패턴)
    await page.goto("https://www.ilovepdf.com/add_pdf_page_number", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, "ilovepdf-01-landing.png"),
      fullPage: true,
    });

    // 페이지 텍스트에서 기능 정보 추출
    const bodyText = await page.locator("body").innerText();
    const relevantKeywords = [
      "header",
      "footer",
      "page number",
      "date",
      "font",
      "position",
      "margin",
      "template",
      "custom text",
      "format",
    ];
    for (const keyword of relevantKeywords) {
      if (bodyText.toLowerCase().includes(keyword)) {
        console.log(`iLovePDF: Found keyword "${keyword}" on page`);
      }
    }

    // 스크롤하여 하단 기능 설명 캡처
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "ilovepdf-02-features-mid.png"),
      fullPage: false,
    });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "ilovepdf-03-features-bottom.png"),
      fullPage: true,
    });
  });

  test("PDF24 - Add Page Numbers 분석", async ({ page }) => {
    // PDF24에는 header/footer 전용 도구 없음, page numbers 도구 분석
    await page.goto("https://tools.pdf24.org/en/add-page-numbers", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, "pdf24-01-landing.png"),
      fullPage: true,
    });

    // 쿠키 배너 닫기 시도
    try {
      const cookieBtn = page.locator(
        'button:has-text("Accept"), button:has-text("OK"), button:has-text("Got it"), .cc-dismiss, .cookie-accept'
      );
      await cookieBtn.first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
    } catch {
      // 무시
    }

    // select, input 등 인터랙티브 요소 분석
    const selects = await page.locator("select").all();
    for (let i = 0; i < selects.length; i++) {
      const options = await selects[i].locator("option").allInnerTexts();
      const label =
        (await selects[i].getAttribute("name")) ||
        (await selects[i].getAttribute("id")) ||
        `select-${i}`;
      console.log(`PDF24 select "${label}": ${JSON.stringify(options)}`);
    }

    const inputs = await page.locator("input:visible").all();
    for (let i = 0; i < inputs.length; i++) {
      const type = await inputs[i].getAttribute("type");
      const name =
        (await inputs[i].getAttribute("name")) ||
        (await inputs[i].getAttribute("id")) ||
        `input-${i}`;
      const placeholder =
        (await inputs[i].getAttribute("placeholder")) || "";
      console.log(
        `PDF24 input "${name}" type=${type} placeholder="${placeholder}"`
      );
    }

    const bodyText = await page.locator("body").innerText();
    const relevantKeywords = [
      "header",
      "footer",
      "page number",
      "date",
      "font",
      "position",
      "margin",
      "template",
      "custom text",
      "left",
      "center",
      "right",
      "format",
      "size",
      "color",
      "pattern",
      "bold",
      "italic",
    ];
    for (const keyword of relevantKeywords) {
      if (bodyText.toLowerCase().includes(keyword)) {
        console.log(`PDF24: Found keyword "${keyword}" on page`);
      }
    }

    // 스크롤하여 추가 옵션 확인
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "pdf24-02-scrolled-bottom.png"),
      fullPage: true,
    });
  });

  test("Sejda - Header Footer PDF 분석", async ({ page }) => {
    await page.goto("https://www.sejda.com/header-footer-pdf", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, "sejda-01-landing.png"),
      fullPage: true,
    });

    const bodyText = await page.locator("body").innerText();
    const keywords = [
      "page number",
      "page count",
      "total pages",
      "date",
      "time",
      "filename",
      "file name",
      "custom text",
      "header",
      "footer",
      "left",
      "center",
      "right",
      "font",
      "size",
      "color",
      "bold",
      "italic",
      "margin",
      "page range",
      "first page",
      "last page",
      "odd",
      "even",
      "bates",
      "prefix",
      "suffix",
      "start number",
      "roman",
      "times new roman",
      "helvetica",
      "courier",
    ];

    for (const kw of keywords) {
      if (bodyText.toLowerCase().includes(kw.toLowerCase())) {
        console.log(`Sejda: Found feature keyword "${kw}"`);
      }
    }

    // 쿠키/팝업 닫기 시도
    try {
      const dismissBtn = page.locator(
        'button:has-text("Accept"), button:has-text("Got it"), button:has-text("Close"), .cookie-close, #onetrust-accept-btn-handler'
      );
      await dismissBtn.first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
    } catch {
      // 무시
    }

    // 중간 스크롤 캡처
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "sejda-02-features-mid.png"),
      fullPage: false,
    });

    // 하단 캡처
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "sejda-03-features-bottom.png"),
      fullPage: true,
    });
  });

  test("Sejda - Bates Numbering 분석", async ({ page }) => {
    // Sejda는 Bates numbering 전용 도구도 제공
    await page.goto("https://www.sejda.com/bates-numbering", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, "sejda-04-bates-landing.png"),
      fullPage: true,
    });

    const bodyText = await page.locator("body").innerText();
    console.log(
      `Sejda Bates: page mentions "prefix": ${bodyText.toLowerCase().includes("prefix")}`
    );
    console.log(
      `Sejda Bates: page mentions "suffix": ${bodyText.toLowerCase().includes("suffix")}`
    );
    console.log(
      `Sejda Bates: page mentions "digit": ${bodyText.toLowerCase().includes("digit")}`
    );
  });

  test("Smallpdf - Number Pages 분석", async ({ page }) => {
    await page.goto("https://smallpdf.com/number-pages", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, "smallpdf-01-landing.png"),
      fullPage: true,
    });

    const bodyText = await page.locator("body").innerText();
    const keywords = [
      "header",
      "footer",
      "page number",
      "date",
      "font",
      "position",
      "custom",
      "template",
      "format",
      "margin",
    ];
    for (const kw of keywords) {
      if (bodyText.toLowerCase().includes(kw)) {
        console.log(`Smallpdf: Found keyword "${kw}"`);
      }
    }

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "smallpdf-02-bottom.png"),
      fullPage: true,
    });
  });

  test("AvePDF - Add Header Footer 분석", async ({ page }) => {
    await page.goto("https://avepdf.com/add-header-footer", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: path.join(screenshotDir, "avepdf-01-landing.png"),
      fullPage: true,
    });

    const bodyText = await page.locator("body").innerText();
    const keywords = [
      "header",
      "footer",
      "page number",
      "date",
      "font",
      "position",
      "margin",
      "template",
      "custom text",
      "left",
      "center",
      "right",
      "color",
      "size",
      "format",
    ];
    for (const kw of keywords) {
      if (bodyText.toLowerCase().includes(kw)) {
        console.log(`AvePDF: Found keyword "${kw}"`);
      }
    }

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(screenshotDir, "avepdf-02-bottom.png"),
      fullPage: true,
    });
  });
});
