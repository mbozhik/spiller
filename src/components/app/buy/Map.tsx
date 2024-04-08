import Link from 'next/link'

import Button from '#/UI/Button'
import Title from '#/UI/Title'

export default function Map() {
  return (
    <section data-section="MAP" className="flex flex-col gap-5">
      <Title text="РАСПОЛОЖЕНИЕ ОФИСА:" classes="mb-5" />
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Link className="text-[#eee] text-xs absolute top-0" href="https://yandex.ru/maps/162/almaty/?utm_medium=mapframe&utm_source=maps">
          Алматы
        </Link>
        <Link className="text-[#eee] text-xs absolute top-0" href="https://yandex.ru/maps/162/almaty/house/Y08YfwJgTUEFQFppfX5ycHRlZw==/?indoorLevel=1&ll=76.950442%2C43.231863&utm_medium=mapframe&utm_source=maps&z=17">
          Микрорайон Самал-2, 69 на карте Алматы, ближайшее метро Абая — Яндекс Карты
        </Link>
        <iframe className="s-full relative" src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=76.950442%2C43.231863&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=76.950442%2C43.231863&whatshere%5Bzoom%5D=17&z=17" width="560" height="400" frameBorder="1" allowFullScreen={true} name="map" title="map"></iframe>
      </div>
      <Button text="ПЕРЕЙТИ НА КАРТЫ" blank="_blank" href="https://yandex.ru/maps/-/CDeKmOne" classes="w-full" />
    </section>
  )
}
