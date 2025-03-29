'use client'

import { pokemonStore } from '@/store/pokemon'

function PokemonsPage() {
  return (
    <div style={{ color: 'white', overflowY: 'scroll', height: '100%' }}>
      pokemon damage data
      <br />
      <div>
        {pokemonStore.state.types.data.map((type) => {
          return (
            <div key={`typing-${type.name}-relations`}>
              <h3>Type: {type.name}</h3>
              <hr />
              <p>Weaknessess:</p>
              {type.damage_relations.double_damage_from.map((dama) => (
                <p
                  key={`typing-${type.name}-double-damage-from-relations-${dama.name}`}
                >
                  {dama.name}
                </p>
              ))}
              <hr />
              <p>Strengths:</p>
              {type.damage_relations.double_damage_to.map((dama) => (
                <p
                  key={`typing-${type.name}-double-damage-from-relations-${dama.name}`}
                >
                  {dama.name}
                </p>
              ))}
              <br />
              <hr />
              <p>Restistant to:</p>
              {type.damage_relations.half_damage_from.map((dama) => (
                <p
                  key={`typing-${type.name}-double-damage-from-relations-${dama.name}`}
                >
                  {dama.name}
                </p>
              ))}
              <hr />
              <p>Restisted by:</p>
              {type.damage_relations.half_damage_to.map((dama) => (
                <p
                  key={`typing-${type.name}-double-damage-from-relations-${dama.name}`}
                >
                  {dama.name}
                </p>
              ))}
              <br />
              <hr />
              <p>No damage from:</p>
              {type.damage_relations.no_damage_from.map((dama) => (
                <p
                  key={`typing-${type.name}-double-damage-from-relations-${dama.name}`}
                >
                  {dama.name}
                </p>
              ))}
              <p>No damage to:</p>
              {type.damage_relations.no_damage_to.map((dama) => (
                <p
                  key={`typing-${type.name}-double-damage-from-relations-${dama.name}`}
                >
                  {dama.name}
                </p>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PokemonsPage
