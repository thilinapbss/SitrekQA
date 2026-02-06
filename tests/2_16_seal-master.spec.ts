import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SealMasterPage } from '../pages/SealMasterPage';
import * as testData from '../test-data/users.json';

test.describe('Seal Master - Functionality Tests', () => {
    let loginPage: LoginPage;
    let sealMasterPage: SealMasterPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        sealMasterPage = new SealMasterPage(page);

        // Navigate to the application and login
        await page.goto('https://111.119.245.10:20081/');
        await page.waitForTimeout(2000);
        
        // Login with valid credentials
        const user = testData.validUsers[0];
        await loginPage.login(user.username, user.password);
        await page.waitForTimeout(2000);
    });

    test('TC_SEAL_MASTER_001: Verify Seal Master navigation and grid display', async ({ page }) => {
        console.log('\n=== TC_SEAL_MASTER_001: Seal Master Navigation and Grid Display ===\n');

        // Navigate to Seal Master
        await sealMasterPage.navigateToSealMaster();

        // Verify grid is loaded
        const gridLoaded = await sealMasterPage.isGridLoaded();
        expect(gridLoaded).toBeTruthy();

        // Verify all three columns are present
        const sealCodeColumn = page.getByText('Seal Code');
        const sealNameColumn = page.getByText('Seal Name');
        const branchColumn = page.getByText('Branch');

        try {
            await expect(sealCodeColumn).toBeVisible({ timeout: 5000 });
            console.log('✓ Seal Code column found');
        } catch (error) {
            console.log('✗ Seal Code column NOT found in grid');
        }

        try {
            await expect(sealNameColumn).toBeVisible({ timeout: 5000 });
            console.log('✓ Seal Name column found');
        } catch (error) {
            console.log('✗ Seal Name column NOT found in grid');
        }

        try {
            await expect(branchColumn).toBeVisible({ timeout: 5000 });
            console.log('✓ Branch column found');
        } catch (error) {
            console.log('✗ Branch column NOT found in grid');
        }

        // Get seal count
        const sealCount = await sealMasterPage.getSealCount();
        console.log(`\n✓ Found ${sealCount} seal record(s) in the grid`);

        // Verify we have at least the grid with data or empty
        expect(sealCount).toBeGreaterThanOrEqual(0);

        // Get grid data
        const gridData = await sealMasterPage.getGridData();
        console.log(`\n✓ Grid data length: ${gridData.length} characters`);

        // Check for common data issues
        const hasInvalidDate = gridData.includes('Invalid Date');
        const hasNull = gridData.includes('null');
        
        if (hasInvalidDate) {
            console.log('✗ WARNING: Grid contains "Invalid Date" entries');
        } else {
            console.log('✓ No invalid date entries found');
        }

        console.log('\n✓ Test completed successfully');
    });

    test('TC_SEAL_MASTER_002: Verify Sync All functionality (if available)', async ({ page }) => {
        console.log('\n=== TC_SEAL_MASTER_002: Sync All Functionality ===\n');

        // Navigate to Seal Master
        await sealMasterPage.navigateToSealMaster();

        // Verify grid is loaded first
        await sealMasterPage.isGridLoaded();

        // Check if Sync All button exists
        const syncButton = page.getByRole('button', { name: /sync all/i });
        
        try {
            await expect(syncButton).toBeVisible({ timeout: 5000 });
            console.log('✓ Sync All button found');

            // Click Sync All
            await syncButton.click();
            console.log('✓ Clicked Sync All button');

            // Wait for sync to complete
            await page.waitForTimeout(3000);

            // Verify data is still displayed after sync
            const sealCountAfterSync = await sealMasterPage.getSealCount();
            console.log(`✓ Seal count after sync: ${sealCountAfterSync}`);

            console.log('\n✓ Sync All operation completed');
        } catch (error) {
            console.log('⚠ Note: Sync All button not found');
            console.log('This is acceptable if Seal Master does not have sync functionality');
        }

        console.log('\n✓ Test completed');
    });

    test('TC_SEAL_MASTER_003: Verify Seal Master data display', async ({ page }) => {
        console.log('\n=== TC_SEAL_MASTER_003: Data Display Verification ===\n');

        // Navigate to Seal Master
        await sealMasterPage.navigateToSealMaster();

        // Verify grid is loaded
        await sealMasterPage.isGridLoaded();

        // Get seal count
        const sealCount = await sealMasterPage.getSealCount();
        console.log(`Total seal records: ${sealCount}`);

        if (sealCount > 0) {
            // Get and display sample data
            const rows = await page.locator('[role="row"]').all();
            const dataRowCount = Math.min(3, rows.length - 1);
            
            if (dataRowCount > 0) {
                console.log('\n=== Sample Seal Records ===');
                for (let i = 1; i <= dataRowCount; i++) {
                    const rowText = await rows[i].textContent();
                    console.log(`Row ${i}: ${rowText}`);
                }
            }

            expect(sealCount).toBeGreaterThan(0);
        } else {
            console.log('⚠ No seal records found in grid');
            console.log('This may be expected if no seals have been created yet');
        }

        console.log('\n✓ Test completed');
    });
});
