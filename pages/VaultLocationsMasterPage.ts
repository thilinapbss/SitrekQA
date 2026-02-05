import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class VaultLocationsMasterPage extends BasePage {
  readonly mastersMenuButton: Locator;
  readonly vaultLocationsMenuItem: Locator;
  readonly syncAllButton: Locator;
  readonly gridContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.mastersMenuButton = page.getByText(/masters/i).nth(1);
    this.vaultLocationsMenuItem = page.getByText(/^vault locations$/i).first();
    this.syncAllButton = page.getByRole('button', { name: /sync all/i });
    this.gridContainer = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
  }

  async navigateToVaultLocationsMaster() {
    console.log('✓ Navigating to Vault Locations Master');
    await this.mastersMenuButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Clicked on Masters menu');
    
    await this.vaultLocationsMenuItem.click();
    await this.page.waitForTimeout(2000);
    console.log('✓ Clicked on Vault Locations menu item');
  }

  async isVaultLocationsMenuVisible() {
    await expect(this.vaultLocationsMenuItem).toBeVisible();
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

  async getVaultLocationsCount(): Promise<number> {
    await this.page.waitForTimeout(2000);
    const rows = await this.page.locator('[role="row"]').count();
    console.log(`✓ Found ${rows} vault location rows in grid`);
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
