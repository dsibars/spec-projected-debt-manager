# Model: Debt

## Properties
- `id`: Unique identifier (String/UUID).
- `personId`: Reference to [[specs/people/models/Person]].
- `name`: Description of the debt (String, Required).
- `totalAmount`: Original amount (Decimal/Number, Positive).
- `currentBalance`: Remaining amount (Decimal/Number, 0 <= currentBalance <= totalAmount).
- `direction`: One of `OWED_TO_ME` or `I_OWE`.
- `tagIds`: List of references to [[models/Tag]].
- `isDeleted`: Boolean for soft deletion.
- `createdAt`: Timestamp.
- `updatedAt`: Timestamp.

## Status (Derived)
- `isPaid`: true if `currentBalance` == 0.
