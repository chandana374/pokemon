import { GetServerSideProps } from 'next';
import { useState } from 'react';
import PokemonTable from '../components/pokemonTable';
import { PokemonListResponse, PokemonSummary } from '../types/pokemon';

type Props = {
  pokemons: PokemonSummary[];
  totalCount: number;
  page: number;
};

const PAGE_SIZE = 20;

export default function Home({ pokemons, totalCount, page }: Props) {
  const [currentPage, setCurrentPage] = useState(page);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div>
      <h1>Pokémon List (Page {currentPage})</h1>
      <PokemonTable pokemons={pokemons} />
      <div style={{ marginTop: 20 }}>
        <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} style={{ marginLeft: 10 }}>
          Next
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt((context.query.page as string) || '1', 10);
  const offset = (page - 1) * PAGE_SIZE;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  const data: PokemonListResponse = await res.json();

  return {
    props: {
      pokemons: data.results,
      totalCount: data.count,
      page,
    },
  };
};
