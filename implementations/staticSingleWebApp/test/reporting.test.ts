import { describe, it, expect } from 'vitest';
import { calculateGlobalBalance } from '../src/modules/reporting/logic/CalculateGlobalBalance';
import { Debt } from '../src/modules/debts/models/Debt';

describe('CalculateGlobalBalance', () => {
  it('should return 0 for empty debts', () => {
    const result = calculateGlobalBalance([]);
    expect(result.totalReceivable).toBe(0);
    expect(result.totalPayable).toBe(0);
    expect(result.netBalance).toBe(0);
  });

  it('should correctly sum OWED_TO_ME as receivable', () => {
    const debts: Debt[] = [
      { id: '1', personId: '1', name: 'd1', currentBalance: 1000, totalAmount: 1000, direction: 'OWED_TO_ME', currency: 'USD', tagIds: [], isDeleted: false, createdAt: 0, updatedAt: 0 },
      { id: '2', personId: '1', name: 'd2', currentBalance: 500, totalAmount: 500, direction: 'OWED_TO_ME', currency: 'USD', tagIds: [], isDeleted: false, createdAt: 0, updatedAt: 0 },
    ];
    const result = calculateGlobalBalance(debts);
    expect(result.totalReceivable).toBe(1500);
    expect(result.totalPayable).toBe(0);
    expect(result.netBalance).toBe(1500);
  });

  it('should correctly sum I_OWE as payable', () => {
    const debts: Debt[] = [
      { id: '1', personId: '1', name: 'd1', currentBalance: 1000, totalAmount: 1000, direction: 'I_OWE', currency: 'USD', tagIds: [], isDeleted: false, createdAt: 0, updatedAt: 0 },
      { id: '2', personId: '1', name: 'd2', currentBalance: 500, totalAmount: 500, direction: 'I_OWE', currency: 'USD', tagIds: [], isDeleted: false, createdAt: 0, updatedAt: 0 },
    ];
    const result = calculateGlobalBalance(debts);
    expect(result.totalReceivable).toBe(0);
    expect(result.totalPayable).toBe(1500);
    expect(result.netBalance).toBe(-1500);
  });

  it('should ignore deleted debts', () => {
    const debts: Debt[] = [
      { id: '1', personId: '1', name: 'd1', currentBalance: 1000, totalAmount: 1000, direction: 'OWED_TO_ME', currency: 'USD', tagIds: [], isDeleted: true, createdAt: 0, updatedAt: 0 },
      { id: '2', personId: '1', name: 'd2', currentBalance: 500, totalAmount: 500, direction: 'OWED_TO_ME', currency: 'USD', tagIds: [], isDeleted: false, createdAt: 0, updatedAt: 0 },
    ];
    const result = calculateGlobalBalance(debts);
    expect(result.totalReceivable).toBe(500);
  });
});
