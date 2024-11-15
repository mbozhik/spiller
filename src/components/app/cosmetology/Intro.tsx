import {contactsData} from '##/buy/Contacts'

import Title from '#/UI/Title'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

export default function Intro() {
  return (
    <section data-section="INTRO" className="flex flex-col gap-5">
      <div className="space-y-2">
        <Title text="Эксклюзивный уход от Dr. Spiller. Мы поможем вам сохранить красоту и молодость." />
        <Text text="Dr. Spiller сочетает немецкое качество и инновационный подход для ухода за вашей кожей. Современные технологии и натуральные ингредиенты обеспечивают долгосрочный результат, сохраняя молодость, сияние и здоровье кожи." />
      </div>

      <div className="flex gap-2 mx-auto sm:mx-0">
        <Button href="https://zapis.kz/salon/dr-spiller-10532?redirect=true" text="Онлайн-запись" />
        <Button href={contactsData.buttons[1].href} variant="secondary" text="Запись по телефону" />
      </div>
    </section>
  )
}
