'use client'

import PokemonCardGrid from '@/components/PokemonCardGrid'
import {
  genInitialPokemonData,
  pokemonStore,
  fetchPokemonsData,
} from '@/store/pokemon'
import { useEffect } from 'react'

function Search() {
  const q = async () => {
    const pokemonList = await genInitialPokemonData()
    if (pokemonList) await fetchPokemonsData(pokemonList.slice(0, 20))
  }
  const { pokemons, pokemonsList, searchedPokemons } = pokemonStore.state
  useEffect(() => {
    q()
  }, [])
  useEffect(() => {
    console.log('pokemons:', pokemons)
    console.log('searched pokemons:', searchedPokemons)
    console.log('pokemons list:', pokemonsList)
  }, [pokemons])

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
