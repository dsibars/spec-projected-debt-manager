# Debts Module Presentation

## Components

### Debt Card
Follows the standard Card anatomy defined in `@specs/shared/presentation.md`.
- **Header:** Shows the debt `name` and the associated `Person`'s name.
- **Body:** Shows `currentBalance` vs `totalAmount` using a visual progress bar.
- **Footer/Actions:** Quick actions like "Mark as Paid" or "Edit".
- **Direction Indicator:** Must strictly use `Emerald` for "They owe me" (`OWED_TO_ME`) and `Rose` for "I owe them" (`I_OWE`). This applies to the balance text and the progress bar fill.
- **Tag Chips:** Small, pill-shaped labels for tags using the `Secondary` text color on a `Light Gray` background.

### Empty State
- **Message:** "No debts found." or "You're all settled up!"
- **CTA:** Primary button "Add a Debt".

## Interaction States
- **Hover:** On desktop, hovering over a Debt Card should slightly elevate it (shadow increase) and reveal hidden quick actions.
- **Swipe:** On mobile, swiping a card to the left should reveal a quick "Pay" action, and swiping right should reveal a "Delete" action (in Rose).
- **Settled/Paid Debts:** Debts with a zero balance should visually recede by applying a 60% opacity to the entire card or displaying a prominent "Settled" watermark overlay.

## Mobile View
- **Ledger Feed:** A vertical, scrollable list of active debts.
- **Floating Action Button (FAB):** A prominent primary-colored button in the bottom right for adding a new debt.

## Desktop View
- **Dashboard Grid:** Cards arranged in a responsive grid.
- **Filter Bar:** A sidebar or top bar with segmented controls or pills for filtering by People, Directions, and Tags.
