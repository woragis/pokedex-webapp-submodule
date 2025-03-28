'use client'

import { PokemonData } from '@/store/pokemon'
import Link from 'next/link'

interface PokemonCardGridProps {
  pokemons?: PokemonData[]
}
function PokemonCardGrid({ pokemons }: PokemonCardGridProps) {
  console.log(pokemons)
  return (
    <div className='pokemon-card-grid-container'>
      {pokemons &&
        pokemons.length > 0 &&
        pokemons.map((pokemon) => {
          return (
            <div
              className='pokemon-card'
              key={`listed-pokemon-${pokemon.id}`}
            >
              <Link href={`/pokemon/${pokemon.id}`}>
                <img
                  width={100}
                  height={100}
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.name} sprite`}
                />
                <p>{pokemon.name}</p>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default PokemonCardGrid
