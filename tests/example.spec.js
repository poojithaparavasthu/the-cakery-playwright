
import { test, expect } from '@playwright/test';

// Reset cart data before every test
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.removeItem('cart');
  });
});

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

test('Red Velvet adds the correct product to cart', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await page.locator('button[onclick*="Red Velvet"]').click();

  await page.getByRole('link', { name: /cart/i }).click();

  await expect(page.getByText('Red Velvet')).toBeVisible();
  await expect(page.getByText('Blueberry Vanilla')).toHaveCount(0);
});

test('Cart keeps the product after page refresh', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await page.locator('button[onclick*="Chocolate Truffle"]').click();

  await page.reload();

  await expect(page.locator('#cart-count')).toHaveText('1');
});

test('Chocolate Truffle displays the correct price', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await page.locator('button[onclick*="Chocolate Truffle"]').click();

  await page.getByRole('link', { name: /cart/i }).click();

  await expect(page.getByText('Total: ₹699', { exact: true })).toBeVisible();
});
