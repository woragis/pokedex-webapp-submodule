'use client'

import { pokemonStore, usePokemonData } from '@/store/pokemon'
import { Pokemon } from '@/store/types/pokemon'
import Image from 'next/image'
import { redirect, usePathname } from 'next/navigation'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { IoGitCompare } from 'react-icons/io5'

interface PokemonCardGridProps {
  list: Pokemon[]
}

function PokemonCardGrid({ list }: PokemonCardGridProps) {
  const { data: pokemons } = usePokemonData(list)
  const location = usePathname()

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
                <div className='pokemon-card-list'>
                  {location.includes('/pokemon') ||
                  location.includes('/search') ? (
                    <FaPlus className='plus' />
                  ) : (
                    <FaTrash className='trash' />
                  )}
                </div>
                <div className='pokemon-card-compare'>
                  <IoGitCompare />
                </div>
                {/* <Link href={`/pokemon/${pokemon.id}`}> */}
                <h3 className='pokemon-card-title'>{pokemon.name}</h3>
                <Image
                  width={160}
                  height={160}
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.name} sprite`}
                  className='pokemon-card-image'
                  onClick={() => {
                    redirect(`/pokemon/${pokemon.id}`)
                  }}
                />
                <div className='pokemon-card-types'>
                  {pokemon.types.map((type, index) => {
                    const curType = type.type.name
                    const typeSrc =
                      pokemonStore.state.types.data.find(
                        (typeData) => typeData.name === curType
                      )?.sprites['generation-viii']['sword-shield'].name_icon ||
                      null
                    if (typeSrc && typeSrc.length > 0)
                      return (
                        <div
                          key={`${pokemon.name} type ${index}`}
                          className='pokemon-card-types-type'
                        >
                          <Image
                            width={130}
                            height={30}
                            src={typeSrc}
                            alt={`type ${curType}`}
                            className='pokemon-card-types-type-image'
                          />
                        </div>
                      )
                  })}
                </div>
                {/* </Link> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default PokemonCardGrid
