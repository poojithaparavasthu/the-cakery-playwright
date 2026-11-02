The Cakery – Playwright Automation Testing Project

A web-based bakery shopping application built as a practical QA portfolio project to demonstrate manual testing and UI automation using Playwright.

Live Website: https://poojithaparavasthu.github.io/the-cakery-playwright/

GitHub Repository: https://github.com/poojithaparavasthu/the-cakery-playwright

Project Overview

The Cakery is a sample online cake-shopping website that allows users to browse products, customise birthday cakes, manage their cart and complete a demo checkout.

The project focuses on validating real-world e-commerce user workflows, identifying UI and functional issues, and automating key scenarios using Playwright.

Key Application Features

Product listing and category browsing

Product search and sorting

Wishlist functionality

Add-to-cart functionality

Cart quantity management and item removal

Personalised birthday cake customisation

Checkout form and input validation

Coupon application (SWEET10)

Demo order confirmation

Testing Tools & Technologies

Playwright – UI automation testing

JavaScript – Automation test scripts

Visual Studio Code – Development and test execution

Git & GitHub – Version control and project repository

GitHub Actions – Continuous Integration (CI)

HTML, CSS & JavaScript – Website technologies

Automated Test Coverage

The Playwright test suite covers key application workflows, including:

Homepage loading and page title validation

Adding products to the shopping cart

Cart count validation

Verifying the correct product is added

Cart persistence after page refresh

Product price validation

Cross-Browser Testing

Automated tests are executed across three browser engines:

Chromium

Firefox

WebKit

The latest successful GitHub Actions execution completed 18 test executions across all three browsers.

Running the Tests Locally

1. Clone the repository

git clone https://github.com/poojithaparavasthu/the-cakery-playwright.git

2. Navigate to the project folder

cd the-cakery-playwright

3. Install dependencies

npm install

4. Install Playwright browsers

npx playwright install

5. Execute the automated tests

npx playwright test

6. View the HTML test report

npx playwright show-report

Continuous Integration

GitHub Actions is configured to execute the Playwright automation suite automatically when changes are pushed to the repository.

The workflow validates the application through automated browser testing and provides execution results.

Project Objective

This project demonstrates practical experience in validating web application functionality, writing and executing automated UI test cases, performing cross-browser testing and integrating automation tests with a CI workflow.

Note: This is a demonstration e-commerce application. Orders and checkout are simulated; no real payment processing or backend order placement is involved.