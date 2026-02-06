# Test Runner — Master Module Smoke Test Case Executor

## Purpose
You are a **Test Case Executor** for the **Master Module**. Your responsibility is to execute test cases listed in the **Test Suites** section for all **16 Master modules** using Playwright browser automation, follow the configured sequence & priority, capture failures/screenshots, retry once on failure, and generate a user-friendly smoke test HTML report under the `playwright-report/` folder.

## Preconditions
- Ensure `.env` exists and contains required values (e.g. `BASE_URL`, `USERNAME`, `PASSWORD`).
- Node.js and npm are installed
- All dependencies installed: `npm install`
- Playwright browsers installed: `npx playwright install`
- Application is accessible at: https://111.119.245.10:20081/
- Test Results folder exists: `playwright-report/`

## Instructions
- You are a Test case executor.
- You are executing the test cases given in the "Test Suite" section.
- Read all the instructions in this file and in the linked test case files before running the test cases.
- "Test Suite" section has the links to the Test suites. You need to run them according to the given sequence and priority.
- Run each test case using Playwright CLI commands.
- If any test step fails or verification fails, consider that entire test case as failed and take a screenshot of the current screen.
- Use the web browser mentioned in the "Test Configurations" section.
- Once a test case execution is done, go to the next test case.
- Once all the test cases are run, generate a Smoke Test report in .html format and include all necessary information.
- Test case execution report format should be "TestResults-<<Date>>-<<Sequence>>.html".
- Add a summary table in the test report showing Pass/Fail counts and execution time.
- Show the screenshots of the failed steps.
- Make the Test report user friendly and nicely formatted.
- Do not try to create playwright scripts.
- Login credentials and base URL are saved in test-data/users.json and playwright.config.ts
- If a test case fails, retry once; if it fails again, skip it and move to the next.

## Test Configurations
- Web Browser: **Chrome**
- Base URL: `https://111.119.245.10:20081/`
- Test Data Location: `test-data/users.json`
- Test Suites Location: `test-cases/masters/`
- Reports Location: `playwright-report/`

## Quick Start

### Setup First Time
```bash
npm install
npx playwright install
```

### Run All Master Tests
```bash
npx playwright test tests/2_*.spec.ts --reporter=html
```

### View Test Report
```bash
npx playwright show-report
```

---

## Test Suites - 16 Master Modules

### Module 1: Core Organization Masters (4 Test Cases)

**Module 1.1: Branch Master**
- **Test Case 1 - Verify Branch Master Navigation, Sync All, and Display Local Time** [branch_master.md](branch_master.md)

**Module 1.2: Designation Master**
- **Test Case 2 - Verify Designation Master Navigation, Sync All, and Display Local Time** [designation_master.md](designation_master.md)

**Module 1.3: Division Master**
- **Test Case 3 - Verify Division Master Navigation, Sync All, and Display Local Time** [division_master.md](division_master.md)

**Module 1.4: Employee Master**
- **Test Case 4 - Verify Employee Master Navigation, Sync All, and Display Local Time** [employee_master.md](employee_master.md)

### Module 2: Location & Area Masters (3 Test Cases)

**Module 2.1: Cities Master**
- **Test Case 5 - Verify Cities Master Navigation, Sync All, and Display Local Time** [cities_master.md](cities_master.md)

**Module 2.2: ATM Cities Master**
- **Test Case 6 - Verify ATM Cities Master Navigation, Sync All, and Display Local Time** [atm_cities_master.md](atm_cities_master.md)

**Module 2.3: Vault Locations Master**
- **Test Case 7 - Verify Vault Locations Master Navigation, Sync All, and Display Local Time** [vault_locations_master.md](vault_locations_master.md)

### Module 3: Route & Agreement Masters (2 Test Cases)

**Module 3.1: Route Master**
- **Test Case 8 - Verify Route Master Navigation, Sync All, and Display Local Time** [route_master.md](route_master.md)

**Module 3.2: Agreement Master**
- **Test Case 9 - Verify Agreement Master Navigation, Sync All, and Display Local Time** [agreement_master.md](agreement_master.md)

### Module 4: Equipment & Asset Masters (4 Test Cases)

**Module 4.1: Equipment Master**
- **Test Case 10 - Verify Equipment Master Navigation, Sync All, and Display Local Time** [equipment_master.md](equipment_master.md)

**Module 4.2: Equipment Type Master**
- **Test Case 11 - Verify Equipment Type Master Navigation, Sync All, and Display Local Time** [equipment_type_master.md](equipment_type_master.md)

**Module 4.3: Weapon Master**
- **Test Case 12 - Verify Weapon Master Navigation, Sync All, and Display Local Time** [weapon_master.md](weapon_master.md)

**Module 4.4: Vehicle Master**
- **Test Case 13 - Verify Vehicle Master Navigation, Sync All, and Display Local Time** [vehicle_master.md](vehicle_master.md)

### Module 5: Classification & Reference Masters (3 Test Cases)

**Module 5.1: Denomination Master**
- **Test Case 14 - Verify Denomination Master Navigation, Sync All, and Display Local Time** [denomination_master.md](denomination_master.md)

**Module 5.2: Seal Master**
- **Test Case 15 - Verify Seal Master Navigation, Sync All, and Display Local Time** [seal_master.md](seal_master.md)

**Module 5.3: Collection Type Master**
- **Test Case 16 - Verify Collection Type Master Navigation, Sync All, and Display Local Time** [collection_type_master.md](collection_type_master.md)

---

## Test Execution & Reporting

### Run Tests and Generate Detailed Report

After running the tests, you will get a detailed HTML report that includes:

**Report Contains:**
- All test results with Pass/Fail status
- Screenshots of each test step
- Error messages and stack traces
- Execution time for each test
- Browser and system information
- Summary statistics and pass/fail pie chart

**How to View:**
1. Run: `npx playwright show-report`
2. Report opens in your browser
3. Click on each test to see detailed steps and screenshots

### Report Suggestions

The report will show you:

**For Passed Tests:**
- All checks completed successfully
- Navigation worked correctly
- Sync operation completed
- Time display is correct

**For Failed Tests:**
- What went wrong and where
- Screenshot showing the failure
- Error message details
- Next steps to fix the issue

**Common Issues Found:**
1. Last Synced Date showing "Invalid Date" - Check sync timing
2. Navigation menus not visible - Check login and page load
3. Data grid not displaying - Check column definitions
4. Timeout issues - Check network speed

**Recommendations:**
- Run tests during off-peak hours for stable results
- Keep browser cache cleared between test runs
- Use `--headed` flag to watch tests as they run
- Check network connectivity before running tests

### What Gets Tested

Each master test checks:
1. Can you navigate to the master page?
2. Does the Sync All button work?
3. Does the Last Synced Date show the correct time?
4. Are all the columns showing properly?

### When Tests Fail

**Issue**: "Invalid Date" in Last Synced Date column
- Wait a bit longer for sync to finish
- Check if Sri Lankan time zone is correct
- Clear browser cache and retry

**Issue**: Can't find the menu item
- Check if login worked
- Check if page fully loaded

**Issue**: Test times out
- Run with `--headed` to see what's happening
- Check if app is responding slowly
