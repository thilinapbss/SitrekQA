import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CollectionTypeMasterPage } from '../pages/CollectionTypeMasterPage';

test.describe('Collection Type Master - CRUD Operations', () => {
  let loginPage: LoginPage;
  let collectionTypeMasterPage: CollectionTypeMasterPage;
  const timestamp = Date.now();

  // Set timeout for all tests in this suite
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    collectionTypeMasterPage = new CollectionTypeMasterPage(page);
    
    // Navigate and login
    await page.goto('https://111.119.245.10:20081/');
    await loginPage.login('chathura', 'Admin@1234');
    await page.waitForTimeout(2000);
  });

  test('TC_COLLECTION_TYPE_001: Should navigate to Collection Type Master and display form', async ({ page }) => {
    console.log('\n=== TC_COLLECTION_TYPE_001: Navigation and Form Display ===');
    
    // Navigate to Collection Type Master
    await collectionTypeMasterPage.navigateToCollectionTypeMaster();
    
    // Verify URL contains collection_type
    expect(page.url()).toContain('collection_type');
    console.log('✓ URL contains collection_type');
    
    // Verify form fields are visible
    await expect(collectionTypeMasterPage.codeInput).toBeVisible();
    console.log('✓ Code input field is visible');
    
    await expect(collectionTypeMasterPage.nameInput).toBeVisible();
    console.log('✓ Name input field is visible');
    
    await expect(collectionTypeMasterPage.remarkInput).toBeVisible();
    console.log('✓ Remark input field is visible');
    
    // Verify buttons are visible
    await expect(collectionTypeMasterPage.saveButton).toBeVisible();
    console.log('✓ Save button is visible');
    
    await expect(collectionTypeMasterPage.clearButton).toBeVisible();
    console.log('✓ Clear button is visible');
  });

  test('TC_COLLECTION_TYPE_003: Complete CRUD workflow - Create, Edit, Deactivate, Show All, deactive', async ({ page }) => {
    console.log('\n=== TC_COLLECTION_TYPE_003: Complete CRUD Workflow ===');
    
    // Navigate to Collection Type Master
    await collectionTypeMasterPage.navigateToCollectionTypeMaster();
    
    // PART 1: Create collection type
    const crudTestCode = `CRUD_${timestamp}`;
    await collectionTypeMasterPage.createCollectionType(crudTestCode, 'CRUD Test Collection Type', 'CRUD workflow test');
    
    // Verify success notification
    const isSuccess = await collectionTypeMasterPage.isSuccessNotificationVisible();
    if (isSuccess) {
      console.log('✓ Create success notification displayed');
    }
    
    // PART 2: Edit and Deactivate
    console.log('\n--- Edit and Deactivate ---');
    
    // Click 3-dot menu
    await collectionTypeMasterPage.clickThreeDotMenu(crudTestCode);
    
    // Click Edit
    await collectionTypeMasterPage.clickEditOption();
    
    // Toggle active checkbox (uncheck to deactivate)
    await collectionTypeMasterPage.toggleActiveCheckbox();
    
    // Click Update
    await collectionTypeMasterPage.clickUpdateButton();
    
    // Verify update success notification
    const isUpdateSuccess = await collectionTypeMasterPage.isSuccessNotificationVisible();
    if (isUpdateSuccess) {
      console.log('✓ Update success notification displayed');
    }
    
    // Verify collection type disappears from default list
    await page.waitForTimeout(1000);
    const isStillVisible = await collectionTypeMasterPage.isCollectionTypeVisible(crudTestCode);
    expect(isStillVisible).toBeFalsy();
    console.log('✓ Deactivated collection type disappeared from default list');
    
    // PART 3: Show All Collection Types (including inactive)
    console.log('\n--- Show All Collection Types ---');
    
    // Toggle "All Collection Types" to show inactive
    await collectionTypeMasterPage.toggleAllCollectionTypes();
    await page.waitForTimeout(2000);
    
    // Verify inactive collection type is now visible
    const isNowVisible = await collectionTypeMasterPage.isCollectionTypeVisible(crudTestCode);
    expect(isNowVisible).toBeTruthy();
    console.log('✓ Inactive collection type now visible when "All Collection Types" is selected');
    
    // PART 4: deactive Collection Type
    console.log('\n--- Deacivate Collection Type ---');
    
    // Click 3-dot menu for the inactive collection type
    await collectionTypeMasterPage.clickThreeDotMenu(crudTestCode);
    
    // Click deactive
    await collectionTypeMasterPage.clickDeleteOption();
    
    // Confirm deletion if dialog appears
    await collectionTypeMasterPage.confirmDeletion();
    
    // Verify collection type is removed
    await page.waitForTimeout(2000);
    const isDeleted = await collectionTypeMasterPage.isCollectionTypeVisible(crudTestCode);
    expect(isDeleted).toBeFalsy();
    console.log('✓ Deleted collection type removed from list');
    
    console.log('\n✓ Complete CRUD workflow verified successfully');
  });
});
