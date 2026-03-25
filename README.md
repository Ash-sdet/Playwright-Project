# SauceDemo E2E Automation Framework

This is a complete End-to-End automation framework for testing the SauceDemo website using Playwright and Page Object Model.

## Tech Stack
- Language: JavaScript
- Framework: Playwright
- Design Pattern: Page Object Model (POM)
- Reporting: HTML Reports
- Version Control: Git-ready

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Dependencies
- @playwright/test
- Node.js (version 14 or higher)

## How to Run Tests

### Run all tests:
```bash
npx playwright test
```

### Run specific test file:
```bash
npx playwright test tests/loginTests.spec.js
```

### Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

### Run tests in specific browser:
```bash
npx playwright test --project=chromium
```

### Generate and view HTML report:
```bash
npx playwright show-report
```

### Run tests with debugging:
```bash
npx playwright test --debug
```

## Framework Structure
- `src/pages/`: Page Object classes
- `src/utils/`: Utility classes
- `tests/`: Test specifications
- `config/`: Configuration files
- `reports/`: Generated reports and screenshots

## Test Coverage
- Login functionality (valid, invalid, locked user)
- Product sorting and cart operations
- Checkout flow
- Edge cases and direct URL access

## Reports
Tests generate HTML reports with screenshots on failure. View reports using `npx playwright show-report`.