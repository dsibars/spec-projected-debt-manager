import { Debt } from '../../debts/models/Debt';
import { Person } from '../../people/models/Person';

export interface PersonBalanceSummary {
  person: Person;
  receivable: number;
  payable: number;
  netBalance: number;
}

export const groupBalancesByPerson = (
  debts: Debt[],
  people: Person[]
): PersonBalanceSummary[] => {
  const activeDebts = debts.filter(d => !d.isDeleted);
  const summaryMap = new Map<string, Omit<PersonBalanceSummary, 'person'>>();

  for (const debt of activeDebts) {
    if (!summaryMap.has(debt.personId)) {
      summaryMap.set(debt.personId, { receivable: 0, payable: 0, netBalance: 0 });
    }

    const stats = summaryMap.get(debt.personId)!;

    if (debt.direction === 'OWED_TO_ME') {
      stats.receivable += debt.currentBalance;
    } else if (debt.direction === 'I_OWE') {
      stats.payable += debt.currentBalance;
    }

    stats.netBalance = stats.receivable - stats.payable;
  }

  const result: PersonBalanceSummary[] = [];

  for (const [personId, stats] of summaryMap.entries()) {
    const person = people.find(p => p.id === personId);
    if (person) {
      result.push({
        person,
        ...stats,
      });
    }
  }

  return result;
};
