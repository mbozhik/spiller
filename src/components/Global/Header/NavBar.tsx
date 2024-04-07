'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function NavBar() {
  const currentRoute = usePathname()

  const navItems = {
    index: {href: '/', text: 'Главная'},
    products: {href: '/products', text: 'Продукты'},
    about: {href: '/about', text: 'О бренде'},
    buy: {href: '/buy', text: 'Где купить'},
  }

  const linkStyle = 'py-3 duration-200 border-l-2 xl:py-2 px-11 xl:px-8 sm:px-0 hover:bg-custom-nav border-custom-nav w-fit sm:w-[25%]'
  const activeStyle = 'bg-custom-nav'

  return (
    <nav className="z-10 flex justify-center text-xl text-center bg-white sm:justify-between sm:text-xs xl:text-base text-custom-grey shadow-nav sm:shadow-nav_mobile">
      {Object.keys(navItems).map((id) => {
        const {href, text} = navItems[id]
        const isActive = currentRoute === href

        const linkClasses = [linkStyle, isActive && activeStyle, id === 'buy' && 'border-r-2'].filter(Boolean).join(' ')

        return (
          <Link href={href} key={id} className={linkClasses}>
            {text}
          </Link>
        )
      })}
    </nav>
  )
}
