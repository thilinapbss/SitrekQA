# Vault Locations Master Test Cases

## Module: Masters → Vault Locations
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
| TC_VAULT_LOCATIONS_MASTER_001 | Verify Vault Locations Master page navigation and grid display | High | Not Executed |
| TC_VAULT_LOCATIONS_MASTER_002 | Verify Sync All button functionality | High | Not Executed |
| TC_VAULT_LOCATIONS_MASTER_003 | Verify grid columns and headers | High | Not Executed |
| TC_VAULT_LOCATIONS_MASTER_004 | Verify vault locations data display in grid | Medium | Not Executed |

---

## Detailed Test Cases

### TC_VAULT_LOCATIONS_MASTER_001: Verify Vault Locations Master page navigation and grid display

**Objective**: Verify that the Vault Locations Master page can be accessed through Masters menu and the grid is displayed correctly.

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Masters menu
- Application is accessible at https://111.119.245.10:20081/

**Test Steps**:
1. Navigate to the application URL
2. Login with valid credentials
3. Click on "Masters" menu button
4. Click on "Vault Locations" menu item
5. Wait for the page to load
6. Verify that the grid is displayed

**Expected Results**:
- Masters menu is clickable
- Vault Locations menu item is visible and clickable
- Vault Locations Master page loads successfully
- Grid container is visible
- Grid displays vault location records

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_VAULT_LOCATIONS_MASTER_002: Verify Sync All button functionality

**Objective**: Verify that the Sync All button is present and clickable on Vault Locations Master page.

**Preconditions**:
- User is on the Vault Locations Master page
- Grid is loaded with data

**Test Steps**:
1. Navigate to Vault Locations Master page
2. Locate the "Sync All" button
3. Verify the button is visible
4. Verify the button is enabled
5. Click on "Sync All" button
6. Wait for sync operation to complete

**Expected Results**:
- Sync All button is visible
- Sync All button is clickable
- Button performs sync operation when clicked
- Grid refreshes after sync

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_VAULT_LOCATIONS_MASTER_003: Verify grid columns and headers

**Objective**: Verify that the grid displays all required column headers correctly.

**Preconditions**:
- User is on the Vault Locations Master page
- Grid is loaded with data

**Test Steps**:
1. Navigate to Vault Locations Master page
2. Inspect the grid column headers
3. Verify "Odoo ID" column header is visible
4. Verify "Vault Location" column header is visible
5. Verify "Customer" column header is visible

**Expected Results**:
- All three column headers are displayed
- Column headers are properly labeled (Odoo ID, Vault Location, Customer)
- Headers are clickable for sorting

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_VAULT_LOCATIONS_MASTER_004: Verify vault locations data display in grid

**Objective**: Verify that vault location records are displayed correctly in the grid with proper data.

**Preconditions**:
- User is on the Vault Locations Master page
- Grid contains at least one vault location record

**Test Steps**:
1. Navigate to Vault Locations Master page
2. Wait for grid to load completely
3. Verify that grid contains data rows
4. Count the number of vault location records
5. Verify that each row has data in all columns

**Expected Results**:
- Grid displays at least one vault location record
- Each record has complete information
- Data is properly formatted
- Grid is scrollable if records exceed page size

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_VAULT_LOCATIONS_MASTER_004: Verify grid columns and data integrity

**Objective**: Verify that the grid displays all required columns with proper headers and data.

**Preconditions**:
- User is on the Vault Locations Master page
- Grid is loaded with vault location data

**Test Steps**:
1. Navigate to Vault Locations Master page
2. Inspect the grid headers
3. Verify the following columns are present:
   - Vault Location Code
   - Vault Location Name
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

## Known Issues / Bugs Found

### Issue 1: Missing Sync All Button
**Status**: Bug  
**Severity**: High  
**Description**: The Sync All button is not present on the Vault Locations Master page  
**Expected**: A "Sync All" button should be visible to trigger synchronization from Odoo  
**Actual**: No sync button found on the page  
**Impact**: Users cannot trigger synchronization of vault location data from Odoo system
**Similar Issue**: Same bug exists in Synced Denomination Master page

---

## Suggestions for Enhancement
1. **Last Synced Date Column**: Consider adding a "Last Synced Date" column to track when each vault location record was last synchronized from the server, similar to other master modules
2. **Timestamp Display**: Show timestamps in local Sri Lankan time format (Asia/Colombo) for better user experience
3. **Search/Filter Functionality**: Add search and filter capabilities to quickly locate specific vault locations
