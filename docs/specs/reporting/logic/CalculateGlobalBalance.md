# Use Case: Calculate Global Balance

## Flow
1. Retrieve all [[specs/debts/models/Debt]] where `isDeleted` is false.
2. Calculate `totalReceivable` (Sum of `currentBalance` where direction is `OWED_TO_ME`).
3. Calculate `totalPayable` (Sum of `currentBalance` where direction is `I_OWE`).
4. Calculate `netBalance` = `totalReceivable` - `totalPayable`.
5. Return all three values.
