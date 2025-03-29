'use client'

import { pokemonStore } from '@/store/pokemon'

function ComparePage() {
  return (
    <div>
      <p>compared pokemons</p>
      <ul>
        {pokemonStore.state.pokemons.compare.map((comparedMons) => {
          return <li>{comparedMons.name}</li>
        })}
      </ul>
    </div>
  )
}

export default ComparePage
