# Seal Master - Test Cases

## Test Suite Information
- **Module**: Masters → Seal Master
- **Feature**: Seal synchronization functionality
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 5, 2026

---

## TC_SEAL_MASTER_001: Verify Seal Master Navigation, Sync All, and Display Local Time

### Test Objective
Verify that user can navigate to Seal Master through Masters menu, access Seal menu item, click Sync All button, and verify that the Last Synced Date column displays the current Sri Lankan local time after synchronization.

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
| 3 | Verify "Seal" menu item is visible | Seal menu item is visible in the expanded menu |
| 4 | Click on "Seal" menu item | Seal Master page loads successfully |
| 5 | Verify Seal Master page displays with grid | Data grid is visible with columns: "Seal Code", "Seal Name", and "Branch" |
| 6 | Verify "Sync All" button is visible | Sync All button is displayed on the page |
| 7 | Capture current Sri Lankan local time | Real-time is captured (format: YYYY-MM-DD HH:MM:SS) |
| 8 | Click "Sync All" button | Sync operation initiates |
| 9 | Wait for sync to complete (5 seconds) | Loading indicator appears and disappears |
| 10 | Verify "Last Synced Date" column header is visible | Column header "Last Synced Date" is displayed |
| 11 | Verify timestamps are displayed in correct format | Timestamps match pattern: YYYY-MM-DD HH:MM:SS |
| 12 | Verify timestamps show current Sri Lankan date and time | All timestamps display the current date (YYYY-MM-DD) captured in Step 7 |
| 13 | Verify seal count in grid | At least one seal record is displayed in the grid |

### Expected Results
- User can successfully navigate to Seal Master
- Seal menu is accessible from Masters navigation
- Grid displays seal data with "Seal Code", "Seal Name", and "Branch" columns
- Sync All button is functional (if available)
- All seal records are displayed correctly in the grid
- Data is properly synchronized and displayed

### Actual Results
_To be updated after test execution_

### Test Status
**⏳ PENDING** - Not yet executed

### Notes
- This test follows the same pattern as other master module tests (Branch, Cities, Division, etc.)
- Special attention should be paid to timezone handling (Sri Lankan timezone)
- The test should validate both the sync functionality and timestamp accuracy

### Suggestions for Enhancement
⚠️ **RECOMMENDATION**: It is highly recommended to add a "Last Synced Date" column to the Seal Master grid, similar to other master modules (Branch Master, Cities Master, Division Master, etc.). This would:
- Provide visibility into when each seal record was last synchronized
- Ensure data consistency across all master modules
- Help track synchronization status and identify stale data
- Maintain uniformity with other master module implementations
- Display timestamps in Sri Lankan local time (YYYY-MM-DD HH:MM:SS format)

This enhancement would align Seal Master with the existing master module standards and improve data traceability.

---

## TC_SEAL_MASTER_002: Verify Seal Master CRUD Operations

### Test Objective
Verify that user can perform Create, Read, Update, and Delete operations on seal records in the Seal Master module.

### Pre-conditions
- User is logged in with valid credentials
- User has access to Seal Master
- Seal Master page is loaded

### Test Priority
**High**

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Seal Master page | Seal Master grid is displayed |
| 2 | Click "Add New" or "Create" button | New seal form opens |
| 3 | Fill in seal details (Seal Code, Seal Name, Branch) | Form accepts input data |
| 4 | Click "Save" button | New seal record is created successfully |
| 5 | Verify new record appears in grid | New seal is visible in the grid |
| 6 | Click "Edit" button on the new record | Edit form opens with existing data |
| 7 | Update seal details | Form accepts modified data |
| 8 | Click "Save" button | Seal record is updated successfully |
| 9 | Verify updated data appears in grid | Modified data is visible in the grid |
| 10 | Click "Delete" button on the record | Confirmation dialog appears |
| 11 | Confirm deletion | Seal record is deleted successfully |
| 12 | Verify record is removed from grid | Deleted seal is no longer visible |

### Expected Results
- All CRUD operations complete successfully
- Data persistence works correctly
- User receives appropriate feedback messages
- Grid updates reflect changes immediately

### Actual Results
_To be updated after test execution_

### Test Status
**⏳ PENDING** - Not yet executed

---

## TC_SEAL_MASTER_003: Verify Seal Master Search and Filter Functionality

### Test Objective
Verify that user can search and filter seal records using available search/filter options.

### Pre-conditions
- User is logged in with valid credentials
- Seal Master page is loaded with multiple records

### Test Priority
**Medium**

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Seal Master page | Grid displays all seal records |
| 2 | Locate search input field | Search field is visible |
| 3 | Enter seal name or seal code in search field | Search field accepts input |
| 4 | Verify search results | Grid filters and shows matching records only |
| 5 | Clear search field | Grid displays all records again |
| 6 | Test filter by status (if available) | Grid filters by selected status |
| 7 | Test sorting functionality | Grid sorts records by selected column |

### Expected Results
- Search functionality works correctly
- Filter options function as expected
- Sorting works in ascending/descending order
- Clear search resets the grid

### Actual Results
_To be updated after test execution_

### Test Status
**⏳ PENDING** - Not yet executed

---

## TC_SEAL_MASTER_004: Verify Seal Master Data Validation

### Test Objective
Verify that the Seal Master module properly validates input data and displays appropriate error messages for invalid inputs.

### Pre-conditions
- User is logged in with valid credentials
- Seal Master page is loaded

### Test Priority
**High**

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Navigate to Seal Master page | Seal Master grid is displayed |
| 2 | Click "Add New" button | New seal form opens |
| 3 | Leave required fields empty and click Save | Validation error message appears |
| 4 | Enter invalid format data in Seal Code or Seal Name | Format validation error appears |
| 5 | Enter duplicate Seal Code (if validation exists) | Duplicate validation error appears |
| 6 | Enter valid Seal Code, Seal Name, and Branch, then save | Record saves successfully |

### Expected Results
- Required field validation works correctly
- Format validation prevents invalid data entry
- Duplicate validation prevents duplicate records
- Clear error messages guide the user
- Valid data is saved successfully

### Actual Results
_To be updated after test execution_

### Test Status
**⏳ PENDING** - Not yet executed

---

## Known Issues
_To be documented during testing_

## Test Environment
- **Browser**: Chromium (Headed Mode)
- **Application**: SITREK
- **Timezone**: Sri Lanka (UTC+5:30)
- **Test Framework**: Playwright

## Test Execution Notes
_To be updated during test execution_
