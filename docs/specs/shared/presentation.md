# Shared Presentation Guidelines

## Core Visual Concepts
The Debt Manager application should feel trustworthy, clean, and efficient. It uses a "Ledger" metaphor where clarity of balance is paramount.

## Design Tokens

### Colors
- **Primary:** Navy Blue (#1E3A8A) - Stability and trust.
- **Secondary:** Slate (#64748B) - Neutral information.
- **Positive (They owe me):** Emerald (#059669) - Growth/Receivable.
- **Negative (I owe them):** Rose (#E11D48) - Liability/Payable.
- **Background:** White (#FFFFFF) / Light Gray (#F8FAFC).
- **Text:** Slate-900 (#0F172A) for primary, Slate-500 (#64748B) for secondary.

### Typography
- **Primary Font:** Sans-serif (Inter, Roboto, or system default).
- **Scale:**
  - Header: 1.5rem, Bold.
  - Subheader: 1.25rem, Semi-bold.
  - Body: 1rem, Regular.
  - Caption: 0.875rem, Regular.

## Global UI Patterns
- **Binary Choices**: Use a Toggle or Switch for binary states (e.g., "I owe" vs "They owe me").
- **Empty States**: Every list must provide an empty state with a clear CTA.
- **Currency**: Always show currency symbols and two decimal places (e.g., $10.00).

## Layout Principles
- **Responsive:** Mobile-first approach.
- **Desktop:** Use sidebars or multi-column layouts to take advantage of wider screens.
- **Mobile:** Single column, bottom navigation or drawer for actions.
- **Spacing:** Use a consistent 4px grid (rem units).

## Component Guidelines
- **Buttons:** Clear primary/secondary distinctions. Destructive actions (delete) in Rose.
- **Cards:** Used to group related information (e.g., a Person's profile, a Debt entry).
- **Forms:** Labels above inputs, clear error states.
