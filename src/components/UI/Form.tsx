import {useState, useEffect} from 'react'

import {buttonVariants} from './Button'
import Title from '#/UI/Title'

const Form = ({onClose}) => {
  const [submitMessage, setSubmitMessage] = useState('')

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
    const formEle = e.target
    const formData = new FormData(formEle)

    const GOOGLE_SHEET = 'https://script.google.com/macros/s/AKfycbwfe7Cf37tNRmd-IOUUJoNs2ZhmgwPoXX_2MXXr1va-WKIMu5uD_1D67AAEFzZKo1s7/exec'

    fetch(GOOGLE_SHEET, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          setSubmitMessage('Форма отправлена!')
          setTimeout(() => {
            onClose()
          }, 2000)
        } else {
          setSubmitMessage('Ошибка')
        }
      })
      .catch((error) => {
        console.warn('Error:', error)
        setSubmitMessage('Ошибка')
      })
  }

  const inputStyles = 'text-custom-blue border border-custom-blue w-full py-2 px-2 placeholder:text-custom-blue focus:outline-custom-blue'

  return (
    <section className="fixed inset-0 z-50 grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 bg-white shadow-nav">
        {submitMessage ? (
          <Title text={submitMessage} classes="text-center" />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Title text="Оставить заявку:" />
              <span className="-mt-1 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-blue" onClick={onClose}>
                &times;
              </span>
            </div>
            <form className="mt-5 space-y-1" onSubmit={submitForm}>
              <div className="space-y-3">
                <input className={inputStyles} placeholder="Имя" type="text" name="Name" required />
                <input className={inputStyles} placeholder="E-mail" type="email" name="Email" required />
                <input className={inputStyles} placeholder="Телефон" type="tel" name="Phone" />
                <textarea className={inputStyles} placeholder="Текст" name="Text" required rows={5}></textarea>
              </div>

              <button className={`!w-full block text-center -mt-5 ${buttonVariants.default} ${buttonVariants.secondary} `} title="submit">
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
