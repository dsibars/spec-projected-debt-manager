import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from './Storage';
import { Person } from '../../people/models/Person';
import { Group } from '../../people/models/Group';
import { Debt, DebtDirection } from '../../debts/models/Debt';
import { Payment } from '../../debts/models/Payment';
import { Tag } from '../../debts/models/Tag';

import { createPerson } from '../../people/logic/CreatePerson';
import { archivePerson as doArchivePerson } from '../../people/logic/ArchivePerson';
import { addGroup, assignPersonToGroup } from '../../people/logic/ManageGroups';

import { createDebt } from '../../debts/logic/CreateDebt';
import { recordPayment } from '../../debts/logic/RecordPayment';
import { updateDebt } from '../../debts/logic/UpdateDebt';
import { deleteDebt } from '../../debts/logic/DeleteDebt';
import { changeDebtPerson } from '../../debts/logic/ChangeDebtPerson';
import { restoreDebt } from '../../debts/logic/RestoreDebt';

interface DataContextType {
  people: Person[];
  groups: Group[];
  debts: Debt[];
  payments: Payment[];
  tags: Tag[];

  // People
  addPerson: (name: string, email?: string, phone?: string, groupIds?: string[]) => void;
  archivePerson: (id: string) => void;
  addGroup: (name: string, description?: string) => void;
  assignPersonToGroup: (personId: string, groupId: string) => void;

  // Debts
  addDebt: (personId: string, name: string, totalAmount: number, direction: DebtDirection, currency?: string, dueDate?: number, tagNames?: string[]) => void;
  recordPayment: (debtId: string, amount: number, date?: number, notes?: string) => void;
  updateDebt: (debtId: string, updates: any) => void;
  deleteDebt: (debtId: string) => void;
  changeDebtPerson: (debtId: string, newPersonId: string) => void;
  restoreDebt: (debtId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [people, setPeopleState] = useState<Person[]>([]);
  const [groups, setGroupsState] = useState<Group[]>([]);
  const [debts, setDebtsState] = useState<Debt[]>([]);
  const [payments, setPaymentsState] = useState<Payment[]>([]);
  const [tags, setTagsState] = useState<Tag[]>([]);

  useEffect(() => {
    setPeopleState(Storage.getPeople());
    setGroupsState(Storage.getGroups());
    setDebtsState(Storage.getDebts());
    setPaymentsState(Storage.getPayments());
    setTagsState(Storage.getTags());
  }, []);

  const savePeople = (data: Person[]) => { setPeopleState(data); Storage.setPeople(data); };
  const saveGroups = (data: Group[]) => { setGroupsState(data); Storage.setGroups(data); };
  const saveDebts = (data: Debt[]) => { setDebtsState(data); Storage.setDebts(data); };
  const savePayments = (data: Payment[]) => { setPaymentsState(data); Storage.setPayments(data); };
  const saveTags = (data: Tag[]) => { setTagsState(data); Storage.setTags(data); };

  const addPerson = (name: string, email?: string, phone?: string, groupIds?: string[]) => {
    const p = createPerson(name, email, phone, groupIds, groups);
    savePeople([...people, p]);
  };

  const archivePersonFn = (id: string) => {
    const updated = doArchivePerson(id, people, debts);
    savePeople(people.map(p => p.id === id ? updated : p));
  };

  const addGroupFn = (name: string, description?: string) => {
    const g = addGroup(name, groups, description);
    saveGroups([...groups, g]);
  };

  const assignPersonToGroupFn = (personId: string, groupId: string) => {
    const updated = assignPersonToGroup(personId, groupId, people, groups);
    savePeople(people.map(p => p.id === personId ? updated : p));
  };

  const addDebtFn = (personId: string, name: string, totalAmount: number, direction: DebtDirection, currency?: string, dueDate?: number, tagNames?: string[]) => {
    const { debt, newTags } = createDebt(personId, name, totalAmount, direction, people, tags, currency, dueDate, tagNames);
    if (newTags.length > 0) saveTags([...tags, ...newTags]);
    saveDebts([...debts, debt]);
  };

  const recordPaymentFn = (debtId: string, amount: number, date?: number, notes?: string) => {
    const { updatedDebt, payment } = recordPayment(debtId, amount, debts, date, notes);
    saveDebts(debts.map(d => d.id === debtId ? updatedDebt : d));
    savePayments([...payments, payment]);
  };

  const updateDebtFn = (debtId: string, updates: any) => {
    const updated = updateDebt(debtId, debts, updates);
    saveDebts(debts.map(d => d.id === debtId ? updated : d));
  };

  const deleteDebtFn = (debtId: string) => {
    const updated = deleteDebt(debtId, debts);
    saveDebts(debts.map(d => d.id === debtId ? updated : d));
  };

  const changeDebtPersonFn = (debtId: string, newPersonId: string) => {
    const updated = changeDebtPerson(debtId, newPersonId, debts, people);
    saveDebts(debts.map(d => d.id === debtId ? updated : d));
  };

  const restoreDebtFn = (debtId: string) => {
    const updated = restoreDebt(debtId, debts);
    saveDebts(debts.map(d => d.id === debtId ? updated : d));
  };

  return (
    <DataContext.Provider value={{
      people, groups, debts, payments, tags,
      addPerson, archivePerson: archivePersonFn, addGroup: addGroupFn, assignPersonToGroup: assignPersonToGroupFn,
      addDebt: addDebtFn, recordPayment: recordPaymentFn, updateDebt: updateDebtFn, deleteDebt: deleteDebtFn, changeDebtPerson: changeDebtPersonFn, restoreDebt: restoreDebtFn
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
