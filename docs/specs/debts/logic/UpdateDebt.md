# Use Case: Update Debt

## Flow
1. Receive `debtId` and update fields (`name`, `totalAmount`, `dueDate`, `direction`, `tagIds`, etc.).
2. Retrieve [[models/Debt]].
3. If `totalAmount` is being updated:
    - Calculate `amountPaid = oldTotalAmount - oldCurrentBalance`.
    - If `newTotalAmount < amountPaid`:
        - Reject update (cannot reduce total below what has already been paid).
    - Update `currentBalance = newTotalAmount - amountPaid`.
4. Update other fields and `updatedAt`.
5. Store [[models/Debt]].

## Errors
- `DebtNotFound`
- `InvalidTotalAmount`: Occurs if the new total is less than the amount already paid.
