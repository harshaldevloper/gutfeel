import { test, expect } from "@playwright/test";

/** Core smoke flows — run after deploy or on schedule to catch regressions without manual QA. */
const APP_PAGES = [
  { path: "/dashboard/", heading: /Welcome back/i },
  { path: "/tracker/", heading: /How are you feeling/i },
  { path: "/foods/", heading: /Find food/i },
  { path: "/plan/", text: /Meal Planner|day score/i },
  { path: "/food-safety/", heading: /Food Safety|FDA/i },
  { path: "/support/", heading: /How can we help/i },
];

for (const { path, heading, text } of APP_PAGES) {
  test(`page loads: ${path}`, async ({ page }) => {
    await page.goto(path);
    if (heading) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible({ timeout: 15_000 });
    } else if (text) {
      await expect(page.getByText(text).first()).toBeVisible({ timeout: 15_000 });
    }
  });
}

test("dashboard check-in flow", async ({ page }) => {
  await page.goto("/dashboard/");
  const logBtn = page.getByRole("button", { name: /Log today/i });
  if (await logBtn.isVisible()) {
    await logBtn.click();
    await expect(page.getByText(/Logged for today/i)).toBeVisible();
  }
});

test("tracker symptom chips toggle", async ({ page }) => {
  await page.goto("/tracker/");
  const bloating = page.getByRole("button", { name: "Bloating" });
  await bloating.click();
  await expect(bloating).toHaveClass(/chip-active|bg-brand-green/);
});

test("foods filter chips work", async ({ page }) => {
  await page.goto("/foods/");
  const countBefore = await page.getByText(/\d+ foods · sorted/i).textContent();
  await page.getByRole("button", { name: /^safe$/i }).click();
  const countAfter = await page.getByText(/\d+ foods · sorted/i).textContent();
  expect(countAfter).not.toEqual(countBefore);
});

test("support form validates empty submit", async ({ page }) => {
  await page.goto("/support/");
  await page.getByRole("button", { name: /Send message/i }).click();
  // HTML5 required fields should block submit — success state should not appear
  await expect(page.getByText(/Message received/i)).not.toBeVisible();
});

test("bottom nav links resolve", async ({ page }) => {
  await page.goto("/dashboard/");
  await page.getByRole("link", { name: "Track", exact: true }).click();
  await expect(page).toHaveURL(/\/tracker\/?$/);
  await page.getByRole("link", { name: "Foods", exact: true }).click();
  await expect(page).toHaveURL(/\/foods\/?$/);
});
