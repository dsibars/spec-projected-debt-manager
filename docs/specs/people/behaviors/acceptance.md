# People Management Behaviors

## Feature: Person Creation

Scenario: Successful creation
  Given I provide a name "John Doe"
  When I create the person
  Then a new Person should be stored with name "John Doe"
  And it should have a unique ID

Scenario: Missing name
  Given I provide an empty name
  When I create the person
  Then it should fail with "InvalidName" error

## Feature: Group Assignment

Scenario: Assigning a group to a person
  Given a Person exists
  And a Group "Family" exists
  When I assign the Person to the "Family" group
  Then the Person should belong to the "Family" group
