# Route Master Test Case

## Test Information
- **Test Suite**: Route Master - Sync Functionality
- **Test File**: `tests/route-master.spec.ts`
- **Page Object**: `pages/RouteMasterPage.ts`
- **Execution Date**: 2026-02-09
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case 1: TC_ROUTE_MASTER_001

### Test Details
- **Test ID**: TC_ROUTE_MASTER_001
- **Title**: Verify Route Master navigation and Sync All functionality
- **Objective**: Validate that Route Master module loads correctly and displays current system time in Last Synced Date column after clicking Sync All button
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- Route Master module is accessible

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in |
| 2 | Click on Masters menu (second Masters text) | Masters menu expanded |
| 3 | Click on Route menu item | Route Master page loaded with grid |
| 4 | Verify grid contains route data | Route Master grid is visible with route records |
| 5 | Verify current system time exists in grid | Current system time visible in Last Synced Date column (testdata.TC_ROUTE_MASTER_001.syncData.columnToVerify). Timezone: testdata.syncData.timezone |

**Note**: Test data including sync button name, expected message, and column name are fetched from `test-data/testdata.json` under `testCases.TC_ROUTE_MASTER_001.syncData`. The execution time is dynamic and will vary based on test execution time.

### Test Execution Results
- **Status**: ✅ **PASSED**
- **Execution Time**: 14.3 seconds
- **Date Executed**: 2026-02-09

---

## Test Environment
- **Application**: SITREK
- **Browser**: Chromium (Headed Mode)
- **Timezone**: Asia/Colombo (Sri Lankan Time, UTC+5:30)

---

## Test Data

**Test data for this test case is maintained in**: `test-data/testdata.json`

**Data Location in testdata.json**:
- **TC_ROUTE_MASTER_001 Data**: `testCases.TC_ROUTE_MASTER_001.syncData`

**Login Credentials**: `credentials.creator` (chathura/Admin@1234)

All test data including sync button name, expected timestamp format, and column verification are dynamically generated and maintained in the centralized testdata.json file.
