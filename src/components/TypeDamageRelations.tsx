import { pokemonStoreDispatch } from '@/store/pokemon'
import { PokemonType } from '@/store/types/pokemon'
import Image from 'next/image'

interface TypeDamageRelationsProps {
  types: PokemonType[]
}
function TypeDamageRelations({ types }: TypeDamageRelationsProps) {
  const { getTypeSprite, getPokemonTypeEffectiveness } = pokemonStoreDispatch
  const damageRelations = getPokemonTypeEffectiveness(types)
  return (
    <>
      <div className='pokemon-types'>
        <h4 className='pokemon-type-title'>Strength</h4>
        <div className='pokemon-type-icons'>
          {damageRelations.strongAgainst.map((strength, index) => {
            return (
              <div
                key={`strength-type-${strength}-against-${index}`}
                className='pokemon-type'
              >
                <Image
                  width={30}
                  height={30}
                  src={getTypeSprite(strength)!}
                  alt={`type ${strength}`}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='pokemon-types'>
        <h4 className='pokemon-type-title'>Resistance</h4>
        <div className='pokemon-type-icons'>
          {damageRelations.resistantTo.map((strength, index) => {
            return (
              <div
                key={`strength-type-${strength}-against-${index}`}
                className='pokemon-type'
              >
                <Image
                  width={30}
                  height={30}
                  src={getTypeSprite(strength)!}
                  alt={`type ${strength}`}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='pokemon-types'>
        <h4 className='pokemon-type-title'>Vulnerable</h4>
        <div className='pokemon-type-icons'>
          {damageRelations.weakTo.map((strength, index) => {
            return (
              <div
                key={`strength-type-${strength}-against-${index}`}
                className='pokemon-type'
              >
                <Image
                  width={30}
                  height={30}
                  src={getTypeSprite(strength)!}
                  alt={`type ${strength}`}
                />
              </div>
            )
          })}
        </div>
      </div>
      {damageRelations.immuneTo.length > 0 && (
        <div className='pokemon-types'>
          <h4 className='pokemon-type-title'>Imune</h4>
          <div className='pokemon-type-icons'>
            {damageRelations.immuneTo.map((strength, index) => {
              return (
                <div
                  key={`strength-type-${strength}-against-${index}`}
                  className='pokemon-type'
                >
                  <Image
                    width={30}
                    height={30}
                    src={getTypeSprite(strength)!}
                    alt={`type ${strength}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default TypeDamageRelations
