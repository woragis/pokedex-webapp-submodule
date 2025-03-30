import Image from 'next/image'

import { FaPlus } from 'react-icons/fa6'

import { pokemonStore } from '@/store/pokemon'
import { PokemonData, PokemonType, TypeData } from '@/store/types/pokemon'

interface CompareContainerProps {
  pokemon: PokemonData
  empty: boolean
}

function CompareContainer({ pokemon, empty }: CompareContainerProps) {
  const createStatsArray = (types: PokemonType[], statType: string) => {
    const statsArray: { name: string; image: string }[] = []
    const statsSet = new Set<string>()
    types.forEach((type: any) => {
      const key = Object.keys(type)[0]
      type[key][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          // @ts-ignore
          statsArray.push({ name: stat, image: pokemonTypes[stat].image })
          statsSet.add(stat)
        }
      })
    })
    return statsArray
  }
  const getStats = () => {
    return (
      <>
        <div className='pokemon-types'>
          <h4 className='pokemon-type-title'>Strength</h4>
          <div className='pokemon-type-icons'>
            {createStatsArray(pokemon.types, 'strength').map(
              (stat: { image: string }) => (
                <div className='pokemon-type'>
                  <img
                    src={stat.image}
                    alt=''
                    className='pokemon-type-image'
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className='pokemon-types'>
          <h4 className='pokemon-type-title'>Weakness</h4>
          <div className='pokemon-type-icons'>
            {createStatsArray(pokemon.types, 'weakness').map(
              (stat: { image: string }) => (
                <div className='pokemon-type'>
                  <img
                    src={stat.image}
                    alt=''
                    className='pokemon-type-image'
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className='pokemon-types'>
          <h4 className='pokemon-type-title'>Resistance</h4>
          <div className='pokemon-type-icons'>
            {createStatsArray(pokemon.types, 'resistance').map(
              (stat: { image: string }) => (
                <div className='pokemon-type'>
                  <img
                    src={stat.image}
                    alt=''
                    className='pokemon-type-image'
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className='pokemon-types'>
          <h4 className='pokemon-type-title'>Vulnerable</h4>
          <div className='pokemon-type-icons'>
            {createStatsArray(pokemon.types, 'vulnerable').map(
              (stat: { image: string }) => (
                <div className='pokemon-type'>
                  <img
                    src={stat.image}
                    alt=''
                    className='pokemon-type-image'
                  />
                </div>
              )
            )}
          </div>
        </div>
      </>
    )
  }
  return (
    <div className='compare-container'>
      {empty && (
        <div className='empty'>
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
              {/* {getStats()} */}
            </div>
            {/* <div>
              {pokemon.stats.map((stat) => {
                return (
                  <div key={`pokemon-${pokemon.name}-stat-${stat.stat.name}`}>
                    <a href={stat.stat.url}>{stat.stat.name}</a>
                    <br />
                    number: {stat.base_stat}
                  </div>
                )
              })}
            </div> */}
          </div>
          {/* <div className='audio'>
            <audio
              src={pokemon.cries.latest}
              controls
            >
              Your browser doesnt support the audio element
            </audio>
          </div> */}
          <div className='compare-action-buttons'>
            <button className='compare-btn'>add</button>
            <button className='compare-btn'>view</button>
            <button className='compare-btn'>remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompareContainer
