import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'

import {urlForImage} from '@/lib/sanity'
import {useCartCounter} from '@/state/cart'

import Image from 'next/image'
import {SquareX} from 'lucide-react'

import Title from '#/UI/Title'
import Button, {buttonVariants} from '#/UI/Button'
import {CartItem} from '##/products/Cart/CartButton' // types

type FormFields = {
  name: string
  email: string
  phone: string
  message: string
}

const promocodes = {
  1: {
    code: 'SPILLER',
    discount: 10,
  },
}

const Form = ({onClose}) => {
  const [submitMessage, setSubmitMessage] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)

  const {removeProduct, resetCart} = useCartCounter((state) => state)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormFields>()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'КОРЗИНА',
          email: data.email,
          message: data.message,
          name: data.name,
          phone: data.phone,
          items: cart,
          promoDetails: promoApplied ? `Промокод: ${promoCode} — ${discount}%` : 'Промокод не применен',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send data')
      }

      setSubmitMessage('Форма отправлена!')
      setTimeout(() => {
        clearCart()
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const formElement = document.getElementById('FORM_WRAPPER')
      if (formElement && !formElement.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    const cartData: CartItem[] = JSON.parse(window.localStorage.getItem('cart') || '[]')
    setCart(cartData)
  }, [])

  const clearCart = () => {
    window.localStorage.removeItem('cart')
    setCart([])
    resetCart()

    onClose()
  }

  const removeItem = (index: number) => {
    const productToRemove = cart[index]
    const newCart = cart.filter((_, idx) => idx !== index)

    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))

    if (newCart.length === 0) {
      onClose()
    }

    removeProduct(productToRemove.quantity)
  }

  const calculateTotalPrice = () => {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    return total - (total * discount) / 100
  }

  const applyPromoCode = () => {
    const promo = Object.values(promocodes).find((p) => p.code === promoCode.toUpperCase())
    if (promo) {
      setDiscount(promo.discount)
      setPromoApplied(true)
    } else {
      setDiscount(0)
      setPromoApplied(false)
    }
  }

  const gridConfig = {
    global: 'grid-cols-10 sm:grid-col-span-1',
    info: 'col-span-8 sm:col-span-12',
    price: 'col-span-2 sm:col-span-12',
  }

  return (
    <section className="fixed inset-0 z-[99] grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="overflow-x-hidden max-h-[90%] xl:max-h-[80%] sm:max-h-[95%] w-[35%] xl:w-[45%] sm:w-[92.5%] p-5 sm:p-3 bg-white shadow-nav">
        {submitMessage ? (
          <Title text={submitMessage} classes="text-center" />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Title text="Ваш заказ:" />
              <span className="-mt-1 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-blue" onClick={onClose}>
                &times;
              </span>
            </div>
            <form className="mt-3 space-y-5 sm:space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:space-y-2.5">
                {cart.map((item, idx) => (
                  <div className={`grid ${gridConfig.global} sm:flex items-center justify-between`} key={idx}>
                    <div className={`flex items-center gap-2 sm:gap-2.5 ${gridConfig.info}`}>
                      <Image src={urlForImage(item.image).url()} className="object-contain w-20 sm:w-14 aspect-square" width={50} height={50} alt={`item ${idx}`} />

                      <div className="flex flex-col">
                        <span className="font-bold sm:text-sm max-w-[30ch]">{item.name}</span>
                        <span className="text-sm">{item.article}</span>
                        <div className="items-center hidden gap-3 sm:flex">
                          <span className="text-sm">{item.quantity} шт.</span>
                          <span className="font-bold sm:text-sm">{item.price} тг</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex justify-end gap-5 ${gridConfig.price}`}>
                      <div className={`flex flex-col justify-self-end w-fit text-left sm:hidden`}>
                        <span className="font-bold">{item.price} тг</span>
                        <span className="text-sm">{item.quantity} шт.</span>
                      </div>

                      <button type="button" className="text-right duration-200 w-fit justify-self-end text-custom-grey hover:text-custom-hytec" onClick={() => removeItem(idx)}>
                        <SquareX strokeWidth={1.7} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <input className="INPUT !px-3" placeholder="Промокод" type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Button text="Применить" classes="text-base !w-full block grid place-items-center" onClick={applyPromoCode} />
                </div>
              </div>

              <div className="flex items-center justify-between text-lg font-semibold sm:text-base">
                {promoApplied ? <div className="text-center text-custom-blue">Скидка: {discount}%</div> : <div></div>}

                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {promoApplied ? (
                      <span className="flex items-center gap-2">
                        <span className="line-through text-custom-blue opacity-70">{cart.reduce((total, item) => total + item.price * item.quantity, 0)} тг</span>
                        <span className="text-custom-blue">{calculateTotalPrice()} тг</span>
                      </span>
                    ) : (
                      <span className="text-custom-blue">{calculateTotalPrice()} тг</span>
                    )}
                  </span>

                  <button type="button" className="text-right duration-200 w-fit justify-self-end text-custom-grey hover:text-custom-hytec" onClick={clearCart}>
                    <SquareX strokeWidth={1.7} />
                  </button>
                </div>
              </div>

              <div className="w-full bg-custom-blue h-[1px]"></div>

              <div className="space-y-2.5">
                <input className="INPUT" placeholder="Имя" type="text" {...register('name', {required: 'Заполните все поля'})} />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                <input className="INPUT" placeholder="E-mail" type="email" {...register('email', {required: 'Заполните все поля'})} />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                <input className="INPUT" placeholder="Телефон" type="tel" {...register('phone', {required: 'Заполните все поля'})} />
                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                <textarea className="INPUT" placeholder="Комментарий" {...register('message', {required: 'Заполните все поля'})}></textarea>
                {errors.message && <span className="text-red-500">{errors.message.message}</span>}
              </div>

              <button className={`!w-full block text-center ${buttonVariants.default} ${buttonVariants.secondary} `} title="submit">
                Отправить
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default Form
