export enum DebtDirection {
  OWED_TO_ME = 'OWED_TO_ME',
  I_OWE = 'I_OWE'
}

export interface Debt {
  id: string;
  personId: string;
  name: string;
  totalAmount: number;
  currentBalance: number;
  direction: DebtDirection;
  tagIds: string[];
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export const isPaid = (debt: Debt): boolean => debt.currentBalance === 0;
