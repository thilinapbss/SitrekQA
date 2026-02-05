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
| 6 | Capture real-time before sync (Sri Lankan timezone) | Current time captured: 2026-02-04 06:20:12 |
| 7 | Click Sync All button | Button clicked, sync operation initiated |
| 8 | Wait for sync to complete | Grid updated with new data |
| 9 | Extract timestamps from grid | 10 timestamps found |
| 10 | Verify timestamps match current date | All timestamps should show 2026-02-04 |

### Test Execution Results
- **Status**: ❌ **FAILED**
- **Execution Time**: 16.0 seconds
- **Date Executed**: 2026-02-04 06:20:12 (Sri Lankan Time)

#### Detailed Results
```
✓ Navigating to Cities Master
✓ Clicked on Masters menu
✓ Clicked on Cities menu item
✓ Cities Master page loaded with grid
✓ Last Synced Date column found
Real-time captured (Sri Lanka): 2026-02-04 06:20:12
Expected date in grid: 2026-02-04
✓ Sync All button is visible
✓ Clicked Sync All button

✓ Found 10 timestamp(s) in grid

First 3 timestamp(s):
  1. 2026-02-03 14:53:18
  2. 2026-02-03 14:53:18
  3. 2026-02-03 14:53:18

✓ 0 out of 10 timestamps match today's date (2026-02-04)

✗ VALIDATION FAILED: No timestamps match the current date
Expected date: 2026-02-04
Actual timestamps: 2026-02-03 14:53:18, 2026-02-03 14:53:18, 2026-02-03 14:53:18
⚠ BUG: Timestamps are not updating to current Sri Lankan time

Error: expect(received).toBeGreaterThan(expected)
Expected: > 0
Received:   0
```

### Actual vs Expected Results
| Aspect | Expected | Actual | Status |
|--------|----------|--------|--------|
| Navigation | Masters → Cities | Masters → Cities | ✅ PASS |
| Grid Loading | Grid visible with data | Grid visible with data | ✅ PASS |
| Last Synced Date Column | Column present | Column present | ✅ PASS |
| Timestamp Count | > 0 timestamps | 10 timestamps | ✅ PASS |
| Date Validation | All timestamps 2026-02-04 | 0/10 timestamps 2026-02-04 | ❌ FAIL |
| Actual Date Displayed | 2026-02-04 | 2026-02-03 | ❌ FAIL |
| Real-Time vs Grid | 2026-02-04 06:20:12 | 2026-02-03 14:53:18 | ❌ FAIL |

### Bug Report

#### BUG_CITIES_MASTER_001: Timestamps showing previous date instead of current date
**Severity**: High  
**Type**: Data Synchronization Issue  
**Status**: Active

**Description**:
Cities Master displays timestamps from the previous day (2026-02-03) instead of the current date (2026-02-04) after clicking Sync All button. The Last Synced Date column shows stale data that doesn't reflect the actual sync time.

**Evidence**:
```
Real-time captured (Sri Lanka): 2026-02-04 06:20:12
Grid timestamps displayed: 2026-02-03 14:53:18

Time difference: ~15 hours and 27 minutes old
```

**Expected Behavior**:
- After clicking Sync All, timestamps should update to current Sri Lankan time (2026-02-04 06:20:12 or similar)
- All 10 Cities records should show today's date (2026-02-04)

**Actual Behavior**:
- All 10 timestamps show previous day's date (2026-02-03 14:53:18)
- 0 out of 10 timestamps match the current date
- Timestamps appear frozen at yesterday's value

**Impact**:
- Users cannot verify if data is current
- Last sync time is misleading
- May indicate sync operation isn't actually updating backend data

**Comparison with Other Modules**:
Same issue as Branch, ATM Cities Masters - all show old timestamps (2026-02-03)

**Steps to Reproduce**:
1. Login to SITREK application
2. Navigate to Masters → Cities
3. Click Sync All button
4. Observe Last Synced Date column values
5. Compare with current Sri Lankan time

**Recommendation**:
1. Investigate sync operation to ensure it actually updates data
2. Verify timestamp update logic in backend API
3. Check if timestamps are being cached incorrectly
4. Ensure Sri Lankan timezone handling is correct in sync process
5. Compare with working modules (Division, Agreement) to identify differences

