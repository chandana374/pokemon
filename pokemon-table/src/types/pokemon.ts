import { ReactNode } from "react";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  base_experience: ReactNode;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
   evolutionTriggers?: string[];
}

export interface EvolutionTrigger {
  id: number;
  name: string;
}
