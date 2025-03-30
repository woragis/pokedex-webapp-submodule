'use client'

import { pokemonStoreDispatch, usePokemonData } from '@/store/pokemon'
import { Pokemon } from '@/store/types/pokemon'
import Image from 'next/image'
import { redirect, usePathname } from 'next/navigation'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { IoGitCompare } from 'react-icons/io5'
import PokemonTypes from './PokemonTypes'

interface PokemonCardGridProps {
  list: Pokemon[]
}

function PokemonCardGrid({ list }: PokemonCardGridProps) {
  const { data: pokemons } = usePokemonData(list)
  const location = usePathname()

  const { addToCompare } = pokemonStoreDispatch
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
                <div
                  className='pokemon-card-compare'
                  onClick={() => addToCompare(pokemon)}
                >
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
                  <PokemonTypes
                    name={pokemon.name}
                    types={pokemon.types}
                  />
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
