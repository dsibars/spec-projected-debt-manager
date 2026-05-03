# Skill: UI Patterns

## Description
Standardized UI/UX patterns to ensure consistency across the application.

## 1. Binary Toggles
- **When to use**: For settings or choices with exactly two states (e.g., "I owe" vs "They owe me", "Active" vs "Archived").
- **Implementation**: Use a toggle switch or a segmented button group rather than a checkbox when the choice is between two equal options rather than "On/Off".

## 2. Empty States
- **When to use**: When a list or dashboard has no data.
- **Guidance**:
    - Include a friendly illustration or icon.
    - Provide a clear call-to-action (CTA) button (e.g., "Add your first debt").
    - Briefly explain the value of the feature.

## 3. Input Masking & Validation
- **Currency Inputs**: Automatically format as the user types (e.g., adding decimal points, restricting to numbers).
- **Immediate Feedback**: Show validation errors inline as the user finishes typing (on blur) or if they attempt to submit invalid data.

## 4. Confirmation Dialogs
- **When to use**: For destructive actions (Delete, Reset).
- **Guidance**: Use "Rose" (Red) for the action button and clearly state what will be lost.

## 5. Ledger Visualization
- **History**: Display payments in a reverse-chronological list (newest first).
- **Status Indicators**: Use consistent badges for "Paid", "Overdue", and "Partial".
