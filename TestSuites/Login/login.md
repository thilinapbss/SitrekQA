# Feature: User Login

---

## Test Case ID: TC_LOGIN_COMPREHENSIVE
### Scenario: Comprehensive Login Testing

**Priority:** Critical  
**Type:** Mixed (Positive, Negative, Security)

**Pre-conditions:**
- User is not logged in
- Browser is opened
- SITREK application is accessible
- Valid credentials available (username: "chathura", password: "Admin@1234")

**Test Data:**
| Test Scenario | Username | Password | Type | Expected Result |
|---|---|---|---|---|
| Empty Username | (empty) | Admin@1234 | Validation | Username is required |
| Empty Password | chathura | (empty) | Validation | Password is required |
| Both Empty | (empty) | (empty) | Validation | Username & Password required |
| Invalid Username | invaliduser | Admin@1234 | Negative | Invalid credentials error |
| Invalid Password | chathura | WrongPassword123 | Negative | Invalid credentials error |
| SQL Injection | admin' OR '1'='1 | anything | Security | Login fails, no injection |
| XSS Attempt | <script>alert('xss')</script> | test | Security | Login fails, XSS prevented |
| Special Characters | user@#$% | Admin@1234 | Negative | Invalid credentials error |
| Password Case Sensitivity | chathura | admin@1234 | Edge Case | Password case-sensitive fail |
| Username with Whitespace | " chathura " | Admin@1234 | Edge Case | Handled consistently |
| Uppercase Username | CHATHURA | Admin@1234 | Edge Case | Case consistency based on system |
| Valid Credentials | chathura | Admin@1234 | Positive | Login successful, redirect to dashboard |

**Steps:**
1. Navigate to SITREK login page (https://111.119.245.10:20081/)
2. Execute each test scenario from test data table:
   - Validation Tests: Leave fields empty as specified, click login, verify error messages
   - Invalid Credential Tests: Enter credentials as specified, click login, verify rejection
   - Security Tests: Enter malicious input, click login, verify system handles securely
   - Edge Case Tests: Enter data with special formatting, click login, verify system behavior
   - Positive Test: Enter valid credentials, click login, verify successful authentication

**Expected Results:**
- Validation: Error messages displayed for empty fields
- Invalid Credentials: "Invalid credentials" message displayed
- Security: Login fails without application crash or injection execution
- Edge Cases: Behavior consistent and predictable
- Valid Login: User authenticated, redirected to dashboard, session created
- User remains on login page on all failures
- No session created on failed login attempts

**Post-conditions:**
- Failed login attempts: User on login page, no session created
- Successful login: User logged in with active session, access to operation user features available
- Security events logged (for security test scenarios)

