'use client'

import {useCartCounter} from '@/store'

import {Product} from '@/app/products/page'
import Button from '#/UI/Button'

interface CartItem {
  name: string
  price: number
  quantity: number
  slug: string
}

interface CartButtonProps {
  product: Product
}

export default function CartButton({product}: CartButtonProps) {
  const {count, addProduct} = useCartCounter((state) => state)

  const handleAddToCart = () => {
    const cart = JSON.parse(window.localStorage.getItem('cart') || '[]') as CartItem[]

    const existingProductIndex = cart.findIndex((item) => item.slug === product.slug.current)
    if (existingProductIndex === -1) {
      cart.push({
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug.current,
      })
    } else {
      cart[existingProductIndex].quantity += 1
    }

    window.localStorage.setItem('cart', JSON.stringify(cart))

    addProduct(count)
  }

  return (
    <div>
      <Button text="В корзину" classes="text-base px-20" variant="secondary" onClick={handleAddToCart} />
    </div>
  )
}
