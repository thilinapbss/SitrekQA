# Test Case: Armory Equipment & Weapons Management (TC_ARMORY_001)

## Test Objective
To validate the complete Armory workflow including job card selection, weapon assignment with license validation, equipment tagging, bag management, seal generation, and trust receipt issuance in the SITREK system.

## Test Type
Functional Testing / Integration Testing

## Priority
High

## Pre-conditions
1. User must have Creator role with Armory access permissions
2. A Job Card must be previously created with Status: "Pending" (reference: TC_JOB_CARD_001 - Job Card: JC-06022026-0004-0016)
3. The Job Card must have:
   - Assigned Armed Guards (e.g., J D Kalumsiri with Permit: 1234)
   - Assigned Vehicle Commanders (e.g., J D Kalumsiri)
   - Assigned Equipment (Cash Counting Machine, Mobile, Body Camera)
4. Valid weapon license numbers must be available:
   - Valid License #272723 (Name: AK-47, Serial Number: SN-2726-001)
   - Invalid License #345534444444 (should display error)
5. Equipment items with tag numbers must be available:
   - Item 1: Tag #D002 (Type: Cash Counting Machine)
   - Item 2: Tag #D003 (Type: Mobile)
6. System must be accessible at: https://111.119.245.10:20081

---

## Test Data

### User Credentials
| Field | Value |
|-------|-------|
| Username | chathura |
| Password | Admin@1234 |
| Role | Creator |

### Weapon Details - Test Case 1 (Invalid)
| Field | Value |
|-------|-------|
| License Number | #345534444444 |
| Expected Result | Error message should display (Invalid license) |

### Weapon Details - Test Case 2 (Valid)
| Field | Value |
|-------|-------|
| License Number | #272723 |
| Weapon Name | AK-47 |
| Serial Number | SN-2726-001 |
| Issued To | 1st person from dropdown |

### Equipment Items
| Item # | Tag Number | Type | Expected Name |
|--------|-----------|------|-------------------|
| 1 | #D002 | Equipment | Cash Counting Machine |
| 2 | #D003 | Equipment | Mobile |

### Bag Management
| Bag Type | Issued Count |
|----------|--------------|
| Small Bags | 2 |
| Large Bags | 2 |

### Seal Management
| Field | Value |
|-------|-------|
| From Seal | 1000004 |
| To Seal | 1000008 |
| Expected Seals Generated | 1000004, 1000005, 1000006, 1000007, 1000008 (5 seals) |

### Job Card Reference
| Field | Value |
|-------|-------|
| Job Card No | JC-06022026-0004-0016 |
| Route | Nation Trust Kelaniya - Colombo |
| Status | Pending |
| Assigned Armed Guards | J D Kalumsiri (Permit: 1234) |
| Assigned Vehicle Commanders | J D Kalumsiri (x2) |
| Assigned Equipment | Cash Counting Machine (Qty: 1), Mobile (Qty: 1), Body Camera (Qty: 1) |

---

## Test Steps

### Step 1: User Authentication
**Action:** Login to the system with valid credentials  
- Enter Username: **chathura**  
- Enter Password: **Admin@1234**  
- Click **Enter** button  

**Expected Result:**
- ✓ User successfully authenticates
- ✓ Dashboard page loads
- ✓ User is redirected to main application interface
- ✓ Menu bar displays with "Armory" option visible in side navigation

**Status:** PASS / FAIL

---

### Step 2: Navigate to Armory Menu
**Action:** Using side navigation bar, click on **"Armory"** menu  

**Expected Result:**
- ✓ Armory menu expands
- ✓ Submenu items display including:
  - Armory Equipments
  - Weapons
  - (Other Armory-related options)
- ✓ Menu is fully visible and accessible

**Status:** PASS / FAIL

---

### Step 3: Access Job Card from Armory
**Action:** Click on **"Job Card"** from the expanded Armory menu  

**Expected Result:**
- ✓ Job Card page loads successfully
- ✓ Page displays with Armory context
- ✓ Previously created Job Cards are displayed in a grid/table format
- ✓ All column headers visible (Route, Job Card No, Status, Date, etc.)

**Status:** PASS / FAIL

---

