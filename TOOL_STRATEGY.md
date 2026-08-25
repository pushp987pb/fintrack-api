# TOOL_STRATEGY.md

## 1. Feature Usage Log

### Entry 1
- **Feature Used**: Copilot Chat
- **Why Chosen**: To generate the initial implementation of the Expense Splitting feature, including models, services, and routes.
- **Outcome**: A complete scaffold of the Expense Splitting module was generated, which was iteratively refined to meet project requirements.

### Entry 2
- **Feature Used**: Code Generation
- **Why Chosen**: To create the `BalanceCalculationService` with functionality for equal and custom splits, validation, and net balance calculations.
- **Outcome**: The service was generated with most of the required functionality, but additional refinements were needed to handle mutual debt simplification.

### Entry 3
- **Feature Used**: Copilot Inline Suggestions
- **Why Chosen**: To assist in writing Jest test cases for the Expense Splitting feature, particularly for edge cases like unauthorized access and invalid splits.
- **Outcome**: Inline suggestions provided accurate test case scaffolding, which was further refined to ensure proper mocking and validation.

### Entry 4
- **Feature Used**: Code Review
- **Why Chosen**: To identify potential issues in the Transaction module, including security gaps, validation weaknesses, and scalability concerns.
- **Outcome**: The review highlighted areas for improvement, such as adding input validation, error handling, and authorization checks, which were subsequently addressed.

### Entry 5
- **Feature Used**: Copilot Chat
- **Why Chosen**: To generate `ARCHITECTURE.md` and document the relationship between modules, layered architecture, and security considerations.
- **Outcome**: Clear and concise documentation was created, ensuring the architecture is well-understood by developers and stakeholders.

### Entry 6
- **Feature Used**: Copilot Chat
- **Why Chosen**: To resolve a Prisma SSL setup issue during database configuration for production.
- **Outcome**: Copilot Chat provided guidance on configuring Prisma to use SSL for secure database connections, ensuring compliance with fintech security standards.

---

## 2. Scenario Responses

### Scenario 1: Understanding a complex 500-line function in an unfamiliar codebase
- **Feature**: Copilot Chat
- **Why Appropriate**: Copilot Chat can explain the purpose and logic of large, complex functions, breaking them down into understandable parts for faster onboarding and debugging.

### Scenario 2: Adding consistent error handling across existing route handlers
- **Feature**: Code Generation
- **Why Appropriate**: Code Generation can suggest reusable error-handling middleware and patterns, ensuring consistency across all route handlers.

### Scenario 3: Quickly verifying a regex handles international phone number formats
- **Feature**: Copilot Inline Suggestions
- **Why Appropriate**: Inline Suggestions can provide accurate regex patterns and validate their correctness by suggesting test cases or examples.

### Scenario 4: Enforcing automated code quality checks on every pull request with no human intervention
- **Feature**: Code Generation
- **Why Appropriate**: Code Generation can create GitHub Actions workflows to automate linting, testing, and other quality checks for every pull request.

### Scenario 5: Reviewing a teammate's AI-generated authentication module for security vulnerabilities
- **Feature**: Code Review
- **Why Appropriate**: Code Review can identify potential security issues, such as missing input validation or improper token handling, and suggest improvements.

### Scenario 6: Ensuring Copilot follows project-specific conventions consistently across all developers and sessions
- **Feature**: Copilot Inline Suggestions
- **Why Appropriate**: Inline Suggestions adapt to the project's coding style and conventions, ensuring consistency across all contributions.

---

## 3. Limitations Encountered

### Limitation 1: Prisma SSL Setup Issue
- **Prompt Used**: "Configure Prisma to use SSL for secure database connections."
- **What Went Wrong**: The initial configuration provided by Copilot did not include the correct `sslmode` settings for the production database.
- **How Detected**: The application failed to connect to the database in production, and the error logs indicated SSL issues.
- **Fix Applied**: Updated the Prisma configuration to include `sslmode=require` and verified the connection with the database provider's documentation.
- **What Would Be Done Differently**: Provide a more detailed prompt specifying the database provider and environment to ensure accurate configuration.

### Limitation 2: Net Balance Simplification in `BalanceCalculationService`
- **Prompt Used**: "Rewrite balanceCalculation.service.ts to satisfy the following assessment requirements..."
- **What Went Wrong**: The initial implementation did not handle mutual debt reductions correctly (e.g., User A owes User B 30, User B owes User A 10).
- **How Detected**: During manual review, it was noted that the balances were not simplified.
- **Fix Applied**: Added logic to subtract mutual debts between users, ensuring accurate net balances.
- **What Would Be Done Differently**: Include specific examples in the prompt to clarify the requirement for mutual debt reduction.

### Limitation 3: Test Case for Unauthorized Access
- **Prompt Used**: "Create Jest test cases for the Expense Splitting feature..."
- **What Went Wrong**: The unauthorized access test case did not properly simulate the scenario, as the repository was not mocked correctly.
- **How Detected**: The test case passed without actually validating authorization logic.
- **Fix Applied**: Updated the test to mock repository responses and ensure proper authorization checks.
- **What Would Be Done Differently**: Provide a more detailed prompt specifying the need for mocked dependencies and explicit authorization validation.

---
