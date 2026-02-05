# Feature: User Login

---

## Test Case ID: TC_LOGIN_001
### Scenario: Login Validation - Empty Fields

**Priority:** High  
**Type:** Negative

**Pre-conditions:**
- User is not logged in
- Browser is opened
- SITREK application is accessible

**Test Data:**
| Username | Password | Expected Error |
|----------|----------|----------------|
| (empty) | Admin@1234 | Username is required |
| chathura | (empty) | Password is required |
| (empty) | (empty) | Username is required, Password is required |

**Steps:**
1. Navigate to SITREK login page (https://111.119.245.10:20081/)
2. Leave username and/or password fields empty as per test data
3. Click the login button
4. Verify appropriate validation error messages display Username is required!, Password is required!

**Expected Results:**
- Appropriate validation error messages should be displayed
- User should remain on the login page
- Login should not be successful

**Post-conditions:**
- User remains on login page
- No session is created

---



## Test Case ID: TC_LOGIN_002
### Scenario: Login Fails with Invalid Credentials

**Priority:** High  
**Type:** Negative

**Pre-conditions:**
- User is not logged in
- Browser is opened
- SITREK application is accessible

**Test Data:**
| Username | Password | Reason |
|----------|----------|--------|
| invaliduser | Admin@1234 | Invalid username |
| chathura | WrongPassword123 | Invalid password |
| wronguser | wrongpassword | Both invalid |

**Steps:**
1. Navigate to SITREK login page (https://111.119.245.10:20081/)
2. Enter invalid credentials as per test data
3. Click the login button
4. Verify error message

**Expected Results:**
- Error message "Invalid credentials" or "Invalid username or password" should be displayed
- User should remain on the login page
- Login should not be successful

**Post-conditions:**
- User remains on login page
- No session is created
- Failed login attempt may be logged

---



## Test Case ID: TC_LOGIN_003
### Scenario: Login Security - SQL Injection and Special Characters

**Priority:** High  
**Type:** Security / Negative

**Pre-conditions:**
- User is not logged in
- Browser is opened
- SITREK application is accessible

**Test Data:**
| Username | Password | Type |
|----------|----------|------|
| admin' OR '1'='1 | anything | SQL Injection |
| user@#$% | Admin@1234 | Special Characters |
| <script>alert('xss')</script> | test | XSS Attempt |

**Steps:**
1. Navigate to SITREK login page (https://111.119.245.10:20081/)
2. Enter malicious or special character input as per test data
3. Click the login button
4. Verify system handles input securely

**Expected Results:**
- Login should fail for all cases
- SQL injection/XSS should not work
- Application should not crash
- Appropriate error message should be displayed
- Special characters should be handled gracefully

**Post-conditions:**
- User remains on login page
- No session is created
- Security events may be logged

---



## Test Case ID: TC_LOGIN_004
### Scenario: Login Edge Cases - Case Sensitivity and Whitespace

**Priority:** Medium  
**Type:** Negative

**Pre-conditions:**
- User is not logged in
- Browser is opened
- SITREK application is accessible

**Test Data:**
| Username | Password | Reason |
|----------|----------|--------|
| chathura | admin@1234 | Wrong case in password |
| " chathura " | Admin@1234 | Whitespace in username |
| CHATHURA | Admin@1234 | Uppercase username |

**Steps:**
1. Navigate to SITREK login page (https://111.119.245.10:20081/)
2. Enter credentials with edge cases as per test data
3. Click the login button
4. Verify system behavior

**Expected Results:**
- Password should be case-sensitive (should fail)
- System should handle whitespace consistently (trim or error)
- Username case-sensitivity should be consistent with system rules

**Post-conditions:**
- User remains on login page or logs in based on system behavior
- Behavior should be predictable and consistent

---



## Test Case ID: TC_LOGIN_005
### Scenario: Successful Login with Operation User

**Priority:** Critical  
**Type:** Positive

**Pre-conditions:**
- User is not logged in
- Browser is opened
- SITREK application is accessible
- Valid operation user credentials are available

**Steps:**
1. Navigate to SITREK login page (https://111.119.245.10:20081/)
2. Enter valid username "chathura"
3. Enter valid password "Admin@1234"
4. Click the login button
5. Verify successful login and redirection

**Expected Results:**
- User should be successfully authenticated
- User should be redirected to the dashboard or home page
- User session should be created
- Operation user features should be accessible
- No error messages should be displayed

**Post-conditions:**
- User is logged in
- Active session is created
- User can access operation user features

---

