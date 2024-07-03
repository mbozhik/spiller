'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {buttonVariants} from '#/UI/Button'
import Title from '#/UI/Title'
import Text from '#/UI/Text'

const Form = () => {
  const [submitMessage, setSubmitMessage] = useState('')
  const {register, handleSubmit, watch} = useForm()
  const businessType = watch('businessType')

  const businessTypes = ['Дистрибьюторская компания', 'Клиника/косметология', 'Салон красоты', 'СПА-центр', 'Частный косметолог', 'Магазин косметики', 'Прочее']

  const submitForm = async (data) => {
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbw3lv7VUUh9DeWk7iOFe0nsc4YbiMh7ZPYgZsfbG9RS9K_78S4hSeDO4aWQRm2TuuLv/exec'

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

          <form className="mt-5 space-y-1 sm:space-y-3" onSubmit={handleSubmit(submitForm)}>
            <div className="space-y-5">
              <div className="space-y-3">
                <input className="INPUT" placeholder="Имя" {...register('name')} type="text" />

                <div className="flex flex-col gap-1 sm:gap-3 select-none">
                  <h3 className="font-semibold mb-0.5 sm:mb-0">Тип бизнеса:</h3>

                  {businessTypes.map((value) => (
                    <label className="flex items-center gap-3" key={value}>
                      <input className="w-4" type="radio" {...register('businessType')} value={value} checked={businessType === value} />
                      {value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <input {...register('naming')} placeholder="Название компании" type="text" className="INPUT" />
                <input {...register('city')} placeholder="Ваш город" type="text" className="INPUT" />
                <input {...register('email')} placeholder="E-mail" type="email" className="INPUT" />
                <input {...register('phone')} placeholder="Телефон" type="tel" className="INPUT" />
                <textarea {...register('message')} placeholder="Комментарий (необязательно)" className="INPUT" rows={5}></textarea>
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
