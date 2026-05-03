# Reporting Behaviors

## Feature: Global Balance Accuracy

Scenario: Calculating balance with mixed directions
  Given a debt "A" for 100.00 (They owe me)
  And a debt "B" for 40.00 (I owe them)
  When I calculate global balance
  Then total receivable should be 100.00
  And total payable should be 40.00
  And net balance should be 60.00

Scenario: Excluding deleted debts
  Given a debt "A" for 100.00 (They owe me)
  And a debt "B" for 50.00 (I owe them) that is deleted
  When I calculate global balance
  Then net balance should be 100.00
