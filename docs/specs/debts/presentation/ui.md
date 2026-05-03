# Debts Module Presentation

## Components
- **Debt Card:** Shows name, person, total vs current, and a progress bar.
- **Direction Indicator:** Green for "They owe me", Red for "I owe them".
- **Tag Chips:** Small labels for tags.

## Mobile View
- **Ledger Feed:** Scrollable list of active debts.
- **Quick Pay Button:** One-tap to mark as fully paid or open amount editor.

## Desktop View
- **Dashboard Grid:** Cards arranged in a grid.
- **Filter Bar:** Sidebar with checkboxes for People, Directions, and Tags.

## Overrides
- Use `Emerald` for `OWED_TO_ME`.
- Use `Rose` for `I_OWE`.
- Paid debts should be styled with lower opacity or a "Settled" watermark.
