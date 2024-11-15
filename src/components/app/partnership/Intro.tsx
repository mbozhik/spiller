import PartnershipImage from '%/partnership/1.svg'
import PartnershipImage2 from '%/partnership/2.svg'
import PartnershipImage3 from '%/partnership/3.svg'
import PartnershipImage4 from '%/partnership/4.svg'

import Image from 'next/image'
import Title from '#/UI/Title'

const partnershipData = [
  {
    text: 'Косметологи',
    image: PartnershipImage2,
  },
  {
    text: 'Салоны красоты <br> и СПА-центры',
    image: PartnershipImage,
  },
  {
    text: 'Магазины косметики <br> премиум класса',
    image: PartnershipImage3,
  },
  {
    text: 'Косметологические <br> клиники',
    image: PartnershipImage4,
  },
]

export default function Intro() {
  return (
    <>
      <Title classes="text-center sm:text-left" text="ПРИГЛАШАЕМ К СОТРУДНИЧЕСТВУ" />

      <div className="flex justify-between gap-5 w-full sm:flex-col">
        {partnershipData.map(({text, image}, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Image className="s-12" src={image} alt="" />
            <h1 className="text-lg leading-tight" dangerouslySetInnerHTML={{__html: text}} />
          </div>
        ))}
      </div>
    </>
  )
}
