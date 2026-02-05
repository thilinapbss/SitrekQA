import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DesignationMasterPage } from '../pages/DesignationMasterPage';
import testData from '../test-data/users.json';

/**
 * Test Suite: Designation Master - Sync Functionality
 * Priority: High
 * Type: Functional Testing
 */
test.describe('Designation Master - Verify Sync All Functionality', () => {
  let loginPage: LoginPage;
  let designationMasterPage: DesignationMasterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    designationMasterPage = new DesignationMasterPage(page);
    
    // Pre-condition: Login to the system
    await loginPage.navigateToLoginPage('/');
    
    // Use valid user credentials from test data
    const validUser = testData.validUsers[0];
    await loginPage.login(validUser.username, validUser.password);
    
    // Wait for successful login
    await page.waitForTimeout(3000);
  });

  test('TC_DESIGNATION_MASTER_001: Verify Designation Master navigation, sync all, and display local time', async ({ page }) => {
    // Step 1: Click Masters menu (second Masters text)
    await designationMasterPage.mastersMenuButton.click();
    await page.waitForTimeout(1000);
    console.log('✓ Clicked on Masters menu');
    
    // Step 2: Click on Designation menu item
    try {
      await page.getByText('Designation', { exact: true }).click({ timeout: 5000 });
    } catch {
      await page.getByText(/designation/i).first().click();
    }
    await page.waitForTimeout(2000);
    console.log('✓ Clicked on Designation menu item');
    
    // Step 3: Verify we're on Designation Master page
    await expect(page.locator('.MuiDataGrid-root, [role="grid"], table').first()).toBeVisible({ timeout: 15000 });
    console.log('✓ Designation Master page loaded with grid');
    
    // Step 4: Verify Sync All button is visible
    const syncButton = page.getByRole('button', { name: /sync all/i });
    await expect(syncButton).toBeVisible({ timeout: 10000 });
    console.log('✓ Sync All button is visible');
    
    // Step 5: Capture real time before clicking Sync All
    const syncClickTime = new Date();
    const sriLankaTime = new Date(syncClickTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
    const expectedDate = sriLankaTime.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const expectedTime = sriLankaTime.toTimeString().split(' ')[0]; // Format: HH:MM:SS
    
    console.log(`Real-time captured (Sri Lanka): ${expectedDate} ${expectedTime}`);
    console.log(`Expected date in grid: ${expectedDate}`);
    
    // Click Sync All button
    await syncButton.click();
    console.log('✓ Clicked Sync All button');
    
    // Wait for sync to complete
    await page.waitForTimeout(5000);
    
    // Step 6: Verify "Last Synced Date" column is displayed
    const lastSyncedColumn = page.getByText('Last Synced Date', { exact: false });
    await expect(lastSyncedColumn).toBeVisible({ timeout: 5000 });
    console.log('✓ Last Synced Date column is visible');
    
    // Get all timestamps after sync
    const gridText = await page.locator('.MuiDataGrid-root, [role="grid"], table').first().textContent();
    
    // Check if there are valid timestamps (not "Invalid Date")
    const hasInvalidDate = gridText?.includes('Invalid Date');
    const hasTimePattern = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(gridText || '');
    
    if (hasInvalidDate) {
      console.log('⚠ WARNING: Grid contains "Invalid Date" entries');
      console.log('⚠ Designation Master may not have valid sync date data');
    }
    
    // Extract all timestamps to check
    const allTimestamps = gridText?.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g) || [];
    console.log(`Found ${allTimestamps.length} valid timestamps in grid`);
    if (allTimestamps.length > 0) {
      console.log(`Displayed timestamps in grid: ${allTimestamps.slice(0, 3).join(', ')}`);
      
      // Check if timestamps contain the expected date
      const hasTodayDate = gridText?.includes(expectedDate);
      if (!hasTodayDate) {
        console.log(`❌ FAIL: Timestamps are NOT updated to current date (${expectedDate})`);
        console.log('❌ The Sync All button is not updating timestamps to Sri Lankan local time');
        console.log(`Real-time was: ${expectedDate} ${expectedTime}`);
        console.log(`Grid shows: ${allTimestamps[0] || 'No timestamp found'}`);
      } else {
        console.log(`✓ Last Synced Date shows current date (${expectedDate}) - Sri Lankan local time`);
      }
      expect(hasTodayDate).toBeTruthy();
    } else {
      // No valid timestamps found - this is the actual issue
      console.log(`❌ FAIL: No valid timestamps found in grid after sync`);
      console.log(`❌ Grid shows "Invalid Date" entries instead of proper timestamps`);
      console.log(`Real-time was: ${expectedDate} ${expectedTime}`);
      expect(hasTimePattern).toBeTruthy(); // This will fail to report the bug
    }
    
    // Step 7: Get designation count and verify designations are synced
    const designations = await page.locator('[role="row"]').all();
    const designationCount = designations.length - 1; // Exclude header row
    expect(designationCount).toBeGreaterThan(0);
    console.log(`✓ Found ${designationCount} designations in the grid`);
    console.log('✓ Designations are synced to latest');
    
    // Take screenshot for evidence
    await page.screenshot({ 
      path: `test-results/designation-master-sync-success-${Date.now()}.png`,
      fullPage: true 
    });
  });

  test('TC_DESIGNATION_MASTER_002: Verify sync status after clicking Sync All', async ({ page }) => {
    // Step 1: Navigate to Designation Master
    await designationMasterPage.mastersMenuButton.click();
    await page.waitForTimeout(1000);
    
    try {
      await page.getByText('Designation', { exact: true }).click({ timeout: 5000 });
    } catch {
      await page.getByText(/designation/i).first().click();
    }
    await page.waitForTimeout(2000);
    
    // Step 2: Wait for grid to load
    await page.locator('.MuiDataGrid-root, [role="grid"], table').first().waitFor({ state: 'visible', timeout: 15000 });
    
    // Step 3: Record initial state
    const initialDesignations = await page.locator('[role="row"]').all();
    const initialDesignationCount = initialDesignations.length - 1;
    console.log(`Initial designation count: ${initialDesignationCount}`);
    
    // Step 4: Click Sync All
    const syncButton = page.getByRole('button', { name: /sync all/i });
    await syncButton.click();
    console.log('✓ Clicked Sync All');
    
    // Wait for sync
    await page.waitForTimeout(3000);
    
    // Step 5: Verify grid still has data after sync
    const finalDesignations = await page.locator('[role="row"]').all();
    const finalDesignationCount = finalDesignations.length - 1;
    expect(finalDesignationCount).toBeGreaterThanOrEqual(initialDesignationCount);
    console.log(`Final designation count: ${finalDesignationCount}`);
    console.log('✓ Designations synced successfully');
  });
});
