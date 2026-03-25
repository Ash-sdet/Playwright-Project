const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = '.cart_item';
    this.itemNames = '.inventory_item_name';
    this.removeButtons = 'button[id^="remove"]';
    this.continueShoppingButton = '#continue-shopping';
    this.checkoutButton = '#checkout';
    this.cartQuantity = '.cart_quantity';
  }

  async getCartItemNames() {
    return await this.page.$$eval(this.itemNames, elements => elements.map(el => el.textContent));
  }

  async removeItemFromCart(itemName) {
    const removeButton = this.page.locator(this.cartItems).filter({ hasText: itemName }).locator(this.removeButtons);
    await removeButton.click();
    this.log(`Removed ${itemName} from cart`);
  }

  async continueShopping() {
    await this.clickElement(this.continueShoppingButton);
    this.log('Clicked continue shopping');
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
    this.log('Proceeded to checkout');
  }

  async getCartItemCount() {
    const items = await this.page.$$(this.cartItems);
    return items.length;
  }

  async isCartEmpty() {
    return (await this.getCartItemCount()) === 0;
  }

  async isCartPageDisplayed() {
    return await this.isElementVisible(this.checkoutButton);
  }
}

module.exports = CartPage;