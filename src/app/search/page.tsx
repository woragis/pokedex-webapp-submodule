'use client'

import PokemonCardGrid from '@/components/PokemonCardGrid'
import {
  genInitialPokemonData,
  pokemonStore,
  fetchPokemonsData,
} from '@/store/pokemon'
import { fetchTypesData, fetchTypesList } from '@/store/types'
import { useEffect } from 'react'

function Search() {
  const q = async () => {
    const pokemonList = await genInitialPokemonData()
    const typesList = await fetchTypesList()
    if (typesList) await fetchTypesData(typesList)
    if (pokemonList) await fetchPokemonsData(pokemonList.slice(0, 10))
  }
  const { pokemons } = pokemonStore.state
  useEffect(() => {
    q()
  }, [])

  return (
    <div className='search'>
      <input
        type='text'
        name='search'
        id='search'
      />
      <PokemonCardGrid pokemons={pokemons} />
    </div>
  )
}

export default Search
