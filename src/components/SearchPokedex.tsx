'use client'

import {
  useInitialPokemonData,
  usePokemonData,
  useTypesData,
  useTypesList,
} from '@/store/pokemon'
import PokemonCardGrid from './PokemonCardGrid'
import { useState } from 'react'

function SearchPokedex() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useInitialPokemonData()
  const { data: typeList, isLoading: isTypeListLoading } = useTypesList()
  useTypesData(typeList)

  const [search, setSearch] = useState<string>('')

  const filteredPokemons = pokemonList
    ?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 20)

  if (isPokemonListLoading || isTypeListLoading) return <h1>loading</h1>
  return (
    <div>
      <input
        type='text'
        name='search'
        id='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <PokemonCardGrid list={filteredPokemons!} />
    </div>
  )
}

export default SearchPokedex
