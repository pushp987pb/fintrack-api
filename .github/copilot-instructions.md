# GitHub Copilot Instructions for Fintech Expense Management API

## Project Overview
This project is a fintech expense management API built using Node.js, TypeScript, Express, Prisma ORM, and SQLite. The API is designed with a layered architecture, adhering to best practices for security, error handling, and maintainability. It includes structured logging, input validation, and comprehensive testing.

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
- Use `zod` or `class-validator` for validating incoming request payloads.
- Validate all user inputs at the controller level before passing data to the service layer.

### Structured Logging
- Use `winston` or `pino` for logging.
- Log all incoming requests, responses, errors, and critical application events.
- Include metadata such as timestamps, request IDs, and user IDs (if authenticated).

### Security Best Practices
- Sanitize all inputs to prevent SQL injection and XSS attacks.
- Use `helmet` middleware to set secure HTTP headers.
- Implement rate limiting with `express-rate-limit` to prevent abuse.
- Use environment variables for sensitive configurations (e.g., database credentials, JWT secrets).
- Hash sensitive data (e.g., passwords) using `bcrypt`.

### Authorization Rules
- Use JSON Web Tokens (JWT) for user authentication and authorization.
- Implement role-based access control (RBAC) to restrict access to specific endpoints.
- Validate JWTs in middleware and attach user context to requests.

### Error Handling Standards
- Use a centralized error-handling middleware.
- Define custom error classes (e.g., `ValidationError`, `AuthorizationError`) for different error types.
- Return consistent error responses with HTTP status codes and descriptive messages.

---

## Documentation Expectations
- Use `swagger-jsdoc` and `swagger-ui-express` to generate and serve API documentation.
- Document all endpoints with descriptions, request/response schemas, and example payloads.
- Maintain a `README.md` file with setup instructions, usage examples, and contribution guidelines.

---

## Testing Conventions
- Use Jest for unit and integration testing.
- Write unit tests for services and repositories.
- Write integration tests for API endpoints using `supertest`.
- Mock external dependencies (e.g., database, third-party APIs) in unit tests.
- Ensure 100% test coverage for critical business logic.
- Use a separate SQLite database for testing.

---

## File Structure
src/
 ├── modules/
 │   ├── transactions/
 │   └── expenses/
 ├── middleware/
 ├── utils/
 ├── config/
 └── app.ts

---

## Contribution Guidelines
- Follow the coding standards defined in the `.eslintrc` and `.prettierrc` files.
- Write clear and concise commit messages.
- Open a pull request for all changes and ensure all tests pass before merging.
- Review the API documentation and update it as needed for new features or changes.

---

## Continuous Integration
- Use GitHub Actions for CI/CD.
- Run linting, testing, and type-checking workflows on every pull request.
- Deploy to production only after passing all checks and reviews.

---

## Additional Notes
- Always prioritize security and data integrity.
- Ensure the application is scalable and maintainable.
- Regularly review and refactor code to adhere to best practices.
