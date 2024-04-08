import Image from 'next/image'
import HytecImage from '../../assets/images/hytec.png'

import Title from '#/UI/Title'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

export default function Hytec() {
  return (
    <section data-section="HYTEC" className="z-10 bg-white py-7 sm:pt-10 sm:pb-16 shadow-hytec sm:shadow-hytec_mobile">
      <div className="flex sm:flex-col justify-between mx-auto w-[60%] xl:w-[75%] sm:w-[90%] gap-16 sm:gap-7">
        <Image className="w-[13rem] object-contain sm:self-center" src={HytecImage} alt="" />
        <div className="flex flex-col gap-3">
          <Title classes="text-custom-hytec" text="Инновационные технологии HYTEC Emulsion System" />
          <Text classes="text-custom-hytec" text="Запатентованная технология HYTEC Emulsion System основана на создании уникальной структуры, свойственной всем эмульсиям Dr. Spiller . Эмульсия обладает реструктурирующим действием, позволяет восстановить целостность эпидермального барьера и естественный механизм увлажнения кожи." />
          <Button href="/about/hytec/" text="УЗНАТЬ ПОДРОБНЕЕ" classes="self-end text-custom-hytec border-custom-hytec mt-2 sm:mt-4 sm:self-center" />
        </div>
      </div>
    </section>
  )
}
