'use client'

import { genInitialPokemonData, pokemonStore } from '@/store/pokemon'
import Link from 'next/link'
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
          return (
            <Link
              href={url}
              key={`searched-pokemon-${name}`}
            >
              <li>{name}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default Search
