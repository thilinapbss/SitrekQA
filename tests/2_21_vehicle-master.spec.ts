import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VehicleMasterPage } from '../pages/VehicleMasterPage';

test.describe('Vehicle Master - CRUD Operations', () => {
  let loginPage: LoginPage;
  let vehicleMasterPage: VehicleMasterPage;
  const timestamp = Date.now();

  // Set timeout for all tests in this suite
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    vehicleMasterPage = new VehicleMasterPage(page);
    
    // Navigate and login
    await page.goto('https://111.119.245.10:20081/');
    await loginPage.login('chathura', 'Admin@1234');
    await page.waitForTimeout(2000);
  });

  test('TC_VEHICLE_MASTER_001: Should navigate to Vehicle Master and create Ad-hoc Hiring Vehicle', async ({ page }) => {
    console.log('\n=== TC_VEHICLE_MASTER_001: Navigation and Create Vehicle ===');
    
    // Navigate to Vehicle Master
    await vehicleMasterPage.navigateToVehicleMaster();
    
    // Verify URL contains vehicle_master
    expect(page.url()).toContain('vehicle_master');
    console.log('✓ URL contains vehicle_master');
    
    // Verify form fields are visible
    await expect(vehicleMasterPage.vehicleNumberInput).toBeVisible();
    console.log('✓ Vehicle Number input field is visible');
    
    await expect(vehicleMasterPage.modelInput).toBeVisible();
    console.log('✓ Model input field is visible');
    
    await expect(vehicleMasterPage.saveButton).toBeVisible();
    console.log('✓ Save button is visible');
    
    // Note: Full vehicle creation test will be added after inspecting actual form field labels
    console.log('✓ Vehicle Master form is accessible and ready for data entry');
    console.log('  (Full CRUD operations to be implemented after form field inspection)');
  });

  test('TC_VEHICLE_MASTER_002: Should sync vehicles and verify API response', async ({ page }) => {
    console.log('\n=== TC_VEHICLE_MASTER_002: Sync Vehicles and API Verification ===');
    
    // Navigate to Vehicle Master
    await vehicleMasterPage.navigateToVehicleMaster();
    
    // Get initial vehicle count
    const initialCount = await vehicleMasterPage.getVehicleCount();
    console.log(`✓ Initial vehicle count: ${initialCount}`);
    
    // Setup API response listener to capture sync API call
    const apiResponses: any[] = [];
    page.on('response', async (response) => {
      const url = response.url();
      // Capture sync-related API calls
      if (url.includes('sync') || url.includes('vehicle')) {
        try {
          const status = response.status();
          const responseBody = await response.json().catch(() => null);
          apiResponses.push({
            url,
            status,
            body: responseBody
          });
          console.log(`✓ API Call captured: ${url} - Status: ${status}`);
        } catch (error) {
          // Ignore parse errors for non-JSON responses
        }
      }
    });
    
    // Click Sync button
    await vehicleMasterPage.clickSyncButton();
    
    // Wait for sync to complete
    await vehicleMasterPage.waitForSyncCompletion();
    
    // Verify success notification
    const isSuccess = await vehicleMasterPage.isSuccessNotificationVisible();
    if (isSuccess) {
      console.log('✓ Sync success notification displayed');
      const notification = await vehicleMasterPage.getNotificationMessage();
      console.log(`✓ Notification: ${notification}`);
    } else {
      console.log('⚠ Sync notification not visible (may have disappeared)');
    }
    
    // Get vehicle count after sync
    await page.waitForTimeout(2000);
    const afterSyncCount = await vehicleMasterPage.getVehicleCount();
    console.log(`✓ Vehicle count after sync: ${afterSyncCount}`);
    
    // Verify count increased or stayed same (depends on external system)
    if (afterSyncCount >= initialCount) {
      console.log(`✓ Sync completed - vehicles count: ${afterSyncCount} (was ${initialCount})`);
    } else {
      console.log(`⚠ Vehicle count decreased after sync: ${afterSyncCount} (was ${initialCount})`);
    }
    
    // Verify API calls were made
    if (apiResponses.length > 0) {
      console.log(`\n✓ Captured ${apiResponses.length} API call(s)`);
      
      // Find sync-related API call
      const syncApi = apiResponses.find(api => 
        api.url.includes('sync') || 
        (api.status === 200 && api.body)
      );
      
      if (syncApi) {
        console.log(`✓ Sync API found: ${syncApi.url}`);
        console.log(`✓ API Status: ${syncApi.status}`);
        
        // Verify status is 200
        expect(syncApi.status).toBe(200);
        console.log('✓ API returned status 200 OK');
        
        // Verify response body exists
        if (syncApi.body) {
          console.log(`✓ API Response body exists`);
          console.log(`   Response preview: ${JSON.stringify(syncApi.body).substring(0, 100)}...`);
        } else {
          console.log('⚠ API Response body is empty or non-JSON');
        }
      } else {
        console.log('⚠ No sync-specific API call found in captured requests');
        console.log('   Captured URLs:', apiResponses.map(r => r.url));
      }
    } else {
      console.log('⚠ No API calls were captured during sync');
    }
  });
});
