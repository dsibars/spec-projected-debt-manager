# Use Case: Create Debt

## Flow
1. Receive `personId`, `name`, `totalAmount`, `direction`, and optional `tagNames`.
2. Verify `personId` exists in [[specs/people/models/Person]].
3. Validate `totalAmount` is positive.
4. For each `tagName`:
    - Check if [[models/Tag]] exists.
    - If not, create new [[models/Tag]].
    - Collect `tagIds`.
5. Create [[models/Debt]] with `currentBalance` = `totalAmount`.
6. Store [[models/Debt]].

## Errors
- `PersonNotFound`
- `InvalidAmount`
