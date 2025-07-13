'use client';
import React from 'react';

interface EvolutionTrigger {
  name: string;
  url: string;
}

interface Props {
  triggers: EvolutionTrigger[];
  currentPage: number;
}

const EvolutionTriggerTable: React.FC<Props> = ({ triggers, currentPage }) => {
  const handlePagination = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('evoPage', newPage.toString());
    window.location.href = `/?${params.toString()}`;
  };

  return (
    <div className="mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-extrabold mb-6 text-yellow-400 text-center">✨ Evolution Triggers</h2>

      <div className="overflow-x-auto rounded-xl border-4 border-yellow-500 shadow-lg bg-gray-800">
        <table className="min-w-full text-yellow-100 font-semibold select-none">
          <thead className="bg-yellow-600 text-black uppercase tracking-wider font-extrabold text-lg rounded-t-xl">
            <tr>
              <th className="px-6 py-4 text-left">Trigger Name</th>
            </tr>
          </thead>
          <tbody>
            {triggers.length === 0 ? (
              <tr>
                <td className="text-center py-10 italic text-yellow-400 text-lg">
                  No triggers found.
                </td>
              </tr>
            ) : (
              triggers.map((trigger) => (
                <tr
                  key={trigger.name}
                  onClick={() => window.open(trigger.url, '_blank')}
                  title={`Learn more about ${trigger.name}`}
                  className="cursor-pointer transition-all hover:bg-yellow-700/20 hover:shadow-lg active:scale-95"
                >
                  <td className="px-6 py-4 capitalize text-yellow-300 font-bold tracking-wide">
                    {trigger.name}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-8 max-w-xs mx-auto">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-8 py-3 font-extrabold text-gray-900 shadow-md
            transition transform hover:scale-105 active:scale-95"
        >
          ← Previous
        </button>

        <button
          onClick={() => handlePagination(currentPage + 1)}
          className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-8 py-3 font-extrabold text-gray-900 shadow-md
            transition transform hover:scale-105 active:scale-95"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default EvolutionTriggerTable;
