'use client'

import CompareContainer from '@/components/CompareContainer'
import StatsComparison from '@/components/StatsComparison'
import { pokemonStore } from '@/store/pokemon'
import { useStore } from '@tanstack/react-store'

function ComparePage() {
  const { compare } = useStore(pokemonStore, (state) => state.pokemons)
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
      <StatsComparison
        pokemon1={compare[0]}
        pokemon2={compare[1]}
      />
    </div>
  )
}

export default ComparePage
