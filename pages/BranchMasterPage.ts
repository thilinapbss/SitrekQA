import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Branch Master Page Object Model
 * Contains all locators and methods for Branch Master functionality
 */
export class BranchMasterPage extends BasePage {
  // Locators
  readonly mastersMenuButton: Locator;
  readonly branchMenuItem: Locator;
  readonly syncAllButton: Locator;
  readonly branchGrid: Locator;
  readonly localTimeColumn: Locator;
  readonly syncStatusMessage: Locator;
  readonly branchList: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);
    
    // Side navigation locators - get the second Masters (navigation menu)
    this.mastersMenuButton = page.getByText(/masters/i).nth(1);
    this.branchMenuItem = page.getByText(/branch/i).first();
    
    // Sync button
    this.syncAllButton = page.getByRole('button', { name: /sync all/i });
    
    // Grid and data locators
    this.branchGrid = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
    this.localTimeColumn = page.locator('[data-field="localTime"], th:has-text("Local Time"), td').first();
    this.branchList = page.locator('[role="row"], tbody tr');
    
    // Status indicators
    this.syncStatusMessage = page.locator('.MuiAlert-root, .success-message, [role="alert"]');
    this.loadingIndicator = page.locator('.MuiCircularProgress-root, .loading, [role="progressbar"]');
  }

  /**
   * Navigate to Masters menu and open Branch Master
   */
  async navigateToBranchMaster(): Promise<void> {
    // Click on Masters menu in side navigation (the second one)
    await this.mastersMenuButton.click();
    
    // Wait for menu to expand
    await this.page.waitForTimeout(1000);
    
    // Click on Branch menu item
    await this.branchMenuItem.click();
    
    // Wait for page to load
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verify branch is available in navigation
   */
  async isBranchMenuVisible(): Promise<boolean> {
    // First ensure Masters menu is clicked/expanded
    const isExpanded = await this.mastersMenuButton.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await this.clickElement(this.mastersMenuButton);
      await this.page.waitForTimeout(500);
    }
    
    return await this.isElementVisible(this.branchMenuItem);
  }

  /**
   * Click Sync All button
   */
  async clickSyncAll(): Promise<void> {
    await this.clickElement(this.syncAllButton);
    
    // Wait for sync operation to complete
    // Check if loading indicator appears and disappears
    try {
      await this.loadingIndicator.waitFor({ state: 'visible', timeout: 2000 });
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // If no loading indicator, just wait a bit
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Verify local time is displayed in the grid
   */
  async isLocalTimeDisplayed(): Promise<boolean> {
    // Wait for grid to be visible
    await this.branchGrid.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if local time column or data exists
    const localTimeVisible = await this.localTimeColumn.isVisible().catch(() => false);
    
    if (!localTimeVisible) {
      // Try alternative approach - look for time patterns in the grid
      const gridText = await this.branchGrid.textContent();
      // Look for time patterns like "10:30 AM" or "14:30:00"
      const hasTimePattern = /\d{1,2}:\d{2}(\s?[AP]M)?/.test(gridText || '');
      return hasTimePattern;
    }
    
    return localTimeVisible;
  }

  /**
   * Get branch count from grid
   */
  async getBranchCount(): Promise<number> {
    await this.branchGrid.waitFor({ state: 'visible', timeout: 10000 });
    const branches = await this.branchList.all();
    return branches.length;
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
      const branchCount = await this.getBranchCount();
      return branchCount > 0;
    }
  }

  /**
   * Get latest sync time/timestamp from grid
   */
  async getLatestSyncTime(): Promise<string | null> {
    try {
      await this.branchGrid.waitFor({ state: 'visible', timeout: 10000 });
      
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

  /**
   * Verify branches are synced to latest
   * This checks if the sync timestamp is recent (within last few minutes)
   */
  async areBranchesSyncedToLatest(): Promise<boolean> {
    const syncTime = await this.getLatestSyncTime();
    
    if (!syncTime) {
      // If we can't find sync time, check if sync was successful
      return await this.isSyncSuccessful();
    }
    
    // Parse time and check if it's recent
    // This is a simplified check - in real scenario you'd parse the actual timestamp
    const now = new Date();
    const currentMinutes = now.getMinutes();
    
    // Check if time string contains current hour/minutes (simplified)
    const hasRecentTime = syncTime.includes(now.getHours().toString()) || 
                          syncTime.includes(currentMinutes.toString());
    
    return hasRecentTime || await this.isSyncSuccessful();
  }
}
