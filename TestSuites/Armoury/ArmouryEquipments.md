# Armory Equipments - Test Cases

## Test Suite Information
- **Module**: Armory → Armory Equipments
- **Feature**: Armory equipment assignment, weapon allocation, equipment tracking, and seals management
- **Priority**: High
- **Test Type**: Functional Testing / Integration Testing
- **Created Date**: February 10, 2026

---

## TC_ARMORY_001: Armory Equipment Assignment with Weapon and Equipment Allocation

### Test Objective
Verify that users can access the Armory Equipments page, assign weapons and equipment to job cards, manage seal ranges, issue trust receipts, and complete the issue process with proper validations and notifications.

### Pre-conditions
- User must have valid login credentials
- Application is accessible
- User is on the login page
- Job Card must exist with "Pending" status and "Not Started" trip status
- Armed Guards and Vehicle Commanders must be assigned to the job card
- Vault equipments must be available for assignment
- Weapons and equipment items must be available in the system
- User must have Armory permission to access the module

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
- **Weapon Allocation Data:** Weapon license numbers and assignment details
- **Equipment Allocation Data:** Equipment tag numbers, quantities, and assignments
- **Seal Management Data:** From and To seal ranges
- **Expected Results:** List of validation points for test completion
- **Pre-conditions:** All requirements that must be met before test execution
- **Validation Rules:** Data type and format requirements for each field

⚠️ **REMINDER: When modifying test data**
Update only the `test-data/testdata.json` file. Do NOT manually update values in this markdown document. The test steps reference the JSON file as the authoritative source.

✅ **DATA AVAILABILITY & SUBSTITUTION**
If any test data value (weapon, equipment, seal range, etc.) is NOT available in the system:
- Use a similar or alternative value that exists in the system
- Document the substitution in the test report under "Data Substitutions"
- Update the `test-data/testdata.json` file with the available value
- Test execution should proceed with the substitute value
- This is **NOT** considered a test failure, but a data adaptation
- The core functionality being tested remains valid regardless of the specific data used

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials (**credentials.creator.username** / **credentials.creator.password**) and click Enter | User successfully logs in and reaches the dashboard |
| 2 | Using side navigation bar, click on "Armory" menu | "Armory" menu expands and shows submenu items |
| 3 | Click on "Armory Equipments" from the expanded menu | Armory Equipments page loads successfully and displays job card list |
| 4 | Verify the Job Cards Grid Display | Verify that in the Armory Equipments page, the list of job cards are displayed with the following columns: #Job Card Number, #Route Name, #Created Date, #Status, #Trip Status |
| 5 | Select Job Card from Grid | In the grid, locate and click on the verified row where Status = "Pending" and Trip Status = "Not Started" | Job Card row is selected and highlighted; user is directed to the Assign Armory page |
| 6 | Verify Team Assignments Display | Verify that #Assigned Armed Guards are correctly displayed | Armed Guards information is displayed with their details |
| 7 | Verify Vehicle Assignment | Verify that #Assigned Vehicle Commanders are correctly displayed | Vehicle Commanders information is displayed and visible |
| 8 | Verify Vault Equipments | Verify that the assigned #Vault Equipments are displayed with quantities | Vault Equipments are listed with their respective quantities |
| 9 | Add Weapon - Create New Row | Click on the "Add Weapon" button | A new row is added to the weapon table |
| 10 | Add Weapon - Enter License Number | double Click on the added row's "License Number" column and type **TC_ARMORY_001.weaponAllocation.licenseNumber** and click Enter | The system automatically fills the weapon name and serial number based on the license number |
| 11 | Assign Weapon to Guard | Double click on the "Issued To" column of the weapon row and select **TC_ARMORY_001.weaponAllocation.issuedToGuard** from the dropdown | Guard is selected and the "Watcher Permit" column is automatically populated |
| 12 | Verify Watcher Permit Auto-Fill | Verify that the "Watcher Permit" column is automatically filled for the selected guard | Watcher Permit information is displayed correctly |
| 13 | Add Equipment - Create New Row(s) | Click on the "Add Equipment" button **TC_ARMORY_001.equipmentAllocation.count** times (based on equipment count) | New row(s) are added to the equipment table based on the number of clicks |
| 14 | Add Equipment - Enter Mobile Tag | Double click on the "Tag Number" column of the first equipment row and add **TC_ARMORY_001.equipmentAllocation.MobileTag** | The system automatically fills the equipment name (Mobile) and type |
| 15 | Add Equipment - Enter Body Camera Tag | Double click on the "Tag Number" column of the second equipment row and add **TC_ARMORY_001.equipmentAllocation.BodyCameraTag** | The system automatically fills the equipment name (Body Camera) and type |
| 16 | Set Mobile Issued Count | Double click on the "Issued Count" column of the Mobile row and type **1** | Issued Count for Mobile is set to 1 |
| 17 | Set Body Camera Issued Count | Double click on the "Issued Count" column of the Body Camera row and type **1** | Issued Count for Body Camera is set to 1 |
| 18 | Verify Equipment Display | Verify that all selected equipment are displayed correctly in the "Equipment Allocation" table with their tag numbers, names, types, and quantities | Equipment table displays all allocated equipment with correct details |
| 19 | Manage Seals - From Seal | In the Seals Management section, click on the "From Seal" field and enter **TC_ARMORY_001.sealManagement.fromSeal** (e.g., 10000) | From Seal value is entered successfully |
| 20 | Manage Seals - To Seal | Click on the "To Seal" field and enter **TC_ARMORY_001.sealManagement.toSeal** (e.g., 10010) | To Seal value is entered successfully |
| 21 | Manage Seals - Add Seals | Click the "Add" button in the Seals Management section | Seals are added to the seal management table with the range displayed |
| 22 | Verify Seals Added | Verify that the seals are added to the seal management table with the correct range (**TC_ARMORY_001.sealManagement.fromSeal** - **TC_ARMORY_001.sealManagement.toSeal**) | Seals range is displayed in the seal management table |
| 23 | Issue Trust Receipt | Click on the "Issue Trust Receipt" button before completing the issue | Trust receipt is generated and displayed; no print dialog appears |
| 24 | Verify Trust Receipt | Verify that the trust receipt is generated with all assigned details (weapons, equipment, seals) | Trust receipt contains complete allocation information |
| 25 | Complete Issue | Click on the "Complete Issue" button | Issue process is completed successfully |
| 26 | Verify Completion Notification | Verify that a notification confirming the successful completion of the issue is displayed | Success notification appears on the screen |

