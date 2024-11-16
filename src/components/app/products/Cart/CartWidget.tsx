'use client'

import {useCartCounter} from '@/state/cart'

import {ShoppingBag} from 'lucide-react'
import Link from 'next/link'

export default function CardIcon() {
  const cartCounter = useCartCounter((state) => state.count)

  return (
    cartCounter > 0 && (
      <Link href="/cart" className="fixed z-50 p-4 xl:p-3 sm:p-2 top-[35vh] bg-white rounded-md shadow-cart right-10 xl:right-5 sm:top-[2.5vh] group cursor-pointer">
        <ShoppingBag className="duration-300 text-custom-blue s-12 xl:s-10 sm:s-8 group-hover:scale-110" strokeWidth={1.25} />
        <div className="absolute bottom-[-8px] right-[-10px] s-8 sm:s-7 sm:text-sm sm:pt-0.5 text-lg grid place-items-center rounded-full text-white bg-custom-blue font-medium pb-0.5">{cartCounter}</div>
      </Link>
    )
  )
}
