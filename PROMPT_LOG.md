# Prompt 0

Feature:
Copilot Chat

Technique:
Instruction Configuration

Prompt:

For this project, whenever prompt history is requested, help maintain a record of prompts used for development activities so they can be documented later in PROMPTS.md.

# Prompt 1

Feature:
Copilot Chat

Technique:
Role-Based + Specificity

Prompt:

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

# Prompt 2

Feature:
Copilot Chat

Technique:
Direct Prompt (Assessment Required)

Prompt:

Generate a Transaction model and a Transaction service with create, get-by-user, and delete-all functions. Use a database.

# Prompt 3

Feature: Copilot Chat

Technique: Role-Based Prompting + Specificity + Review Analysis

Prompt:

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

# Prompt 4

Feature:
Copilot Chat

Technique:
Role-Based + Constraint-Based + Decomposition

Prompt:

Act as a senior fintech backend engineer.

Refactor the reviewed Transaction module into a production-ready implementation.

Requirements:

- TypeScript
- Prisma ORM
- Layered architecture

Generate the following files separately:

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

# Prompt 5

Feature:
Copilot Chat

Technique:
Role-Based Prompting + Decomposition + Constraint-Based Prompting

Prompt:

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

# Prompt 6

Feature:
Copilot Chat

Technique:
Constraint-Based Prompting + Specificity + Iterative Refinement

Prompt:

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

# Prompt 7

Feature:
Copilot Chat

Technique:
Constraint-Based Prompting + Few-Shot Prompting + Specificity

Prompt:

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

# Prompt 8

Feature:
Copilot Inline Suggestions

Technique:
Context-Aware Prompting

Prompt:

Generate JSDoc comments for public methods in ExpenseController and ExpenseRepository.

# Prompt 9

Feature:
Copilot Chat

Technique:
Documentation Generation + Prompt Chain Analysis + Reflection

Prompt:

Generate PROMPTS.md for this project.

Include:

1. Every prompt used during development in chronological order.

For each prompt include:

- Exact prompt
- Copilot feature used
- Prompting technique used
- Brief rationale

2. Post-Generation Corrections

Document all changes made to Copilot generated code and explain why they were necessary.

Return the complete PROMPTS.md.

# Prompt 10

Feature:
Copilot Chat

Technique:
Constraint-Based Prompting + Specificity

Prompt:

Create ARCHITECTURE.md for the FinTrack Expense Splitting project.

Include:

- Relationship between Transaction and Expense Splitting modules
- Layered architecture
- Data flow
- Security considerations
- Why this architecture is suitable for a fintech application
- Key design decisions

Return markdown only.

# Prompt 11

Feature:
Copilot Chat

Technique:
Role-Based Prompting + Constraint-Based Prompting + Reflection

Prompt:

Create TOOL_STRATEGY.md for this GitHub Copilot assessment.

Requirements:

1. Feature Usage Log
   - Minimum 6 entries
   - Cover at least 4 GitHub Copilot features
   - For each entry include:
     - Feature used
     - Why that feature was chosen
     - Outcome

2. Scenario Responses

For each scenario below:
- Name the specific Copilot feature
- Explain why it is appropriate

Scenarios:
- Understanding a complex 500-line function in an unfamiliar codebase
- Adding consistent error handling across existing route handlers
- Quickly verifying a regex handles international phone number formats
- Enforcing automated code quality checks on every pull request with no human intervention
- Reviewing a teammate's AI-generated authentication module for security vulnerabilities
- Ensuring Copilot follows project-specific conventions consistently across all developers and sessions

3. Limitations Encountered

Provide 3 real limitations from this project including:
- Prompt used
- What went wrong
- How it was detected
- How it was fixed
- What would be done differently

Use realistic examples from this project.

Return markdown only.

# Prompt 12

Feature:
Copilot Chat

Technique:
Iterative Refinement + Constraint-Based Prompting + Reflection

Prompt:

Refine TOOL_STRATEGY.md.

Requirements:

1. Feature Usage Log must reference actual GitHub Copilot features including:
   - Copilot Chat
   - Copilot Inline Suggestions
   - Code Generation
   - Code Review

2. Use examples that actually occurred in this project.

3. Replace any generic or unrealistic examples.

4. Include the Prisma SSL setup issue as one of the limitations encountered.

Return complete TOOL_STRATEGY.md.

# Prompt 13

Feature:
Copilot Chat

Technique:
Role-Based Prompting + Constraint-Based Prompting + Reflection

Prompt:

Create PR_DESCRIPTION.md for the FinTrack Expense Splitting project.

Include:

1. Summary of what was built and why.

2. Commit History
   Use Conventional Commits format with descriptive bodies.

   Include:
   - standards setup
   - transaction review
   - transaction remediation
   - expense splitting feature
   - tests and documentation

3. AI Tool Disclosure
   - Copilot features used
   - Where AI output was accepted
   - Where AI output was overridden
   - Estimated AI-generated vs hand-written percentage

4. Testing Coverage
   Include:
   - Equal split among 3 participants
   - Custom split validation success
   - Custom split validation failure
   - Net balance calculation
   - Single participant scenario
   - Unauthorized access attempt

5. Known Gaps

6. One genuine implementation risk or trade-off

7. Self-Review Checklist

8. Peer Review Simulation

Provide 3 peer review comments.

Each comment must:
- identify a file/location
- suggest a change
- explain why

At least one comment should identify something AI tools commonly miss.

Return markdown only.
