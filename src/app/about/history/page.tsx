import Image from 'next/image'

import AboutHistoryImage from '%/history/horst.jpg'
import AboutHistoryImage2 from '%/history/trio.jpg'

import Main from '#/UI/Container'
import Title from '#/UI/Title'
import Text from '#/UI/Text'

const principles: string[] = ['Знания', 'Компетентность', 'Опыт', 'Профессионализм']

export default function AboutHistory() {
  return (
    <Main>
      <section className="flex flex-col gap-16 mt-16 sm:mt-10 mb-44 sm:mb-24">
        <div className="flex items-center justify-between sm:flex-col sm:gap-5">
          <Title text="немецкая Компания Dr. Spiller основана в 1960 году доктором Хорстом Шпиллером" />
          <Image className="block object-contain" src={AboutHistoryImage} alt="" />
        </div>
        <div className="flex items-center justify-between sm:flex-col gap-14 sm:gap-5 sm:mt-10">
          <Image className="block object-contain w-[61%] xl:w-[56%] sm:w-full" src={AboutHistoryImage2} alt="" />
          <div className="flex flex-col gap-3">
            <Text classes="sm:text-sm" text="В настоящее время компанией руководят Мануэль и Цица Шпиллер, и Эрих Вольспергер. Управляя бизнесом, они продолжают лучшие традиции и внедряют инновации. <br><br> Они руководствуются следующими принципами компании:" />
            <div className="flex flex-col gap-2 text-xl uppercase xl:text-lg">
              {principles.map((item, index) => (
                <div key={index} className="pb-1 pl-4 border-b-[1px] border-black">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Main>
  )
}
