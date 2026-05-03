import React, { createContext, useContext, ReactNode } from 'react';
import { Person } from '../modules/people/models/Person';
import { Group } from '../modules/people/models/Group';
import { Debt } from '../modules/debts/models/Debt';
import { Tag } from '../modules/debts/models/Tag';
import { useStorage } from './storage/useStorage';

interface DataContextType {
  people: Person[];
  setPeople: (people: Person[]) => void;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  debts: Debt[];
  setDebts: (debts: Debt[]) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [people, setPeople] = useStorage<Person[]>('spd_people', []);
  const [groups, setGroups] = useStorage<Group[]>('spd_groups', []);
  const [debts, setDebts] = useStorage<Debt[]>('spd_debts', []);
  const [tags, setTags] = useStorage<Tag[]>('spd_tags', []);

  return (
    <DataContext.Provider value={{ people, setPeople, groups, setGroups, debts, setDebts, tags, setTags }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
