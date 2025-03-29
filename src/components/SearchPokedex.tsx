'use client'

import { useState } from 'react'
import {
  useInitialPokemonData,
  useTypesList,
  useTypesData,
} from '@/store/pokemon'
import PokemonCardGrid from './PokemonCardGrid'
import { debounce } from '@/utils/debounce'
import { Pokemon } from '@/store/types/pokemon'

function SearchPokedex() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useInitialPokemonData()
  const { data: typeList, isLoading: isTypeListLoading } = useTypesList()

  // Ensure types are loaded in the store
  useTypesData(typeList)

  const [search, setSearch] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')

  // Create a debounced function for search
  const debouncedSearchHandler = debounce((searchTerm: string) => {
    setDebouncedSearch(searchTerm)
  }, 500) // 500ms delay

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSearchHandler(value) // Call the debounced search handler
  }

  // Function to shuffle an array randomly
  const shuffleArray = (array: Pokemon[]) => {
    return array.sort(() => Math.random() - 0.5)
  }

  // Filter the list based on search or shuffle it randomly
  const filteredPokemons = debouncedSearch
    ? pokemonList?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : shuffleArray(pokemonList ?? []).slice(0, 20) // Show random 20 if no search

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
        onChange={handleSearchChange} // Update search state and trigger debounced search
      />
      {/* Pass the filtered or shuffled list */}
      <PokemonCardGrid list={filteredPokemons!} />
    </div>
  )
}

export default SearchPokedex
