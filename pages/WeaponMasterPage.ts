import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class WeaponMasterPage extends BasePage {
    readonly mastersMenuButton: Locator;
    readonly weaponMenuItem: Locator;
    readonly syncAllButton: Locator;
    readonly gridContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.mastersMenuButton = page.getByText(/masters/i).nth(1);
        this.weaponMenuItem = page.getByText(/weapon/i).first();
        this.syncAllButton = page.getByRole('button', { name: /sync all/i });
        this.gridContainer = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
    }

    async navigateToWeaponMaster() {
        console.log('✓ Navigating to Weapon Master');
        await this.mastersMenuButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked on Masters menu');
        
        await this.weaponMenuItem.click();
        await this.page.waitForTimeout(2000);
        console.log('✓ Clicked on Weapon menu item');
    }

    async isWeaponMenuVisible() {
        await expect(this.weaponMenuItem).toBeVisible();
        return true;
    }

    async clickSyncAll() {
        await expect(this.syncAllButton).toBeVisible();
        console.log('✓ Sync All button is visible');
        await this.syncAllButton.click();
        await this.page.waitForTimeout(3000);
        console.log('✓ Clicked Sync All button');
    }

    async isLocalTimeDisplayed() {
        await expect(this.gridContainer).toBeVisible();
        console.log('✓ Weapon Master page loaded with grid');
        
        const gridText = await this.gridContainer.textContent();
        const timestampRegex = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/;
        return timestampRegex.test(gridText || '');
    }

    async getWeaponCount() {
        await this.page.waitForTimeout(2000);
        const rows = await this.gridContainer.locator('[role="row"]').count();
        return rows > 0 ? rows - 1 : 0;
    }
}
