import { Debt } from '../models/Debt';

export const deleteDebt = (debtId: string, debts: Debt[]): Debt => {
  const debt = debts.find(d => d.id === debtId);
  if (!debt) {
    throw new Error('DebtNotFound');
  }

  return {
    ...debt,
    isDeleted: true,
    updatedAt: Date.now(),
  };
};
