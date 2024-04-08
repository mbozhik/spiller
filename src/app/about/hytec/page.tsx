import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'HYTEC',
}

import AboutHytecImage from '%/about/2.jpg'

import Main from '#/UI/Container'
import Title from '#/UI/Title'
import GridCell from '#/UI/GridCell'

const emulsionSystemBenefits: string[] = ['⦁ Эмульсионная система HYTEC работает в гармонии с природой.', '⦁ Благодаря восстановлению гидро-липидной пленки эмульсионная система HYTEC сводит к минимуму потерю воды и стабилизирует уровень увлажнения кожи.', '⦁ Надолго уменьшая сухость кожи, обеспечивает её свободное дыхание и предотвращает преждевременное старение.', '⦁ Повышает доступность активных ингредиентов косметики и позволяет их транспортировать быстрее и эффективнее.', '⦁ Повышает эффективность антивозрастного ухода за кожей.']

export default function AboutHytec() {
  return (
    <Main>
      <section className="flex flex-col gap-16 mt-16 sm:mt-10 mb-44 sm:mb-24">
        <Title classes="w-[90%] sm:w-full sm:!text-xl" text="Основная задача косметики Dr. Spiller — формирование неповреждённой гидро-липидной плёнки, которая защищает и предотвращает потерю влаги — устраняя  основные факторы ускоренного старение кожи. Dr. Spiller предлагает  революционное решение —  <b>HYTEC Emulsion System</b>" />
        <GridCell href="" buttonText="" isButton={false} flexDirection="flex-row" titleText="Что делает эмульсионную систему HYTEC такой особенной?" textArray={emulsionSystemBenefits} image={AboutHytecImage} imgClasses="!object-contain" />
        <Title classes="w-[90%] sm:w-full sm:!text-xl" text="Результат: Система эмульсии <b>HYTEC</b> активирует естественные функции кожи — для здоровой, красивой кожи с идеальным балансом." />
      </section>
    </Main>
  )
}
