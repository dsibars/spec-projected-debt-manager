# Skill: Money Handling

## Description
Guidelines for safe financial calculations and currency representation.

## Constraints
- **Use Integers**: Store all monetary values as integers in the smallest unit (e.g., cents for USD, yen for JPY).
- **No Floating Point**: Never use floating-point numbers for financial math to avoid rounding errors.
- **Currency Context**: Always pair an amount with its currency code.
- **Math Operations**:
    - Addition/Subtraction: Straightforward integer math.
    - Multiplication (e.g., interest/tax): Round to the nearest integer *after* the calculation.
- **Formatting**: Use a centralized utility for formatting cents into human-readable strings (e.g., `$10.00` instead of `1000`).

## Best Practices
- `100` cents = `$1.00`.
- Validation should happen at the entry point of any logic service.
