import { Debt } from '../../debts/models/Debt';

export interface GlobalBalance {
  totalReceivable: number;
  totalPayable: number;
  netBalance: number;
}

export const calculateGlobalBalance = (debts: Debt[]): GlobalBalance => {
  let totalReceivable = 0;
  let totalPayable = 0;

  const activeDebts = debts.filter(d => !d.isDeleted);

  for (const debt of activeDebts) {
    if (debt.direction === 'OWED_TO_ME') {
      totalReceivable += debt.currentBalance;
    } else if (debt.direction === 'I_OWE') {
      totalPayable += debt.currentBalance;
    }
  }

  return {
    totalReceivable,
    totalPayable,
    netBalance: totalReceivable - totalPayable,
  };
};
