'use client'

import Image from 'next/image'
import React, { useEffect, useMemo } from 'react'
import pokeballIcon from '@/assets/pokeball-icon.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {
  const pathname = usePathname()
  interface NavRoutes {
    name: string
    route: string
  }
  const navRoutes: NavRoutes[] = useMemo<NavRoutes[]>(
    () => [
      { name: 'Search', route: '/search' },
      { name: 'Compare', route: '/compare' },
      { name: 'Pokemon', route: '/pokemon' },
      { name: 'My List', route: '/list' },
      { name: 'About', route: '/about' },
    ],
    []
  )

  useEffect(() => {
    const i = navRoutes.findIndex(({ route }) => pathname.includes(route))
    ul(i)
  }, [pathname, navRoutes])
  function ul(index: number) {
    const underlines = document.querySelectorAll<HTMLElement>('.underline')
    for (let i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)'
    }
  }
  return (
    <nav>
      <div className='block'>
        <Image
          src={pokeballIcon}
          alt='Pokeball icon'
        />
      </div>
      <div className='data'>
        <ul>
          <div className='underline'></div>
          <div className='underline'></div>
          <div className='underline'></div>
          {navRoutes.map(({ name, route }, index) => {
            return (
              <Link
                href={route}
                key={`nav-route-${index}`}
              >
                <li>{name}</li>
              </Link>
            )
          })}
        </ul>
      </div>
      <div className='block'>
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar
