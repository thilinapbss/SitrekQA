import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AgreementMasterPage } from '../pages/AgreementMasterPage';
import * as testData from '../test-data/users.json';

test.describe('Agreement Master - Sync Functionality', () => {
    let loginPage: LoginPage;
    let agreementMasterPage: AgreementMasterPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        agreementMasterPage = new AgreementMasterPage(page);

        await loginPage.navigateToLoginPage();
        const user = testData.validUsers[0];
        await loginPage.login(user.username, user.password);
        await page.waitForTimeout(2000);
    });

    test('TC_AGREEMENT_MASTER_001: Verify Agreement Master navigation, Sync All, and local time display', async ({ page }) => {
        console.log('\n=== TC_AGREEMENT_MASTER_001: Agreement Master Sync with Time Validation ===\n');

        // Navigate to Agreement Master
        await agreementMasterPage.navigateToAgreementMaster();

        // Verify grid is loaded
        const gridLoaded = await agreementMasterPage.isLocalTimeDisplayed();
        expect(gridLoaded).toBeTruthy();

        // Check if "Last Synced Date" column exists
        const lastSyncedColumn = page.getByText('Last Synced Date');
        
        try {
            await expect(lastSyncedColumn).toBeVisible({ timeout: 5000 });
            console.log('✓ Last Synced Date column found');
        } catch (error) {
            console.log('✗ Last Synced Date column NOT found in grid');
            console.log('⚠ BUG: Agreement Master is missing the "Last Synced Date" column');
            throw new Error('Last Synced Date column not found in Agreement Master grid');
        }

        // Capture real-time before clicking Sync All
        const syncClickTime = new Date();
        const sriLankaTime = new Date(syncClickTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
        const expectedDate = sriLankaTime.toISOString().split('T')[0];
        
        console.log(`Real-time captured (Sri Lanka): ${sriLankaTime.toISOString().slice(0, 19).replace('T', ' ')}`);
        console.log(`Expected date in grid: ${expectedDate}`);

        // Click Sync All
        await agreementMasterPage.clickSyncAll();

        // Verify local time is displayed after sync
        const gridContainer = agreementMasterPage.gridContainer;
        const gridText = await gridContainer.textContent();
        
        // Extract all timestamps from the grid
        const timestampRegex = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g;
        const timestamps = gridText?.match(timestampRegex) || [];
        
        console.log(`\n✓ Found ${timestamps.length} timestamp(s) in grid`);
        
        if (timestamps.length > 0) {
            // Check if timestamps contain "Invalid Date"
            const hasInvalidDate = gridText?.includes('Invalid Date');
            
            if (hasInvalidDate) {
                console.log('✗ CRITICAL: Grid contains "Invalid Date" entries');
                console.log('⚠ BUG: Data corruption detected - timestamps showing as "Invalid Date"');
                throw new Error('Invalid Date found in Agreement Master grid');
            }
            
            // Display first few timestamps
            const displayCount = Math.min(3, timestamps.length);
            console.log(`\nFirst ${displayCount} timestamp(s):`);
            for (let i = 0; i < displayCount; i++) {
                console.log(`  ${i + 1}. ${timestamps[i]}`);
            }
            
            // Validate timestamps are from today
            let validTimestampCount = 0;
            for (const timestamp of timestamps) {
                if (timestamp.startsWith(expectedDate)) {
                    validTimestampCount++;
                }
            }
            
            console.log(`\n✓ ${validTimestampCount} out of ${timestamps.length} timestamps match today's date (${expectedDate})`);
            
            if (validTimestampCount === 0) {
                console.log('\n✗ VALIDATION FAILED: No timestamps match the current date');
                console.log(`Expected date: ${expectedDate}`);
                console.log(`Actual timestamps: ${timestamps.slice(0, 3).join(', ')}`);
                console.log('⚠ BUG: Timestamps are not updating to current Sri Lankan time');
            }
            
            expect(validTimestampCount).toBeGreaterThan(0);
        } else {
            console.log('✗ No timestamps found in the grid');
            throw new Error('No timestamps found in Agreement Master grid');
        }

        console.log('\n=== Test Completed ===\n');
    });

    test('TC_AGREEMENT_MASTER_002: Verify Sync All button updates agreement records', async ({ page }) => {
        console.log('\n=== TC_AGREEMENT_MASTER_002: Sync Status Validation ===\n');

        // Navigate to Agreement Master
        await agreementMasterPage.navigateToAgreementMaster();

        // Get initial count
        const initialCount = await agreementMasterPage.getAgreementCount();
        console.log(`Initial agreement count: ${initialCount}`);

        // Click Sync All
        await agreementMasterPage.clickSyncAll();
        console.log('✓ Clicked Sync All');

        // Get updated count
        const finalCount = await agreementMasterPage.getAgreementCount();
        console.log(`Final agreement count: ${finalCount}`);

        // Verify sync occurred (count should be > 0)
        expect(finalCount).toBeGreaterThan(0);
        console.log('✓ Agreements synced successfully');

        console.log('\n=== Test Completed ===\n');
    });
});
