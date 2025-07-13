// app/page.tsx
import { Suspense } from 'react';
import PokemonTable from './components/pokemonTable';
import EvolutionTriggerTable from './components/triggerTable';
import { Pokemon } from '../types/pokemon';

interface RawSearchParams {
  page?: string;
  name?: string;
  evoPage?: string;
}

/* ---------- data loaders ---------- */

async function fetchPokemon(page: number, name: string | null): Promise<Pokemon[]> {
  if (name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) return [];
    const data = await res.json();
    return [{ name: data.name, url: data.url }];
  }

  const offset = (page - 1) * 10;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  );
  const data = await res.json();
  return data.results;
}

async function fetchEvolutionTriggers(evoPage: number) {
  const offset = (evoPage - 1) * 5; // smaller limit for fun
  const res = await fetch(
    `https://pokeapi.co/api/v2/evolution-trigger/?limit=5&offset=${offset}`
  );
  const data = await res.json();
  return data.results;
}

/* ---------- page component ---------- */

async function Home({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  // Await the promise once, then destructure
  const { page = '1', name = null, evoPage = '1' } = await searchParams;

  const currentPage = Number(page);
  const currentEvoPage = Number(evoPage);

  const [pokemonList, evolutionTriggers] = await Promise.all([
    fetchPokemon(currentPage, name),
    fetchEvolutionTriggers(currentEvoPage),
  ]);

  return (
    <main className="p-6 space-y-10">
      <PokemonTable
        pokemonList={pokemonList}
        currentPage={currentPage}
        searchName={name ?? ''}
      />

      <EvolutionTriggerTable
        triggers={evolutionTriggers}
        currentPage={currentEvoPage}
      />
    </main>
  );
}

export default function HomeWithSuspense(props: {
  searchParams: Promise<RawSearchParams>;
}) {
  return (
    <Suspense fallback={<p className="p-6">Loading Pokemon…</p>}>
      <Home {...props} />
    </Suspense>
  );
}
