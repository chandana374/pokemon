/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { PokemonDetails } from '../../types/pokemon';

interface Props {
  pokemon: PokemonDetails;
  onClose: () => void;
}

const PokemonModal: React.FC<Props> = ({ pokemon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-md w-full border-4 border-yellow-500 p-8 text-white select-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-3xl text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-125 active:scale-95 focus:outline-none"
        >
          ❌
        </button>

        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6 capitalize text-center drop-shadow-lg text-yellow-400 tracking-wide select-text">
          {pokemon.name}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-6 relative">
          <div className="rounded-full bg-yellow-500 p-4 shadow-xl animate-pulse">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 text-lg text-yellow-100 leading-relaxed">
          <p>
            <span className="text-yellow-400 font-semibold">Height:</span> {pokemon.height}
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">Weight:</span> {pokemon.weight}
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">Base Experience:</span> {pokemon.base_experience}
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">Types:</span> {pokemon.types.map(t => t.type.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
