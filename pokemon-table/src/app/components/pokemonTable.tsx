// src/app/components/pokemonTable.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pokemon, PokemonDetails } from '../../types/pokemon';
import PokemonModal from './pokemonModal';

interface Props {
  pokemonList: Pokemon[];
  currentPage: number;
  searchName: string;
}

const PokemonTable: React.FC<Props> = ({ pokemonList, currentPage, searchName }) => {
  const router = useRouter();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [searchInput, setSearchInput] = useState(searchName);

  const fetchPokemonDetails = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      alert('Failed to fetch Pokémon details.');
      return;
    }
    const data = await res.json();
    setSelectedPokemon(data);
  };

  const handlePagination = (newPage: number) => {
    if (newPage < 1) return;
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (searchInput.trim()) params.set('name', searchInput);
    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) {
      params.set('name', searchInput);
    } else {
      params.set('page', '1');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon) => (
            <tr key={pokemon.name} className="text-center">
              <td className="p-2 border capitalize">{pokemon.name}</td>
              <td className="p-2 border">
                <button
                  onClick={() => fetchPokemonDetails(pokemon.name)}
                  className="text-blue-500 underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {pokemonList.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center p-4 text-gray-500">
                No Pokémon found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!searchName && (
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
      )}

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
};

export default PokemonTable;
