const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductsPage = require('../src/pages/ProductsPage');
const ConfigReader = require('../src/utils/configReader');

const config = new ConfigReader();

test.describe('Edge Case Tests', () => {
  test('TC025: Direct Access to Cart without Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/cart.html');
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);
  });

  test('TC026: Direct Access to Checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/checkout-step-one.html');
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);
  });

  test('TC027: Session Persistence', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('valid').password);
    await page.reload();
    expect(await productsPage.isProductsPageDisplayed()).toBe(true);
  });

  test('TC028: Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('valid').password);
    // Assuming logout button is in menu
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);
  });
});