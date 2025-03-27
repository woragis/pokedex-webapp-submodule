'use client'

import { genInitialPokemonData, pokemonStore } from '@/store/pokemon'
import { useEffect } from 'react'

function Search() {
  const q = async () => {
    await genInitialPokemonData()
  }
  useEffect(() => {
    q()
  }, [])
  return (
    <div>
      <ul>
        {pokemonStore.state.map(({ name, url }) => {
          return <li key={`searched-pokemon-${name}`}>{name}</li>
        })}
      </ul>
    </div>
  )
}

export default Search
