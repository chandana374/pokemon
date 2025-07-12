'use client';

import React from 'react';
import { PokemonDetails } from '../../types/pokemon';

interface Props {
  pokemon: PokemonDetails;
  onClose: () => void;
}

const PokemonModal: React.FC<Props> = ({ pokemon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2">❌</button>
        <h2 className="text-2xl font-bold mb-2">{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto mb-2" />
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default PokemonModal;