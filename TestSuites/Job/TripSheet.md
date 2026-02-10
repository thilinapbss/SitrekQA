# Trip Sheet - Test Cases

## Test Suite Information
- **Module**: Trip Sheet
- **Feature**: Trip sheet navigation, trip card management, and pending trips grid display
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 10, 2026

---

## TC_TRIPSHEET_001: Trip Sheet Navigation and Pending Trips Display

### Test Objective
Verify that Trip Sheet users can successfully login to the system, navigate to the Trip Sheet module, and view pending trip cards in the grid with proper job card information displayed.

### Pre-conditions
- Trip Sheet user must have valid login credentials
- Application is accessible
- User is on the login page
- Trip cards must exist in "Pending" status in the system
- User must have Trip Sheet permission to access the module
- Navigation menu must be accessible

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
- **User Credentials:** Trip Sheet user credentials (see **credentials.tripSheetUser** in testdata.json)
- **Job Card Number:** Expected trip card reference (see **TC_TRIPSHEET_001.tripCardData.jobCardNumber** in testdata.json)
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

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login with Trip Sheet user credentials (**credentials.tripSheetUser.username** / **credentials.tripSheetUser.password**) | User successfully logs in and dashboard displays |
| 2 | Navigate to Trip Sheet: Click "Jobs" menu → expand → select "Trip Sheet" (Note: "Trip Sheet" is located under Jobs menu, not a separate Trip menu) | Trip Sheet page loads with pending trips grid displayed |
| 3 | Verify Pending Trips Grid displays with columns (Actual: Job Card Number, Route Name, Created Date, Job Stage). Verify that **TC_TRIPSHEET_001.tripCardData.jobCardNumber** is present in the grid | Grid displays trip cards including the expected job card number populated |
| 4 | Verify trip card data accuracy (Job Card Number, Route, Date, Job Stage values) | All displayed information matches system data with correct status

### Expected Results Summary
- Trip Sheet user successfully logs into the system ✓
- Trip Sheet module is accessible from the navigation menu (under Jobs → Trip Sheet) ✓
- Pending Trips grid displays with expected columns: Job Card Number, Trip Card Number, Route Name, Created Date, Status, Trip Status ✗ **FAILED** - Only 4 columns displayed: Job Card Number, Route Name, Created Date, Job Stage
- Pending trip cards are populated in the grid ✓
- All trip card information is accurate and matches system data ✓
- **TEST STATUS**: ❌ **FAILED** - Grid column structure does not match expected specification

### Failure Summary
The Trip Sheet test FAILED because the grid columns do not match the expected specification. The system displays only 4 columns (Job Card Number, Route Name, Created Date, Job Stage) instead of the expected 6 columns (Job Card Number, Trip Card Number, Route Name, Created Date, Status, Trip Status). The missing columns are:
1. Trip Card Number
2. Status
3. Trip Status

While the core functionality of navigating to the Trip Sheet and displaying trip data works correctly, the grid structure differs from the expected design, resulting in a test failure.

### Test Artifacts
- Screenshot of Trip Sheet page with pending trips grid
- Trip card grid data verification screenshot
- Test execution log with navigation and interaction details
- Test data values confirmation (from testdata.json)