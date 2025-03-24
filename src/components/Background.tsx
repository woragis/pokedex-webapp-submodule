import pokeball1 from '@/assets/pokeball.png'
import pokeball2 from '@/assets/pokeball2.png'
import Image from 'next/image'

function Background() {
  return (
    <div className='background'>
      <Image
        src={pokeball1}
        alt='pokeball-1'
        className='pokeball pokeball-1'
      />
      <Image
        src={pokeball2}
        alt='pokeball-2'
        className='pokeball pokeball-2'
      />
      <Image
        src={pokeball1}
        alt='pokeball-3'
        className='pokeball pokeball-3'
      />
      <Image
        src={pokeball2}
        alt='pokeball-4'
        className='pokeball pokeball-4'
      />
      <Image
        src={pokeball1}
        alt='pokeball-5'
        className='pokeball pokeball-5'
      />
      <Image
        src={pokeball2}
        alt='pokeball-6'
        className='pokeball pokeball-6'
      />
    </div>
  )
}

export default Background
