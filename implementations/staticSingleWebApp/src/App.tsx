import React, { useState } from 'react';
import { useData } from './modules/shared/implementation/useData';
import { GlobalStats } from './modules/reporting/presentation/GlobalStats';
import { DebtCard } from './modules/debts/presentation/DebtCard';
import { PersonList } from './modules/people/presentation/PersonList';
import { DebtDirection } from './modules/debts/models/Debt';
import { Plus, Users, Landmark, LayoutDashboard } from 'lucide-react';

function App() {
  const { debts, addPerson, addDebt, people } = useData();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'people' | 'debts'>('dashboard');
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showAddDebt, setShowAddDebt] = useState(false);

  // Add Person form state
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');

  // Add Debt form state
  const [debtPersonId, setDebtPersonId] = useState('');
  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtDirection, setDebtDirection] = useState<DebtDirection>('OWED_TO_ME');

  const handleAddPerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addPerson(personName, personEmail);
      setShowAddPerson(false);
      setPersonName('');
      setPersonEmail('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAddDebt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const amountInCents = Math.round(parseFloat(debtAmount) * 100);
      addDebt(debtPersonId, debtName, amountInCents, debtDirection);
      setShowAddDebt(false);
      setDebtPersonId('');
      setDebtName('');
      setDebtAmount('');
      setDebtDirection('OWED_TO_ME');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const activeDebts = debts.filter(d => !d.isDeleted && d.currentBalance > 0);
  const allDebts = debts.filter(d => !d.isDeleted);
  const activePeople = people.filter(p => !p.isArchived);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Landmark className="text-blue-700" />
            Debt Manager
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              aria-label="Dashboard"
              className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('debts')}
              aria-label="Debts"
              className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'debts' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Landmark size={18} />
              <span className="hidden sm:inline">Debts</span>
            </button>
            <button
              onClick={() => setActiveTab('people')}
              aria-label="People"
              className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'people' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Users size={18} />
              <span className="hidden sm:inline">People</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <>
            <GlobalStats />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-bold text-slate-800">Active Debts</h2>
              <button
                onClick={() => setShowAddDebt(true)}
                disabled={activePeople.length === 0}
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={activePeople.length === 0 ? 'Add a person first' : 'Add new debt'}
              >
                <Plus size={18} />
                Add Debt
              </button>
            </div>

            {activeDebts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Landmark size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">No active debts</h3>
                <p className="text-slate-500 mt-2 mb-6 max-w-sm">
                  You're all settled up! Add a new debt to start tracking what you owe or are owed.
                </p>
                {activePeople.length > 0 ? (
                  <button
                    onClick={() => setShowAddDebt(true)}
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Plus size={18} /> Add Your First Debt
                  </button>
                ) : (
                  <button
                    onClick={() => { setActiveTab('people'); setShowAddPerson(true); }}
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Plus size={18} /> Add a Person First
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDebts.map(debt => (
                  <DebtCard key={debt.id} debt={debt} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'debts' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-bold text-slate-800">All Debts History</h2>
              <button
                onClick={() => setShowAddDebt(true)}
                disabled={activePeople.length === 0}
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                <Plus size={18} />
                Add Debt
              </button>
            </div>

            {allDebts.length === 0 ? (
              <div className="text-center py-12 text-slate-500">No debts recorded yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allDebts.map(debt => (
                  <DebtCard key={debt.id} debt={debt} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'people' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">People</h2>
              <button
                onClick={() => setShowAddPerson(true)}
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Plus size={18} />
                Add Person
              </button>
            </div>
            <PersonList />
          </>
        )}
      </main>

      {/* Add Person Modal */}
      {showAddPerson && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Person</h3>
              <form onSubmit={handleAddPerson} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    required
                    value={personName}
                    onChange={e => setPersonName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={personEmail}
                    onChange={e => setPersonEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddPerson(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium">Add Person</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Debt Modal */}
      {showAddDebt && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Debt</h3>
              <form onSubmit={handleAddDebt} className="space-y-4">

                {/* Binary Choice Toggle (Pattern 1) */}
                <div className="flex p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setDebtDirection('OWED_TO_ME')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${debtDirection === 'OWED_TO_ME' ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    They owe me
                  </button>
                  <button
                    type="button"
                    onClick={() => setDebtDirection('I_OWE')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${debtDirection === 'I_OWE' ? 'bg-white shadow text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    I owe them
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Person</label>
                  <select
                    required
                    value={debtPersonId}
                    onChange={e => setDebtPersonId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" disabled>Select a person...</option>
                    {activePeople.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <input
                    required
                    value={debtName}
                    onChange={e => setDebtName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Dinner, Rent, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={debtAmount}
                      onChange={e => setDebtAmount(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddDebt(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium">Save Debt</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
