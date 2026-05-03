# Skill: LocalStorage Persistence

## Description
Provides a mechanism to store and retrieve domain models using the browser's `localStorage` API.

## Constraints
- Data must be serialized to JSON.
- Operations should be encapsulated in a repository pattern.
- Handle storage limits gracefully (though unlikely for this app's scale).
- Ensure atomic updates where possible to avoid data corruption.
