import Image from 'next/image'
import {LogoImage} from './Header/Header'

const footerData = {
  clients: {
    1: {text: 'Главная', url: '/'},
    2: {text: 'Продукты', url: '/products/'},
    3: {text: 'О бренде', url: '/about/'},
    4: {text: 'Где купить', url: '/buy/'},
  },
  contacts: {
    1: {text: '+7 (707) 033-11-17', url: 'tel:+77070331117'},
    2: {text: 'sales@dr-spiller.kz', url: 'mailto:sales@dr-spiller.kz'},
    3: {text: 'г. Алматы, Самал 2- 69', url: 'https://yandex.ru/maps/-/CDeKmOne'},
    4: {text: 'instagram.com/drspiller.kz', url: 'https://www.instagram.com/drspiller.kz/'},
  },
}

const List: React.FC<{title: string; dataKey: keyof typeof footerData}> = ({title, dataKey}) => (
  <div>
    <h3 className="text-lg font-semibold uppercase">{title}</h3>
    <div className="flex flex-col gap-1 mt-4 text-sm sm:text-xs">
      {Object.values(footerData[dataKey]).map(({text, url}, index) => (
        <a key={index} className="hover:underline" href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ))}
    </div>
  </div>
)

export default function Footer() {
  return (
    <footer className="text-white bg-custom-area py-7 sm:py-10">
      <section className="w-[90%] sm:w-full mx-auto flex sm:flex-col justify-between items-center gap-10">
        <Image className="w-[18rem] xl:w-72 sm:w-52 object-contain sm:hidden" src={LogoImage} alt="" />
        <div className="flex justify-center gap-14 sm:gap-12 xs:gap-7 sm:w-full">
          <List title="Клиентам" dataKey="clients" />
          <List title="Контакты" dataKey="contacts" />
        </div>
      </section>
    </footer>
  )
}
