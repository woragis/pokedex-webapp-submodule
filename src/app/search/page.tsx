'use client'

import PokemonCardGrid from '@/components/PokemonCardGrid'
import { pokemonStore, pokemonStoreDispatch } from '@/store/pokemon'
import { fetchTypesData, fetchTypesList } from '@/store/types'
import { useEffect } from 'react'

function Search() {
  const { fetchPokemonsList, fetchPokemonsData } = pokemonStoreDispatch
  const q = async () => {
    const pokemonList = await fetchPokemonsList()
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
