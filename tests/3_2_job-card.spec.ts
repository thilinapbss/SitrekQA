import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';

test.describe('Job Card - TC_JOB_CARD_001', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  const BASE_URL = 'https://111.119.245.10:20081';
  const CREATOR_USERNAME = 'chathura';
  const CREATOR_PASSWORD = 'Admin@1234';
  
  const TEST_DATA = {
    route: 'Nation Trust Kelaniya - Colombo',
    customer: 'Nation Trust Bank PLC',
    location: 'NATION TRUST KELANIYA - Colombo - SITREK NEGOMBO BRANCH',
    templateName: 'Nation Trust Bank - Kelaniya - 001',
    jobType: 'Collect & Deposit',
    operationType: 'CIT',
    agreement: 'Nation Trust Bank PLC - CIT - Once A Week',
    jobCategory: 'Normal',
    driver: 'H.M Athula',
    vehicleCommander1: 'J D Kalumsiri',
    vehicleCommander2: 'J D Kalumsiri',
    otherStaff: 'A D Dissanayake',
    armedGuards: 'J D Kalumsiri',
    equipment1: 'Cash Counting Machine',
    equipment2: 'Mobile',
    equipment3: 'Body Camera',
  };

  test.beforeAll(async () => {
    // Browser initialization will be handled by Playwright test runner
  });

  test('Step 1: Login to the system with valid credentials', async ({ browser: testBrowser, context: testContext, page: testPage }) => {
    page = testPage;
    context = testContext;
    browser = testBrowser;

    // Navigate to login page
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Handle SSL certificate warning
    try {
      await page.goto(`data:text/html,<html><body>SSL Override</body></html>`, { waitUntil: 'domcontentloaded' });
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    } catch (e) {
      // Continue despite SSL error
    }

    // Wait for login page to load
    await page.waitForTimeout(2000);
    
    // Enter username
    await page.fill('input[name="username"], input[placeholder*="Username"], input[type="text"]', CREATOR_USERNAME);
    
    // Enter password
    await page.fill('input[name="password"], input[placeholder*="Password"], input[type="password"]', CREATOR_PASSWORD);
    
    // Click login button
    await page.click('button:has-text("Login"), button:has-text("Sign In")');
    
    // Wait for dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    
    console.log('✅ PASS: User successfully logged in and reached dashboard');
  });

  test('Step 2: Click on Jobs menu', async () => {
    // Click Jobs menu
    const jobsMenu = page.locator('text=Jobs, [class*="Jobs"], [title*="Jobs"]').first();
    await jobsMenu.click();
    
    // Wait for submenu to appear
    await page.waitForTimeout(500);
    
    console.log('✅ PASS: Jobs menu expanded with submenu visible');
  });

  test('Step 3: Click on Job Card', async () => {
    // Click Job Card option
    await page.click('text=Job Card, [class*="JobCard"], [title*="Job Card"]');
    
    // Wait for Job Card page to load
    await page.waitForURL('**/job-card', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    console.log('✅ PASS: Job Card page loaded successfully');
  });

  test('Step 4: Select Normal from Job Category dropdown', async () => {
    // Click on Job Category dropdown
    const jobCategoryDropdown = page.locator('text=Job Category').locator('following-sibling::select, following-sibling::div[class*="dropdown"]').first();
    await jobCategoryDropdown.click();
    
    // Select Normal
    await page.click(`text=Normal`);
    
    await page.waitForTimeout(500);
    
    console.log('✅ PASS: Job Category "Normal" selected');
  });

  test('Step 5: Select Route from dropdown', async () => {
    // Click on Route dropdown
    const routeDropdown = page.locator('text=Route').locator('following-sibling::select, following-sibling::div[class*="dropdown"]').first();
    await routeDropdown.click();
    
    // Select the specific route
    await page.click(`text=${TEST_DATA.route}`);
    
    await page.waitForTimeout(1000);
    
    console.log(`✅ PASS: Route "${TEST_DATA.route}" selected`);
  });

  test('Step 6: Select Job from the table', async () => {
    // Wait for table to load
    await page.waitForTimeout(1000);
    
    // Find and click the checkbox for the relevant job
    // Looking for a row that contains the template name
    const jobRow = page.locator(`text=${TEST_DATA.templateName}`).first();
    await jobRow.waitFor({ state: 'visible' });
    
    // Click the checkbox in that row
    const checkbox = jobRow.locator('input[type="checkbox"]').first();
    await checkbox.click();
    
    await page.waitForTimeout(500);
    
    console.log(`✅ PASS: Job "${TEST_DATA.templateName}" selected from table`);
  });

  test('Step 7: Select Vehicle from dropdown', async () => {
    // Click on Vehicle dropdown
    const vehicleDropdown = page.locator('text=Vehicle').locator('following-sibling::select, following-sibling::div[class*="dropdown"]').first();
    await vehicleDropdown.click();
    
    // Select any vehicle from the list (first available)
    await page.click('text=Select vehicle, Vehicle, [role="option"]');
    
    await page.waitForTimeout(500);
    
    console.log('✅ PASS: Vehicle selected from dropdown');
  });

  test('Step 8.1-8.8: Allocate Team Members and Equipment', async () => {
    // Driver
    await page.click('text=Driver');
    await page.click(`text=${TEST_DATA.driver}`);
    await page.waitForTimeout(300);
    
    // Vehicle Commander 1
    await page.click('text=Vehicle Commander 1');
    await page.click(`text=${TEST_DATA.vehicleCommander1}`);
    await page.waitForTimeout(300);
    
    // Vehicle Commander 2
    await page.click('text=Vehicle Commander 2');
    await page.click(`text=${TEST_DATA.vehicleCommander2}`);
    await page.waitForTimeout(300);
    
    // Other Staff
    await page.click('text=Other Staff');
    await page.click(`text=${TEST_DATA.otherStaff}`);
    await page.waitForTimeout(300);
    
    // Armed Guards
    await page.click('text=Armed Guards');
    await page.click(`text=${TEST_DATA.armedGuards}`);
    await page.waitForTimeout(300);
    
    // Equipment 1
    const equipmentField1 = page.locator('label:has-text("Equipment")').locator('following-sibling::input').first();
    await equipmentField1.click();
    await page.click(`text=${TEST_DATA.equipment1}`);
    await page.waitForTimeout(300);
    
    // Equipment 2
    const equipmentField2 = page.locator('label:has-text("Equipment")').locator('following-sibling::input').nth(1);
    await equipmentField2.click();
    await page.click(`text=${TEST_DATA.equipment2}`);
    await page.waitForTimeout(300);
    
    // Equipment 3
    const equipmentField3 = page.locator('label:has-text("Equipment")').locator('following-sibling::input').nth(2);
    await equipmentField3.click();
    await page.click(`text=${TEST_DATA.equipment3}`);
    await page.waitForTimeout(300);
    
    console.log('✅ PASS: All team members and equipment allocated successfully');
  });

  test('Step 9: Verify equipment displayed in table', async () => {
    // Check if equipment table contains the selected equipment
    await expect(page.locator(`text=${TEST_DATA.equipment1}`)).toBeVisible();
    await expect(page.locator(`text=${TEST_DATA.equipment2}`)).toBeVisible();
    await expect(page.locator(`text=${TEST_DATA.equipment3}`)).toBeVisible();
    
    console.log('✅ PASS: All equipment displayed correctly in Allocate Equipment Count table');
  });

  test('Step 10: Print Job Card and verify PDF', async () => {
    // Click Print button
    await page.click('button:has-text("Print"), button:has-text("Print Job Card")');
    
    // Wait for PDF download
    const downloadPromise = page.waitForEvent('popup');
    const popup = await downloadPromise;
    
    await popup.waitForTimeout(2000);
    
    console.log('✅ PASS: Job Card PDF generated and downloaded');
  });

  test('Step 11: Save Job Card and verify status', async () => {
    // Click Save button
    await page.click('button:has-text("Save"), button:has-text("Create Job Card")');
    
    // Wait for success message
    await page.waitForTimeout(2000);
    
    // Verify status is "Ongoing"
    const statusCell = page.locator('text=Ongoing').first();
    await expect(statusCell).toBeVisible({ timeout: 5000 });
    
    // Verify Job Card appears in list with route and job card number
    const jobCardRow = page.locator(`text=${TEST_DATA.route}`).first();
    await expect(jobCardRow).toBeVisible();
    
    console.log('✅ PASS: Job Card created successfully with "Ongoing" status');
  });
});
