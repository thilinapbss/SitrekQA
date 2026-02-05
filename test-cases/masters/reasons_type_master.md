# Reasons Type Master Test Cases

## Module: Masters → Reasons Type Master
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
| TC_REASONS_TYPE_MASTER_001 | Verify Reasons Type Master page navigation and form display | High | Not Executed |
| TC_REASONS_TYPE_MASTER_002 | Verify Create Reason Type with unique code | High | Not Executed |
| TC_REASONS_TYPE_MASTER_003 | Verify duplicate code validation error | High | Not Executed |
| TC_REASONS_TYPE_MASTER_004 | Verify Edit functionality - Uncheck active reason type | High | Not Executed |
| TC_REASONS_TYPE_MASTER_005 | Verify inactive reason disappears from list | High | Not Executed |
| TC_REASONS_TYPE_MASTER_006 | Verify "All Reason Types" shows inactive reasons | High | Not Executed |
| TC_REASONS_TYPE_MASTER_007 | Verify Delete functionality with notification | High | Not Executed |

---

## Detailed Test Cases

### TC_REASONS_TYPE_MASTER_001: Verify Reasons Type Master page navigation and form display

**Objective**: Verify that the Reasons Type Master page can be accessed and Create Reason Type form is displayed.

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Masters menu

**Test Steps**:
1. Navigate to the application URL
2. Login with valid credentials
3. Click on "Masters" menu button
4. Click on "Reasons Type" menu item
5. Verify the page loads successfully
6. Verify "Create Reason Type" form is displayed
7. Verify form has required fields: Code, Name, Remark

**Expected Results**:
- Reasons Type menu item is visible and clickable
- Page loads successfully
- Create Reason Type form is visible
- Form displays three fields: Code, Name, Remark
- Reason Types list is displayed

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_REASONS_TYPE_MASTER_002: Verify Create Reason Type with unique code

**Objective**: Verify that a new Reason Type can be created successfully with a unique code.

**Preconditions**:
- User is on the Reasons Type Master page
- Test data with unique code is prepared

**Test Steps**:
1. Navigate to Reasons Type Master page
2. Enter a unique code in the "Code" field (e.g., "TEST001")
3. Enter reason type name in "Name" field (e.g., "Test Reason Type")
4. Enter remark in "Remark" field (e.g., "Automated test reason")
5. Click "Save" button
6. Verify success message/notification is displayed
7. Verify new reason type appears in the list

**Expected Results**:
- Code, Name, and Remark fields accept input
- Save button is clickable
- Success notification is displayed
- New reason type is added to the list
- Form is cleared after successful creation

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_REASONS_TYPE_MASTER_003: Verify duplicate code validation error

**Objective**: Verify that system prevents creation of Reason Type with duplicate code and displays error message.

**Preconditions**:
- User is on the Reasons Type Master page
- At least one reason type already exists with code "TEST001"

**Test Steps**:
1. Navigate to Reasons Type Master page
2. Enter an existing code in the "Code" field (e.g., "TEST001")
3. Enter reason type name
4. Click "Save" button
5. Verify error message is displayed
6. Verify error message indicates "cannot create" or "duplicate code"
7. Verify record is NOT added to the list

**Expected Results**:
- System validates duplicate code
- Error message is displayed clearly
- Error message indicates duplicate/cannot create
- Record is not saved
- Form retains entered values for correction

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_REASONS_TYPE_MASTER_004: Verify Edit functionality - Uncheck active reason type

**Objective**: Verify that user can edit a reason type and uncheck it (deactivate) successfully.

**Preconditions**:
- User is on the Reasons Type Master page
- At least one active reason type exists in the list
- Reason type has a 3-dot menu icon

**Test Steps**:
1. Navigate to Reasons Type Master page
2. Locate a reason type in the list
3. Click on the 3-dot icon (action menu) of the reason type
4. Verify "Edit" option is visible in the menu
5. Click on "Edit" option
6. Verify edit form opens with existing data
7. Locate the checkbox (Active/Status checkbox)
8. Verify checkbox is currently checked
9. Click to uncheck the checkbox
10. Click "Update" button
11. Verify success notification is displayed

**Expected Results**:
- 3-dot menu icon is clickable
- Edit option appears in the menu
- Edit form opens with pre-filled data
- Checkbox is visible and checked
- User can uncheck the checkbox
- Update button is enabled
- Success message is displayed after update

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_REASONS_TYPE_MASTER_005: Verify inactive reason disappears from list

