'use client'

import {useState, useEffect} from 'react'
import Button from '#/UI/Button'
import Loader from '#/UI/Loader'
import Form from '#/UI/Form'

export default function ProductsBody() {
  const [showIframe, setShowIframe] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowIframe(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleButtonClick = () => {
    setShowForm(true)
  }

  return (
    <>
      <section className="flex flex-col items-center mt-14 sm:mt-7 gap-7 sm:gap-10 sm:mb-[25vh]">
        <div className="flex gap-2 mx-auto sm:mx-3">
          <Button href="/files/products.pdf" blank={true} text="Открыть каталог в PDF формате" />
          <Button onClick={handleButtonClick} text="Оставить заявку" variant="secondary" />
        </div>

        <div id="SHEET" className="sm:hidden relative w-[70vw] mx-auto h-[70vh] duration-500 mb-[10vh] overflow-hidden">
          <Loader classes={`absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-white duration-300 ${!showIframe ? 'opacity-100' : 'opacity-0'}`} /> {/* Loader visible until iframe loads */}
          <iframe id="productIframe" className="absolute inset-0 z-0 w-full h-full -mt-6" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vThSf0ruSkcsYuBSK-ta5qtY25A6XWTEhji1iLpLDJutnfifdE2Sgr_zh3K64Gs7gs0EYKLWuvWtElA/pubhtml?gid=83601057&single=true&widget=true&headers=false" title="pdf" />
        </div>
      </section>

      {showForm && <Form onClose={() => setShowForm(false)} />}
    </>
  )
}
