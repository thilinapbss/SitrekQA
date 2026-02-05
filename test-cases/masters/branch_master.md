# Branch Master - Test Cases

## Test Suite Information
- **Module**: Masters → Branch Master
- **Feature**: Branch synchronization functionality
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 4, 2026

---

## TC_BRANCH_MASTER_001: Verify Branch Master Navigation, Sync All, and Display Local Time

### Test Objective
Verify that user can navigate to Branch Master through Masters menu, access Branch menu item, click Sync All button, and verify that the Last Synced Date column displays the current Sri Lankan local time after synchronization.

### Pre-conditions
- User must have valid login credentials (operation role)
- Application is accessible
- User is on the login page

### Test Priority
**High**

### Test Data
- **Username**: chathura
- **Password**: Admin@1234
- **Role**: operation

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials | User successfully logs in and reaches the dashboard |
| 2 | Click on "Masters" menu in side navigation (second Masters text) | Masters menu expands and shows sub-menu items |
| 3 | Verify "Branch" menu item is visible | Branch menu item is visible in the expanded menu |
| 4 | Click on "Branch" menu item | Branch Master page loads successfully |
| 5 | Verify Branch Master page displays with grid | Data grid is visible with columns: "Name" and "Last Synced Date" |
| 6 | Verify "Sync All" button is visible | Sync All button is displayed on the page |
| 7 | Capture current Sri Lankan local time | Real-time is captured (format: YYYY-MM-DD HH:MM:SS) |
| 8 | Click "Sync All" button | Sync operation initiates |
| 9 | Wait for sync to complete (5 seconds) | Loading indicator appears and disappears |
| 10 | Verify "Last Synced Date" column header is visible | Column header "Last Synced Date" is displayed |
| 11 | Verify timestamps are displayed in correct format | Timestamps match pattern: YYYY-MM-DD HH:MM:SS |
| 12 | Verify timestamps show current Sri Lankan date and time | All timestamps display the current date (YYYY-MM-DD) captured in Step 7 |
| 13 | Verify branch count in grid | At least 10 branches are displayed in the grid |

### Expected Results
- User can successfully navigate to Branch Master
- Branch menu is accessible from Masters navigation
- Grid displays branch data with "Name" and "Last Synced Date" columns
- Sync All button is functional
- After clicking Sync All, Last Synced Date should update to current Sri Lankan local time
- Timestamps should display in format: YYYY-MM-DD HH:MM:SS

### Actual Results
✅ **PASSED**: Steps 1-11
❌ **FAILED**: Step 12 - Timestamps NOT updated to current date

**Bug Details:**
- **Real-time captured**: 2026-02-04 10:44:44 (Sri Lankan time)
- **Expected in grid**: 2026-02-04 XX:XX:XX
- **Actual in grid**: 2026-02-03 20:23:18
- **Issue**: Timestamps are showing previous day's date, not current Sri Lankan local time

### Test Status
**❌ FAILED** - Bug found in Step 12

### Bug Report
**Bug ID**: BUG_BRANCH_MASTER_001  
**Severity**: High  
**Title**: Sync All button does not update Last Synced Date to current Sri Lankan local time  
**Description**: When clicking the "Sync All" button in Branch Master, the "Last Synced Date" column does not update to reflect the current Sri Lankan local time. The timestamps remain at the previous sync time (2026-02-03 20:23:18) instead of updating to the current date and time (2026-02-04 10:44:44).

---





## TC_BRANCH_MASTER_002: Verify Sync Status After Clicking Sync All

### Test Objective
Verify that after clicking Sync All button, the branch data persists and the grid maintains the same or greater number of branches.

### Pre-conditions
- User is logged in
- User is on Branch Master page

### Test Priority
**Medium**

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system | User successfully logs in |
| 2 | Navigate to Masters → Branch | Branch Master page loads |
| 3 | Wait for grid to load | Grid displays with branch data |
| 4 | Record initial branch count | Initial count is captured (e.g., 10 branches) |
| 5 | Click "Sync All" button | Sync operation initiates |
| 6 | Wait for sync to complete | Sync completes within 5 seconds |
| 7 | Count branches in grid after sync | Final count is captured |
| 8 | Compare initial and final counts | Final count ≥ Initial count |
| 9 | Verify sync success message/indication | Success indication is displayed or data persists |

### Expected Results
- Grid maintains data after sync
- Branch count remains the same or increases
- No data loss during sync operation
- Sync operation completes successfully

### Actual Results
✅ **PASSED**: All steps passed
- Initial branch count: 10
- Final branch count: 10
- Branches synced successfully
- No data loss occurred

### Test Status
**✅ PASSED**

---

## Test Execution Summary

| Test Case ID | Test Case Name | Status | Bugs Found |
|--------------|---------------|--------|------------|
| TC_BRANCH_MASTER_001 | Verify Branch Master Navigation, Sync All, and Display Local Time | ❌ FAILED | BUG_BRANCH_MASTER_001 |
| TC_BRANCH_MASTER_002 | Verify Sync Status After Clicking Sync All | ✅ PASSED | None |

### Overall Summary
- **Total Test Cases**: 2
- **Passed**: 1
- **Failed**: 1
- **Bugs Found**: 1 (High Severity)

---

## Notes
- Test execution performed on: February 4, 2026
- Browser: Chromium (Playwright)
- Test execution mode: Headed
- All tests executed with visual verification
- Screenshots and videos captured for failed test cases

---

## Recommendations
1. **Critical Fix Required**: The Sync All functionality must update Last Synced Date to current Sri Lankan local time
2. Verify timezone configuration in backend/database
3. Check if API returns correct timestamps with Sri Lankan timezone (UTC+5:30)
4. Re-test after fix to confirm timestamps update correctly
5. Add automated timestamp validation in future regression tests