**Objective**: Verify that after unchecking/deactivating a reason type, it disappears from the default list view.

**Preconditions**:
- User has just unchecked/deactivated a reason type (from TC_004)
- "All Reason Types" filter is NOT selected

**Test Steps**:
1. After unchecking and updating a reason type
2. Close the edit form/dialog
3. Verify the list refreshes
4. Search for the deactivated reason type in the list
5. Verify the deactivated reason type is NOT visible in the list
6. Verify only active reason types are displayed

**Expected Results**:
- List refreshes automatically after update
- Deactivated reason type is NOT visible in default view
- Only active reason types are shown
- List count decreases by 1

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_REASONS_TYPE_MASTER_006: Verify "All Reason Types" shows inactive reasons

**Objective**: Verify that when "All Reason Types" checkbox is selected, both active and inactive reasons are displayed.

**Preconditions**:
- User is on the Reasons Type Master page
- At least one reason type has been deactivated
- "All Reason Types" checkbox/filter exists on the page

**Test Steps**:
1. Navigate to Reasons Type Master page
2. Verify default view shows only active reason types
3. Locate "All Reason Types" checkbox
4. Click on "All Reason Types" checkbox to select it
5. Verify the list refreshes
6. Search for the previously deactivated reason type
7. Verify the deactivated reason type is NOW visible in the list
8. Verify both active and inactive reasons are displayed

**Expected Results**:
- "All Reason Types" checkbox is visible
- Checkbox is clickable
- List refreshes when checkbox is selected
- Previously hidden (inactive) reason types appear
- Both active and inactive records are visible
- List count increases

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_REASONS_TYPE_MASTER_007: Verify Delete functionality with notification

**Objective**: Verify that user can delete a reason type and appropriate notification is displayed.

**Preconditions**:
- User is on the Reasons Type Master page
- "All Reason Types" is selected to view all records
- At least one reason type exists that can be deleted

**Test Steps**:
1. Navigate to Reasons Type Master page
2. Select "All Reason Types" to view all records
3. Locate a reason type to delete
4. Click on the 3-dot icon (action menu)
5. Verify "Delete" option is visible in the menu
6. Click on "Delete" option
7. If confirmation dialog appears, confirm deletion
8. Verify success notification is displayed
9. Verify notification message indicates successful deletion
10. Verify the deleted record is removed from the list
11. Verify list count decreases

**Expected Results**:
- 3-dot menu shows Delete option
- Delete option is clickable
- Confirmation dialog may appear (if implemented)
- Success notification is displayed after deletion
- Notification message clearly indicates deletion success
- Deleted record is removed from the list
- List refreshes automatically

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

## Test Data

**Login Credentials**:
- Username: chathura
- Password: Admin@1234

**Test Reason Types**:
- Unique Code: AUTO_TEST_001 (timestamp-based for uniqueness)
- Duplicate Code: Use existing code from list
- Reason Type Name: Automated Test Reason Type

**Test Environment Details**:
- Application URL: https://111.119.245.10:20081/
- Browser: Chromium (Chrome)
- Viewport: 1920x1080
- Timezone: Asia/Colombo (UTC+5:30)

---

## Test Flow Diagram

```
1. Navigate → Reasons Type Master
2. Create → New Reason Type (Unique Code) ✓
3. Create → Duplicate Code → Error ✗
4. Edit → Uncheck (Deactivate) ✓
5. Verify → Disappears from list ✓
6. Check → "All Reason Types" ✓
7. Verify → Reappears in list ✓
8. Delete → Record ✓
9. Verify → Notification & Removal ✓
```

---

## Notes
- Tests should be run in sequence to maintain data integrity
- Unique codes should be generated dynamically using timestamps
- Screenshots should be captured for notifications
- Wait for proper notifications before proceeding to next step
- Clean up test data after execution if possible

---

## Expected Validations

### Form Validations:
- Code field is required
- Code must be unique
- Name field is required

### UI Validations:
- 3-dot menu appears on hover or click
- Edit and Delete options are visible in menu
- Checkboxes are toggleable
- Buttons are enabled/disabled appropriately

### Notification Validations:
- Success notification on create
- Error notification on duplicate code
- Success notification on update
- Success notification on delete
- Notifications auto-dismiss or have close button
