import Image from 'next/image'

import { FaPlus } from 'react-icons/fa6'

import { pokemonStore, pokemonStoreDispatch } from '@/store/pokemon'
import { PokemonData } from '@/store/types/pokemon'
import TypeDamageRelations from './TypeDamageRelations'
import { redirect } from 'next/navigation'
import { LuAudioLines } from 'react-icons/lu'

interface CompareContainerProps {
  pokemon: PokemonData
  empty: boolean
}

function CompareContainer({ pokemon, empty }: CompareContainerProps) {
  const { removeFromCompare } = pokemonStoreDispatch
  const pokemonCrySrc: string = pokemon?.cries.latest
  const playPokemonCry = () => {
    const pokemonCry: HTMLAudioElement = new Audio(pokemonCrySrc || '')
    if (pokemonCry) pokemonCry.volume = 0.008
    pokemonCry.play()
  }
  return (
    <div className='compare-container'>
      {empty && (
        <div
          className='empty'
          onClick={() => redirect('/search')}
        >
          <button>
            <FaPlus />
          </button>
          <h3>Add Pokemon to Comparison</h3>
        </div>
      )}
      {pokemon && (
        <div className='compare-element'>
          <div className='compare-info'>
            <div className='compare-details'>
              <h3>{pokemon.name}</h3>
              <div className='pokemon-cry'>
                <LuAudioLines onClick={playPokemonCry} />
              </div>
              <Image
                alt={`pokemon-${pokemon.name}-sprite`}
                src={pokemon.sprites.front_default}
                width={160}
                height={160}
                className='compare-image'
              />
            </div>
            <div className='pokemon-types-container'>
              <div className='pokemon-types'>
                <h4 className='pokemon-type-title'></h4>
                <ul className='pokemon-types-icons'>
                  {pokemon.types.map((type) => {
                    const monTypeSrc =
                      pokemonStore.state.types.data.find(
                        (typeData) => typeData.name === type.type.name
                      )?.sprites['generation-viii']['sword-shield'].name_icon ||
                      ''
                    return (
                      <li
                        key={`compared-pokemon-${pokemon.name}-type-${type.type.name}`}
                        className='pokemon-type'
                      >
                        <Image
                          alt={`compared pokemon type ${type}`}
                          src={monTypeSrc}
                          width={130}
                          height={30}
                          className='pokemon-type-image'
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <TypeDamageRelations types={pokemon.types} />
            </div>
          </div>
          <div className='compare-action-buttons'>
            <button className='compare-btn'>add</button>
            <button className='compare-btn'>view</button>
            <button
              className='compare-btn'
              onClick={() => removeFromCompare(pokemon)}
            >
              remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompareContainer
