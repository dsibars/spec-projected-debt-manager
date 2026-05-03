# Use Case: Update Debt Amount

## Flow
1. Receive `debtId` and `newBalance`.
2. Retrieve [[models/Debt]].
3. Validate `0 <= newBalance <= totalAmount`.
4. Update `currentBalance` and `updatedAt`.
5. Store [[models/Debt]].

## Note
- Setting `newBalance` to 0 effectively marks the debt as paid.
