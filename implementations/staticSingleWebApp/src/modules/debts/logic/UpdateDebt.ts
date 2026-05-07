import { Debt, DebtDirection } from '../models/Debt';

export const updateDebt = (
  debtId: string,
  debts: Debt[],
  updates: {
    name?: string;
    totalAmount?: number;
    dueDate?: number | null; // null to remove
    direction?: DebtDirection;
    tagIds?: string[];
    notes?: string;
  }
): Debt => {
  const debt = debts.find(d => d.id === debtId);
  if (!debt) {
    throw new Error('DebtNotFound');
  }

  let newCurrentBalance = debt.currentBalance;

  if (updates.totalAmount !== undefined) {
    if (!Number.isInteger(updates.totalAmount) || updates.totalAmount <= 0) {
      throw new Error('InvalidAmount: Total amount must be a positive integer');
    }

    const amountPaid = debt.totalAmount - debt.currentBalance;
    if (updates.totalAmount < amountPaid) {
      throw new Error('InvalidTotalAmount: Cannot reduce total below what has already been paid');
    }

    newCurrentBalance = updates.totalAmount - amountPaid;
  }

  return {
    ...debt,
    ...updates,
    dueDate: updates.dueDate === null ? undefined : (updates.dueDate !== undefined ? updates.dueDate : debt.dueDate),
    currentBalance: newCurrentBalance,
    updatedAt: Date.now(),
  };
};
