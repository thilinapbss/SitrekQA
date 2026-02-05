import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Home Page Functionality', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Login before each test
    await loginPage.navigateToLoginPage('/login');
    const validUser = users.validUsers[0];
    await loginPage.login(validUser.username, validUser.password);
    await homePage.waitForPageLoad();
  });

  test('should display welcome message after login', async () => {
    // Act
    const welcomeMessage = await homePage.getWelcomeMessage();
    const validUser = users.validUsers[0];

    // Assert
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage).toContain(validUser.username);
  });

  test('should verify user profile button is visible', async () => {
    // Act
    const isLoggedIn = await homePage.isUserLoggedIn();

    // Assert
    expect(isLoggedIn).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    // Act
    await homePage.logout();

    // Assert
    await expect(page).toHaveURL(/.*login/);
  });

  test('should search for products', async () => {
    // Arrange
    const searchQuery = products.searchQueries[0];

    // Act
    await homePage.search(searchQuery.query);

    // Assert
    // Verify search was performed (URL should change or results should appear)
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain(searchQuery.query);
  });

  test('should navigate to different menu items', async ({ page }) => {
    // Test data for menu items
    const menuItems = ['Dashboard', 'Products', 'Settings'];

    for (const menuItem of menuItems) {
      // Act
      await homePage.navigateToMenuItem(menuItem);

      // Assert
      const currentUrl = homePage.getCurrentUrl();
      expect(currentUrl).toContain(menuItem.toLowerCase());
      
      // Navigate back to home
      await homePage.navigateToHomePage('/');
    }
  });

  test('should check for notifications', async () => {
    // Act
    const hasNotifications = await homePage.hasNotifications();

    // Assert
    expect(typeof hasNotifications).toBe('boolean');
  });

  test('should verify navigation menu is visible', async () => {
    // Act
    const isMenuVisible = await homePage.isElementVisible(homePage.navigationMenu);

    // Assert
    expect(isMenuVisible).toBeTruthy();
  });

  test('should display correct page title', async () => {
    // Act
    const pageTitle = await homePage.getTitle();

    // Assert
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThan(0);
  });

  test('should perform multiple searches', async () => {
    // Test multiple search queries from test data
    for (const searchData of products.searchQueries) {
      // Act
      await homePage.search(searchData.query);

      // Assert
      const currentUrl = homePage.getCurrentUrl();
      expect(currentUrl).toContain(searchData.query);
      
      // Navigate back to home for next search
      await homePage.navigateToHomePage('/');
    }
  });
});
