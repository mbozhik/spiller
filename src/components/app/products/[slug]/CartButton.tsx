'use client'

import {useCartCounter} from '@/store'

import {Product} from '@/app/products/page' // types
import Button from '#/UI/Button'

export interface CartItem {
  name: string
  article: number
  price: number
  quantity: number
  slug: string
  image?: Array<{asset: {url: string}}>
}

interface CartButtonProps {
  product: Product
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function CartButton({product, variant, className}: CartButtonProps) {
  const {count, addProduct} = useCartCounter((state) => state)

  const handleAddToCart = () => {
    const cart = JSON.parse(window.localStorage.getItem('cart') || '[]') as CartItem[]

    const existingProductIndex = cart.findIndex((item) => item.slug === product.slug.current)
    if (existingProductIndex === -1) {
      cart.push({
        name: product.name,
        article: product.article,
        price: product.price,
        quantity: 1,
        slug: product.slug.current,
        image: product.image,
      })
    } else {
      cart[existingProductIndex].quantity += 1
    }

    window.localStorage.setItem('cart', JSON.stringify(cart))

    addProduct(count)
  }

  return (
    <div>
      <Button text="В корзину" classes={className} variant={variant} onClick={handleAddToCart} />
    </div>
  )
}
