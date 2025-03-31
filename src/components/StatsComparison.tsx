import { PokemonData } from '@/store/types/pokemon'

interface StatsComparisonProps {
  pokemon1?: PokemonData
  pokemon2?: PokemonData
}
interface Stat {
  hp: number
  attack: number
  defense: number
  'special-attack': number
  'special-defense': number
  speed: number
}

function StatsComparison({ pokemon1, pokemon2 }: StatsComparisonProps) {
  const maxStats: Stat = {
    hp: 200,
    attack: 200,
    defense: 200,
    'special-attack': 200,
    'special-defense': 200,
    speed: 200,
  }

  return (
    <div id='stats-comparison'>
      <div id='pokemon-1'>
        {pokemon1 &&
          pokemon1.stats.map((stat) => {
            return (
              <div key={`pokemon-${pokemon1.name}-stat-${stat.stat.name}`}>
                <a href={stat.stat.url}>{stat.stat.name}</a>
                <br />
                <progress
                  max={maxStats[stat.stat.name]}
                  value={stat.base_stat}
                ></progress>
                {stat.base_stat}
              </div>
            )
          })}
      </div>
      <div id='pokemon-2'>
        {pokemon2 &&
          pokemon2.stats.map((stat) => {
            return (
              <div key={`pokemon-${pokemon2.name}-stat-${stat.stat.name}`}>
                <a href={stat.stat.url}>{stat.stat.name}</a>
                <br />
                <progress
                  max={maxStats[stat.stat.name]}
                  value={stat.base_stat}
                ></progress>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default StatsComparison
