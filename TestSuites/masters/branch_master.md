# Branch Master - Test Cases

## Test Suite Information
- **Module**: Masters → Branch Master
- **Feature**: Branch synchronization functionality
- **Priority**: High
- **Test Type**: Functional Testing
- **Created Date**: February 4, 2026

---

## TC_BRANCH_MASTER_001: Verify Branch Master Navigation, Sync All, and Display Local Time

### Test Objective
Verify that user can navigate to Branch Master through Masters menu, access Branch menu item, click Sync All button, and verify that the Last Synced Date column displays the current Sri Lankan local time after synchronization.

### Pre-conditions
- User must have valid login credentials (operation role)
- Application is accessible
- User is on the login page

### Test Priority
**High**

### Test Data
- **Username**: chathura
- **Password**: Admin@1234
- **Role**: operation

### Test Steps

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Login to the system with valid credentials | User successfully logs in and reaches the dashboard |
| 2 | Click on "Masters" menu in side navigation (second Masters text) | Masters menu expands and shows sub-menu items |
| 3 | Verify "Branch" menu item is visible | Branch menu item is visible in the expanded menu |
| 4 | Click on "Branch" menu item | Branch Master page loads successfully |
| 5 | Verify Branch Master page displays with grid | Data grid is visible with columns: "Name" and "Last Synced Date" |
| 6 | Verify "Sync All" button is visible | Sync All button is displayed on the page |
| 7 | Capture current Sri Lankan local time | Real-time is captured (format: YYYY-MM-DD HH:MM:SS) |
| 8 | Click "Sync All" button | Sync operation initiates |
| 9 | Wait for sync to complete (5 seconds) | Loading indicator appears and disappears |
| 10 | Verify "Last Synced Date" column header is visible | Column header "Last Synced Date" is displayed |
| 11 | Verify timestamps are displayed in correct format | Timestamps match pattern: YYYY-MM-DD HH:MM:SS |
| 12 | Verify timestamps show current Sri Lankan date and time | All timestamps display the current date (YYYY-MM-DD) captured in Step 7 |
| 13 | Verify branch count in grid | At least 10 branches are displayed in the grid |

### Expected Results
- User can successfully navigate to Branch Master
- Branch menu is accessible from Masters navigation
- Grid displays branch data with "Name" and "Last Synced Date" columns
- Sync All button is functional
- After clicking Sync All, Last Synced Date should update to current Sri Lankan local time
- Timestamps should display in format: YYYY-MM-DD HH:MM:SS
