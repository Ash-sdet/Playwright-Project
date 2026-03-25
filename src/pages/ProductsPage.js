const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.sortDropdown = '.product_sort_container';
    this.productItems = '.inventory_item';
    this.addToCartButtons = 'button[id^="add-to-cart"]';
    this.removeButtons = 'button[id^="remove"]';
    this.cartBadge = '.shopping_cart_badge';
    this.cartLink = '.shopping_cart_link';
    this.productNames = '.inventory_item_name';
    this.productPrices = '.inventory_item_price';
  }

  async selectSortOption(option) {
    await this.page.selectOption(this.sortDropdown, option);
    this.log(`Selected sort option: ${option}`);
  }

  async getProductNames() {
    return await this.page.$$eval(this.productNames, elements => elements.map(el => el.textContent));
  }

  async getProductPrices() {
    return await this.page.$$eval(this.productPrices, elements => elements.map(el => parseFloat(el.textContent.replace('$', ''))));
  }

  async addProductToCart(productName) {
    const addButton = this.page.locator(this.productItems).filter({ hasText: productName }).locator(this.addToCartButtons);
    await addButton.click();
    this.log(`Added ${productName} to cart`);
  }

  async removeProductFromCart(productName) {
    const removeButton = this.page.locator(this.productItems).filter({ hasText: productName }).locator(this.removeButtons);
    await removeButton.click();
    this.log(`Removed ${productName} from cart`);
  }

  async getCartBadgeCount() {
    try {
      const isVisible = await this.page.isVisible(this.cartBadge);
      if (!isVisible) {
        return 0;
      }
      const badge = await this.page.textContent(this.cartBadge);
      return badge ? parseInt(badge) : 0;
    } catch (error) {
      return 0;
    }
  }

  async goToCart() {
    await this.clickElement(this.cartLink);
    this.log('Navigated to cart');
  }

  async isProductsPageDisplayed() {
    return await this.isElementVisible(this.productItems);
  }
}

module.exports = ProductsPage;