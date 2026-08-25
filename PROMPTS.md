# PROMPTS.md

## Overview

GitHub Copilot was used throughout this project for code generation, code review, documentation generation, test creation, and iterative refinement.

### Copilot Features Used

- Copilot Chat
- Copilot Inline Suggestions

### Prompting Techniques Used

- Instruction Configuration
- Role-Based Prompting
- Constraint-Based Prompting
- Specificity
- Decomposition
- Iterative Refinement
- Reflection
- Context-Aware Prompting
- Few-Shot Prompting

This satisfies the assessment requirement of using at least two Copilot features and at least three prompting techniques.

---

# Prompts Used During Development

## Prompt 0

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Instruction Configuration

**Brief Rationale:** Established prompt tracking expectations for project documentation.

**Exact Prompt:**

For this project, whenever prompt history is requested, help maintain a record of prompts used for development activities so they can be documented later in PROMPTS.md.

---

## Prompt 1

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Role-Based Prompting + Specificity

**Brief Rationale:** Generated project standards and Copilot instructions for consistent development practices.

**Exact Prompt:**

You are a senior fintech backend architect.

Create a comprehensive GitHub Copilot instructions file for a fintech expense management API using:

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Jest

Requirements:

- Layered architecture
- Repository pattern
- Input validation
- Structured logging
- Security best practices
- Authorization rules
- Error handling standards
- Documentation expectations
- Testing conventions

Generate only the contents of .github/copilot-instructions.md in markdown format.

---

## Prompt 2

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Direct Prompt (Assessment Required)

**Brief Rationale:** Generated the intentionally unreviewed Transaction module required by the assessment.

**Exact Prompt:**

Generate a Transaction model and a Transaction service with create, get-by-user, and delete-all functions. Use a database.

---

## Prompt 3

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Role-Based Prompting + Specificity + Review Analysis

**Brief Rationale:** Performed a production-readiness review on AI-generated Transaction code.

**Exact Prompt:**

Act as a senior fintech software engineer performing a production readiness review.

Review the following Transaction model and Transaction service.

Identify:

- Security issues
- Authorization problems
- Validation gaps
- Architecture violations
- Error handling weaknesses
- Scalability concerns
- Data integrity risks
- Fintech-specific concerns

For each issue provide:

- Location
- Severity
- Impact
- Recommended Fix

Return results as structured markdown suitable for REVIEW.md.

---

## Prompt 4

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Role-Based Prompting + Constraint-Based Prompting + Decomposition

**Brief Rationale:** Refactored the Transaction module into a production-ready implementation.

**Exact Prompt:**

Act as a senior fintech backend engineer.

Refactor the reviewed Transaction module into a production-ready implementation.

Requirements:

- TypeScript
- Prisma ORM
- Layered architecture

Generate:

1. transaction.repository.ts
2. transaction.service.ts
3. transaction.controller.ts
4. transaction.routes.ts

Requirements:

- Repository pattern
- Input validation
- Structured logging
- Authorization checks
- Error handling
- Type safety
- Public method documentation
- No direct Prisma access outside repository layer

Return complete file contents.

---

## Prompt 5

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Role-Based Prompting + Decomposition + Constraint-Based Prompting

**Brief Rationale:** Generated the Expense Splitting feature architecture and implementation.

**Exact Prompt:**

Act as a senior fintech backend engineer.

Build the Expense Splitting feature on top of the remediated Transaction module.

Create:

1. SharedExpense model
2. ParticipantShare model
3. Expense repository
4. BalanceCalculationService
5. Expense controller
6. Expense routes

Requirements:

- Equal split support
- Custom split support
- Validation that custom amounts equal total expense amount
- Net balance calculations
- Repository pattern
- Structured logging
- Authorization
- TypeScript
- Prisma ORM

Generate complete code for each file separately.

---

## Prompt 6

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Constraint-Based Prompting + Specificity + Iterative Refinement

**Brief Rationale:** Improved the initially generated BalanceCalculationService.

**Exact Prompt:**

The current BalanceCalculationService is incomplete.

Rewrite balanceCalculation.service.ts to satisfy the following assessment requirements:

- Create shared expense
- Equal split calculation
- Custom split calculation
- Validate custom split totals
- Calculate net balances between users

