import { Person } from '../models/Person';
import { Group } from '../models/Group';

export const createPerson = (
  name: string,
  email?: string,
  phone?: string,
  groupIds?: string[],
  existingGroups: Group[] = []
): Person => {
  if (!name.trim()) {
    throw new Error('InvalidName: Name cannot be empty');
  }

  if (groupIds && groupIds.length > 0) {
    const existingGroupIds = new Set(existingGroups.map(g => g.id));
    for (const id of groupIds) {
      if (!existingGroupIds.has(id)) {
        throw new Error(`GroupNotFound: Group ID ${id} does not exist`);
      }
    }
  }

  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    email,
    phone,
    groupIds: groupIds || [],
    createdAt: now,
    updatedAt: now,
    isArchived: false,
  };
};
