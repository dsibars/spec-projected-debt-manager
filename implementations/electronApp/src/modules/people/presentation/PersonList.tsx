import React from 'react';
import { useData } from '../../../shared/DataContext';

const PersonList: React.FC = () => {
  const { people } = useData();

  if (people.length === 0) {
    return <div className="text-gray-500 italic">No people found.</div>;
  }

  return (
    <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
      {people.map((person) => (
        <li key={person.id} className="p-4 flex justify-between items-center">
          <div>
            <span className="font-medium text-gray-900">{person.name}</span>
            {person.email && <span className="ml-2 text-sm text-gray-500">({person.email})</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
