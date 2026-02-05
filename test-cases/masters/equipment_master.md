# Equipment Master Test Cases

## Test Case Overview
This document contains test cases for Equipment Master module functionality.

---

## TC_EQUIPMENT_MASTER_001: Navigation and Form Verification

### Test Objective
Verify that user can successfully navigate to Equipment Master and all form fields are accessible.

### Pre-conditions
- User is logged into the system
- User has access to Masters menu

### Test Steps
1. Click on "Masters" button in the navigation menu
2. Click on "Equipment" menu item
3. Verify page navigation to Equipment Master
4. Verify form fields are visible and accessible

### Expected Results
- ✓ Equipment Master page loads successfully
- ✓ URL contains "equipment_master" or similar
- ✓ All form fields are visible and accessible
- ✓ Save button is visible

### Test Data
```json
{
  "module": "Equipment Master",
  "navigation": "Masters → Equipment"
}
```

---

## TC_EQUIPMENT_MASTER_002: Create Equipment

### Test Objective
Verify that user can successfully create a new Equipment record with static test data.

### Pre-conditions
- User is logged into the system
- User has access to Equipment Master

### Test Steps
1. Navigate to Equipment Master
2. Fill in Equipment details with static test data
3. Click "Save" button
4. Verify success notification appears
5. Verify Equipment is saved successfully

### Expected Results
- ✓ Equipment is created successfully with notification
- ✓ Form accepts all required field values
- ✓ Save operation completes without errors

### Test Data
```json
{
  "equipment": {
    "name": "Test Equipment Alpha",
    "serialNumber": "SN-TEST-001",
    "description": "Standard test equipment for automation",
    "active": true
  }
}
```

### Notes
- Uses **static/hardcoded test data** - NOT timestamp-based
- Same test data used across multiple test runs
- Test data should be manually cleared between runs if uniqueness is required

---

## Test Execution Summary

| Test Case ID | Test Case Name | Priority | Status |
|--------------|----------------|----------|--------|
| TC_EQUIPMENT_MASTER_001 | Navigation and Form Verification | High | Pending |
| TC_EQUIPMENT_MASTER_002 | Create Equipment | High | Pending |

---

## Test Environment
- Browser: Chromium
- Test Framework: Playwright
- Page Object: EquipmentMasterPage.ts
- Test File: tests/2_23_equipment-master.spec.ts
