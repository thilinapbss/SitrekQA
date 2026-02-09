# Vehicle Master Test Cases

## Test Information
- **Test Suite**: Vehicle Master - Create & Sync Functionality
- **Test File**: `tests/vehicle-master.spec.ts`
- **Page Object**: `pages/VehicleMasterPage.ts`
- **Execution Date**: 2026-02-09
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case 1: TC_VEHICLE_MASTER_001

### Test Details
- **Test ID**: TC_VEHICLE_MASTER_001
- **Title**: Verify Vehicle Master navigation and Create Ad-hoc Hiring Vehicle
- **Objective**: Validate that Vehicle Master module can create a new Ad-hoc Hiring Vehicle with all required fields
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- Vehicle Master module is accessible

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in |
| 2 | Click on Masters menu (second Masters text) | Masters menu expanded |
| 3 | Click on Vehicle menu item | Vehicle Master page loaded with create form and grid |
| 4 | Fill in Vehicle Number field with data from testdata.json (vehicleNumber) | Vehicle Number field populated from testdata.TC_VEHICLE_MASTER_001.vehicleData.vehicleNumber |
| 5 | Fill in Model field with data from testdata.json (model) | Model field populated from testdata.TC_VEHICLE_MASTER_001.vehicleData.model |
| 6 | Fill in other required fields with data from testdata.json (Year, Color, License Plate, Engine Number, Chassis Number, etc.) | All form fields populated from testdata.TC_VEHICLE_MASTER_001.vehicleData |
| 7 | Click Save button | Vehicle successfully created |
| 8 | Verify new vehicle appears in grid | New vehicle record visible in Vehicle Master list with matching data from testdata.json |

**Note**: All test data is fetched from `test-data/testdata.json` under `testCases.TC_VEHICLE_MASTER_001.vehicleData`

### Test Execution Results
- **Status**: ✅ **PASSED**
- **Execution Time**: 14.3 seconds
- **Date Executed**: 2026-02-09

---

## Test Case 2: TC_VEHICLE_MASTER_002

### Test Details
- **Test ID**: TC_VEHICLE_MASTER_002
- **Title**: Verify Vehicle Master Sync All functionality and current system time display
- **Objective**: Validate that Sync All button syncs vehicles and displays current system time in Last Synced Date column
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User has accessed Vehicle Master page
- Sync All button is visible on page
- Vehicle records are displayed in grid

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | From Vehicle Master page, locate Sync All button | Sync All button as defined in testdata.json (syncData.buttonName) is visible and clickable |
| 2 | Click on Sync All button | Sync operation initiated, loading indicator appears |
| 3 | Wait for sync to complete | Sync completes successfully |
| 4 | Verify grid refreshes after sync | Grid refreshed with latest data |
| 5 | Verify current system time in Last Synced Date column | Current system time visible in Last Synced Date column (testdata.TC_VEHICLE_MASTER_002.syncData.columnToVerify). Timezone: testdata.syncData.timezone |

**Note**: Test data including sync button name, expected message, and column name are fetched from `test-data/testdata.json` under `testCases.TC_VEHICLE_MASTER_002.syncData`. The execution time is dynamic and will vary based on test execution time.

### Test Execution Results
- **Status**: ✅ **PASSED**
- **Execution Time**: 24.3 seconds
- **Date Executed**: 2026-02-09

---

## Test Environment
- **Application**: SITREK
- **Browser**: Chromium (Headed Mode)
- **Timezone**: Asia/Colombo (Sri Lankan Time, UTC+5:30)

---

## Test Data

**Test data for these test cases is maintained in**: `test-data/testdata.json`

**Data Location in testdata.json**:
- **TC_VEHICLE_MASTER_001 Data**: `testCases.TC_VEHICLE_MASTER_001.vehicleData`
- **TC_VEHICLE_MASTER_002 Data**: `testCases.TC_VEHICLE_MASTER_002.syncData`

**Login Credentials**: `credentials.creator` (chathura/Admin@1234)

All test data including vehicle numbers, models, specifications, and expected sync times are dynamically generated and maintained in the centralized testdata.json file.
