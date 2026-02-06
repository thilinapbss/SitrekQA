# Synced Denomination Master Test Cases

## Module: Masters → Synced Denomination Master
**Application**: SITREK  
**URL**: https://111.119.245.10:20081/  
**Test Environment**: QA  
**Browser**: Chrome (Chromium)  
**Tested By**: Automation Testing  
**Date**: February 5, 2026

---

## Test Case Summary

| Test Case ID | Test Case Description | Priority | Status |
|--------------|----------------------|----------|--------|
| TC_SYNCED_DENOMINATION_MASTER_001 | Verify Synced Denomination Master page navigation and correct header display | High | Not Executed |
| TC_SYNCED_DENOMINATION_MASTER_002 | Verify Sync All button functionality to sync from Odoo | High | Not Executed |
| TC_SYNCED_DENOMINATION_MASTER_003 | Verify grid columns and headers | High | Not Executed |
| TC_SYNCED_DENOMINATION_MASTER_004 | Verify synced denomination data display in grid | Medium | Not Executed |

---

## Detailed Test Cases

### TC_SYNCED_DENOMINATION_MASTER_001: Verify Synced Denomination Master page navigation and correct header display

**Objective**: Verify that the Synced Denomination Master page can be accessed through Masters menu and displays the correct page header.

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Masters menu
- Application is accessible at https://111.119.245.10:20081/

**Test Steps**:
1. Navigate to the application URL
2. Login with valid credentials
3. Click on "Masters" menu button
4. Click on "Synced Denomination Master" menu item
5. Wait for the page to load
6. Verify the page header displays "Synced Denomination Master"
7. Verify that the grid is displayed
8. Verify URL contains "synced_denomination_master"

**Expected Results**:
- Masters menu is clickable
- Synced Denomination Master menu item is visible and clickable
- Synced Denomination Master page loads successfully
- **Page header (h4) displays "Synced Denomination Master"** (not just "Denomination Master")
- Grid container is visible
- Grid displays synced denomination records
- URL contains "synced_denomination_master"

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_SYNCED_DENOMINATION_MASTER_002: Verify Sync All button functionality to sync from Odoo

**Objective**: Verify that the Sync All button is present and can trigger synchronization of denomination data from Odoo system.

**Preconditions**:
- User is on the Synced Denomination Master page
- Grid is loaded with data
- System has connection to Odoo

**Test Steps**:
1. Navigate to Synced Denomination Master page
2. Locate the "Sync All" button
3. Verify the button is visible
4. Verify the button is enabled
5. Click on "Sync All" button
6. Wait for sync operation to complete
7. Verify grid refreshes with updated data

**Expected Results**:
- **Sync All button is visible on the page**
- Sync All button is clickable
- Button triggers synchronization from Odoo
- Grid refreshes after sync operation
- Success message or indicator is displayed after sync

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_SYNCED_DENOMINATION_MASTER_003: Verify grid columns and headers

**Objective**: Verify that the grid displays all required column headers correctly.

**Preconditions**:
- User is on the Synced Denomination Master page
- Grid is loaded with data

**Test Steps**:
1. Navigate to Synced Denomination Master page
2. Inspect the grid column headers
3. Verify "Odoo ID" column header is visible
4. Verify "Denomination Type" column header is visible
5. Verify "Denomination Name" column header is visible

**Expected Results**:
- All three column headers are displayed
- Column headers are properly labeled
- Headers are clickable for sorting

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_SYNCED_DENOMINATION_MASTER_004: Verify synced denomination data display in grid

**Objective**: Verify that synced denomination records are displayed correctly in the grid with proper data.

**Preconditions**:
- User is on the Synced Denomination Master page
- Grid contains at least one synced denomination record

**Test Steps**:
1. Navigate to Synced Denomination Master page
2. Wait for grid to load completely
3. Verify that grid contains data rows
4. Count the number of denomination records
5. Verify that each row has data in all columns

**Expected Results**:
- Grid displays at least one denomination record
- Each record has complete information
- Data is properly formatted
- Grid is scrollable if records exceed page size

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

---

## Known Issues / Bugs Found

### Issue 1: Incorrect Page Header
**Status**: Bug  
**Severity**: Medium  
**Description**: The page header displays "Denomination Master" instead of "Synced Denomination Master"  
**Expected**: `<h4>Synced Denomination Master</h4>`  
**Actual**: `<h4>Denomination Master</h4>`  
**Impact**: Users may be confused about which page they are on

### Issue 2: Missing Sync All Button
**Status**: Bug  
**Severity**: High  
**Description**: The Sync All button is not present on the Synced Denomination Master page  
**Expected**: A "Sync All" button should be visible to trigger synchronization from Odoo  
**Actual**: No sync button found on the page  
**Impact**: Users cannot trigger synchronization of denomination data from Odoo system

---

## Additional Test Cases (If Issues Are Fixed)

### TC_SYNCED_DENOMINATION_MASTER_005: Verify grid pagination and data integrity

**Objective**: Verify that the grid displays all required columns with proper headers and data.

**Preconditions**:
- User is on the Synced Denomination Master page
- Grid is loaded with synced denomination data

**Test Steps**:
1. Navigate to Synced Denomination Master page
2. Inspect the grid headers
3. Verify the following columns are present:
   - Denomination Code
   - Denomination Name
   - Branch
   - Any other relevant columns
4. Verify each column has data
5. Verify data types are correct (text for names, codes for IDs)

**Expected Results**:
- All required columns are displayed
- Column headers are properly labeled
- Data in each column matches the header type
- No empty or null values in mandatory fields

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

## Test Data

**Login Credentials**:
- Username: chathura
- Password: Admin@1234
- Operation Role: As per user configuration

**Test Environment Details**:
- Application URL: https://111.119.245.10:20081/
- Browser: Chromium (Chrome)
- Viewport: 1920x1080
- Timezone: Asia/Colombo (UTC+5:30)

---

## Notes
- Tests are executed in headed mode for visual verification
- All network requests use ignoreHTTPSErrors due to self-signed certificates
- Grid loading timeout is set to 10 seconds
- Tests include wait for stable network state

---

## Suggestions for Enhancement
1. **Last Synced Date Column**: Consider adding a "Last Synced Date" column to track when each denomination record was last synchronized from the server, similar to other master modules
2. **Timestamp Display**: Show timestamps in local Sri Lankan time format (Asia/Colombo) for better user experience
