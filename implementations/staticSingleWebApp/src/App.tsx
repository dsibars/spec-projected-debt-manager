import React, { useState } from 'react';
import { useData } from './shared/DataContext';
import { GlobalStats } from './modules/reporting/presentation/GlobalStats';
import { DebtCard } from './modules/debts/presentation/DebtCard';
import { PersonList } from './modules/people/presentation/PersonList';
import { Plus, Users, Landmark, LayoutDashboard } from 'lucide-react';

function App() {
  const { debts, addPerson, addDebt, people } = useData();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'people' | 'debts'>('dashboard');
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showAddDebt, setShowAddDebt] = useState(false);

  // Simple forms for demo purposes
  const handleAddPerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addPerson({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      groupIds: [],
    });
    setShowAddPerson(false);
  };

  const handleAddDebt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addDebt({
      personId: formData.get('personId') as string,
      name: formData.get('name') as string,
      totalAmount: Number(formData.get('amount')),
      direction: formData.get('direction') as any,
      tagIds: [],
    });
    setShowAddDebt(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-navy-800 flex items-center gap-2">
            <Landmark className="text-blue-700" />
            Debt Manager
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              aria-label="Dashboard"
              className={`p-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            <button
              onClick={() => setActiveTab('debts')}
              aria-label="Debts"
              className={`p-2 rounded-lg transition-colors ${activeTab === 'debts' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Landmark size={20} />
            </button>
            <button
              onClick={() => setActiveTab('people')}
              aria-label="People"
              className={`p-2 rounded-lg transition-colors ${activeTab === 'people' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Users size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <>
            <GlobalStats />
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Active Debts</h2>
              <button
                onClick={() => setShowAddDebt(true)}
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Plus size={18} />
                Add Debt
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {debts.filter(d => !d.isDeleted && d.currentBalance > 0).map(debt => (
                <DebtCard key={debt.id} debt={debt} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'debts' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Debts</h2>
              <button
                onClick={() => setShowAddDebt(true)}
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Plus size={18} />
                Add Debt
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {debts.filter(d => !d.isDeleted).map(debt => (
                <DebtCard key={debt.id} debt={debt} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'people' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">People</h2>
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

      {/* Modals */}
      {showAddPerson && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Person</h3>
              <form onSubmit={handleAddPerson} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input name="name" required className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input name="email" type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddPerson(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showAddDebt && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Debt</h3>
              <form onSubmit={handleAddDebt} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Person</label>
                  <select name="personId" required className="w-full border border-slate-300 rounded-lg px-3 py-2">
                    {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <input name="name" required className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                  <input name="amount" type="number" required className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Direction</label>
                  <select name="direction" className="w-full border border-slate-300 rounded-lg px-3 py-2">
                    <option value="OWED_TO_ME">They owe me</option>
                    <option value="I_OWE">I owe them</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddDebt(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Add</button>
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