### Step 4: Verify Job Card Details in Grid
**Action:** Verify that previously created Job Card details display in the grid with Status "Pending"  

**Expected Result:**
- ✓ Job Card **JC-06022026-0004-0016** is visible in grid
- ✓ Route displays: **Nation Trust Kelaniya - Colombo**
- ✓ Status shows: **Pending**
- ✓ Scheduled Date shows: **2026-02-06**
- ✓ Job Card is selectable (checkbox or row clickable)

**Status:** PASS / FAIL

---

### Step 5: Select Job Card Row
**Action:** Click on the Job Card row 

**Expected Result:**
- ✓ Row is selected (highlighted)
- ✓ Row details expand or navigate to detail page
- ✓ Job Card detail form loads with all sections visible:


**Status:** PASS / FAIL

---

### Step 6: Verify Assigned Armed Guards & Vehicle Commanders
**Action:** Verify that Assigned Armed Guards and Vehicle Commanders details display correctly  

**Expected Result:**
- ✓ **Armed Guards Section** displays:
  - Name: **J D Kalumsiri**
  - Permit Number: **1234**
- ✓ **Vehicle Commanders Section** displays:
  - Vehicle Commander 1: **J D Kalumsiri**
  - Vehicle Commander 2: **J D Kalumsiri**
- ✓ All names display correctly and match the Job Card creation data
- ✓ Permit information is visible and accurate

**Status:** PASS / FAIL

---

### Step 7: Verify Equipment Assignment
**Action:** Verify that Equipment assigned to the Job Card displays correctly with name and quantity  

**Expected Result:**
- ✓ **Equipment Section** displays all allocated equipment:
  - **Equipment 1:** Cash Counting Machine | Quantity: 1
  - **Equipment 2:** Mobile | Quantity: 1
  - **Equipment 3:** Body Camera | Quantity: 1
- ✓ All quantities match the Job Card creation data
- ✓ Equipment names display clearly
- ✓ Section is ready for tag assignment

**Status:** PASS / FAIL

---

### Step 8: Add Weapon - Invalid License (Error Validation)
**Action:**
1. In the **Weapons** section, click on **"Weapons"** button to add a new weapon row
2. Verify that a new row is added to the weapons table
3. Verify that the weapons button is disabled (grayed out)
4. Click on the **License Number** cell in the newly added row
5. Enter invalid License Number: **#345534444444**
6. Press **Enter** key

**Expected Result:**
- ✓ New row is added to Weapons table
- ✓ Weapons button becomes **disabled** (cannot add another row immediately)
- ✓ License Number cell is editable
- ✓ License number #345534444444 is entered successfully
- ✓ **Error message displays:** "Invalid license number" or "License not found" or similar validation error
- ✓ Row is rejected or remains in edit state showing error
- ✓ No automatic data population occurs (Name, Serial Number remain blank)
- ✓ System prevents saving with invalid license

**Status:** PASS / FAIL

---

### Step 9: Add Weapon - Valid License
**Action:**
1. Click on **"Weapons"** button again to add a new weapon row
2. Verify that a new row is added to the weapons table
3. Verify that the weapons button is disabled
4. Click on the **License Number** cell in the newly added row
5. Enter valid License Number: **#272723**
6. Press **Enter** key

**Expected Result:**
- ✓ New row is added to Weapons table
- ✓ Weapons button becomes disabled
- ✓ License Number cell accepts the value #272723
- ✓ System validates the license successfully
- ✓ **No error message** displays
- ✓ Validation passes and focus moves to next field or form updates
- ✓ Row is ready for automatic data population

**Status:** PASS / FAIL

---

### Step 10: Verify Auto-Populated Weapon Data
**Action:** Verify that weapon Name and Serial Number are automatically filled after valid license entry  

**Expected Result:**
- ✓ **Weapon Name** field auto-populates: **AK-47**
- ✓ **Serial Number** field auto-populates: **SN-2726-001**
- ✓ Both fields are read-only/disabled (display only, not editable)
- ✓ Data corresponds to License #272723
- ✓ Row displays complete information:
  - License: #272723
  - Name: AK-47
  - Serial Number: SN-2726-001
  - Status: Ready for assignment

**Status:** PASS / FAIL

