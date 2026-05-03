import React from 'react';
import { useData } from '../../../shared/DataContext';

export const GlobalStats: React.FC = () => {
  const { debts } = useData();
  const activeDebts = debts.filter(d => !d.isDeleted);

  const totalReceivable = activeDebts
    .filter(d => d.direction === 'OWED_TO_ME')
    .reduce((sum, d) => sum + d.currentBalance, 0);

  const totalPayable = activeDebts
    .filter(d => d.direction === 'I_OWE')
    .reduce((sum, d) => sum + d.currentBalance, 0);

  const netBalance = totalReceivable - totalPayable;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-slate-500 text-sm font-medium mb-1">Net Balance</h3>
        <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          ${netBalance.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-slate-500 text-sm font-medium mb-1">Total Receivable</h3>
        <p className="text-3xl font-bold text-emerald-600">
          ${totalReceivable.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-slate-500 text-sm font-medium mb-1">Total Payable</h3>
        <p className="text-3xl font-bold text-rose-600">
          ${totalPayable.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
