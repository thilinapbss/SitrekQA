# Test Runner Guide

## Overview
This guide provides instructions for executing the SitrekQA automated test suite and generating comprehensive HTML reports with suggestions.

---

## Prerequisites

Before running tests, ensure:
- Node.js is installed
- All dependencies are installed: `npm install`
- Playwright browsers are installed: `npx playwright install`
- Application is accessible at: https://111.119.245.10:20081/
- Valid test credentials are available in `test-data/users.json`

---

## Step 1: Run Login Tests First and Generate Detailed Report

**IMPORTANT:** Always start by running the login test cases defined in [test-cases/login/login.md](test-cases/login/login.md).

### Login Test Cases Overview
The login test suite covers:
- **TC_LOGIN_001**: Empty field validations
- **TC_LOGIN_002**: Invalid credentials handling
- **TC_LOGIN_003**: Security testing (SQL injection, XSS)
- **TC_LOGIN_004**: Edge cases (case sensitivity, whitespace)
- **TC_LOGIN_005**: Successful login with valid credentials

### Run Tests and Generate Report with Suggestions

```bash
# Run tests and generate detailed HTML report
npx playwright test tests/1_1_login.spec.ts --reporter=html

# The report will be available at: playwright-report/index.html
```

**Note:** JSON output file location is configured in `playwright.config.ts`, not via command-line flags.

### Create Custom Report (report.html)

The custom `report.html` should include:

1. **Test Execution Summary**
   - Total tests executed
   - Pass/Fail/Skip counts
   - Execution time
   - Test coverage percentage

2. **Detailed Test Results**
   - Each test case with ID and description
   - Step-by-step execution details
   - Screenshots for failures
   - Error messages and stack traces

3. **Test Suggestions Section**
   The report should contain actionable suggestions:
   
   **For Failed Tests:**
   - Root cause analysis
   - Recommended fixes
   - Related test cases to review
   - Priority level for fixing
   
   **For Security Tests:**
   - Vulnerabilities identified
   - Security best practices
   - Compliance recommendations
   
   **For Edge Cases:**
   - System behavior observations
   - Consistency checks
   - User experience impact
   
   **General Improvements:**
   - Test coverage gaps
   - Additional test scenarios
   - Performance optimizations
   - Maintenance recommendations

4. **Environmental Information**
   - Browser versions used
   - OS details
   - Application version
   - Test data configurations

---

## Step 2: View and Analyze Report

### Open the Report

```bash
# Open Playwright default report
npx playwright show-report

# Or open custom report.html directly in browser
start report.html   # Windows
```

### Report Analysis Checklist

- [ ] Review all test case results
- [ ] Check pass/fail rates
- [ ] Analyze failure patterns
- [ ] Review security test outcomes
- [ ] Read all suggestions
- [ ] Prioritize fixes based on suggestions
- [ ] Document blockers or concerns
- [ ] Update test cases if needed

---

## Step 3: Run Complete Test Suite

After validating login functionality, proceed with other test suites:

```bash
# Run all master tests
npx playwright test tests/2_*.spec.ts --reporter=html

# Run specific master module
npx playwright test tests/2_1_branch-master.spec.ts --reporter=html

# Run all tests
npx playwright test --reporter=html
```

---

## Report Configuration

### Customize HTML Reporter

Edit `playwright.config.ts` to customize report generation:

```typescript
reporter: [
  ['html', { 
    outputFolder: 'playwright-report',
    open: 'never' 
  }],
  ['json', { 
    outputFile: 'test-results.json' 
  }],
  ['list']
]
```

---

## Generating Report with Suggestions Programmatically

To automatically include suggestions in the report, you can:

1. **Add custom annotations in tests:**
```typescript
test('Login with invalid credentials', async ({ page }) => {
  test.info().annotations.push({
    type: 'suggestion',
    description: 'Consider implementing account lockout after 3 failed attempts'
  });
  // test code...
});
```

2. **Use test.fixme() or test.skip() with suggestions:**
```typescript
test.fixme('SQL injection test', async ({ page }) => {
  // Suggestion: Implement parameterized queries
});
```

3. **Add afterEach hook for suggestions:**
```typescript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    testInfo.annotations.push({
      type: 'suggestion',
      description: 'Review input validation and error handling'
    });
  }
});
```

---

## Best Practices

1. **Always run login tests first** - Ensures authentication works before testing other features
2. **Review report.html immediately** - Quick feedback on test results
3. **Act on suggestions** - Prioritize and implement recommended fixes
4. **Keep test data updated** - Ensure `test-data/users.json` has valid credentials
5. **Document issues** - Use TEST-FINDINGS.md to track discovered issues
6. **Regular reporting** - Generate reports after each test run
7. **Share reports** - Distribute HTML reports to stakeholders

---

## Troubleshooting

### Issue: Tests fail to start
**Suggestion:** Verify application is accessible and credentials are valid

### Issue: HTML report not generated
**Suggestion:** Check playwright.config.ts reporter configuration

### Issue: Screenshots missing in report
**Suggestion:** Ensure screenshot capture is enabled in config

### Issue: Login tests fail
**Suggestion:** Verify network connectivity and application availability

---

## Next Steps

After completing login tests and reviewing the report:
1. Fix any critical issues identified
2. Proceed with master module tests
3. Generate comprehensive test suite report
4. Implement suggested improvements
5. Re-run failed tests to verify fixes

---

## Additional Resources

- [Login Test Cases](test-cases/login/login.md)
- [Test Findings](TEST-FINDINGS.md)
- [Login Test Summary](test-reports/login-test-summary.html)
- [Playwright Documentation](https://playwright.dev/)
