import {useState, useEffect} from 'react'
import {urlForImage} from '@/lib/sanity'

import {buttonVariants} from '#/UI/Button'
import {CartItem} from '##/products/[slug]/CartButton' // types
import Title from '#/UI/Title'
import Image from 'next/image'

const Form = ({onClose}) => {
  const [submitMessage, setSubmitMessage] = useState('')

  const [cart, setCart] = useState<CartItem[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

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

  function submitForm(e) {
    e.preventDefault()

    const sendData = async () => {
      // Convert cart array to string with commas between products
      const cartString = cart
        .map((item) =>
          JSON.stringify({
            name: item.name,
            article: item.article,
            price: item.price,
            quantity: item.quantity,
          }),
        )
        .join(',')

      const data = {
        cart: cartString,
        name,
        email,
        phone,
        message,
      }

      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyq3hIKQ3NEcQscqMqPE1CylgJXcgm-yb6xuvI4UivoiPPLgo-S2kVh7_opPFxlBI0/exec'

      try {
        const response = await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error('Failed to send data')
        }

        const responseData = await response.json()
        console.log(data)

        console.log('Response Data:', responseData)

        setSubmitMessage('Форма отправлена!')
        setTimeout(() => {
          onClose()
        }, 2000)
      } catch (error) {
        console.error('Error:', error)
        setSubmitMessage('Ошибка')
      }
    }

    sendData()
  }

  const gridConfig = {
    global: 'grid-cols-12 sm:grid-col-span-1',
    info: 'col-span-10 sm:col-span-12',
    price: 'col-span-2 sm:col-span-12',
  }

  return (
    <section className="fixed inset-0 z-[99] grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="overflow-x-hidden h-[90%] xl:h-[80%] sm:h-[95%] w-[35%] xl:w-[45%] sm:w-[92.5%] p-5 sm:p-3 bg-white shadow-nav">
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
            <form className="mt-3 space-y-5 sm:space-y-3" onSubmit={submitForm}>
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

              <div className="space-y-2.5">
                <input className="INPUT" placeholder="Имя" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="INPUT" placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="INPUT" placeholder="Телефон" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <textarea className="INPUT" placeholder="Комментарий" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
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
