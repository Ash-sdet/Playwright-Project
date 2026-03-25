const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductsPage = require('../src/pages/ProductsPage');
const ConfigReader = require('../src/utils/configReader');

const config = new ConfigReader();

test.describe('Product Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('valid').password);
  });

  test('TC007: Sort Products by Name A-Z', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.selectSortOption('az');
    const names = await productsPage.getProductNames();
    expect(names).toEqual([...names].sort());
  });

  test('TC008: Sort Products by Name Z-A', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.selectSortOption('za');
    const names = await productsPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC009: Sort Products by Price Low-High', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.selectSortOption('lohi');
    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC010: Sort Products by Price High-Low', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.selectSortOption('hilo');
    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC011: Add Single Product to Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });

  test('TC012: Add Multiple Products to Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.addProductToCart(config.getProduct('bikeLight'));
    expect(await productsPage.getCartBadgeCount()).toBe(2);
  });

  test('TC013: Remove Product from Products Page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    expect(await productsPage.getCartBadgeCount()).toBe(1);
    await productsPage.removeProductFromCart(config.getProduct('backpack'));
    expect(await productsPage.getCartBadgeCount()).toBe(0);
  });

  test('TC029: Add All Products to Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const names = await productsPage.getProductNames();
    for (const name of names) {
      await productsPage.addProductToCart(name);
    }
    expect(await productsPage.getCartBadgeCount()).toBe(names.length);
  });
});