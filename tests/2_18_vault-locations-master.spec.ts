import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VaultLocationsMasterPage } from '../pages/VaultLocationsMasterPage';
import users from '../test-data/users.json';

test.describe('Vault Locations Master', () => {
  let loginPage: LoginPage;
  let vaultLocationsMasterPage: VaultLocationsMasterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    vaultLocationsMasterPage = new VaultLocationsMasterPage(page);

    // Navigate directly to the application URL
    await page.goto('https://111.119.245.10:20081/');
    
    // Login with valid credentials
    const validUser = users.validUsers[0];
    await loginPage.login(validUser.username, validUser.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('TC_VAULT_LOCATIONS_MASTER_001: Should navigate to Vault Locations Master and display grid', async ({ page }) => {
    console.log('\n=== TC_VAULT_LOCATIONS_MASTER_001: Navigation and Grid Display ===');
    
    // Navigate to Vault Locations Master
    await vaultLocationsMasterPage.navigateToVaultLocationsMaster();
    
    // Verify grid is loaded
    const isGridVisible = await vaultLocationsMasterPage.isGridLoaded();
    expect(isGridVisible).toBeTruthy();
    console.log('✓ Grid is visible and loaded');
    
    // Verify URL contains vault_location
    expect(page.url()).toContain('vault_location');
    console.log('✓ URL contains vault_location');
  });

  test('TC_VAULT_LOCATIONS_MASTER_002: Should verify Sync All button functionality', async ({ page }) => {
    console.log('\n=== TC_VAULT_LOCATIONS_MASTER_002: Sync All Button ===');
    
    // Navigate to Vault Locations Master
    await vaultLocationsMasterPage.navigateToVaultLocationsMaster();
    
    // Verify grid is loaded
    await vaultLocationsMasterPage.isGridLoaded();
    
    // Verify Sync All button is visible
    await expect(vaultLocationsMasterPage.syncAllButton).toBeVisible();
    console.log('✓ Sync All button is visible');
    
    // Click Sync All button
    await vaultLocationsMasterPage.clickSyncAll();
  });

  test('TC_VAULT_LOCATIONS_MASTER_003: Should verify grid columns and headers', async ({ page }) => {
    console.log('\n=== TC_VAULT_LOCATIONS_MASTER_003: Grid Columns and Headers ===');
    
    // Navigate to Vault Locations Master
    await vaultLocationsMasterPage.navigateToVaultLocationsMaster();
    
    // Verify grid is loaded
    await vaultLocationsMasterPage.isGridLoaded();
    
    // Verify column headers
    const odooIdHeader = page.locator('text=Odoo ID').first();
    await expect(odooIdHeader).toBeVisible();
    console.log('✓ "Odoo ID" column header is visible');
    
    const vaultLocationHeader = page.locator('text=Vault Location').first();
    await expect(vaultLocationHeader).toBeVisible();
    console.log('✓ "Vault Location" column header is visible');
    
    const customerHeader = page.locator('text=Customer').first();
    await expect(customerHeader).toBeVisible();
    console.log('✓ "Customer" column header is visible');
  });

  test('TC_VAULT_LOCATIONS_MASTER_004: Should display vault locations data in grid', async ({ page }) => {
    console.log('\n=== TC_VAULT_LOCATIONS_MASTER_004: Vault Locations Data Display ===');
    
    // Navigate to Vault Locations Master
    await vaultLocationsMasterPage.navigateToVaultLocationsMaster();
    
    // Verify grid is loaded
    await vaultLocationsMasterPage.isGridLoaded();
    
    // Get vault locations count
    const vaultLocationsCount = await vaultLocationsMasterPage.getVaultLocationsCount();
    console.log(`✓ Grid contains ${vaultLocationsCount} vault location records`);
    expect(vaultLocationsCount).toBeGreaterThan(0);
    
    // Get grid data
    const gridData = await vaultLocationsMasterPage.getGridData();
    console.log('✓ Grid data retrieved successfully');
    console.log('Sample data:', gridData.slice(0, 3));
    
    // Verify grid has data
    expect(gridData.length).toBeGreaterThan(0);
  });
});
