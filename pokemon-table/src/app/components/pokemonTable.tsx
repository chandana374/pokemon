/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pokemon, PokemonDetails } from "../../types/pokemon";
import PokemonModal from "./pokemonModal";

interface Props {
  pokemonList: Pokemon[];
  currentPage: number;
  searchName: string;
}

const PokemonTable: React.FC<Props> = ({
  pokemonList,
  currentPage,
  searchName,
}) => {
  const router = useRouter();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [searchInput, setSearchInput] = useState(searchName);

  const fetchPokemonDetails = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      alert("Failed to fetch Pokemon details.");
      return;
    }
    const data = await res.json();
    setSelectedPokemon(data);
  };

  const handlePagination = (newPage: number) => {
    if (newPage < 1) return;
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (searchInput.trim()) params.set("name", searchInput);
    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) {
      params.set("name", searchInput);
    } else {
      params.set("page", "1");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-4 mb-8">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Pokemon by name..."
          className="flex-1 rounded-full border-2 border-gray-700 bg-gray-800 px-5 py-3 font-bold text-lg text-white placeholder-gray-500
            focus:outline-none focus:ring-4 focus:ring-yellow-500 transition shadow-sm"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-extrabold text-lg px-6 py-3 rounded-full shadow-lg
            transition transform hover:scale-105 active:scale-95"
          aria-label="Search Pokemon"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border-2 border-gray-700 bg-gray-800 shadow-lg">
        <table className="min-w-full text-white font-semibold select-none">
          <thead className="bg-gray-700 text-yellow-400 uppercase tracking-wider font-extrabold text-lg">
            <tr>
              <th className="px-6 py-4">Sprite</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 w-12" aria-label="Open details"></th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-10 italic text-gray-400 text-lg"
                >
                  No Pokemon found
                </td>
              </tr>
            )}
            {pokemonList.map((pokemon) => (
              <tr
                onClick={() => fetchPokemonDetails(pokemon.name)}
                key={pokemon.name}
                className="cursor-pointer transition-all hover:bg-gray-700 hover:shadow-lg active:scale-95"
              >
                <td className="px-6 py-4 flex items-center justify-center">
                  <img
                    src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`}
                    alt={pokemon.name}
                    className="w-12 h-12 drop-shadow-lg"
                    loading="lazy"
                  />
                </td>

                <td className="px-6 py-4 text-center capitalize text-xl text-yellow-300 font-bold tracking-wide drop-shadow-sm">
                  {pokemon.name}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => fetchPokemonDetails(pokemon.name)}
                    aria-label={`View details of ${pokemon.name}`}
                    className="text-yellow-400 hover:text-yellow-500 transition transform hover:scale-125 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!searchName && (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-8 py-3 font-extrabold text-yellow-400 shadow-md
              transition transform hover:scale-105 active:scale-95"
          >
            ← Previous
          </button>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            className="bg-gray-700 hover:bg-gray-600 rounded-full px-8 py-3 font-extrabold text-yellow-400 shadow-md
              transition transform hover:scale-105 active:scale-95"
          >
            Next →
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default PokemonTable;