### Expected Results
- User can successfully navigate to the Armory Equipments page
- Job Card list is displayed with all required columns
- Correct job card can be selected with "Pending" status and "Not Started" trip status
- Team assignments (Armed Guards and Vehicle Commanders) are displayed correctly
- Vault equipments are visible with quantities
- Weapons can be added and assigned to armed guards with automatic name and serial number population
- Weapons are correctly assigned with watcher permit auto-fill functionality
- Equipment can be added with tag numbers and automatic name/type population
- Equipment quantities (Issued Count) can be set correctly for different equipment types
- Seals can be added with proper range values (From Seal to To Seal)
- Trust receipt is generated with all assignment details
- Issue process can be completed successfully
- Completion notification is displayed
- Job card status is updated from "Pending" to "Completed"
- Job card information is recorded for future reference

### Reference Data from JSON

| Field | Value |
|-------|-------|
| **User Credentials** | See test-data/testdata.json |
| **Job Card Number** | See test-data/testdata.json |
| **Route Name** | See test-data/testdata.json |
| **Weapon License Number** | See test-data/testdata.json (TC_ARMORY_001.weaponAllocation.licenseNumber) |
| **Weapon Name** | See test-data/testdata.json (Auto-populated) |
| **Serial Number** | See test-data/testdata.json (Auto-populated) |
| **Armed Guard Assignment** | See test-data/testdata.json (TC_ARMORY_001.weaponAllocation.issuedToGuard) |
| **Watcher Permit** | See test-data/testdata.json (Auto-populated) |
| **Mobile Tag** | See test-data/testdata.json (TC_ARMORY_001.equipmentAllocation.MobileTag) |
| **Body Camera Tag** | See test-data/testdata.json (TC_ARMORY_001.equipmentAllocation.BodyCameraTag) |
| **Issued Count (Mobile)** | 1 |
| **Issued Count (Body Camera)** | 1 |
| **From Seal** | See test-data/testdata.json (TC_ARMORY_001.sealManagement.fromSeal) |
| **To Seal** | See test-data/testdata.json (TC_ARMORY_001.sealManagement.toSeal) |
| **Initial Status** | "Pending" |
| **Final Status** | "Completed" |



### Test Artifacts
- Screenshots of Armory Equipments page load
- Job Card list view with grid display
- Team assignment verification (Armed Guards and Vehicle Commanders)
- Vault equipments assignment display
- Weapon allocation form with auto-filled details
- Equipment allocation table with tag numbers and quantities
- Seals Management section with seal ranges
- Generated Trust Receipt document
- Completion notification screenshot
- Final job card status in the system
- Updated job card entry in the list

### Notes
- Job Card must be in "Pending" status with "Not Started" trip status to be selectable
- Weapon license numbers must exist in the system for auto-population of name and serial number
- Equipment tag numbers must be valid and exist in the system inventory
- Watcher permit is automatically populated based on the selected armed guard
- Seal ranges must be sequential and properly formatted (From Seal < To Seal)
- Trust receipt should contain complete job card and allocation details
- Completion of issue updates the job card status in the system
- Role-based access control applies: Armory assignment permission required
- Job card cannot be reassigned once issue is completed

---

## Related Test Cases
- **TC_JOB_CARD_001**: Job Card creation and team allocation (Pre-requisite)
- **TC_ARMORY_002**: Armory Equipment Reassignment (Future)
- **TC_ARMORY_003**: Armory Equipment Return and Handover (Future)
