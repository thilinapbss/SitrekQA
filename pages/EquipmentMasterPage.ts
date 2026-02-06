import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EquipmentMasterPage extends BasePage {
  // Locators
  private mastersButton = () => this.page.getByRole('button', { name: 'Masters' });
  private equipmentMenuItem = () => this.page.getByRole('link', { name: 'Equipment', exact: true });
  
  // Form fields
  private deviceIdInput = () => this.page.getByRole('textbox', { name: 'Device ID' });
  private nameInput = () => this.page.getByRole('textbox', { name: 'Name' });
  private tagNumberInput = () => this.page.getByRole('textbox', { name: 'Tag Number' });
  private typeDropdown = () => this.page.getByRole('combobox', { name: 'Type' });
  private deviceBrandInput = () => this.page.getByRole('textbox', { name: 'Device Brand' });
  private assignedToInput = () => this.page.getByRole('textbox', { name: 'Assigned To' });
  private simCardNumberInput = () => this.page.getByRole('textbox', { name: 'SIM Card Number' });
  private deviceStatusInput = () => this.page.getByRole('textbox', { name: 'Device Status' });
  private currentLocationInput = () => this.page.getByRole('textbox', { name: 'Current Location' });
  private purchaseDateInput = () => this.page.getByLabel('Purchase Date');
  private warrantyPeriodInput = () => this.page.getByRole('textbox', { name: 'Warranty Period' });
  private warrantyExpiryDateInput = () => this.page.getByLabel('Warranty Expiry Date');
  private descriptionInput = () => this.page.getByRole('textbox', { name: 'Description' });
  private remarksInput = () => this.page.getByRole('textbox', { name: 'Remarks' });
  
  // Buttons
  private saveButton = () => this.page.getByRole('button', { name: 'Save' });
  private updateButton = () => this.page.getByRole('button', { name: 'Update' });
  
  // Checkbox
  private activeCheckbox = () => this.page.getByRole('checkbox', { name: 'Active' });
  
  // Grid and notifications
  private dataGrid = () => this.page.locator('.MuiDataGrid-root');
  private successAlert = () => this.page.locator('.MuiAlert-message');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Equipment Master
   */
  async navigateToEquipmentMaster() {
    console.log('✓ Navigating to Equipment Master');
    await this.mastersButton().click();
    console.log('✓ Clicked on Masters menu');
    await this.page.waitForTimeout(1000);
    
    await this.equipmentMenuItem().click();
    console.log('✓ Clicked on Equipment menu item');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Create a new Equipment with unique fields and dropdown/date selections
   * @param equipmentData - Equipment data object with required fields
   */
  async createEquipment(equipmentData: {
    deviceId: string;
    name: string;
    tagNumber: string;
    type: string;
    deviceBrand: string;
    assignedTo: string;
    simCardNumber: string;
    deviceStatus: string;
    currentLocation: string;
    purchaseDate: string;
    warrantyPeriod: string;
    warrantyExpiryDate: string;
    description: string;
    remarks: string;
  }) {
    console.log(`✓ Creating Equipment: ${equipmentData.name}`);
    
    // Fill Device ID
    await this.deviceIdInput().fill(equipmentData.deviceId);
    console.log(`✓ Filled Device ID: ${equipmentData.deviceId}`);
    
    // Fill Name
    await this.nameInput().fill(equipmentData.name);
    console.log(`✓ Filled Name: ${equipmentData.name}`);
    
    // Fill Tag Number
    await this.tagNumberInput().fill(equipmentData.tagNumber);
    console.log(`✓ Filled Tag Number: ${equipmentData.tagNumber}`);
    
    // Select Type from dropdown
    await this.typeDropdown().click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('option', { name: equipmentData.type }).click();
    console.log(`✓ Selected Type: ${equipmentData.type}`);
    await this.page.waitForTimeout(500);
    
    // Fill Device Brand
    await this.deviceBrandInput().fill(equipmentData.deviceBrand);
    console.log(`✓ Filled Device Brand: ${equipmentData.deviceBrand}`);
    
    // Fill Assigned To
    await this.assignedToInput().fill(equipmentData.assignedTo);
    console.log(`✓ Filled Assigned To: ${equipmentData.assignedTo}`);
    
    // Fill SIM Card Number
    await this.simCardNumberInput().fill(equipmentData.simCardNumber);
    console.log(`✓ Filled SIM Card Number: ${equipmentData.simCardNumber}`);
    
    // Fill Device Status
    await this.deviceStatusInput().fill(equipmentData.deviceStatus);
    console.log(`✓ Filled Device Status: ${equipmentData.deviceStatus}`);
    
    // Fill Current Location
    await this.currentLocationInput().fill(equipmentData.currentLocation);
    console.log(`✓ Filled Current Location: ${equipmentData.currentLocation}`);
    
    // Fill Purchase Date
    await this.purchaseDateInput().fill(equipmentData.purchaseDate);
    console.log(`✓ Filled Purchase Date: ${equipmentData.purchaseDate}`);
    await this.page.waitForTimeout(500);
    
    // Fill Warranty Period
    await this.warrantyPeriodInput().fill(equipmentData.warrantyPeriod);
    console.log(`✓ Filled Warranty Period: ${equipmentData.warrantyPeriod}`);
    
    // Fill Warranty Expiry Date
    await this.warrantyExpiryDateInput().fill(equipmentData.warrantyExpiryDate);
    console.log(`✓ Filled Warranty Expiry Date: ${equipmentData.warrantyExpiryDate}`);
    await this.page.waitForTimeout(500);
    
    // Fill Description
    await this.descriptionInput().fill(equipmentData.description);
    console.log(`✓ Filled Description: ${equipmentData.description}`);
    
    // Fill Remarks
    await this.remarksInput().fill(equipmentData.remarks);
    console.log(`✓ Filled Remarks: ${equipmentData.remarks}`);
    
    // Click Save
    await this.saveButton().click();
    console.log('✓ Clicked Save button');
    
    // Wait for save to complete
    await this.page.waitForTimeout(3000);
    console.log('✓ Equipment creation completed');
  }

  /**
   * Verify form fields are visible
   */
  async verifyFormFieldsVisible() {
    await expect(this.nameInput()).toBeVisible();
    console.log('✓ Name input field is visible');
    
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
