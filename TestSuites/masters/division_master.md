# Division Master Test Case

## Test Information
- **Test Suite**: Division Master - Sync Functionality
- **File**: test-cases/masters/division_master.md
- **Page Object**: Masters → Division Master
- **Execution Date**: February 9, 2026
- **Environment**: QA
- **Browser**: Chrome

## Test Case 1: TC_DIVISION_MASTER_001

**Test Case ID**: TC_DIVISION_MASTER_001  
**Test Case Title**: Verify Division Master navigation and Sync All functionality  
**Objective**: Verify that user can navigate to Division Master page and sync all data with timestamp verification  
**Priority**: High  
**Type**: Functional Test

### Preconditions:
1. User has valid login credentials (from testdata.json)
2. User has access to Masters menu
3. Application is accessible at https://111.119.245.10:20081/

### Test Steps:

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Launch application and login with credentials from testdata.credentials.creator | User is logged in successfully |
| 2 | Click on "Masters" menu option | Masters submenu is displayed |
| 3 | Click on "Division" option | Division Master page loads with grid of all divisions |
| 4 | Verify that "Sync All" button is visible and click it | Sync operation completes and message from testdata.TC_DIVISION_MASTER_001.syncData.expectedMessage is displayed |
| 5 | Verify current system time is visible in testdata.TC_DIVISION_MASTER_001.syncData.columnToVerify column | Last Synced Date column displays current timestamp |

**Note**: The execution time should be replaced with actual system time. This is dynamic and will vary based on test execution time.

### Test Execution Results:
- **Status**: PASSED
- **Execution Time**: 14.3 seconds
- **Execution Date**: February 9, 2026

## Test Environment:
- **Application**: SITREK QA
- **Browser**: Chrome (Chromium)
- **Timezone**: Asia/Colombo (UTC+5:30)

## Test Data:
All test data is stored in 	est-data/testdata.json under:
- Credentials: 	estdata.credentials.creator
- Test Case Data: 	estdata.TC_DIVISION_MASTER_001.syncData
  - buttonName
  - expectedMessage
  - expectedSystemTime
  - columnToVerify
  - timezone
