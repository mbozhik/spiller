import {useEffect} from 'react'
import {useForm} from 'react-hook-form'

import {buttonVariants} from '#/UI/Button'
import Title from '#/UI/Title'

type FormFields = {
  name: string
  email: string
  phone: string
  cosmetologist: boolean
  message: string
}

const Form = ({onClose}) => {
  const {register, handleSubmit} = useForm<FormFields>()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Главная страница',
          email: data.email,
          message: data.message,
          name: data.name,
          phone: data.phone,
          cosmetologist: data.cosmetologist,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send data')
      }

      await response.json()
      setTimeout(() => {
        onClose()
      }, 2000)
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

  return (
    <section className="fixed inset-0 z-[99] grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 sm:p-3 bg-white shadow-nav">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Title text="Оставить заявку:" />
            <span className="-mt-1 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-blue" onClick={onClose}>
              &times;
            </span>
          </div>
          <form className="mt-5 space-y-1 sm:space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2.5">
                <input className="INPUT" placeholder="Имя" {...register('name', {required: true})} />
                <input className="INPUT" placeholder="E-mail" type="email" {...register('email', {required: true})} />
                <input className="INPUT" placeholder="Телефон" type="tel" {...register('phone', {required: true})} />
              </div>

              <label className="flex gap-3 select-none sm:gap-4 sm:text-sm">
                Являетесь ли вы косметологом?
                <input className="w-4" type="checkbox" {...register('cosmetologist')} />
              </label>

              <textarea className="INPUT" placeholder="Текст" {...register('message')} rows={5}></textarea>
            </div>

            <button className={`!w-full block text-center ${buttonVariants.default} ${buttonVariants.secondary}`} title="submit">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Form
