'use client'

import PokemonCardGrid from '@/components/PokemonCardGrid'
import {
  useInitialPokemonData,
  usePokemonData,
  useTypesData,
  useTypesList,
} from '@/store/pokemon'

function Search() {
  const { data: pokemonsList } = useInitialPokemonData()
  const { data: pokemonsData } = usePokemonData(
    pokemonsList?.sort(() => Math.random() - Math.random()).slice(0, 20)
  )
  const { data: typesList } = useTypesList()
  useTypesData(typesList)

  return (
    <div className='search'>
      <input
        type='text'
        name='search'
        id='search'
      />
      <PokemonCardGrid pokemons={pokemonsData!} />
    </div>
  )
}

export default Search
