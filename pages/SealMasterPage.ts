import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SealMasterPage extends BasePage {
    readonly mastersMenuButton: Locator;
    readonly sealMenuItem: Locator;
    readonly syncAllButton: Locator;
    readonly gridContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.mastersMenuButton = page.getByText(/masters/i).nth(1);
        this.sealMenuItem = page.getByText(/^seal$/i).first();
        this.syncAllButton = page.getByRole('button', { name: /sync all/i });
        this.gridContainer = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
    }

    async navigateToSealMaster() {
        console.log('✓ Navigating to Seal Master');
        await this.mastersMenuButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked on Masters menu');
        
        await this.sealMenuItem.click();
        await this.page.waitForTimeout(2000);
        console.log('✓ Clicked on Seal menu item');
    }

    async isSealMenuVisible() {
        await expect(this.sealMenuItem).toBeVisible();
        return true;
    }

    async clickSyncAll() {
        await expect(this.syncAllButton).toBeVisible();
        console.log('✓ Sync All button is visible');
        await this.syncAllButton.click();
        await this.page.waitForTimeout(3000);
        console.log('✓ Clicked Sync All button');
    }

    async isGridLoaded() {
        await expect(this.gridContainer).toBeVisible();
        console.log('✓ Seal Master page loaded with grid');
        return true;
    }

    async getSealCount() {
        await this.page.waitForTimeout(2000);
        const rows = await this.gridContainer.locator('[role="row"]').count();
        return rows > 0 ? rows - 1 : 0;
    }

    async getGridData() {
        await expect(this.gridContainer).toBeVisible();
        const gridText = await this.gridContainer.textContent();
        return gridText || '';
    }
}
