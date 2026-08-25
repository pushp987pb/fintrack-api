# FinTrack API

## Overview

FinTrack API is a fintech expense management service that supports transaction management and shared expense splitting between users.

This project was developed as part of the GitHub Copilot Skill-Based Assessment.

## Technology Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
 FinTrack is a TypeScript and Express API prototype for personal transactions and shared expense splitting. It was created for the GitHub Copilot skill-based assessment. The repository demonstrates Copilot-assisted generation, review, correction, testing, and documentation.
- Jest

 - Node.js and TypeScript
 - Express
 - Prisma ORM 6
 - SQLite
 - Zod validation
 - Jest and ts-jest
- Delete transactions
- Repository-based architecture

 ### Expense Splitting Module
 - Shared expenses
 - Equal split calculation
 - Custom split calculation
 - Net balance calculation
 - Participant share tracking
- Custom split calculation
- Net balance calculation
- Participant share tracking
 ## Project Structure

 ```text
 src/index.ts                         Express application entry point
 src/middleware/auth.ts               Development user authentication
 src/transactions/                    Transaction module
 src/expenses/                        Expense splitting module
 prisma/schema.prisma                 Database schema
 prisma/migrations/                   Database migrations
 tests/                               Jest tests
 ```
- Custom split validation
 ## Prerequisites

 - Node.js 18 or newer
 - npm

 ## Installation and Setup

 From the project root, install dependencies:

 ```powershell
 npm.cmd install
 ```

 Generate the Prisma Client and create the local SQLite database:

 ```powershell
 npm.cmd exec prisma -- generate
 npm.cmd exec prisma -- migrate dev --name init
 ```

 The database is created at `prisma/dev.db`. It is local runtime data and should not be included in the submission ZIP.

 ## Verify the Project

 Run the TypeScript build and the assessment tests:

 ```powershell
 npm.cmd run build
 npm.cmd test -- --runInBand
 ```

 The test suite contains six expense-splitting scenarios required by the assessment.

 ## Run the API

 Start the development server:

 ```powershell
 npm.cmd run dev
 ```

 The API listens on:

 ```text
 http://localhost:3000
 ```

 Keep the server terminal open while sending requests from Postman or another client. In PowerShell, use `npm.cmd` because the PowerShell `npm.ps1` wrapper may be blocked by execution policy.

 ## Authentication for Local Evaluation

 This assessment prototype uses a development header instead of JWT authentication. Every transaction and expense request must include:

 ```text
 x-user-id: 1
 ```

 The value represents the current user. A missing or invalid header returns `401 Unauthorized`. A user attempting to access another user's transactions receives `403 Forbidden`.

 ## API Usage

 ### Create a Transaction

 ```text
 POST /transactions
 ```

 Headers:

 ```text
 x-user-id: 1
 Content-Type: application/json
 ```

 Body:

 ```json
 {
	 "userId": 1,
	 "amount": 120,
	 "description": "Dinner"
 }
 ```

 ### Get Transactions

 ```text
 GET /transactions/1?skip=0&take=10
 ```

 Required header:

 ```text
 x-user-id: 1
 ```

 The path user ID must match the authenticated user ID.

 ### Delete Transactions

 ```text
 DELETE /transactions/1
 ```

 Required header:

 ```text
 x-user-id: 1
 ```

 This deletes all transactions belonging to user 1.

 ### Create an Equal Shared Expense

 ```text
 POST /expenses
 ```

 Headers:

 ```text
 x-user-id: 1
 Content-Type: application/json
 ```

 Body:

 ```json
 {
	 "description": "Team dinner",
	 "totalAmount": 300,
	 "splitType": "EQUAL",
	 "participants": [
		 { "userId": 1 },
		 { "userId": 2 },
		 { "userId": 3 }
	 ]
 }
 ```

 The service calculates a 100 share for each participant.

 ### Create a Custom Shared Expense

 ```text
 POST /expenses
 ```

 Body:

 ```json
 {
	 "description": "Trip",
	 "totalAmount": 300,
	 "splitType": "CUSTOM",
	 "participants": [
		 { "userId": 1, "amount": 150 },
		 { "userId": 2, "amount": 100 },
		 { "userId": 3, "amount": 50 }
	 ]
 }
 ```

 Custom participant amounts must be positive and must add up to `totalAmount`.

 ### Get Shared Expenses

 ```text
 GET /expenses
 ```

 Required header:

 ```text
 x-user-id: 1
 ```

 Returns shared expenses in which the current user is a participant.

 ### Get Net Balances

 ```text
 GET /expenses/net-balance
 ```

 Required header:

 ```text
 x-user-id: 1
 ```

 Example response:

 ```json
 {
	 "netBalance": {
		 "2": -50
	 }
 }
 ```

 A negative value means the current user owes that participant. A positive value means the participant owes the current user. The current prototype treats the expense creator as the payer.

 ## Assessment Documentation

 - `.github/copilot-instructions.md`: project-specific Copilot standards
 - `REVIEW.md`: review of the original AI-generated Transaction module
 - `PROMPTS.md`: Copilot prompt chain and post-generation corrections
 - `TOOL_STRATEGY.md`: Copilot feature usage, scenarios, and limitations
 - `PR_DESCRIPTION.md`: pull-request summary, AI disclosure, risks, and peer review
 - `ARCHITECTURE.md`: module relationship and layered architecture

 ## Known Scope Limitations

 - The `x-user-id` header is development-only authentication, not production JWT authentication.
 - The schema treats the expense creator as the payer; a separate payer or settlement model would be needed for full payment tracking.
 - Monetary calculations use JavaScript numbers at the service boundary even though database fields use Prisma `Decimal`; production financial calculations should use a decimal library or minor currency units.
 - The prototype does not include a user-management module, API documentation generation, or deployment configuration.
- Invalid custom split handling
- Net balance calculations
- Single participant scenarios
- Unauthorized access attempts
