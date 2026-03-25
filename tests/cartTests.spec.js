const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductsPage = require('../src/pages/ProductsPage');
const CartPage = require('../src/pages/CartPage');
const ConfigReader = require('../src/utils/configReader');

const config = new ConfigReader();

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('valid').password);
  });

  test('TC014: View Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    expect(await cartPage.isCartPageDisplayed()).toBe(true);
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('TC015: Remove Item from Cart Page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.removeItemFromCart(config.getProduct('backpack'));
    expect(await cartPage.isCartEmpty()).toBe(true);
  });

  test('TC016: Continue Shopping from Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.continueShopping();
    expect(await productsPage.isProductsPageDisplayed()).toBe(true);
  });

  test('TC030: Remove All Products from Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const names = await productsPage.getProductNames();
    for (const name of names) {
      await productsPage.addProductToCart(name);
    }
    await productsPage.goToCart();
    const cartNames = await cartPage.getCartItemNames();
    for (const name of cartNames) {
      await cartPage.removeItemFromCart(name);
    }
    expect(await cartPage.isCartEmpty()).toBe(true);
  });
});