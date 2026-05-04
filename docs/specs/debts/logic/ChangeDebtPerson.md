# Use Case: Change Debt Person

## Flow
1. Receive `debtId` and `newPersonId`.
2. Retrieve [[models/Debt]].
3. Verify `newPersonId` exists in [[specs/people/models/Person]].
4. Update the `personId` on the Debt to `newPersonId`.
5. Update `updatedAt` to now.
6. Store [[models/Debt]].

## Errors
- `DebtNotFound`
- `PersonNotFound`
