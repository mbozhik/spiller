import Image, {StaticImageData} from 'next/image'

import BuyImage from '%/buy/2.jpg'

import Title from '#/UI/Title'
import Button from '#/UI/Button'

interface ButtonData {
  text: string
  href: string
  blank?: boolean
}

interface ContactsData {
  title: string
  buttons: {[key: number]: ButtonData}
  image: string | StaticImageData
}

const contactsData: ContactsData = {
  title: 'КОНТАКТЫ:',
  buttons: {
    1: {
      text: '+7 (707) 033-11-17',
      href: 'tel:+77070331117',
    },
    2: {
      text: 'sales@dr-spiller.kz',
      href: 'mailto:sales@dr-spiller.kz',
    },
    3: {
      text: 'instagram.com/drspiller.kz',
      href: 'https://www.instagram.com/drspiller.kz/',
      blank: true,
    },
  },
  image: BuyImage,
}

export default function Contacts() {
  return (
    <section data-section="CONTACTS" className="flex items-center justify-between sm:gap-7 sm:items-start sm:flex-col-reverse">
      <div className="flex flex-col">
        <Title text={contactsData.title} classes="mb-5" />
        <div className="flex flex-col gap-3">
          {Object.values(contactsData.buttons).map((button, index) => (
            <Button key={index} text={button.text} blank={button.blank ? '_blank' : undefined} href={button.href} />
          ))}
        </div>
      </div>
      <Image className="object-cover w-1/2 h-auto rounded-lg sm:w-full" src={contactsData.image} alt="" />
    </section>
  )
}
