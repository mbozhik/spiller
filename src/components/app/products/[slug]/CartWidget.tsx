'use client'

import {useCartCounter} from '@/store'
import {ShoppingBag} from 'lucide-react'

export default function CardIcon() {
  const cartCounter = useCartCounter((state) => state.count)

  return (
    <div className="fixed z-50 p-4 top-[35vh] bg-white rounded-md shadow-cart right-10">
      <ShoppingBag className="text-custom-blue" size={50} strokeWidth={1.25} />
      <div className="absolute bottom-[-8px] right-[-10px] w-8 h-8 text-lg grid place-items-center rounded-full text-white bg-custom-blue font-medium pb-0.5">{cartCounter}</div>
    </div>
  )
}
