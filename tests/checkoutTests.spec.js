const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductsPage = require('../src/pages/ProductsPage');
const CartPage = require('../src/pages/CartPage');
const CheckoutPage = require('../src/pages/CheckoutPage');
const ConfigReader = require('../src/utils/configReader');

const config = new ConfigReader();

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('valid').password);
  });

  test('TC017: Checkout with Items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    expect(await checkoutPage.isCheckoutPageDisplayed()).toBe(true);
  });

  test('TC018: Attempt Checkout without Items', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await page.goto('/cart.html');
    await cartPage.proceedToCheckout();
    // In the site, it allows, but summary is empty
    expect(await page.url()).toContain('/checkout-step-one.html');
  });

  test('TC019: Valid Checkout Form', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const data = config.getCheckoutData('valid');
    await checkoutPage.fillCheckoutForm(data.firstName, data.lastName, data.zipCode);
    await checkoutPage.clickContinue();
    expect(await page.url()).toContain('/checkout-step-two.html');
  });

  test('TC020: Invalid First Name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const data = config.getCheckoutData('invalid');
    await checkoutPage.fillCheckoutForm('', data.lastName, data.zipCode);
    await checkoutPage.clickContinue();
    expect(await checkoutPage.isErrorVisible()).toBe(true);
    expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });

  test('TC021: Invalid Last Name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const data = config.getCheckoutData('valid');
    await checkoutPage.fillCheckoutForm(data.firstName, '', data.zipCode);
    await checkoutPage.clickContinue();
    expect(await checkoutPage.isErrorVisible()).toBe(true);
    expect(await checkoutPage.getErrorMessage()).toContain('Last Name is required');
  });

  test('TC022: Invalid Zip Code', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const data = config.getCheckoutData('valid');
    await checkoutPage.fillCheckoutForm(data.firstName, data.lastName, '');
    await checkoutPage.clickContinue();
    expect(await checkoutPage.isErrorVisible()).toBe(true);
    expect(await checkoutPage.getErrorMessage()).toContain('Postal Code is required');
  });

  test('TC023: Complete Order', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    const data = config.getCheckoutData('valid');
    await checkoutPage.fillCheckoutForm(data.firstName, data.lastName, data.zipCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    expect(await checkoutPage.isCheckoutComplete()).toBe(true);
    expect(await checkoutPage.getConfirmationMessage()).toContain('Thank you for your order');
  });

  test('TC024: Cancel Checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productsPage.addProductToCart(config.getProduct('backpack'));
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.clickCancel();
    expect(await cartPage.isCartPageDisplayed()).toBe(true);
  });
});