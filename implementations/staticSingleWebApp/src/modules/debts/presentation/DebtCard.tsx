import React, { useState } from 'react';
import { Debt, isPaid, isOverdue } from '../models/Debt';
import { useData } from '../../shared/implementation/useData';
import { formatCurrency } from '../../shared/implementation/money-utils';
import { Clock, CheckCircle2, AlertCircle, Trash2, Banknote } from 'lucide-react';

interface DebtCardProps {
  debt: Debt;
}

export const DebtCard: React.FC<DebtCardProps> = ({ debt }) => {
  const { people, recordPayment, deleteDebt } = useData();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const person = people.find(p => p.id === debt.personId);
  const paid = isPaid(debt);
  const overdue = isOverdue(debt);

  const isOwedToMe = debt.direction === 'OWED_TO_ME';
  const colorClass = isOwedToMe ? 'text-emerald-600' : 'text-rose-600';
  const bgColorClass = isOwedToMe ? 'bg-emerald-50' : 'bg-rose-50';

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cents = Math.round(parseFloat(paymentAmount) * 100);
    try {
      recordPayment(debt.id, cents);
      setShowPaymentModal(false);
      setPaymentAmount('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this debt?')) {
      deleteDebt(debt.id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden">
        {/* Status Indicator Bar */}
        <div className={`absolute top-0 left-0 w-1 h-full ${paid ? 'bg-slate-300' : isOwedToMe ? 'bg-emerald-500' : 'bg-rose-500'}`} />

        <div className="flex justify-between items-start mb-3 pl-2">
          <div>
            <h3 className="font-semibold text-lg text-slate-900">{debt.name}</h3>
            <p className="text-sm text-slate-500">
              {isOwedToMe ? 'Owed by ' : 'You owe '}
              <span className="font-medium text-slate-700">{person?.name || 'Unknown'}</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xl font-bold ${paid ? 'text-slate-400' : colorClass}`}>
              {formatCurrency(debt.currentBalance, debt.currency)}
            </span>
            <span className="text-xs text-slate-500">
              of {formatCurrency(debt.totalAmount, debt.currency)} total
            </span>
          </div>
        </div>

        {/* Badges / Status */}
        <div className="flex gap-2 mb-4 pl-2">
          {paid ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
              <CheckCircle2 size={14} /> Paid
            </span>
          ) : overdue ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700">
              <AlertCircle size={14} /> Overdue
            </span>
          ) : debt.dueDate ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
              <Clock size={14} /> Due {new Date(debt.dueDate).toLocaleDateString()}
            </span>
          ) : null}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center pl-2">
          <button
            onClick={handleDelete}
            className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
            title="Delete Debt"
          >
            <Trash2 size={18} />
          </button>

          {!paid && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${colorClass} ${bgColorClass} hover:opacity-80`}
            >
              <Banknote size={18} />
              Record Payment
            </button>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Record Payment</h3>
              <p className="text-sm text-slate-600 mb-4">
                Remaining balance: <span className="font-bold text-slate-900">{formatCurrency(debt.currentBalance, debt.currency)}</span>
              </p>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Payment Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      max={debt.currentBalance / 100}
                      required
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium transition-colors"
                  >
                    Save Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
