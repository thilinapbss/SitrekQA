# Designation Master - Test Cases

## Test Suite Information
- **Module**: Masters → Designation Master
- **Feature**: Designation synchronization functionality
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 4, 2026

---

## TC_DESIGNATION_MASTER_001: Verify Designation Master Navigation, Sync All, and Display Local Time

### Test Objective
Verify that user can navigate to Designation Master through Masters menu, access Designation menu item, click Sync All button, and verify that the Last Synced Date column displays the current Sri Lankan local time after synchronization.

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
| 3 | Verify "Designation" menu item is visible | Designation menu item is visible in the expanded menu |
| 4 | Click on "Designation" menu item | Designation Master page loads successfully |
| 5 | Verify Designation Master page displays with grid | Data grid is visible with columns: "Odoo ID", "Designation", and "Last Synced Date" |
| 6 | Verify "Sync All" button is visible | Sync All button is displayed on the page |
| 7 | Capture current Sri Lankan local time | Real-time is captured (format: YYYY-MM-DD HH:MM:SS) |
| 8 | Click "Sync All" button | Sync operation initiates |
| 9 | Wait for sync to complete (5 seconds) | Loading indicator appears and disappears |
| 10 | Verify "Last Synced Date" column header is visible | Column header "Last Synced Date" is displayed |
| 11 | Verify timestamps are displayed in correct format | Timestamps match pattern: YYYY-MM-DD HH:MM:SS (NOT "Invalid Date") |
| 12 | Verify timestamps show current Sri Lankan date and time | All timestamps display the current date (YYYY-MM-DD) captured in Step 7 |
| 13 | Verify designation count in grid | At least 10 designations are displayed in the grid |

### Expected Results
- User can successfully navigate to Designation Master
- Designation menu is accessible from Masters navigation
- Grid displays designation data with "Odoo ID", "Designation" and "Last Synced Date" columns
- Sync All button is functional
- After clicking Sync All, Last Synced Date should update to current Sri Lankan local time
- Timestamps should display in format: YYYY-MM-DD HH:MM:SS (NOT "Invalid Date")

### Actual Results
✅ **PASSED**: Steps 1-10
❌ **FAILED**: Step 11 & 12 - Invalid Date entries found

**Bug Details:**
- **Real-time captured**: 2026-02-04 11:09:30 (Sri Lankan time)
- **Expected in grid**: 2026-02-04 XX:XX:XX
- **Actual in grid**: "Invalid Date" (for all entries)
- **Issue**: Last Synced Date column shows "Invalid Date" instead of proper timestamps

### Test Status
**❌ FAILED** - Critical bug found in Step 11

### Bug Report
**Bug ID**: BUG_DESIGNATION_MASTER_001  
**Severity**: Critical  
**Title**: Last Synced Date shows "Invalid Date" instead of proper timestamps  
**Description**: When navigating to Designation Master and clicking "Sync All" button, the "Last Synced Date" column displays "Invalid Date" for all entries instead of showing proper timestamps in format YYYY-MM-DD HH:MM:SS. This indicates that either:
1. The sync data is not being stored correctly in the database
2. The date format returned from API is incompatible
3. The frontend is unable to parse the date format from backend

**Evidence:**
- Column headers found: ['Odoo ID', 'Designation', 'Last Synced Date']
- Grid content shows: "Invalid Date" for all Last Synced Date entries
- No valid timestamps (0 timestamps found matching pattern YYYY-MM-DD HH:MM:SS)
- Sample data: "7Arm GuardInvalid Date", "8CIT OfficerInvalid Date"

---

## TC_DESIGNATION_MASTER_002: Verify Sync Status After Clicking Sync All

### Test Objective
Verify that after clicking Sync All button, the designation data persists and the grid maintains the same or greater number of designations.

### Pre-conditions
- User is logged in
- User is on Designation Master page

### Test Priority
**Medium**

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system | User successfully logs in |
| 2 | Navigate to Masters → Designation | Designation Master page loads |
| 3 | Wait for grid to load | Grid displays with designation data |
| 4 | Record initial designation count | Initial count is captured (e.g., 10 designations) |
| 5 | Click "Sync All" button | Sync operation initiates |
| 6 | Wait for sync to complete | Sync completes within 5 seconds |
| 7 | Count designations in grid after sync | Final count is captured |
| 8 | Compare initial and final counts | Final count ≥ Initial count |
| 9 | Verify sync success message/indication | Success indication is displayed or data persists |

### Expected Results
- Grid maintains data after sync
- Designation count remains the same or increases
- No data loss during sync operation
- Sync operation completes successfully

### Actual Results
✅ **PASSED**: All steps passed
- Initial designation count: 10
- Final designation count: 10
- Designations synced successfully
- No data loss occurred
- **Note**: Although data persists, Last Synced Date shows "Invalid Date" (see BUG_DESIGNATION_MASTER_001)

### Test Status
**✅ PASSED** (with caveat about Invalid Date issue)

---

## Test Execution Summary

| Test Case ID | Test Case Name | Status | Bugs Found |
|--------------|---------------|--------|------------|
| TC_DESIGNATION_MASTER_001 | Verify Designation Master Navigation, Sync All, and Display Local Time | ❌ FAILED | BUG_DESIGNATION_MASTER_001 |
| TC_DESIGNATION_MASTER_002 | Verify Sync Status After Clicking Sync All | ✅ PASSED | Note: Invalid Date issue exists |

### Overall Summary
- **Total Test Cases**: 2
- **Passed**: 1 (50%)
- **Failed**: 1 (50%)
- **Bugs Found**: 1 (Critical Severity)

---

## Notes
- Test execution performed on: February 4, 2026
- Browser: Chromium (Playwright)
- Test execution mode: Headed
- All tests executed with visual verification
- Real-time captured using Sri Lankan timezone (Asia/Colombo, UTC+5:30)
- Screenshots and videos captured for failed test cases
- **Critical Finding**: Designation Master has a different bug than Branch/Division Masters
  - Branch Master: Shows old timestamps (2026-02-03)
  - Division Master: Shows current timestamps (Working correctly)
  - **Designation Master: Shows "Invalid Date" (Data corruption/format issue)**

---

## Recommendations
1. **CRITICAL FIX REQUIRED**: Investigate why Last Synced Date shows "Invalid Date"
2. Check database schema for Designation Master sync_date field
3. Verify API response format for Designation Master sync endpoint
4. Check if date parsing logic differs for Designation Master
5. Ensure consistent date format across all Master modules
6. Test date conversion on frontend for Designation Master
7. Check if sync operation is actually updating the database
8. Compare working Division Master implementation with Designation Master
9. Add backend validation for date formats before returning to frontend
10. Re-test after fix to confirm proper timestamp display

---

## Comparison with Other Masters

| Module | Last Synced Date Status | Issue Type |
|--------|------------------------|------------|
| Branch Master | 2026-02-03 20:23:18 | Old timestamp (not current) |
| Division Master | 2026-02-04 11:01:09 | ✅ Working correctly |
| Designation Master | Invalid Date | ❌ Data corruption/format issue |

This indicates **three different states** across master modules, suggesting inconsistent implementation or data issues.
