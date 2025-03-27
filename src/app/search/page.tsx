'use client'

import PokemonCardGrid from '@/components/PokemonCardGrid'
import { setLoading } from '@/store/app'
import {
  genInitialPokemonData,
  setRandomPokemonsData as setSearchedPokemonsData,
  pokemonStore,
} from '@/store/pokemon'
import { useEffect } from 'react'

function Search() {
  const q = async () => {
    await genInitialPokemonData()
  }
  const pokemons = pokemonStore.state
  useEffect(() => {
    q()
  }, [])
  useEffect(() => {
    if (pokemons.pokemons) {
      const clonedPokemons = [...pokemons.pokemons]
      const randomPokemons = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)
      setSearchedPokemonsData(randomPokemons)
    }
  }, [pokemons])

  const searchPokemons = pokemonStore.state.searchedPokemons

  useEffect(() => {
    if (searchPokemons) {
      setLoading(false)
    }
  }, [searchPokemons])

  return (
    <div className='search'>
      <input
        type='text'
        name='search'
        id='search'
      />
      {!searchPokemons && <h1>No pokemons found</h1>}
      {searchPokemons && <PokemonCardGrid pokemons={searchPokemons} />}
    </div>
  )
}

export default Search
