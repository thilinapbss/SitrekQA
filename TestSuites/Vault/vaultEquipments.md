# Vault Equipments - Test Cases

## Test Suite Information
- **Module**: Vault → Vault Equipments
- **Feature**: Vault equipment assignment and management for job cards
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 10, 2026

---

## TC_VAULT_001: Vault Equipment Assignment and Management

### Test Objective
Verify that users can access the Vault Equipments page, select a job card, view assigned equipment, and add/manage new vault equipment items with proper validations and notifications.

### Pre-conditions
- User must have valid login credentials
- Application is accessible
- User is on the login page
- Job Card must exist with "Pending" status and "Not Started" trip status
- Cash Counting Machine and other vault equipment items must be available in the system
- User must have Vault permission to access the module

### Test Priority
**High**

### Test Data

**📁 Test Data Location:** `test-data/testdata.json` (Unified Test Data File)

⚠️ **IMPORTANT: Test Data Management**
All test data has been consolidated into a single file at `test-data/testdata.json`. This unified approach:
- Eliminates duplicate test data across test cases
- Provides centralized credential management
- Simplifies test data maintenance and updates
- When updating test data, update ONLY in `test-data/testdata.json`
- All references throughout the test documentation will automatically use the updated values

#### Test Data Summary
The complete test data for this test case includes:
- **User Credentials:** Username and password for test execution
- **Job Card Data:** Job card selection criteria and filtering
- **Equipment Data:** Equipment types (see **TC_VAULT_001.equipmentAllocation.initialEquipment.type** and **TC_VAULT_001.equipmentAllocation.newEquipment.type** in testdata.json)
- **Equipment Device:** Device selection (see **TC_VAULT_001.equipmentAllocation.newEquipment.device** in testdata.json)
- **Equipment Tag:** Equipment tag number (see **TC_VAULT_001.equipmentAllocation.newEquipment.tagNumber** in testdata.json)
- **Assignment Details:** Person to assign equipment to (see **TC_VAULT_001.equipmentAllocation.newEquipment.issuedTo** in testdata.json; if not provided, first item from dropdown will be selected and value will be updated in testdata.json)
- **Expected Results:** List of validation points for test completion
- **Pre-conditions:** All requirements that must be met before test execution

⚠️ **REMINDER: When modifying test data**
Update only the `test-data/testdata.json` file. Do NOT manually update values in this markdown document. The test steps reference the JSON file as the authoritative source.

✅ **DATA AVAILABILITY & SUBSTITUTION**
If any test data value is NOT available in the system:
- Use a similar or alternative value that exists in the system
- Document the substitution in the test report under "Data Substitutions"
- Update the `test-data/testdata.json` file with the available value
- Test execution should proceed with the substitute value
- This is **NOT** considered a test failure, but a data adaptation
- The core functionality being tested remains valid regardless of the specific data used

**🔄 DROPDOWN FIELDS - Empty/Missing Data Handling:**
For dropdown fields (Issued To, Type, Device, etc.):
- If test data is empty or not provided in testdata.json
- Or if the provided test data is not found in the system dropdown
- **Select the 1st item from the dropdown list**
- **Update the testdata.json file with the actual selected value**
- This ensures data consistency and facilitates future test runs
- All dropdown selections are captured and documented in the test data file

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials (**credentials.creator.username** / **credentials.creator.password**) and click Enter | User successfully logs in and reaches the dashboard |
| 2 | Using side navigation bar, click on "Vault" menu | "Vault" menu expands and shows submenu items |
| 3 | Click on "Vault Equipments" from the expanded menu | Vault Equipments page loads successfully and displays job card list |
| 4 | Verify the Job Cards Grid Display | Verify that in the Vault Equipments page, the list of job cards are displayed with the following columns: #Job Card Number, #Route Name, #Created Date, #Status, #Trip Status |
| 5 | Verify Job Card Status Criteria | In the grid, verify that job cards are displayed with Status = "Pending" and Trip Status = "Not Started" | Job cards matching the criteria are visible in the grid |
| 6 | Select Job Card from Grid | Click on a job card row with Status = "Pending" and Trip Status = "Not Started" | Job Card row is selected; user is directed to the Assign Vault Equipments page |
| 7 | Verify Initial Equipment Display | Verify that Cash Counting Machine is displayed as Equipment 1 with quantity 1 | Equipment 1 shows "Cash Counting Machine" with quantity "1" |
| 8 | Add New Equipment Row | Click on the "Add Equipment" button or similar control | A new empty row is added to the equipment grid |
| 9 | Select Equipment Type | Double click on the newly added row's "Type" column and select **TC_VAULT_001.equipmentAllocation.newEquipment.type** from the dropdown | Equipment type is selected and displayed in the Type column |
| 10 | Select Equipment Device | Double click on the newly added row's "Device" column and select **TC_VAULT_001.equipmentAllocation.newEquipment.device** from the dropdown | Equipment device is selected and displayed in the Device column |
| 11 | Enter Equipment Tag Number | Double click on the newly added row's "Tag Number" column and enter **TC_VAULT_001.equipmentAllocation.newEquipment.tagNumber** | Tag number is entered in the Tag Number column |
| 12 | Select Assigned Person | Double click on the "Issued To" column of the newly added row. If **TC_VAULT_001.equipmentAllocation.newEquipment.issuedTo** is provided in testdata.json, select that person. If not provided or data not found, select the first available person from the dropdown and update testdata.json with the selected value | The assigned person is selected and displayed in the Issued To column; testdata.json updated with actual selected value |
| 13 | Save Equipment Data | Click the "Save" button to save all equipment assignments | Success notification is displayed confirming data was saved successfully |
| 14 | Verify Save Notification | Verify that a success toast notification appears indicating data was saved | Toast notification displays success message and disappears after timeout |
| 15 | Generate Trust Receipt | Click the "Generate Trust Receipt" button | Trust Receipt is generated and system prepares the document for download |
| 16 | Verify Trust Receipt Download | Verify that the trust receipt file is downloaded to the default downloads folder with appropriate naming | Trust receipt file is received in the browser downloads with proper document format (PDF or applicable format) |

### Expected Results Summary
- User successfully navigates to Vault Equipments module
- Job card grid displays correctly with appropriate filter criteria
- Job card selection redirects to Assign Vault Equipments page  
- Initial equipment (Cash Counting Machine - Qty 1) is displayed
- New equipment row can be added to the grid
- Equipment type, device, tag number, and assigned person can be configured
- All changes are saved successfully with visual confirmation via notification
- Trust Receipt can be generated from the saved equipment assignment
- Trust Receipt file is downloaded to the browser's downloads directory with proper formatting

### Test Artifacts
- Screenshots of Vault Equipments page before and after equipment assignment
- Toast notification confirmation of successful save
- Generated Trust Receipt document (downloaded file)
- Trust Receipt filename and download location
- Test execution log capturing navigation and user interactions
- Test data values used (from testdata.json)
