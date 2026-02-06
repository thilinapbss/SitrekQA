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
 ## Running Tests
 1 . Based on the instructions provided in the test-cases/login/login.md execute test cases for login module.
 2 . Based on the instructions provided in the test-cases/masters/ execute all test cases for master modules.
 3 . Based on the instructions provided in the test-cases/Job/jobTemplate.md execute all test cases for Job template.
 4 . Based on the instructions provided in the test-cases/Job/jobCard.md execute all test cases for Job card.
 5 .

---
## Generating Reports
After executing all the test cases, generate details for each test case execution in a user-friendly detailed HTML report format. reports save in the  test-reports foldercmmit

