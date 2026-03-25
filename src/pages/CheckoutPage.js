const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.zipCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.cancelButton = '#cancel';
    this.errorMessage = '.error-message-container h3';
    this.confirmationMessage = '.complete-header';
    this.checkoutSummary = '.checkout_summary_container';
  }

  async enterFirstName(firstName) {
    await this.fillField(this.firstNameInput, firstName);
    this.log(`Entered first name: ${firstName}`);
  }

  async enterLastName(lastName) {
    await this.fillField(this.lastNameInput, lastName);
    this.log(`Entered last name: ${lastName}`);
  }

  async enterZipCode(zipCode) {
    await this.fillField(this.zipCodeInput, zipCode);
    this.log(`Entered zip code: ${zipCode}`);
  }

  async fillCheckoutForm(firstName, lastName, zipCode) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterZipCode(zipCode);
  }

  async clickContinue() {
    await this.clickElement(this.continueButton);
    this.log('Clicked continue');
  }

  async clickFinish() {
    await this.clickElement(this.finishButton);
    this.log('Clicked finish');
  }

  async clickCancel() {
    await this.clickElement(this.cancelButton);
    this.log('Clicked cancel');
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isErrorVisible() {
    return await this.isElementVisible(this.errorMessage);
  }

  async getConfirmationMessage() {
    return await this.getText(this.confirmationMessage);
  }

  async isCheckoutComplete() {
    return await this.isElementVisible(this.confirmationMessage);
  }

  async isCheckoutPageDisplayed() {
    return await this.isElementVisible(this.continueButton);
  }
}

module.exports = CheckoutPage;