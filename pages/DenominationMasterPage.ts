import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DenominationMasterPage extends BasePage {
  readonly mastersMenuButton: Locator;
  readonly syncedDenominationMenuItem: Locator;
  readonly syncAllButton: Locator;
  readonly gridContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.mastersMenuButton = page.getByText(/masters/i).nth(1);
    this.syncedDenominationMenuItem = page.getByText(/^synced denomination master$/i).first();
    this.syncAllButton = page.getByRole('button', { name: /sync all/i });
    this.gridContainer = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
  }

  async navigateToDenominationMaster() {
    console.log('✓ Navigating to Synced Denomination Master');
    await this.mastersMenuButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Clicked on Masters menu');
    
    await this.syncedDenominationMenuItem.click();
    await this.page.waitForTimeout(2000);
    console.log('✓ Clicked on Synced Denomination Master menu item');
  }

  async isSyncedDenominationMenuVisible() {
    await expect(this.syncedDenominationMenuItem).toBeVisible();
  }

  async isGridLoaded(): Promise<boolean> {
    try {
      await this.gridContainer.waitFor({ state: 'visible', timeout: 10000 });
      return await this.gridContainer.isVisible();
    } catch (error) {
      console.error('Grid container not loaded:', error);
      return false;
    }
  }

  async getDenominationCount(): Promise<number> {
    await this.page.waitForTimeout(2000);
    const rows = await this.page.locator('[role="row"]').count();
    console.log(`✓ Found ${rows} synced denomination rows in grid`);
    return rows > 0 ? rows - 1 : 0; // Subtract header row
  }

  async getGridData(): Promise<any[]> {
    const rows = await this.page.locator('[role="row"]').all();
    const data = [];
    
    for (let i = 1; i < rows.length; i++) { // Skip header row
      const cells = await rows[i].locator('[role="cell"]').allTextContents();
      data.push(cells);
    }
    
    return data;
  }

  async clickSyncAll() {
    console.log('✓ Clicking Sync All button...');
    await this.syncAllButton.click();
    await this.page.waitForTimeout(3000);
    console.log('✓ Sync All completed');
  }
}
