# People Module Presentation

## Components

### Person List Item
- **Layout:** Standard list row with a circular avatar or initial placeholder on the left, primary name in `Text-Primary` (Slate-900), and associated group badges below the name in `Text-Secondary` (Slate-500).
- **Interactions:** Tapping/clicking a row opens the Person Detail view. On mobile, swiping reveals an "Archive" action (in Amber or Rose).

### Person Detail View
- **Header:** Large typography for the person's name.
- **Body:** Shows contact info and a summary list of active debts associated with this person.
- **Empty State (Debts):** If the person has no active debts, show an empty state specific to them: "No active debts with [Name]."

### Add/Edit Person Modal
- Follows standard Modal anatomy.
- **Inputs:** Name (required), Email/Phone (optional), Groups (multi-select pill interface).
- **Validation:** Inline error in `Rose` if the name is left blank upon submission.

## Mobile View
- **People List:** Full-screen vertical list.
- **Person Detail:** Replaces the list view, with a back arrow in the top navigation to return.

## Desktop View
- **Split View:** Left sidebar containing the People List. The right pane displays the Person Detail of the selected list item. If no item is selected, show an empty state in the right pane ("Select a person to view details").
- **Groups Sidebar:** Quick filters above or alongside the list to filter people by group.

## Overrides & Enforcements
- Always use the `Primary` color for the "Add Person" CTA.
- Deleting or Archiving a person must trigger a Confirmation Dialog warning the user of the consequences.
