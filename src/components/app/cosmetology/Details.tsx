import PartnershipImage from '%/partnership/1.svg'
import PartnershipImage2 from '%/partnership/2.svg'
import PartnershipImage3 from '%/partnership/3.svg'
import PartnershipImage4 from '%/partnership/4.svg'

import Image from 'next/image'

const cosmetologyData = [
  {
    text: 'Немецкое качество',
    image: PartnershipImage,
  },
  {
    text: 'Персональный подход <br> к клиентам',
    image: PartnershipImage2,
  },
  {
    text: 'Ощутимый результат',
    image: PartnershipImage3,
  },
  {
    text: 'Сохранение красоты <br> и молодости',
    image: PartnershipImage4,
  },
]

export default function Details() {
  return (
    <div className="flex justify-between gap-5 w-full sm:flex-col">
      {cosmetologyData.map(({text, image}, index) => (
        <div key={index} className="flex gap-4 items-center">
          <Image className="s-12" src={image} alt="" />
          <h1 className="text-lg leading-tight" dangerouslySetInnerHTML={{__html: text}} />
        </div>
      ))}
    </div>
  )
}
