'use client'

import {useState} from 'react'

import {buttonVariants} from '#/UI/Button'
import Title from '#/UI/Title'
import Text from '#/UI/Text'

const Form = () => {
  const [submitMessage, setSubmitMessage] = useState('')

  const [naming, setNaming] = useState('')
  const [city, setCity] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [message, setMessage] = useState('')

  function submitForm(e) {
    e.preventDefault()

    const sendData = async () => {
      const data = {
        naming,
        city,
        name,
        email,
        phone,
        businessType,
        message,
      }

      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx-G-IA4EP9scyC0RcEBnLoglylWbr05zJKDsrOHtFT4yW4OYpjgbC23xSrVQHDQO8D/exec'

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
        console.log('Response Data:', responseData)

        setSubmitMessage('Форма отправлена!')
      } catch (error) {
        console.error('Error:', error)
        setSubmitMessage('Ошибка')
      }
    }

    sendData()
  }

  return (
    <div id="FORM_WRAPPER" className="px-[20%] sm:p-5 py-10 border border-custom-blue w-full mx-auto">
      {submitMessage ? (
        <Title text={submitMessage} classes="text-center" />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5 text-center">
            <Title text="Стать партнером:" />
            <Text text="Мы рассмотрим заявку в ближайшее время и свяжемся с вами" />
          </div>

          <form className="mt-5 space-y-1 sm:space-y-3" onSubmit={submitForm}>
            <div className="space-y-5">
              <div className="space-y-3">
                <input className="INPUT" placeholder="Имя" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <div className="flex flex-col gap-1 sm:gap-3 select-none">
                  <h3 className="font-semibold mb-0.5 sm:mb-0">Тип бизнеса:</h3>
                  <label className="flex items-center gap-3">
                    <input className="w-4" type="radio" name="businessType" value="Дистрибьюторская компания" checked={businessType === 'Дистрибьюторская компания'} onChange={(e) => setBusinessType(e.target.value)} />
                    Дистрибьюторская компания
                  </label>
                  <label className="flex items-center gap-3">
                    <input className="w-4" type="radio" name="businessType" value="Клиника/косметология" checked={businessType === 'Клиника/косметология'} onChange={(e) => setBusinessType(e.target.value)} />
                    Клиника/косметология
                  </label>
                  <label className="flex items-center gap-3">
                    <input className="w-4" type="radio" name="businessType" value="Салон красоты" checked={businessType === 'Салон красоты'} onChange={(e) => setBusinessType(e.target.value)} />
                    Салон красоты
                  </label>
                  <label className="flex items-center gap-3">
                    <input className="w-4" type="radio" name="businessType" value="СПА-центр" checked={businessType === 'СПА-центр'} onChange={(e) => setBusinessType(e.target.value)} />
                    СПА-центр
                  </label>
                  <label className="flex items-center gap-3">
                    <input className="w-4" type="radio" name="businessType" value="Частный косметолог" checked={businessType === 'Частный косметолог'} onChange={(e) => setBusinessType(e.target.value)} />
                    Частный косметолог
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <input className="INPUT" placeholder="Название компании (если есть)" type="text" value={naming} onChange={(e) => setNaming(e.target.value)} />
                <input className="INPUT" placeholder="Ваш город" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <input className="INPUT" placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="INPUT" placeholder="Телефон" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <textarea className="INPUT" placeholder="Комментарий (необязательно)" value={message} onChange={(e) => setMessage(e.target.value)} rows={5}></textarea>
              </div>
            </div>

            <button className={`!w-full block text-center ${buttonVariants.default} ${buttonVariants.secondary}`} title="submit">
              Отправить
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Form
