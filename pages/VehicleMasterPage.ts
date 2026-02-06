import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class VehicleMasterPage extends BasePage {
  readonly mastersMenuButton: Locator;
  readonly vehicleMenuItem: Locator;
  
  // Form fields
  readonly vehicleNumberInput: Locator;
  readonly customerTypeDropdown: Locator;
  readonly modelInput: Locator;
  readonly yearInput: Locator;
  readonly colorInput: Locator;
  readonly vehicleTypeDropdown: Locator;
  readonly fuelTypeDropdown: Locator;
  readonly engineNumberInput: Locator;
  readonly chassisNumberInput: Locator;
  readonly ownerInput: Locator;
  readonly startOdometerInput: Locator;
  readonly purchasePriceInput: Locator;
  readonly purchaseDateInput: Locator;
  readonly depreciationRateInput: Locator;
  readonly currentValueInput: Locator;
  readonly serviceDueDateInput: Locator;
  readonly securityEquipmentInput: Locator;
  readonly insurancePolicyNumberInput: Locator;
  readonly insuranceExpiryDateInput: Locator;
  readonly licensePlateNumberInput: Locator;
  readonly licenseTypeDropdown: Locator;
  readonly licenseExpiryDateInput: Locator;
  readonly armoringLevelInput: Locator;
  readonly remarksInput: Locator;
  readonly activeCheckbox: Locator;
  
  readonly saveButton: Locator;
  readonly clearButton: Locator;
  readonly syncButton: Locator;
  
  readonly successNotification: Locator;
  readonly errorNotification: Locator;
  readonly vehiclesList: Locator;

  constructor(page: Page) {
    super(page);
    this.mastersMenuButton = page.getByRole('button', { name: 'Masters' });
    this.vehicleMenuItem = page.getByRole('link', { name: 'Vehicle' });
    
    // Form fields - using getByRole and getByLabel for better reliability
    this.vehicleNumberInput = page.getByRole('textbox', { name: 'Vehicle Number' });
    this.modelInput = page.getByRole('textbox', { name: 'Model' });
    this.yearInput = page.getByRole('textbox', { name: 'Year' });
    this.colorInput = page.getByRole('textbox', { name: 'Color' });
    this.engineNumberInput = page.getByRole('textbox', { name: 'Engine Number' });
    this.chassisNumberInput = page.getByRole('textbox', { name: 'Chassis Number' });
    this.ownerInput = page.getByRole('textbox', { name: 'Owner' });
    this.startOdometerInput = page.getByRole('textbox', { name: 'Start Odometer Reading' });
    this.purchasePriceInput = page.getByRole('textbox', { name: 'Purchase Price' });
    this.purchaseDateInput = page.getByLabel('Purchase Date');
    this.depreciationRateInput = page.getByRole('textbox', { name: 'Depreciation Rate' });
    this.currentValueInput = page.getByRole('textbox', { name: 'Current Value' });
    this.serviceDueDateInput = page.getByLabel('Service Due Date');
    this.securityEquipmentInput = page.getByRole('textbox', { name: 'Security Equipment Installed' });
    this.insurancePolicyNumberInput = page.getByRole('textbox', { name: 'Insurance Policy Number' });
    this.insuranceExpiryDateInput = page.getByLabel('Insurance Expiry Date');
    this.licensePlateNumberInput = page.getByRole('textbox', { name: 'License Plate Number' });
    this.licenseExpiryDateInput = page.getByLabel('License Expiry Date');
    this.armoringLevelInput = page.getByRole('textbox', { name: 'Armoring Level' });
    this.remarksInput = page.getByRole('textbox', { name: 'Remarks' });
    this.activeCheckbox = page.getByRole('checkbox', { name: 'Active' });
    
    // Dropdowns
    this.customerTypeDropdown = page.locator('input[name="Customer Type"]');
    this.vehicleTypeDropdown = page.locator('input[name="Vehicle Type"]');
    this.fuelTypeDropdown = page.locator('input[name="Fuel Type"]');
    this.licenseTypeDropdown = page.locator('input[name="License Type"]');
    
    // Buttons
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.clearButton = page.getByRole('button', { name: 'Clear' });
    this.syncButton = page.getByRole('button', { name: /sync/i });
    
    // Notifications
    this.successNotification = page.locator('.MuiAlert-root, [role="alert"]').filter({ hasText: /success|created|synced/i });
    this.errorNotification = page.locator('.MuiAlert-root, [role="alert"]').filter({ hasText: /error|failed/i });
    
    // List
    this.vehiclesList = page.locator('table, [role="grid"]').first();
  }

  async navigateToVehicleMaster() {
    console.log('✓ Navigating to Vehicle Master');
    await this.mastersMenuButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Clicked on Masters menu');
    
    await this.vehicleMenuItem.click();
    await this.page.waitForTimeout(2000);
    console.log('✓ Clicked on Vehicle menu item');
  }

  async createVehicle(vehicleData: {
    vehicleNumber: string;
    model: string;
    year: string;
    color: string;
    engineNumber: string;
    chassisNumber: string;
    owner: string;
    startOdometer: string;
    purchasePrice: string;
    purchaseDate: string;
    depreciationRate: string;
    currentValue: string;
    serviceDueDate: string;
    securityEquipment?: string;
    insurancePolicyNumber: string;
    insuranceExpiryDate: string;
    licensePlateNumber: string;
    licenseExpiryDate: string;
    armoringLevel?: string;
    remarks?: string;
  }) {
    console.log(`✓ Creating Vehicle: ${vehicleData.vehicleNumber}`);
    
    await this.vehicleNumberInput.fill(vehicleData.vehicleNumber);
    await this.modelInput.fill(vehicleData.model);
    await this.yearInput.fill(vehicleData.year);
    await this.colorInput.fill(vehicleData.color);
    await this.engineNumberInput.fill(vehicleData.engineNumber);
    await this.chassisNumberInput.fill(vehicleData.chassisNumber);
    await this.ownerInput.fill(vehicleData.owner);
    await this.startOdometerInput.fill(vehicleData.startOdometer);
    await this.purchasePriceInput.fill(vehicleData.purchasePrice);
    await this.purchaseDateInput.fill(vehicleData.purchaseDate);
    await this.depreciationRateInput.fill(vehicleData.depreciationRate);
    await this.currentValueInput.fill(vehicleData.currentValue);
    await this.serviceDueDateInput.fill(vehicleData.serviceDueDate);
    
    if (vehicleData.securityEquipment) {
      await this.securityEquipmentInput.fill(vehicleData.securityEquipment);
    }
    
    await this.insurancePolicyNumberInput.fill(vehicleData.insurancePolicyNumber);
    await this.insuranceExpiryDateInput.fill(vehicleData.insuranceExpiryDate);
    await this.licensePlateNumberInput.fill(vehicleData.licensePlateNumber);
    await this.licenseExpiryDateInput.fill(vehicleData.licenseExpiryDate);
    
    if (vehicleData.armoringLevel) {
      await this.armoringLevelInput.fill(vehicleData.armoringLevel);
    }
    
    if (vehicleData.remarks) {
      await this.remarksInput.fill(vehicleData.remarks);
    }
    
    await this.saveButton.click();
    await this.page.waitForTimeout(3000);
    console.log('✓ Vehicle creation form submitted');
  }

  async clickSyncButton() {
    console.log('✓ Clicking Sync button');
    await this.syncButton.click();
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

  async getNotificationMessage(): Promise<string> {
    try {
      const notification = this.page.locator('.MuiAlert-root, [role="alert"]').first();
      await notification.waitFor({ state: 'visible', timeout: 3000 });
      const text = await notification.innerText();
      console.log(`✓ Notification message: ${text}`);
      return text;
    } catch (error) {
      console.log('⚠ No notification found');
      return '';
    }
  }

  async isVehicleVisible(vehicleNumber: string): Promise<boolean> {
    try {
      const row = this.page.locator(`tr:has-text("${vehicleNumber}")`);
      await row.waitFor({ state: 'visible', timeout: 3000 });
      return await row.isVisible();
    } catch {
      return false;
    }
  }

  async getVehicleCount(): Promise<number> {
    await this.page.waitForTimeout(1000);
    const rows = await this.page.locator('table tbody tr, [role="row"]').count();
    return rows > 0 ? rows - 1 : 0; // Subtract header row
  }

  async waitForSyncCompletion() {
    console.log('✓ Waiting for sync to complete');
    // Wait for loading indicator to disappear
    const loadingIndicator = this.page.locator('.MuiCircularProgress-root, [role="progressbar"]');
    try {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
      console.log('✓ Sync completed');
    } catch {
      console.log('⚠ No loading indicator found or already completed');
    }
    await this.page.waitForTimeout(2000);
  }
}
