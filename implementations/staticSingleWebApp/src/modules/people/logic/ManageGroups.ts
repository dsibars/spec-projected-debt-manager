import { Group } from '../models/Group';
import { Person } from '../models/Person';

export const addGroup = (
  name: string,
  existingGroups: Group[],
  description?: string
): Group => {
  const trimmedName = name.trim();
  if (!trimmedName) {
      throw new Error('InvalidName: Name cannot be empty');
  }
  const exists = existingGroups.some(g => g.name.toLowerCase() === trimmedName.toLowerCase());
  if (exists) {
    throw new Error('DuplicateGroupName');
  }

  return {
    id: crypto.randomUUID(),
    name: trimmedName,
    description,
  };
};

export const assignPersonToGroup = (
  personId: string,
  groupId: string,
  people: Person[],
  groups: Group[]
): Person => {
  const person = people.find(p => p.id === personId);
  if (!person) {
    throw new Error('PersonNotFound');
  }

  const group = groups.find(g => g.id === groupId);
  if (!group) {
    throw new Error('GroupNotFound');
  }

  if (person.groupIds.includes(groupId)) {
    return person; // Already assigned
  }

  return {
    ...person,
    groupIds: [...person.groupIds, groupId],
    updatedAt: Date.now(),
  };
};
