# Use Case: Restore Debt

## Flow
1. Receive `debtId`.
2. Retrieve [[models/Debt]].
3. Check if `isDeleted` is true. If false, do nothing or return a warning.
4. Set `isDeleted` to false.
5. Store [[models/Debt]].

## Errors
- `DebtNotFound`
