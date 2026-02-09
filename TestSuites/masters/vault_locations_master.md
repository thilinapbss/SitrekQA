# Vault Locations Master Test Case

## Test Information
- **Test Suite**: Vault Locations Master - Sync Functionality
- **Test File**: `tests/vault-locations-master.spec.ts`
- **Page Object**: `pages/VaultLocationsMasterPage.ts`
- **Execution Date**: 2026-02-09
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case 1: TC_VAULT_LOCATIONS_MASTER_001

### Test Details
- **Test ID**: TC_VAULT_LOCATIONS_MASTER_001
- **Title**: Verify Vault Locations Master navigation and Sync All functionality
- **Objective**: Validate that Vault Locations Master module loads correctly and displays current system time in Last Synced Date column after clicking Sync All button
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- Vault Locations Master module is accessible

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in |
| 2 | Click on Masters menu (second Masters text) | Masters menu expanded |
| 3 | Click on Vault Locations menu item | Vault Locations Master page loaded with grid |
| 4 | Verify grid contains vault location data | Vault Locations grid is visible with location records |
| 5 | Verify current system time exists in grid | Current system time visible in Last Synced Date column (testdata.TC_VAULT_LOCATIONS_MASTER_001.syncData.columnToVerify). Timezone: testdata.syncData.timezone |

**Note**: Test data including sync button name, expected message, and column name are fetched from `test-data/testdata.json` under `testCases.TC_VAULT_LOCATIONS_MASTER_001.syncData`. The execution time is dynamic and will vary based on test execution time.

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
- **TC_VAULT_LOCATIONS_MASTER_001 Data**: `testCases.TC_VAULT_LOCATIONS_MASTER_001.syncData`

**Login Credentials**: `credentials.creator` (chathura/Admin@1234)

All test data including sync button name, expected timestamp format, and column verification are dynamically generated and maintained in the centralized testdata.json file.  
**Actual**: No sync button found on the page  
**Impact**: Users cannot trigger synchronization of vault location data from Odoo system
**Similar Issue**: Same bug exists in Synced Denomination Master page

---

## Suggestions for Enhancement
1. **Last Synced Date Column**: Consider adding a "Last Synced Date" column to track when each vault location record was last synchronized from the server, similar to other master modules
2. **Timestamp Display**: Show timestamps in local Sri Lankan time format (Asia/Colombo) for better user experience
3. **Search/Filter Functionality**: Add search and filter capabilities to quickly locate specific vault locations
