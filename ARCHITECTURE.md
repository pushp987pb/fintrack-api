# ARCHITECTURE.md

## Overview
The FinTrack Expense Splitting project follows a modular, layered architecture designed for scalability, maintainability, and fintech‑grade security. It integrates the **Transaction module** with the **Expense Splitting module** to handle both individual transactions and shared expense management.

## Relationship Between Modules
- The **Transaction module** manages individual financial records.  
- The **Expense Splitting module** builds on top of it to manage shared expenses among multiple participants.  
- Shared expenses generate participant shares, which are linked to transactions for consistency, auditability, and accurate balance calculations.

## Layered Architecture & Data Flow
+-------------------+
|   Client Request  |
+-------------------+
          |
          v
+-------------------+
|      Routes       |   (transaction.routes.ts / expense.routes.ts)
+-------------------+
          |
          v
+-------------------+
|    Controllers    |   (transaction.controller.ts / expenses.controller.ts)
+-------------------+
          |
          v
+-------------------+
|     Services      |   (transaction.service.ts / balanceCalculation.service.ts)
+-------------------+
          |
          v
+-------------------+
|   Repositories    |   (transaction.repository.ts / expense.repository.ts)
+-------------------+
          |
          v
+-------------------+
|      Models       |   (Prisma models: Transaction, SharedExpense, ParticipantShare)
+-------------------+
          |
          v
+-------------------+
|    Database       |   (SQLite via Prisma ORM)
+-------------------+


## Why This Architecture Fits Fintech
- **Security**: Authorization ensures users only access their own data; validation prevents invalid or malicious input.  
- **Data Integrity**: Prisma ORM enforces constraints such as unique participant shares and balanced splits.  
- **Auditability**: Transactions and shared expenses are linked for transparent financial tracking.  
- **Scalability**: Layered design supports future enhancements like payment gateway integration.  
- **Maintainability**: Clear separation of concerns makes testing and debugging straightforward.

## Key Design Decisions
- **Repository Pattern**: Decouples database logic from business logic for testability.  
- **Validation with Zod**: Strict input validation ensures correctness of financial data.  
- **Structured Logging (Winston)**: Provides traceability for financial operations.  
- **SQLite for Evaluation**: Chosen for simplicity so evaluators can run the project without external setup.  
- **Net Balance Simplification**: Optimized calculations ensure accuracy in multi‑expense scenarios.
