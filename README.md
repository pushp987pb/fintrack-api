# FinTrack API

## Overview

FinTrack API is a fintech expense management service that supports transaction management and shared expense splitting between users.

This project was developed as part of the GitHub Copilot Skill-Based Assessment.

## Technology Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Jest

## Features

### Transaction Module

- Create transactions
- Retrieve transactions by user
- Delete transactions
- Repository-based architecture

### Expense Splitting Module

- Shared expenses
- Equal split calculation
- Custom split calculation
- Net balance calculation
- Participant share tracking

## Testing

The project includes automated tests covering:

- Equal split validation
- Custom split validation
- Invalid custom split handling
- Net balance calculations
- Single participant scenarios
- Unauthorized access attempts
