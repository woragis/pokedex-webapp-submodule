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

  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5)

  const filteredPokemons = search
    ? pokemonList?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    : shuffleArray(pokemonList ?? []).slice(0, 20)

  if (isPokemonListLoading || isTypeListLoading) return <h1>loading</h1>
  return (
    <div className='search'>
      <input
        type='text'
        name='search'
        id='search'
        className='pokemon-searchbar'
        placeholder='Search Pokemon'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <PokemonCardGrid list={filteredPokemons!} />
    </div>
  )
}

export default SearchPokedex
