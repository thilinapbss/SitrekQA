import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CollectionTypeMasterPage extends BasePage {
  readonly mastersMenuButton: Locator;
  readonly collectionTypeMenuItem: Locator;
  readonly codeInput: Locator;
  readonly nameInput: Locator;
  readonly remarkInput: Locator;
  readonly saveButton: Locator;
  readonly clearButton: Locator;
  readonly successNotification: Locator;
  readonly errorNotification: Locator;
  readonly collectionTypesList: Locator;

  constructor(page: Page) {
    super(page);
    this.mastersMenuButton = page.getByRole('button', { name: 'Masters' });
    this.collectionTypeMenuItem = page.getByRole('link', { name: 'Collection Type' });
    
    // Form fields - using getByRole for better reliability
    this.codeInput = page.getByRole('textbox', { name: 'Code' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.remarkInput = page.getByRole('textbox', { name: 'Remark' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.clearButton = page.getByRole('button', { name: 'Clear' });
    
    // Notifications
    this.successNotification = page.locator('.MuiAlert-root, [role="alert"]').filter({ hasText: /success|created|updated|deleted/i });
    this.errorNotification = page.locator('.MuiAlert-root, [role="alert"]').filter({ hasText: /exists|error|cannot|failed/i });
    
    // List
    this.collectionTypesList = page.locator('table, [role="grid"]').first();
  }

  async navigateToCollectionTypeMaster() {
    console.log('✓ Navigating to Collection Type Master');
    await this.mastersMenuButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Clicked on Masters menu');
    
    await this.collectionTypeMenuItem.click();
    await this.page.waitForTimeout(2000);
    console.log('✓ Clicked on Collection Type menu item');
  }

  async createCollectionType(code: string, name: string, remark: string = '') {
    console.log(`✓ Creating Collection Type: ${code} - ${name}`);
    await this.codeInput.fill(code);
    await this.nameInput.fill(name);
    if (remark) {
      await this.remarkInput.fill(remark);
    }
    await this.saveButton.click();
    await this.page.waitForTimeout(3000);
    console.log(`✓ Waiting for record to appear in grid`);
  }

  async isSuccessNotificationVisible(): Promise<boolean> {
    try {
      await this.successNotification.waitFor({ state: 'visible', timeout: 5000 });
      return await this.successNotification.isVisible();
    } catch {
      return false;
    }
  }

  async clickThreeDotMenu(collectionTypeName: string) {
    console.log(`✓ Clicking 3-dot menu for: ${collectionTypeName}`);
    await this.page.waitForTimeout(1000);
    
    // Check if the row is visible, if not it might be on another page
    let matchingRow = this.page.getByRole('row').filter({ hasText: collectionTypeName });
    let isVisible = await matchingRow.count() > 0;
    
    if (!isVisible) {
      console.log(`⚠ Row not visible on current page, checking next pages...`);
      for (let i = 0; i < 5; i++) {
        const nextButton = this.page.getByRole('button', { name: 'Go to next page' });
        const isDisabled = await nextButton.isDisabled().catch(() => true);
        if (!isDisabled) {
          await nextButton.click();
          await this.page.waitForTimeout(1000);
          matchingRow = this.page.getByRole('row').filter({ hasText: collectionTypeName });
          isVisible = await matchingRow.count() > 0;
          if (isVisible) {
            console.log(`✓ Found row on page ${i + 2}`);
            break;
          }
        } else {
          break;
        }
      }
    }
    
    await matchingRow.first().waitFor({ state: 'visible', timeout: 5000 });
    const moreButton = matchingRow.getByLabel('more');
    await moreButton.waitFor({ state: 'visible', timeout: 5000 });
    await moreButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickEditOption() {
    console.log('✓ Clicking Edit option');
    await this.page.getByRole('menuitem', { name: 'Edit' }).click();
    await this.page.waitForTimeout(1000);
  }

  async clickDeleteOption() {
    console.log('✓ Clicking Delete option');
    await this.page.getByRole('menuitem', { name: 'Delete' }).click();
    await this.page.waitForTimeout(1000);
  }

  async toggleActiveCheckbox() {
    console.log('✓ Toggling Active checkbox');
    const activeCheckbox = this.page.getByRole('checkbox', { name: 'Active' });
    await activeCheckbox.uncheck();
    await this.page.waitForTimeout(500);
  }

  async clickUpdateButton() {
    console.log('✓ Clicking Update button');
    await this.page.getByRole('button', { name: 'Update' }).click();
    await this.page.waitForTimeout(1000);
  }

  async toggleAllCollectionTypes() {
    console.log('✓ Toggling All Collection Types checkbox');
    await this.page.getByText('All Collection Types').click();
    await this.page.waitForTimeout(1000);
  }

  async isCollectionTypeVisible(collectionTypeName: string): Promise<boolean> {
    try {
      const row = this.page.getByRole('row').filter({ hasText: collectionTypeName });
      await row.first().waitFor({ state: 'visible', timeout: 3000 });
      return await row.first().isVisible();
    } catch {
      return false;
    }
  }

  async confirmDeletion() {
    console.log('✓ Confirming deletion');
    const confirmButton = this.page.locator('button:has-text("Confirm"), button:has-text("Yes"), button:has-text("Delete")').last();
    try {
      await confirmButton.waitFor({ state: 'visible', timeout: 3000 });
      await confirmButton.click();
      await this.page.waitForTimeout(2000);
    } catch {
      console.log('⚠ No confirmation dialog found, proceeding...');
    }
  }
}