---

## Test Case 2: TC_CITIES_MASTER_002

### Test Details
- **Test ID**: TC_CITIES_MASTER_002
- **Title**: Verify Sync All button updates cities records
- **Objective**: Validate that clicking Sync All button successfully syncs cities records
- **Priority**: High
- **Type**: Functional Test

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login to system with valid credentials | User successfully logged in |
| 2 | Navigate to Cities Master | Cities Master page loaded |
| 3 | Get initial cities count from grid | Count recorded |
| 4 | Click Sync All button | Sync operation initiated |
| 5 | Wait for sync to complete | Grid refreshed |
| 6 | Get final cities count | Count should be > 0 |
| 7 | Verify sync success | Cities count > 0 |

### Test Execution Results
- **Status**: ❌ **FAILED**
- **Execution Time**: 19.8 seconds
- **Date Executed**: 2026-02-04 06:20:28 (Sri Lankan Time)

#### Detailed Results
```
✓ Navigating to Cities Master
✓ Clicked on Masters menu
✓ Clicked on Cities menu item
Initial cities count: 0
✓ Sync All button is visible
✓ Clicked Sync All button
✓ Clicked Sync All
Final cities count: 0

Error: expect(received).toBeGreaterThan(expected)
Expected: > 0
Received:   0
```

### Actual vs Expected Results
| Aspect | Expected | Actual | Status |
|--------|----------|--------|--------|
| Initial Count | Any value | 0 | ⚠️ |
| Sync Operation | Button clicked | Button clicked | ✅ PASS |
| Final Count | > 0 | 0 | ❌ FAIL |

### Bug Report

#### BUG_CITIES_MASTER_002: Row count calculation incorrect but timestamps visible
**Severity**: Medium  
**Type**: Test Implementation Issue  
**Status**: Needs Investigation

**Description**:
The test case TC_CITIES_MASTER_002 fails because the row count is reported as 0, even though TC_CITIES_MASTER_001 successfully found 10 timestamps in the same grid. This indicates the row counting method in `getCitiesCount()` is not correctly identifying the grid rows (same issue as Agreement Master test).

**Evidence**:
- TC_CITIES_MASTER_001 found 10 timestamps in grid
- TC_CITIES_MASTER_002 reports 0 rows
- Grid is populated with data (visible in TC_CITIES_MASTER_001)

**Expected Behavior**:
- `getCitiesCount()` should return 10 (matching the timestamp count)

**Actual Behavior**:
- `getCitiesCount()` returns 0

**Root Cause**:
The MUI DataGrid row counting logic in `getCitiesCount()` method doesn't correctly identify the data rows in Cities Master's grid structure.

**Recommendation**:
1. Update row counting logic to match the grid structure used in Cities Master
2. Consider using a more reliable selector for data rows
3. Verify if grid uses virtualization that might affect row counting

**Workaround**:
TC_CITIES_MASTER_001 proves the grid contains 10 cities with timestamps, confirming data is present.

---

## Comparison with Other Masters

### Summary Table - Old Timestamp Bug Pattern
| Master Module | Last Synced Date Column | Timestamp Status | Current Date (2026-02-04) | Row Count | Timestamp Date |
|---------------|-------------------------|------------------|---------------------------|-----------|----------------|
| Branch | ✅ Present | ⚠️ Old Date | ❌ FAIL | 10 | 2026-02-03 |
| ATM Cities | ✅ Present | ⚠️ Old Date | ❌ FAIL | 8 | 2026-02-03 |
| **Cities** | ✅ Present | ⚠️ **Old Date** | ❌ **FAIL** | **10** | **2026-02-03** |
| Division | ✅ Present | ✅ Current Date | ✅ PASS | 10 | 2026-02-04 |
| Agreement | ✅ Present | ✅ Current Date | ✅ PASS | 10 | 2026-02-04 |
| Designation | ✅ Present | ❌ Invalid Date | ❌ FAIL | 10 | Invalid |
| Employee | ❌ Missing | N/A | N/A | 10 | N/A |
| Route | ❌ Missing | N/A | N/A | 10 | N/A |
| Weapon | ❌ Missing | N/A | N/A | 10 | N/A |

