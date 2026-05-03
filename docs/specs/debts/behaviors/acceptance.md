# Debt Tracking Behaviors

## Feature: Debt Creation

Scenario: Adding a debt
  Given a Person exists
  When I create a debt "Dinner" for 20.00 with direction "They owe me"
  Then a new Debt should be stored
  And its current balance should be 20.00

## Feature: Paying a Debt

Scenario: Recording a partial payment
  Given a Debt exists with total 50.00 and balance 50.00
  When I update the balance to 30.00
  Then the Debt current balance should be 30.00
  And it should not be marked as paid

Scenario: Completing a payment
  Given a Debt exists with balance 30.00
  When I update the balance to 0.00
  Then the Debt should be marked as paid
