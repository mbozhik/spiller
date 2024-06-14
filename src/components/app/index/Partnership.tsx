import Title from '#/UI/Title'
import Button from '#/UI/Button'
import Text from '#/UI/Text'

export default function Partnership() {
  return (
    <section data-section="INTRO" className="flex flex-col gap-5">
      <Title text="ПРИГЛАШАЕМ К СОТРУДНИЧЕСТВУ" />
      <Text text='Мы, компания "WEC Group", являемся официальным и эксклюзивным дистрибьютором продукции бренда Dr.Spiller. В связи с этим мы активно ищем новых партнёров для сотрудничества.' />

      <Button href="/partnership/" classes="w-full" text="УЗНАТЬ ПОДРОБНЕЕ" />
    </section>
  )
}
