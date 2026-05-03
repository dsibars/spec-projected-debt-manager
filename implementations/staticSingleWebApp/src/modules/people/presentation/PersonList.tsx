import React from 'react';
import { useData } from '../../../shared/DataContext';
import { Person } from '../models/Person';
import { User } from 'lucide-react';

export const PersonList: React.FC = () => {
  const { people } = useData();

  return (
    <div className="space-y-2">
      {people.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No people added yet.</p>
      ) : (
        people.map(person => (
          <div key={person.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium text-slate-900">{person.name}</p>
              <p className="text-xs text-slate-500">{person.email || 'No email'}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
