# Shared Presentation Guidelines

## Core Visual Concepts
The Debt Manager application should feel trustworthy, clean, and efficient. It uses a "Ledger" metaphor where clarity of balance is paramount. Visuals must be strictly governed by the tokens below to ensure consistency across all implementations (web, desktop, mobile).

## Design Tokens

### Colors
- **Primary:** Navy Blue (#1E3A8A) - Stability and trust. Used for main actions and headers.
- **Secondary:** Slate (#64748B) - Neutral information.
- **Positive (They owe me):** Emerald (#059669) - Growth/Receivable.
- **Negative (I owe them):** Rose (#E11D48) - Liability/Payable.
- **Background:** White (#FFFFFF) / Light Gray (#F8FAFC).
- **Text:** Slate-900 (#0F172A) for primary, Slate-500 (#64748B) for secondary.
- **Warning:** Amber (#D97706) - Destructive but reversible actions, or overdue warnings.

### Typography
- **Primary Font:** Sans-serif (Inter, Roboto, or system default).
- **Scale:**
  - Header: 1.5rem, Bold.
  - Subheader: 1.25rem, Semi-bold.
  - Body: 1rem, Regular.
  - Caption: 0.875rem, Regular.

## Global UI Patterns
- **Binary Choices**: Use a Toggle or Switch for binary states (e.g., "I owe" vs "They owe me"). Segmented controls are preferred over checkboxes for equal choices.
- **Currency**: Always show currency symbols and two decimal places (e.g., $10.00).

## Standardized States
- **Empty States**: Every list or dashboard with no data must provide an empty state containing:
  - A subtle icon or illustration.
  - A short, encouraging message explaining what will appear here.
  - A clear call-to-action (CTA) button to create the first entry.
- **Loading States**: Use skeleton screens for content areas and spinners for buttons. Do not block the entire screen for minor fetches.
- **Error States**: Display inline error messages below form inputs in Rose. For systemic errors, use a toast or banner at the top of the screen.
- **Success States**: Provide brief, non-intrusive feedback (e.g., a green checkmark toast) when an action like saving or paying completes successfully.

## Structural Layouts
- **Responsive:** Mobile-first approach.
- **Desktop:** Use sidebars or multi-column layouts to take advantage of wider screens.
- **Mobile:** Single column, bottom navigation or drawer for actions.
- **Spacing:** Use a consistent 4px grid (rem units). Arbitrary spacing (e.g., 13px, 17px) is strictly prohibited.

## Component Anatomy
- **Cards:** Used to group related information (e.g., a Person's profile, a Debt entry). Must have:
  - A header (title and optional status/badge).
  - A body (primary information and metrics).
  - An optional footer (actions, timestamps).
- **Modals/Dialogs:** For focused tasks (creating a debt, adding a person). Must have a semi-transparent dark backdrop, a clear title, a close button (X), and primary/secondary actions at the bottom right.
- **Lists:** Rows must be consistently padded, with primary text on the left, secondary text below it, and values/actions on the far right.
- **Buttons:** Clear primary/secondary distinctions. Destructive actions (delete) must be in Rose.

