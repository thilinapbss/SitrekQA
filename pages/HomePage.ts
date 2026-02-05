import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 * Contains all locators and methods for the home/dashboard page
 */
export class HomePage extends BasePage {
  // Locators
  readonly welcomeMessage: Locator;
  readonly userProfileButton: Locator;
  readonly logoutButton: Locator;
  readonly navigationMenu: Locator;
  readonly searchInput: Locator;
  readonly notificationIcon: Locator;

  constructor(page: Page) {
    super(page);
    
    // Using stable locators
    this.welcomeMessage = page.getByTestId('welcome-message');
    this.userProfileButton = page.getByRole('button', { name: 'Profile' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.navigationMenu = page.getByRole('navigation');
    this.searchInput = page.getByPlaceholder('Search...');
    this.notificationIcon = page.getByTestId('notification-icon');
  }

  /**
   * Navigate to home page
   */
  async navigateToHomePage(path: string = '/'): Promise<void> {
    await this.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.getElementText(this.welcomeMessage);
  }

  /**
   * Verify user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(this.userProfileButton);
  }

  /**
   * Logout from application
   */
  async logout(): Promise<void> {
    await this.clickElement(this.userProfileButton);
    await this.clickElement(this.logoutButton);
  }

  /**
   * Search for content
   */
  async search(query: string): Promise<void> {
    await this.fillInput(this.searchInput, query);
    await this.searchInput.press('Enter');
  }

  /**
   * Navigate to a menu item
   */
  async navigateToMenuItem(menuItem: string): Promise<void> {
    const menuLink = this.page.getByRole('link', { name: menuItem });
    await this.clickElement(menuLink);
  }

  /**
   * Check if notification icon is visible
   */
  async hasNotifications(): Promise<boolean> {
    return await this.isElementVisible(this.notificationIcon);
  }
}
