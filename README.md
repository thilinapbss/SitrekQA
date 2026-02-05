# Playwright TypeScript Automation Project

A comprehensive Playwright automation framework using TypeScript with the Page Object Model (POM) pattern.

## 🚀 Features

- **TypeScript** - Type-safe test automation
- **Page Object Model** - Maintainable and reusable page objects
- **Stable Locators** - Using `getByRole`, `getByTestId`, `getByLabel`, `getByPlaceholder`
- **HTML Reporter** - Beautiful test reports with screenshots and traces
- **Trace on Failure** - Automatic trace collection for debugging failed tests
- **Screenshot on Failure** - Automatic screenshots when tests fail
- **Multiple Browsers** - Test across Chromium, Firefox, and WebKit
- **Parallel Execution** - Fast test execution with parallel workers
- **Data-Driven Testing** - JSON-based test data management

## 📁 Project Structure

```
playwright-typescript-automation/
├── .github/
│   └── copilot-instructions.md    # Copilot workspace instructions
├── pages/                          # Page Object Model classes
│   ├── BasePage.ts                # Base page with common methods
│   ├── LoginPage.ts               # Login page object
│   └── HomePage.ts                # Home page object
├── tests/                          # Test specifications
│   ├── example.spec.ts            # Example tests with best practices
│   ├── login.spec.ts              # Login functionality tests
│   └── home.spec.ts               # Home page tests
├── utils/                          # Helper utilities
│   ├── helpers.ts                 # Common helper functions
│   └── storageHelpers.ts          # Storage management utilities
├── test-data/                      # Test data files
│   ├── users.json                 # User test data
│   ├── config.json                # Environment configurations
│   └── products.json              # Product test data
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd playwright-typescript-automation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests on specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View test report
```bash
npm run report
```

## 📝 Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Feature Name', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('should perform action', async () => {
    // Arrange
    const testData = { username: 'test', password: 'test123' };

    // Act
    await loginPage.login(testData.username, testData.password);

    // Assert
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  });
});
```

### Using Stable Locators

Always prefer stable locators in this order:

1. **getByRole** - Most stable, accessibility-focused
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   page.getByRole('textbox', { name: 'Email' })
   ```

2. **getByLabel** - For form inputs with labels
   ```typescript
   page.getByLabel('Username')
   page.getByLabel('Password')
   ```

3. **getByPlaceholder** - For inputs with placeholders
   ```typescript
   page.getByPlaceholder('Enter your email')
   ```

4. **getByTestId** - For custom elements
   ```typescript
   page.getByTestId('custom-widget')
   ```

5. **getByText** - For unique text content
   ```typescript
   page.getByText('Welcome back')
   ```

### Page Object Model Example

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  readonly submitButton: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.emailInput = page.getByLabel('Email');
  }

  async submitForm(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
    await this.clickElement(this.submitButton);
  }
}
```

## 🔧 Configuration

### Environment Variables

Set the base URL using environment variable:
```bash
BASE_URL=https://example.com npm test
```

### Playwright Configuration

The [playwright.config.ts](playwright.config.ts) file includes:
- Base URL configuration
- Multiple browser projects (Chromium, Firefox, WebKit)
- HTML reporter with trace and screenshot on failure
- Timeout settings
- Parallel execution settings
- Retry configuration for CI

### TypeScript Configuration

The [tsconfig.json](tsconfig.json) includes:
- Strict type checking
- Path aliases for cleaner imports
- Node types and Playwright types

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npm run report
```

The report includes:
- Test execution status
- Screenshots on failure
- Traces for debugging
- Execution time
- Browser information

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### UI Mode
```bash
npm run test:ui
```

### View Traces
Traces are automatically collected on first retry. View them in the HTML report.

## 📦 Test Data Management

Test data is stored in JSON files under `test-data/`:

- **users.json** - User credentials and test users
- **config.json** - Environment-specific configurations
- **products.json** - Product data for testing

Import test data in tests:
```typescript
import users from '../test-data/users.json';

const validUser = users.validUsers[0];
```

## 🎯 Best Practices

1. **Use stable locators** - Prefer `getByRole` and `getByLabel` over CSS selectors
2. **No hard waits** - Use Playwright's auto-waiting features
3. **Page Object Model** - Keep tests clean by using page objects
4. **Independent tests** - Each test should be isolated and independent
5. **Meaningful names** - Use descriptive test names
6. **Data-driven testing** - Use JSON files for test data
7. **Assertions** - Always use assertions from `@playwright/test`

## 🔗 Useful Links

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model](https://playwright.dev/docs/pom)

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and add tests for new features.

---

**Happy Testing! 🎭**
# SitrekQA
# SitrekQA
