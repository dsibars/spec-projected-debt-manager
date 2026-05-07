import { Debt } from '../models/Debt';
import { Person } from '../../people/models/Person';

export const changeDebtPerson = (
  debtId: string,
  newPersonId: string,
  debts: Debt[],
  people: Person[]
): Debt => {
  const debt = debts.find(d => d.id === debtId);
  if (!debt) {
    throw new Error('DebtNotFound');
  }

  const person = people.find(p => p.id === newPersonId);
  if (!person) {
    throw new Error('PersonNotFound');
  }

  return {
    ...debt,
    personId: newPersonId,
    updatedAt: Date.now(),
  };
};
