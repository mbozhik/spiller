import Image, {StaticImageData} from 'next/image'
import PartnershipImage from '%/partnership/1.svg'
import PartnershipImage2 from '%/partnership/2.svg'
import PartnershipImage3 from '%/partnership/3.svg'
import PartnershipImage4 from '%/partnership/4.svg'

import Title from '#/UI/Title'

const partnershipData: {[key: number]: {text: string; image: string | StaticImageData}} = {
  1: {
    text: 'Косметологи',
    image: PartnershipImage2,
  },
  2: {
    text: 'Салоны красоты <br> и СПА-центры',
    image: PartnershipImage,
  },
  3: {
    text: 'Магазины косметики <br> премиум класса',
    image: PartnershipImage3,
  },
  4: {
    text: 'Косметологические <br> клиники',
    image: PartnershipImage4,
  },
}

const getHtml = (text: string) => ({__html: text})

export default function Intro() {
  return (
    <>
      <Title classes="text-center" text="ПРИГЛАШАЕМ К СОТРУДНИЧЕСТВУ" />

      <div className="flex justify-between gap-5 w-full">
        {Object.values(partnershipData).map(({text, image}) => (
          <div key={text} className="flex gap-4 items-center">
            <Image className="s-12" src={image} alt="" />

            <h1 className="text-lg leading-tight " dangerouslySetInnerHTML={getHtml(text)} />
          </div>
        ))}
      </div>
    </>
  )
}
