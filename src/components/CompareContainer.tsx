import { PokemonData } from '@/store/types/pokemon'
import { FaPlus } from 'react-icons/fa6'

interface CompareContainerProps {
  pokemon: PokemonData
  empty: boolean
}
function CompareContainer({ pokemon, empty }: CompareContainerProps) {
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
    </div>
  )
}

export default CompareContainer
