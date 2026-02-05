import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../test-data/users.json';

test('Inspect Employee Master Grid Columns', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Login
  await loginPage.navigateToLoginPage('/');
  const validUser = testData.validUsers[0];
  await loginPage.login(validUser.username, validUser.password);
  await page.waitForTimeout(3000);
  
  // Navigate to Employee Master
  await page.getByText(/masters/i).nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByText(/employee/i).first().click();
  await page.waitForTimeout(3000);
  
  // Get all column headers
  const headers = await page.locator('[role="columnheader"], th').allTextContents();
  console.log('Column headers:', headers);
  
  // Get grid content
  const gridText = await page.locator('.MuiDataGrid-root, [role="grid"], table').first().textContent();
  console.log('Grid content sample:', gridText?.substring(0, 500));
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/employee-grid-inspection.png', fullPage: true });
  
  await page.pause();
});
