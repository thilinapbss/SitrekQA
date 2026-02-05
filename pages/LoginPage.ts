import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model for SITREK Application
 * Contains all locators and methods for the login page
 */
export class LoginPage extends BasePage {
  // Locators using XPath and attribute-based selectors
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly genericAlert: Locator;
  readonly formErrorText: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly passwordToggleButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Using name attributes from actual page structure
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    
    // Error message locators - MUI Alert components
    this.errorAlert = page.locator('.MuiAlert-root');
    // Generic alert using role
    this.genericAlert = page.getByRole('alert');
    this.formErrorText = page.locator('.MuiFormHelperText-root.Mui-error');
    
    // Field-specific validation errors (using text content)
    this.usernameError = page.getByText('Username is required!');
    this.passwordError = page.getByText('Password is required!');
    
    this.passwordToggleButton = page.locator('.MuiInputAdornment-root button');
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(path: string = '/'): Promise<void> {
    await this.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    // Clear and fill username
    await this.usernameInput.click();
    await this.usernameInput.clear();
    if (username) {
      await this.usernameInput.fill(username);
    }
    
    // Clear and fill password
    await this.passwordInput.click();
    await this.passwordInput.clear();
    if (password) {
      await this.passwordInput.fill(password);
    }
    
    // Click login button
    await this.loginButton.click();
  }

  /**
   * Get error alert message text (from MUI Alert component)
   */
  async getErrorMessage(): Promise<string> {
    try {
      // First try to get MUI Alert
      const muiAlertVisible = await this.errorAlert.isVisible({ timeout: 2000 }).catch(() => false);
      if (muiAlertVisible) {
        return await this.errorAlert.textContent() || '';
      }
      
      // Then try generic alert (role-based)
      const genericAlertVisible = await this.genericAlert.isVisible({ timeout: 2000 }).catch(() => false);
      if (genericAlertVisible) {
        return await this.genericAlert.textContent() || '';
      }
      
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Get form error text (field-specific errors)
   */
  async getFormErrorText(): Promise<string> {
    try {
      await this.formErrorText.waitFor({ state: 'visible', timeout: 5000 });
      const errors = await this.formErrorText.allTextContents();
      return errors.join(' ');
    } catch {
      return '';
    }
  }

  /**
   * Check if error alert is displayed
   */
  async isErrorMessageVisible(): Promise<boolean> {
    try {
      return await this.errorAlert.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Check if form has validation errors
   */
  async hasFormErrors(): Promise<boolean> {
    try {
      // Check for either MUI form errors or text-based field errors
      const hasMuiErrors = await this.formErrorText.isVisible({ timeout: 2000 }).catch(() => false);
      const hasUsernameError = await this.usernameError.isVisible({ timeout: 2000 }).catch(() => false);
      const hasPasswordError = await this.passwordError.isVisible({ timeout: 2000 }).catch(() => false);
      return hasMuiErrors || hasUsernameError || hasPasswordError;
    } catch {
      return false;
    }
  }

  /**
   * Check if username required error is visible
   */
  async isUsernameErrorVisible(): Promise<boolean> {
    try {
      return await this.usernameError.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Check if password required error is visible
   */
  async isPasswordErrorVisible(): Promise<boolean> {
    try {
      return await this.passwordError.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Get all visible validation error messages
   */
  async getAllValidationErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    // Check for username error
    const usernameErrorVisible = await this.isUsernameErrorVisible();
    if (usernameErrorVisible) {
      errors.push('Username is required!');
    }
    
    // Check for password error
    const passwordErrorVisible = await this.isPasswordErrorVisible();
    if (passwordErrorVisible) {
      errors.push('Password is required!');
    }
    
    // Also check for MUI form errors
    try {
      const muiErrors = await this.formErrorText.allTextContents();
      errors.push(...muiErrors);
    } catch {
      // No MUI errors found
    }
    
    return errors;
  }

  /**
   * Check if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  /**
   * Check if login was successful by verifying URL change
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      // Wait for navigation away from login page
      await this.page.waitForURL(/dashboard|home|main|app/, { timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for login to complete
   */
  async waitForLoginComplete(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(1000);
  }

  /**
   * Check if still on login page
   */
  async isOnLoginPage(): Promise<boolean> {
    const currentUrl = this.getCurrentUrl();
    return currentUrl.includes('111.119.245.10:20081') && 
           !currentUrl.includes('dashboard') && 
           !currentUrl.includes('home') &&
           !currentUrl.includes('app');
  }
}
