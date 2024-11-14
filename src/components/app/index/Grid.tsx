import GridImage1 from '%/index/1.jpg'
import GridImage2 from '%/index/2.jpg'

import GridCell, {GridDataProps} from '#/UI/GridCell'

const gridData: {[key: number]: GridDataProps} = {
  1: {
    href: '/about/',
    buttonText: 'О БРЕНДЕ',
    isButton: true,
    flexDirection: 'flex-row',
    titleText: 'DR. SPILLER PURE SKINCARE SOLUTIONS',
    text: ['Dr. Spiller Pure SkinCare - профессиональная биомиметическая косметика для комплексного ухода за кожей, ориентированная как на профессионалов, так и для домашнего использования.', 'По образцу природы эксклюзивные косметические средства усовершенствованы до максимальной эффективности. Разработка и производство на протяжении десятилетий ведутся в собственных лабораториях компании, эксперты Dr.Spiller доверяют в основном региональному происхождению сырья: альпийская родниковая вода и натуральные эссенции составляют изысканную основу продукции Dr. Spiller.'],
    image: GridImage1,
  },
  2: {
    href: '/products/',
    buttonText: 'ПРОДУКТЫ',
    isButton: true,
    flexDirection: 'flex-row-reverse',
    titleText: 'Решения для всех типов кожи',
    text: ['Dr. Spiller включает линии средств по уходу, в которых есть решения проблем для всех типов кожи.', '<mark>Biomimetic SkinCare</mark> Средства этой линии помогают поддерживать красоту и молодость кожи в тот момент, когда ее естественные функции ослабевают. Сложная комбинированная рецептура косметики позволяет сочетать полезные свойства натуральных компонентов с последними научными достижениями. Что обеспечивает высокий стандарт качества в сфере косметического ухода.', '<mark>Manage Your Skin</mark> Мужчины оценят простые в использовании, но с мощным эффектом идеально подобранные решения программы ухода с полной линейкой Manage Your Skin® для устойчивого здоровья кожи.'],
    image: GridImage2,
  },
}

export default function Grid() {
  return (
    <section data-section="GRID" className="flex flex-col gap-16 sm:gap-10 mb-44 sm:mb-24">
      {Object.values(gridData).map(({href, buttonText, isButton, flexDirection, titleText, text, image}) => (
        <div key={href}>
          <GridCell href={href} buttonText={buttonText} isButton={isButton} flexDirection={flexDirection} titleText={titleText} textArray={text} image={image} />
        </div>
      ))}
    </section>
  )
}
