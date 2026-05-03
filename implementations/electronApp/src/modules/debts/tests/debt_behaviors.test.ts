import { describe, it, expect } from 'vitest';
import { Debt, DebtDirection, isPaid } from '../models/Debt';

describe('Debt Behaviors', () => {
  it('should identify a debt as paid when balance is 0', () => {
    const debt: Debt = {
      id: '1',
      personId: 'p1',
      name: 'Dinner',
      totalAmount: 20,
      currentBalance: 0,
      direction: DebtDirection.OWED_TO_ME,
      tagIds: [],
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    expect(isPaid(debt)).toBe(true);
  });

  it('should identify a debt as unpaid when balance > 0', () => {
    const debt: Debt = {
      id: '2',
      personId: 'p1',
      name: 'Lunch',
      totalAmount: 20,
      currentBalance: 10,
      direction: DebtDirection.OWED_TO_ME,
      tagIds: [],
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    expect(isPaid(debt)).toBe(false);
  });
});
