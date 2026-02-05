import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EquipmentTypeMasterPage extends BasePage {
  // Locators
  private mastersButton = () => this.page.getByRole('button', { name: 'Masters' });
  private equipmentTypeMenuItem = () => this.page.getByRole('link', { name: 'Equipment Type' });
  
  // Form fields
  private nameInput = () => this.page.getByRole('textbox', { name: 'Name' });
  private departmentDropdown = () => this.page.getByRole('combobox', { name: 'Department' });
  private remarksInput = () => this.page.getByRole('textbox', { name: 'Remarks' });
  
  // Buttons
  private saveButton = () => this.page.getByRole('button', { name: 'Save' });
  private updateButton = () => this.page.getByRole('button', { name: 'Update' });
  
  // Checkbox
  private activeCheckbox = () => this.page.getByRole('checkbox', { name: 'Active' });
  private allEquipmentTypesCheckbox = () => this.page.getByText('All Equipment Types');
  
  // Grid and notifications
  private dataGrid = () => this.page.locator('.MuiDataGrid-root');
  private successAlert = () => this.page.locator('.MuiAlert-message');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Equipment Type Master
   */
  async navigateToEquipmentTypeMaster() {
    console.log('✓ Navigating to Equipment Type Master');
    await this.mastersButton().click();
    console.log('✓ Clicked on Masters menu');
    await this.page.waitForTimeout(1000);
    
    await this.equipmentTypeMenuItem().click();
    console.log('✓ Clicked on Equipment Type menu item');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Create a new Equipment Type
   * @param name - Equipment Type name
   * @param remarks - Remarks text
   */
  async createEquipmentType(name: string, remarks: string) {
    console.log(`✓ Creating Equipment Type: ${name}`);
    
    // Fill name
    await this.nameInput().fill(name);
    console.log(`✓ Filled Name: ${name}`);
    
    // Select first available department from dropdown
    await this.departmentDropdown().click();
    await this.page.waitForTimeout(500);
    
    // Click the first option
    await this.page.getByRole('option').first().click();
    console.log(`✓ Selected first available Department`);
    await this.page.waitForTimeout(500);
    
    // Fill remarks
    await this.remarksInput().fill(remarks);
    console.log(`✓ Filled Remarks: ${remarks}`);
    
    // Click Save
    await this.saveButton().click();
    console.log('✓ Clicked Save button');
    
    // Wait for save to complete
    await this.page.waitForTimeout(3000);
    console.log('✓ Equipment Type creation completed');
  }

  /**
   * Click on 3-dot menu for a specific Equipment Type
   * @param equipmentTypeName - Name of the Equipment Type to find
   */
  async clickThreeDotMenu(equipmentTypeName: string) {
    console.log(`✓ Looking for Equipment Type: ${equipmentTypeName}`);
    
    // Check multiple pages if needed
    let found = false;
    let pageCount = 0;
    const maxPages = 5;

    while (!found && pageCount < maxPages) {
      // Try to find the row with the equipment type name
      const row = this.page.getByRole('row').filter({ hasText: equipmentTypeName });
      
      if (await row.count() > 0) {
        console.log(`✓ Found Equipment Type on page ${pageCount + 1}`);
        
        // Click the 3-dot menu button
        const moreButton = row.getByLabel('more');
        await moreButton.click();
        console.log('✓ Clicked 3-dot menu');
        
        // Wait for menu to appear
        await this.page.waitForTimeout(1000);
        found = true;
        break;
      }

      // Try to go to next page
      const nextPageButton = this.page.getByRole('button', { name: 'Go to next page' });
      if (await nextPageButton.isDisabled()) {
        console.log('✗ Equipment Type not found and no more pages available');
        break;
      }

      await nextPageButton.click();
      await this.page.waitForTimeout(1000);
      pageCount++;
    }

    if (!found) {
      throw new Error(`Equipment Type "${equipmentTypeName}" not found after checking ${pageCount + 1} pages`);
    }
  }

  /**
   * Click Edit option from 3-dot menu
   */
  async clickEditOption() {
    console.log('✓ Clicking Edit option');
    await this.page.getByRole('menuitem', { name: 'Edit' }).click();
    await this.page.waitForTimeout(1500);
    console.log('✓ Edit form opened');
  }

  /**
   * Uncheck the Active checkbox to deactivate
   */
  async toggleActiveCheckbox() {
    console.log('✓ Deactivating Equipment Type');
    await this.activeCheckbox().uncheck();
    console.log('✓ Unchecked Active checkbox');
  }

  /**
   * Click Update button
   */
  async clickUpdateButton() {
    console.log('✓ Clicking Update button');
    await this.updateButton().click();
    await this.page.waitForTimeout(3000);
    console.log('✓ Update completed');
  }

  /**
   * Toggle "All Equipment Types" checkbox to show inactive items
   */
  async toggleAllEquipmentTypes() {
    console.log('✓ Toggling "All Equipment Types" checkbox');
    await this.allEquipmentTypesCheckbox().click();
    await this.page.waitForTimeout(2000);
    console.log('✓ Toggled "All Equipment Types"');
  }

  /**
   * Verify if Equipment Type is visible in the grid
   * @param equipmentTypeName - Name to search for
   * @returns true if found, false otherwise
   */
  async isEquipmentTypeVisible(equipmentTypeName: string): Promise<boolean> {
    console.log(`✓ Checking if Equipment Type is visible: ${equipmentTypeName}`);
    
    // Check multiple pages
    let pageCount = 0;
    const maxPages = 5;

    while (pageCount < maxPages) {
      const row = this.page.getByRole('row').filter({ hasText: equipmentTypeName });
      
      if (await row.count() > 0) {
        console.log(`✓ Equipment Type found on page ${pageCount + 1}`);
        return true;
      }

      // Try to go to next page
      const nextPageButton = this.page.getByRole('button', { name: 'Go to next page' });
      if (await nextPageButton.isDisabled()) {
        break;
      }

      await nextPageButton.click();
      await this.page.waitForTimeout(1000);
      pageCount++;
    }

    console.log('✓ Equipment Type not visible in grid');
    return false;
  }

  /**
   * Verify form fields are visible
   */
  async verifyFormFieldsVisible() {
    await expect(this.nameInput()).toBeVisible();
    console.log('✓ Name input field is visible');
    
    await expect(this.departmentDropdown()).toBeVisible();
    console.log('✓ Department dropdown is visible');
    
    await expect(this.remarksInput()).toBeVisible();
    console.log('✓ Remarks input field is visible');
    
    await expect(this.saveButton()).toBeVisible();
    console.log('✓ Save button is visible');
  }

  /**
   * Get the current value of the Name field
   */
  async getNameFieldValue(): Promise<string> {
    return await this.nameInput().inputValue();
  }
}
