'use client'

import {useState} from 'react'
import {useCartCounter} from '@/store'

import {ShoppingBag} from 'lucide-react'
import CartForm from '##/products/CartForm'

export default function CardIcon() {
  const cartCounter = useCartCounter((state) => state.count)

  const [showForm, setShowForm] = useState(false)

  const handleButtonClick = () => {
    setShowForm(true)
  }

  return (
    <>
      <div className="fixed z-50 p-4 xl:p-3 sm:p-2 top-[35vh] bg-white rounded-md shadow-cart right-10 xl:right-5 sm:top-[2.5vh] group cursor-pointer" onClick={handleButtonClick}>
        <ShoppingBag className="duration-300 text-custom-blue s-12 xl:s-10 group-hover:scale-110" strokeWidth={1.25} />
        <div className="absolute bottom-[-8px] right-[-10px] s-8 sm:text-sm sm:pt-0.5 text-lg grid place-items-center rounded-full text-white bg-custom-blue font-medium pb-0.5">{cartCounter}</div>
      </div>

      {showForm && <CartForm onClose={() => setShowForm(false)} />}
    </>
  )
}
