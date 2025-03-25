import Image from 'next/image'
import React from 'react'
import pokeballIcon from '@/assets/pokeball-icon.png'
import { GiHamburgerMenu } from 'react-icons/gi'

function Navbar() {
  return (
    <nav>
      <div className='block'>
        <Image
          src={pokeballIcon}
          alt='Pokeball icon'
        />
      </div>
      <div className='data'></div>
      <div className='block'>
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar
