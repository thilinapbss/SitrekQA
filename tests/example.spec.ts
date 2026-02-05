import { test, expect } from '@playwright/test';
import { StringHelpers, DateHelpers, EnvHelpers } from '../utils/helpers';

test.describe('Example E2E Test Suite', () => {
  
  test('should demonstrate stable locator usage', async ({ page }) => {
    // Navigate to a page
    await page.goto('/');

    // Example: Using getByRole - most stable and accessibility-focused
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    // Example: Using getByLabel for form inputs
    const emailInput = page.getByLabel('Email', { exact: false });
    await emailInput.fill('test@example.com');

    // Example: Using getByPlaceholder
    const searchInput = page.getByPlaceholder('Search...');
    await searchInput.fill('test query');

    // Example: Using getByTestId for elements without semantic roles
    const customElement = page.getByTestId('custom-widget');
    await expect(customElement).toBeVisible();

    // Example: Using getByText for unique text content
    const heading = page.getByText('Welcome to Dashboard', { exact: false });
    await expect(heading).toBeVisible();
  });

  test('should use helper utilities', async () => {
    // String helpers
    const randomStr = StringHelpers.randomString(10);
    expect(randomStr.length).toBe(10);

    const randomEmail = StringHelpers.randomEmail();
    expect(randomEmail).toContain('@');

    const randomNum = StringHelpers.randomNumber(1, 100);
    expect(randomNum).toBeGreaterThanOrEqual(1);
    expect(randomNum).toBeLessThanOrEqual(100);

    // Date helpers
    const currentDate = DateHelpers.getCurrentDate();
    expect(currentDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const timestamp = DateHelpers.getTimestamp();
    expect(timestamp).toBeGreaterThan(0);

    // Environment helpers
    const baseUrl = EnvHelpers.getBaseURL();
    expect(baseUrl).toBeTruthy();
  });

  test('should demonstrate assertions', async ({ page }) => {
    await page.goto('/');

    // URL assertions
    await expect(page).toHaveURL(/.*localhost/);
    
    // Title assertions
    await expect(page).toHaveTitle(/.*Dashboard.*/);

    // Element visibility assertions
    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    // Text content assertions
    const welcomeText = page.getByTestId('welcome-message');
    await expect(welcomeText).toContainText('Welcome');

    // Count assertions
    const menuItems = page.getByRole('menuitem');
    await expect(menuItems).toHaveCount(5);

    // Attribute assertions
    const link = page.getByRole('link', { name: 'Home' });
    await expect(link).toHaveAttribute('href', '/home');
  });

  test('should handle form interactions', async ({ page }) => {
    await page.goto('/signup');

    // Fill text input
    await page.getByLabel('Username').fill('testuser');

    // Fill email input
    await page.getByLabel('Email').fill('test@example.com');

    // Fill password input
    await page.getByLabel('Password', { exact: true }).fill('SecurePass123!');

    // Check checkbox
    await page.getByRole('checkbox', { name: 'I agree to terms' }).check();

    // Select from dropdown
    await page.getByLabel('Country').selectOption('USA');

    // Click radio button
    await page.getByRole('radio', { name: 'Male' }).check();

    // Submit form
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Verify success message
    const successMessage = page.getByTestId('success-message');
    await expect(successMessage).toBeVisible();
  });

  test('should demonstrate keyboard interactions', async ({ page }) => {
    await page.goto('/search');

    const searchBox = page.getByPlaceholder('Search...');
    
    // Type and press Enter
    await searchBox.fill('test query');
    await searchBox.press('Enter');

    // Wait for results
    await page.waitForLoadState('networkidle');

    // Keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
  });

  test('should handle multiple elements', async ({ page }) => {
    await page.goto('/products');

    // Get all product cards
    const productCards = page.getByTestId('product-card');

    // Get count of products
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    // Interact with first product
    await productCards.first().click();

    // Interact with last product
    await page.goBack();
    await productCards.last().click();

    // Filter and interact with specific product
    await page.goBack();
    const specificProduct = productCards.filter({ hasText: 'Laptop' });
    await specificProduct.click();
  });

  test('should verify responsive design', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const desktopMenu = page.getByTestId('desktop-menu');
    await expect(desktopMenu).toBeVisible();

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const mobileMenu = page.getByTestId('mobile-menu-icon');
    await expect(mobileMenu).toBeVisible();
  });

  test('should handle file upload', async ({ page }) => {
    await page.goto('/upload');

    // File input using getByLabel
    const fileInput = page.getByLabel('Upload file');
    
    // Upload file (create a temporary test file path)
    // In real tests, provide actual file path
    // await fileInput.setInputFiles('path/to/test-file.pdf');

    // Verify upload button is present
    const uploadButton = page.getByRole('button', { name: 'Upload' });
    await expect(uploadButton).toBeVisible();
  });

  test('should demonstrate proper waiting', async ({ page }) => {
    await page.goto('/');

    // Playwright auto-waits for elements
    const button = page.getByRole('button', { name: 'Load Data' });
    await button.click();

    // Wait for element to appear
    const dataTable = page.getByTestId('data-table');
    await expect(dataTable).toBeVisible({ timeout: 10000 });

    // Wait for specific state
    await page.waitForLoadState('networkidle');

    // Wait for URL change
    await page.waitForURL('**/data');
  });
});
