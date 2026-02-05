# Test Case: ATM Cities Master - Sync Functionality

## Test Information
- **Test Suite**: ATM Cities Master - Sync Functionality
- **Test File**: `tests/atm-cities-master.spec.ts`
- **Page Object**: `pages/ATMCitiesMasterPage.ts`
- **Execution Date**: 2026-02-04
- **Environment**: SITREK Application
- **Browser**: Chromium (Headed Mode)

---

## Test Case 1: TC_ATM_CITIES_MASTER_001

### Test Details
- **Test ID**: TC_ATM_CITIES_MASTER_001
- **Title**: Verify ATM Cities Master navigation, Sync All, and local time display
- **Objective**: Validate that ATM Cities Master module correctly displays current Sri Lankan local time in Last Synced Date column after clicking Sync All button
- **Priority**: High
- **Type**: Functional Test

### Preconditions
- User credentials available in `test-data/users.json`
- User has access to Masters menu
- ATM Cities Master module is accessible

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials (chathura/Admin@1234) | User successfully logged in |
| 2 | Click on Masters menu (second Masters text) | Masters menu expanded |
| 3 | Click on ATM Cities menu item | ATM Cities Master page loaded with grid |
| 4 | Verify grid contains data | ATM Cities Master grid is visible |
| 5 | Verify "Last Synced Date" column exists | Column header is visible in grid |
| 6 | Capture real-time before sync (Sri Lankan timezone) | Current time captured: 2026-02-04 06:08:45 |
| 7 | Click Sync All button | Button clicked, sync operation initiated |
| 8 | Wait for sync to complete | Grid updated with new data |
| 9 | Extract timestamps from grid | 8 timestamps found |
| 10 | Verify timestamps match current date | All timestamps should show 2026-02-04 |

### Test Execution Results
- **Status**: ❌ **FAILED**
- **Execution Time**: 15.8 seconds
- **Date Executed**: 2026-02-04 06:08:45 (Sri Lankan Time)

#### Detailed Results
```
✓ Navigating to ATM Cities Master
✓ Clicked on Masters menu
✓ Clicked on ATM Cities menu item
✓ ATM Cities Master page loaded with grid
✓ Last Synced Date column found
Real-time captured (Sri Lanka): 2026-02-04 06:08:45
Expected date in grid: 2026-02-04
✓ Sync All button is visible
✓ Clicked Sync All button

✓ Found 8 timestamp(s) in grid

First 3 timestamp(s):
  1. 2026-02-03 14:52:55
  2. 2026-02-03 14:52:55
  3. 2026-02-03 14:52:55

✓ 0 out of 8 timestamps match today's date (2026-02-04)

✗ VALIDATION FAILED: No timestamps match the current date
Expected date: 2026-02-04
Actual timestamps: 2026-02-03 14:52:55, 2026-02-03 14:52:55, 2026-02-03 14:52:55
⚠ BUG: Timestamps are not updating to current Sri Lankan time

Error: expect(received).toBeGreaterThan(expected)
Expected: > 0
Received:   0
```

### Actual vs Expected Results
| Aspect | Expected | Actual | Status |
|--------|----------|--------|--------|
| Navigation | Masters → ATM Cities | Masters → ATM Cities | ✅ PASS |
| Grid Loading | Grid visible with data | Grid visible with data | ✅ PASS |
| Last Synced Date Column | Column present | Column present | ✅ PASS |
| Timestamp Count | > 0 timestamps | 8 timestamps | ✅ PASS |
| Date Validation | All timestamps 2026-02-04 | 0/8 timestamps 2026-02-04 | ❌ FAIL |
| Actual Date Displayed | 2026-02-04 | 2026-02-03 | ❌ FAIL |
| Real-Time vs Grid | 2026-02-04 06:08:45 | 2026-02-03 14:52:55 | ❌ FAIL |

### Bug Report

#### BUG_ATM_CITIES_MASTER_001: Timestamps showing previous date instead of current date
**Severity**: High  
**Type**: Data Synchronization Issue  
**Status**: Active

