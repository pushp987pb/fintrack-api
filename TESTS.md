# TESTS.md

## Overview
This document summarizes the unit and integration tests implemented in `tests/expense-splitting.test.ts`.  
The tests validate the core functionality of the **BalanceCalculationService** and ensure that both the Transaction and Expense Splitting modules behave correctly under different scenarios.

---

## Covered Test Cases

1. **Equal Split Among 3 Participants**
   - **Scenario**: Expense of 300 split equally among 3 users.
   - **Expected Result**: Each participant owes 100.  
   - **Purpose**: Confirms correct equal split logic.

2. **Custom Split — Valid**
   - **Scenario**: Expense of 300 split as [150, 100, 50].
   - **Expected Result**: Validation passes, amounts match total.  
   - **Purpose**: Ensures custom splits are accepted when sums equal total.

3. **Custom Split — Invalid**
   - **Scenario**: Expense of 300 split as [150, 100].
   - **Expected Result**: Throws error `"Custom split amounts must equal the total expense amount."`  
   - **Purpose**: Validates rejection of incorrect custom splits.

4. **Net Balance Calculation Between Two Users**
   - **Scenario**: Multiple shared expenses between User 1 and User 2.  
     - Dinner: 100 split equally.  
     - Trip: 200 split equally.  
   - **Expected Result**: Net balance = `{ 2: -50 }` (User 1 owes User 2 50).  
   - **Purpose**: Confirms net balance logic across multiple expenses.

5. **Single Participant Edge Case**
   - **Scenario**: Expense of 100 with only one participant.  
   - **Expected Result**: Participant recorded with full amount (100).  
   - **Purpose**: Ensures system handles or gracefully accepts solo expenses.

6. **Unauthorized Access Attempt**
   - **Scenario**: User 1 tries to access expenses created by User 2.  
   - **Expected Result**: No balances returned (`{}`).  
   - **Purpose**: Validates authorization rules and data isolation.

---

## Execution
Run tests with:
```bash
npm test
