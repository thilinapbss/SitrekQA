# Test Case: Cities Master - Sync Functionality

## Test Information
- **Test Suite**: Cities Master - Sync Functionality
- **Test File**: `tests/cities-master.spec.ts`
- **Page Object**: `pages/CitiesMasterPage.ts`
- **Execution Date**: 2026-02-04
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case 1: TC_CITIES_MASTER_001

### Test Details
- **Test ID**: TC_CITIES_MASTER_001
- **Title**: Verify Cities Master navigation, Sync All, and local time display
- **Objective**: Validate that Cities Master module correctly displays current Sri Lankan local time in Last Synced Date column after clicking Sync All button
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- Cities Master module is accessible

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in |
| 2 | Click on Masters menu (second Masters text) | Masters menu expanded |
| 3 | Click on Cities menu item | Cities Master page loaded with grid |
| 4 | Verify grid contains data | Cities Master grid is visible |
| 5 | Verify "Last Synced Date" column exists | Column header is visible in grid |
| 6 | Capture real-time before sync (Sri Lankan timezone) | Current time|
| 7 | Click Sync All button | Button clicked, sync operation initiated |
| 8 | Wait for sync to complete | Grid updated with new data |
| 9 | Extract timestamps from grid | 10 timestamps found |
| 10 | Verify timestamps match current date | All timestamps should show 
