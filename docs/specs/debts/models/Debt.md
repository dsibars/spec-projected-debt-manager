# Model: Debt

## Properties
- `id`: Unique identifier (String/UUID).
- `personId`: Reference to [[specs/people/models/Person]].
- `name`: Description of the debt (String, Required).
- `totalAmount`: Original amount (Integer, in cents/smallest currency unit, Positive).
- `currentBalance`: Remaining amount (Integer, in cents, 0 <= currentBalance <= totalAmount).
- `currency`: Currency code (String, e.g., "USD", "EUR", default "USD").
- `direction`: One of `OWED_TO_ME` or `I_OWE`.
- `dueDate`: Optional timestamp for when the debt should be settled.
- `notes`: Optional text for additional context.
- `tagIds`: List of references to [[models/Tag]].
- `isDeleted`: Boolean for soft deletion.
- `createdAt`: Timestamp.
- `updatedAt`: Timestamp.

## Status (Derived)
- `isPaid`: true if `currentBalance` == 0.
- `isOverdue`: true if `dueDate` is in the past and `currentBalance` > 0.

## Relationships
- Belongs to one **Person**.
- Has many **Payments** ([[models/Payment]]).