**Description**:
ATM Cities Master displays timestamps from the previous day (2026-02-03) instead of the current date (2026-02-04) after clicking Sync All button. The Last Synced Date column shows stale data that doesn't reflect the actual sync time.

**Evidence**:
```
Real-time captured (Sri Lanka): 2026-02-04 06:08:45
Grid timestamps displayed: 2026-02-03 14:52:55

Time difference: ~15 hours and 16 minutes old
```

**Expected Behavior**:
- After clicking Sync All, timestamps should update to current Sri Lankan time (2026-02-04 06:08:45 or similar)
- All 8 ATM Cities records should show today's date (2026-02-04)

**Actual Behavior**:
- All 8 timestamps show previous day's date (2026-02-03 14:52:55)
- 0 out of 8 timestamps match the current date
- Timestamps appear frozen at yesterday's value

**Impact**:
- Users cannot verify if data is current
- Last sync time is misleading
- May indicate sync operation isn't actually updating backend data

**Comparison with Other Modules**:
Same issue as Branch Master - both show old timestamps (2026-02-03)

**Steps to Reproduce**:
1. Login to SITREK application
2. Navigate to Masters → ATM Cities
3. Click Sync All button
4. Observe Last Synced Date column values
5. Compare with current Sri Lankan time

**Recommendation**:
1. Investigate sync operation to ensure it actually updates data
2. Verify timestamp update logic in backend API
3. Check if timestamps are being cached incorrectly
4. Ensure Sri Lankan timezone handling is correct in sync process

---

## Test Case 2: TC_ATM_CITIES_MASTER_002

### Test Details
- **Test ID**: TC_ATM_CITIES_MASTER_002
- **Title**: Verify Sync All button updates ATM Cities records
- **Objective**: Validate that clicking Sync All button successfully syncs ATM Cities records
- **Priority**: High
- **Type**: Functional Test

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials | User successfully logged in |
| 2 | Navigate to ATM Cities Master | ATM Cities Master page loaded |
| 3 | Get initial ATM Cities count from grid | Count recorded |
| 4 | Click Sync All button | Sync operation initiated |
| 5 | Wait for sync to complete | Grid refreshed |
| 6 | Get final ATM Cities count | Count should be > 0 |
| 7 | Verify sync success | ATM Cities count > 0 |

### Test Execution Results
- **Status**: ✅ **PASSED**
- **Execution Time**: 19.3 seconds
- **Date Executed**: 2026-02-04 06:09:01 (Sri Lankan Time)

#### Detailed Results
```
✓ Navigating to ATM Cities Master
✓ Clicked on Masters menu
✓ Clicked on ATM Cities menu item
Initial ATM Cities count: 8
✓ Sync All button is visible
✓ Clicked Sync All button
✓ Clicked Sync All
Final ATM Cities count: 8
✓ ATM Cities synced successfully
```

### Actual vs Expected Results
| Aspect | Expected | Actual | Status |
|--------|----------|--------|--------|
| Initial Count | Any value | 8 | ✅ PASS |
| Sync Operation | Button clicked | Button clicked | ✅ PASS |
| Final Count | > 0 | 8 | ✅ PASS |
| Data Present | Grid has records | 8 ATM Cities | ✅ PASS |

### Observations
✅ Grid correctly displays 8 ATM Cities records  
✅ Sync All button is functional  
✅ Record count remains stable after sync  

---

## Comparison with Other Masters

### Summary Table
| Master Module | Last Synced Date Column | Timestamp Status | Current Date (2026-02-04) | Row Count |
|---------------|-------------------------|------------------|---------------------------|-----------|
| Branch | ✅ Present | ⚠️ Old Date (2026-02-03) | ❌ FAIL | 10 |
| Division | ✅ Present | ✅ Current Date | ✅ PASS | 10 |
| Designation | ✅ Present | ❌ Invalid Date | ❌ FAIL | 10 |
| Employee | ❌ Missing | N/A | N/A | 10 |
| Route | ❌ Missing | N/A | N/A | 10 |
| Agreement | ✅ Present | ✅ Current Date | ✅ PASS | 10 |
| **ATM Cities** | ✅ Present | ⚠️ **Old Date (2026-02-03)** | ❌ **FAIL** | **8** |

