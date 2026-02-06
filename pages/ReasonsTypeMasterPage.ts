import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReasonsTypeMasterPage extends BasePage {
  readonly mastersMenuButton: Locator;
  readonly reasonsTypeMenuItem: Locator;
  readonly codeInput: Locator;
  readonly nameInput: Locator;
  readonly remarkInput: Locator;
  readonly saveButton: Locator;
  readonly clearButton: Locator;
  readonly allReasonTypesCheckbox: Locator;
  readonly successNotification: Locator;
  readonly errorNotification: Locator;
  readonly reasonTypesList: Locator;

  constructor(page: Page) {
    super(page);
    this.mastersMenuButton = page.getByRole('button', { name: 'Masters' });
    this.reasonsTypeMenuItem = page.getByRole('link', { name: 'Reasons Type' });
    
    // Form fields - using role-based selectors from recorded code
    this.codeInput = page.getByRole('textbox', { name: 'Code' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.remarkInput = page.getByRole('textbox', { name: 'Remark' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.clearButton = page.getByRole('button', { name: 'Clear' });
    
    // Filters - clicking on the text toggles the checkbox
    this.allReasonTypesCheckbox = page.getByText('All Reason Types');
    
    // Notifications - MUI alerts (look for any alert/notification)
    this.successNotification = page.locator('.MuiAlert-root, [role="alert"]').filter({ hasText: /success|created|updated|deleted/i });
    this.errorNotification = page.locator('.MuiAlert-root, [role="alert"]').filter({ hasText: /exists|error|cannot|failed/i });
    
    // List
    this.reasonTypesList = page.locator('table, [role="grid"]').first();
  }

  async navigateToReasonsTypeMaster() {
    console.log('✓ Navigating to Reasons Type Master');
    await this.mastersMenuButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Clicked on Masters menu');
    
    await this.reasonsTypeMenuItem.click();
    await this.page.waitForTimeout(2000);
    console.log('✓ Clicked on Reasons Type menu item');
  }

  async createReasonType(code: string, name: string, remark: string = '') {
    console.log(`✓ Creating Reason Type: ${code} - ${name}`);
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

  async isErrorNotificationVisible(): Promise<boolean> {
    try {
      await this.errorNotification.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorNotification.isVisible();
    } catch {
      return false;
    }
  }

  async getNotificationMessage(): Promise<string> {
    try {
      // Try to find MUI alert first
      const notification = this.page.locator('.MuiAlert-root, [role="alert"]').first();
      await notification.waitFor({ state: 'visible', timeout: 3000 });
      // Get the inner text which includes all nested text content
      const text = await notification.innerText();
      console.log(`✓ Notification message: ${text}`);
      return text;
    } catch (error) {
      console.log('⚠ No notification found');
      return '';
    }
  }

  async clickThreeDotMenu(reasonTypeName: string) {
    console.log(`✓ Clicking 3-dot menu for: ${reasonTypeName}`);
    // Wait for grid to load
    await this.page.waitForTimeout(2000);
    
    // Check if the row is visible, if not it might be on another page
    let matchingRow = this.page.getByRole('row').filter({ hasText: reasonTypeName });
    let isVisible = await matchingRow.count() > 0;
    
    if (!isVisible) {
      console.log(`⚠ Row not visible on current page, checking next pages...`);
      // Try clicking next page a few times to find the record
      for (let i = 0; i < 5; i++) {
        const nextButton = this.page.getByRole('button', { name: 'Go to next page' });
        const isDisabled = await nextButton.isDisabled().catch(() => true);
        if (!isDisabled) {
          await nextButton.click();
          await this.page.waitForTimeout(1000);
          matchingRow = this.page.getByRole('row').filter({ hasText: reasonTypeName });
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
    
    // Now click the 3-dot button
    await matchingRow.first().waitFor({ state: 'visible', timeout: 5000 });
    const moreButton = matchingRow.getByLabel('more');
    await moreButton.waitFor({ state: 'visible', timeout: 5000 });
    await moreButton.click();
    await this.page.waitForTimeout(500);
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
    // Use exact role selector from recorded code
    const activeCheckbox = this.page.getByRole('checkbox', { name: 'Active' });
    await activeCheckbox.uncheck();
    await this.page.waitForTimeout(500);
  }

  async clickUpdateButton() {
    console.log('✓ Clicking Update button');
    await this.page.getByRole('button', { name: 'Update' }).click();
    await this.page.waitForTimeout(1000);
  }

  async toggleAllReasonTypes() {
    console.log('✓ Toggling All Reason Types checkbox');
    await this.page.getByText('All Reason Types').click();
    await this.page.waitForTimeout(1000);
  }

  async isReasonTypeVisible(reasonTypeName: string): Promise<boolean> {
    try {
      const row = this.page.locator(`tr:has-text("${reasonTypeName}")`);
      await row.waitFor({ state: 'visible', timeout: 3000 });
      return await row.isVisible();
    } catch {
      return false;
    }
  }

  async getReasonTypeCount(): Promise<number> {
    await this.page.waitForTimeout(1000);
    const rows = await this.page.locator('table tbody tr, [role="row"]').count();
    return rows > 0 ? rows - 1 : 0; // Subtract header row
  }

  async confirmDeletion() {
    console.log('✓ Confirming deletion');
    // Look for confirmation dialog button
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