---

### Step 11: Assign Weapon - Select Issued To
**Action:**
1. Click on the **"Issued To"** cell in the weapon row
2. A dropdown menu appears with a list of people
3. Select the **1st person** from the dropdown list

**Expected Result:**
- ✓ Issued To dropdown field opens and displays available personnel
- ✓ 1st person in dropdown is visible and selectable
- ✓ Selection is confirmed and field displays the selected person's name
- ✓ Weapon row now shows complete assignment:
  - License: #272723
  - Name: AK-47
  - Serial Number: SN-2726-001
  - Issued To: [1st Person Name]
  - Status: Assigned/Completed

**Status:** PASS / FAIL

---

### Step 12: Add Equipment Items - Item 1 with Tag Number
**Action:**
1. Scroll down to **Equipment Section** (below Weapons section)
2. Based on the number of assigned equipment (3 items), click the **"Equipment"** button
3. Verify that new rows are added to the equipment table (quantity should match equipment count)
4. Click on the **Tag Number** cell in the first newly added row
5. Enter **Tag Number: #D002**
6. Press **Enter** key

**Expected Result:**
- ✓ New rows are added to Equipment table (matching number of equipment: 3 rows for 3 items)
- ✓ Equipment button becomes disabled after each clicks
- ✓ First row is available for Tag Number entry
- ✓ Tag Number #D002 is entered and validated successfully
- ✓ **Type** field auto-populates: **Cash Counting Machine**
- ✓ **Equipment Name** field auto-populates: **Cash Counting Machine**
- ✓ Row displays:
  - Tag Number: #D002
  - Type: Cash Counting Machine
  - Name: Cash Counting Machine
  - Status: Assigned

**Status:** PASS / FAIL

---

### Step 13: Add Equipment Items - Item 2 with Tag Number
**Action:**
1. Click on the **Tag Number** cell in the second newly added row (equipment table)
2. Enter **Tag Number: #D003**
3. Press **Enter** key

**Expected Result:**
- ✓ Second row is available for Tag Number entry
- ✓ Tag Number #D003 is entered and validated successfully
- ✓ **Type** field auto-populates: **Mobile**
- ✓ **Equipment Name** field auto-populates: **Mobile**
- ✓ Row displays:
  - Tag Number: #D003
  - Type: Mobile
  - Name: Mobile
  - Status: Assigned
- ✓ Equipment table displays both items with auto-populated data

**Status:** PASS / FAIL

---

### Step 14: Manage Bags Assignment
**Action:**
1. Navigate to **Bags Section** (below Equipment section)
2. For **Small Bags** field, enter issued count: **2**
3. For **Large Bags** field, enter issued count: **2**

**Expected Result:**
- ✓ Bags section is visible and accessible
- ✓ **Small Bags** field accepts and displays: **2**
- ✓ **Large Bags** field accepts and displays: **2**
- ✓ Both entries are validated and accepted
- ✓ Visual indicator shows bags are allocated:
  - Small Bags: 2 (issued)
  - Large Bags: 2 (issued)
- ✓ Fields are saved without errors

**Status:** PASS / FAIL

---

### Step 15: Generate Seals
**Action:**
1. Navigate to **Seals Management Section**
2. Click on **"From Seal"** field and enter: **1000004**
3. Click on **"To Seal"** field and enter: **1000008**
4. Click on **"Generate Seals"** button
5. Verify that seals display in the grid below

**Expected Result:**
- ✓ Seals Management section is visible and accessible
- ✓ From Seal field accepts value: **1000004**
- ✓ To Seal field accepts value: **1000008**
- ✓ Generate Seals button is clickable and responsive
- ✓ **Seals table displays below with generated seals:**
  - Seal 1: **1000004**
  - Seal 2: **1000005**
  - Seal 3: **1000006**
  - Seal 4: **1000007**
  - Seal 5: **1000008**
- ✓ Total count: **5 seals generated**
- ✓ Each seal row shows with proper formatting and status

**Status:** PASS / FAIL

---