### Pattern Analysis - CRITICAL FINDING
Cities Master is the **THIRD MODULE** with the old timestamp bug (2026-02-03):

**Group A1 - Old Timestamp Bug (2026-02-03)**:
1. Branch Master
2. ATM Cities Master  
3. **Cities Master** ⬅️ NEW

All three show identical symptoms:
- ✅ Last Synced Date column exists
- ✅ Timestamps formatted correctly (YYYY-MM-DD HH:MM:SS)
- ❌ All timestamps stuck on previous day (2026-02-03)
- ⚠️ Time range: ~14:52:55 to 14:53:18 (within 23-second window)
- ❌ Sync All button doesn't update timestamps
- ⚠️ Time gap: ~15-16 hours behind current time

**Group A2 - Working Correctly**:
- Division Master (2026-02-04) ✅
- Agreement Master (2026-02-04) ✅

**Group B - Missing Column**:
- Employee, Route, Weapon (no timestamps)

**Group C - Data Corruption**:
- Designation (Invalid Date)

### Critical Pattern Discovery
The old timestamp bug affects **33% of tested modules with Last Synced Date column** (3 out of 9):
- All three show timestamps from 2026-02-03 around 14:52-14:53
- This suggests they all stopped syncing at the same moment
- Likely indicates a **common backend service failure** that occurred on 2026-02-03 ~14:53

---

## Recommendations

### For Cities Master
1. 🔴 **CRITICAL**: Fix timestamp update logic to reflect current sync time
2. 🔍 **Investigate**: Why timestamps are frozen at 2026-02-03 14:53:18
3. 🔧 **Backend Review**: Verify sync service is actually running and updating data
4. ✅ **Reference**: Use Division/Agreement Master implementation as correct example

### For Application Team - URGENT
1. **CRITICAL INVESTIGATION REQUIRED**:
   - Three modules (Branch, ATM Cities, Cities) share identical bug
   - All show timestamps from 2026-02-03 ~14:52-14:53
   - Suggests **systematic sync service failure** affecting multiple modules
   - May indicate backend sync service crashed on 2026-02-03 and never recovered

2. **Immediate Actions**:
   - Check backend sync service status
   - Review logs from 2026-02-03 14:52-14:53 timeframe
   - Verify if sync API endpoints are responding correctly
   - Compare sync implementation between broken (Branch/ATM Cities/Cities) and working (Division/Agreement) modules

3. **Priority Fixes**:
   - **P0 (CRITICAL)**: Backend sync service investigation - affects 3+ modules
   - **P1 (Critical)**: Designation Master "Invalid Date" corruption
   - **P2 (High)**: Fix timestamp update for Branch, ATM Cities, Cities Masters
   - **P3 (Medium)**: Add Last Synced Date to Employee, Route, Weapon Masters

4. **Testing Strategy**:
   - Test all remaining master modules for same issue
   - Verify sync service health across entire application
   - Implement monitoring for timestamp staleness
   - Add alerting when sync fails to update

### Root Cause Hypothesis
The fact that three separate modules show timestamps from the same 23-second window (14:52:55 - 14:53:18 on 2026-02-03) strongly suggests:
- A shared sync service was functioning until 2026-02-03 ~14:53
- Service stopped/crashed at that time
- Frontend continues to display cached/stale data
- Sync All button doesn't trigger actual backend updates
- Other modules (Division, Agreement) may use different sync mechanism

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
Cities Master has the **same critical timestamp bug as Branch and ATM Cities Masters**, showing frozen data from 2026-02-03 14:53:18 instead of the current date (2026-02-04). This is now confirmed as a **systematic issue affecting 3 modules**, likely indicating a **backend sync service failure**. Both test cases fail - TC_CITIES_MASTER_001 due to old timestamps, TC_CITIES_MASTER_002 due to row counting issue.

**Overall Status**: ❌ **FAILED** - Part of systematic sync failure affecting multiple modules

**CRITICAL Finding**: 3 out of 9 tested masters (Branch, ATM Cities, Cities) show identical timestamp freeze at 2026-02-03 ~14:52-14:53, indicating **CRITICAL backend sync service failure** requiring immediate investigation.

**Recommendation**: STOP testing additional masters and **IMMEDIATELY investigate backend sync service** before continuing. This is likely affecting more modules than currently tested.
