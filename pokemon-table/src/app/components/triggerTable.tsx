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
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-2">Evolution Triggers</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
          </tr>
        </thead>
        <tbody>
          {triggers.map((trigger) => (
            <tr key={trigger.name} className="text-center">
              <td className="p-2 border capitalize">{trigger.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EvolutionTriggerTable;
