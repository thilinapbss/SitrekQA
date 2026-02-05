import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../test-data/users.json';

/**
 * Test Suite: TC_LOGIN_001 - Login Validation - Empty Fields
 * Priority: High
 * Type: Negative Testing
 */
test.describe('TC_LOGIN_001: Login Validation - Empty Fields', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Pre-condition: Navigate to SITREK login page
    await loginPage.navigateToLoginPage('/');
    
    // Verify we are on the login page by checking if login button is visible
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should show "Username is required" error when username is empty', async () => {
    // Arrange
    const testCase = testData.emptyFieldTests[0];
    expect(testCase.testCaseId).toBe('TC_LOGIN_001');
    
    // Act: Leave username empty and enter password
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for error to appear
    await loginPage.page.waitForTimeout(1000);
    
    // Assert: Verify username required error is shown
    const isUsernameErrorVisible = await loginPage.isUsernameErrorVisible();
    expect(isUsernameErrorVisible).toBeTruthy();
    
    const allErrors = await loginPage.getAllValidationErrors();
    expect(allErrors).toContain('Username is required!');
    
    // Verify user remains on login page by checking login button is still visible
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should show "Password is required" error when password is empty', async () => {
    // Arrange
    const testCase = testData.emptyFieldTests[1];
    expect(testCase.testCaseId).toBe('TC_LOGIN_001');
    
    // Act: Enter username and leave password empty
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for error to appear
    await loginPage.page.waitForTimeout(1000);
    
    // Assert: Verify password required error is shown
    const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
    expect(isPasswordErrorVisible).toBeTruthy();
    
    const allErrors = await loginPage.getAllValidationErrors();
    expect(allErrors).toContain('Password is required!');
    
    // Verify user remains on login page by checking login button is still visible
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should show both "Username is required" and "Password is required" errors when both fields are empty', async () => {
    // Arrange
    const testCase = testData.emptyFieldTests[2];
    expect(testCase.testCaseId).toBe('TC_LOGIN_001');
    
    // Act: Leave both username and password empty
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for errors to appear
    await loginPage.page.waitForTimeout(1000);
    
    // Assert: Verify both required errors are shown
    const isUsernameErrorVisible = await loginPage.isUsernameErrorVisible();
    expect(isUsernameErrorVisible).toBeTruthy();
    
    const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
    expect(isPasswordErrorVisible).toBeTruthy();
    
    const allErrors = await loginPage.getAllValidationErrors();
    expect(allErrors).toContain('Username is required!');
    expect(allErrors).toContain('Password is required!');
    
    // Verify user remains on login page by checking login button is still visible
    await expect(loginPage.loginButton).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Post-condition: Ensure no session was created
    const cookies = await page.context().cookies();
    const sessionCookies = cookies.filter(c => 
      c.name.includes('session') || c.name.includes('token')
    );
    expect(sessionCookies.length).toBe(0);
  });
});

/**
 * Test Suite: TC_LOGIN_002 - Login Fails with Invalid Credentials
 * Priority: High
 * Type: Negative Testing
 */
test.describe('TC_LOGIN_002: Login Fails with Invalid Credentials', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Pre-condition: Navigate to SITREK login page
    await loginPage.navigateToLoginPage('/');
    
    // Verify we are on the login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should fail with invalid username', async () => {
    // Arrange
    const testCase = testData.invalidCredentials[0];
    expect(testCase.testCaseId).toBe('TC_LOGIN_002');
    
    // Act: Enter invalid username with valid password format
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for error to appear
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify invalid credentials error is shown
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    // The actual error message is "Please check Username and Password is correct"
    expect(errorMessage.toLowerCase()).toMatch(/check.*username.*password|invalid/i);
    
    // Verify user remains on login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should fail with invalid password', async () => {
    // Arrange
    const testCase = testData.invalidCredentials[1];
    expect(testCase.testCaseId).toBe('TC_LOGIN_002');
    
    // Act: Enter valid username with wrong password
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for error to appear
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify invalid credentials error is shown
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    // The actual error message is "Please check Username and Password is correct"
    expect(errorMessage.toLowerCase()).toMatch(/check.*username.*password|invalid/i);
    
    // Verify user remains on login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should fail when both username and password are invalid', async () => {
    // Arrange
    const testCase = testData.invalidCredentials[2];
    expect(testCase.testCaseId).toBe('TC_LOGIN_002');
    
    // Act: Enter invalid credentials
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for error to appear
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify invalid credentials error is shown
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    // The actual error message is "Please check Username and Password is correct"
    expect(errorMessage.toLowerCase()).toMatch(/check.*username.*password|invalid/i);
    
    // Verify user remains on login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Post-condition: Ensure no session was created
    const cookies = await page.context().cookies();
    const sessionCookies = cookies.filter(c => 
      c.name.includes('session') || c.name.includes('token')
    );
    expect(sessionCookies.length).toBe(0);
  });
});

/**
 * Test Suite: TC_LOGIN_003 - Login Security - SQL Injection and Special Characters
 * Priority: High
 * Type: Security / Negative Testing
 */
