import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("discover, filter, inspect, save and restore a synthetic place", async ({
  page,
}, info) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4311/")) external.push(r.url());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "วันนี้อยากไปนั่งที่ไหน" }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "ค้นหาสถานที่ ไทยหรืออังกฤษ" })
    .fill("PAPER");
  await expect(page.locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "ดูรายละเอียด บ้านกระดาษ" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "บันทึกมุมนี้ไว้", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /^บันทึกไว้/ }).click();
  await expect(page.locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "เลิกบันทึก บ้านกระดาษ" }).click();
  await expect(
    page.getByRole("heading", { name: "ยังไม่เจอมุมที่ตรงใจ" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "ดูสถานที่ทั้งหมด", exact: true })
    .click();
  await page.getByRole("button", { name: "ทำงาน", exact: true }).click();
  await page.getByRole("checkbox", { name: "เงียบ", exact: true }).check();
  await expect(page.locator("article")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "บทถัดไป", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "แผนผัง", exact: true }).click();
  await page.getByRole("button", { name: "เปิด บทถัดไป", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "ล้างตัวกรอง", exact: true }).click();
  await page.getByRole("button", { name: "รายการ", exact: true }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  const a11y = await new AxeBuilder({ page }).analyze();
  expect(
    a11y.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo(0, 0);
  });
  await page.screenshot({
    path: `docs/screenshots/${info.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
test("keyboard dialog focus and recoverable loading/error states", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "ข้ามไปค้นหาสถานที่" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "ดูรายละเอียด บ้านกระดาษ" }).click();
  await expect(
    page.getByRole("button", { name: "ปิดรายละเอียด" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "ดูรายละเอียด บ้านกระดาษ" }),
  ).toBeFocused();
  await page.getByText("ทดลองสถานะของหน้าจอ", { exact: true }).click();
  await page.getByRole("button", { name: "ทดลอง Error" }).click();
  await expect(page.getByRole("alert")).toContainText("โหลดไม่สำเร็จ");
  await page.getByRole("button", { name: "ลองอีกครั้ง" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "กำลังเตรียม" }),
  ).toBeVisible();
  await expect(page.locator("article")).toHaveCount(6);
});

test("renders and keeps session favorites when storage access is blocked", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage blocked", "SecurityError");
      },
    }),
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "วันนี้อยากไปนั่งที่ไหน" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "บันทึก บ้านกระดาษ", exact: true })
    .click();
  await page.getByRole("button", { name: /^บันทึกไว้/ }).click();
  await expect(page.locator("article")).toHaveCount(1);
  expect(errors).toEqual([]);
});
