'use client'

import { pokemonStore, usePokemonData } from '@/store/pokemon'
import { Pokemon } from '@/store/types/pokemon'
import Image from 'next/image'
import Link from 'next/link'

interface PokemonCardGridProps {
  list: Pokemon[]
}

function PokemonCardGrid({ list }: PokemonCardGridProps) {
  const { data: pokemons } = usePokemonData(list)

  return (
    <div className='pokemon-card-grid-container'>
      <div className='pokemon-card-grid'>
        {pokemons &&
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
                  <div className='pokemon-card-types'>
                    {pokemon.types.map((type, index) => {
                      const curType = type.type.name
                      const typeSrc =
                        pokemonStore.state.types.data.find(
                          (typeData) => typeData.name === curType
                        )?.sprites['generation-viii']['sword-shield']
                          .name_icon || null
                      if (typeSrc && typeSrc.length > 0)
                        return (
                          <div key={`${pokemon.name} type ${index}`}>
                            <Image
                              width={150}
                              height={30}
                              src={typeSrc}
                              alt={`type ${curType}`}
                            />
                          </div>
                        )
                    })}
                  </div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default PokemonCardGrid
