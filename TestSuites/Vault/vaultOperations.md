# Vault Operations - Test Cases

## Test Suite Information
- **Module**: Vault → Vault Operations
- **Feature**: Vault operations management and pass loading verification for job cards
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 10, 2026

---

## TC_VAULT_OPS_001: Vault Operations Pass Loading Workflow

### Test Objective
Verify that users can access the Vault Operations page, select a job card, navigate to the Assign Vault page, and successfully complete the pass loading process with proper notifications.

### Pre-conditions
- User must have valid login credentials
- Application is accessible
- User is on the login page
- Job Card must exist with "Pending" status and "Not Started" trip status
- User must have Vault Operations permission to access the module
- Pass loading functionality must be available in the system

### Test Priority
**High**

### Test Data

**📁 Test Data Location:** `test-data/testdata.json` (Unified Test Data File)

⚠️ **IMPORTANT: Test Data Management**
All test data has been consolidated into a single file at `test-data/testdata.json`. This unified approach:
- Eliminates duplicate test data across test cases
- Provides centralized credential management
- Simplifies test data maintenance and updates
- When updating test data, update ONLY in `test-data/testdata.json`
- All references throughout the test documentation will automatically use the updated values

#### Test Data Summary
The complete test data for this test case includes:
- **User Credentials:** Username and password for test execution (see **credentials.creator** in testdata.json)
- **Job Card Data:** Job card selection criteria and filtering (see **TC_VAULT_OPS_001.jobCardSelection** in testdata.json)
- **Expected Results:** List of validation points for test completion
- **Pre-conditions:** All requirements that must be met before test execution

⚠️ **REMINDER: When modifying test data**
Update only the `test-data/testdata.json` file. Do NOT manually update values in this markdown document. The test steps reference the JSON file as the authoritative source.

✅ **DATA AVAILABILITY & SUBSTITUTION**
If any test data value is NOT available in the system:
- Use a similar or alternative value that exists in the system
- Document the substitution in the test report under "Data Substitutions"
- Update the `test-data/testdata.json` file with the available value
- Test execution should proceed with the substitute value
- This is **NOT** considered a test failure, but a data adaptation
- The core functionality being tested remains valid regardless of the specific data used

**🔄 DROPDOWN FIELDS - Empty/Missing Data Handling:**
For dropdown fields (Job Card selection, etc.):
- If test data is empty or not provided in testdata.json
- Or if the provided test data is not found in the system dropdown
- **Select the 1st item from the dropdown list**
- **Update the testdata.json file with the actual selected value**
- This ensures data consistency and facilitates future test runs
- All dropdown selections are captured and documented in the test data file

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials (**credentials.creator.username** / **credentials.creator.password**) and click Enter | User successfully logs in and reaches the dashboard |
| 2 | Using side navigation bar, click on "Vault" menu | "Vault" menu expands and shows submenu items |
| 3 | Click on "Vault Operations" from the expanded menu | Vault Operations page loads successfully and displays job card list |
| 4 | Verify the Job Cards Grid Display | Verify that in the Vault Operations page, the list of job cards are displayed with the following columns: #Job Card Number, #Route Name, #Created Date, #Status, #Trip Status |
| 5 | Verify Job Card Status Criteria | In the grid, verify that job cards are displayed with Status = "Pending" and Trip Status = "Not Started" | Job cards matching the criteria are visible in the grid |
| 6 | Select Job Card from Grid | Click on a job card row with Status = "Pending" and Trip Status = "Not Started" | Job Card row is selected; user is directed to the Assign Vault Operations page |
| 7 | Verify Page Navigation | Verify that the user is on the Assign Vault Operations page with expected controls and sections | Assign Vault Operations page is fully loaded with all operational controls visible |
| 8 | Click Pass Loading Button | Click the "Pass Loading" button on the Assign Vault Operations page | Pass loading process is initiated and processed by the system |
| 9 | Verify Pass Loading Success | Verify that the pass loading completes successfully without errors | System displays success confirmation and processes the operation |
| 10 | Verify Success Notification | Verify that a success toast notification appears indicating pass loading was completed | Toast notification displays success message confirming pass loading completion and disappears after timeout |

### Expected Results Summary
- User successfully navigates to Vault Operations module
- Job card grid displays correctly with appropriate filter criteria (Status = "Pending", Trip Status = "Not Started")
- Job card selection redirects to Assign Vault Operations page
- Pass Loading button is accessible and functional
- Pass loading operation completes successfully
- Success notification is displayed confirming operation completion
- No errors or exceptions are raised during the process

### Test Artifacts
- Screenshots of Vault Operations page and job card grid
- Screenshots of Assign Vault Operations page
- Success notification screenshot
- Toast notification confirmation of pass loading completion
- Test execution log capturing navigation and user interactions
- Test data values used (from testdata.json)