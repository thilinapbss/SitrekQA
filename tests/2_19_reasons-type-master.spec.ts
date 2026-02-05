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

  test('TC_REASONS_TYPE_MASTER_002: Should create a new Reason Type with unique code', async ({ page }) => {
    console.log('\n=== TC_REASONS_TYPE_MASTER_002: Create Reason Type ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // Create new reason type
    await reasonsTypeMasterPage.createReasonType(uniqueCode, reasonTypeName, 'Test remark for automation');
    
    // Verify success notification
    const isSuccess = await reasonsTypeMasterPage.isSuccessNotificationVisible();
    expect(isSuccess).toBeTruthy();
    console.log('✓ Success notification displayed');
    
    // Verify new reason type appears in the list
    await page.waitForTimeout(2000);
    const isVisible = await reasonsTypeMasterPage.isReasonTypeVisible(uniqueCode);
    expect(isVisible).toBeTruthy();
    console.log(`✓ New reason type "${uniqueCode}" appears in the list`);
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
    console.log('\n=== TC_REASONS_TYPE_MASTER_004-005: Edit and Deactivate ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // Create a reason type first
    const editTestCode = `EDIT_${timestamp}`;
    await reasonsTypeMasterPage.createReasonType(editTestCode, 'Reason To Edit', 'Edit test remark');
    await page.waitForTimeout(3000);
    
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
    
    // Verify reason type disappears from default list
    await page.waitForTimeout(2000);
    const isStillVisible = await reasonsTypeMasterPage.isReasonTypeVisible(editTestCode);
    expect(isStillVisible).toBeFalsy();
    console.log('✓ Deactivated reason type disappeared from default list');
    
    // Verify count decreased
    const newCount = await reasonsTypeMasterPage.getReasonTypeCount();
    console.log(`✓ New active reason types count: ${newCount}`);
    expect(newCount).toBeLessThan(initialCount);
  });

  test('TC_REASONS_TYPE_MASTER_006: Should show inactive reasons when "All Reason Types" is selected', async ({ page }) => {
    console.log('\n=== TC_REASONS_TYPE_MASTER_006: Show All Reason Types ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // Create and deactivate a reason type
    const allTestCode = `ALL_${timestamp}`;
    await reasonsTypeMasterPage.createReasonType(allTestCode, 'Reason For All Test', 'All test remark');
    await page.waitForTimeout(2000);
    
    // Deactivate it
    await reasonsTypeMasterPage.clickThreeDotMenu(allTestCode);
    await reasonsTypeMasterPage.clickEditOption();
    await reasonsTypeMasterPage.toggleActiveCheckbox();
    await reasonsTypeMasterPage.clickUpdateButton();
    await page.waitForTimeout(2000);
    
    // Verify it's not visible in default view
    let isVisible = await reasonsTypeMasterPage.isReasonTypeVisible(allTestCode);
    expect(isVisible).toBeFalsy();
    console.log('✓ Inactive reason not visible in default view');
    
    // Toggle "All Reason Types"
    await reasonsTypeMasterPage.toggleAllReasonTypes();
    
    // Verify deactivated reason now appears
    isVisible = await reasonsTypeMasterPage.isReasonTypeVisible(allTestCode);
    expect(isVisible).toBeTruthy();
    console.log('✓ Inactive reason now visible when "All Reason Types" is selected');
  });

  test('TC_REASONS_TYPE_MASTER_007: Should delete reason type with notification', async ({ page }) => {
    console.log('\n=== TC_REASONS_TYPE_MASTER_007: Delete Reason Type ===');
    
    // Navigate to Reasons Type Master
    await reasonsTypeMasterPage.navigateToReasonsTypeMaster();
    
    // Create a reason type to delete
    const deleteTestCode = `DEL_${timestamp}`;
    await reasonsTypeMasterPage.createReasonType(deleteTestCode, 'Reason To Delete', 'Delete test remark');
    await page.waitForTimeout(2000);
    
    // Verify it exists
    let isVisible = await reasonsTypeMasterPage.isReasonTypeVisible(deleteTestCode);
    expect(isVisible).toBeTruthy();
    console.log(`✓ Reason type "${deleteTestCode}" exists`);
    
    // Get count before deletion
    const countBefore = await reasonsTypeMasterPage.getReasonTypeCount();
    
    // Click 3-dot menu
    await reasonsTypeMasterPage.clickThreeDotMenu(deleteTestCode);
    
    // Click Delete
    await reasonsTypeMasterPage.clickDeleteOption();
    
    // Confirm deletion if dialog appears
    await reasonsTypeMasterPage.confirmDeletion();
    
    // Verify success notification
    const isSuccess = await reasonsTypeMasterPage.isSuccessNotificationVisible();
    expect(isSuccess).toBeTruthy();
    console.log('✓ Delete success notification displayed');
    
    // Verify notification message
    const notification = await reasonsTypeMasterPage.getNotificationMessage();
    console.log(`✓ Notification: ${notification}`);
    
    // Verify reason type is removed
    await page.waitForTimeout(2000);
    isVisible = await reasonsTypeMasterPage.isReasonTypeVisible(deleteTestCode);
    expect(isVisible).toBeFalsy();
    console.log('✓ Deleted reason type removed from list');
    
    // Verify count decreased
    const countAfter = await reasonsTypeMasterPage.getReasonTypeCount();
    expect(countAfter).toBeLessThan(countBefore);
    console.log(`✓ Count decreased from ${countBefore} to ${countAfter}`);
  });
});
