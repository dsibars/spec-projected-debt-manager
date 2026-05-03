# Use Case: Filter By Tag

## Flow
1. Receive `tagId`.
2. Retrieve all [[specs/debts/models/Debt]] where `tagIds` contains `tagId`.
3. Aggregate balances for the filtered set.
4. Return summary.
