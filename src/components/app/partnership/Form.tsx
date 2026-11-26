'use client'

import {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'

import {buttonVariants} from '#/UI/Button'
import Title from '#/UI/Title'
import Text from '#/UI/Text'
import {confirmSubmission, submissionIdFor, type SubmissionIdentity} from '@/lib/submissions-client'

type FormFields = {
  name: string
  naming: string
  city: string
  businessType: string
  phone: string
  email: string
  message: string
}

const Form = () => {
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const requestIdentity = useRef<SubmissionIdentity>(null)
  const {register, handleSubmit, watch, formState: {errors}} = useForm<FormFields>()
  const businessType = watch('businessType')

  const businessTypes = ['Дистрибьюторская компания', 'Клиника/косметология', 'Салон красоты', 'СПА-центр', 'Частный косметолог', 'Магазин косметики', 'Прочее']

  const submitForm = async (data) => {
    if (isSubmitting) return
    const payload = {kind: 'partnership', ...data}
    requestIdentity.current = submissionIdFor(payload, requestIdentity.current)
    setIsSubmitting(true)
    setSubmitMessage('')
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...payload, submissionId: requestIdentity.current.id}),
      })

      await confirmSubmission(response, 'partnership')
      requestIdentity.current = null
      setSubmitMessage('Форма отправлена!')
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="FORM_WRAPPER" className="px-[20%] sm:p-5 py-10 border border-custom-blue w-full mx-auto">
      {submitMessage === 'Форма отправлена!' && (
        <Title text={submitMessage} classes="text-center" />
      )}
      {submitMessage !== 'Форма отправлена!' && (
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
                <input {...register('email', {required: 'Укажите e-mail'})} placeholder="E-mail" type="email" className="INPUT" />
                {errors.email && <span role="alert" className="text-red-600">{errors.email.message}</span>}
                <input {...register('phone')} placeholder="Телефон" type="tel" className="INPUT" />
                <textarea {...register('message')} placeholder="Комментарий (необязательно)" className="INPUT" rows={5}></textarea>
              </div>
            </div>

            {submitMessage && <p role="alert" aria-live="polite" className="text-red-600">{submitMessage}</p>}
            <button disabled={isSubmitting} className={`!w-full block text-center ${buttonVariants.default} ${buttonVariants.secondary} disabled:opacity-60`} title="submit">
              {isSubmitting ? 'Отправляется...' : 'Отправить'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Form
