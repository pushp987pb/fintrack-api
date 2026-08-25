# PR_DESCRIPTION.md

## 1. Summary of What Was Built and Why

The FinTrack Expense Splitting project introduces a robust feature for managing shared expenses. It builds on the existing Transaction module to allow users to split expenses equally or with custom amounts, validate splits, and calculate net balances between participants. This feature is essential for fintech applications where accurate financial calculations, data integrity, and security are critical.

## 2. Commit History

### Commit 1

chore: setup project standards and copilot instructions

Body:
- Added README.md
- Added .github/copilot-instructions.md
- Established project architecture standards
- Defined coding, validation, testing and security conventions

### Commit 2

docs: review transaction module for production readiness

Body:
- Reviewed AI-generated Transaction module
- Identified validation, authorization and architecture issues
- Documented findings in REVIEW.md
- Captured fintech-specific concerns and remediation recommendations

### Commit 3

refactor: remediate transaction module architecture

Body:
- Introduced repository pattern
- Added service, controller and route layers
- Implemented input validation using Zod
- Added authorization checks and pagination support

### Commit 4

feat: implement expense splitting feature

Body:
- Added SharedExpense and ParticipantShare models
- Implemented equal and custom split support
- Added net balance calculation service
- Created expense APIs and supporting repository layer

### Commit 5

test: add expense splitting test coverage

Body:
- Added test cases for equal and custom splits
- Added validation and unauthorized access tests
- Verified balance calculation scenarios

### Commit 6

docs: add architecture and assessment documentation

Body:
- Added ARCHITECTURE.md
- Added TOOL_STRATEGY.md
- Added PROMPTS.md
- Added PR_DESCRIPTION.md

## 3. AI Tool Disclosure

### Copilot Features Used

- Copilot Chat
- Copilot Inline Suggestions
- Copilot Code Generation
- Copilot Code Review

### Where AI Output Was Accepted
- Initial scaffolding of the Expense Splitting module.
- Documentation generation for `ARCHITECTURE.md` and `TOOL_STRATEGY.md`.

### Where AI Output Was Overridden

- Corrected the BalanceCalculationService implementation after the initial version did not fully satisfy the expense-splitting requirements.
- Fixed dependency injection in expense.routes.ts by passing ExpenseRepository into BalanceCalculationService.
- Reviewed and adjusted generated test cases to better align with authorization and business-rule validation requirements.
- Manually reviewed Prisma configuration and project structure after setup limitations on the corporate environment.

### Estimated AI-Generated vs Hand-Written Percentage
- **AI-Generated**: 70%
- **Hand-Written**: 30%

## 4. Testing Coverage

The following scenarios were tested:
1. **Equal split among 3 participants**: Validated that the total amount is split equally.
2. **Custom split validation success**: Ensured custom amounts match the total expense.
3. **Custom split validation failure**: Verified that mismatched totals throw an error.
4. **Net balance calculation**: Tested mutual debt reduction between users.
5. **Single participant scenario**: Confirmed that a single participant's amount equals the total expense.
6. **Unauthorized access attempt**: Ensured users cannot access expenses they are not part of.

## 5. Known Gaps

- **Pagination**: The `getSharedExpensesByUser` method does not currently support pagination, which may lead to performance issues with large datasets.
- **Currency Support**: The system assumes all expenses are in the same currency, which may not be suitable for international use cases.

## 6. One Genuine Implementation Risk or Trade-Off

**Risk**: Floating-point precision issues in financial calculations.  
**Trade-Off**: While validation logic includes a small tolerance for floating-point errors, this approach may not be sufficient for high-precision financial applications. A dedicated library like `decimal.js` could be integrated in the future.

## 7. Self-Review Checklist

- [x] All inputs are validated using `zod`.
- [x] Authorization checks are implemented for all routes.
- [x] Error handling is consistent across the application.
- [x] Test cases cover all critical scenarios.
- [x] Documentation is complete and up-to-date.
- [x] Code adheres to project standards (ESLint, Prettier).

## 8. Peer Review Simulation

### Comment 1: Validation Logic in `BalanceCalculationService`
**File/Location**: `balanceCalculation.service.ts`, `createSharedExpense` method  
**Suggestion**: Use a library like `decimal.js` for financial calculations to avoid floating-point precision issues.  
**Why**: Floating-point arithmetic can lead to subtle bugs in financial applications, especially with large or high-precision values.

### Comment 2: Missing Pagination in Repository
**File/Location**: `expense.repository.ts`, `getSharedExpensesByUser` method  
**Suggestion**: Add `skip` and `take` parameters to support pagination.  
**Why**: Without pagination, fetching large datasets could lead to performance bottlenecks and memory issues.

### Comment 3: Lack of Currency Support
**File/Location**: `SharedExpense` model in `prisma/schema.prisma`  
**Suggestion**: Add a `currency` field to the `SharedExpense` model and validate it against a list of supported currencies.  
**Why**: Fintech applications often deal with multi-currency transactions, and this feature would improve usability for international users.

---