Example:

User A owes User B 30

User B owes User A 10

Return:

User A owes User B 20

Use TypeScript.

Integrate with ExpenseRepository.

Include public method documentation.

Return the complete file content only.

---

## Prompt 7

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Constraint-Based Prompting + Few-Shot Prompting + Specificity

**Brief Rationale:** Generated assessment-required unit tests.

**Exact Prompt:**

Create Jest test cases for the Expense Splitting feature.

Cover exactly these scenarios:

1. Equal split among 3 participants

2. Custom split where participant amounts equal the total

3. Custom split where participant amounts do not equal the total

4. Net balance calculation between two users with multiple shared expenses

5. Expense with only one participant

6. Unauthorized access attempt

Use TypeScript, Jest and mocked repositories.

Return complete test file.

---

## Prompt 8

**Copilot Feature Used:** Copilot Inline Suggestions

**Prompting Technique Used:** Context-Aware Prompting

**Brief Rationale:** Used inline completions to generate documentation comments and improve code consistency.

**Exact Prompt:**

Generate JSDoc comments for public methods in ExpenseController and ExpenseRepository.

---

## Prompt 9

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Documentation Generation + Prompt Chain Analysis + Reflection

**Brief Rationale:** Initial attempt to generate PROMPTS.md.

---

## Prompt 10

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Constraint-Based Prompting + Specificity

**Brief Rationale:** Generated project architecture documentation.

**Exact Prompt:**

Create ARCHITECTURE.md for the FinTrack Expense Splitting project.

Length: 10-15 lines.

Include:

- Relationship between Transaction and Expense Splitting modules
- Layered architecture
- Data flow
- Security considerations
- Why this architecture is suitable for a fintech application
- Key design decisions

Return markdown only.

---

## Prompt 11

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Role-Based Prompting + Constraint-Based Prompting + Reflection

**Brief Rationale:** Generated TOOL_STRATEGY.md.

---

## Prompt 12

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Iterative Refinement + Constraint-Based Prompting + Reflection

**Brief Rationale:** Refined TOOL_STRATEGY.md to better align with actual project activities and requirements.

---

## Prompt 13

**Copilot Feature Used:** Copilot Chat

**Prompting Technique Used:** Role-Based Prompting + Constraint-Based Prompting + Reflection

**Brief Rationale:** Generated PR_DESCRIPTION.md.

---

# Post-Generation Corrections

## Transaction Module Corrections

Issues identified:

- Missing authorization checks
- Missing input validation
- Direct Prisma access inside service layer
- Missing repository layer
- Missing error handling
- Missing architectural separation
- Use of Float for financial data

Corrections applied:

- Added repository pattern
- Added controller and routes
- Added Zod validation
- Added authorization enforcement
- Improved layering and maintainability
- Recommended Decimal-based financial modelling

---

## BalanceCalculationService Corrections

Issues identified:

- Initial implementation only calculated basic balances
- Missing equal split support
- Missing custom split validation
- Missing net balance simplification

Corrections applied:

- Added equal split calculation
- Added custom split validation
- Added balance reconciliation logic
- Integrated ExpenseRepository

---

## Expense Route Corrections

Issue identified:

- BalanceCalculationService dependency was not properly initialized.

Correction applied:

- Passed ExpenseRepository instance into BalanceCalculationService constructor inside expense.routes.ts.

---

## Test Improvements

Issues identified:

- Generated tests required review for authorization and repository mocking behaviour.

Corrections applied:

- Improved repository mocks
- Improved validation coverage
- Verified all assessment-required scenarios

---

## Prisma SSL Environment Issue

Issue encountered:

- Prisma CLI operations failed due to SSL certificate restrictions on the corporate environment.

Corrections applied:

- Created schema files manually
- Continued architecture implementation without blocking development progress

---

## Production Readiness Improvements

Additional improvements applied after AI generation:

- Added comprehensive REVIEW.md
- Added architecture documentation
- Added tool strategy documentation
- Added pull request documentation
- Added authorization guidance
- Added validation strategy
- Added documentation comments
- Added testing coverage

---

## Conclusion

GitHub Copilot accelerated implementation, review, testing, and documentation activities throughout the project. All generated output was reviewed and refined using developer judgment before inclusion in the final submission.
