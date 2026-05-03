# Use Case: Group Balances By Person

## Flow
1. Retrieve all active [[specs/debts/models/Debt]].
2. Group debts by `personId`.
3. For each person:
    - Sum their receivable and payable balances.
    - Fetch [[specs/people/models/Person]] details.
4. Return a list of Person summaries with their respective net balances.
