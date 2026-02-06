# Collection Type Master Test Cases

## Module: Masters → Collection Type Master
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
| TC_COLLECTION_TYPE_001 | Verify Collection Type Master page navigation and form display | High | Not Executed |
| TC_COLLECTION_TYPE_002 | Verify duplicate code validation error message | High | Not Executed |
| TC_COLLECTION_TYPE_003 | Verify complete CRUD workflow - Create, Edit/Deactivate, Show All, Delete | High | Not Executed |

---

## Detailed Test Cases

### TC_COLLECTION_TYPE_001: Verify Collection Type Master page navigation and form display

**Objective**: Verify that the Collection Type Master page can be accessed and the Create Collection Type form is displayed with all required fields.

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Masters menu

**Test Steps**:
1. Navigate to the application URL
2. Login with valid credentials
3. Click on "Masters" menu button
4. Click on "Collection Type" menu item
5. Verify the page loads successfully with URL containing "collection_type"
6. Verify "Create Collection Type" form is displayed
7. Verify form fields are visible: Code, Name, Remark
8. Verify Save and Clear buttons are visible
9. Verify Collection Types list/grid is displayed below the form

**Expected Results**:
- Collection Type menu item is visible and clickable
- Page loads successfully with correct URL
- Create Collection Type form is visible with heading
- Form displays three input fields: Code, Name, Remark
- Active checkbox is visible and checked by default
- Save and Clear buttons are functional
- Collection Types list displays existing records

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_COLLECTION_TYPE_002: Verify duplicate code validation error message

**Objective**: Verify that the system prevents creation of Collection Type with duplicate code and displays appropriate error message "This code already exists."

**Preconditions**:
- User is on the Collection Type Master page
- Test data with unique code is prepared

**Test Steps**:
1. Navigate to Collection Type Master page
2. Create first collection type with code "DUP_[timestamp]"
3. Enter name "First Collection Type"
4. Enter remark "First remark"
5. Click Save button
6. Wait for record to be created
7. Try to create second collection type with same code "DUP_[timestamp]"
8. Enter name "Duplicate Collection Type"
9. Enter remark "Duplicate remark"
10. Click Save button
11. Verify error message "This code already exists." is displayed
12. Verify duplicate record is NOT added to the list

**Expected Results**:
- First collection type is created successfully
- Form accepts input for duplicate code attempt
- System validates duplicate code on save
- Error message "This code already exists." is displayed clearly to user
- Error message is visible without needing to scroll
- Duplicate record is not saved to database
- Form retains entered values for correction
- Original record remains unchanged

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_COLLECTION_TYPE_003: Verify complete CRUD workflow - Create, Edit/Deactivate, Show All, Delete

**Objective**: Verify the complete CRUD (Create, Read, Update, (inacive)) workflow for Collection Type including create, edit/deactivate, show all inactive records, and delete functionality.

**Preconditions**:
- User is on the Collection Type Master page
- Test data with unique code is prepared
- 3-dot menu icon exists for each record

**Test Steps**:

**Part 1: Create Collection Type**
1. Navigate to Collection Type Master page
2. Create new collection type with code "CRUD_[timestamp]"
3. Enter name "CRUD Test Collection Type"
4. Enter remark "CRUD workflow test"
5. Verify Active checkbox is checked by default
6. Click Save button
7. Verify success notification is displayed
8. Verify new record appears in the grid

**Part 2: Edit and Deactivate Collection Type**
9. Locate the created collection type in the grid (may need pagination)
10. Click on 3-dot menu icon for the record
11. Verify "Edit" option is visible in the dropdown menu
12. Click "Edit" option
13. Verify edit form opens with existing data pre-filled
14. Uncheck the "Active" checkbox to deactivate
15. Click "Update" button
16. Verify success notification is displayed
17. Verify deactivated record disappears from default list view

**Part 3: Show All Collection Types (Including Inactive)**
18. Locate "All Collection Types" checkbox/filter
19. Click "All Collection Types" to show inactive records
20. Verify the list refreshes and displays more records
21. Verify previously deactivated collection type is NOW visible
22. Verify record shows "Inactive" or unchecked status

**Part 4: Inactive Collection Type**
23. With "All Collection Types" still selected
24. Locate the deactivated collection type in the list
25. Click on 3-dot menu icon for the record
26. Verify "inactive" option is visible in the dropdown menu
27. Click "inactive" option
29. Verify record is removed from the list
30. Verify inactive record appears after checked with "All Collection Types" selected

**Expected Results**:

**Create:**
- Form accepts all input values
- Save button is enabled and clickable
- Success notification appears after save
- New record appears in grid with entered values
- Form clears after successful creation

**Edit/Deactivate:**
- 3-dot menu is clickable and displays options
- Edit option opens form with existing data
- Active checkbox can be unchecked
- Update button saves changes
- Success notification confirms update
- Deactivated record disappears from default view

**Show All:**
- "All Collection Types" filter is visible and toggleable
- List refreshes when filter is applied
- Previously hidden inactive records become visible
- Grid displays both active and inactive records
- Status column shows correct status for each record

**Delete:**
- Delete option is visible in 3-dot menu
- Confirmation may appear (depending on implementation)
- Record is removed from database
- Deleted record no longer appears in any view
- No errors occur during deletion

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

## Test Data

**Login Credentials**:
- Username: chathura
- Password: Admin@1234

**Test Collection Types**:
- Navigation Test: Verify form fields only
- Duplicate Code Test: DUP_[timestamp]
- CRUD Workflow Test: CRUD_[timestamp]

**Test Environment Details**:
- Application URL: https://111.119.245.10:20081/
- Browser: Chromium (Chrome)
- Viewport: 1920x1080
- Timezone: Asia/Colombo (UTC+5:30)

---

## Notes
- Tests should be run in sequence to maintain data integrity
- Unique codes should be generated dynamically using timestamps
- Screenshots should be captured for error messages and notifications
- Wait for proper page loads and notifications before proceeding
- Grid may be paginated - use pagination buttons to find records
- 3-dot menu may require hover or direct click depending on implementation
- Clean up test data after execution if possible

---

## Expected Validations

### Form Validations:
- Code field is required
- Code must be unique (no duplicates)
- Name field is required
- Remark field is optional
- Active checkbox defaults to checked

### UI Validations:
- 3-dot menu appears for each record
- Edit and Delete options are visible in menu
- Active checkbox is toggleable
- Buttons (Save, Clear, Update) are appropriately enabled/disabled
- Pagination controls work correctly

### Notification Validations:
- Success notification on create
- Error notification "This code already exists." on duplicate code
- Success notification on update
- Success notification on delete (if implemented)
- Notifications are user-friendly and clear

### Data Validations:
- Created records appear in grid immediately
- Deactivated records disappear from default view
- "All Collection Types" shows both active and inactive records
- Deleted records are permanently removed
- Status changes are persisted correctly
