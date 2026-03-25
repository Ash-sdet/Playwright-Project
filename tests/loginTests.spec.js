const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ConfigReader = require('../src/utils/configReader');

const config = new ConfigReader();

test.describe('Login Tests', () => {
  test('TC001: Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('valid').password);
    expect(await page.url()).toContain('/inventory.html');
  });

  test('TC002: Invalid Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('invalid').username, config.getUser('valid').password);
    expect(await loginPage.isErrorVisible()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
  });

  test('TC003: Invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, config.getUser('invalid').password);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  test('TC004: Empty Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('', config.getUser('valid').password);
    expect(await loginPage.isErrorVisible()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain('Username is required');
  });

  test('TC005: Empty Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('valid').username, '');
    expect(await loginPage.isErrorVisible()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain('Password is required');
  });

  test('TC006: Locked User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(config.getUser('locked').username, config.getUser('locked').password);
    expect(await loginPage.isErrorVisible()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out');
  });
});