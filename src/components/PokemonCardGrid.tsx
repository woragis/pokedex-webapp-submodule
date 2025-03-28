'use client'

import { PokemonData } from '@/store/pokemon'
import Image from 'next/image'
import Link from 'next/link'

interface PokemonCardGridProps {
  pokemons: PokemonData[]
}

function PokemonCardGrid({ pokemons }: PokemonCardGridProps) {
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
                <Image
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
