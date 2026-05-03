# Debts Module Glossary

- **Debt**: A financial obligation between the user and a [[specs/people/models/Person]].
- **Direction**: Whether the user owes money ("I owe them") or is owed money ("They owe me").
- **Total Amount**: The original amount of the debt.
- **Current Balance**: The remaining amount to be paid/received.
- **Payment**: An individual transaction that reduces the Current Balance of a Debt.
- **Tag**: A label applied to a Debt for grouping and filtering (e.g., "Dinner", "Rent").
- **Paid**: A status indicating the Current Balance is zero.
- **Overdue**: A status indicating the current date is past the Debt's Due Date and the balance is non-zero.
- **Cents**: The internal representation of money as an integer (1/100th of the basic currency unit).
