# Use Case: Create Person

## Flow
1. Receive `name`, `email` (optional), `phone` (optional), and `groupIds` (optional).
2. Validate that `name` is not empty.
3. If `groupIds` are provided, verify they exist in the Store.
4. Generate a unique `id`.
5. Set `createdAt` and `updatedAt` to the current time.
6. Store the new [[models/Person]].
7. Return the created [[models/Person]].

## Errors
- `InvalidName`: If name is empty.
- `GroupNotFound`: If any provided Group ID does not exist.
