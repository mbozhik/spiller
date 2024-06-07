'use client'

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
  const handleAddToCart = () => {
    const cartJSON = window.localStorage.getItem('cart')
    const cart: CartItem[] = cartJSON ? JSON.parse(cartJSON) : []

    const existingProductIndex = cart.findIndex((item) => item.slug === product.slug.current)
    if (existingProductIndex === -1) {
      const cartItem: CartItem = {
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug.current,
      }
      cart.push(cartItem)
    } else {
      cart[existingProductIndex].quantity += 1
    }

    window.localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <div>
      <Button text="В корзину" classes="text-base px-20" variant="secondary" onClick={handleAddToCart} />
    </div>
  )
}
