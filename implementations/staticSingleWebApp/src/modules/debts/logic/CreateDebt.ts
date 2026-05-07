import { Debt, DebtDirection } from '../models/Debt';
import { Tag } from '../models/Tag';
import { Person } from '../../people/models/Person';

export const createDebt = (
  personId: string,
  name: string,
  totalAmount: number, // cents
  direction: DebtDirection,
  people: Person[],
  existingTags: Tag[],
  currency: string = 'USD',
  dueDate?: number,
  tagNames?: string[]
): { debt: Debt; newTags: Tag[] } => {
  const person = people.find(p => p.id === personId);
  if (!person) {
    throw new Error('PersonNotFound');
  }

  if (!Number.isInteger(totalAmount) || totalAmount <= 0) {
    throw new Error('InvalidAmount: Must be a positive integer');
  }

  const newTags: Tag[] = [];
  const tagIds: string[] = [];

  if (tagNames) {
    for (const tagName of tagNames) {
      const trimmedName = tagName.trim();
      let tag = existingTags.find(t => t.name.toLowerCase() === trimmedName.toLowerCase());
      if (!tag) {
        tag = { id: crypto.randomUUID(), name: trimmedName };
        newTags.push(tag);
      }
      tagIds.push(tag.id);
    }
  }

  const now = Date.now();
  const debt: Debt = {
    id: crypto.randomUUID(),
    personId,
    name: name.trim(),
    totalAmount,
    currentBalance: totalAmount,
    direction,
    currency,
    dueDate,
    tagIds,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };

  return { debt, newTags };
};
