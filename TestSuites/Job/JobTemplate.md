# Job Template - Test Cases

## Test Suite Information
- **Module**: Job → Job Template
- **Feature**: Job Template creation, approval, and management
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 6, 2026

---

## TC_JOB_TEMPLATE_001: Create and Approve Job Template

### Test Objective
Verify that users can create a new job template with required details, save it, and approve it through a workflow-based approval process with proper permissions.

### Pre-conditions
- User must have valid login credentials
- Application is accessible
- User is on the login page

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
- **Creator Credentials:** Username and password for initial template creation
- **Approver Credentials:** Username and password for template approval
- **Template Data:** Route, customer, cash type, agreement, and related information
- **Auto-Generated Fields:** Template name format and generation rules
- **Approval Workflow:** Status transitions and role-based permissions
- **Validation Rules:** Data type and format requirements for each field
- **Role Definitions:** Creator and Approver permissions

⚠️ **REMINDER: When modifying test data**
Update only the `test-data/testdata.json` file. Do NOT manually update values in this markdown document. The test steps reference the JSON file as the authoritative source.

✅ **DATA AVAILABILITY & SUBSTITUTION**
If any test data value (route, customer, vehicle, staff member, etc.) is NOT available in the system:
- Use a similar or alternative value that exists in the system
- Document the substitution in the test report under "Data Substitutions"
- Update the `test-data/testdata.json` file with the available value
- Test execution should proceed with the substitute value
- This is **NOT** considered a test failure, but a data adaptation

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials (**credentials.creator.username** / **credentials.creator.password**) and click enter | User successfully logs in and reaches the dashboard |
| 2 | Using side navigation bar, click on "Jobs" menu | "Jobs" menu expands and shows submenu items including "Job Template" |
| 2.1 | Click on "Job Template" from the expanded menu | Job Template page loads successfully |
| 3 | Verify user is on the Job Template page | Job Template page displays with existing templates list (if any) |
| 4 | Click on Create button to create new job template | Job Template creation form opens with empty fields |
| 5 | In Route field, type "**commonData.route**" and select from dropdown | Route is selected successfully |
| 6 | In Customer dropdown, type "**commonData.customer**" and select from dropdown | Customer "**commonData.customer**" is selected |
| 7 | Select **TC_JOB_TEMPLATE_001.templateData.cashType** from the dropdown | Cash type is selected |
| 8 | Select Job Type from the Job Type dropdown | Job Type is selected successfully |
| 9 | Select Agreement Type from the dropdown | Agreement Type is selected |
| 10 | In Agreement dropdown, select "**commonData.agreement**" | Agreement is selected |
| 11 | Verify that Main Agreement field is automatically populated | Main Agreement field shows the selected agreement automatically |
| 12 | Select Job Location from the dropdown and select "**TC_JOB_TEMPLATE_001.templateData.jobLocation**" | Job Location "**TC_JOB_TEMPLATE_001.templateData.jobLocation**" is selected |
| 13 | Verify Template Name field is auto-filled with format "Customer Name - Job Type - Route Name - Random Number" | Template Name field contains correctly formatted name: "**TC_JOB_TEMPLATE_001.templateData.templateName**" |
| 14 | Click on Save button | Job template is saved successfully |
| 15 | Verify that job template appears in the job template list with correct details | Job template list displays the new template with: Template Name, Operation Type, Route, Job Type, Customer, and Approval Status = "Pending" |
| 16 | Click on 3-dot icon (More options) for the created job template | Modal menu opens |
| 17 | Verify that only Edit option is enabled and Approve option is disabled | Edit button is enabled, Approve button is disabled (appears grayed out) |
| 18 | Close the modal by clicking elsewhere | Modal closes |
| 19 | Click on profile avatar in the top right corner | Profile menu appears with options including Logout |
| 20 | Click on Logout button | User is logged out successfully and redirected to login page |
| 21 | Verify user is on login page | Login page displays with username and password fields |
| 22 | Login with approver credentials (**credentials.approver.username** / **credentials.approver.password**) | User successfully logs in with approver role |
| 23 | Navigate to Job Template page | Job Template page loads |
| 24 | Verify the created job template is visible with "Pending" approval status | Template appears in the list with Approval Status = "Pending" |
| 25 | Click on 3-dot icon (More options) for the created job template | Modal menu opens |
| 26 | Verify that Approve option is enabled for approver user | Approve button is enabled and clickable |
| 27 | Click on Approve option | Job template details form loads with all information populated |
| 28 | Verify Approve button is visible in the form | Approve button is displayed and ready to click |
| 29 | Click on Approve button | Job template approval is processed |
| 30 | Verify job template approval status is updated to "Approved" | Job template list shows the template with Approval Status = "Approved" |
| 31 | Click on 3-dot icon (More options) for the created job template | Modal menu opens |
| 13 | Verify that only Edit option and Approve options are disabled | Edit button is dissabled, Approve button is disabled (appears grayed out) |

### Expected Results
- User can successfully create a job template with all required fields
- Template Name is automatically generated in the correct format
- Initial creator cannot approve their own template
- Approver with appropriate permissions can view and approve the template
- Approval status changes from "Pending" to "Approved" after approval
- Job template remains in the list and is accessible after approval

### Reference Data from JSON

| Field | Value |
|-------|-------|
| Template Name (Auto-generated) | See test-data/testdata.json |
| Route | See test-data/testdata.json |
| Customer | See test-data/testdata.json |
| Cash Type | See test-data/testdata.json |
| Job Location | See test-data/testdata.json |
| Agreement | See test-data/testdata.json |
| Main Agreement | See test-data/testdata.json |
| Creator Username | See test-data/testdata.json |
| Creator Password | See test-data/testdata.json |
| Approver Username | See test-data/testdata.json |
| Approver Password | See test-data/testdata.json |
| Approval Status (Initial) | See test-data/testdata.json |
| Approval Status (After Approval) | See test-data/testdata.json |

### Test Artifacts
- Screenshots of each step
- Job Template creation form
- Job Template list view
- Approval workflow steps
- Final approved status

### Notes
- The Template Name field should auto-populate and not be editable
- The Main Agreement should be automatically set based on the selected Agreement
- Role-based access control is enforced: Creator cannot approve, Approver can approve
- Approval Status transitions from "Pending" to "Approved"
