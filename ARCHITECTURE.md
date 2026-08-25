# ARCHITECTURE.md

## Overview
The FinTrack Expense Splitting project is built on a modular, layered architecture to ensure scalability, maintainability, and security. It integrates the Transaction module with the Expense Splitting module to handle financial transactions and shared expense management.

## Relationship Between Modules
The Transaction module manages individual financial transactions, while the Expense Splitting module builds on it to handle shared expenses. Shared expenses create multiple participant shares, which are stored as transactions for consistency and auditability.

## Layered Architecture
1. **Presentation Layer**: Handles HTTP requests and responses via Express controllers and routes.
2. **Service Layer**: Implements business logic, including expense splitting calculations and validation.
3. **Repository Layer**: Encapsulates database operations using Prisma ORM.

## Data Flow
1. A user creates a shared expense via the API.
2. The controller validates input and forwards it to the service layer.
3. The service layer calculates splits and interacts with the repository to persist data.
4. The repository layer ensures data integrity and stores transactions and participant shares.

## Security Considerations
- **Authorization**: Ensures users can only access their own data.
- **Validation**: Prevents invalid or malicious input.
- **Data Integrity**: Enforces constraints like unique participant shares and balanced splits.
- **Encryption**: Sensitive data is encrypted at rest and in transit.

## Suitability for Fintech
This architecture ensures compliance with fintech standards by prioritizing security, data integrity, and scalability. The modular design allows for future enhancements, such as integrating third-party payment systems.

## Key Design Decisions
- **Repository Pattern**: Decouples database logic from business logic for testability.
- **Validation**: Uses `zod` for strict input validation.
- **Net Balance Simplification**: Optimizes calculations for financial accuracy.
- **Scalability**: Supports large datasets with efficient queries and pagination.
