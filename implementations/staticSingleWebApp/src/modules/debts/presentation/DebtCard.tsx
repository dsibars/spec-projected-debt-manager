import React from 'react';
import { useData } from '../../../shared/DataContext';
import { Debt, isPaid } from '../models/Debt';
import { CheckCircle, Trash2 } from 'lucide-react';

export const DebtCard: React.FC<{ debt: Debt }> = ({ debt }) => {
  const { people, updateDebtBalance, deleteDebt } = useData();
  const person = people.find(p => p.id === debt.personId);
  const paid = isPaid(debt);

  const progress = ((debt.totalAmount - debt.currentBalance) / debt.totalAmount) * 100;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-slate-200 ${paid ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-slate-900">{debt.name}</h4>
          <p className="text-sm text-slate-500">{person?.name || 'Unknown'}</p>
        </div>
        <div className={`text-sm font-bold ${debt.direction === 'OWED_TO_ME' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {debt.direction === 'OWED_TO_ME' ? 'Receivable' : 'Payable'}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-500">${debt.currentBalance} left</span>
          <span className="text-slate-900 font-medium">of ${debt.totalAmount}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${debt.direction === 'OWED_TO_ME' ? 'bg-emerald-500' : 'bg-rose-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {!paid && (
          <button
            onClick={() => updateDebtBalance(debt.id, 0)}
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            title="Mark as paid"
          >
            <CheckCircle size={20} />
          </button>
        )}
        <button
          onClick={() => deleteDebt(debt.id)}
          className="p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
