import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ReasonsTypeMasterPage } from '../pages/ReasonsTypeMasterPage';
import users from '../test-data/users.json';

test.describe('Reasons Type Master - CRUD Operations', () => {
  let loginPage: LoginPage;
  let reasonsTypeMasterPage: ReasonsTypeMasterPage;
  
  // Generate unique test data
  const timestamp = Date.now();
  const uniqueCode = `AUTO_${timestamp}`;
  const reasonTypeName = `Test Reason Type ${timestamp}`;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    reasonsTypeMasterPage = new ReasonsTypeMasterPage(page);

    // Navigate and login
    await page.goto('https://111.119.245.10:20081/');
    const validUser = users.validUsers[0];
    await loginPage.login(validUser.username, validUser.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('TC_REASONS_TYPE_MASTER_001: Should navigate to Reasons Type Master and display form', async ({ page }) => {
    console.log('\n=== TC_REASONS_TYPE_MASTER_001: Navigation and Form Display ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // Verify URL
    expect(page.url()).toContain('reasons_type');
    console.log('✓ URL contains reasons_type');
    
    // Verify form elements are visible
    await expect(reasonsTypeMasterPage.codeInput).toBeVisible();
    console.log('✓ Code input field is visible');
    
    await expect(reasonsTypeMasterPage.saveButton).toBeVisible();
    console.log('✓ Save button is visible');
  });

  test('TC_REASONS_TYPE_MASTER_003: Should show error when creating duplicate code', async ({ page }) => {
    console.log('\n=== TC_REASONS_TYPE_MASTER_003: Duplicate Code Validation ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // First, create a reason type
    const testCode = `DUP_${timestamp}`;
    await reasonsTypeMasterPage.createReasonType(testCode, 'First Reason', 'First remark');
    await page.waitForTimeout(2000);
    
    // Try to create with same code
    await reasonsTypeMasterPage.createReasonType(testCode, 'Duplicate Reason', 'Duplicate remark');
    
    // Verify duplicate code error message is displayed
    const duplicateErrorMessage = page.locator('text="This code already exists."');
    await expect(duplicateErrorMessage).toBeVisible({ timeout: 5000 });
    console.log('✓ Duplicate code error message displayed: "This code already exists."');
  });

  test('TC_REASONS_TYPE_MASTER_004-005: Should edit and deactivate reason type', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds for comprehensive test
    console.log('\n=== TC_REASONS_TYPE_MASTER_004-005: Edit and Deactivate ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // Create a reason type first
    const editTestCode = `EDIT_${timestamp}`;
    await reasonsTypeMasterPage.createReasonType(editTestCode, 'Reason To Edit', 'Edit test remark');
    
    // Get initial count
    const initialCount = await reasonsTypeMasterPage.getReasonTypeCount();
    console.log(`✓ Initial active reason types count: ${initialCount}`);
    
    // Click 3-dot menu
    await reasonsTypeMasterPage.clickThreeDotMenu(editTestCode);
    
    // Click Edit
    await reasonsTypeMasterPage.clickEditOption();
    
    // Toggle active checkbox (uncheck to deactivate)
    await reasonsTypeMasterPage.toggleActiveCheckbox();
    
    // Click Update
    await reasonsTypeMasterPage.clickUpdateButton();
    
    // Verify success notification
    const isSuccess = await reasonsTypeMasterPage.isSuccessNotificationVisible();
    expect(isSuccess).toBeTruthy();
    console.log('✓ Update success notification displayed');
    
    // Verify inactive reason not visible in default view
    await page.waitForTimeout(1000);
    let isStillVisible = await reasonsTypeMasterPage.isReasonTypeVisible(editTestCode);
    expect(isStillVisible).toBeFalsy();
    console.log('✓ Inactive reason not visible in default view');
    
    // Toggle "All Reason Types" checkbox to show inactive reasons
    await reasonsTypeMasterPage.toggleAllReasonTypes();
    await page.waitForTimeout(1000);
    console.log('✓ Toggling All Reason Types checkbox');
    
    // Verify inactive reason types visible
    isStillVisible = await reasonsTypeMasterPage.isReasonTypeVisible(editTestCode);
    expect(isStillVisible).toBeTruthy();
    console.log('✓ Inactive reason types visible after toggling All Reason Types');
    
    // Click 3-dot menu of inactive reason
    await reasonsTypeMasterPage.clickThreeDotMenu(editTestCode);
    console.log('✓ Clicking 3-dot menu of inactive reason');
    
    // Click deactive option
    await reasonsTypeMasterPage.clickDeleteOption();
    console.log('✓ Clicking deactive option');
    
    // Confirm deletion if dialog appears
    await reasonsTypeMasterPage.confirmDeletion();
    
    // Verify successfully deleted
    await page.waitForTimeout(2000);
    const isDeleted = !(await reasonsTypeMasterPage.isReasonTypeVisible(editTestCode));
    expect(isDeleted).toBeTruthy();
    console.log('✓ Successfully deleted inactive reason type');
  });
});
