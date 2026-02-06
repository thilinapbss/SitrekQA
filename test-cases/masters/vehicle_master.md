# Vehicle Master Test Cases

## Module: Masters → Vehicle Master
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
| TC_VEHICLE_MASTER_001 | Verify Vehicle Master navigation and Create Ad-hoc Hiring Vehicle | High | Not Executed |
| TC_VEHICLE_MASTER_002 | Verify Sync Vehicles functionality and API response | High | Not Executed |

---

## Detailed Test Cases

### TC_VEHICLE_MASTER_001: Verify Vehicle Master navigation and Create Ad-hoc Hiring Vehicle

**Objective**: Verify that the Vehicle Master page can be accessed and a new Ad-hoc Hiring Vehicle can be created with all required fields.

**Preconditions**:
- User is logged in with valid credentials (chathura/Admin@1234)
- User has access to Masters menu

**Test Steps**:
1. Navigate to the application URL
2. Login with valid credentials
3. Click on "Masters" menu button
4. Click on "Vehicle" menu item
5. Verify the page loads successfully
6. Verify "Create Ad-hoc Hiring Vehicle" form is displayed
7. Fill in all required fields:
   - Vehicle Number (e.g., "TEST-VEH-001")
   - Customer Type
   - Model
   - Year
   - Color
   - Vehicle Type
   - Fuel Type
   - Engine Number
   - Chassis Number
   - Owner
   - Start Odometer Reading
   - Purchase Price
   - Purchase Date (DD/MM/YYYY format)
   - Depreciation Rate
   - Current Value
   - Service Due Date (DD/MM/YYYY format)
   - Security Equipment Installed
   - Insurance Policy Number
   - Insurance Expiry Date (DD/MM/YYYY format)
   - License Plate Number
   - License Type
   - License Expiry Date (DD/MM/YYYY format)
   - Armoring Level
   - Remarks
   - Active checkbox (checked)
8. Click "Save" button
9. Verify success notification is displayed
10. Verify new vehicle appears in the vehicle list

**Expected Results**:
- Vehicle menu item is visible and clickable
- Page loads successfully with Create Ad-hoc Hiring Vehicle form
- All form fields are visible and accept input
- Save button is clickable
- Success notification displays after saving
- New vehicle record appears in the list
- All entered data is saved correctly

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

### TC_VEHICLE_MASTER_002: Verify Sync Vehicles functionality and API response

**Objective**: Verify that the Sync Vehicles button works correctly and synchronizes vehicle data from external system via API.

**Preconditions**:
- User is on the Vehicle Master page
- Sync Vehicles button exists on the page
- External API is accessible

**Test Steps**:
1. Navigate to Vehicle Master page
2. Locate the "Sync Vehicles" or "Sync All" button
3. Note the current number of vehicles in the list
4. Click on "Sync Vehicles" button
5. Wait for synchronization to complete
6. Verify loading indicator appears during sync
7. Verify success notification displays after sync completes
8. Check if new vehicles appear in the list
9. Verify the vehicle count has increased (if new data exists)
10. Inspect network tab to verify API call:
    - Check API endpoint is called
    - Verify response status is 200 OK
    - Check response contains vehicle data
    - Verify data structure is correct

**Expected Results**:
- Sync Vehicles button is visible and clickable
- Loading indicator shows during synchronization
- Success notification displays: "Vehicles synced successfully" or similar message
- New vehicles from external system appear in the list
- API call completes successfully with status 200
- API response contains valid vehicle data in expected format
- Vehicle list refreshes automatically after sync
- No errors in console or network tab

**Actual Results**: 
- [To be updated after test execution]

**Test Status**: Not Executed

---

## Test Data

**Login Credentials**:
- Username: chathura
- Password: Admin@1234

**Test Vehicle Data**:
```json
{
  "vehicleNumber": "AUTO-VEH-[timestamp]",
  "customerType": "Ad-hoc Hiring",
  "model": "Toyota Camry",
  "year": "2023",
  "color": "White",
  "vehicleType": "Sedan",
  "fuelType": "Petrol",
  "engineNumber": "ENG-[timestamp]",
  "chassisNumber": "CHS-[timestamp]",
  "owner": "Test Owner",
  "startOdometer": "1000",
  "purchasePrice": "5000000",
  "purchaseDate": "01/01/2023",
  "depreciationRate": "10",
  "currentValue": "4500000",
  "serviceDueDate": "01/06/2024",
  "securityEquipment": "GPS Tracker, Alarm System",
  "insurancePolicyNumber": "INS-[timestamp]",
  "insuranceExpiryDate": "31/12/2024",
  "licensePlateNumber": "ABC-1234",
  "licenseType": "Commercial",
  "licenseExpiryDate": "31/12/2024",
  "armoringLevel": "Level 3",
  "remarks": "Test vehicle for automation",
  "active": true
}
```

**Test Environment Details**:
- Application URL: https://111.119.245.10:20081/
- Browser: Chromium (Chrome)
- Viewport: 1920x1080
- Timezone: Asia/Colombo (UTC+5:30)

---

## API Verification Points

**Sync Vehicles API**:
- **Endpoint**: /api/vehicles/sync or similar
- **Method**: POST or GET
- **Expected Status**: 200 OK
- **Response Structure**:
  ```json
  {
    "success": true,
    "message": "Vehicles synced successfully",
    "data": {
      "syncedCount": 10,
      "vehicles": [...]
    }
  }
  ```

**Validation Points**:
- API endpoint is accessible
- Response status code is 200
- Response contains success flag
- Synced vehicle data is present in response
- Data structure matches expected format
- No errors in response

---

## Notes
- Use timestamp-based unique identifiers for test data
- Verify all date fields accept DD/MM/YYYY format
- Check dropdown fields have valid options loaded
- Ensure API sync completes before proceeding to verification
- Capture screenshots of success notifications
- Monitor browser console for any JavaScript errors during sync
- Validate that synced vehicles match external system data
