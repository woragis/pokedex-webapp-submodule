import Image from 'next/image'
import React from 'react'
import pokeballIcon from '@/assets/pokeball-icon.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'

function Navbar() {
  interface NavRoutes {
    name: string
    route: string
  }
  const navigationRoutes: NavRoutes[] = [
    { name: 'Search', route: '/search' },
    { name: 'Compare', route: '/compare' },
    { name: 'Pokemon', route: '/pokemon' },
    { name: 'My List', route: '/list' },
    { name: 'About', route: '/about' },
  ]
  return (
    <nav>
      <div className='block'>
        <Image
          src={pokeballIcon}
          alt='Pokeball icon'
        />
      </div>
      <div className='data'>
        {navigationRoutes.map(({ name, route }, index) => {
          return (
            <Link
              href={route}
              key={`nav-route-${index}`}
            >
              {name}
            </Link>
          )
        })}
      </div>
      <div className='block'>
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar
