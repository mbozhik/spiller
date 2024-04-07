import Image from 'next/image'
import LogoImage from '../../../assets/images/logo.svg'

import ContactsLine from './ContactsLine'
import NavBar from './NavBar'

export default function Header() {
  return (
    <>
      <ContactsLine />

      <header className="flex flex-col text-white bg-custom-area sm:flex-col-reverse">
        <section className="z-20 w-[90%] mx-auto py-10 sm:py-5">
          <div className="flex items-center justify-between sm:flex-col sm:gap-7">
            <Image className="w-[23rem] xl:w-72 sm:w-52" src={LogoImage} alt="" />

            <h1 className="text-2xl xl:text-base text-end sm:text-xs sm:text-center sm:font-light">
              ТОО &quot;WEC Group&quot; — официальный дистрибьютор <br />
              Dr. Spiller в Казахстане и Кыргызстане
            </h1>
          </div>
        </section>
      </header>

      <NavBar />
    </>
  )
}
