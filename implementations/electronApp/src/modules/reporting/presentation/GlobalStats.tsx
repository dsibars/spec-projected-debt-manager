import React from 'react';
import { useData } from '../../../shared/DataContext';

const GlobalStats: React.FC = () => {
  const { debts } = useData();

  const totalOwedToMe = debts
    .filter(d => d.direction === 'OWED_TO_ME' && !d.isDeleted)
    .reduce((sum, d) => sum + d.currentBalance, 0);

  const totalIOwe = debts
    .filter(d => d.direction === 'I_OWE' && !d.isDeleted)
    .reduce((sum, d) => sum + d.currentBalance, 0);

  const netBalance = totalOwedToMe - totalIOwe;

  return (
    <div className="bg-white p-6 shadow rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Owed to Me</span>
        <span className="text-xl font-bold text-blue-600">${totalOwedToMe}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">I Owe</span>
        <span className="text-xl font-bold text-red-600">${totalIOwe}</span>
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="font-semibold text-gray-900">Net Balance</span>
        <span className={`text-2xl font-black ${netBalance >= 0 ? 'text-green-600' : 'text-red-700'}`}>
          ${netBalance}
        </span>
      </div>
    </div>
  );
};

export default GlobalStats;
