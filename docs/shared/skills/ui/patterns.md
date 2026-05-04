# Skill: UI Patterns

## Description
Standardized UI/UX patterns that map domain interactions to predictable visual elements.

## 1. Binary Choices
- **Domain:** Mutually exclusive options (e.g., "I owe" vs "They owe me").
- **Pattern:** Segmented Button Group or Toggle Switch. Never use standard checkboxes for this.

## 2. Empty States
- **Domain:** Collections with zero items (no debts, no people).
- **Pattern:** Centralized container with an icon, explanatory text, and a primary Call-to-Action (CTA) to add the first item. Do not show an empty table or list frame.

## 3. Destructive Actions
- **Domain:** Deleting or Archiving records.
- **Pattern:**
  - Buttons must use the `Rose` (Negative) or `Amber` (Warning) token.
  - Action MUST trigger a Confirmation Dialog Modal explaining the consequence before executing.

## 4. Financial Inputs (Currency)
- **Domain:** Entering `totalAmount` or `paymentAmount`.
- **Pattern:** Input fields must use masking to prevent non-numeric entry, implicitly format with two decimal places, and display the currency symbol.

## 5. Standardized Feedback
- **Domain:** Saving a record, encountering an error.
- **Pattern:**
  - Success: Non-blocking Toast notification.
  - Minor Error (Validation): Inline red text (`Text-Rose`) below the specific input.
  - Major Error (System): Blocking or prominent top banner.

## 6. Ledger History Visualization
- **Domain:** Listing payments over time.
- **Pattern:** Reverse-chronological list (newest at the top), with the most recent transaction visually distinct or separated by subtle lines.
