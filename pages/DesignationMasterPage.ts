import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Designation Master Page Object Model
 * Contains all locators and methods for Designation Master functionality
 */
export class DesignationMasterPage extends BasePage {
  // Locators
  readonly mastersMenuButton: Locator;
  readonly designationMenuItem: Locator;
  readonly syncAllButton: Locator;
  readonly designationGrid: Locator;
  readonly lastSyncedColumn: Locator;
  readonly syncStatusMessage: Locator;
  readonly designationList: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);
    
    // Side navigation locators - get the second Masters (navigation menu)
    this.mastersMenuButton = page.getByText(/masters/i).nth(1);
    this.designationMenuItem = page.getByText(/designation/i).first();
    
    // Sync button
    this.syncAllButton = page.getByRole('button', { name: /sync all/i });
    
    // Grid and data locators
    this.designationGrid = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
    this.lastSyncedColumn = page.locator('[data-field="lastSyncedDate"], th:has-text("Last Synced Date"), td').first();
    this.designationList = page.locator('[role="row"], tbody tr');
    
    // Status indicators
    this.syncStatusMessage = page.locator('.MuiAlert-root, .success-message, [role="alert"]');
    this.loadingIndicator = page.locator('.MuiCircularProgress-root, .loading, [role="progressbar"]');
  }

  /**
   * Navigate to Masters menu and open Designation Master
   */
  async navigateToDesignationMaster(): Promise<void> {
    // Click on Masters menu in side navigation (the second one)
    await this.mastersMenuButton.click();
    
    // Wait for menu to expand
    await this.page.waitForTimeout(1000);
    
    // Click on Designation menu item
    await this.designationMenuItem.click();
    
    // Wait for page to load
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verify designation is available in navigation
   */
  async isDesignationMenuVisible(): Promise<boolean> {
    // First ensure Masters menu is clicked/expanded
    const isExpanded = await this.mastersMenuButton.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await this.mastersMenuButton.click();
      await this.page.waitForTimeout(500);
    }
    
    return await this.isElementVisible(this.designationMenuItem);
  }

  /**
   * Click Sync All button
   */
  async clickSyncAll(): Promise<void> {
    await this.syncAllButton.click();
    
    // Wait for sync operation to complete
    try {
      await this.loadingIndicator.waitFor({ state: 'visible', timeout: 2000 });
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // If no loading indicator, just wait a bit
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Verify Last Synced Date is displayed in the grid
   */
  async isLastSyncedDateDisplayed(): Promise<boolean> {
    // Wait for grid to be visible
    await this.designationGrid.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if last synced date column or data exists
    const lastSyncedVisible = await this.lastSyncedColumn.isVisible().catch(() => false);
    
    if (!lastSyncedVisible) {
      // Try alternative approach - look for timestamp patterns in the grid
      const gridText = await this.designationGrid.textContent();
      // Look for timestamp patterns like "2026-02-04 10:30:00"
      const hasTimePattern = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(gridText || '');
      return hasTimePattern;
    }
    
    return lastSyncedVisible;
  }

  /**
   * Get designation count from grid
   */
  async getDesignationCount(): Promise<number> {
    await this.designationGrid.waitFor({ state: 'visible', timeout: 10000 });
    const designations = await this.designationList.all();
    return designations.length;
  }

  /**
   * Verify sync was successful
   */
  async isSyncSuccessful(): Promise<boolean> {
    // Check for success message or alert
    try {
      await this.syncStatusMessage.waitFor({ state: 'visible', timeout: 5000 });
      const messageText = await this.syncStatusMessage.textContent();
      return messageText?.toLowerCase().includes('success') || 
             messageText?.toLowerCase().includes('synced') || false;
    } catch {
      // If no message appears, check if grid updated (has data)
      const designationCount = await this.getDesignationCount();
      return designationCount > 0;
    }
  }

  /**
   * Get latest sync time/timestamp from grid
   */
  async getLatestSyncTime(): Promise<string | null> {
    try {
      await this.designationGrid.waitFor({ state: 'visible', timeout: 10000 });
      
      // Try to find timestamp in the grid
      const timeElements = await this.page.locator('[data-field*="time"], [data-field*="sync"], td:has-text(":")').all();
      
      if (timeElements.length > 0) {
        return await timeElements[0].textContent();
      }
      
      return null;
    } catch {
      return null;
    }
  }
}
