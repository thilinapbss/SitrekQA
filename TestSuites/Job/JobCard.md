# Job Card - Test Cases

## Test Suite Information
- **Module**: Job → Job Card
- **Feature**: Job Card creation, team allocation, equipment assignment, and PDF generation
- **Priority**: High
- **Test Type**: Functional Testing / Integration Testing
- **Created Date**: February 6, 2026

---

## TC_JOB_CARD_001: Create Job Card with Team and Equipment Allocation

### Test Objective
Verify that users can create a job card from a selected job template, allocate team members and equipment, and generate a printable PDF job card with all assigned details.

### Pre-conditions
- User must have valid login credentials
- Application is accessible
- User is on the login page
- Job Template must exist and be in "Approved" status
- Master data for vehicles, drivers, commanders, staff, guards, and equipment must be available

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
- **Job Selection Data:** Job category, route, customer, location, job template, and other job details
- **Team Allocation Data:** Vehicle, driver, commanders, staff, and armed guards assignments
- **Equipment Allocation Data:** Multiple equipment items to be allocated to the job card
- **Expected Results:** List of validation points for test completion
- **Pre-conditions:** All requirements that must be met before test execution
- **Validation Rules:** Data type and format requirements for each field

⚠️ **REMINDER: When modifying test data**
Update only the `test-data/testdata.json` file. Do NOT manually update values in this markdown document. The test steps reference the JSON file as the authoritative source.

✅ **DATA AVAILABILITY & SUBSTITUTION**
If any test data value (route, customer, vehicle, staff member, equipment, etc.) is NOT available in the system:
- Use a similar or alternative value that exists in the system
- Document the substitution in the test report under "Data Substitutions"
- Update the `test-data/testdata.json` file with the available value
- Test execution should proceed with the substitute value
- This is **NOT** considered a test failure, but a data adaptation
- The core functionality being tested remains valid regardless of the specific data used

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials (**credentials.creator.username** / **credentials.creator.password**) and click enter | User successfully logs in and reaches the dashboard |
| 2 | Using side navigation bar, click on "Jobs" menu | "Jobs" menu expands and shows submenu items including "Job Template" and "Job Card" |
| 3 | Click on "Job Card" from the expanded menu | Job Card page loads successfully and displays available options |
| 4 | In the Job Category dropdown, select "Normal" | Job Category "Normal" is selected |
| 5 | In the Route dropdown, select "**commonData.route**" | Route is selected successfully and filters available jobs |
| 6 | In the "Select Jobs to Job Card" table, select the job by checking the checkbox for: Customer: **commonData.customer**, Location: **TC_JOB_CARD_001.jobSelectionData.location**, Template Name: **TC_JOB_CARD_001.jobSelectionData.jobTemplate**, Job Type: **TC_JOB_CARD_001.jobSelectionData.jobType**, Operation Type: **TC_JOB_CARD_001.jobSelectionData.operationType**, Agreement: **commonData.agreement** | Job is selected and highlighted in the table |
| 7 | In the "Create Job Card" section, select a vehicle from the "Vehicle" dropdown and select "**TC_JOB_CARD_001.vehicle**" | Vehicle "**TC_JOB_CARD_001.vehicle**" is selected successfully |
| 8.1 | In the "Allocate Team & Equipments" section, click on Driver dropdown and select "**TC_JOB_CARD_001.teamAllocation.driver**" | Driver "**TC_JOB_CARD_001.teamAllocation.driver**" is selected |
| 8.2 | Click on Vehicle Commander 1 dropdown and select "**TC_JOB_CARD_001.teamAllocation.vehicleCommander1**" | Vehicle Commander 1 "**TC_JOB_CARD_001.teamAllocation.vehicleCommander1**" is selected |
| 8.3 | Click on Vehicle Commander 2 dropdown and select "**TC_JOB_CARD_001.teamAllocation.vehicleCommander2**" | Vehicle Commander 2 "**TC_JOB_CARD_001.teamAllocation.vehicleCommander2**" is selected |
| 8.4 | Click on Other Staff dropdown and select "**TC_JOB_CARD_001.teamAllocation.otherStaff**" | Other Staff "**TC_JOB_CARD_001.teamAllocation.otherStaff**" is selected |
| 8.5 | Click on Armed Guards dropdown and select "**TC_JOB_CARD_001.teamAllocation.armedGuards**" showing permit number | Armed Guards "**TC_JOB_CARD_001.teamAllocation.armedGuards**" is selected with permit information displayed |
| 8.6 | Click on Equipment dropdown and select "**TC_JOB_CARD_001.equipmentAllocation[0]**" from the list | First equipment "**TC_JOB_CARD_001.equipmentAllocation[0]**" is selected |
| 8.7 | Click on Equipment dropdown again and select "**TC_JOB_CARD_001.equipmentAllocation[1]**" from the list | Second equipment "**TC_JOB_CARD_001.equipmentAllocation[1]**" is selected |
| 8.8 | Click on Equipment dropdown again and select "**TC_JOB_CARD_001.equipmentAllocation[2]**" from the list | Third equipment "**TC_JOB_CARD_001.equipmentAllocation[2]**" is selected |
| 9 | Verify that selected equipment are displayed correctly in the "Allocate Equipment Count" table | Equipment table displays all three selected equipment with their details correctly populated |
| 10 | Click on "Print Job Card" button | PDF job card is generated and downloaded containing: Job details, Route, Customer, Location, Template Name, Job Type, Operation Type, Agreement, All selected team members (Driver, Commanders, Staff, Armed Guards), All selected equipment (Cash Counting Machine, Mobile, Body Camera) |
| 11 | Click "Save" button | Job Card is created successfully and displays in the Job Card table with: Status = "Ongoing", Route, Job Card Number, Scheduled Date |

