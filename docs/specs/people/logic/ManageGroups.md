# Use Case: Manage Groups

## Flows

### Add Group
1. Receive `name` and `description` (optional).
2. Check if a group with the same `name` already exists.
3. If exists, return `DuplicateGroupName`.
4. Generate `id`.
5. Store [[models/Group]].

### Assign Person to Group
1. Receive `personId` and `groupId`.
2. Retrieve [[models/Person]] and [[models/Group]].
3. Add `groupId` to Person's `groupIds` if not already present.
4. Store updated [[models/Person]].
