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

#### User Credentials
| Field | Value |
|-------|-------|
| **Username (Creator)** | chathura |
| **Password (Creator)** | Admin@1234 |

#### Job Selection Criteria
| Field | Value |
|-------|-------|
| **Job Category** | Normal |
| **Route** | Nation Trust Kelaniya - Colombo |
| **Job Template** | Nation Trust Bank - Kelaniya - 001 |
| **Customer** | Nation Trust Bank PLC |
| **Location** | NATION TRUST KELANIYA - Colombo - SITREK NEGOMBO BRANCH |
| **Job Type** | Collect & Deposit |
| **Operation Type** | CIT |
| **Agreement** | Nation Trust Bank PLC - CIT - Once A Week |
| **ATM ID** | NA |

#### Team Members & Equipment Assignment
| Position | Employee Name | Additional Info |
|----------|---------------|-----------------|
| **Vehicle** | [To be selected from dropdown] | |
| **Driver** | H.M Athula | |
| **Vehicle Commander 1** | J D Kalumsiri | |
| **Vehicle Commander 2** | J D Kalumsiri | |
| **Other Staff** | A D Dissanayake | |
| **Armed Guards** | J D Kalumsiri | Watcher Permit Number: 1234 |
| **Equipment 1** | Cash Counting Machine | |
| **Equipment 2** | Mobile | |
| **Equipment 3** | Body Camera | |

⚠️ **IMPORTANT: Test Data Dependencies**
When any test data value is changed, ensure you update ALL references throughout this document:
- Update the individual test steps that mention specific values
- Update the Expected Results section
- Update the Test Data Table section
- Update any assertions or verification steps that reference these values
This ensures consistency and prevents test failures due to mismatched data.

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials (**Username (Creator)** / **Password (Creator)**) and click enter | User successfully logs in and reaches the dashboard |
| 2 | Using side navigation bar, click on "Jobs" menu | "Jobs" menu expands and shows submenu items including "Job Template" and "Job Card" |
| 3 | Click on "Job Card" from the expanded menu | Job Card page loads successfully and displays available options |
| 4 | In the Job Category dropdown, select "Normal" | Job Category "Normal" is selected |
| 5 | In the Route dropdown, select "**Route**" (**Route** - **City**) | Route is selected successfully and filters available jobs |
| 6 | In the "Select Jobs to Job Card" table, select the job by checking the checkbox for: Customer: **Customer**, Location: **Location**, Template Name: **Job Template**, Job Type: **Job Type**, Operation Type: **Operation Type**, ATM ID: **ATM ID**, Agreement: **Agreement** | Job is selected and highlighted in the table |
| 7 | In the "Create Job Card" section, select a vehicle from the "Vehicle" dropdown | Vehicle is selected successfully |
| 8.1 | In the "Allocate Team & Equipments" section, click on Driver dropdown and select "**Driver**" | Driver "**Driver**" is selected |
| 8.2 | Click on Vehicle Commander 1 dropdown and select "**Vehicle Commander 1**" | Vehicle Commander 1 "**Vehicle Commander 1**" is selected |
| 8.3 | Click on Vehicle Commander 2 dropdown and select "**Vehicle Commander 2**" | Vehicle Commander 2 "**Vehicle Commander 2**" is selected |
| 8.4 | Click on Other Staff dropdown and select "**Other Staff**" | Other Staff "**Other Staff**" is selected |
| 8.5 | Click on Armed Guards dropdown and select "**Armed Guards**" showing permit number | Armed Guards "**Armed Guards**" is selected with permit information displayed |
| 8.6 | Click on Equipment dropdown and select "**Equipment 1**" from the list | First equipment "**Equipment 1**" is selected |
| 8.7 | Click on Equipment dropdown again and select "**Equipment 2**" from the list | Second equipment "**Equipment 2**" is selected |
| 8.8 | Click on Equipment dropdown again and select "**Equipment 3**" from the list | Third equipment "**Equipment 3**" is selected |
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

### Test Data Table

| Field | Value |
|-------|-------|
| **Job Category** | Normal |
| **Route** | Nation Trust Kelaniya - Colombo |
| **Job Template Name** | Nation Trust Bank - Kelaniya - 001 |
| **Customer** | Nation Trust Bank PLC |
| **Location** | NATION TRUST KELANIYA - Colombo - SITREK NEGOMBO BRANCH |
| **Job Type** | Collect & Deposit |
| **Operation Type** | CIT |
| **Agreement** | Nation Trust Bank PLC - CIT - Once A Week |
| **ATM ID** | NA |
| **Vehicle** | [From dropdown selection] |
| **Driver** | H.M Athula |
| **Vehicle Commander 1** | J D Kalumsiri |
| **Vehicle Commander 2** | J D Kalumsiri |
| **Other Staff** | A D Dissanayake |
| **Armed Guards** | J D Kalumsiri (Permit: 1234) |
| **Equipment 1** | Cash Counting Machine |
| **Equipment 2** | Mobile |
| **Equipment 3** | Body Camera |
| **Initial Status** | Ongoing |

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
