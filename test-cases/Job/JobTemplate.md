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
- **Username (Creator)**: chathura
- **Password (Creator)**: Admin@1234
- **Username (Approver)**: namal
- **Password (Approver)**: Admin@1234
- **Route**: Nation Trust Kelaniya - Colombo
- **Customer**: Nation Trust Bank PLC
- **Cash Type**: Cash
- **Agreement**: Nation Trust Bank PLC - CIT - Once A Week

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
| 2 | Using side navigation bar, click on "Jobs" menu | "Jobs" menu expands and shows submenu items including "Job Template" |
| 2.1 | Click on "Job Template" from the expanded menu | Job Template page loads successfully |
| 3 | Verify user is on the Job Template page | Job Template page displays with existing templates list (if any) |
| 4 | Click on Create button to create new job template | Job Template creation form opens with empty fields |
| 5 | In Route field, type "**Route**" and select from dropdown | Route is selected successfully |
| 6 | In Customer dropdown, type "**Customer**" and select from dropdown | Customer "**Customer**" is selected |
| 7 | Select **Cash Type** from the dropdown | Cash type is selected |
| 8 | Select Job Type from the Job Type dropdown | Job Type is selected successfully |
| 9 | Select Agreement Type from the dropdown | Agreement Type is selected |
| 10 | In Agreement dropdown, select "**Agreement**" | Agreement is selected |
| 11 | Verify that Main Agreement field is automatically populated | Main Agreement field shows the selected agreement automatically |
| 12 | Select Job Location from the dropdown | Job Location is selected |
| 13 | Verify Template Name field is auto-filled with format "Customer Name - Job Type - Route Name - Random Number" | Template Name field contains correctly formatted name (e.g., "**Customer** - [Job Type] - **Route** - 12345") |
| 14 | Click on Save button | Job template is saved successfully |
| 15 | Verify that job template appears in the job template list with correct details | Job template list displays the new template with: Template Name, Operation Type, Route, Job Type, Customer, and Approval Status = "Pending" |
| 16 | Click on 3-dot icon (More options) for the created job template | Modal menu opens |
| 17 | Verify that only Edit option is enabled and Approve option is disabled | Edit button is enabled, Approve button is disabled (appears grayed out) |
| 18 | Close the modal by clicking elsewhere | Modal closes |
| 19 | Click on profile avatar in the top right corner | Profile menu appears with options including Logout |
| 20 | Click on Logout button | User is logged out successfully and redirected to login page |
| 21 | Verify user is on login page | Login page displays with username and password fields |
| 22 | Login with approver credentials (**Username (Approver)** / **Password (Approver)**) | User successfully logs in with approver role |
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

### Test Data Table

| Field | Value |
|-------|-------|
| Template Name (Auto-generated) | **Customer** - [Job Type] - **Route** - [Random Number] |
| Route | **Route** |
| Customer | **Customer** |
| Cash Type | **Cash Type** |
| Agreement | **Agreement** |
| Main Agreement | **Agreement** (Auto-filled) |
| Approval Status (Initial) | Pending |
| Approval Status (After Approval) | Approved |

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
