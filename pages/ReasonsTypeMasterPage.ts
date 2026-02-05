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
    this.mastersMenuButton = page.getByText(/masters/i).nth(1);
    this.reasonsTypeMenuItem = page.getByText(/^reasons type$/i).first();
    
    // Form fields - based on actual HTML structure
    this.codeInput = page.locator('input[name="Code"]');
    this.nameInput = page.locator('input[name="Name"]');
    this.remarkInput = page.locator('input[name="Remark"]');
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")');
    this.clearButton = page.locator('button[type="button"]:has-text("Clear")');
    
    // Filters
    this.allReasonTypesCheckbox = page.locator('input[type="checkbox"]:near(:text("All"))').first();
    
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
    await this.page.waitForTimeout(2000);
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
    const row = this.page.locator(`tr:has-text("${reasonTypeName}")`);
    const threeDotButton = row.locator('button[aria-label*="more"], button:has(svg)').last();
    await threeDotButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickEditOption() {
    console.log('✓ Clicking Edit option');
    const editButton = this.page.locator('li:has-text("Edit"), button:has-text("Edit")').first();
    await editButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickDeleteOption() {
    console.log('✓ Clicking Delete option');
    const deleteButton = this.page.locator('li:has-text("Delete"), button:has-text("Delete")').first();
    await deleteButton.click();
    await this.page.waitForTimeout(1000);
  }

  async toggleActiveCheckbox() {
    console.log('✓ Toggling Active checkbox');
    // Look for Status checkbox in the form (name="Status")
    const activeCheckbox = this.page.locator('input[type="checkbox"][name="Status"]');
    await activeCheckbox.click();
    await this.page.waitForTimeout(500);
  }

  async clickUpdateButton() {
    console.log('✓ Clicking Update button');
    const updateButton = this.page.locator('button:has-text("Update")');
    await updateButton.click();
    await this.page.waitForTimeout(2000);
  }

  async toggleAllReasonTypes() {
    console.log('✓ Toggling All Reason Types checkbox');
    await this.allReasonTypesCheckbox.click();
    await this.page.waitForTimeout(2000);
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
