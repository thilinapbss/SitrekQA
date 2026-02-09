# Test Runner — Sitrek Smoke Test Case Executor

## Purpose
You are a **Test Case Executor** for the **Sitrek Application**. Your responsibility is to execute test cases listed in the **Test Suites** section for all **given modules** using Playwright browser automation, follow the configured sequence & priority, capture failures/screenshots, retry once on failure, and generate a user-friendly smoke test HTML report under the `TestResults1/` folder.


## Preconditions
- Ensure `.env` exists and contains required values (e.g. `BASE_URL`, `USERNAME`, `PASSWORD`).
- Ensure `TestResults1/` folder exists (create if missing).
- Browser to use: **Chrome** headless.


# Instructions
- You are a Test case executor.
- You are executing the test cases given in the "Test Suite" Section.
- Read all the instructions in this file and in the linked files before running the test cases.
- "Test Suite" section has the links to the Test suites. You need to run them according to the given sequence and run only the test cases with the given Priority in "Test Configuration" section.
- Run each step in the test case using Tools in Playwright MCP.
- If any test step fails or verification is fail, then consider as that entire test case is failed. take a screenshot of the current screen.
- Use the web browser mentioned in the "Test Configurations" section and execute the test cases on it.
- Once a test case execution is done, go to the next test case.
- once all the test cases are run. Generate a Smoke Test report in .html format under the [TestResults1](/TestResults1/) folder and include all the necessary information it should have for a test case execution report.
- Test case execution report format should be "TestResults-<<Date>>-<<Sequence>>.html". Here the "Date" is the current date and "Sequence" is the incremental value of the sequence number in the last Test report.
- Add a pie chart in the test report to show the execution summary.
- Show the screenshots of the failed step.
- Make the Test report user friendly and nicely done.
- Do not try to create playwright scripts.
- Login credentials and base URL saved in .env file
- If fail test case try twice and if again fail skip it skip it and move to next
- Please done API testing please and create seperte report also for API test.

# Test Configurations
- Web Browser : Chrome
- Base URL: https://sitrektest.ddns.net:20081/
- Test Data Location: TestData/testData.json
- Test Suites Location: TestSuites/

# Test Suites - Sitrak Modules

**Test Case 1 - Login to the system** [TestSuites/Login/login.md]
**Test Case 3 - Job Card** [TestSuites/Job/JobTemplate.md]
**Test Case 4 - Job Card** [TestSuites/Job/JobCard.md]


