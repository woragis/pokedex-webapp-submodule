import { PokemonData } from '@/store/pokemon'
import Link from 'next/link'

interface PokemonCardGridProps {
  pokemons: PokemonData[]
}
function PokemonCardGrid({ pokemons }: PokemonCardGridProps) {
  return (
    <div className='pokemon-card-grid-container'>
      {pokemons &&
        pokemons.length > 0 &&
        pokemons.map((pokemon) => {
          return (
            <div
              className='pokemon-card'
              key={`listed-pokemon-${pokemon.id}`}
            >
              <Link href={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
            </div>
          )
        })}
    </div>
  )
}

export default PokemonCardGrid
