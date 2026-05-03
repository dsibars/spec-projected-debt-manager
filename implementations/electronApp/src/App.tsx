import React from 'react';
import { DataProvider, useData } from './shared/DataContext';
import PersonList from './modules/people/presentation/PersonList';
import DebtCard from './modules/debts/presentation/DebtCard';
import GlobalStats from './modules/reporting/presentation/GlobalStats';

const RecentDebts: React.FC = () => {
  const { debts } = useData();
  const recentDebts = debts.filter(d => !d.isDeleted).slice(0, 5);

  if (recentDebts.length === 0) {
    return <p className="text-sm text-gray-500">No debts found.</p>;
  }

  return (
    <>
      {recentDebts.map(debt => (
        <DebtCard key={debt.id} debt={debt} />
      ))}
    </>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SPD Debt Tracker (Desktop)</h1>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">People</h2>
            <PersonList />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Reporting</h2>
            <GlobalStats />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Debts</h2>
            <div className="space-y-4">
              <RecentDebts />
            </div>
          </section>
        </main>
      </div>
    </DataProvider>
  );
};

export default App;
