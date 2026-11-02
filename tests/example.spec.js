
import { test, expect } from '@playwright/test';

const HOME_URL = 'http://127.0.0.1:5500/index.html';

// Open homepage and reset test data before every test
test.beforeEach(async ({ page }) => {
  await page.goto(HOME_URL);

  await page.evaluate(() => {
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  });

  // Reload so the website reads the clean storage
  await page.reload();
});

test('Cakery homepage loads successfully', async ({ page }) => {
  await expect(page).toHaveTitle(/Cakery/i);
});

test('Chocolate Truffle can be added to cart', async ({ page }) => {
  await page.locator(
    'button.add-btn[onclick*="Chocolate Truffle"]'
  ).click();

  await page.getByRole('link', { name: /cart/i }).click();

  await expect(
    page.locator('#cart-items').getByRole('heading', {
      name: 'Chocolate Truffle'
    })
  ).toBeVisible();
});

test('Cart count increases after adding a product', async ({ page }) => {
  await page.locator(
    'button.add-btn[onclick*="Chocolate Truffle"]'
  ).click();

  await expect(page.locator('#cart-count')).toHaveText('1');
});

test('Red Velvet adds the correct product to cart', async ({ page }) => {
  await page.locator(
    'button.add-btn[onclick*="Red Velvet"]'
  ).click();

  await page.getByRole('link', { name: /cart/i }).click();

  await expect(
    page.locator('#cart-items').getByRole('heading', {
      name: 'Red Velvet'
    })
  ).toBeVisible();

  await expect(
    page.locator('#cart-items').getByRole('heading', {
      name: 'Blueberry Vanilla'
    })
  ).toHaveCount(0);
});

test('Cart keeps the product after page refresh', async ({ page }) => {
  await page.locator(
    'button.add-btn[onclick*="Chocolate Truffle"]'
  ).click();

  await page.reload();

  await expect(page.locator('#cart-count')).toHaveText('1');
});

test('Chocolate Truffle displays the correct price', async ({ page }) => {
  await page.locator(
    'button.add-btn[onclick*="Chocolate Truffle"]'
  ).click();

  await page.getByRole('link', { name: /cart/i }).click();

  await expect(page.locator('#cart-total')).toHaveText('699');
});
