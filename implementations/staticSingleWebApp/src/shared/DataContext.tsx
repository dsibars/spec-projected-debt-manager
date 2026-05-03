import React, { createContext, useContext, ReactNode } from 'react';
import { Person } from '../modules/people/models/Person';
import { Group } from '../modules/people/models/Group';
import { Debt } from '../modules/debts/models/Debt';
import { Tag } from '../modules/debts/models/Tag';
import { useStorage } from './storage/useStorage';

interface DataContextType {
  people: Person[];
  groups: Group[];
  debts: Debt[];
  tags: Tag[];
  addPerson: (person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => Person;
  addGroup: (group: Omit<Group, 'id'>) => Group;
  addDebt: (debt: Omit<Debt, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'currentBalance'>) => Debt;
  updateDebtBalance: (debtId: string, newBalance: number) => void;
  deleteDebt: (debtId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [people, setPeople] = useStorage<Person[]>('dm_people', []);
  const [groups, setGroups] = useStorage<Group[]>('dm_groups', []);
  const [debts, setDebts] = useStorage<Debt[]>('dm_debts', []);
  const [tags, setTags] = useStorage<Tag[]>('dm_tags', []);

  const addPerson = (data: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPerson: Person = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setPeople([...people, newPerson]);
    return newPerson;
  };

  const addGroup = (data: Omit<Group, 'id'>) => {
    const newGroup: Group = {
      ...data,
      id: crypto.randomUUID(),
    };
    setGroups([...groups, newGroup]);
    return newGroup;
  };

  const addDebt = (data: Omit<Debt, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'currentBalance'>) => {
    const newDebt: Debt = {
      ...data,
      id: crypto.randomUUID(),
      currentBalance: data.totalAmount,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setDebts([...debts, newDebt]);
    return newDebt;
  };

  const updateDebtBalance = (debtId: string, newBalance: number) => {
    setDebts(debts.map(d => d.id === debtId ? { ...d, currentBalance: newBalance, updatedAt: Date.now() } : d));
  };

  const deleteDebt = (debtId: string) => {
    setDebts(debts.map(d => d.id === debtId ? { ...d, isDeleted: true, updatedAt: Date.now() } : d));
  };

  return (
    <DataContext.Provider value={{ people, groups, debts, tags, addPerson, addGroup, addDebt, updateDebtBalance, deleteDebt }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
