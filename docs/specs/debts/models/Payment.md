# Model: Payment

Represents a partial or full payment made towards a specific Debt.

## Properties
- `id`: Unique identifier (String/UUID).
- `debtId`: Reference to [[models/Debt]].
- `amount`: Amount paid (Integer, in cents, Positive).
- `date`: Timestamp when the payment was made.
- `notes`: Optional text for additional context.
- `isDeleted`: Boolean for soft deletion.
- `createdAt`: Timestamp.
- `updatedAt`: Timestamp.

## Constraints
- A payment cannot exceed the `currentBalance` of the associated Debt.
- `amount` must be greater than zero.

## Relationships
- Belongs to one **Debt**.
