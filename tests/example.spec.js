import { test, expect } from '@playwright/test';

test('Cakery homepage loads successfully', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await expect(page).toHaveTitle(/Cakery/i);
});
test('Chocolate Truffle can be added to cart', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await page.locator('button[onclick*="Chocolate Truffle"]').click();

  await page.getByRole('link', { name: /cart/i }).click();

  await expect(page.getByText('Chocolate Truffle')).toBeVisible();
});
test('Cart count increases after adding a product', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await page.locator('button[onclick*="Chocolate Truffle"]').click();

  await expect(page.locator('#cart-count')).toHaveText('1');
});