### Step 16: Complete Issue and Download Trust Receipt
**Action:**
1. Navigate to **Issue Section**
2. Verify that **"Issued To"** dropdown is available
3. From the **"Issued To"** dropdown, select the **1st person** from the list
4. **VERIFY:** Confirm that **Issue Trust Receipt has NOT been downloaded yet** (no file present)
5. Click on **"Complete Issue"** button
6. Verify that **Issue Trust Receipt is downloaded successfully**

**Expected Result:**
- ✓ Issue Section displays with all issue-related fields
- ✓ Issued To dropdown opens with list of people
- ✓ 1st person selected from dropdown successfully
- ✓ **Initial State Verified:** No trust receipt file has been downloaded (not previously available)
- ✓ Complete Issue button is visible, enabled, and clickable
- ✓ **After clicking "Complete Issue":**
  - ✓ Processing indicator displays (optional progress message)
  - ✓ Confirmation message: "Issue completed successfully" or similar
  - ✓ **Trust Receipt file is downloaded successfully**
  - ✓ File naming format: Issue_Trust_Receipt_[Job_Card_ID]_[Date].pdf or similar
  - ✓ **PDF Content includes:**
    - Job Card ID and details
    - Route and location information
    - Armed Guards names and permits
    - All assigned equipment and weapons
    - Bag management summary
    - Seal numbers and range
    - Issued To person's name and signature field
    - Issue date and time
    - Authorization details
  - ✓ Form records completion with timestamp
  - ✓ Section status updates to "Completed" or similar indicator

**Status:** PASS / FAIL

---

## Post-Conditions

1. Job Card status may update to reflect issuance (e.g., "In Progress", "Issued", or similar)
2. All assigned weapons, equipment, and seals are registered in the system database
3. Issue Trust Receipt is available for download/reference
4. Audit trail records all assignments and issuance with timestamps
5. Form becomes read-only or locked after completion

---

## Expected Overall Result

**Test Case Status:** ✅ **PASS** (All 16 steps completed successfully)

### Summary of Validations:
- ✓ Step 1: User authentication successful
- ✓ Step 2: Armory menu navigation successful
- ✓ Step 3: Job Card page loaded
- ✓ Step 4: Job Card with Status "Pending" found and verified
- ✓ Step 5: Job Card row selected and detail form loaded
- ✓ Step 6: Armed Guards and Vehicle Commanders data verified correctly
- ✓ Step 7: Equipment assignment verified with correct quantities
- ✓ Step 8: Invalid weapon license validation with error message
- ✓ Step 9: Valid weapon license added successfully
- ✓ Step 10: Weapon Name (AK-47) and Serial Number (SN-2726-001) auto-populated
- ✓ Step 11: Weapon assigned to 1st person via Issued To dropdown
- ✓ Step 12: Equipment tag #D002 added with auto-populated Type and Name
- ✓ Step 13: Equipment tag #D003 added with auto-populated Type and Name
- ✓ Step 14: Bags section updated (Small: 2, Large: 2)
- ✓ Step 15: Seals generated (5 seals from 1000004 to 1000008)
- ✓ Step 16: Issue completed and Trust Receipt downloaded successfully

---

## Notes & Observations

- **Weapon License Validation:** System properly validates license numbers and provides error feedback for invalid entries
- **Auto-Population:** Type and Name fields auto-populate from master data based on tag numbers and license numbers
- **Dropdown Integration:** All dropdown selections (Issued To, Personnel) function correctly
- **File Download:** Trust receipt is downloaded with appropriate naming and content
- **Error Handling:** System handles invalid inputs gracefully with error messages
- **Data Persistence:** All assigned data persists through the workflow
- **Button States:** Buttons (Weapons, Equipment) disable appropriately during data entry
- **Master Data Integration:** System integrates with master data for weapons, equipment, and personnel

---

## Defects/Issues Found (if any)

| Issue | Severity | Description | Status |
|-------|----------|-------------|--------|
| — | — | — | — |

---

## Approval & Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Tester | — | — | — |
| QA Lead | — | — | — |
| Developer | — | — | — |

---

**Test Case ID:** TC_ARMORY_001  
**Version:** 1.0  
**Created Date:** February 6, 2026  
**Last Updated:** February 6, 2026  
**Author:** QA Team  
**Application:** SITREK v0.3.0  
**Module:** Armory → Job Card Management
