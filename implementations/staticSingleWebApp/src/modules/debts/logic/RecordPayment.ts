import { Debt } from '../models/Debt';
import { Payment } from '../models/Payment';

export const recordPayment = (
  debtId: string,
  amount: number, // cents
  debts: Debt[],
  date: number = Date.now(),
  notes?: string
): { updatedDebt: Debt; payment: Payment } => {
  const debt = debts.find(d => d.id === debtId);
  if (!debt) {
    throw new Error('DebtNotFound');
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('InvalidAmount: Amount must be a positive integer');
  }

  if (amount > debt.currentBalance) {
    throw new Error('Overpayment: Amount exceeds remaining balance');
  }

  const now = Date.now();
  const payment: Payment = {
    id: crypto.randomUUID(),
    debtId,
    amount,
    date,
    notes,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };

  const updatedDebt: Debt = {
    ...debt,
    currentBalance: debt.currentBalance - amount,
    updatedAt: now,
  };

  return { updatedDebt, payment };
};
