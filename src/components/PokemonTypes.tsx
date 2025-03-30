import Image from 'next/image'

import { pokemonStoreDispatch } from '@/store/pokemon'
import { PokemonType } from '@/store/types/pokemon'

interface PokemonTypesProps {
  name: string
  types: PokemonType[]
}

function PokemonTypes({ name, types }: PokemonTypesProps) {
  const { getTypeSprite } = pokemonStoreDispatch
  return (
    <>
      {types.map((type, index) => {
        const sprite = getTypeSprite(type.type.name)
        if (sprite && sprite.length > 0)
          return (
            <div
              key={`${name} type ${index}`}
              className='pokemon-card-types-type'
            >
              <Image
                width={130}
                height={30}
                src={sprite}
                alt={`type ${type.type.name}`}
                className='pokemon-card-types-type-image'
              />
            </div>
          )
      })}
    </>
  )
}

export default PokemonTypes
