'use client'

import {cn} from '@/lib/utils'
import {isMobile} from '@bozzhik/is-mobile'
import {usePathname} from 'next/navigation'

import Link from 'next/link'

export default function NavBar() {
  const pathname = usePathname()

  const navItems = [
    {href: '/', label: 'Главная'},
    {href: '/products', label: 'Продукты'},
    {href: '/cosmetology', label: 'Косметология'},
    {href: '/about', label: 'О бренде'},
    {href: '/buy', label: 'Где купить'},
    {href: '/partnership', label: 'Партнёрам'},
  ]

  return (
    <nav className="z-10 flex justify-center text-lg text-center bg-white sm:justify-between sm:text-xs xl:text-base text-custom-grey shadow-nav sm:shadow-nav_mobile">
      {navItems.map(({href, label}, index) => {
        const isActive = pathname === href
        const isLast = index === navItems.length - 1

        if (isMobile && ['/about', '/'].includes(href)) return null

        return (
          <Link href={href} key={href} className={cn('py-2 duration-200 border-l-2 xl:py-2 px-8 sm:px-1.5 hover:bg-custom-nav border-custom-nav w-fit sm:w-full', isActive && 'bg-custom-nav', isLast && 'border-r-2')}>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
