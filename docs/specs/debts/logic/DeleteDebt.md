# Use Case: Delete Debt

## Flow
1. Receive `debtId`.
2. Retrieve [[models/Debt]].
3. Set `isDeleted` to true.
4. Store [[models/Debt]].

## Note
- This is a soft deletion to maintain history.
