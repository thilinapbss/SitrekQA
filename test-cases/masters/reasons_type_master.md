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
| TC_REASONS_TYPE_MASTER_001 | Verify Reasons Type Master page navigation and form display | High | Passed |
| TC_REASONS_TYPE_MASTER_002 | Verify duplicate code validation error | High | Passed |
| TC_REASONS_TYPE_MASTER_003 | Verify complete CRUD workflow - Create, Edit/Deactivate, Show All, Delete | High | In Progress |

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

### TC_REASONS_TYPE_MASTER_002: Verify duplicate code validation error

**Objective**: Verify that system prevents creation of Reason Type with duplicate code and displays error message "This code already exists."

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Reasons Type Master page

**Test Steps**:
1. Navigate to Reasons Type Master page
2. Create a reason type with code "DUP_[timestamp]" 
3. Wait for record to be created
4. Try to create another reason type with the same code "DUP_[timestamp]"
5. Verify error message is displayed: "This code already exists."
6. Verify duplicate record is NOT added to the list

**Expected Results**:
- First record is created successfully
- System validates duplicate code on second attempt
- Error message "This code already exists." is displayed clearly
- Duplicate record is not saved
- Form retains entered values for correction

**Actual Results**: 
- ✓ First record created successfully
- ✓ Duplicate code validation working
- ✓ Error message "This code already exists." displayed correctly
- ✓ Duplicate record not created

**Test Status**: Passed

---

### TC_REASONS_TYPE_MASTER_003: Verify complete CRUD workflow - Create, Edit/Deactivate, Show All,

**Objective**: Verify complete workflow including Create, Edit (deactivate), Show All inactive records, functionality.

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Reasons Type Master page

**Test Steps**:
1. Navigate to Reasons Type Master page
2. **CREATE**: Create a new reason type with unique code "EDIT_[timestamp]"
3. Verify record appears in the grid
4. **EDIT/DEACTIVATE**: 
   - Click on the 3-dot icon for the created record (may need to navigate through pages)
   - Click "Edit" option
   - Uncheck the "Active" checkbox
   - Click "Update" button
   - Verify success notification is displayed
5. **VERIFY INACTIVE**: 
   - Verify the deactivated record disappears from default view
   - Verify only active records are shown
6. **SHOW ALL**: 
   - Click on "All Reason Types" checkbox
   - Verify the deactivated record now appears in the list
   - Verify both active and inactive records are visible
7. **DELETE**:
   - Click on the 3-dot icon for the deactivated record
   - Click "inactive" option
   - Verify record is removed from the list


**Expected Results**:
- Record is created successfully
- 3-dot menu is accessible (may be on different pages due to pagination)
- Edit form opens with pre-filled data
- Active checkbox can be unchecked
- Update is successful with notification
- Deactivated record disappears from default view
- "All Reason Types" filter shows inactive records
- Delete functionality removes the record
- All operations complete without errors

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: In Progress

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
Test Case 1: Navigation
1. Navigate → Reasons Type Master
2. Verify → Form Display ✓

Test Case 2: Duplicate Validation
1. Create → Reason Type (First) ✓
2. Create → Duplicate Code → Error ✗
3. Verify → Error Message: "This code already exists." ✓

Test Case 3: Complete CRUD Workflow
1. Create → New Reason Type (Unique Code) ✓
2. Edit → Uncheck (Deactivate) ✓
3. Verify → Disappears from list ✓
4. Check → "All Reason Types" ✓
5. Verify → Reappears in list ✓
6. deacivate → Record ✓
7. Verify → Record Removed ✓
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
