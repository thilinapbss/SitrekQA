# Test Case: Weapon Master - Sync Functionality

## Test Information
- **Test Suite**: Weapon Master - Sync Functionality
- **Test File**: `tests/weapon-master.spec.ts`
- **Page Object**: `pages/WeaponMasterPage.ts`
- **Execution Date**: 2026-02-04
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case 1: TC_WEAPON_MASTER_001

### Test Details
- **Test ID**: TC_WEAPON_MASTER_001
- **Title**: Verify Weapon Master navigation, Sync All, and local time display
- **Objective**: Validate that Weapon Master module correctly displays current Sri Lankan local time in Last Synced Date column after clicking Sync All button
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- Weapon Master module is accessible

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in |
| 2 | Click on Masters menu (second Masters text) | Masters menu expanded |
| 3 | Click on Weapon menu item | Weapon Master page loaded with grid |
| 4 | Verify grid contains data | Weapon Master grid is visible |
| 5 | Verify current time exists in grid | Current date/time (2026-02-09 12:37:23) should be visible in Last Synced Date column |

**Note**: The execution time in Step 5 should be replaced with the actual system time when the test runs. This is dynamic and will vary based on test execution time.

### Test Execution Results
- **Status**: ✅ **PASSED**
- **Execution Time**: 14.3 seconds
- **Date Executed**: 2026-02-04

---

## Test Environment
- **Application**: SITREK
- **Browser**: Chromium (Headed Mode)
- **Timezone**: Asia/Colombo (Sri Lankan Time, UTC+5:30)
