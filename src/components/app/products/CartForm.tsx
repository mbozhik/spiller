import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'

import {urlForImage} from '@/lib/sanity'
import {useCartCounter} from '@/store'

import Image from 'next/image'
import Title from '#/UI/Title'
import Button, {buttonVariants} from '#/UI/Button'
import {CartItem} from '##/products/[slug]/CartButton' // types

type FormFields = {
  name: string
  email: string
  phone: string
  message: string
}

const Form = ({onClose}) => {
  const [submitMessage, setSubmitMessage] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])

  const {resetCart} = useCartCounter((state) => state)

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

  const gridConfig = {
    global: 'grid-cols-12 sm:grid-col-span-1',
    info: 'col-span-10 sm:col-span-12',
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
              <div>
                {cart.map((item, idx) => (
                  <div className={`grid ${gridConfig.global} items-center justify-between`} key={idx}>
                    <div className={`flex items-center gap-2 sm:gap-0 ${gridConfig.info}`}>
                      <Image src={urlForImage(item.image).url()} className="object-contain w-20 aspect-square" width={50} height={50} alt={`item ${idx}`} />

                      <div className="flex flex-col">
                        <span className="font-bold max-w-[30ch]">{item.name}</span>
                        <span className="text-sm">{item.article}</span>
                        <div className="hidden sm:gap-5 sm:items-center sm:flex">
                          <span className="text-sm">{item.quantity} шт.</span>
                          <span className="font-bold">{item.price} тг.</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-col justify-self-end w-full text-left sm:hidden ${gridConfig.price}`}>
                      <span className="font-bold">{item.price} тг.</span>
                      <span className="text-sm">{item.quantity} шт.</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button text="Очистить корзину" classes="text-base py-1 !w-full block" onClick={clearCart} />

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