### Pattern Analysis
ATM Cities Master belongs to **Group A** (modules with Last Synced Date column) but shows **the same bug as Branch Master**:
- ✅ Last Synced Date column is present
- ✅ Timestamps display correctly in YYYY-MM-DD HH:MM:SS format
- ❌ **Timestamps show PREVIOUS date (2026-02-03) instead of current date (2026-02-04)**
- ✅ No "Invalid Date" entries
- ⚠️ Sync operation appears to work but timestamps don't update

**Modules with Old Timestamp Bug**: Branch, ATM Cities (both showing 2026-02-03)  
**Successful Modules**: Division, Agreement (both showing 2026-02-04)  
**Critical Bug**: Designation (Invalid Date)  
**Missing Column**: Employee, Route

### Common Issues Between Branch and ATM Cities
Both Branch Master and ATM Cities Master share identical symptoms:
1. Last Synced Date column exists
2. Timestamps formatted correctly (YYYY-MM-DD HH:MM:SS)
3. All timestamps stuck on previous day (2026-02-03)
4. Sync All button works but doesn't update timestamps
5. Time gap: ~15-16 hours behind current time

This suggests a **common backend sync issue** affecting specific master modules.

---

## Recommendations

### For ATM Cities Master
1. 🔴 **CRITICAL**: Fix timestamp update logic to reflect current sync time
2. 🔍 **Investigate**: Check if sync actually updates backend or only frontend
3. 🔧 **Backend Review**: Verify timestamp handling in API response
4. ✅ **Reference**: Use Division/Agreement Master implementation as correct example

### For Application Team
1. **Pattern Investigation**: Both Branch and ATM Cities show same old date issue (2026-02-03)
   - Suggests common sync service or API endpoint problem
   - May affect other undiscovered master modules
   
2. **Priority Fixes**:
   - **P1 (Critical)**: Designation Master "Invalid Date" corruption
   - **P2 (High)**: Branch & ATM Cities old timestamp issue
   - **P3 (Medium)**: Employee & Route missing Last Synced Date column

3. **Testing Strategy**:
   - Compare Branch/ATM Cities sync logic with Division/Agreement
   - Check database timestamp update queries
   - Verify timezone conversion in affected modules

4. **Consistency Needed**:
   - Standardize sync behavior across all masters
   - Implement uniform timestamp update mechanism
   - Add validation to ensure timestamps reflect actual sync time

### Immediate Actions
1. Review sync API calls for Branch and ATM Cities Masters
2. Compare with working modules (Division, Agreement)
3. Check if timestamps are cached or coming from stale data
4. Verify Sri Lankan timezone handling in backend

---

## Test Environment
- **Application**: SITREK
- **Test Framework**: Playwright with TypeScript
- **Test Pattern**: Page Object Model (POM)
- **Browser**: Chromium (Headed Mode)
- **Timezone**: Asia/Colombo (Sri Lankan Time, UTC+5:30)
- **Date Format**: YYYY-MM-DD HH:MM:SS
- **Grid Component**: MUI DataGrid

## Test Data
- **Username**: chathura
- **Password**: Admin@1234
- **Role**: operation

## Conclusion
ATM Cities Master has the **same timestamp bug as Branch Master**, showing data from the previous day (2026-02-03) instead of the current date (2026-02-04). While TC_ATM_CITIES_MASTER_002 passes and confirms 8 ATM Cities records are displayed, TC_ATM_CITIES_MASTER_001 fails due to outdated timestamps. This is a **high-severity bug** that needs immediate attention as it makes the Last Synced Date column unreliable for users.

**Overall Status**: ❌ **FAILED** - Old timestamps make sync status unreliable (same issue as Branch Master)

**Critical Finding**: 2 out of 7 tested masters (Branch, ATM Cities) share identical timestamp bug, suggesting systematic issue in sync implementation.
