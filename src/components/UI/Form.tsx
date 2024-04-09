import {useEffect} from 'react'

import {buttonVariants} from './Button'
import Title from '#/UI/Title'

const Form = ({onClose}) => {
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

  function submitForm(e) {
    e.preventDefault()

    const sendData = async () => {
      const data = {
        name: 'тест',
        email: 'maxim@mail.md',
        phone: '+37368787744',
        cosmetologist: 'NO',
        message: 'проверка формы',
      }

      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxLKd6b5WOEqv_YFxQrIKzpzMrrTsUwNTstFwAY8jZq_KNYmL5jYCaadmJIrSYhNW_-/exec'

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
      } catch (error) {
        console.error('Error:', error)
      }
    }

    sendData()
  }

  return (
    <section className="fixed inset-0 z-50 grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 bg-white shadow-nav">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Title text="Оставить заявку:" />
            <span className="-mt-1 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-blue" onClick={onClose}>
              &times;
            </span>
          </div>
          <form className="mt-5 space-y-1" onSubmit={submitForm}>
            <button className={`!w-full block text-center -mt-5 ${buttonVariants.default} ${buttonVariants.secondary} `} title="submit">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Form
