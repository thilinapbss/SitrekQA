# Test Case: Agreement Master - Sync Functionality

## Test Information
- **Test Suite**: Agreement Master - Sync Functionality
- **Execution Date**: 2026-02-04
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case: TC_AGREEMENT_MASTER_001

### Test Details
- **Test ID**: TC_AGREEMENT_MASTER_001
- **Title**: Agreement Master - Navigation, Sync, and Data Validation
- **Objective**: Validate Agreement Master module navigation, Sync All functionality, timestamp accuracy, and agreement record updates
- **Priority**: High
- **Type**: Functional Test - Comprehensive Workflow

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- Agreement Master module is accessible
- System timezone set to Asia/Colombo (Sri Lankan Time, UTC+5:30)

### Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in to SITREK |
| 2 | Click on Masters menu in navigation | Masters menu expanded with submenu options |
| 3 | Click on Agreement menu item | Agreement Master page loads with grid component |
| 4 | Verify Agreement Master grid is visible with data | Grid displays agreement records |
| 5 | Verify "Last Synced Date" column exists in grid | Column header visible in grid layout |
| 6 | Record current REAL system time from device clock | Current time captured in Sri Lankan timezone |
| 7 | Get initial count of agreement records in grid | Initial record count noted (baseline) |
| 8 | Click Sync All button | Sync operation initiated, UI shows processing state |
| 9 | Wait for sync to complete | Grid updated, processing state cleared |
| 10 | Extract web app generated timestamp from Last Synced Date column | Timestamp captured from first grid row |
| 11 | Compare web app timestamp with REAL system time | **PASS IF MATCH (within 1 min tolerance), FAIL IF DIFFERENT** |
| 12 | Verify timestamp format is YYYY-MM-DD HH:MM:SS | Web app timestamp in correct format |
| 13 | Verify timestamp shows current date | Web app timestamp displays today's date |
| 14 | Verify no invalid date entries exist | No "Invalid Date" or null values in column |
| 15 | Get final count of agreement records in grid | Final record count noted (verify sync completed) |
| 16 | Verify grid data is consistent and complete | All required fields populated for each record |

