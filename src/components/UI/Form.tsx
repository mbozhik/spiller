import {useState, useEffect} from 'react'

import {buttonVariants} from '#/UI/Button'
import Title from '#/UI/Title'

const Form = ({onClose}) => {
  const [submitMessage, setSubmitMessage] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cosmetologist, setCosmetologist] = useState(false)
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

  function submitForm(e) {
    e.preventDefault()

    const sendData = async () => {
      const data = {
        name,
        email,
        phone,
        cosmetologist: cosmetologist ? 'Да' : 'Нет',
        message,
      }

      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyUeNos_7YubG8nvQolQQlNbOyuFtv1CoNZeSs-tY-ia5V4LTkUba_E-gDuuZVy_5aX/exec'

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

  return (
    <section className="fixed inset-0 z-[99] grid w-screen h-screen place-items-center bg-custom-blue/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 sm:p-3 bg-white shadow-nav">
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
            <form className="mt-5 space-y-1 sm:space-y-3" onSubmit={submitForm}>
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <input className="INPUT" placeholder="Имя" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="INPUT" placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="INPUT" placeholder="Телефон" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <label className="flex gap-3 select-none sm:gap-4 sm:text-sm">
                  Являетесь ли вы косметологом?
                  <input className="w-4" type="checkbox" checked={cosmetologist} onChange={(e) => setCosmetologist(e.target.checked)} />
                </label>

                <textarea className="INPUT" placeholder="Текст" value={message} onChange={(e) => setMessage(e.target.value)} rows={5}></textarea>
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
