const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '.error-message-container h3';
  }

  async enterUsername(username) {
    await this.fillField(this.usernameInput, username);
    this.log(`Entered username: ${username}`);
  }

  async enterPassword(password) {
    await this.fillField(this.passwordInput, password);
    this.log(`Entered password`);
  }

  async clickLogin() {
    await this.clickElement(this.loginButton);
    this.log('Clicked login button');
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isErrorVisible() {
    return await this.isElementVisible(this.errorMessage);
  }

  async isLoginPageDisplayed() {
    return await this.isElementVisible(this.loginButton);
  }
}

module.exports = LoginPage;