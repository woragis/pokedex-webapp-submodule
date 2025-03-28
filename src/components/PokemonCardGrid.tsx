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
      <div className='pokemon-card-grid'>
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((pokemon) => {
            return (
              <div
                className='pokemon-card'
                key={`listed-pokemon-${pokemon.id}`}
              >
                <Link href={`/pokemon/${pokemon.id}`}>
                  <h3 className='pokemon-card-title'>{pokemon.name}</h3>
                  <Image
                    width={160}
                    height={160}
                    src={pokemon.sprites.front_default}
                    alt={`${pokemon.name} sprite`}
                    className='pokemon-card-image'
                  />
                  <div className='pokemon-card-types'></div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default PokemonCardGrid
