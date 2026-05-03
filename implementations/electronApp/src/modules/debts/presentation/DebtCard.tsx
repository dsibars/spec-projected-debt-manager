import React from 'react';
import { Debt, isPaid } from '../models/Debt';

interface DebtCardProps {
  debt: Debt;
}

const DebtCard: React.FC<DebtCardProps> = ({ debt }) => {
  return (
    <div className={`p-4 rounded-lg shadow ${isPaid(debt) ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'} border`}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900">{debt.name}</h3>
        <span className={`text-sm font-bold ${debt.direction === 'OWED_TO_ME' ? 'text-blue-600' : 'text-red-600'}`}>
          {debt.direction === 'OWED_TO_ME' ? '+' : '-'}${debt.currentBalance}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Total: ${debt.totalAmount}
      </div>
      {isPaid(debt) && (
        <div className="mt-2 text-xs font-bold text-green-700 uppercase">Paid</div>
      )}
    </div>
  );
};

export default DebtCard;
