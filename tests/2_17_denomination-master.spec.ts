import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DenominationMasterPage } from '../pages/DenominationMasterPage';
import users from '../test-data/users.json';

test.describe('Synced Denomination Master', () => {
  let loginPage: LoginPage;
  let denominationMasterPage: DenominationMasterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    denominationMasterPage = new DenominationMasterPage(page);

    // Navigate directly to the application URL
    await page.goto('https://111.119.245.10:20081/');
    
    // Login with valid credentials
    const validUser = users.validUsers[0];
    await loginPage.login(validUser.username, validUser.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('TC_SYNCED_DENOMINATION_MASTER_001: Should navigate to Synced Denomination Master and display grid', async ({ page }) => {
    console.log('\n=== TC_SYNCED_DENOMINATION_MASTER_001: Navigation and Grid Display ===');
    
    // Navigate to Synced Denomination Master
    await denominationMasterPage.navigateToDenominationMaster();
    
    // Verify page heading should say "Synced Denomination Master"
    const heading = page.locator('h4:has-text("Synced Denomination Master")');
    await expect(heading).toBeVisible();
    console.log('✓ Page heading "Synced Denomination Master" is visible');
    
    // Verify grid is loaded
    const isGridVisible = await denominationMasterPage.isGridLoaded();
    expect(isGridVisible).toBeTruthy();
    console.log('✓ Grid is visible and loaded');
    
    // Verify URL contains synced_denomination_master
    expect(page.url()).toContain('synced_denomination_master');
    console.log('✓ URL contains synced_denomination_master');
  });

  test('TC_SYNCED_DENOMINATION_MASTER_002: Should verify Sync button functionality', async ({ page }) => {
    console.log('\n=== TC_SYNCED_DENOMINATION_MASTER_002: Sync Button Functionality ===');
    
    // Navigate to Synced Denomination Master
    await denominationMasterPage.navigateToDenominationMaster();
    
    // Verify grid is loaded
    await denominationMasterPage.isGridLoaded();
    
    // Verify Sync All button exists (to sync data from Odoo)
    const syncButton = page.getByRole('button', { name: /sync all/i });
    await expect(syncButton).toBeVisible();
    console.log('✓ Sync All button is visible');
    
    // Click Sync All button
    await syncButton.click();
    await page.waitForTimeout(3000);
    console.log('✓ Sync All button clicked successfully');
  });

  test('TC_SYNCED_DENOMINATION_MASTER_003: Should verify grid columns and headers', async ({ page }) => {
    console.log('\n=== TC_SYNCED_DENOMINATION_MASTER_003: Grid Columns and Headers ===');
    
    // Navigate to Synced Denomination Master
    await denominationMasterPage.navigateToDenominationMaster();
    
    // Verify grid is loaded
    await denominationMasterPage.isGridLoaded();
    
    // Verify column headers
    const odooIdHeader = page.locator('text=Odoo ID').first();
    await expect(odooIdHeader).toBeVisible();
    console.log('✓ "Odoo ID" column header is visible');
    
    const denominationTypeHeader = page.locator('text=Denomination Type').first();
    await expect(denominationTypeHeader).toBeVisible();
    console.log('✓ "Denomination Type" column header is visible');
    
    const denominationNameHeader = page.locator('text=Denomination Name').first();
    await expect(denominationNameHeader).toBeVisible();
    console.log('✓ "Denomination Name" column header is visible');
  });

  test('TC_SYNCED_DENOMINATION_MASTER_004: Should display synced denomination data in grid', async ({ page }) => {
    console.log('\n=== TC_SYNCED_DENOMINATION_MASTER_004: Synced Denomination Data Display ===');
    
    // Navigate to Synced Denomination Master
    await denominationMasterPage.navigateToDenominationMaster();
    
    // Verify grid is loaded
    await denominationMasterPage.isGridLoaded();
    
    // Get denomination count
    const denominationCount = await denominationMasterPage.getDenominationCount();
    console.log(`✓ Grid contains ${denominationCount} synced denomination records`);
    expect(denominationCount).toBeGreaterThan(0);
    
    // Get grid data
    const gridData = await denominationMasterPage.getGridData();
    console.log('✓ Grid data retrieved successfully');
    console.log('Sample data:', gridData.slice(0, 3));
    
    // Verify grid has data
    expect(gridData.length).toBeGreaterThan(0);
  });
});