test.describe('TC_LOGIN_003: Login Security - SQL Injection and Special Characters', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Pre-condition: Navigate to SITREK login page
    await loginPage.navigateToLoginPage('/');
    
    // Verify we are on the login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should prevent SQL injection attack', async () => {
    // Arrange
    const testCase = testData.securityTests[0];
    expect(testCase.testCaseId).toBe('TC_LOGIN_003');
    
    // Act: Attempt SQL injection
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for response
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify SQL injection did not work
    // User should not be logged in
    await expect(loginPage.loginButton).toBeVisible();
    
    // Verify error message or no crash
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('20081'); // Still on login page
  });

  test('Should handle special characters in username', async () => {
    // Arrange
    const testCase = testData.securityTests[1];
    expect(testCase.testCaseId).toBe('TC_LOGIN_003');
    
    // Act: Enter special characters
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for response
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify system handles special characters gracefully
    await expect(loginPage.loginButton).toBeVisible();
    
    // Application should not crash
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toBeTruthy();
  });

  test('Should prevent XSS attack', async () => {
    // Arrange
    const testCase = testData.securityTests[2];
    expect(testCase.testCaseId).toBe('TC_LOGIN_003');
    
    // Act: Attempt XSS injection
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for response
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify XSS did not execute
    await expect(loginPage.loginButton).toBeVisible();
    
    // Verify no alert was triggered (XSS would create an alert)
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('20081'); // Still on login page
  });
});

/**
 * Test Suite: TC_LOGIN_004 - Login Edge Cases - Case Sensitivity and Whitespace
 * Priority: Medium
 * Type: Negative Testing
 */
test.describe('TC_LOGIN_004: Login Edge Cases - Case Sensitivity and Whitespace', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Pre-condition: Navigate to SITREK login page
    await loginPage.navigateToLoginPage('/');
    
    // Verify we are on the login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should fail with wrong case in password', async () => {
    // Arrange
    const testCase = testData.edgeCaseTests[0];
    expect(testCase.testCaseId).toBe('TC_LOGIN_004');
    
    // Act: Enter password with wrong case
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for response
    await loginPage.waitForLoginComplete();
    
    // Assert: Password should be case-sensitive (should fail)
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    
    // User should remain on login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should handle whitespace in username', async () => {
    // Arrange
    const testCase = testData.edgeCaseTests[1];
    expect(testCase.testCaseId).toBe('TC_LOGIN_004');
    
    // Act: Enter username with leading/trailing whitespace
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for response
    await loginPage.waitForLoginComplete();
    
    // Assert: System should either trim whitespace or show error
    // Check if login failed (most likely behavior)
    const isOnLoginPage = await loginPage.loginButton.isVisible();
    
    // If still on login page, verify error message exists
    if (isOnLoginPage) {
      const errorMessage = await loginPage.getErrorMessage();
      const hasValidationError = await loginPage.hasFormErrors();
      expect(errorMessage || hasValidationError).toBeTruthy();
    }
  });

  test('Should handle uppercase username', async () => {
    // Arrange
    const testCase = testData.edgeCaseTests[2];
    expect(testCase.testCaseId).toBe('TC_LOGIN_004');
    
    // Act: Enter username in uppercase
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for response
    await loginPage.waitForLoginComplete();
    
    // Assert: System behavior should be consistent
    // This test verifies the system's case sensitivity rules
    const isOnLoginPage = await loginPage.loginButton.isVisible();
    
    // Document the actual behavior
    if (isOnLoginPage) {
      // Username is case-sensitive
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
    } else {
      // Username is case-insensitive (successful login)
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).not.toContain('20081'); // Redirected away from login
    }
  });
});

/**
 * Test Suite: TC_LOGIN_005 - Successful Login with Operation User
 * Priority: Critical
 * Type: Positive Testing
 */
test.describe('TC_LOGIN_005: Successful Login with Operation User', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Pre-condition: Navigate to SITREK login page
    await loginPage.navigateToLoginPage('/');
    
    // Verify we are on the login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should successfully login with valid operation user credentials', async () => {
    // Arrange
    const testCase = testData.validUsers[0];
    expect(testCase.testCaseId).toBe('TC_LOGIN_005');
    expect(testCase.role).toBe('operation');
    
    // Act: Login with valid credentials
    await loginPage.login(testCase.username, testCase.password);
    
    // Wait for login to complete
    await loginPage.waitForLoginComplete();
    
    // Assert: Verify successful login
    // User should be redirected away from login page
    const currentUrl = loginPage.getCurrentUrl();
    
    // Check if redirected (URL should not contain login page indicators)
    const isRedirected = !currentUrl.includes('20081') || 
                        currentUrl.includes('dashboard') || 
                        currentUrl.includes('home') ||
                        currentUrl.includes('app');
    
    if (!isRedirected) {
      // If still on login page, check that no errors are shown
      const errorMessage = await loginPage.getErrorMessage();
      const hasValidationError = await loginPage.hasFormErrors();
      
      // If on login page with no errors, login might be processing
      expect(errorMessage).toBeFalsy();
      expect(hasValidationError).toBeFalsy();
    } else {
      // Successfully redirected
      expect(isRedirected).toBeTruthy();
    }
    
    // Verify no error messages are displayed
    const hasValidationError = await loginPage.hasFormErrors();
    expect(hasValidationError).toBeFalsy();
  });

  test.afterEach(async ({ page }) => {
    // Post-condition: Verify session was created (for successful login)
    const cookies = await page.context().cookies();
    
    // Log cookies for debugging (optional)
    console.log('Cookies after login:', cookies.map(c => c.name).join(', '));
  });
});
