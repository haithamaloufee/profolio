import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routes } from "../src/routes.js";
import { credentials } from "../src/data/credentials.js";

const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

for (const route of routes) {
  test(route.path + " renders at ten widths without overflow or broken assets", async ({ page }) => {
    const errors = [];
    const broken = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1")) broken.push(response.url());
    });

    await page.setViewportSize({ width: 320, height: 820 });
    const response = await page.goto(route.path);
    expect(response.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 820 });
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      expect(overflow, "horizontal overflow at " + width + "px").toBe(false);
    }
    await page.setViewportSize({ width: 844, height: 390 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const image of await page.locator("main img:visible").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
      const decorative = await image.evaluate(node => Boolean(node.closest('[aria-hidden="true"]')));
      await expect(image).toHaveAttribute("alt", decorative ? "" : /\S/);
    }
    expect(errors).toEqual([]);
    expect(broken).toEqual([]);
  });

  test(route.path + " passes automated WCAG checks", async ({ page }) => {
    await page.goto(route.path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"]).analyze();
    expect(results.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
  });
}

test("mobile keyboard navigation and skip link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  const menu = page.getByRole("button", { name: "Menu" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation").getByRole("link", { name: "Work" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.getByRole("navigation").getByRole("link", { name: "About" }).click();
  await expect(page.locator("#about")).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("credential search, categories, empty-state reset and shareable details", async ({ page }) => {
  await page.goto("/credentials#oci-architect");
  const search = page.getByLabel("Search credentials");
  await expect(search).toBeVisible();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#oci-architect summary")).toBeFocused();
  await expect(page.getByRole("status")).toHaveText(credentials.length + " credentials");
  await page.locator(".filter-option").filter({ hasText: /^Cloud$/ }).click();
  await expect(page.getByRole("status")).toHaveText("2 credentials");
  await search.fill("foundations oracle");
  await expect(page.getByRole("status")).toHaveText("1 credential");
  await search.fill("absent");
  await expect(page.getByRole("status")).toHaveText("0 credentials");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("status")).toHaveText(credentials.length + " credentials");
  await expect(search).toBeFocused();
  const item = page.locator("#react summary");
  await item.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Learn React" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(item).toBeFocused();
});

test("content and project navigation remain available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
    await page.getByRole("link", { name: "Read the Nashmi case study" }).click();
    await expect(page.getByRole("heading", { name: "Nashmi", exact: true })).toBeVisible();
    await page.getByRole("navigation").getByRole("link", { name: "Credentials" }).click();
    await expect(page.locator(".credential")).toHaveCount(credentials.length);
    await page.locator("#react summary").click();
    await expect(page.locator("#react details")).toHaveAttribute("open", "");
  } finally {
    await context.close();
  }
});

test("motion respects the system setting and an unknown route returns HTTP 404", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator(".hero-copy").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  await page.locator(".flagship").first().scrollIntoViewIfNeeded();
  expect(await page.locator("[data-drift]").first().evaluate(element => getComputedStyle(element).transform)).toBe("none");
  const response = await page.goto("/unknown-url-test");
  expect(response.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("scroll reveals and navigation work on a 4× throttled mobile CPU", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "CDP CPU throttling requires Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto("/");
  const firstProject = page.locator(".flagship").first();
  await firstProject.scrollIntoViewIfNeeded();
  await expect(firstProject).toHaveClass(/entered/);
  await page.evaluate(() => scrollTo(0, 0));
  await firstProject.scrollIntoViewIfNeeded();
  await expect(firstProject).toHaveClass(/entered/);
  await firstProject.getByRole("link").click();
  await expect(page.getByRole("heading", { name: "Nashmi", exact: true })).toBeVisible();
});

test("portrait responds to pointer movement and scrolling in both directions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const stage = page.locator(".portrait-stage");
  const bounds = await stage.boundingBox();
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await expect.poll(() => stage.evaluate(el => el.style.getPropertyValue("--tilt-x"))).not.toBe("");
  await page.mouse.move(bounds.x + bounds.width * .75, bounds.y + bounds.height * .3);
  await expect.poll(() => stage.evaluate(el => parseFloat(el.style.getPropertyValue("--tilt-y")))).toBeGreaterThan(0);
  await page.mouse.move(10, 10);
  await page.evaluate(() => scrollTo(0, 220));
  await expect.poll(() => stage.evaluate(el => parseFloat(el.style.getPropertyValue("--hero-scroll")))).toBeGreaterThan(0);
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => stage.evaluate(el => el.style.getPropertyValue("--hero-scroll"))).toBe("0px");
});
