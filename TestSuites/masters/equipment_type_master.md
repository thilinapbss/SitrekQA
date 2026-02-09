# Equipment Type Master Test Cases

## Test Case Overview
This document contains test cases for Equipment Type Master module functionality.

---

## TC_EQUIPMENT_TYPE_MASTER_001: Navigation and Form Verification

### Test Objective
Verify that user can successfully navigate to Equipment Type Master and all form fields are accessible.

### Pre-conditions
- User is logged into the system
- User has access to Masters menu

### Test Steps
1. Click on "Masters" button in the navigation menu
2. Click on "Equipment Type" menu item
3. Verify page navigation to Equipment Type Master
4. Verify form fields are visible:
   - Name textbox
   - Department dropdown
   - Remarks textbox
   - Save button

### Expected Results
- ✓ Equipment Type Master page loads successfully
- ✓ URL contains "equipment_type_master" or similar
- ✓ All form fields (Name, Department, Remarks) are visible and accessible
- ✓ Save button is visible

### Test Data
```json
{
  "module": "Equipment Type Master",
  "navigation": "Masters → Equipment Type"
}
```

---

## TC_EQUIPMENT_TYPE_MASTER_002: Create and Deactivate Equipment Type

### Test Objective
Verify complete workflow: Create Equipment Type → Deactivate using 3-dot menu → Verify it disappears from the list

### Pre-conditions
- User is logged into the system
- User has access to Equipment Type Master
- At least one department exists in the system

### Test Steps
1. Navigate to Equipment Type Master
2. Fill in Equipment Type details:
   - Name: "EQUIP_AUTO_[timestamp]"
   - Department: Select any available department from dropdown
   - Remarks: "Equipment Type created by automation test [timestamp]"
3. Click "Save" button
4. Verify success notification appears
5. Wait for page to update with new record
6. Locate the newly created Equipment Type in the grid (may require pagination)
7. Click on 3-dot menu (more options) for the created Equipment Type
8. Click "Edit" option from the menu
9. Uncheck "Active" checkbox to deactivate
10. Click "Update" button
11. Verify update success notification
12. Verify the Equipment Type disappears from the active list

### Expected Results
- ✓ Equipment Type is created successfully with notification "Equipment Type Created Successfully"
- ✓ Created Equipment Type appears in the grid
- ✓ 3-dot menu opens successfully
- ✓ Edit option is available and clickable
- ✓ Active checkbox can be unchecked
- ✓ Equipment Type is updated successfully with notification "Equipment Type Updated Successfully"
- ✓ After deactivation, the Equipment Type disappears from the active list
- ✓ Equipment Type is no longer visible without "All Equipment Types" filter

### Test Data
```json
{
  "equipmentType": {
    "name": "EQUIP_AUTO_${timestamp}",
    "department": "First available from dropdown",
    "remarks": "Equipment Type created by automation test ${timestamp}",
    "active": true
  }
}
```

### Notes
- Equipment Type name uses **dynamically generated timestamp** (`Date.now()`) to ensure **100% uniqueness** - no hardcoded values
- Format: `EQUIP_AUTO_${timestamp}` where timestamp is milliseconds since epoch (e.g., EQUIP_AUTO_1770287236533)
- Department: **Automatically selects first available option** from dropdown (not hardcoded)
- Each test run creates a completely unique Equipment Type name
- After deactivation, Equipment Type can be viewed by checking "All Equipment Types" checkbox
- Test verifies that inactive Equipment Type is hidden by default

---

## Test Execution Summary

| Test Case ID | Test Case Name | Priority | Status |
|--------------|----------------|----------|--------|
| TC_EQUIPMENT_TYPE_MASTER_001 | Navigation and Form Verification | High | Pending |
| TC_EQUIPMENT_TYPE_MASTER_002 | Create and Deactivate Equipment Type | High | Pending |

---

## Test Environment
- Browser: Chromium
- Test Framework: Playwright
- Page Object: EquipmentTypeMasterPage.ts
- Test File: tests/2_22_equipment-type-master.spec.ts
