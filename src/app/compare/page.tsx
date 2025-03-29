'use client'

import CompareContainer from '@/components/CompareContainer'
import { pokemonStore } from '@/store/pokemon'

function ComparePage() {
  const { compare } = pokemonStore.state.pokemons
  return (
    <div className='compare'>
      <CompareContainer
        pokemon={compare[0]}
        empty={compare.length < 1}
      />
      <CompareContainer
        pokemon={compare[1]}
        empty={compare.length < 2}
      />
    </div>
  )
}

export default ComparePage
