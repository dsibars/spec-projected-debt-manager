# Debt Tracking Behaviors

## Feature: Debt Creation

Scenario: Adding a debt with due date
  Given a Person exists
  When I create a debt "Rent" for 100000 (1000.00) with direction "I owe" and due date "2023-12-31"
  Then a new Debt should be stored
  And its current balance should be 100000
  And it should not be paid

Scenario: Rejecting negative debt
  When I try to create a debt with amount -500
  Then it should fail with "InvalidAmount" error

## Feature: Paying a Debt (Partial and Full)

Scenario: Recording a partial payment
  Given a Debt exists with total 5000 and balance 5000
  When I record a payment of 2000
  Then the Debt current balance should be 3000
  And a Payment record of 2000 should be created
  And the Debt should not be marked as paid

Scenario: Completing a payment
  Given a Debt exists with balance 3000
  When I record a payment of 3000
  Then the Debt current balance should be 0
  And the Debt should be marked as paid

Scenario: Preventing overpayment
  Given a Debt exists with balance 1500
  When I try to record a payment of 2000
  Then it should fail with "Overpayment" error

## Feature: Editing a Debt

Scenario: Updating the total amount (upward)
  Given a Debt exists with total 10000 and balance 8000 (2000 already paid)
  When I update the total amount to 15000
  Then the Debt current balance should be 13000
  And the total amount should be 15000

Scenario: Updating the total amount (downward, valid)
  Given a Debt exists with total 10000 and balance 8000 (2000 already paid)
  When I update the total amount to 5000
  Then the Debt current balance should be 3000
  And the total amount should be 5000

Scenario: Updating the total amount (downward, invalid)
  Given a Debt exists with total 10000 and balance 8000 (2000 already paid)
  When I try to update the total amount to 1000
  Then it should fail with "InvalidTotalAmount" error (cannot be less than paid amount)

## Feature: Deletion

Scenario: Soft deleting a debt
  Given a Debt exists
  When I delete the debt
  Then the Debt should be marked as `isDeleted`
  But it should still exist in the database for history
