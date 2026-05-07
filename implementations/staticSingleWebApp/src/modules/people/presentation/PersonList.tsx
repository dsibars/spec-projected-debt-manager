import React from 'react';
import { useData } from '../../shared/implementation/useData';
import { User, Mail, Phone, Trash2 } from 'lucide-react';

export const PersonList: React.FC = () => {
  const { people, debts, archivePerson } = useData();

  const activePeople = people.filter(p => !p.isArchived);

  if (activePeople.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
        <User size={48} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-700">No people yet</h3>
        <p className="text-slate-500 text-center max-w-sm mt-2">
          Add people to start tracking who owes you and who you owe.
        </p>
      </div>
    );
  }

  const handleArchive = (personId: string) => {
    if (window.confirm('Are you sure you want to archive this person?')) {
      try {
        archivePerson(personId);
      } catch (e: any) {
        alert(e.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {activePeople.map(person => {
        const personDebts = debts.filter(d => d.personId === person.id && !d.isDeleted && d.currentBalance > 0);
        const hasActiveDebts = personDebts.length > 0;

        return (
          <div key={person.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{person.name}</h3>
                  {person.email && (
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Mail size={14} />
                      {person.email}
                    </div>
                  )}
                  {person.phone && (
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <Phone size={14} />
                      {person.phone}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleArchive(person.id)}
                disabled={hasActiveDebts}
                className={`p-2 rounded-lg transition-colors ${hasActiveDebts ? 'text-slate-300 cursor-not-allowed' : 'text-rose-600 hover:bg-rose-50'}`}
                title={hasActiveDebts ? "Cannot archive person with active debts" : "Archive person"}
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 text-sm text-slate-500">
              {hasActiveDebts ? (
                <span className="text-amber-600 font-medium">{personDebts.length} active debt(s)</span>
              ) : (
                <span>No active debts</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
