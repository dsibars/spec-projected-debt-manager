import React, { useMemo } from 'react';
import { useData } from '../../shared/implementation/useData';
import { calculateGlobalBalance } from '../logic/CalculateGlobalBalance';
import { formatCurrency } from '../../shared/implementation/money-utils';
import { TrendingUp, TrendingDown, Scale } from 'lucide-react';

export const GlobalStats: React.FC = () => {
  const { debts } = useData();

  const stats = useMemo(() => calculateGlobalBalance(debts), [debts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Receivable */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 text-emerald-600 mb-2">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Total Receivable</h3>
        </div>
        <div className="text-3xl font-bold text-slate-900">
          {formatCurrency(stats.totalReceivable)}
        </div>
      </div>

      {/* Payable */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 text-rose-600 mb-2">
          <div className="p-2 bg-rose-50 rounded-lg">
            <TrendingDown size={24} />
          </div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Total Payable</h3>
        </div>
        <div className="text-3xl font-bold text-slate-900">
          {formatCurrency(stats.totalPayable)}
        </div>
      </div>

      {/* Net Balance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 text-blue-700 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Scale size={24} />
          </div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Net Balance</h3>
        </div>
        <div className={`text-3xl font-bold ${stats.netBalance > 0 ? 'text-emerald-600' : stats.netBalance < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
          {formatCurrency(stats.netBalance)}
        </div>
      </div>
    </div>
  );
};
