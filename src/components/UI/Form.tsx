import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'

import {buttonVariants} from '#/UI/Button'
import Title from '#/UI/Title'
import {submissionIdFor, type SubmissionIdentity} from '@/lib/submissions-client'

type FormFields = {
  name: string
  email: string
  phone: string
  cosmetologist: boolean
  message: string
}

const Form = ({onClose}) => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormFields>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const requestIdentity = useRef<SubmissionIdentity>(null)

  const onSubmit = async (data) => {
    if (isSubmitting) return
    const payload = {kind: 'contact', ...data}
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

      if (!response.ok) {
        throw new Error('Failed to send data')
      }

      const result = await response.json()
      if (!result?.id) throw new Error('Submission was not confirmed')
      requestIdentity.current = null
      setSubmitMessage('Заявка отправлена!')
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const formElement = document.getElementById('FORM_WRAPPER')
      if (!isSubmitting && formElement && !formElement.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, isSubmitting])

  return (
    <section className="fixed inset-0 z-[99] grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 sm:p-3 bg-white shadow-nav">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Title text="Оставить заявку:" />
            <button type="button" aria-label="Закрыть" disabled={isSubmitting} className="-mt-1 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-blue disabled:opacity-50" onClick={onClose}>
              &times;
            </button>
          </div>
          <form className="mt-5 space-y-1 sm:space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2.5">
                <input className="INPUT" placeholder="Имя" {...register('name', {required: 'Укажите имя'})} />
                {errors.name && <span role="alert" className="text-red-600">{errors.name.message}</span>}
                <input className="INPUT" placeholder="E-mail" type="email" {...register('email', {required: 'Укажите e-mail'})} />
                {errors.email && <span role="alert" className="text-red-600">{errors.email.message}</span>}
                <input className="INPUT" placeholder="Телефон" type="tel" {...register('phone', {required: 'Укажите телефон'})} />
                {errors.phone && <span role="alert" className="text-red-600">{errors.phone.message}</span>}
              </div>

              <label className="flex gap-3 select-none sm:gap-4 sm:text-sm">
                Являетесь ли вы косметологом?
                <input className="w-4" type="checkbox" {...register('cosmetologist')} />
              </label>

              <textarea className="INPUT" placeholder="Текст" {...register('message')} rows={5}></textarea>
            </div>

            {submitMessage && <p role="status" aria-live="polite" className={submitMessage.startsWith('Не удалось') ? 'text-red-600' : 'text-green-700'}>{submitMessage}</p>}
            <button disabled={isSubmitting} className={`!w-full block text-center ${buttonVariants.default} ${buttonVariants.secondary} disabled:opacity-60`} title="submit">
              {isSubmitting ? 'Отправляется...' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Form
