# Route Master - Test Cases

## Test Suite Information
- **Module**: Masters → Route Master
- **Feature**: Route synchronization functionality
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 4, 2026

---

## TC_ROUTE_MASTER_001: Verify Route Master Navigation, Sync All, and Display Local Time

### Test Objective
Verify that user can navigate to Route Master through Masters menu, access Route menu item, click Sync All button, and verify that the Last Synced Date column displays the current Sri Lankan local time after synchronization.

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
| 3 | Verify "Route" menu item is visible | Route menu item is visible in the expanded menu |
| 4 | Click on "Route" menu item | Route Master page loads successfully |
| 5 | Verify Route Master page displays with grid | Data grid is visible with route data |
| 6 | Verify "Sync All" button is visible | Sync All button is displayed on the page |
| 7 | Capture current Sri Lankan local time | Real-time is captured (format: YYYY-MM-DD HH:MM:SS) |
| 8 | Click "Sync All" button | Sync operation initiates |
| 9 | Wait for sync to complete (5 seconds) | Loading indicator appears and disappears |
| 10 | Verify "Last Synced Date" column header is visible | Column header "Last Synced Date" should be displayed |
| 11 | Verify timestamps are displayed in correct format | Timestamps match pattern: YYYY-MM-DD HH:MM:SS |
| 12 | Verify timestamps show current Sri Lankan date and time | All timestamps display the current date (YYYY-MM-DD) captured in Step 7 |
| 13 | Verify route count in grid | At least 10 routes are displayed in the grid |

### Expected Results
- User can successfully navigate to Route Master
- Route menu is accessible from Masters navigation
- Grid displays route data
- Sync All button is functional
- After clicking Sync All, Last Synced Date should update to current Sri Lankan local time
- Timestamps should display in format: YYYY-MM-DD HH:MM:SS

### Actual Results
✅ **PASSED**: Steps 1-9
❌ **FAILED**: Step 10 - "Last Synced Date" column not found

**Bug Details:**
- **Real-time captured**: 2026-02-04 11:27:45 (Sri Lankan time)
- **Expected**: "Last Synced Date" column should be visible in the grid
- **Actual**: Column "Last Synced Date" does not exist in Route Master grid
- **Issue**: Route Master does not have a "Last Synced Date" column like some other master modules

### Test Status
**❌ FAILED** - Missing column in Step 10

### Bug Report
**Bug ID**: BUG_ROUTE_MASTER_001  
**Severity**: High  
**Title**: Route Master does not have "Last Synced Date" column  
**Description**: When navigating to Route Master page, the grid does not contain a "Last Synced Date" column that is present in some other master modules (Branch, Division, Designation). This makes it impossible to verify when routes were last synced from the external system.

**Impact:**
- Users cannot verify when route data was last synchronized
- No visibility into data freshness
- Inconsistent UI compared to some other master modules
- Cannot audit sync operations for route data

**Comparison with Other Masters:**
- Branch Master: Has "Last Synced Date" column ✅
- Division Master: Has "Last Synced Date" column ✅
- Designation Master: Has "Last Synced Date" column ✅
- Employee Master: Missing "Last Synced Date" column ❌
- Route Master: Missing "Last Synced Date" column ❌

---

## TC_ROUTE_MASTER_002: Verify Sync Status After Clicking Sync All

### Test Objective
Verify that after clicking Sync All button, the route data persists and the grid maintains the same or greater number of routes.

### Pre-conditions
- User is logged in
- User is on Route Master page

### Test Priority
**Medium**

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system | User successfully logs in |
| 2 | Navigate to Masters → Route | Route Master page loads |
| 3 | Wait for grid to load | Grid displays with route data |
| 4 | Record initial route count | Initial count is captured (e.g., 10 routes) |
| 5 | Click "Sync All" button | Sync operation initiates |
| 6 | Wait for sync to complete | Sync completes within 5 seconds |
| 7 | Count routes in grid after sync | Final count is captured |
| 8 | Compare initial and final counts | Final count ≥ Initial count |
| 9 | Verify sync success message/indication | Success indication is displayed or data persists |

### Expected Results
- Grid maintains data after sync
- Route count remains the same or increases
- No data loss during sync operation
- Sync operation completes successfully

### Actual Results
✅ **PASSED**: All steps passed
- Initial route count: 10
- Final route count: 10
- Routes synced successfully
- No data loss occurred
- **Note**: Sync functionality works, but "Last Synced Date" column is missing (see BUG_ROUTE_MASTER_001)

### Test Status
**✅ PASSED** (with caveat about missing Last Synced Date column)

---

## Test Execution Summary

| Test Case ID | Test Case Name | Status | Bugs Found |
|--------------|---------------|--------|------------|
| TC_ROUTE_MASTER_001 | Verify Route Master Navigation, Sync All, and Display Local Time | ❌ FAILED | BUG_ROUTE_MASTER_001 |
| TC_ROUTE_MASTER_002 | Verify Sync Status After Clicking Sync All | ✅ PASSED | Note: Missing column issue exists |

### Overall Summary
- **Total Test Cases**: 2
- **Passed**: 1 (50%)
- **Failed**: 1 (50%)
- **Bugs Found**: 1 (High Severity)

---

## Notes
- Test execution performed on: February 4, 2026
- Browser: Chromium (Playwright)
- Test execution mode: Headed
- All tests executed with visual verification
- Real-time captured using Sri Lankan timezone (Asia/Colombo, UTC+5:30)
- Screenshots and videos captured for failed test cases
- **Finding**: Route Master has the same issue as Employee Master - missing Last Synced Date column

---

## Recommendations
1. **HIGH PRIORITY**: Add "Last Synced Date" column to Route Master grid for consistency
2. Verify if Route Master sync data is being stored in the database
3. Check if there's an alternative way to view route sync timestamps
4. Ensure consistent UI/UX across all master modules
5. If Last Synced Date is intentionally omitted, document the reason
6. Consider adding a sync status indicator if timestamps are not displayed
7. Review design specifications for Route Master module
8. Re-test after adding the column to verify timestamp updates work correctly

---

## Comparison Across All Masters

| Module | Last Synced Date Column | Sync Functionality | Timestamp Status |
|--------|-------------------------|-------------------|------------------|
| Branch Master | ✅ Yes | ⚠ Partial | Shows old date (2026-02-03) |
| Division Master | ✅ Yes | ✅ Working | Shows current date (2026-02-04) |
| Designation Master | ✅ Yes | ❌ Fail | Shows "Invalid Date" |
| Employee Master | ❌ **Missing** | ✅ Working | N/A - Column missing |
| Route Master | ❌ **Missing** | ✅ Working | N/A - Column missing |

### Pattern Analysis:
**Two distinct groups identified:**
1. **Group A** (With Last Synced Date column): Branch, Division, Designation
   - Have the column but face different sync/display issues
2. **Group B** (Without Last Synced Date column): Employee, Route
   - Missing the column entirely, but sync functionality works

**Conclusion**: Route Master and Employee Master appear to follow a different implementation pattern than the other master modules. This suggests either:
- Different development phases
- Different design specifications
- Inconsistent feature rollout across modules
