# GitHub Copilot Instructions for FinTrack API

## Project Overview
FinTrack is a TypeScript and Express API prototype created for a GitHub Copilot skill-based assessment. It demonstrates review and refinement of an AI-generated Transaction module and implementation of shared expense splitting. Keep changes focused on assessment requirements and preserve clear evidence of human review.

---

## Architecture Guidelines

### Layered Architecture
- **Presentation Layer**: Handles HTTP requests and responses using Express.
- **Service Layer**: Contains business logic and orchestrates data flow between the presentation and data layers.
- **Data Layer**: Implements the repository pattern using Prisma ORM for database operations.

### Repository Pattern
- Define repository interfaces for data access.
- Implement repositories using Prisma to interact with the SQLite database.
- Ensure the service layer depends on repository interfaces, not implementations, to enable flexibility and testability.

---

## Development Standards

### Input Validation
- Use Zod for validating incoming request payloads.
- Validate all user inputs at the controller level before passing data to the service layer.

### Current Runtime
- Use Prisma ORM 6 with SQLite and keep schema changes in `prisma/migrations/`.
- Use `npm.cmd run dev`, `npm.cmd run build`, and `npm.cmd test -- --runInBand` for local verification.
- Run `npm.cmd exec prisma -- generate` and `npm.cmd exec prisma -- migrate dev` after schema changes.

### Security and Prototype Scope
- Prisma parameterizes database operations; validate all external input with Zod.
- `src/middleware/auth.ts` uses the `x-user-id` header as a development identity.
- Do not describe the development header as production authentication. JWT, users, roles, Helmet, rate limiting, and password hashing are future enhancements, not current features.

- Protected routes must use `requireUser` and access the typed `req.user.id` value.
- Users must only read, create, or delete data permitted for their current user ID.

### Error Handling Standards
- Use typed error handling for strict TypeScript catch variables.
- Return clear client errors for validation and authorization failures.
- Do not expose secrets, stack traces, or database internals in HTTP responses.

---

## Documentation Expectations
- Keep `README.md` runnable from a clean checkout and document headers and request bodies.
- Keep `REVIEW.md`, `PROMPTS.md`, `TOOL_STRATEGY.md`, `PR_DESCRIPTION.md`, and `ARCHITECTURE.md` accurate to the implementation.
- Do not claim that logging, Swagger, CI, encryption, or production authentication exists unless it is implemented.

---

## Testing Conventions
- Use Jest for unit and integration testing.
- Write unit tests for services and repositories.
- Write integration tests for API endpoints using `supertest`.
- Mock external dependencies (e.g., database, third-party APIs) in unit tests.
- Maintain the six required expense-splitting scenarios in `tests/expense-splitting.test.ts`.
- Prefer focused unit tests with mocked repositories; add Supertest tests for HTTP behavior when practical.
- Run the build and full test suite before claiming a change is complete.

---

## File Structure
src/
 ├── index.ts
 ├── transactions/
 ├── expenses/
 ├── middleware/
 └── types/

---

## Contribution Guidelines
- Use clear, concise Conventional Commit messages such as `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, or `chore:`.
- Open a pull request for all changes and ensure all tests pass before merging.

---

## File Hygiene
- Keep migrations, `package-lock.json`, source, tests, and assessment documentation in the submission.
- Do not commit `node_modules/`, `dist/`, `.env` files, SQLite runtime databases, logs, or coverage output.
