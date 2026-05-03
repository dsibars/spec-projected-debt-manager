# Use Case: Record Payment

## Flow
1. Receive `debtId`, `amount`, and optional `date`, `notes`.
2. Retrieve [[models/Debt]].
3. Validate `0 < amount <= currentBalance`.
4. Create [[models/Payment]] with:
    - `debtId`
    - `amount`
    - `date` (defaults to now)
    - `notes`
5. Update [[models/Debt]]:
    - `currentBalance = currentBalance - amount`
    - `updatedAt = now`
6. Store both [[models/Payment]] and [[models/Debt]].

## Errors
- `DebtNotFound`
- `Overpayment`: Amount exceeds remaining balance.
- `InvalidAmount`: Amount is zero or negative.
