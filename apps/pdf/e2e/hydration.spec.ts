import { test, expect } from "@playwright/test";

test("홈페이지에 hydration 에러가 없어야 한다", async ({ page }) => {
  const errors: string[] = [];

  // Catch both console errors and uncaught exceptions related to hydration
  page.on("console", (msg) => {
    const text = msg.text();
    if (
      msg.type() === "error" &&
      (text.includes("Hydration") || text.includes("hydration") || text.includes("did not match"))
    ) {
      errors.push(text.slice(0, 200));
    }
  });

  page.on("pageerror", (err) => {
    if (
      err.message.includes("Hydration") ||
      err.message.includes("hydration") ||
      err.message.includes("did not match")
    ) {
      errors.push(err.message.slice(0, 200));
    }
  });

  // Unregister any existing service worker and clear caches
  await page.goto("http://localhost:3001/pdf/ko");
  await page.evaluate(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const reg of registrations) await reg.unregister();
    const keys = await caches.keys();
    for (const key of keys) await caches.delete(key);
  });

  // Hard reload to get fresh HTML without SW interference
  await page.reload({ waitUntil: "networkidle" });

  // Wait for React hydration to complete
  await page.waitForTimeout(3000);

  // Also check that the page rendered correctly
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("body")).not.toHaveAttribute("data-hydration-error");

  expect(errors).toEqual([]);
});

test("영문 홈페이지에 hydration 에러가 없어야 한다", async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    if (
      msg.type() === "error" &&
      (text.includes("Hydration") || text.includes("hydration") || text.includes("did not match"))
    ) {
      errors.push(text.slice(0, 200));
    }
  });

  page.on("pageerror", (err) => {
    if (
      err.message.includes("Hydration") ||
      err.message.includes("hydration") ||
      err.message.includes("did not match")
    ) {
      errors.push(err.message.slice(0, 200));
    }
  });

  await page.goto("http://localhost:3001/pdf/en");
  await page.evaluate(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const reg of registrations) await reg.unregister();
    const keys = await caches.keys();
    for (const key of keys) await caches.delete(key);
  });

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  await expect(page.locator("header")).toBeVisible();
  expect(errors).toEqual([]);
});
