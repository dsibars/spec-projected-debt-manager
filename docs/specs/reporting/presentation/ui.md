# Reporting Module Presentation

## Components

### Global Stats Header
- **Layout:** Three prominent metrics cards arranged horizontally (desktop) or in a 2x2 grid / carousel (mobile).
- **Metrics:**
  1. **Net Balance:** The grand total. Must be colored `Emerald` if positive (net receivable), `Rose` if negative (net payable), and `Secondary` if exactly zero.
  2. **Total Receivable:** Always `Emerald`.
  3. **Total Payable:** Always `Rose`.

### Balance Chart (Simple)
- **Visuals:** A horizontal stacked bar or side-by-side bar chart comparing Total Receivable vs Total Payable. Use strict design tokens (`Emerald` and `Rose`).

### Summary List (By Person/Tag)
- **Layout:** Standard list format.
- **Values:** The net balance for that entity (Person or Tag) aligned to the right. The text color must reflect the direction (`Emerald` for positive, `Rose` for negative).

## States
- **Empty State:** If there are no debts in the system, the dashboard should show a friendly empty state ("No data to report yet") rather than displaying $0.00 everywhere.

## Mobile View
- **Dashboard:** Prominent Global Stats fixed at the top.
- **Tabs:** Segmented control to switch between "Summary", "By Person", and "By Tag" lists below the stats.

## Desktop View
- **Dashboard:** A comprehensive grid layout. Global stats span the top row. The Balance chart sits below it, flanked by detailed tables of balances by Person and by Tag.
- **Side Panels:** Optional breakdown of balances by Groups (from the People module).
