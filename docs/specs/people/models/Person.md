# Model: Person

## Properties
- `id`: Unique identifier (String/UUID).
- `name`: Full name of the person (String, Required).
- `email`: Contact email (String, Optional).
- `phone`: Contact phone (String, Optional).
- `groupIds`: List of identifiers for groups this person belongs to (List of Strings).
- `createdAt`: Timestamp when created.
- `updatedAt`: Timestamp when last updated.

## Constraints
- `name` cannot be empty.
- `groupIds` refers to existing [[models/Group]] IDs.
- `isArchived`: Boolean for soft deletion.
