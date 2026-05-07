import { Person } from '../models/Person';
import { Debt } from '../../debts/models/Debt';

export const archivePerson = (
  personId: string,
  people: Person[],
  debts: Debt[]
): Person => {
  const person = people.find(p => p.id === personId);
  if (!person) {
    throw new Error('PersonNotFound');
  }

  const activeDebts = debts.filter(d => d.personId === personId && !d.isDeleted && d.currentBalance > 0);
  if (activeDebts.length > 0) {
    throw new Error('HasActiveDebts: Cannot archive a person who still has outstanding active debts');
  }

  return {
    ...person,
    isArchived: true,
    updatedAt: Date.now(),
  };
};
