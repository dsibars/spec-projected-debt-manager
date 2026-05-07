import { Debt } from '../../debts/models/Debt';
import { GlobalBalance, calculateGlobalBalance } from './CalculateGlobalBalance';

export const filterByTag = (tagId: string, debts: Debt[]): GlobalBalance => {
  const filteredDebts = debts.filter(d => !d.isDeleted && d.tagIds.includes(tagId));
  return calculateGlobalBalance(filteredDebts);
};
