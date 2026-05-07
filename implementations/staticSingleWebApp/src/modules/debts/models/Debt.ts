export type DebtDirection = 'OWED_TO_ME' | 'I_OWE';

export interface Debt {
  id: string;
  personId: string;
  name: string;
  totalAmount: number; // in cents
  currentBalance: number; // in cents
  currency: string;
  direction: DebtDirection;
  dueDate?: number;
  notes?: string;
  tagIds: string[];
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export const isPaid = (debt: Debt): boolean => debt.currentBalance === 0;

export const isOverdue = (debt: Debt): boolean => {
  if (!debt.dueDate) return false;
  return debt.dueDate < Date.now() && debt.currentBalance > 0;
};
