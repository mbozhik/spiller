import Button from '#/UI/Button'
import Title from '#/UI/Title'

export default function Map() {
  return (
    <section data-section="MAP" className="flex flex-col gap-5">
      <Title text="РАСПОЛОЖЕНИЕ ОФИСА:" classes="mb-5" />
      <div className="relative w-full h-[50vh] sm:h-[40vh] overflow-hidden">
      <iframe className='relative s-full' src="https://yandex.ru/map-widget/v1/?ll=76.950442%2C43.231802&mode=search&oid=126663847614&ol=biz&utm_source=share&z=17.5" width="560" height="400" allowFullScreen={true}></iframe>
      </div>
      <Button text="ПЕРЕЙТИ НА КАРТЫ" blank={true} href="https://yandex.ru/maps/-/CDeKmOne" classes="w-full" />
    </section>
  )
}
