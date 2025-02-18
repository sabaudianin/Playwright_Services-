import { expect, test } from "@playwright/test";

test.describe("Login flow", () => {
  test("Go to login page, submit form with valid data, verify redirection", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Email").fill("luke@coderslab.pl");
    await page.getByPlaceholder("Password").fill("secret");
    await page.getByRole("button").click();
    await expect(page.getByRole("link", { name: "luke" })).toBeVisible();
  });
});
