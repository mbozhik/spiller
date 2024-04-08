'use client'

import {useState, useEffect} from 'react'
import Button from '#/UI/Button'
import Loader from '#/UI/Loader'

export default function Products() {
  const [showIframe, setShowIframe] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowIframe(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="flex flex-col items-center mt-14 sm:mt-7 gap-7 sm:gap-10 sm:mb-[25vh]">
      <div className="flex gap-2 mx-auto sm:mx-3">
        <Button href="../../../products.pdf" blank="true" text="Открыть каталог в PDF формате" />
        {/* <Button href="/form/" text="Оставить заявку" classes="bg-custom-blue text-white duration-200 hover:bg-transparent hover:border-custom-blue hover:!text-custom-blue" /> */}
      </div>

      <div id="SHEET" className="sm:hidden relative w-[70vw] mx-auto h-[70vh] duration-500 mb-[10vh] overflow-hidden">
        <Loader classes={`absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-white duration-300 ${!showIframe ? 'opacity-100' : 'opacity-0'}`} /> {/* Loader visible until iframe loads */}
        <iframe id="productIframe" className="absolute inset-0 z-0 w-full h-full -mt-6" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vThSf0ruSkcsYuBSK-ta5qtY25A6XWTEhji1iLpLDJutnfifdE2Sgr_zh3K64Gs7gs0EYKLWuvWtElA/pubhtml?gid=83601057&single=true&widget=true&headers=false" title="pdf" />
      </div>
    </section>
  )
}
