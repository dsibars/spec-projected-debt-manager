import { Person } from '../../people/models/Person';
import { Group } from '../../people/models/Group';
import { Debt } from '../../debts/models/Debt';
import { Payment } from '../../debts/models/Payment';
import { Tag } from '../../debts/models/Tag';

const PREFIX = 'debtmanager_';

export const Storage = {
  getPeople: (): Person[] => JSON.parse(localStorage.getItem(PREFIX + 'people') || '[]'),
  setPeople: (data: Person[]) => localStorage.setItem(PREFIX + 'people', JSON.stringify(data)),

  getGroups: (): Group[] => JSON.parse(localStorage.getItem(PREFIX + 'groups') || '[]'),
  setGroups: (data: Group[]) => localStorage.setItem(PREFIX + 'groups', JSON.stringify(data)),

  getDebts: (): Debt[] => JSON.parse(localStorage.getItem(PREFIX + 'debts') || '[]'),
  setDebts: (data: Debt[]) => localStorage.setItem(PREFIX + 'debts', JSON.stringify(data)),

  getPayments: (): Payment[] => JSON.parse(localStorage.getItem(PREFIX + 'payments') || '[]'),
  setPayments: (data: Payment[]) => localStorage.setItem(PREFIX + 'payments', JSON.stringify(data)),

  getTags: (): Tag[] => JSON.parse(localStorage.getItem(PREFIX + 'tags') || '[]'),
  setTags: (data: Tag[]) => localStorage.setItem(PREFIX + 'tags', JSON.stringify(data)),
};