### Expected Results
- User can successfully navigate to Job Card creation page
- Correct job can be selected from the available jobs table
- Vehicle can be selected from the dropdown
- All team members can be assigned to their respective positions
- Multiple equipment can be selected and allocated
- Equipment details are displayed correctly in the allocation table
- Job Card PDF is generated with all required information
- Job Card is saved with "Ongoing" status and appears in the job card list
- Job Card includes Route, Job Card Number, and Scheduled Date

### Reference Data from JSON

| Field | Value |
|-------|-------|
| **Job Category** | See test-data/jobcard_testdata.json |
| **Route** | See test-data/jobcard_testdata.json |
| **Job Template Name** | See test-data/jobcard_testdata.json |
| **Customer** | See test-data/jobcard_testdata.json |
| **Location** | See test-data/jobcard_testdata.json |
| **Job Type** | See test-data/jobcard_testdata.json |
| **Operation Type** | See test-data/jobcard_testdata.json |
| **Agreement** | See test-data/testdata.json |
| **ATM ID** | See test-data/testdata.json |
| **Vehicle** | See test-data/testdata.json |
| **Driver** | See test-data/testdata.json |
| **Vehicle Commander 1** | See test-data/testdata.json |
| **Vehicle Commander 2** | See test-data/testdata.json |
| **Other Staff** | See test-data/testdata.json |
| **Armed Guards** | See test-data/testdata.json |
| **Equipment 1** | See test-data/testdata.json |
| **Equipment 2** | See test-data/testdata.json |
| **Equipment 3** | See test-data/testdata.json |
| **Initial Status** | See test-data/testdata.json |

### Test Artifacts
- Screenshots of each step during Job Card creation
- Job Selection table showing selected job
- Team & Equipment Allocation form
- Equipment Count table
- Generated Job Card PDF file
- Final Job Card list view showing "Ongoing" status
- Job Card Number and Scheduled Date confirmation

### Notes
- The Job Card can only be created from an "Approved" Job Template
- Multiple equipment can be selected and allocated to a single Job Card
- The PDF should include all team member and equipment information
- Role-based access control applies: Create permission required
- Job Card status starts as "Ongoing" upon creation
- The PDF download should contain complete job card details for printing
- Equipment and team member selections should validate against available resources

---

## Related Test Cases
- **TC_JOB_TEMPLATE_001**: Job Template creation and approval (Pre-requisite)
- **TC_JOB_CARD_002**: Job Card Edit and Update (Future)
- **TC_JOB_CARD_003**: Job Card Completion and Handover (Future)
