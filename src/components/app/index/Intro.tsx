import Title from '#/UI/Title'
import Button from '#/UI/Button'
import Text from '#/UI/Text'

export default function Intro() {
  return (
    <section data-section="INTRO" className="flex flex-col gap-5 mt-12 sm:mt-9">
      <Title text="Dr. Spiller (ГЕРМАНИЯ) — профессиональная косметика <br> премиального уровня, известная во всём мире" />
      <Text text='ТОО "WEC GROUP" — официальный дистрибьютор профессиональной косметики Dr. Spiller (Германия) в Казахстане и Кыргызстане. Наша компания предлагает весь необходимый спектр услуг для обеспечения качественной работы специалистов индустрии красоты и их клиентов.' />
      <div className="flex gap-2 mx-auto sm:mx-0">
        <Button href="/products/" text="ПЕРЕЙТИ К ПРОДУКТАМ" />
        {/* <Button href="/form/" text="Оставить заявку" classes="bg-custom-blue !text-white duration-200 hover:bg-transparent hover:border-custom-blue hover:!text-custom-blue" /> */}
      </div>
    </section>
  )
}
