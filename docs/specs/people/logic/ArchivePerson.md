# Use Case: Archive Person

## Flow
1. Receive `personId`.
2. Retrieve [[models/Person]].
3. Check for active debts associated with this person.
   - If active debts exist (balance > 0 and not soft-deleted), reject the archival request.
4. Set `isArchived` to true (or `isDeleted` if treating it as a soft delete).
5. Store [[models/Person]].

## Note
- This is a soft deletion. The person's history remains intact for reporting, but they will not appear in the active People List or in selection dropdowns for new debts.

## Errors
- `PersonNotFound`
- `HasActiveDebts`: Cannot archive a person who still has outstanding active debts.
