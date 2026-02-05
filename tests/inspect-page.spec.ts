import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as testData from '../test-data/users.json';

test('Inspect Weapon Master Grid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateToLoginPage();
  const user = testData.validUsers[0];
  await loginPage.login(user.username, user.password);
  await page.waitForTimeout(2000);

  // Navigate to Weapon Master
  const mastersButton = page.getByText(/masters/i).nth(1);
  await mastersButton.click();
  await page.waitForTimeout(1000);
  console.log('✓ Clicked on Masters menu');

  const weaponMenuItem = page.getByText(/weapon/i).first();
  await weaponMenuItem.click();
  await page.waitForTimeout(2000);
  console.log('✓ Clicked on Weapon menu item');

  // Inspect grid structure
  const grid = page.locator('.MuiDataGrid-root, [role="grid"], table').first();
  await grid.waitFor({ state: 'visible', timeout: 5000 });
  console.log('✓ Grid is visible');

  // Get all column headers
  const headers = await page.locator('[role="columnheader"], th').allTextContents();
  console.log('\n=== WEAPON MASTER GRID COLUMN HEADERS ===');
  console.log('Columns:', headers);
  console.log('Total columns:', headers.length);

  // Get grid text content
  const gridText = await grid.textContent();
  console.log('\n=== GRID TEXT CONTENT (first 500 chars) ===');
  console.log(gridText?.slice(0, 500));

  // Check for timestamps
  const timestampRegex = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g;
  const timestamps = gridText?.match(timestampRegex) || [];
  console.log('\n=== TIMESTAMPS FOUND ===');
  console.log('Count:', timestamps.length);
  if (timestamps.length > 0) {
    console.log('First 3:', timestamps.slice(0, 3));
  }

  // Take screenshot
  await page.screenshot({ path: 'test-results/weapon-master-inspection.png', fullPage: true });
  console.log('\n=== Screenshot saved to test-results/weapon-master-inspection.png ===');

  // Keep browser open for manual inspection
  await page.pause();
});
